import { createFileRoute, Link, useHydrated, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { Info, Pencil, RotateCcw, Search, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BrandActions } from "@/components/entresi/BrandActions";
import { FairPicker } from "@/components/entresi/FairPicker";
import { OrganicBackdrop } from "@/components/entresi/OrganicBackdrop";
import { BRANDS } from "@/data/brands";
import { getFair } from "@/data/fairs";
import { currentQuizSelections, QUIZ, QUIZ_OPTION_LABELS } from "@/data/quiz";
import { DIMENSION_LABELS, isQuizComplete, rankBrands, type BrandMatch } from "@/lib/affinity";
import { useVisitor, visitorActions } from "@/lib/visitor-store";

export const Route = createFileRoute("/resultados")({
  head: () => ({
    meta: [
      { title: "Marcas que conectan contigo · Entre Sí" },
      { name: "description", content: "Tu ranking personalizado de microempresas de la feria Entre Sí." },
      { property: "og:title", content: "Marcas que conectan contigo · Entre Sí" },
      { property: "og:description", content: "Tu ranking personalizado de microempresas de la feria Entre Sí." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Results,
});

function Results() {
  const hydrated = useHydrated();
  const visitor = useVisitor();
  const navigate = useNavigate();
  const fair = getFair(visitor.fairId);
  const answers = useMemo(
    () => Object.fromEntries(QUIZ.map((q) => [q.dimension, currentQuizSelections(q, visitor.answers[q.dimension])])),
    [visitor.answers],
  );
  const matches = useMemo(() => rankBrands(answers, fair, BRANDS), [answers, fair]);

  if (!hydrated) {
    return <div className="mx-auto h-[60vh] max-w-6xl animate-pulse px-4 py-14" aria-busy />;
  }

  if (!isQuizComplete(answers)) {
    return (
      <section className="relative isolate mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <OrganicBackdrop />
        <h1 className="text-4xl font-extrabold">Aún no tenemos tus preferencias</h1>
        <p className="mt-3 text-muted-foreground">Completa el cuestionario para descubrir las marcas que conectan contigo.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" variant="hero">
            <Link to="/asistentes">
              <Sparkles /> Descubre tus conexiones
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/marcas">Explorar todas las marcas</Link>
          </Button>
        </div>
      </section>
    );
  }

  let visitPlan: {duration?: string; arrival?: string; nickname?: string} = {};
  try {visitPlan = JSON.parse(sessionStorage.getItem("entresi:visit-plan") || "{}");} catch { /* optional local context */ }
  const durationLabel: Record<string,string> = {"30":"30 minutos", "60":"1 hora", "120":"2 horas", libre:"sin límite definido"};
  const arrivalLabel: Record<string,string> = {manana:"mañana", mediodia:"mediodía", tarde:"tarde", "no-se":"horario por definir"};
  const [featured, ...others] = matches;


  return (
    <div className="relative isolate">
      <OrganicBackdrop />
      <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          {fair.name} · {fair.dates}
        </p>
        <h1 className="mt-2 text-4xl font-extrabold sm:text-6xl">Marcas que conectan contigo</h1>
        {visitPlan.duration && <p className="mt-4 rounded-2xl bg-mint-soft px-4 py-3 text-sm">{visitPlan.nickname ? `${visitPlan.nickname}, e` : "E"}stas son tus conexiones para {durationLabel[visitPlan.duration] ?? "tu visita"}, en horario de {arrivalLabel[visitPlan.arrival ?? ""] ?? "tu elección"}. La duración y el horario son orientativos; aún no calculamos una ruta optimizada ni verificamos horarios comerciales.</p>}
        <div className="mt-5 flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/asistentes">
              <Pencil /> Modificar preferencias
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              visitorActions.resetQuiz();
              navigate({ to: "/asistentes" });
            }}
          >
            <RotateCcw /> Repetir cuestionario
          </Button>
          <Button asChild variant="link" size="sm">
            <Link to="/marcas" search={{ feria: fair.id }}>
              <Search /> Explorar todas las marcas
            </Link>
          </Button>
        </div>
      </section>

      {!featured ? (
        <section className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
          <div className="rounded-4xl bg-card p-8 shadow-soft">
            <h2 className="text-2xl font-bold">
              {fair.exhibitors.length === 0
                ? "Los emprendimientos de esta feria aún no están cargados"
                : "No encontramos coincidencias suficientes en esta feria"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {fair.exhibitors.length === 0
                ? "Tus respuestas se conservaron, pero todavía no hay emprendimientos cargados para esta exposición."
                : "Prueba ajustando tus preferencias, elige otra feria o explora todas las marcas participantes."}
            </p>
          </div>
        </section>
      ) : (
        <>
          <section className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
            <FeaturedMatch match={featured} fairId={fair.id} />
          </section>

          {others.length > 0 && (
            <section className="mx-auto mt-14 max-w-6xl px-4 sm:px-6">
              <h2 className="text-2xl font-extrabold sm:text-3xl">Otras marcas para descubrir</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {others.map((m, i) => (
                  <MatchCard key={m.brand.slug} match={m} rank={i + 2} fairId={fair.id} />
                ))}
              </div>
            </section>
          )}

          {matches.length < 3 && (
            <p className="mx-auto mt-6 max-w-6xl px-4 text-sm text-muted-foreground sm:px-6">
              En esta feria encontramos {matches.length === 1 ? "1 marca" : `${matches.length} marcas`} con afinidad
              suficiente. Puedes{" "}
              <Link to="/marcas" search={{ feria: fair.id }} className="font-semibold underline">
                explorar todas las participantes
              </Link>
              .
            </p>
          )}
        </>
      )}

      <section className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
        <p className="flex items-start gap-2 rounded-3xl bg-sky-soft p-4 text-sm">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          El porcentaje de afinidad es una puntuación estimada por nuestro algoritmo a partir de tus respuestas y de la
          ficha de cada marca. No es una probabilidad comprobada de compra.
        </p>
      </section>

      <section className="mx-auto mt-14 grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-extrabold">Tus preferencias</h2>
          <ul className="mt-4 space-y-2">
            {QUIZ.map((q, i) => (
              <li key={q.id} className="flex items-start justify-between gap-3 rounded-3xl bg-card p-4 shadow-soft">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {DIMENSION_LABELS[q.dimension]}
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {currentQuizSelections(q, visitor.answers[q.dimension]).map((id) => QUIZ_OPTION_LABELS[id]).join(", ")}
                  </p>
                </div>
                <Button asChild size="sm" variant="ghost">
                  <Link to="/asistentes" aria-label={`Cambiar ${DIMENSION_LABELS[q.dimension]}`}>
                    <Pencil /> Cambiar
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold">Ver resultados en otra feria</h2>
          <p className="mt-1 text-sm text-muted-foreground">Usamos las mismas respuestas con las marcas de esa feria.</p>
          <div className="mt-4">
            <FairPicker value={visitor.fairId} onChange={visitorActions.setFair} />
          </div>
        </div>
      </section>
    </div>
  );
}

function AffinityBadge({ percent, large }: { percent: number; large?: boolean }) {
  return (
    <div
      className={`blob flex shrink-0 flex-col items-center justify-center bg-primary ${large ? "h-24 w-24" : "h-16 w-16"}`}
      title="Puntuación estimada por el algoritmo"
    >
      <span className={`font-display font-extrabold leading-none ${large ? "text-3xl" : "text-xl"}`}>{percent}%</span>
      <span className="text-[10px] font-bold uppercase tracking-wide">afinidad</span>
    </div>
  );
}

function Breakdown({ match }: { match: BrandMatch }) {
  return (
    <details className="group rounded-3xl bg-muted/60 p-4 text-sm">
      <summary className="cursor-pointer font-semibold">Ver detalle de la afinidad</summary>
      <ul className="mt-3 space-y-2.5">
        {[...match.dimensions]
          .sort((a, b) => b.weight - a.weight)
          .map((d) => (
            <li key={d.dimension}>
              <div className="flex justify-between gap-2 text-xs">
                <span className="font-semibold">
                  {DIMENSION_LABELS[d.dimension]} <span className="text-muted-foreground">(peso {Math.round(d.weight * 100)}%)</span>
                </span>
                <span>{Math.round(d.score * 100)}%</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-card">
                <div className="h-full rounded-full bg-secondary" style={{ width: `${d.score * 100}%` }} />
              </div>
              {d.matched.length > 0 && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Coincide en: {d.matched.map((id) => QUIZ_OPTION_LABELS[id]).join(", ")}
                </p>
              )}
            </li>
          ))}
      </ul>
    </details>
  );
}

function FeaturedMatch({ match, fairId }: { match: BrandMatch; fairId: string }) {
  const { brand } = match;
  return (
    <article className="rise-in grid overflow-hidden rounded-4xl bg-card shadow-lift md:grid-cols-2">
      <div className="relative">
        <img src={brand.image} alt={brand.name} width={1024} height={768} className="h-full min-h-72 w-full object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-plum px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-plum-foreground">
          Tu mejor conexión
        </span>
      </div>
      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">{brand.category}</p>
            <h2 className="mt-1 text-4xl font-extrabold">{brand.name}</h2>
            <p className="mt-2 inline-flex rounded-full bg-mint px-3 py-1 text-xs font-bold">
              Stand {match.stand} · {match.zone}
            </p>
          </div>
          <AffinityBadge percent={match.percent} large />
        </div>
        <p className="text-lg leading-relaxed">{match.explanation}</p>
        <Breakdown match={match} />
        <BrandActions brandSlug={brand.slug} brandName={brand.name} fairId={fairId} className="mt-auto" />
      </div>
    </article>
  );
}

function MatchCard({ match, rank, fairId }: { match: BrandMatch; rank: number; fairId: string }) {
  const { brand } = match;
  return (
    <article className="flex flex-col overflow-hidden rounded-4xl bg-card shadow-soft">
      <div className="relative">
        <img
          src={brand.image}
          alt={brand.name}
          width={1024}
          height={768}
          loading="lazy"
          className="aspect-[16/9] w-full object-cover"
        />
        <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-card font-display font-extrabold">
          {rank}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">{brand.category}</p>
            <h3 className="text-2xl font-extrabold">{brand.name}</h3>
            <p className="mt-1 text-xs font-bold">
              Stand {match.stand} · {match.zone}
            </p>
          </div>
          <AffinityBadge percent={match.percent} />
        </div>
        <p className="text-sm leading-relaxed">{match.explanation}</p>
        <Breakdown match={match} />
        <BrandActions brandSlug={brand.slug} brandName={brand.name} fairId={fairId} className="mt-auto" />
      </div>
    </article>
  );
}
