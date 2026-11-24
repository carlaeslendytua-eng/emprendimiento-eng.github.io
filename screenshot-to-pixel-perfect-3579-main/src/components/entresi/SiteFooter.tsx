import { Logo } from "@/components/entresi/Logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-plum text-plum-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <Logo variant="white" />
          <p className="max-w-sm text-sm text-plum-foreground/75">
            Conectamos microempresas productoras y manufactureras de Quito con quienes visitan nuestras ferias.
          </p>
        </div>
        <p className="max-w-sm text-xs text-plum-foreground/60">
          Tus respuestas al cuestionario se guardan solo en este dispositivo y nunca se comparten con las marcas. Solo
          enviamos tus datos a una marca cuando tú lo autorizas.
        </p>
      </div>
    </footer>
  );
}
