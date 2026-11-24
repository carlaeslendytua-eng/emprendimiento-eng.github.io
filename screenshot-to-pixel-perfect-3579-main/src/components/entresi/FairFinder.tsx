import { useMemo, useState } from "react";
import { CalendarDays, ImageOff, LockKeyhole, MapPin, Search } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  FAIR_OPPORTUNITIES,
  filterFairOpportunities,
  type FairOpportunityFilters,
} from "@/data/fair-opportunities";

const emptyFilters: FairOpportunityFilters = {
  query: "",
  city: "",
  province: "",
  sector: "",
  month: "",
};

const cityOptions = [...new Set(FAIR_OPPORTUNITIES.map((fair) => fair.city))];
const provinceOptions = [...new Set(FAIR_OPPORTUNITIES.map((fair) => fair.province))];
const sectorOptions = [...new Set(FAIR_OPPORTUNITIES.map((fair) => fair.sector))];

function formatFairDate(date: string | null, dateLabel?: string, timeLabel?: string) {
  if (!date) return dateLabel ?? "Por confirmar";
  const formattedDate = new Date(`${date}T12:00:00`).toLocaleDateString("es-EC", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return timeLabel ? `${formattedDate} · ${timeLabel}` : formattedDate;
}

export function FairFinder() {
  const [filters, setFilters] = useState(emptyFilters);
  const opportunities = useMemo(
    () => filterFairOpportunities(FAIR_OPPORTUNITIES, filters),
    [filters],
  );

  return (
    <>
      <div className="rounded-3xl border border-primary/20 bg-card p-5 shadow-soft sm:p-6">
        <p className="font-bold">Oportunidades feriales</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Consulta la exposición PUCE y los datos de participación para microempresas.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <label className="flex items-center gap-2 rounded-2xl border bg-card px-4 py-3 lg:col-span-2">
          <Search aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
          <span className="sr-only">Buscar ferias</span>
          <input
            aria-label="Buscar ferias"
            className="min-w-0 flex-1 bg-transparent outline-none"
            placeholder="Feria, ciudad o sector"
            value={filters.query}
            onChange={(event) =>
              setFilters((current) => ({ ...current, query: event.target.value }))
            }
          />
        </label>

        <label className="sr-only" htmlFor="fair-city-filter">
          Filtrar por ciudad
        </label>
        <select
          id="fair-city-filter"
          aria-label="Filtrar por ciudad"
          className="rounded-2xl border bg-card px-4 py-3"
          value={filters.city}
          onChange={(event) => setFilters((current) => ({ ...current, city: event.target.value }))}
        >
          <option value="">Todas las ciudades</option>
          {cityOptions.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="fair-province-filter">
          Filtrar por provincia
        </label>
        <select
          id="fair-province-filter"
          aria-label="Filtrar por provincia"
          className="rounded-2xl border bg-card px-4 py-3"
          value={filters.province}
          onChange={(event) =>
            setFilters((current) => ({ ...current, province: event.target.value }))
          }
        >
          <option value="">Todas las provincias</option>
          {provinceOptions.map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="fair-sector-filter">
          Filtrar por sector
        </label>
        <select
          id="fair-sector-filter"
          aria-label="Filtrar por sector"
          className="rounded-2xl border bg-card px-4 py-3"
          value={filters.sector}
          onChange={(event) =>
            setFilters((current) => ({ ...current, sector: event.target.value }))
          }
        >
          <option value="">Todos los sectores</option>
          {sectorOptions.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>

        <label className="flex flex-col gap-1 rounded-2xl border bg-card px-4 py-2 text-xs font-semibold sm:col-span-2 lg:col-span-1">
          Filtrar por mes
          <input
            aria-label="Filtrar por mes"
            className="bg-transparent text-sm outline-none"
            type="month"
            value={filters.month}
            onChange={(event) =>
              setFilters((current) => ({ ...current, month: event.target.value }))
            }
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {opportunities.length}{" "}
          {opportunities.length === 1 ? "oportunidad encontrada" : "oportunidades encontradas"}
        </p>
        <Button
          variant="link"
          size="sm"
          onClick={() => setFilters(emptyFilters)}
          disabled={Object.values(filters).every((value) => !value)}
        >
          Limpiar filtros
        </Button>
      </div>

      {opportunities.length > 0 ? (
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {opportunities.map((fair) => (
            <article
              key={fair.id}
              id={fair.id}
              className="scroll-mt-28 overflow-hidden rounded-4xl bg-card shadow-soft"
            >
              <div className="relative h-52 overflow-hidden">
                {fair.image ? (
                  <>
                    <img
                      src={fair.image}
                      alt={
                        fair.imageLabel ??
                        `Imagen ilustrativa de productos del sector ${fair.sector}`
                      }
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-bold">
                      {fair.imageLabel ?? "Imagen ilustrativa"}
                    </span>
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 bg-mint-soft text-muted-foreground">
                    <ImageOff aria-hidden="true" className="size-8" />
                    <span className="text-sm font-semibold">
                      Imagen del evento pendiente de carga
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-3 p-5 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {fair.source === "provided"
                    ? "Exposición anunciada"
                    : `Ejemplo ilustrativo · ${fair.sector}`}
                </p>
                <h3 className="text-2xl font-extrabold">{fair.name}</h3>
                <p className="flex items-center gap-2 text-sm">
                  <MapPin aria-hidden="true" className="size-4 shrink-0" />
                  {fair.city}, {fair.province}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <CalendarDays aria-hidden="true" className="size-4 shrink-0" />
                  {formatFairDate(fair.date, fair.dateLabel, fair.timeLabel)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Organizador: {fair.organizer ?? "Por confirmar"}
                </p>
                {fair.source !== "provided" && <div className="flex items-start gap-2 rounded-2xl bg-muted p-3 text-sm text-muted-foreground">
                  <LockKeyhole aria-hidden="true" className="size-5 shrink-0" />
                  <span>Requisitos y detalles de participación disponibles para microempresas con membresía activa.</span>
                </div>}
                <div className="flex flex-wrap gap-3 pt-1">
                  <Button asChild variant="hero">
                    {fair.source === "provided" ? (
                      <Link to="/descubre" search={{ feria: fair.id, paso: 1 }}>
                        Ver feria
                      </Link>
                    ) : (
                      <a href={`/ferias#${fair.id}`}>Ver feria</a>
                    )}
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/planes">Conocer la membresía</Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-3xl bg-card p-6 text-sm text-muted-foreground" role="status">
          No hay oportunidades que coincidan con los filtros actuales.
        </p>
      )}
    </>
  );
}
