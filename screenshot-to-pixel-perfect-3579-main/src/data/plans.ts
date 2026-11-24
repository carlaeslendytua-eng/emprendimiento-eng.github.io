export type PlanId = "visibilidad" | "conexion" | "identidad-ferial";
export type PlanMoment = "antes" | "durante" | "despues";

export type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  description: string;
  /** Key benefits, in the order they are shown on cards. */
  benefits: string[];
  moments: Record<PlanMoment, string[]>;
  tone: "lilac" | "coral" | "mint";
};

export const PLAN_MOMENTS: { id: PlanMoment; label: string; helper: string }[] = [
  { id: "antes", label: "Antes", helper: "Lo que recibe tu microempresa para llegar lista a la feria." },
  { id: "durante", label: "Durante", helper: "Las herramientas que estarán activas en la feria." },
  { id: "despues", label: "Después", helper: "Los resultados y el seguimiento que obtienes." },
];

export const PLANS: Plan[] = [
  {
    id: "visibilidad",
    name: "Plan Visibilidad",
    tagline: "Que te encuentren en la feria",
    description: "Tu marca con presencia digital clara, ubicada en el mapa y lista para que te guarden y te contacten.",
    benefits: [
      "Perfil comercial básico",
      "Catálogo breve",
      "Presencia digital",
      "Adaptación visual",
      "Ubicación en mapa",
      "QR del perfil",
      "Botón de contacto",
      "Opción de guardar marca",
      "Reporte básico posterior",
    ],
    moments: {
      antes: ["Perfil comercial básico", "Catálogo breve", "Adaptación visual de tu marca", "QR del perfil"],
      durante: ["Presencia digital", "Ubicación en el mapa de la feria", "Botón de contacto", "Opción de guardar marca"],
      despues: ["Reporte básico posterior"],
    },
    tone: "lilac",
  },
  {
    id: "conexion",
    name: "Plan Conexión",
    tagline: "Convierte visitas en contactos",
    description: "Un perfil más completo, recomendaciones por afinidad y un registro ordenado de quienes se interesan por ti.",
    benefits: [
      "Perfil comercial ampliado",
      "Catálogo amplio",
      "Historia y diferenciadores",
      "Promoción digital",
      "Recomendaciones por afinidad",
      "Chatbot o canal de consulta",
      "Formulario o botón de contacto",
      "Registro de interacciones",
      "Organización de contactos",
      "Reporte más completo y seguimiento",
    ],
    moments: {
      antes: ["Perfil comercial ampliado", "Catálogo amplio", "Historia y diferenciadores", "Promoción digital"],
      durante: [
        "Recomendaciones por afinidad",
        "Chatbot o canal de consulta",
        "Formulario o botón de contacto",
        "Registro de interacciones",
      ],
      despues: ["Organización de contactos", "Reporte más completo y seguimiento"],
    },
    tone: "coral",
  },
  {
    id: "identidad-ferial",
    name: "Plan Identidad Ferial",
    tagline: "Un stand que se parece a tu marca",
    description: "Acompañamiento para diseñar tu espacio físico y que sea coherente con tu perfil digital.",
    benefits: [
      "Diseño del stand",
      "Revisión de materiales",
      "Concepto visual del espacio",
      "Distribución",
      "Kit gráfico",
      "Guía de montaje",
      "Coherencia entre perfil digital y espacio físico",
      "Recomendaciones posteriores",
    ],
    moments: {
      antes: [
        "Diseño del stand",
        "Revisión de materiales",
        "Concepto visual del espacio",
        "Distribución",
        "Kit gráfico",
        "Guía de montaje",
      ],
      durante: ["Coherencia entre perfil digital y espacio físico"],
      despues: ["Recomendaciones posteriores"],
    },
    tone: "mint",
  },
];

export const PLAN_IDS = PLANS.map((p) => p.id);

export const getPlan = (id: string | undefined) => PLANS.find((p) => p.id === id);
