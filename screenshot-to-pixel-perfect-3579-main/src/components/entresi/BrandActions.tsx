import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Heart, Map, MessageCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ContactDialog } from "@/components/entresi/ContactDialog";
import { useVisitor, visitorActions } from "@/lib/visitor-store";
import { cn } from "@/lib/utils";
import { recordBrandEvent } from "@/lib/brand-visitor-counters";

type Props = {
  brandSlug: string;
  brandName: string;
  fairId: string;
  showProfile?: boolean;
  showMap?: boolean;
  className?: string;
};

export function SaveBrandButton({ brandSlug, brandName, size = "sm" }: { brandSlug: string; brandName: string; size?: "sm" | "default" }) {
  const { saved } = useVisitor();
  const isSaved = saved.includes(brandSlug);
  return (
    <Button
      type="button"
      size={size}
      variant={isSaved ? "mint" : "outline"}
      aria-pressed={isSaved}
      onClick={() => {
        const now = visitorActions.toggleSaved(brandSlug);
        if (now) void recordBrandEvent(brandSlug, "save");
        toast(now ? `Guardaste ${brandName}` : `Quitaste ${brandName} de tus guardadas`);
      }}
    >
      <Heart className={cn(isSaved && "fill-current")} />
      {isSaved ? "Guardada" : "Guardar marca"}
    </Button>
  );
}

export function BrandActions({
  brandSlug, brandName, fairId, showProfile = true, showMap = true, className,
}: Props) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {showProfile && (
        <Button asChild size="sm" variant="ink">
          <Link to="/marcas/$slug" params={{ slug: brandSlug }} search={{ feria: fairId }}>
            Conocer marca <ArrowUpRight />
          </Link>
        </Button>
      )}
      {showMap && (
        <Button asChild size="sm" variant="sky">
          <Link to="/mapa" search={{ feria: fairId, marca: brandSlug }}>
            <Map /> Ver en el mapa
          </Link>
        </Button>
      )}
      <SaveBrandButton brandSlug={brandSlug} brandName={brandName} />
      <ContactDialog
        brandSlug={brandSlug}
        brandName={brandName}
        fairId={fairId}
        trigger={
          <Button size="sm" variant="default" type="button">
            <MessageCircle /> Quiero que me contacten
          </Button>
        }
      />
    </div>
  );
}
