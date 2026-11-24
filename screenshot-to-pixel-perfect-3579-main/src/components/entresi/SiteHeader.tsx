import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";

import { Logo } from "@/components/entresi/Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigationLinks = [
  { to: "/" as const, label: "Inicio" },
  { to: "/ferias" as const, label: "Ferias" },
  { to: "/nosotros" as const, label: "Quiénes somos" },
  { to: "/planes" as const, label: "Planes y servicios" },
];

const linkClass =
  "rounded-full px-3 py-2 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-1 xl:flex">
          {navigationLinks.map((item) => (
            <Link key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm" variant="hero">
            <Link to="/registro">Registrarse</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-2 xl:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="xl:hidden"
                aria-label="Abrir menú de navegación"
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(85vw,360px)]">
              <SheetHeader className="sr-only">
                <SheetTitle>Menú de Entre Sí</SheetTitle>
                <SheetDescription>
                  Enlaces para explorar las ferias y servicios de Entre Sí.
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Navegación móvil" className="mt-8 flex flex-col gap-2">
                {navigationLinks.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <Link to={item.to} className={linkClass}>
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button asChild variant="hero" className="mt-2">
                    <Link to="/registro">Registrarse</Link>
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
