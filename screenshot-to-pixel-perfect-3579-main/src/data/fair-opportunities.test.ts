import { describe, expect, it } from "vitest";

import {
  FAIR_OPPORTUNITIES,
  filterFairOpportunities,
  type FairOpportunityFilters,
} from "@/data/fair-opportunities";

const noFilters: FairOpportunityFilters = {
  query: "",
  city: "",
  province: "",
  sector: "",
  month: "",
};

describe("filterFairOpportunities", () => {
  it("searches city and sector without case or accent sensitivity", () => {
    const results = filterFairOpportunities(FAIR_OPPORTUNITIES, {
      ...noFilters,
      query: "puce quito",
    });

    expect(results.map((fair) => fair.id)).toEqual(["puce-emprendimiento-2026"]);
  });

  it("combines province and sector filters", () => {
    const results = filterFairOpportunities(FAIR_OPPORTUNITIES, {
      ...noFilters,
      province: "Pichincha",
      sector: "Emprendimiento",
    });

    expect(results.map((fair) => fair.id)).toEqual(["puce-emprendimiento-2026"]);
  });

  it("matches the selected month only when an opportunity has a date", () => {
    const datedOpportunity = {
      ...FAIR_OPPORTUNITIES[0]!,
      id: "dated-example",
      date: "2027-03-14",
    };

    expect(filterFairOpportunities([datedOpportunity], { ...noFilters, month: "2027-03" })).toEqual(
      [datedOpportunity],
    );
    expect(filterFairOpportunities(FAIR_OPPORTUNITIES, { ...noFilters, month: "2027-03" })).toEqual(
      [],
    );
  });

  it("includes the PUCE exhibition using its poster date and time", () => {
    const event = FAIR_OPPORTUNITIES.find((fair) => fair.id === "puce-emprendimiento-2026");

    expect(event).toMatchObject({
      name: "XXXVII Concurso de Emprendimiento PUCE sede Quito 2026",
      city: "Quito",
      province: "Pichincha",
      date: "2026-11-25",
      timeLabel: "09:00",
      source: "provided",
      imageLabel: "Afiche de la exposición",
      notice: expect.stringContaining("18 de noviembre"),
    });
    expect(filterFairOpportunities(FAIR_OPPORTUNITIES, {
      ...noFilters,
      query: "PUCE Quito",
    })).toContain(event);
  });

  it("lists only the PUCE exhibition", () => {
    expect(FAIR_OPPORTUNITIES.map((fair) => fair.id)).toEqual(["puce-emprendimiento-2026"]);
  });
});
