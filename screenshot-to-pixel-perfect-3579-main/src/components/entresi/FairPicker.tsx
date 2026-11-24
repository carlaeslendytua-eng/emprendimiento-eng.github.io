import { CalendarDays, MapPin } from "lucide-react";

import { FAIRS } from "@/data/fairs";
import { cn } from "@/lib/utils";

export function FairPicker({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div role="radiogroup" aria-label="Elige tu feria" className={cn("grid gap-3 sm:grid-cols-2", className)}>
      {FAIRS.map((fair) => {
        const active = fair.id === value;
        return (
          <button
            key={fair.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(fair.id)}
            className={cn(
              "rounded-3xl border-2 bg-card p-4 text-left transition-all hover:-translate-y-0.5",
              active ? "border-foreground shadow-soft" : "border-transparent hover:border-foreground/20",
            )}
          >
            {fair.image && (
              <img
                src={fair.image}
                alt={`Afiche de ${fair.name}`}
                className="mb-3 aspect-video w-full rounded-2xl object-cover"
              />
            )}
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {fair.source === "provided"
                    ? "Exposición"
                    : "Ejemplo ilustrativo"}
                </p>
                <p className="font-display text-base font-bold leading-tight">{fair.name}</p>
              </div>
              <span
                className={cn(
                  "mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 border-foreground/40",
                  active && "border-foreground bg-primary",
                )}
              />
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5" /> {fair.dates}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {fair.place}
              {fair.source !== "provided" &&
                ` · ${fair.exhibitors.length} emprendimientos`}
            </p>
          </button>
        );
      })}
    </div>
  );
}
