import { describe, expect, it } from "vitest";

import { BRANDS } from "@/data/brands";
import { FAIRS, type Fair } from "@/data/fairs";
import { QUIZ, QUIZ_OPTION_LABELS } from "@/data/quiz";
import { AFFINITY_WEIGHTS, rankBrands, scoreBrand, type Answers } from "@/lib/affinity";

const affinityTestFair: Fair = {
  id: "affinity-test",
  name: "Test de afinidad",
  place: "Solo para pruebas",
  dates: "Sin fecha",
  source: "illustrative",
  grid: { rows: 1, cols: 2 },
  exhibitors: [
    { brandSlug: "trama-nomada", stand: "A1", zone: "Prueba" },
    { brandSlug: "brote-circular", stand: "A2", zone: "Prueba" },
  ],
};

const fairWithoutBrote: Fair = {
  ...affinityTestFair,
  id: "affinity-test-without-brote",
  exhibitors: [{ brandSlug: "trama-nomada", stand: "A1", zone: "Prueba" }],
};
const brote = BRANDS.find((b) => b.slug === "brote-circular")!;

const textileLover: Answers = {
  category: ["textiles"],
  values: ["herencia", "comercio-justo"],
  aesthetics: ["andino-colorido"],
  motivations: ["piezas-unicas"],
  products: ["bolsos"],
  priorities: ["historia"],
};

const naturalCare: Answers = {
  category: ["cuidado"],
  values: ["residuo-cero", "sostenible"],
  aesthetics: ["botanico"],
  motivations: ["autocuidado"],
  products: ["jabones", "velas"],
  priorities: ["precio-accesible"],
};

describe("affinity weights", () => {
  it("uses the agreed experimental weights", () => {
    expect(AFFINITY_WEIGHTS).toEqual({
      category: 0.3,
      values: 0.25,
      aesthetics: 0.15,
      motivations: 0.15,
      products: 0.1,
      priorities: 0.05,
    });
  });

  it("gives a perfect brand match 100 and weighs category at 30%", () => {
    expect(scoreBrand(textileLover, BRANDS[0]!).score).toBeCloseTo(1);
    // Only the category matches, so the score equals the category weight.
    const onlyCategory: Answers = { ...naturalCare, values: ["herencia"], aesthetics: ["geometrico"], motivations: ["decorar"], products: ["lamparas"], priorities: ["historia"] };
    expect(scoreBrand(onlyCategory, brote).score).toBeCloseTo(0.3);
  });
});

describe("rankBrands", () => {
  it("ranks Trama Nómada first for a textile lover", () => {
    expect(rankBrands(textileLover, affinityTestFair, BRANDS)[0]!.brand.slug).toBe("trama-nomada");
  });

  it("ranks Brote Circular first for natural self-care answers", () => {
    expect(rankBrands(naturalCare, affinityTestFair, BRANDS)[0]!.brand.slug).toBe("brote-circular");
  });

  it("never recommends a brand that does not participate in the selected fair", () => {
    const slugs = rankBrands(naturalCare, fairWithoutBrote, BRANDS).map((m) => m.brand.slug);
    expect(slugs).not.toContain("brote-circular");
  });

  it("does not recommend brands for a fair without confirmed exhibitors", () => {
    const puce = FAIRS.find((fair) => fair.id === "puce-emprendimiento-2026")!;

    expect(rankBrands(naturalCare, puce, BRANDS)).toEqual([]);
  });

  it("explains each recommendation starting with 'Te recomendamos esta marca porque'", () => {
    const [top] = rankBrands(textileLover, affinityTestFair, BRANDS);
    expect(top!.explanation.startsWith("Te recomendamos esta marca porque ")).toBe(true);
  });

  it("returns the same ranking for the same answers (no randomness)", () => {
    const a = rankBrands(naturalCare, affinityTestFair, BRANDS).map((m) => [m.brand.slug, m.percent]);
    const b = rankBrands(naturalCare, affinityTestFair, BRANDS).map((m) => [m.brand.slug, m.percent]);
    expect(a).toEqual(b);
  });

  it("keeps only the PUCE exhibition in the production fair list", () => {
    expect(FAIRS.map((fair) => fair.id)).toEqual(["puce-emprendimiento-2026"]);
  });
});

describe("brand data", () => {
  it("has verifiable evidence for every affinity tag and only uses quiz options", () => {
    const optionIds = new Set(Object.keys(QUIZ_OPTION_LABELS));
    for (const brand of BRANDS) {
      for (const tags of Object.values(brand.affinity)) {
        for (const tag of tags) {
          expect(optionIds.has(tag), `${brand.slug}:${tag}`).toBe(true);
          expect(brand.evidence[tag], `${brand.slug}:${tag}`).toBeTruthy();
        }
      }
    }
  });

  it("recommends every PUCE exhibitor from its current quiz options", () => {
    const fair = FAIRS[0]!;
    for (const exhibitor of fair.exhibitors) {
      const brand = BRANDS.find((item) => item.slug === exhibitor.brandSlug)!;
      const answers = Object.fromEntries(
        QUIZ.map((question) => [
          question.dimension,
          question.options.filter((option) => brand.affinity[question.dimension].includes(option.id)).map((option) => option.id),
        ]),
      );
      const [match] = rankBrands(answers, fair, BRANDS);
      expect(match?.brand.slug).toBe(exhibitor.brandSlug);
      expect(match?.percent).toBe(100);
      expect(match?.reasons.length).toBeGreaterThan(0);
    }
  });
});
