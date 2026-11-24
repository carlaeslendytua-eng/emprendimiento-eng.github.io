import { useSyncExternalStore } from "react";

import { DEFAULT_FAIR_ID } from "@/data/fairs";
import type { Answers, DimensionKey } from "@/lib/affinity";

/**
 * Anonymous visitor state kept only on this device (no account needed).
 * Preferences are never sent to brands; only an explicit contact request is.
 */
export type VisitorState = {
  fairId: string;
  answers: Answers;
  completed: boolean;
  saved: string[];
};

const KEY = "entresi:visitor:v1";
const DEFAULT_STATE: VisitorState = { fairId: DEFAULT_FAIR_ID, answers: {}, completed: false, saved: [] };

let cache: VisitorState | null = null;
const listeners = new Set<() => void>();

function read(): VisitorState {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? { ...DEFAULT_STATE, ...(JSON.parse(raw) as Partial<VisitorState>) } : DEFAULT_STATE;
  } catch {
    cache = DEFAULT_STATE;
  }
  return cache;
}

function write(next: VisitorState) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable: keep in memory */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useVisitor() {
  return useSyncExternalStore(subscribe, read, () => DEFAULT_STATE);
}

export const visitorActions = {
  setFair(fairId: string) {
    write({ ...read(), fairId });
  },
  setAnswer(dimension: DimensionKey, ids: string[]) {
    const s = read();
    write({ ...s, answers: { ...s.answers, [dimension]: ids } });
  },
  complete() {
    write({ ...read(), completed: true });
  },
  resetQuiz() {
    write({ ...read(), answers: {}, completed: false });
  },
  toggleSaved(slug: string) {
    const s = read();
    const saved = s.saved.includes(slug) ? s.saved.filter((x) => x !== slug) : [...s.saved, slug];
    write({ ...s, saved });
    return saved.includes(slug);
  },
};
