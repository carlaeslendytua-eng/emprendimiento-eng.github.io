import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Check,
  CircleHelp,
  Eye,
  LayoutTemplate,
  MessageCircle,
  Minus,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import heroImage from "@/assets/gallery-barro-vivo.jpg";
import { PlanServiceCard } from "@/components/entresi/PlanServiceCard";
import { OrganicBackdrop } from "@/components/entresi/OrganicBackdrop";
import { Button } from "@/components/ui/button";
import { SERVICE_PLAN_COMPARISON, SERVICE_PLANS } from "@/data/plan-page";

const PLAN_ICONS = {
  visibilidad: Eye,
  conexion: Network,
  "identidad-ferial": LayoutTemplate,
} as const;

const WHATSAPP_NUMBER = "593960942522";
const GENERAL_WHATSAPP_MESSAGE =
  "Hola, equipo de Entre Sí. Quiero conocer sus servicios y encontrar la mejor forma de presentar mi marca en una próxima feria. ¿Podrían asesorarme?";
const GENERAL_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(GENERAL_WHATSAPP_MESSAGE)}`;

export const Route = createFileRoute("/planes")({
  head: () => ({
    meta: [
      { title: "Planes y servicios · Entre Sí" },
      {
        name: "description",
        content:
          "Conoce la membresía Entre Sí y compara los servicios Visibilidad, Conexión e Identidad Ferial.",
      },
    ],
  }),
  component: Planes,
});

function Planes() {
  return (
    <main className="relative isolate overflow-hidden">
      <OrganicBackdrop />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-14 lg:pb-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-lilac-soft px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-plum">
            <Sparkles aria-hidden="true" className="size-4 text-primary" />
            Planes y servicios
          </p>
          <h1 className="mt-5 max-w-2xl font-display text-4xl font-extrabold leading-[1.08] text-plum sm:text-6xl">
            Planes que impulsan tu marca
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            Desde tu primera oportunidad ferial hasta una experiencia de marca completa. Encuentra
            el servicio que se adapta a tus necesidades.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="hero">
              <a href="#servicios">
                Explorar servicios <ArrowDown aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#membresia">Ver membresía</a>
            </Button>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck aria-hidden="true" className="size-4 text-primary" />
            Los servicios adicionales se cotizan según el alcance acordado.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div
            aria-hidden="true"
            className="blob blob-morph absolute -right-4 -top-5 h-28 w-28 bg-coral-soft"
          />
          <div className="relative overflow-hidden rounded-[2rem] border-8 border-card bg-card shadow-lift">
            <img
              src={heroImage}
              alt="Manos artesanas moldeando una pieza de barro en un taller de microempresa"
              className="aspect-[4/3] w-full object-cover"
              fetchPriority="high"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-background/95 p-4 shadow-soft backdrop-blur-sm sm:inset-x-6 sm:bottom-6 sm:p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary">
                Historias que merecen encontrarse
              </p>
              <p className="mt-1 font-display text-lg font-bold text-plum sm:text-xl">
                Cada marca lleva un oficio y una historia.
              </p>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="blob-alt absolute -bottom-6 -left-7 -z-10 h-24 w-24 bg-mint-soft"
          />
        </div>
      </section>

      <section id="membresia" className="scroll-mt-24 bg-card/70 py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 rounded-4xl border border-primary/20 bg-background p-6 shadow-soft sm:p-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
            <div className="flex flex-col items-start">
              <span className="rounded-full bg-mint-soft px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-plum">
                Una opción independiente
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold text-plum sm:text-4xl">
                Membresía básica
              </h2>
              <p className="mt-3 text-muted-foreground">Membresía mensual Entre Sí</p>
              <p className="mt-5 text-4xl font-extrabold text-plum sm:text-5xl">
                USD 2,50
                <span className="ml-2 text-base font-semibold text-muted-foreground">/ mes</span>
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                La membresía es distinta de los planes de comunicación y diseño ferial.
              </p>
              <Button asChild variant="hero" size="lg" className="mt-7">
                <Link to="/registro">
                  Suscribirme <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <p className="mt-3 max-w-sm text-xs leading-5 text-muted-foreground">
                El registro no procesa pagos ni activa una suscripción. La activación requiere
                confirmación mediante una pasarela de pago.
              </p>
            </div>

            <div className="rounded-3xl bg-cream/70 p-5 sm:p-7">
              <h3 className="font-display text-xl font-bold text-plum">
                Oportunidades para preparar tu próxima feria
              </h3>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  "Acceso al directorio completo de ferias en Ecuador.",
                  "Búsqueda por provincia, ciudad y sector.",
                  "Información detallada de ferias disponibles.",
                  "Guardado de ferias de interés.",
                  "Acceso a oportunidades actualizadas.",
                ].map((benefit) => (
                  <li key={benefit} className="flex gap-3 text-sm leading-6">
                    <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="servicios"
        className="scroll-mt-24 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-primary">
            Servicios adicionales
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-plum sm:text-4xl">
            Acompañamiento para cada etapa de tu feria
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Compara el alcance de cada servicio. Los planes adicionales no tienen un precio
            publicado y se cotizan según lo acordado.
          </p>
        </div>

        <div className="mt-9 grid items-stretch gap-5 lg:grid-cols-3">
          {SERVICE_PLANS.map((plan) => (
            <PlanServiceCard key={plan.id} plan={plan} icon={PLAN_ICONS[plan.id]} />
          ))}
        </div>
      </section>

      <section className="bg-lilac-soft/60 py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-primary">
              Compara el alcance
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-plum sm:text-4xl">
              ¿Qué incluye cada servicio?
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Identidad Ferial incluye todos los beneficios del Plan Conexión, además de los
              entregables de diseño del stand.
            </p>
          </div>

          <div className="mt-7 overflow-x-auto rounded-3xl border border-border bg-card shadow-soft">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-plum text-plum-foreground">
                  <th
                    scope="col"
                    className="sticky left-0 z-10 min-w-56 bg-plum px-5 py-4 font-bold"
                  >
                    Característica
                  </th>
                  {SERVICE_PLANS.map((plan) => (
                    <th key={plan.id} scope="col" className="min-w-52 px-5 py-4 font-bold">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SERVICE_PLAN_COMPARISON.map((row, rowIndex) => (
                  <tr
                    key={row.feature}
                    className={rowIndex % 2 === 0 ? "bg-background" : "bg-card"}
                  >
                    <th
                      scope="row"
                      className={`sticky left-0 z-10 px-5 py-4 font-semibold text-plum ${
                        rowIndex % 2 === 0 ? "bg-background" : "bg-card"
                      }`}
                    >
                      {row.feature}
                    </th>
                    {row.values.map((value, valueIndex) => (
                      <td key={`${row.feature}-${valueIndex}`} className="px-5 py-4 align-top">
                        <span
                          className={`inline-flex items-start gap-2 leading-5 ${
                            value.kind === "not-included"
                              ? "text-muted-foreground"
                              : "text-foreground"
                          }`}
                        >
                          {value.kind === "not-included" ? (
                            <Minus aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                          ) : value.kind === "included" ? (
                            <BadgeCheck
                              aria-hidden="true"
                              className="mt-0.5 size-4 shrink-0 text-primary"
                            />
                          ) : (
                            <CircleHelp
                              aria-hidden="true"
                              className="mt-0.5 size-4 shrink-0 text-plum"
                            />
                          )}
                          {value.text}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            El envío promocional, los avisos por cercanía y el contacto con visitantes dependen de
            sus autorizaciones. Los avisos por ubicación también requieren una solución técnica
            disponible.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="relative overflow-hidden rounded-4xl bg-plum px-6 py-10 text-plum-foreground shadow-lift sm:px-10 sm:py-14">
          <div
            aria-hidden="true"
            className="blob blob-morph absolute -right-14 -top-20 h-56 w-56 bg-coral/30"
          />
          <div
            aria-hidden="true"
            className="blob-alt absolute -bottom-20 left-1/3 h-48 w-48 bg-mint/20"
          />
          <div className="relative max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-coral">
              Entre Sí · Hay historias que merecen encontrarse
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
              Cada marca tiene una historia. Hagamos que la tuya conecte.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-plum-foreground/80">
              Conoce nuestros servicios y encuentra la mejor forma de presentar tu marca en tu
              próxima feria.
            </p>
            <Button asChild size="lg" className="mt-7 bg-coral text-plum hover:bg-coral/90">
              <a href={GENERAL_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" /> Hablar con Entre Sí
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
