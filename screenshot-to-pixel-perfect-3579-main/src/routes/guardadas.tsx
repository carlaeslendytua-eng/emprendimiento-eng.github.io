import { createFileRoute, Link, useHydrated } from "@tanstack/react-router";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BrandActions } from "@/components/entresi/BrandActions";
import { getBrand } from "@/data/brands";
import { FAIRS } from "@/data/fairs";
import { useVisitor } from "@/lib/visitor-store";

export const Route = createFileRoute("/guardadas")({
  head: () => ({
    meta: [
      { title: "Tus marcas guardadas · Entre Sí" },
      { name: "description", content: "Las microempresas que guardaste para visitar en la feria Entre Sí." },
      { property: "og:title", content: "Tus marcas guardadas · Entre Sí" },
      { property: "og:description", content: "Las microempresas que guardaste para visitar en la feria Entre Sí." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Saved,
});

function Saved() {
  const hydrated = useHydrated();
  const visitor = useVisitor();
  const brands = visitor.saved.map(getBrand).filter((b): b is NonNullable<typeof b> => Boolean(b));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-extrabold sm:text-5xl">Tus marcas guardadas</h1>
      <p className="mt-2 text-muted-foreground">Se guardan solo en este dispositivo.</p>

      {hydrated && brands.length === 0 && (
        <div className="mt-8 rounded-4xl bg-card p-8 text-center shadow-soft">
          <Heart className="mx-auto h-8 w-8" />
          <p className="mt-3 font-semibold">Aún no guardas ninguna marca.</p>
          <Button asChild className="mt-5" variant="hero">
            <Link to="/descubre">Descubre tus conexiones</Link>
          </Button>
        </div>
      )}

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {brands.map((brand) => {
          const fairsFor = FAIRS.filter((f) => f.exhibitors.some((e) => e.brandSlug === brand.slug));
          const fairId = fairsFor.some((f) => f.id === visitor.fairId) ? visitor.fairId : fairsFor[0]?.id ?? visitor.fairId;
          const ex = FAIRS.find((f) => f.id === fairId)?.exhibitors.find((e) => e.brandSlug === brand.slug);
          return (
            <article key={brand.slug} className="flex gap-4 rounded-4xl bg-card p-4 shadow-soft">
              <img
                src={brand.image}
                alt={brand.name}
                width={1024}
                height={768}
                loading="lazy"
                className="blob h-28 w-28 shrink-0 object-cover"
              />
              <div className="flex flex-1 flex-col gap-2">
                <div>
                  <h2 className="text-xl font-extrabold">{brand.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {brand.category}
                    {ex ? ` · Stand ${ex.stand}` : ""}
                  </p>
                </div>
                <BrandActions brandSlug={brand.slug} brandName={brand.name} fairId={fairId} />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
