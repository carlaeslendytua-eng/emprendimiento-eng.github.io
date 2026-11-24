import { Bot } from "lucide-react";

import { WhatsAppSupport } from "@/components/entresi/WhatsAppSupport";

export function FloatingSupport() {
  return (
    <aside
      aria-label="Atención al usuario"
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-3 z-[60] flex flex-col items-end gap-3 sm:right-6"
    >
      <WhatsAppSupport />
      <button
        type="button"
        disabled
        aria-label="Asistente Entre Sí, fuera de servicio"
        className="inline-flex min-h-12 cursor-not-allowed items-center justify-center gap-2 rounded-full bg-plum px-4 py-3 text-sm font-bold text-plum-foreground opacity-75 shadow-lift"
      >
        <Bot aria-hidden="true" className="size-5 text-coral" />
        <span>Asistente Entre Sí</span>
      </button>
    </aside>
  );
}
