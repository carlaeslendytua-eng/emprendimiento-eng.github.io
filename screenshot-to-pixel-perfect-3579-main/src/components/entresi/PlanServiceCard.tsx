import { ArrowUpRight, Check, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { SERVICE_PLAN_MOMENTS, type ServicePlan } from "@/data/plan-page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WHATSAPP_NUMBER = "593960942522";

type Props = {
  plan: ServicePlan;
  icon: LucideIcon;
};

export function PlanServiceCard({ plan, icon: Icon }: Props) {
  const whatsappMessage = `Hola, equipo de Entre Sí. Me interesa conocer más información sobre el ${plan.name}. ¿Podrían asesorarme?`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
  const isFeatured = plan.id === "conexion";

  return (
    <article
      className={`flex h-full flex-col rounded-4xl border p-6 shadow-soft transition duration-300 hover:-translate-y-1 sm:p-7 ${
        isFeatured ? "border-coral/50 bg-coral-soft/70 shadow-lift" : "border-border/70 bg-card"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${
            plan.tone === "coral"
              ? "bg-white/75 text-primary"
              : plan.tone === "mint"
                ? "bg-mint-soft text-plum"
                : "bg-lilac-soft text-plum"
          }`}
        >
          <Icon aria-hidden="true" className="size-6" />
        </span>
        {isFeatured && (
          <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-plum">
            Acompañamiento integral
          </span>
        )}
      </div>

      <h3 className="mt-5 font-display text-2xl font-extrabold text-plum">{plan.name}</h3>
      <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">{plan.description}</p>
      <p className="mt-4 text-sm font-bold text-plum">Cotización personalizada</p>

      <div className="mt-5 grid gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" className="w-full">
              Ver todos los beneficios
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[min(88dvh,48rem)] w-[calc(100%-1rem)] overflow-y-auto rounded-3xl border-border bg-background p-5 sm:max-w-2xl sm:p-8">
            <DialogHeader className="pr-8">
              <DialogTitle className="font-display text-2xl text-plum">{plan.name}</DialogTitle>
              <DialogDescription className="text-base leading-6">
                {plan.description}
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="antes" className="mt-2">
              <TabsList className="grid h-auto w-full grid-cols-3 rounded-full bg-lilac-soft p-1">
                {SERVICE_PLAN_MOMENTS.map((moment) => (
                  <TabsTrigger
                    key={moment.id}
                    value={moment.id}
                    className="rounded-full py-2.5 text-xs font-bold uppercase tracking-wide sm:text-sm"
                  >
                    {moment.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {SERVICE_PLAN_MOMENTS.map((moment) => (
                <TabsContent key={moment.id} value={moment.id} className="mt-5">
                  <p className="mb-4 text-sm text-muted-foreground">{moment.helper}</p>
                  <ul className="space-y-3">
                    {plan.benefits[moment.id].map((benefit) => (
                      <li key={benefit} className="flex gap-3 text-sm leading-6">
                        <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              ))}
            </Tabs>
          </DialogContent>
        </Dialog>

        <Button asChild variant={isFeatured ? "hero" : "ink"} className="w-full">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Solicitar asesoría <ArrowUpRight aria-hidden="true" />
          </a>
        </Button>
      </div>

      <ul className="mt-5 space-y-3">
        {plan.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2.5 text-sm leading-5">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
