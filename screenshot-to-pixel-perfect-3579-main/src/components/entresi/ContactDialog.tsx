import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

const schema = z
  .object({
    name: z.string().trim().min(1, "Escribe tu nombre").max(100),
    email: z.string().trim().max(255).email("Correo no válido").or(z.literal("")),
    phone: z
      .string()
      .trim()
      .max(30)
      .regex(/^[+\d\s()-]*$/, "Teléfono no válido"),
    message: z.string().trim().max(1000),
    consent: z.literal(true, { errorMap: () => ({ message: "Necesitamos tu autorización para enviar tus datos" }) }),
  })
  .refine((v) => v.email !== "" || v.phone !== "", {
    message: "Déjanos un correo o un teléfono",
    path: ["email"],
  });

type FieldErrors = { name?: string; email?: string; phone?: string; consent?: string };

type Props = {
  brandSlug: string;
  brandName: string;
  fairId: string;
  trigger: React.ReactNode;
};

export function ContactDialog({ brandSlug, brandName, fairId, trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", consent: false });

  const update = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: FieldErrors = {};
      for (const issue of parsed.error.issues) errs[String(issue.path[0]) as keyof FieldErrors] ??= issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setSending(true);
    const { error } = await supabase.from("contact_requests").insert({
      brand_slug: brandSlug,
      fair_id: fairId,
      visitor_name: parsed.data.name,
      email: parsed.data.email || null,
      phone: parsed.data.phone || null,
      message: parsed.data.message || null,
      consent_given: true,
    });
    setSending(false);
    if (error) {
      toast.error("No pudimos enviar tu solicitud. Inténtalo de nuevo.");
      return;
    }
    toast.success(`Listo: ${brandName} recibirá tus datos para contactarte.`);
    setForm({ name: "", email: "", phone: "", message: "", consent: false });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="rounded-3xl border-0 bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Que {brandName} te contacte</DialogTitle>
          <DialogDescription>
            Solo enviaremos a esta marca los datos que escribas aquí. Tus respuestas del cuestionario no se comparten.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="c-name">Nombre</Label>
            <Input id="c-name" value={form.name} onChange={(e) => update("name", e.target.value)} maxLength={100} />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="c-email">Correo</Label>
              <Input
                id="c-email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                maxLength={255}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="c-phone">Teléfono / WhatsApp</Label>
              <Input
                id="c-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                maxLength={30}
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-msg">Mensaje (opcional)</Label>
            <Textarea
              id="c-msg"
              rows={3}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              maxLength={1000}
              placeholder="Ej.: Me interesa un pedido para regalos de empresa."
            />
          </div>
          <label className="flex items-start gap-3 rounded-2xl bg-mint-soft p-3 text-sm">
            <Checkbox
              checked={form.consent}
              onCheckedChange={(v) => update("consent", v === true)}
              className="mt-0.5"
              aria-label="Autorizo el envío de mis datos"
            />
            <span>
              Autorizo a Entre Sí a enviar mi nombre y datos de contacto a <strong>{brandName}</strong> para que se
              comunique conmigo.
            </span>
          </label>
          {errors.consent && <p className="-mt-2 text-xs text-destructive">{errors.consent}</p>}
          <Button type="submit" variant="ink" size="lg" className="w-full" disabled={sending}>
            {sending ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
            Enviar mis datos
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
