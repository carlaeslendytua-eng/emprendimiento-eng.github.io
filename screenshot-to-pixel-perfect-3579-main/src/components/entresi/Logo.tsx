import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-entre-si.png";
import logoBlanco from "@/assets/logo-entre-si-blanco.png";

export function Logo({ variant = "default" }: { variant?: "default" | "white" }) {
  return (
    <Link to="/" className="inline-flex min-w-0 items-center" aria-label="Entre Sí, inicio">
      <img
        src={variant === "white" ? logoBlanco : logo}
        alt="Entre Sí"
        className={`h-auto w-36 max-w-full sm:w-40 ${variant === "default" ? "[filter:drop-shadow(0.3px_0_currentColor)]" : ""}`}
      />
    </Link>
  );
}
