export type ServicePlanId = "visibilidad" | "conexion" | "identidad-ferial";
export type ServicePlanMoment = "antes" | "durante" | "despues";

export type ServicePlan = {
  id: ServicePlanId;
  name: string;
  description: string;
  tone: "lilac" | "coral" | "mint";
  highlights: string[];
  benefits: Record<ServicePlanMoment, string[]>;
};

export const SERVICE_PLAN_MOMENTS: {
  id: ServicePlanMoment;
  label: string;
  helper: string;
}[] = [
  {
    id: "antes",
    label: "Antes",
    helper: "Prepara tu perfil, tu marca y tu presencia para la feria.",
  },
  {
    id: "durante",
    label: "Durante",
    helper: "Facilita el descubrimiento y el contacto con visitantes.",
  },
  {
    id: "despues",
    label: "Después",
    helper: "Organiza resultados y da seguimiento a tus oportunidades.",
  },
];

export const SERVICE_PLANS: ServicePlan[] = [
  {
    id: "visibilidad",
    name: "Plan Visibilidad",
    description: "Haz que tu marca sea descubierta por los visitantes de la feria.",
    tone: "lilac",
    highlights: [
      "Perfil digital y catálogo de hasta cinco productos",
      "Recomendaciones por afinidad mediante IA",
      "Código QR, chatbot y botón de contacto autorizado",
      "Reporte básico y guía de interpretación",
    ],
    benefits: {
      antes: [
        "Registro de perfil comercial: productos, categorías y modalidades de venta.",
        "Perfil digital de la marca con logotipo, descripción, fotografías y contacto.",
        "Catálogo de hasta cinco productos.",
        "Adaptación de la identidad visual con una ronda de correcciones.",
        "Recomendaciones por afinidad mediante IA.",
        "Ubicación anticipada en el mapa.",
      ],
      durante: [
        "Código QR de acceso al perfil, colocado en el stand.",
        "Consulta de información mediante chatbot.",
        "Botón de contacto para visitantes que autoricen que la marca los contacte.",
        "Opción de guardar la marca en la plataforma.",
      ],
      despues: [
        "Reporte básico de visitas al perfil, consultas de productos y veces que se guardó la marca.",
        "Guía breve para interpretar el reporte.",
      ],
    },
  },
  {
    id: "conexion",
    name: "Plan Conexión",
    description:
      "Conecta con visitantes afines y transforma el interés en oportunidades comerciales.",
    tone: "coral",
    highlights: [
      "Perfil digital y catálogo de hasta diez productos",
      "Afinidad, promoción y ubicación anticipada",
      "Chatbot, formulario y contactos con autorización",
      "Reporte detallado, sesión de 30 minutos y 14 días de acompañamiento",
    ],
    benefits: {
      antes: [
        "Registro de perfil comercial.",
        "Perfil digital de marca.",
        "Catálogo ampliado a diez productos.",
        "Presentación ampliada de la marca: historias, procesos y diferenciadores.",
        "Dos rondas de correcciones del perfil.",
        "Una pieza de promoción digital, de producto o de característica.",
        "Recomendaciones por afinidad.",
        "Envío promocional personalizado a visitantes compatibles que hayan autorizado recibir comunicaciones.",
        "Ubicación anticipada en el mapa.",
      ],
      durante: [
        "Código QR de acceso al perfil, colocado en el stand.",
        "Consulta de información mediante chatbot, que conduce al visitante al botón de contacto.",
        "Botón de contacto con autorización para compartir datos.",
        "Formulario adicional de consulta comercial.",
        "Opción de guardar la marca en la plataforma.",
        "Avisos por cercanía solo con autorización del visitante y si existe una solución técnica de ubicación disponible.",
      ],
      despues: [
        "Reporte detallado de visitas al perfil, consultas de productos, veces que se guardó la marca, solicitudes recibidas y contactos generados.",
        "Organización de contactos con estado de seguimiento: pendiente o contactado.",
        "Sesión de 30 minutos para revisar resultados y definir próximas acciones.",
        "Período de acompañamiento de 14 días para el contacto con potenciales clientes.",
      ],
    },
  },
  {
    id: "identidad-ferial",
    name: "Plan Identidad Ferial",
    description:
      "Diseñamos una presencia ferial coherente entre tu marca, tu stand y tu comunicación digital.",
    tone: "mint",
    highlights: [
      "Incluye todo lo contemplado en el Plan Conexión",
      "Concepto personalizado y distribución del stand",
      "Kit gráfico de tres piezas y guía de montaje",
      "Revisión del montaje en un horario acordado",
    ],
    benefits: {
      antes: [
        "Incluye todo lo contemplado en el Plan Conexión.",
        "Formulario de diseño del stand y revisión de materiales y referencias.",
        "Primera reunión de dirección visual.",
        "Concepto personalizado del stand y esquema de distribución.",
        "Revisión de visualización conceptual y propuesta de exhibición.",
        "Kit de tres piezas gráficas y guía de montaje.",
        "Dos rondas de ajustes del diseño del stand.",
      ],
      durante: [
        "Coherencia entre el stand y el perfil digital.",
        "Revisión del montaje mediante un horario acordado.",
        "Orientaciones de ajuste.",
      ],
      despues: [
        "Recomendaciones para reutilizar el kit.",
        "Adaptaciones futuras a elementos reutilizables, según el alcance acordado.",
      ],
    },
  },
];

