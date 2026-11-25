import pucePoster from "@/assets/puce-concurso-2026.png";
import puceMap from "@/assets/mapa-puce-2026.png";

export type Exhibitor = {
  brandSlug: string;
  /** Stand code on the flat plan: row letter + column number, e.g. "B3". */
  stand: string;
  zone: string;
};

export type Fair = {
  id: string;
  name: string;
  place: string;
  dates: string;
  source: "provided" | "illustrative";
  image?: string;
  mapImage?: string;
  standDirectory?: { name: string; stand: string }[];
  /** Stand grid of the flat plan. Rows are lettered A, B, C…; columns numbered from 1. */
  grid: { rows: number; cols: number } | null;
  exhibitors: Exhibitor[];
};

export const FAIRS: Fair[] = [
  {
    id: "puce-emprendimiento-2026",
    name: "XXXVII Concurso de Emprendimiento PUCE sede Quito 2026",
    place: "PUCE, sede Quito",
    dates: "Exposición: 25 nov 2026 · 09:00",
    source: "provided",
    image: pucePoster,
    mapImage: puceMap,
    grid: null,
    exhibitors: [
      { brandSlug: "entre-si", stand: "55", zone: "PUCE" },
      { brandSlug: "cuentico", stand: "51", zone: "PUCE" },
      { brandSlug: "memora", stand: "57", zone: "PUCE" },
      { brandSlug: "nergy", stand: "60", zone: "PUCE" },
      { brandSlug: "cuida-dog", stand: "62", zone: "PUCE" },
      { brandSlug: "pan-comido", stand: "59", zone: "PUCE" },
    ],
  },
];

const DEFAULT_FAIR = FAIRS[0] as Fair;
export const DEFAULT_FAIR_ID = DEFAULT_FAIR.id;

export const getFair = (id: string | undefined): Fair => FAIRS.find((f) => f.id === id) ?? DEFAULT_FAIR;

export const getExhibitor = (fairId: string, brandSlug: string) =>
  getFair(fairId).exhibitors.find((e) => e.brandSlug === brandSlug);

const ROW_LETTERS = "ABCDEFGHIJ";

export const standCode = (row: number, col: number) => `${ROW_LETTERS[row]}${col + 1}`;

/** Row/column of a stand code, or null when it is not on the fair's grid. */
export function standPosition(fair: Fair, code: string): { row: number; col: number } | null {
  if (!fair.grid) return null;
  const match = /^([A-J])(\d{1,2})$/.exec(code);
  if (!match) return null;
  const row = ROW_LETTERS.indexOf(match[1]!);
  const col = Number(match[2]) - 1;
  if (row < 0 || row >= fair.grid.rows || col < 0 || col >= fair.grid.cols) return null;
  return { row, col };
}
