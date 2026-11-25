import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, Heart } from "lucide-react";
import { useState } from "react";

import { BrandActions } from "@/components/entresi/BrandActions";
import { FairPicker } from "@/components/entresi/FairPicker";
import { FairPlan } from "@/components/entresi/FairPlan";
import { getBrand, normalizeBrandSlug } from "@/data/brands";
import { useActiveFair } from "@/lib/use-active-fair";
import { useVisitor, visitorActions } from "@/lib/visitor-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FAIRS } from "@/data/fairs";

type MapSearch = { feria?: string; marca?: string };

export const Route = createFileRoute("/mapa")({
  validateSearch: (s: Record<string, unknown>): MapSearch => {
    const feria = s["feria"];
    const marca = s["marca"];
    return {
      ...(typeof feria === "string" && FAIRS.some((f) => f.id === feria) ? { feria } : {}),
      ...(typeof marca === "string" ? { marca: normalizeBrandSlug(marca) } : {}),
    };
  },
  head: () => ({
    meta: [
      { title: "Mapa de la feria · Entre Sí" },
      { name: "description", content: "Ubica los stands de las microempresas participantes en la feria Entre Sí." },
      { property: "og:title", content: "Mapa de la feria · Entre Sí" },
      { property: "og:description", content: "Ubica los stands de las microempresas participantes en la feria Entre Sí." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FairMap,
});

function FairMap() {
  const { feria, marca } = Route.useSearch();
  const fair = useActiveFair(feria);
  return <FairMapContent key={JSON.stringify([fair.id, marca])} fair={fair} linkedBrand={marca} />;
}

function FairMapContent({
  fair,
  linkedBrand,
}: {
  fair: ReturnType<typeof useActiveFair>;
  linkedBrand: string | undefined;
}) {
  const navigate = useNavigate({ from: "/mapa" });
  const [marca, setMarca] = useState(linkedBrand);
  const { saved } = useVisitor();
  const savedBrands = saved.map(getBrand).filter((brand) => brand !== undefined);
  const selected = fair.exhibitors.find((e) => e.brandSlug === marca);
  const missingBrand = marca && !selected ? getBrand(marca) : undefined;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{fair.place}</p>
      <h1 className="mt-1 text-4xl font-extrabold sm:text-5xl">Mapa de {fair.name}</h1>

      <div className="mt-6 grid items-start gap-4 sm:grid-cols-2">
        <FairPicker
          className="sm:grid-cols-1"
          value={fair.id}
          onChange={(id) => {
            visitorActions.setFair(id);
            setMarca(undefined);
            navigate({ search: { feria: id } });
          }}
        />
        <section className="rounded-3xl bg-card p-5 shadow-soft" aria-labelledby="saved-brands-title">
          <h2 id="saved-brands-title" className="flex items-center gap-2 text-xl font-extrabold">
            <Heart className="size-5" aria-hidden="true" />
            Marcas guardadas
          </h2>
          {savedBrands.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {savedBrands.map((brand) => {
                const exhibitor = fair.exhibitors.find((item) => item.brandSlug === brand.slug);
                return (
                  <li key={brand.slug}>
                    <Link
                      to="/marcas/$slug"
                      params={{ slug: brand.slug }}
                      search={exhibitor ? { feria: fair.id } : {}}
                      className="flex items-center justify-between gap-2 rounded-2xl bg-mint-soft px-3 py-2 hover:underline"
                    >
                      <span className="text-sm font-bold">{brand.name}</span>
                      <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                        {exhibitor && `Stand ${exhibitor.stand}`}
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              Usa «Guardar marca» en un perfil para encontrarlo aquí.
            </p>
          )}
          <Button asChild variant="outline" size="sm" className="mt-4">
            <Link to="/guardadas">Ver mis marcas guardadas</Link>
          </Button>
        </section>
      </div>

      {missingBrand && (
        <p className="mt-4 rounded-3xl bg-coral-soft p-4 text-sm">
          {missingBrand.name} no participa en esta feria.
        </p>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-4xl bg-card p-4 shadow-soft sm:p-6">
          <FairPlan
            fair={fair}
            selectedSlug={marca}
            onSelect={setMarca}
          />
        </div>

        <div className="space-y-3">
          {fair.standDirectory && (
            <section className="rounded-3xl bg-card p-5 shadow-soft" aria-labelledby="stand-directory-title">
              <h2 id="stand-directory-title" className="text-xl font-extrabold">Ubicación de los emprendimientos</h2>
              <ul className="mt-4 space-y-3">
                {fair.standDirectory.map(({ name, stand }) => (
                  <li key={stand} className="flex items-center justify-between gap-4 rounded-2xl bg-mint-soft px-4 py-3">
                    <span className="font-semibold">{name}</span>
                    <span className="shrink-0 text-sm font-bold">Stand {stand}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {fair.exhibitors.length === 0 && !fair.standDirectory && (
            <p className="rounded-3xl bg-mint-soft p-4 text-sm">
              Los emprendimientos y sus números de stand aún no han sido proporcionados para esta
              feria. La lista se habilitará cuando se confirmen esos datos.
            </p>
          )}
          {fair.exhibitors.length > 0 && (
            <ul className="grid grid-cols-2 gap-3" aria-label="Perfiles de marca">
              {fair.exhibitors.map((ex) => {
                const brand = getBrand(ex.brandSlug);
                if (!brand) return null;
                const isSelected = ex.brandSlug === marca;
                return (
                  <li
                    key={ex.brandSlug}
                    className={cn(
                      "flex min-w-0 flex-col overflow-hidden rounded-2xl bg-card shadow-soft transition-shadow hover:shadow-lift focus-within:ring-2 focus-within:ring-foreground",
                      isSelected && "ring-2 ring-foreground",
                    )}
                  >
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setMarca(ex.brandSlug)}
                      className="flex w-full flex-1 flex-col text-left focus-visible:outline-2 focus-visible:-outline-offset-2"
                    >
                      <img
                        src={brand.image}
                        alt=""
                        width={1024}
                        height={768}
                        loading="lazy"
                        className={cn(
                          "aspect-[4/3] w-full",
                          ["entre-si", "cuentico"].includes(brand.slug)
                            ? "object-contain p-4"
                            : "object-cover",
                        )}
                      />
                      <span className="flex w-full flex-1 flex-col gap-1 p-3">
                        <span className="text-sm font-extrabold sm:text-base">{brand.name}</span>
                        <span className="text-xs text-muted-foreground">{brand.category}</span>
                        <span className="mt-auto pt-1 text-xs font-bold">Stand {ex.stand}</span>
                      </span>
                    </button>
                    {isSelected && (
                      <BrandActions
                        brandSlug={brand.slug}
                        brandName={brand.name}
                        fairId={fair.id}
                        className="px-3 pb-3 [&>*]:h-auto [&>*]:min-h-8 [&>*]:max-w-full [&>*]:whitespace-normal [&>*]:py-1"
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
