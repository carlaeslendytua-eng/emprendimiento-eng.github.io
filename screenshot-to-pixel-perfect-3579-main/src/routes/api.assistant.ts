import { createFileRoute } from "@tanstack/react-router";

type ChatMessage = {
  role: "user";
  content: string;
};

type AssistantRequest = {
  message: string;
  history: string[];
};

const MAX_BODY_BYTES = 8 * 1024;
const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_LENGTH = 4;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 8;

// This per-isolate limit is a first-line guard; production edge-level limits should remain enabled.
const requestWindows = new Map<string, { count: number; resetAt: number }>();

function jsonResponse(body: Record<string, string>, status: number, headers?: HeadersInit) {
  const responseHeaders = new Headers(headers);
  responseHeaders.set("content-type", "application/json; charset=utf-8");
  responseHeaders.set("cache-control", "no-store");
  return new Response(JSON.stringify(body), { status, headers: responseHeaders });
}

function getClientKey(request: Request) {
  const trustedAddress =
    request.headers.get("cf-connecting-ip") ?? request.headers.get("x-real-ip");
  return trustedAddress?.slice(0, 64) || "local";
}

function consumeRateLimit(key: string) {
  const now = Date.now();
  for (const [clientKey, window] of requestWindows) {
    if (window.resetAt <= now) requestWindows.delete(clientKey);
  }

  const current = requestWindows.get(key);
  if (current && current.count >= RATE_LIMIT) {
    return Math.max(1, Math.ceil((current.resetAt - now) / 1000));
  }
  if (!current && requestWindows.size >= 5000) return 60;

  requestWindows.set(key, {
    count: current ? current.count + 1 : 1,
    resetAt: current?.resetAt ?? now + RATE_WINDOW_MS,
  });
  return null;
}

async function readJsonBody(request: Request): Promise<unknown> {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    throw new Error("payload-too-large");
  }

  const reader = request.body?.getReader();
  if (!reader) throw new Error("missing-body");

  const decoder = new TextDecoder();
  const chunks: string[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new Error("payload-too-large");
    }
    chunks.push(decoder.decode(value, { stream: true }));
  }
  chunks.push(decoder.decode());

  try {
    return JSON.parse(chunks.join("")) as unknown;
  } catch {
    throw new Error("invalid-json");
  }
}

function cleanText(value: string) {
  return [...value]
    .filter((character) => {
      const codePoint = character.codePointAt(0) ?? 0;
      return (
        codePoint === 9 ||
        codePoint === 10 ||
        codePoint === 13 ||
        (codePoint >= 32 && codePoint !== 127)
      );
    })
    .join("")
    .trim();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function validatePayload(value: unknown): AssistantRequest | null {
  if (!isRecord(value)) return null;
  const input = value;
  if (typeof input.message !== "string" || !Array.isArray(input.history)) return null;
  if (input.history.length > MAX_HISTORY_LENGTH) return null;
  if (!input.history.every((entry: unknown): entry is string => typeof entry === "string"))
    return null;

  const message = cleanText(input.message);
  const history = input.history.map(cleanText);
  if (!message || message.length > MAX_MESSAGE_LENGTH) return null;
  if (history.some((entry) => !entry || entry.length > MAX_MESSAGE_LENGTH)) return null;
  return { message, history };
}

async function handleAssistantRequest(request: Request) {
  const origin = request.headers.get("origin");
  try {
    if (!origin || new URL(origin).origin !== new URL(request.url).origin) {
      return jsonResponse({ error: "invalid_origin" }, 403);
    }
  } catch {
    return jsonResponse({ error: "invalid_origin" }, 403);
  }

  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return jsonResponse({ error: "unsupported_media_type" }, 415);
  }

  const retryAfter = consumeRateLimit(getClientKey(request));
  if (retryAfter !== null) {
    return jsonResponse({ error: "rate_limited" }, 429, { "retry-after": String(retryAfter) });
  }

  let rawBody: unknown;
  try {
    rawBody = await readJsonBody(request);
  } catch (error) {
    const message = error instanceof Error ? error.message : "invalid-body";
    if (message === "payload-too-large") return jsonResponse({ error: message }, 413);
    return jsonResponse({ error: "invalid_body" }, 400);
  }

  const payload = validatePayload(rawBody);
  if (!payload) return jsonResponse({ error: "invalid_message" }, 400);

  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    return jsonResponse({ error: "assistant_not_configured" }, 503);
  }

  const { ASSISTANT_SYSTEM_PROMPT } = await import("@/data/support-knowledge.server");
  const messages: ChatMessage[] = [
    ...payload.history.map((content) => ({ role: "user" as const, content })),
    { role: "user", content: payload.message },
  ];
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);

  try {
    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: process.env["LOVABLE_MODEL"] || "google/gemini-2.5-flash",
        messages: [{ role: "system", content: ASSISTANT_SYSTEM_PROMPT }, ...messages],
        temperature: 0.2,
        max_tokens: 350,
      }),
      signal: controller.signal,
    });

    if (upstream.status === 429) {
      return jsonResponse({ error: "provider_rate_limited" }, 429, {
        "retry-after": upstream.headers.get("retry-after") ?? "60",
      });
    }
    if (upstream.status === 402) return jsonResponse({ error: "provider_unavailable" }, 503);
    if (!upstream.ok) {
      console.error(`[assistant] AI gateway returned status ${upstream.status}`);
      return jsonResponse({ error: "provider_unavailable" }, 502);
    }

    let response: unknown;
    try {
      response = await upstream.json();
    } catch {
      return jsonResponse({ error: "invalid_provider_response" }, 502);
    }

    const answer =
      response &&
      typeof response === "object" &&
      "choices" in response &&
      Array.isArray(response.choices) &&
      response.choices[0] &&
      typeof response.choices[0] === "object" &&
      "message" in response.choices[0] &&
      response.choices[0].message &&
      typeof response.choices[0].message === "object" &&
      "content" in response.choices[0].message
        ? response.choices[0].message.content
        : undefined;

    if (typeof answer !== "string" || !answer.trim()) {
      return jsonResponse({ error: "empty_provider_response" }, 502);
    }

    return jsonResponse({ answer: answer.trim().slice(0, 2500) }, 200);
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "AbortError";
    console.error(`[assistant] AI request ${timedOut ? "timed out" : "failed"}`);
    return jsonResponse({ error: timedOut ? "provider_timeout" : "provider_unavailable" }, 502);
  } finally {
    clearTimeout(timeout);
  }
}

const assistantEnabled = false;

export const Route = createFileRoute("/api/assistant")({
  server: {
    handlers: {
      POST: ({ request }) =>
        assistantEnabled
          ? handleAssistantRequest(request)
          : jsonResponse({ error: "assistant_disabled" }, 503),
    },
  },
});
