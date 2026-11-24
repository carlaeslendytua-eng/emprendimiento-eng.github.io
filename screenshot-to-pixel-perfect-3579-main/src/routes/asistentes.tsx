import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock3, Heart, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FairPicker } from "@/components/entresi/FairPicker";
import { FairMapSection } from "@/components/entresi/FairMapSection";
import { OrganicBackdrop } from "@/components/entresi/OrganicBackdrop";
import { currentQuizSelections, QUIZ, type QuizQuestion } from "@/data/quiz";
import { getFair } from "@/data/fairs";
import { visitorActions, useVisitor } from "@/lib/visitor-store";
import type { DimensionKey } from "@/lib/affinity";

export const Route = createFileRoute("/asistentes")({
  head: () => ({meta: [{title: "Para asistentes · Descubre tus conexiones · Entre Sí"}]}),
  component: Asistentes,
});
const stages = ["Tus datos", "Tus intereses", "Tiempo disponible", "Horario de visita", "Tus preferencias"];
const preferenceKeys: DimensionKey[] = ["values", "aesthetics", "motivations", "priorities"];
const questionsByKey = Object.fromEntries(QUIZ.map(q => [q.dimension, q])) as Record<DimensionKey, QuizQuestion>;

function Asistentes() {
  const visitor = useVisitor();
  const answers = Object.fromEntries(
    QUIZ.map((q) => [q.dimension, currentQuizSelections(q, visitor.answers[q.dimension])]),
  ) as Record<DimensionKey, string[]>;
  const v = { ...visitor, answers };
  const navigate = useNavigate();
  const selectedFair = getFair(v.fairId);
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState("");
  const [duration, setDuration] = useState("60");
  const [arrival, setArrival] = useState("tarde");
  const canProceed = step === 1
    ? Boolean(v.answers.category?.length && v.answers.products?.length)
    : step === 4 ? preferenceKeys.every(key => Boolean(v.answers[key]?.length)) : true;
  const next = () => {
    if (!canProceed) return;
    if (step !== 4) { setStep(s=>s+1); return; }
    // Time and optional nickname inform the visit; personal details never influence compatibility.
    try { sessionStorage.setItem("entresi:visit-plan", JSON.stringify({duration, arrival, nickname: nickname.trim().slice(0,40)})); } catch { /* storage optional */ }
    visitorActions.complete();
    navigate({to:"/resultados"});
  };
  return <div className="relative isolate min-h-[75vh]"><OrganicBackdrop />
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Entre Sí · Experiencia de asistentes</p><h1 className="mt-1 text-3xl font-extrabold sm:text-5xl">Descubre marcas que conectan contigo</h1></div><Link to="/marcas-servicios" className="rounded-full bg-card px-4 py-2 text-sm font-bold hover:bg-muted">¿Tienes una marca? →</Link></div>
      <div className="grid grid-cols-5 gap-1.5" aria-label="Avance de cuestionario">{stages.map((name,i)=><button type="button" key={name} onClick={()=>setStep(i)} className="group text-center" aria-current={i===step?"step":undefined}><span className={`block h-2 rounded-full ${i<=step?"bg-primary":"bg-muted"}`}/><span className={`mt-2 block text-[10px] sm:text-xs ${i===step?"font-extrabold":"text-muted-foreground"}`}>{i+1}. {name}</span></button>)}</div>
      <div className="rise-in mt-8 rounded-4xl bg-card/95 p-5 shadow-lift sm:p-9">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Etapa {step+1} de 5</p>
        {step === 0 && <div className="mt-4 space-y-6"><h2 className="text-3xl font-extrabold">Comencemos por tu visita</h2><p className="text-muted-foreground">No necesitas crear una cuenta. Tu nombre es opcional y no influye en las recomendaciones.</p><label className="block max-w-md text-sm font-bold">¿Cómo quieres que te llamemos? (opcional)<input maxLength={40} value={nickname} onChange={e=>setNickname(e.target.value)} placeholder="Por ejemplo: Ana" className="mt-2 w-full rounded-2xl border border-border bg-background p-3 font-normal" /></label>        <div><p className="mb-3 font-bold">Selecciona la feria que visitarás</p><FairPicker value={v.fairId} onChange={visitorActions.setFair} /><div className="mt-4 flex flex-wrap gap-3"><Button asChild variant="outline">{selectedFair.image ? <a href={selectedFair.image} target="_blank" rel="noreferrer">Ver feria</a> : <Link to="/mapa" search={{ feria: selectedFair.id }}>Ver feria</Link>}</Button><Button asChild variant="link"><Link to="/planes">Conocer membresía</Link></Button></div></div><div className="flex items-start gap-3 rounded-3xl bg-mint-soft p-4 text-sm"><ShieldCheck className="mt-1 h-5 w-5 shrink-0"/><p>Tu cuestionario se conserva en este navegador. No compartimos tus preferencias con las marcas. Solicitar contacto requiere tu autorización.</p></div></div>}
        {step === 1 && <div className="mt-4"><h2 className="text-3xl font-extrabold">¿Qué te gustaría encontrar en la feria?</h2><p className="mt-2 text-muted-foreground">Elige categorías y productos que realmente te interesen. Así descubriremos microempresas afines.</p><Question q={questionsByKey.category} selected={v.answers.category??[]} onChange={ids=>visitorActions.setAnswer("category",ids)}/><Question q={questionsByKey.products} selected={v.answers.products??[]} onChange={ids=>visitorActions.setAnswer("products",ids)}/></div>}
        {step === 2 && <div className="mt-4"><Clock3 className="mb-3 h-9 w-9"/><h2 className="text-3xl font-extrabold">¿Cuánto tiempo tienes para recorrer la feria?</h2><p className="mt-2 text-muted-foreground">Esto nos permitirá adaptar una futura ruta de visita. La duración no modifica tu afinidad con las marcas.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{[{id:"30",name:"30 minutos",desc:"Una visita rápida"},{id:"60",name:"1 hora",desc:"Conocer varias marcas"},{id:"120",name:"2 horas",desc:"Explorar con calma"},{id:"libre",name:"Sin límite definido",desc:"Quiero recorrer a mi ritmo"}].map(o=><Option key={o.id} selected={duration===o.id} onClick={()=>setDuration(o.id)} title={o.name} desc={o.desc}/>)}</div></div>}
        {step === 3 && <div className="mt-4"><MapPin className="mb-3 h-9 w-9"/><h2 className="text-3xl font-extrabold">¿En qué momento planeas visitar la feria?</h2><p className="mt-2 text-muted-foreground">Selecciona una franja estimada. No asumiremos horarios exactos de apertura ni disponibilidad de las marcas.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{[{id:"manana",name:"Por la mañana",desc:"Antes del mediodía"},{id:"mediodia",name:"Al mediodía",desc:"Entre mañana y tarde"},{id:"tarde",name:"Por la tarde",desc:"Después del mediodía"},{id:"no-se",name:"Aún no lo sé",desc:"Decidiré más adelante"}].map(o=><Option key={o.id} selected={arrival===o.id} onClick={()=>setArrival(o.id)} title={o.name} desc={o.desc}/>)}</div></div>}
        {step === 4 && <div className="mt-4"><Heart className="mb-3 h-9 w-9"/><h2 className="text-3xl font-extrabold">¿Qué marcas van más contigo?</h2><p className="mt-2 text-muted-foreground">Cuéntanos tus valores, estilo y motivaciones. Estas elecciones determinan tu compatibilidad.</p>{preferenceKeys.map(key=><Question key={key} q={questionsByKey[key]} selected={v.answers[key]??[]} onChange={ids=>visitorActions.setAnswer(key,ids)}/>)}</div>}
        <div className="mt-9 flex items-center justify-between gap-3 border-t border-border pt-5"><Button variant="outline" disabled={step===0} onClick={()=>setStep(s=>Math.max(0,s-1))}><ArrowLeft/> Atrás</Button><Button size="lg" variant="hero" disabled={!canProceed} onClick={next}>{step===4?<><Sparkles/> Ver mis marcas compatibles</>:<>Continuar <ArrowRight/></>}</Button></div>
      </div>
      <p className="mt-5 text-center text-xs text-muted-foreground">Solo se recomiendan marcas de {getFair(v.fairId).name}. Las puntuaciones son estimaciones, no probabilidades de compra.</p>
    </section>
    <FairMapSection />
  </div>;
}
function Option({selected,onClick,title,desc}:{selected:boolean;onClick:()=>void;title:string;desc?:string}){return <button type="button" onClick={onClick} aria-pressed={selected} className={`flex items-center justify-between gap-3 rounded-3xl border-2 p-4 text-left transition-all hover:-translate-y-0.5 ${selected?"border-foreground bg-mint-soft":"border-transparent bg-muted/50"}`}><span><strong className="block">{title}</strong>{desc&&<span className="block text-xs text-muted-foreground">{desc}</span>}</span>{selected&&<Check className="h-5 w-5 shrink-0"/>}</button>}
function Question({q,selected,onChange}:{q:QuizQuestion;selected:string[];onChange:(ids:string[])=>void}) {
 const [expanded,setExpanded] = useState(true);
 const toggle=(id:string)=> {if(q.type==="single")return onChange([id]);if(selected.includes(id))return onChange(selected.filter(x=>x!==id));if(selected.length<q.maxSelections)onChange([...selected,id]);};
 return <div className="mt-7 rounded-3xl border border-border/70 p-4 sm:p-5"><button type="button" className="flex w-full justify-between gap-2 text-left" aria-expanded={expanded} onClick={()=>setExpanded(x=>!x)}><div><h3 className="text-lg font-extrabold">{q.title}</h3><p className="text-sm text-muted-foreground">{q.helper} · {selected.length} seleccionadas</p></div><span className="text-sm font-semibold">{expanded?"Ocultar −":"Mostrar +"}</span></button>{expanded&&<div className="mt-4 grid gap-2 sm:grid-cols-2">{q.options.map(o=><button key={o.id} type="button" aria-pressed={selected.includes(o.id)} disabled={!selected.includes(o.id)&&q.type==="multiple"&&selected.length>=q.maxSelections} onClick={()=>toggle(o.id)} className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition-all disabled:opacity-40 ${selected.includes(o.id)?"border-foreground bg-mint-soft":"border-transparent bg-muted/50 hover:bg-coral-soft"}`}><span className="text-xl" aria-hidden>{o.emoji}</span><span className="flex-1 text-sm font-semibold">{o.label}</span>{selected.includes(o.id)&&<Check className="h-4 w-4"/>}</button>)}</div>}</div>;
}
