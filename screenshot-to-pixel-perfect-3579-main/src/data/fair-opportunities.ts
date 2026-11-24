import pucePoster from "@/assets/puce-concurso-2026.png";

export type FairOpportunity = {
  id: string;
  name: string;
  city: string;
  province: string;
  sector: string;
  date: string | null;
  timeLabel?: string;
  dateLabel?: string;
  notice?: string;
  organizer: string | null;
  image: string | null;
  imageLabel?: string;
  source: "illustrative" | "provided";
};

export type FairOpportunityFilters = {
  query: string;
  city: string;
  province: string;
  sector: string;
  month: string;
};

export const FAIR_OPPORTUNITIES: FairOpportunity[] = [
  {
    id: "puce-emprendimiento-2026",
    name: "XXXVII Concurso de Emprendimiento PUCE sede Quito 2026",
    city: "Quito",
    province: "Pichincha",
    sector: "Emprendimiento",
    date: "2026-11-25",
    timeLabel: "09:00",
    organizer: "PUCE Emprende · Centro de Innovación",
    image: pucePoster,
    imageLabel: "Afiche de la exposición",
    source: "provided",
  },
];

function normalize(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function filterFairOpportunities(
  opportunities: FairOpportunity[],
  filters: FairOpportunityFilters,
) {
  const queryTerms = normalize(filters.query).split(/\s+/).filter(Boolean);

  return opportunities.filter((opportunity) => {
    const searchableText = normalize(
      `${opportunity.name} ${opportunity.city} ${opportunity.province} ${opportunity.sector}`,
    );

    return (
      queryTerms.every((term) => searchableText.includes(term)) &&
      (!filters.city || opportunity.city === filters.city) &&
      (!filters.province || opportunity.province === filters.province) &&
      (!filters.sector || opportunity.sector === filters.sector) &&
      (!filters.month || opportunity.date?.slice(0, 7) === filters.month)
    );
  });
}
