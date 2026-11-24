import type { Brand } from "@/data/brands";
import type { Fair } from "@/data/fairs";

export type DimensionKey =
  | "category"
  | "values"
  | "aesthetics"
  | "motivations"
  | "products"
  | "priorities";

export type Answers = Partial<Record<DimensionKey, string[]>>;

/**
 * Experimental weights. Adjust here after user testing; they are renormalised over the
 * dimensions the visitor actually answered, so they do not need to sum to exactly 1.
 */
export const AFFINITY_WEIGHTS: Record<DimensionKey, number> = {
  category: 0.3,
  values: 0.25,
  aesthetics: 0.15,
  motivations: 0.15,
  products: 0.1,
  priorities: 0.05,
};

export const DIMENSION_LABELS: Record<DimensionKey, string> = {
  category: "Intereses",
  values: "Lo que te importa",
  aesthetics: "Tipo de experiencia",
  motivations: "Objetivo",
  products: "Lo que quieres probar",
  priorities: "Prioridad",
};

/** Minimum score for a brand to be recommended at all. */
export const MIN_RECOMMENDATION_SCORE = 0.15;

const DIMENSIONS = Object.keys(AFFINITY_WEIGHTS) as DimensionKey[];

export type DimensionResult = {
  dimension: DimensionKey;
  weight: number;
  score: number; // 0..1
  matched: string[]; // option ids the brand verifiably matches
};

export type BrandMatch = {
  brand: Brand;
  stand: string;
  zone: string;
  score: number; // 0..1, weighted
  percent: number; // 0..100, rounded
  dimensions: DimensionResult[];
  reasons: string[];
  explanation: string;
};

/**
 * Per-dimension score:
 * - category: 1 when the brand belongs to any chosen category (a brand usually has one).
 * - every other dimension: share of the visitor's choices the brand verifiably matches.
 */
export function scoreDimension(dimension: DimensionKey, selected: string[], brand: Brand): DimensionResult {
  const brandTags = new Set(brand.affinity[dimension] ?? []);
  const matched = selected.filter((id) => brandTags.has(id) && Boolean(brand.evidence[id]));
  const score =
    selected.length === 0
      ? 0
      : dimension === "category"
        ? matched.length > 0
          ? 1
          : 0
        : matched.length / selected.length;
  return { dimension, weight: AFFINITY_WEIGHTS[dimension], score, matched };
}

export function scoreBrand(answers: Answers, brand: Brand, weights = AFFINITY_WEIGHTS) {
  const answered = DIMENSIONS.filter((d) => (answers[d]?.length ?? 0) > 0);
  const dimensions = answered.map((d) => ({ ...scoreDimension(d, answers[d] ?? [], brand), weight: weights[d] }));
  const totalWeight = dimensions.reduce((s, d) => s + d.weight, 0);
  const score = totalWeight === 0 ? 0 : dimensions.reduce((s, d) => s + d.weight * d.score, 0) / totalWeight;
  return { score, dimensions };
}

function joinSpanish(parts: string[]) {
  if (parts.length <= 1) return parts.join("");
  return `${parts.slice(0, -1).join(", ")} y ${parts.at(-1)}`;
}

/** Up to `max` reasons: one per matched dimension, in weight order, then extra matches. */
export function buildReasons(dimensions: DimensionResult[], brand: Brand, max = 3) {
  const ordered = [...dimensions].sort((a, b) => b.weight - a.weight);
  const firstPass = ordered.flatMap((d) => (d.matched[0] ? [d.matched[0]] : []));
  const secondPass = ordered.flatMap((d) => d.matched.slice(1));
  const ids = [...firstPass, ...secondPass].filter((id, i, arr) => arr.indexOf(id) === i);
  // "apoyar-local" is true for every participant, so only use it when nothing more specific matched.
  const specific = ids.filter((id) => id !== "apoyar-local");
  const chosen = (specific.length > 0 ? specific : ids).slice(0, max);
  return chosen.map((id) => brand.evidence[id]).filter((s): s is string => Boolean(s));
}

/** Ranks only the brands that participate in the selected fair. */
export function rankBrands(
  answers: Answers,
  fair: Fair,
  brands: Brand[],
  weights = AFFINITY_WEIGHTS,
): BrandMatch[] {
  return fair.exhibitors
    .flatMap((ex) => {
      const brand = brands.find((b) => b.slug === ex.brandSlug);
      if (!brand) return [];
      const { score, dimensions } = scoreBrand(answers, brand, weights);
      const reasons = buildReasons(dimensions, brand);
      return [
        {
          brand,
          stand: ex.stand,
          zone: ex.zone,
          score,
          percent: Math.round(score * 100),
          dimensions,
          reasons,
          explanation: reasons.length
            ? `Te recomendamos esta marca porque ${joinSpanish(reasons)}.`
            : "",
        },
      ];
    })
    .filter((m) => m.score >= MIN_RECOMMENDATION_SCORE && m.reasons.length > 0)
    .sort((a, b) => b.score - a.score || a.brand.name.localeCompare(b.brand.name, "es"));
}

export function isQuizComplete(answers: Answers) {
  return DIMENSIONS.every((d) => (answers[d]?.length ?? 0) > 0);
}
