import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, LoaderCircle, Send, X } from "lucide-react";

import { WhatsAppSupport } from "@/components/entresi/WhatsAppSupport";
import { ASSISTANT_GREETING, ASSISTANT_QUICK_QUESTIONS } from "@/data/support-knowledge";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type AssistantChatProps = {
  onClose: () => void;
};

function getErrorMessage(code: string | undefined, status: number) {
  if (status === 429 || code === "rate_limited" || code === "provider_rate_limited") {
    return "Alcanzaste el límite temporal de consultas. Espera un momento o habla con nuestro equipo.";
  }
  if (code === "assistant_not_configured") {
    return "El servicio de IA aún no está configurado. No se generó una respuesta automática.";
  }
  if (code === "provider_timeout") {
    return "La respuesta está tardando demasiado. Inténtalo otra vez o contacta al equipo.";
  }
  return "No pudimos conectar con el asistente de IA. No se generó una respuesta automática.";
}

export function AssistantChat({ onClose }: AssistantChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: ASSISTANT_GREETING },
  ]);
  const [consent, setConsent] = useState(false);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const messageListRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messageListRef.current?.scrollTo({ top: messageListRef.current.scrollHeight });
  }, [messages, isSending]);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  async function sendMessage(rawMessage: string) {
    const message = rawMessage.trim();
    if (!consent || !message || isSending || message.length > 1000) return;

    const history = messages
      .filter((entry) => entry.role === "user")
      .map((entry) => entry.content)
      .slice(-4);
    setMessages((current) => [...current, { role: "user", content: message }]);
    setDraft("");
    setErrorMessage(null);
    setIsSending(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message, history }),
      });

      let payload: { answer?: unknown; error?: unknown } | null = null;
      try {
        payload = (await response.json()) as { answer?: unknown; error?: unknown };
      } catch {
        setErrorMessage(getErrorMessage(undefined, response.status));
        return;
      }

      const answer = payload.answer;
      if (!response.ok || typeof answer !== "string" || !answer.trim()) {
        setErrorMessage(
          getErrorMessage(
            typeof payload.error === "string" ? payload.error : undefined,
            response.status,
          ),
        );
        return;
      }

      setMessages((current) => [...current, { role: "assistant", content: answer.trim() }]);
    } catch {
      setErrorMessage(getErrorMessage(undefined, 0));
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(draft);
  }

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby="assistant-chat-title"
      className="mb-1 flex h-[min(42rem,calc(100dvh-11rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-4xl border border-border bg-background shadow-lift animate-in fade-in-0 slide-in-from-bottom-2 duration-200 sm:w-96"
    >
      <header className="flex items-center justify-between gap-3 bg-plum px-4 py-4 text-plum-foreground">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-coral text-plum">
            <Bot aria-hidden="true" className="size-5" />
          </span>
          <div>
            <h2 id="assistant-chat-title" className="font-bold">
              Asistente Entre Sí
            </h2>
            <p className="text-xs text-plum-foreground/75">Atención sobre la plataforma</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar chat"
          className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
      </header>

      <div
        ref={messageListRef}
        aria-live="polite"
        aria-relevant="additions text"
        className="flex-1 space-y-3 overflow-y-auto p-4"
      >
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${
              message.role === "assistant"
                ? "rounded-bl-sm bg-muted text-foreground"
                : "ml-auto rounded-br-sm bg-plum text-plum-foreground"
            }`}
          >
            {message.content}
          </div>
        ))}

        {isSending && (
          <p role="status" className="flex items-center gap-2 text-sm text-muted-foreground">
            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
            Preparando una respuesta con información de Entre Sí…
          </p>
        )}

        {errorMessage && (
          <div
            role="alert"
            className="space-y-3 rounded-2xl border border-coral/50 bg-coral-soft p-4"
          >
            <p className="text-sm leading-6">{errorMessage}</p>
            <WhatsAppSupport />
          </div>
        )}

        {messages.length === 1 && (
          <div className="space-y-2 pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Accesos rápidos
            </p>
            {ASSISTANT_QUICK_QUESTIONS.map((question) => (
              <button
                key={question}
                type="button"
                disabled={!consent || isSending}
                onClick={() => void sendMessage(question)}
                className="block w-full rounded-2xl border border-border bg-card px-3 py-2 text-left text-sm transition-colors hover:border-primary/60 hover:bg-coral-soft/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {question}
              </button>
            ))}
            <WhatsAppSupport label="Hablar con el equipo Entre Sí" />
          </div>
        )}
      </div>

      <div className="space-y-3 border-t bg-card p-3">
        <label className="flex items-start gap-2 text-xs leading-5 text-muted-foreground">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="mt-1 size-4 shrink-0 accent-primary"
          />
          <span>
            Acepto que mi consulta se envíe al servicio de IA de Lovable para generar una respuesta.
            No compartiré datos personales o sensibles. El historial no se guarda en esta
            plataforma.
          </span>
        </label>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <label className="sr-only" htmlFor="assistant-chat-input">
            Escribe tu consulta
          </label>
          <input
            ref={inputRef}
            id="assistant-chat-input"
            value={draft}
            maxLength={1000}
            disabled={!consent || isSending}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={consent ? "Escribe tu consulta…" : "Acepta el aviso para escribir"}
            autoComplete="off"
            className="h-11 min-w-0 flex-1 rounded-full border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!consent || !draft.trim() || isSending}
            aria-label="Enviar consulta"
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSending ? (
              <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
            ) : (
              <Send aria-hidden="true" className="size-5" />
            )}
          </button>
        </form>
        <p className="text-center text-[11px] leading-4 text-muted-foreground">
          No enviamos tu nombre, correo ni preferencias de la feria al asistente.
        </p>
      </div>
    </section>
  );
}
