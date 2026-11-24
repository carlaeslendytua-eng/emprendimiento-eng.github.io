import { FAIRS } from "@/data/fairs";

export type FairSearch = { feria?: string };

export const validateFairSearch = (search: Record<string, unknown>): FairSearch => {
  const feria = search["feria"];
  return typeof feria === "string" && FAIRS.some((f) => f.id === feria) ? { feria } : {};
};
