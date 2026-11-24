import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Handshake, Heart, Lightbulb, ShieldCheck, Target, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/nosotros")({
  component: Nosotros,
  head: () => ({
    meta: [
      { title: "Quiénes somos · Entre Sí" },
      {
        name: "description",
        content:
          "Conoce la misión, visión, valores y promesa de Entre Sí: historias que merecen encontrarse.",
      },
    ],
  }),
});

const values = [
  {
    icon: Heart,
    title: "Cercanía",
    description:
      "Escuchamos las experiencias y necesidades de cada microempresa para ofrecer un acompañamiento adaptado a su realidad.",
  },
  {
    icon: Handshake,
    title: "Compromiso",
    description: "Cumplimos los acuerdos, entregables y plazos establecidos para cada servicio.",
  },
  {
    icon: ShieldCheck,
    title: "Honestidad",
    description:
      "Comunicamos con claridad el alcance de nuestros servicios y los resultados obtenidos, sin generar expectativas que no podamos cumplir.",
  },
  {
    icon: Lightbulb,
    title: "Creatividad",
    description:
      "Proponemos soluciones que expresan la identidad de cada marca y aprovechan sus recursos.",
  },
  {
    icon: Award,
    title: "Excelencia",
    description:
      "Desarrollamos cada proyecto valorando el esfuerzo y la dedicación que las microempresas invierten en sus negocios.",
  },
];

function Nosotros() {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-background">
        <div
          aria-hidden="true"
          className="blob-alt pointer-events-none absolute -right-32 -top-20 -z-10 h-96 w-96 bg-lilac-soft/70 blur-2xl"
        />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">
            Quiénes somos
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-extrabold leading-[1.03] sm:text-6xl lg:text-7xl">
            Entre Sí: hay historias que merecen encontrarse.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Somos un emprendimiento ecuatoriano que busca fortalecer la presencia comercial de
            microempresas productoras y manufactureras, conectando sus historias, productos y
            propuestas de valor con personas que comparten sus intereses.
          </p>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Creemos que cada microempresa tiene una historia que merece ser conocida y oportunidades
            de crecimiento que pueden surgir a partir de nuevas conexiones.
          </p>
          <Button asChild size="lg" variant="hero" className="mt-8">
            <Link to="/planes">
              Conoce cómo podemos acompañarte <Target aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:px-6 md:grid-cols-2">
        <article className="rounded-4xl bg-mint-soft p-7 sm:p-9">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-card">
            <Target aria-hidden="true" className="size-6" />
          </span>
          <h2 className="mt-5 text-3xl font-extrabold">Nuestra misión</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Fortalecer la presencia comercial de microempresas productoras y manufactureras de Quito
            mediante una plataforma web que comunica el valor de sus marcas y facilita conexiones
            con personas afines a sus productos, contribuyendo a su crecimiento.
          </p>
        </article>
        <article className="rounded-4xl bg-lilac-soft p-7 sm:p-9">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-card">
            <Eye aria-hidden="true" className="size-6" />
          </span>
          <h2 className="mt-5 text-3xl font-extrabold">Nuestra visión</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            En los próximos cinco años, consolidar la presencia de Entre Sí en las ferias de Quito y
            ampliar progresivamente nuestro alcance hacia pequeñas y medianas empresas de los
            sectores productivos y de servicios, impulsando el reconocimiento de sus marcas y su
            crecimiento comercial.
          </p>
        </article>
      </section>

      <section
        aria-labelledby="values-title"
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16"
      >
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">
            Lo que guía nuestro trabajo
          </p>
          <h2 id="values-title" className="mt-3 text-4xl font-extrabold sm:text-5xl">
            Nuestros valores
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <article key={value.title} className="rounded-4xl bg-card p-6 shadow-soft">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-coral-soft">
                <value.icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-4 text-xl font-extrabold">{value.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="grid gap-5 md:grid-cols-[0.8fr_1.2fr]">
          <article className="rounded-4xl bg-coral-soft p-7 sm:p-9">
            <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Nuestra promesa
            </p>
            <h2 className="mt-4 text-3xl font-extrabold">
              Brindar un acompañamiento cercano y comprometido.
            </h2>
          </article>
          <article className="flex flex-col justify-center rounded-4xl bg-plum p-7 text-plum-foreground sm:p-9">
            <p className="text-sm font-bold uppercase tracking-wider text-plum-foreground/70">
              Nuestro eslogan
            </p>
            <p className="mt-4 text-3xl font-extrabold sm:text-4xl">
              “Hay historias que merecen encontrarse.”
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
