import { getFair } from "@/data/fairs";
import { useVisitor } from "@/lib/visitor-store";

/** Fair from the URL when present, otherwise the visitor's chosen fair. */
export function useActiveFair(searchFair: string | undefined) {
  const visitor = useVisitor();
  return getFair(searchFair ?? visitor.fairId);
}
