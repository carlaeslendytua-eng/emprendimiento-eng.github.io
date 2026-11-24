import { createFileRoute } from "@tanstack/react-router";

import { FairFinder } from "@/components/entresi/FairFinder";

export const Route = createFileRoute("/ferias")({
  component: Ferias,
  head: () => ({ meta: [{ title: "Ferias en Ecuador · Entre Sí" }] }),
});

function Ferias() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 sm:py-16">
      <div>
        <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Oportunidades feriales · Ecuador
        </p>
        <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Encuentra tu próxima feria</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Explora oportunidades por ciudad, provincia, fecha y sector. La información exclusiva
          estará disponible para microempresas con membresía activa.
        </p>
      </div>
      <FairFinder />
    </div>
  );
}
