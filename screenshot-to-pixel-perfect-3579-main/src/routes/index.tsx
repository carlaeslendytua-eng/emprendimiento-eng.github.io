import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  LayoutTemplate,
  MapPinned,
  Megaphone,
  MessageCircle,
  Sparkles,
  Store,
  UsersRound,
} from "lucide-react";

import { FairFinder } from "@/components/entresi/FairFinder";
import { Button } from "@/components/ui/button";
import { BRANDS } from "@/data/brands";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Entre Sí · Ferias, microempresas y conexiones" },
      {
        name: "description",
        content:
          "Encuentra oportunidades feriales para tu negocio y conecta tu marca con personas interesadas en lo que ofreces.",
      },
      { property: "og:title", content: "Entre Sí · Ferias, microempresas y conexiones" },
      {
        property: "og:description",
        content: "Oportunidades feriales y conexiones entre microempresas y sus clientes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const serviceCards = [
  {
    icon: CalendarDays,
    title: "Oportunidades feriales",
    description: "Información organizada sobre ferias y exposiciones comerciales.",
    image: BRANDS[0]!.image,
    alt: "Productos textiles de un perfil de marca de demostración",
    to: "/ferias" as const,
  },
  {
    icon: MessageCircle,
    title: "Comunicación de marca",
    description: "Asesoría para identificar y comunicar los diferenciadores de cada microempresa.",
    image: BRANDS[1]!.image,
    alt: "Productos artesanales de un perfil de marca de demostración",
    to: "/marcas-servicios" as const,
  },
  {
    icon: UsersRound,
    title: "Promoción y conexión",
    description:
      "Difusión de marcas, recomendaciones por afinidad y herramientas para captar contactos comerciales.",
    image: BRANDS[2]!.image,
    alt: "Productos de diseño de un perfil de marca de demostración",
    to: "/marcas-servicios" as const,
  },
  {
    icon: LayoutTemplate,
    title: "Identidad ferial",
    description:
      "Diseño de stands y materiales gráficos para fortalecer la presencia de una marca en eventos.",
    image: BRANDS[3]!.image,
    alt: "Productos de una microempresa de alimentos de demostración",
    to: "/planes" as const,
  },
];

const fairMoments = [
  {
    icon: CalendarDays,
    label: "Antes",
    tone: "bg-lilac-soft",
    actions: [
      "Identificar oportunidades",
      "Preparar el perfil comercial",
      "Comunicar los diferenciadores",
      "Promocionar la participación",
    ],
  },
  {
    icon: MapPinned,
    label: "Durante",
    tone: "bg-mint-soft",
    actions: [
      "Facilitar el descubrimiento de marcas",
      "Recomendar microempresas por afinidad",
      "Ubicar los stands en un mapa",
      "Captar contactos con autorización",
    ],
  },
  {
    icon: BadgeCheck,
    label: "Después",
    tone: "bg-coral-soft",
    actions: [
      "Organizar contactos",
      "Revisar las interacciones",
      "Consultar reportes",
      "Facilitar el seguimiento comercial",
    ],
  },
];

const plans = [
  {
    icon: Megaphone,
    name: "Plan Visibilidad",
    description:
      "Presentación comercial, perfil digital, catálogo, recursos de descubrimiento y reporte básico según el alcance contratado.",
  },
  {
    icon: UsersRound,
    name: "Plan Conexión",
    description:
      "Asesoría de marca, promoción, recomendaciones por afinidad, captación de contactos y seguimiento comercial.",
  },
  {
    icon: LayoutTemplate,
    name: "Plan Identidad Ferial",
    description:
      "Diseño visual del stand, propuesta de distribución, kit gráfico, guía de montaje y asesoría especializada.",
  },
];

const exampleBrands = BRANDS.filter((brand) =>
  ["trama-nomada", "brote-circular", "grano-alto"].includes(brand.slug),
);

