import { getBrand } from "@/data/brands";
import { standCode, standPosition, type Fair } from "@/data/fairs";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

/** Flat, schematic fair plan: lettered stand blocks, entrance and a route to the selected stand. */
const STAND_W = 72;
const STAND_H = 56;
const COL_STEP = 100;
const ROW_STEP = 96;
const TOP = 28;
const FIRST_X = 44;
const AISLE_X = 20;

type Props = {
  fair: Fair;
  selectedSlug?: string | undefined;
  onSelect?: (brandSlug: string) => void;
  compact?: boolean | undefined;
  className?: string;
};

export function planGeometry(fair: Fair & { grid: NonNullable<Fair["grid"]> }) {
  const width = fair.grid.cols * COL_STEP + 40;
  const height = fair.grid.rows * ROW_STEP + 56;
  const stand = (row: number, col: number) => ({
    x: FIRST_X + col * COL_STEP,
    y: TOP + row * ROW_STEP,
  });
  const entrance = { x: AISLE_X, y: height - 14 };
  /** Route from the entrance along the left aisle, then along the aisle under the stand's row. */
  const route = (row: number, col: number) => {
    const s = stand(row, col);
    const aisleY = s.y + STAND_H + (ROW_STEP - STAND_H) / 2;
    const cx = s.x + STAND_W / 2;
    return {
      d: `M ${entrance.x} ${entrance.y} V ${aisleY} H ${cx} V ${s.y + STAND_H + 6}`,
      end: { x: cx, y: s.y + STAND_H + 6 },
    };
  };
  return { width, height, stand, entrance, route };
}

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

const standFourRoute = { path: "M 890 205 V 275 H 1215 V 256", x: 1215, y: 256 };
const puceRoutes: Record<string, { path: string; x: number; y: number }> = {
  "entre-si": { path: "M 890 205 V 275 H 1358 V 297", x: 1358, y: 297 },
  cuenticos: standFourRoute,
  "pan-comido": standFourRoute,
  memora: { path: "M 890 205 V 275 H 1070 V 297", x: 1070, y: 297 },
  nergy: { path: "M 890 205 V 275 H 1431 V 256", x: 1431, y: 256 },
  "cuida-dog": { path: "M 890 205 V 275 H 1015 V 370 H 1286 V 356", x: 1286, y: 356 },
};

function ImagePlan({ fair, selectedSlug, compact }: Pick<Props, "fair" | "selectedSlug" | "compact">) {
  const route = selectedSlug ? puceRoutes[selectedSlug] : undefined;
  const exhibitor = fair.exhibitors.find((item) => item.brandSlug === selectedSlug);
  const brand = selectedSlug ? getBrand(selectedSlug) : undefined;
  const [zoomed, setZoomed] = useState(false);
  const [visible, setVisible] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setZoomed(Boolean(route) && !compact); }, [selectedSlug, compact, route]);
  useEffect(() => {
    const element = mapRef.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), { threshold: 0.15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div ref={mapRef} className="overflow-auto rounded-2xl bg-muted/50">
        <svg viewBox={zoomed && route ? "770 155 760 220" : "0 0 1834 858"} className="h-auto w-full" role="img" aria-label={brand && exhibitor && route ? `Ruta orientativa desde la puerta superior hasta ${brand.name}, stand ${exhibitor.stand}` : "Plano de la feria PUCE con stands numerados y puertas"}>
          <image href={fair.mapImage} width="1834" height="858" />
          {route && visible && <g key={selectedSlug}>
            <path d={route.path} pathLength="1" className="draw-route" fill="none" stroke="white" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
            <path d={route.path} pathLength="1" className="draw-route" fill="none" stroke="#5b2a79" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={route.x} cy={route.y} r="12" fill="#5b2a79" stroke="white" strokeWidth="4" />
          </g>}
        </svg>
      </div>
      {route && !compact && <div className="mt-3 flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => setZoomed(!zoomed)} className="rounded-full border border-input px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{zoomed ? "Ver mapa completo" : "Ampliar ruta"}</button>
        <p className="text-sm text-muted-foreground">Ruta orientativa desde la puerta superior hasta {brand?.name}, stand {exhibitor?.stand}.</p>
      </div>}
      {!route && <p className="mt-3 text-sm text-muted-foreground">Selecciona un emprendimiento para ver su ruta en el mapa.</p>}
    </div>
  );
}

