import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { FairPlan } from "@/components/entresi/FairPlan";
import { Button } from "@/components/ui/button";
import { getFair } from "@/data/fairs";
import { useVisitor } from "@/lib/visitor-store";

export function FairMapSection() {
  const { fairId } = useVisitor();
  const fair = getFair(fairId);

  return (
    <section aria-labelledby="fair-map-heading" className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
      <div className="rounded-4xl bg-card p-5 shadow-soft sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{fair.name}</p>
            <h2 id="fair-map-heading" className="mt-2 text-3xl font-extrabold">Mapa de la feria</h2>
            <p className="mt-2 text-muted-foreground">Consulta el plano y encuentra los stands de los emprendimientos participantes.</p>
          </div>
          <Button asChild variant="outline"><Link to="/mapa" search={{ feria: fair.id }}><MapPin /> Abrir mapa</Link></Button>
        </div>
        <div className="mt-6"><FairPlan fair={fair} compact /></div>
      </div>
    </section>
  );
}