function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-background">
        <div
          aria-hidden="true"
          className="blob-alt pointer-events-none absolute -right-36 top-12 -z-10 h-96 w-96 bg-lilac-soft/70 blur-2xl"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="rise-in space-y-6">
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              Ferias, microempresas y conexiones
            </p>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Las ferias abren oportunidades. Entre Sí crea conexiones.
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Encuentra oportunidades feriales para tu negocio y conecta tu marca con personas
              interesadas en lo que ofreces.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="xl" variant="hero">
                <Link to="/ferias">
                  <Store aria-hidden="true" /> Explorar ferias
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <a href="#servicios">Conoce nuestros servicios</a>
              </Button>
            </div>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles aria-hidden="true" className="size-4" />
              También puedes descubrir marcas por afinidad, sin registrarte.
            </p>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="blob absolute -left-5 -top-5 h-24 w-24 bg-coral-soft/80"
            />
            <div className="relative grid min-h-[420px] grid-cols-2 grid-rows-2 gap-3 overflow-hidden rounded-4xl sm:min-h-[500px]">
              {exampleBrands.map((brand, index) => {
                const photo = brand.gallery[1];
                return (
                  <figure
                    key={brand.slug}
                    className={`group relative min-h-48 overflow-hidden rounded-3xl shadow-soft ${
                      index === 0 ? "row-span-2" : ""
                    }`}
                  >
                    <img
                      src={photo?.src ?? brand.image}
                      alt={photo?.alt ?? `Imagen ilustrativa de ${brand.category}`}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-plum/80 via-plum/5 to-transparent" />
                    <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm font-bold text-white sm:p-5 sm:text-base">
                      {brand.name}
                    </figcaption>
                  </figure>
                );
              })}
              <span className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1.5 text-xs font-bold shadow-soft sm:right-5 sm:top-5">
                Perfiles de demostración
              </span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Imágenes ilustrativas de marcas y procesos de microempresas.
            </p>
          </div>
        </div>
      </section>

      <section
        id="ferias"
        aria-labelledby="fairs-title"
        className="scroll-mt-24 bg-card py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Oportunidades para tu negocio
            </p>
            <h2 id="fairs-title" className="mt-3 text-4xl font-extrabold sm:text-5xl">
              Descubre las próximas ferias en Ecuador
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Conoce nuevas oportunidades para presentar tus productos y ampliar el alcance de tu
              marca.
            </p>
          </div>
          <FairFinder />
        </div>
      </section>

      <section
        id="servicios"
        aria-labelledby="services-title"
        className="scroll-mt-24 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Cómo impulsamos tu marca
            </p>
            <h2 id="services-title" className="mt-3 text-4xl font-extrabold sm:text-5xl">
              ¿Qué hacemos?
            </h2>
          </div>
          <Button asChild variant="link">
            <Link to="/marcas-servicios">
              Todos los servicios <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {serviceCards.map((service) => (
            <article
              key={service.title}
              className="group overflow-hidden rounded-4xl bg-card shadow-soft transition-transform hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 flex size-11 items-center justify-center rounded-full bg-background text-foreground shadow-soft">
                  <service.icon aria-hidden="true" className="size-5" />
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-extrabold">{service.title}</h3>
                <p className="mt-2 min-h-16 text-sm leading-6 text-muted-foreground">
                  {service.description}
                </p>

              </div>
            </article>
          ))}
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          Las imágenes de productos corresponden a perfiles visuales de demostración.
        </p>
      </section>

      <section aria-labelledby="process-title" className="bg-lilac-soft/60 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Acompañamiento ferial
            </p>
            <h2 id="process-title" className="mt-3 text-4xl font-extrabold sm:text-5xl">
              Te acompañamos antes, durante y después de la feria
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {fairMoments.map((moment, index) => (
              <article
                key={moment.label}
                className={`relative rounded-4xl p-6 sm:p-8 ${moment.tone}`}
              >
                {index < fairMoments.length - 1 && (
                  <ArrowRight
                    aria-hidden="true"
                    className="absolute -right-4 top-10 z-10 hidden size-8 rounded-full bg-card p-1.5 lg:block"
                  />
                )}
                <div className="flex items-center gap-4">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-card">
                    <moment.icon aria-hidden="true" className="size-6" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Etapa {index + 1}
                    </p>
                    <h3 className="text-2xl font-extrabold">{moment.label}</h3>
                  </div>
                </div>
                <ul className="mt-6 space-y-3">
                  {moment.actions.map((action) => (
                    <li key={action} className="flex items-start gap-3 text-sm leading-6">
                      <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
                      {action}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="planes" aria-labelledby="plans-title" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Crece con Entre Sí
            </p>
            <h2 id="plans-title" className="mt-3 text-4xl font-extrabold sm:text-5xl">
              Membresía y servicios para tu negocio
            </h2>
            <p className="mt-4 text-muted-foreground">
              La membresía mensual y los servicios adicionales son productos distintos.
            </p>
          </div>

          <article className="grid gap-8 overflow-hidden rounded-4xl border-2 border-primary/30 bg-card p-6 shadow-soft sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-wider text-primary">
                Membresía Entre Sí
              </p>
              <h3 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                USD 2,50 <span className="text-lg font-semibold">/ mensuales</span>
              </h3>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                Para microempresas registradas: consulta el directorio completo de ferias, usa
                filtros y revisa información exclusiva mientras tu membresía esté activa.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                El prototipo no procesa pagos ni activa membresías.
              </p>
            </div>
            <Button asChild size="xl" variant="hero">
              <Link to="/registro">Suscribirme</Link>
            </Button>
          </article>

          <h3 className="mt-14 text-3xl font-extrabold">Servicios adicionales</h3>
          <p className="mt-2 text-muted-foreground">
            Alcance y precio se acuerdan mediante cotización; no están incluidos en la membresía.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className="flex flex-col rounded-4xl bg-card p-6 shadow-soft"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-mint-soft">
                  <plan.icon aria-hidden="true" className="size-6" />
                </span>
                <h4 className="mt-5 text-2xl font-extrabold">{plan.name}</h4>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                  {plan.description}
                </p>
                <Button asChild variant="outline" className="mt-6">
                  <Link to="/registro">Solicitar cotización</Link>
                </Button>
              </article>
            ))}
          </div>
          <p className="mt-5 text-center text-xs text-muted-foreground">
            Los formularios de este prototipo solo muestran una vista previa; no envían solicitudes
            ni cotizaciones.
          </p>
        </div>
      </section>
    </>
  );
}
