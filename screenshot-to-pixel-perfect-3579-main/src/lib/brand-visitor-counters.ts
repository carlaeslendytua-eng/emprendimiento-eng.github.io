import type { SupabaseClient } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type BrandEvent = { brand_slug: string; visitor_id: string; kind: "view" | "save" };
export type BrandTotals = { brand_slug: string; unique_views: number; unique_saves: number };

// Lovable manages this schema. Extend the client contract until generated types sync.
type CounterDatabase = Database & {
  public: {
    Tables: {
      brand_visitor_events: {
        Row: BrandEvent & { id: string; created_at: string };
        Insert: BrandEvent;
        Update: Partial<BrandEvent>;
        Relationships: [];
      };
    };
    Functions: {
      brand_visitor_totals: { Args: never; Returns: BrandTotals[] };
    };
  };
};

export const counters = supabase as unknown as SupabaseClient<CounterDatabase>;
const visitorKey = "entresi:counter-visitor:v1";

export async function recordBrandEvent(brandSlug: string, kind: BrandEvent["kind"]) {
  try {
    let visitorId = localStorage.getItem(visitorKey);
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem(visitorKey, visitorId);
    }
    await counters.from("brand_visitor_events").insert({
      brand_slug: brandSlug,
      visitor_id: visitorId,
      kind,
    });
  } catch {
    // Visitors can still browse and save brands when the counter is unavailable.
  }
}
