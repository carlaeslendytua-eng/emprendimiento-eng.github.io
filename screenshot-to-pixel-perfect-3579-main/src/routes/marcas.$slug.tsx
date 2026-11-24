import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MapPin } from "lucide-react";
import { useEffect } from "react";

import { BrandActions } from "@/components/entresi/BrandActions";
import { FairPlan } from "@/components/entresi/FairPlan";
import { getBrand } from "@/data/brands";
import { FAIRS } from "@/data/fairs";
import { useActiveFair } from "@/lib/use-active-fair";
import { validateFairSearch } from "@/lib/search";
import { recordBrandEvent } from "@/lib/brand-visitor-counters";

export const Route = createFileRoute("/marcas/$slug")({
  validateSearch: validateFairSearch,
  loader: ({ params }) => {
    const brand = getBrand(params.slug);
    if (!brand) throw notFound();
    return { slug: brand.slug, name: brand.name, tagline: brand.tagline, category: brand.category };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.name} · ${loaderData.category} · Entre Sí` : "Marca · Entre Sí";
    const description = loaderData ? `${loaderData.tagline}. Conoce a ${loaderData.name} en la feria Entre Sí.` : "";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-3xl font-extrabold">No encontramos esta marca</h1>
      <Link to="/marcas" className="mt-4 inline-block font-semibold underline">
        Ver todas las marcas
      </Link>
    </div>
  ),
  component: BrandProfile,
});

function Facts({ title, items, tone }: { title: string; items: string[]; tone: string }) {
  if (items.length === 0) return null;
  return (
    <div className={`${tone} rounded-3xl p-5`}>
      <h3 className="text-sm font-bold uppercase tracking-wider">{title}</h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((i) => (
          <li key={i} className="rounded-full bg-card px-3 py-1 text-sm">
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

const differentiatorColors: Partial<Record<string, string>> = {
  memora: "border-[#5166e1] bg-[#e8edff] [&:nth-child(2)]:border-[#6362d8] [&:nth-child(2)]:bg-[#edebff] [&:nth-child(3)]:border-[#795bc9] [&:nth-child(3)]:bg-[#f2ebfc]",
  nergy: "border-[#c0d005] bg-[#f4f7d2]",
  "cuida-dog": "border-[#004897] bg-[#eaf2fc] [&:nth-child(2)]:border-[#e66a18] [&:nth-child(2)]:bg-[#fff0e5]",
  "pan-comido": "border-[#ee7d27] bg-[#fff1df]",
};

function BrandProfile() {
  const { slug } = Route.useLoaderData();
  useEffect(() => {
    void recordBrandEvent(slug, "view");
  }, [slug]);
  const { feria } = Route.useSearch();
  const brand = getBrand(slug)!;
  const fair = useActiveFair(feria);
  const exhibitor = fair.exhibitors.find((e) => e.brandSlug === brand.slug);
  const otherFairs = FAIRS.filter((f) => f.exhibitors.some((e) => e.brandSlug === brand.slug));
  const standLabel = exhibitor && (
    <p className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-2 text-sm font-bold">
      <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>Stand {exhibitor.stand} · {exhibitor.zone} · {fair.name}</span>
    </p>
  );
  const actions = (
    <BrandActions
      brandSlug={brand.slug}
      brandName={brand.name}
      fairId={exhibitor ? fair.id : (otherFairs[0]?.id ?? fair.id)}
      showProfile={false}
      showMap={Boolean(exhibitor) || otherFairs.length > 0}
    />
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link
        to="/marcas"
        search={{ feria: fair.id }}
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Todas las marcas
      </Link>

      <div className="mt-6 grid items-start gap-6 md:grid-cols-[minmax(0,360px)_1fr] md:gap-8">
        <div className={`w-full max-w-[360px] space-y-3 ${standLabel ? "md:pt-9" : ""}`}>
          {standLabel}
          <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-card shadow-lift">
            <img
              src={brand.image}
              alt={`Productos de ${brand.name}`}
              width={1024}
              height={768}
              className={`h-full w-full ${["entre-si", "cuenticos"].includes(brand.slug) ? "object-contain p-6" : "object-cover"} ${brand.slug === "cuida-dog" ? "scale-110" : ""}`}
            />
          </div>
          {actions}
        </div>
        <div className="space-y-4">
          <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{brand.category}</p>
          <h1 className="text-3xl font-extrabold sm:text-4xl">{brand.name}</h1>
          {brand.tagline && <p className="text-lg">{brand.tagline}</p>}
          <p className="text-muted-foreground">{brand.story}</p>
          {brand.differentiators.length > 0 && (
            <section aria-labelledby="brand-differentiators">
              <h2 id="brand-differentiators" className="text-base font-extrabold">
                Diferenciadores
              </h2>
              <ul className="mt-2 space-y-2">
                {brand.differentiators.map((item) => (
                  <li
                    key={item}
                    className={`rounded-r-xl border-l-4 px-3 py-2 text-sm font-medium leading-relaxed ${
                      differentiatorColors[brand.slug] ??
                      "border-[#4bb8b1] bg-[#e8f6f4] [&:nth-child(2)]:border-[#e66848] [&:nth-child(2)]:bg-[#fbece6] [&:nth-child(3)]:border-[#f7b82a] [&:nth-child(3)]:bg-[#fff4d8]"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {!exhibitor && otherFairs.length > 0 && (
            <p className="rounded-3xl bg-coral-soft p-4 text-sm">
              Esta marca no participa en {fair.name}. La encuentras en:{" "}
              {otherFairs.map((f) => f.name).join(", ")}.
            </p>
          )}
        </div>
      </div>

      <div className="mt-14 grid gap-4 empty:hidden sm:grid-cols-2 lg:grid-cols-3">
        <Facts title="Productos" items={brand.products} tone="bg-coral-soft" />
        <Facts title="Materiales" items={brand.materials} tone="bg-mint-soft" />
        <Facts title="Procesos" items={brand.processes} tone="bg-sky-soft" />
        <Facts title="Estilo" items={brand.style} tone="bg-sky-soft" />
        <Facts title="Valores" items={brand.values} tone="bg-coral-soft" />
      </div>
      {brand.differentiators.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground">Los diferenciadores de este emprendimiento estarán disponibles próximamente.</p>
      )}
      {exhibitor && fair.mapImage && (
        <section className="mt-12 rounded-4xl bg-card p-4 shadow-soft sm:p-6" aria-labelledby="brand-map-title">
          <h2 id="brand-map-title" className="mb-4 text-2xl font-extrabold">Cómo llegar al stand {exhibitor.stand}</h2>
          <FairPlan fair={fair} selectedSlug={brand.slug} />
        </section>
      )}
      {brand.priceRange && (
        <p className="mt-6 text-sm text-muted-foreground">
          Precios referenciales: USD {brand.priceRange.min} – {brand.priceRange.max}
        </p>
      )}
    </div>
  );
}
