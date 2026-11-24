import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BRANDS } from "@/data/brands";
import { supabase } from "@/integrations/supabase/client";
import { counters, type BrandTotals } from "@/lib/brand-visitor-counters";

export const Route = createFileRoute("/equipo")({
  head: () => ({
    meta: [
      { title: "Panel del equipo · Entre Sí" },
      { name: "description", content: "Visitantes únicos y guardados por marca para el equipo de Entre Sí." },
      { property: "og:title", content: "Panel del equipo · Entre Sí" },
      { property: "og:description", content: "Visitantes únicos y guardados por marca." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Team,
});

function Team() {
  const [state, setState] = useState<"loading" | "signin" | "denied" | "unavailable" | "ok">("loading");
  const [rows, setRows] = useState<BrandTotals[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function load() {
    try {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return setState("signin");
      const { data, error } = await counters.rpc("brand_visitor_totals");
      if (error) return setState(error.code === "42501" ? "denied" : "unavailable");
      setRows(data ?? []);
      setState("ok");
    } catch {
      setState("unavailable");
    }
  }
  useEffect(() => void load(), []);

  if (state === "loading") return <div className="mx-auto max-w-4xl px-4 py-12">Cargando…</div>;
  if (state === "signin")
    return (
      <form
        className="mx-auto flex max-w-sm flex-col gap-3 px-4 py-12"
        onSubmit={async (e) => {
          e.preventDefault();
          const { error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) setErr("No pudimos iniciar sesión.");
          else void load();
        }}
      >
        <h1 className="text-3xl font-extrabold">Equipo Entre Sí</h1>
        <Input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {err && <p className="text-sm text-destructive">{err}</p>}
        <Button type="submit" variant="ink">Entrar</Button>
      </form>
    );
  if (state === "denied")
    return <div className="mx-auto max-w-xl px-4 py-12 text-center">Esta sección es solo para el equipo de Entre Sí.</div>;
  if (state === "unavailable")
    return <div className="mx-auto max-w-xl px-4 py-12 text-center">No pudimos cargar los conteos. Revisa la conexión a la base de datos.</div>;

  const by = new Map(rows.map((r) => [r.brand_slug, r]));
  const list = BRANDS.map((b) => ({ name: b.name, views: Number(by.get(b.slug)?.unique_views ?? 0), saves: Number(by.get(b.slug)?.unique_saves ?? 0) }));
  const total = list.reduce((a, r) => ({ views: a.views + r.views, saves: a.saves + r.saves }), { views: 0, saves: 0 });
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-extrabold">Visitantes por marca</h1>
      <p className="mt-2 text-muted-foreground">Cada navegador cuenta una vez por marca y por acción.</p>
      <table className="mt-8 w-full overflow-hidden rounded-3xl bg-card text-left shadow-soft">
        <thead className="bg-muted text-sm">
          <tr><th className="p-3">Marca</th><th className="p-3">Vieron el perfil</th><th className="p-3">La guardaron</th></tr>
        </thead>
        <tbody>
          {list.map((r) => (
            <tr key={r.name} className="border-t border-border"><td className="p-3 font-semibold">{r.name}</td><td className="p-3">{r.views}</td><td className="p-3">{r.saves}</td></tr>
          ))}
          <tr className="border-t border-border font-extrabold"><td className="p-3">Suma por marca</td><td className="p-3">{total.views}</td><td className="p-3">{total.saves}</td></tr>
        </tbody>
      </table>
    </div>
  );
}
