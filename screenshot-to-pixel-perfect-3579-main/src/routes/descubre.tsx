import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FairPicker } from "@/components/entresi/FairPicker";
import { OrganicBackdrop } from "@/components/entresi/OrganicBackdrop";
import { getFair } from "@/data/fairs";
import { currentQuizSelections, QUIZ, type QuizQuestion } from "@/data/quiz";
import { validateFairSearch, type FairSearch } from "@/lib/search";
import { useVisitor, visitorActions } from "@/lib/visitor-store";
import { cn } from "@/lib/utils";

type QuizSearch = FairSearch & { paso?: number };

export const Route = createFileRoute("/descubre")({
  validateSearch: (s: Record<string, unknown>): QuizSearch => {
    const n = Number(s["paso"]);
    return {
      ...validateFairSearch(s),
      ...(Number.isInteger(n) && n >= 1 && n <= QUIZ.length ? { paso: n } : {}),
    };
  },
  head: () => ({
    meta: [
      { title: "Descubre tus conexiones · Entre Sí" },
      { name: "description", content: "Seis preguntas rápidas para encontrar las marcas de la feria con más afinidad contigo." },
      { property: "og:title", content: "Descubre tus conexiones · Entre Sí" },
      { property: "og:description", content: "Seis preguntas rápidas para encontrar las marcas de la feria con más afinidad contigo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Quiz,
});

const tones = ["bg-coral-soft", "bg-mint-soft", "bg-sky-soft"];

function Quiz() {
  const { paso, feria } = Route.useSearch();
  const navigate = useNavigate({ from: "/descubre" });
  const visitor = useVisitor();
  const step = paso ?? 0;
  const fair = getFair(feria ?? visitor.fairId);
  const goTo = (n: number) =>
    navigate({ search: { ...(feria ? { feria } : {}), ...(n > 0 ? { paso: n } : {}) } });

  if (step === 0) {
    return (
      <section className="relative isolate mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <OrganicBackdrop />
        <div className="rise-in rounded-4xl bg-card/90 p-6 shadow-lift backdrop-blur sm:p-10">
          <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Descubre tus conexiones</p>
          <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">¿A qué feria vas?</h1>
          <p className="mt-3 text-muted-foreground">
            Solo te recomendaremos marcas que participan en la feria que elijas.
          </p>
          <div className="mt-6">
            <FairPicker
              value={fair.id}
              onChange={(id) => {
                visitorActions.setFair(id);
                if (feria) navigate({ search: { feria: id }, replace: true });
              }}
            />
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-3xl bg-mint-soft p-4 text-sm">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
            <p>
              No necesitas registrarte. Tus respuestas se guardan solo en este dispositivo y no se comparten con las
              marcas.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <Button asChild variant="link">
              <Link to="/marcas" search={{ feria: fair.id }}>
                Prefiero explorar todas las marcas
              </Link>
            </Button>
            <Button size="lg" variant="hero" onClick={() => goTo(1)}>
              Empezar <ArrowRight />
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const q = QUIZ[step - 1] as QuizQuestion;
  const selected = currentQuizSelections(q, visitor.answers[q.dimension]);
  const isLast = step === QUIZ.length;

  return (
    <section className="relative isolate mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <OrganicBackdrop />
      <ProgressBar
        step={step}
        onJump={goTo}
        answered={(i) => {
          const question = QUIZ[i]!;
          return currentQuizSelections(question, visitor.answers[question.dimension]).length > 0;
        }}
      />

      <div key={q.id} className="rise-in mt-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            {q.eyebrow} · {step} de {QUIZ.length}
          </p>
          <Button asChild size="sm" variant="outline">
            <Link to="/marcas" search={{ feria: fair.id }}>Omitir cuestionario</Link>
          </Button>
        </div>
        <h1 className="mt-2 text-3xl font-extrabold sm:text-5xl">{q.title}</h1>
        <p className="mt-2 text-muted-foreground">
          {q.helper}
          {q.type === "multiple" && ` · ${selected.length}/${q.maxSelections} elegidas`}
        </p>

        <OptionGrid
          question={q}
          selected={selected}
          onChange={(ids) => visitorActions.setAnswer(q.dimension, ids)}
        />
      </div>

      <div className="sticky bottom-0 mt-10 flex items-center justify-between gap-3 border-t border-border/60 bg-background/90 py-4 backdrop-blur">
        <Button variant="outline" onClick={() => goTo(step - 1)}>
          <ArrowLeft /> Atrás
        </Button>
        {isLast ? (
          <Button
            size="lg"
            variant="hero"
            disabled={selected.length === 0}
            onClick={() => {
              if (feria) visitorActions.setFair(fair.id);
              visitorActions.complete();
              navigate({ to: "/resultados" });
            }}
          >
            <Sparkles /> Ver mis conexiones
          </Button>
        ) : (
          <Button size="lg" variant="ink" disabled={selected.length === 0} onClick={() => goTo(step + 1)}>
            Siguiente <ArrowRight />
          </Button>
        )}
      </div>
    </section>
  );
}

function ProgressBar({
  step,
  onJump,
  answered,
}: {
  step: number;
  onJump: (n: number) => void;
  answered: (index: number) => boolean;
}) {
  const pct = (step / QUIZ.length) * 100;
  return (
    <div>
      <div
        className="h-3 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={QUIZ.length}
        aria-valuenow={step}
        aria-label="Progreso del cuestionario"
      >
        <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-3 flex justify-between gap-1">
        {QUIZ.map((q, i) => {
          const n = i + 1;
          const canJump = n <= step || answered(i) || (i > 0 && answered(i - 1));
          return (
            <button
              key={q.id}
              type="button"
              disabled={!canJump}
              onClick={() => onJump(n)}
              aria-label={`Ir a la pregunta ${n}`}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all disabled:opacity-40",
                n === step ? "bg-plum text-plum-foreground" : answered(i) ? "bg-mint" : "bg-card",
              )}
            >
              {answered(i) && n !== step ? <Check className="h-3.5 w-3.5" /> : n}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function OptionGrid({
  question,
  selected,
  onChange,
}: {
  question: QuizQuestion;
  selected: string[];
  onChange: (ids: string[]) => void;
}) {
  const full = question.type === "multiple" && selected.length >= question.maxSelections;
  const toggle = (id: string) => {
    if (question.type === "single") return onChange([id]);
    if (selected.includes(id)) return onChange(selected.filter((x) => x !== id));
    if (!full) onChange([...selected, id]);
  };

  return (
    <div
      role={question.type === "single" ? "radiogroup" : "group"}
      aria-label={question.title}
      className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3"
    >
      {question.options.map((o, i) => {
        const active = selected.includes(o.id);
        const disabled = !active && full;
        return (
          <button
            key={o.id}
            type="button"
            role={question.type === "single" ? "radio" : "checkbox"}
            aria-checked={active}
            disabled={disabled}
            onClick={() => toggle(o.id)}
            className={cn(
              "group relative flex min-h-36 flex-col justify-between rounded-4xl border-2 p-5 text-left transition-all",
              "hover:-translate-y-1 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 disabled:hover:shadow-none",
              active ? "border-foreground bg-card shadow-lift" : `border-transparent ${tones[i % tones.length]}`,
            )}
          >
            <span
              className={cn(
                "blob flex h-14 w-14 items-center justify-center text-3xl transition-transform group-hover:scale-110",
                active ? "bg-primary" : "bg-card",
              )}
              aria-hidden
            >
              {o.emoji}
            </span>
            <span className="mt-4 block">
              <span className="block font-display text-lg font-bold leading-tight">{o.label}</span>
              {o.hint && <span className="mt-0.5 block text-xs text-muted-foreground">{o.hint}</span>}
            </span>
            {active && (
              <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-plum text-plum-foreground">
                <Check className="h-4 w-4" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