type ComparisonValue = {
  kind: "included" | "not-included" | "detail";
  text: string;
};

type ComparisonRow = {
  feature: string;
  values: [ComparisonValue, ComparisonValue, ComparisonValue];
};

const included = (text: string): ComparisonValue => ({ kind: "included", text });
const notIncluded = (): ComparisonValue => ({ kind: "not-included", text: "No incluido" });
const detail = (text: string): ComparisonValue => ({ kind: "detail", text });

export const SERVICE_PLAN_COMPARISON: ComparisonRow[] = [
  {
    feature: "Perfil digital",
    values: [detail("Perfil de marca"), detail("Perfil ampliado"), detail("Incluye Plan Conexión")],
  },
  {
    feature: "Número máximo de productos",
    values: [detail("Hasta 5"), detail("Hasta 10"), detail("Hasta 10 · incluye Conexión")],
  },
  {
    feature: "Rondas de correcciones",
    values: [
      detail("1 ronda de identidad visual"),
      detail("2 rondas del perfil"),
      detail("2 del perfil + 2 del diseño del stand"),
    ],
  },
  {
    feature: "Recomendaciones por afinidad",
    values: [included("Mediante IA"), included("Incluidas"), included("Incluye Plan Conexión")],
  },
  {
    feature: "Código QR del perfil",
    values: [included("Incluido"), included("Incluido"), included("Incluye Plan Conexión")],
  },
  {
    feature: "Chatbot",
    values: [
      included("Consultas de información"),
      included("Guía hacia el contacto"),
      included("Incluye Plan Conexión"),
    ],
  },
  {
    feature: "Formulario de consulta comercial",
    values: [notIncluded(), included("Incluido"), included("Incluye Plan Conexión")],
  },
  {
    feature: "Promoción digital",
    values: [notIncluded(), detail("1 pieza"), detail("Incluye Plan Conexión")],
  },
  {
    feature: "Reportes",
    values: [detail("Básico + guía"), detail("Detallado"), detail("Detallado · incluye Conexión")],
  },
  {
    feature: "Seguimiento de contactos",
    values: [
      notIncluded(),
      detail("Organización y acompañamiento de 14 días"),
      detail("Incluye Plan Conexión"),
    ],
  },
  {
    feature: "Diseño del stand",
    values: [notIncluded(), notIncluded(), included("Concepto y distribución")],
  },
  {
    feature: "Kit gráfico",
    values: [notIncluded(), notIncluded(), included("3 piezas gráficas")],
  },
];