export function FairPlan({ fair, selectedSlug, onSelect, compact, className }: Props) {
  if (fair.mapImage) {
    return (
      <div className={className}>
        <ImagePlan fair={fair} selectedSlug={selectedSlug} compact={compact} />
      </div>
    );
  }
  if (!fair.grid) {
    return (
      <div
        role="status"
        aria-label={`Plano de ${fair.name} pendiente`}
        className={cn("flex min-h-56 flex-col items-center justify-center rounded-3xl bg-muted/50 p-6 text-center", className)}
      >
        <p className="text-lg font-extrabold">Plano pendiente de información oficial</p>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Todavía no se ha proporcionado el plano ni la asignación de stands. No mostraremos
          ubicaciones ni rutas hasta contar con esos datos.
        </p>
      </div>
    );
  }

  const grid = fair.grid;
  const g = planGeometry({ ...fair, grid });
  const selected = fair.exhibitors.find((e) => e.brandSlug === selectedSlug);
  const selectedPos = selected ? standPosition(fair, selected.stand) : null;
  const route = selectedPos ? g.route(selectedPos.row, selectedPos.col) : null;
  const selectedBrand = selected ? getBrand(selected.brandSlug) : undefined;

  const cells = Array.from({ length: grid.rows }, (_, row) =>
    Array.from({ length: grid.cols }, (_, col) => {
      const code = standCode(row, col);
      return { row, col, code, exhibitor: fair.exhibitors.find((e) => e.stand === code) };
    }),
  ).flat();

  return (
    <div
      className={cn("relative w-full", className)}
      style={{ aspectRatio: `${g.width} / ${g.height}` }}
      role="group"
      aria-label={`Plano de ${fair.name}`}
    >
      <svg viewBox={`0 0 ${g.width} ${g.height}`} className="absolute inset-0 h-full w-full" aria-hidden>
        {route && (
          <>
            <path d={route.d} className="fill-none stroke-violet/20" strokeWidth={12} strokeLinejoin="round" />
            <path
              key={selected?.brandSlug}
              d={route.d}
              className="draw-route fill-none stroke-violet"
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
            />
            <circle cx={route.end.x} cy={route.end.y} r={8} className="fill-violet" />
            <circle cx={route.end.x} cy={route.end.y} r={8} className="pulse-ring fill-violet/40" />
          </>
        )}
      </svg>

      {cells.map(({ row, col, code, exhibitor }) => {
        const s = g.stand(row, col);
        const brand = exhibitor ? getBrand(exhibitor.brandSlug) : undefined;
        const active = exhibitor && exhibitor.brandSlug === selectedSlug;
        const style = {
          left: pct(s.x, g.width),
          top: pct(s.y, g.height),
          width: pct(STAND_W, g.width),
          height: pct(STAND_H, g.height),
        };
        const body = (
          <>
            <span className={cn("font-display font-extrabold", compact ? "text-[11px]" : "text-sm sm:text-base")}>
              {code}
            </span>
            {brand && !compact && (
              <span className="hidden max-w-full truncate px-1 text-[10px] font-semibold opacity-75 sm:block">
                {brand.name}
              </span>
            )}
          </>
        );
        const tone = active
          ? "bg-coral text-plum shadow-lift scale-105"
          : brand
            ? "bg-lilac text-plum"
            : "bg-lilac-soft text-plum/40";
        if (brand && onSelect) {
          return (
            <button
              key={code}
              type="button"
              onClick={() => onSelect(brand.slug)}
              aria-pressed={Boolean(active)}
              aria-label={`Stand ${code}: ${brand.name}`}
              className={cn(
                "absolute flex flex-col items-center justify-center rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                tone,
              )}
              style={style}
            >
              {body}
            </button>
          );
        }
        return (
          <div
            key={code}
            className={cn("absolute flex flex-col items-center justify-center rounded-xl", tone)}
            style={style}
            aria-label={brand ? `Stand ${code}: ${brand.name}` : `Stand ${code} libre`}
          >
            {body}
          </div>
        );
      })}

      {selectedPos && selectedBrand && (
        <span
          className={cn(
            "rise-in absolute z-10 -translate-y-full whitespace-nowrap rounded-full bg-plum px-3 py-1 font-bold text-plum-foreground shadow-soft",
            compact ? "text-[10px]" : "text-xs",
            selectedPos.col === 0 ? "" : selectedPos.col === fair.grid.cols - 1 ? "-translate-x-full" : "-translate-x-1/2",
          )}
          style={{
            left: pct(
              g.stand(selectedPos.row, selectedPos.col).x +
                (selectedPos.col === 0 ? 0 : selectedPos.col === fair.grid.cols - 1 ? STAND_W : STAND_W / 2),
              g.width,
            ),
            top: pct(g.stand(selectedPos.row, selectedPos.col).y - 6, g.height),
          }}
        >
          {selectedBrand.name}
        </span>
      )}

      <span
        className={cn(
          "absolute -translate-y-1/2 rounded-full bg-plum font-bold uppercase tracking-wider text-plum-foreground",
          compact ? "px-2 py-0.5 text-[9px]" : "px-3 py-1 text-[10px]",
        )}
        style={{ left: pct(g.entrance.x - 8, g.width), top: pct(g.entrance.y, g.height) }}
      >
        Entrada
      </span>
    </div>
  );
}
