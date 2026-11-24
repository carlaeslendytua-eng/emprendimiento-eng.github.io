import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrandActions } from "@/components/entresi/BrandActions";
import { FairPicker } from "@/components/entresi/FairPicker";
import { FairPlan } from "@/components/entresi/FairPlan";
import { getBrand } from "@/data/brands";
import { useActiveFair } from "@/lib/use-active-fair";
import { validateFairSearch } from "@/lib/search";
import { visitorActions } from "@/lib/visitor-store";

export const Route = createFileRoute("/marcas/")({
  validateSearch: validateFairSearch,
  head: () => ({
    meta: [
      { title: "Todas las marcas de la feria · Entre Sí" },
      { name: "description", content: "Explora las microempresas productoras de Quito que participan en las ferias Entre Sí." },
      { property: "og:title", content: "Todas las marcas de la feria · Entre Sí" },
      { property: "og:description", content: "Explora las microempresas productoras de Quito que participan en las ferias Entre Sí." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BrandsPage,
});

function BrandsPage() {
  const { feria } = Route.useSearch();
  const fair = useActiveFair(feria);
  const navigate = useNavigate({ from: "/marcas/" });
  const [query, setQuery] = useState("");

  const brands = useMemo(() => {
    const q = query.trim().toLowerCase();
    return fair.exhibitors
      .map((ex) => ({ ex, brand: getBrand(ex.brandSlug) }))
      .filter((x): x is { ex: typeof x.ex; brand: NonNullable<typeof x.brand> } => Boolean(x.brand))
      .filter(({ brand }) =>
        !q
          ? true
          : [brand.name, brand.category, ...brand.products, ...brand.keywords, ...brand.materials]
              .join(" ")
              .toLowerCase()
              .includes(q),
      );
  }, [fair, query]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Explora sin cuestionario</p>
          <h1 className="mt-1 text-4xl font-extrabold sm:text-5xl">Todas las marcas</h1>
        </div>
        <Button asChild variant="hero">
          <Link to="/descubre">
            <Sparkles /> Descubre tus conexiones
          </Link>
        </Button>
      </div>

      <div className="mt-8">
        <FairPicker
          value={fair.id}
          onChange={(id) => {
            visitorActions.setFair(id);
            navigate({ search: { feria: id } });
          }}
        />
      </div>

      <section className="mt-6 rounded-3xl bg-card p-4 shadow-soft sm:p-6" aria-labelledby="brands-map-title">
        <h2 id="brands-map-title" className="mb-4 text-xl font-extrabold">Mapa de la feria</h2>
        <FairPlan fair={fair} compact />
      </section>

      <div className="relative mt-6 max-w-md">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por producto, material o marca"
          className="h-12 rounded-full bg-card pl-11"
          aria-label="Buscar marcas"
        />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6" aria-label="Emprendimientos participantes">
        {brands.map(({ brand, ex }) => (
          <article key={brand.slug} className="flex min-w-0 flex-col overflow-hidden rounded-3xl bg-card shadow-soft">
            <img
              src={brand.image}
              alt={brand.name}
              width={1024}
              height={768}
              loading="lazy"
              className={`aspect-[4/3] w-full ${["entre-si", "cuenticos"].includes(brand.slug) ? "bg-card object-contain p-3 sm:p-8" : "object-cover"}`}
            />
            <div className="flex flex-1 flex-col gap-3 p-3 sm:p-5">
              <div>
                <p className="text-sm font-semibold text-muted-foreground">{brand.category}</p>
                <h2 className="text-lg font-extrabold sm:text-2xl">{brand.name}</h2>
                <p className="mt-1 text-sm">{brand.tagline}</p>
              </div>
              <p className="inline-flex w-fit rounded-full bg-mint px-3 py-1 text-xs font-bold">
                Stand {ex.stand} · {ex.zone}
              </p>
              <BrandActions
                brandSlug={brand.slug}
                brandName={brand.name}
                fairId={fair.id}
                className="mt-auto pt-2 [&>*]:h-auto [&>*]:min-h-9 [&>*]:max-w-full [&>*]:whitespace-normal [&>*]:py-1"
              />
            </div>
          </article>
        ))}
      </div>
      {brands.length === 0 && (
        <p className="mt-8 rounded-3xl bg-card p-6 text-muted-foreground">
          Ninguna marca de esta feria coincide con “{query}”.
        </p>
      )}
    </div>
  );
}
