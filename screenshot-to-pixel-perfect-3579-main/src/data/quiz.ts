import type { DimensionKey } from "@/lib/affinity";

export type QuizOption = {
  id: string;
  label: string;
  hint?: string;
  emoji: string;
};

export type QuizQuestion = {
  id: string;
  dimension: DimensionKey;
  eyebrow: string;
  title: string;
  helper: string;
  type: "single" | "multiple";
  maxSelections: number;
  options: QuizOption[];
};

/** Six questions, one per affinity dimension. Option ids are the tags brands are matched on. */
const LEGACY_QUIZ: QuizQuestion[] = [
  {
    id: "categoria",
    dimension: "category",
    eyebrow: "Para empezar",
    title: "¿Qué te gustaría descubrir hoy?",
    helper: "Elige hasta 3 mundos.",
    type: "multiple",
    maxSelections: 3,
    options: [
      { id: "textiles", label: "Textiles y accesorios", emoji: "🧶", hint: "Bolsos, tejidos, prendas" },
      { id: "cuidado", label: "Cuidado personal natural", emoji: "🌿", hint: "Jabones, aceites, velas" },
      { id: "decoracion", label: "Decoración e iluminación", emoji: "💡", hint: "Objetos para tu espacio" },
      { id: "papeleria", label: "Papelería y diseño", emoji: "📓", hint: "Cuadernos, láminas" },
      { id: "alimentos", label: "Alimentos y bebidas", emoji: "☕", hint: "Café, cacao, dulces" },
      { id: "joyeria", label: "Joyería y bisutería", emoji: "💎", hint: "Aretes, collares" },
    ],
  },
  {
    id: "valores",
    dimension: "values",
    eyebrow: "Lo que te mueve",
    title: "¿Qué hace que una marca te enamore?",
    helper: "Elige hasta 3 valores.",
    type: "multiple",
    maxSelections: 3,
    options: [
      { id: "hecho-a-mano", label: "Hecho a mano", emoji: "✋" },
      { id: "sostenible", label: "Cuidado del planeta", emoji: "🌎" },
      { id: "residuo-cero", label: "Cero residuos", emoji: "♻️", hint: "Envases reutilizables" },
      { id: "herencia", label: "Saberes ancestrales", emoji: "🪶" },
      { id: "comercio-justo", label: "Comercio justo", emoji: "🤝" },
      { id: "diseno-autor", label: "Diseño de autor", emoji: "✏️", hint: "Innovación y creatividad" },
      { id: "ingredientes-locales", label: "Materias primas locales", emoji: "🏔️" },
    ],
  },
  {
    id: "estilo",
    dimension: "aesthetics",
    eyebrow: "Tu estética",
    title: "¿Qué estilo va contigo?",
    helper: "Elige hasta 2.",
    type: "multiple",
    maxSelections: 2,
    options: [
      { id: "andino-colorido", label: "Andino y colorido", emoji: "🌈" },
      { id: "natural-minimal", label: "Natural y minimalista", emoji: "🤍" },
      { id: "geometrico", label: "Geométrico y moderno", emoji: "🔷" },
      { id: "botanico", label: "Botánico y fresco", emoji: "🌱" },
      { id: "calido-rustico", label: "Cálido y rústico", emoji: "🪵" },
    ],
  },
  {
    id: "motivacion",
    dimension: "motivations",
    eyebrow: "Tu visita",
    title: "¿Qué te trae a la feria?",
    helper: "Elige hasta 3 motivos.",
    type: "multiple",
    maxSelections: 3,
    options: [
      { id: "regalo", label: "Un regalo especial", emoji: "🎁" },
      { id: "autocuidado", label: "Consentirme", emoji: "🛁", hint: "Autocuidado" },
      { id: "decorar", label: "Renovar mi espacio", emoji: "🏡" },
      { id: "apoyar-local", label: "Apoyar lo local", emoji: "💛" },
      { id: "piezas-unicas", label: "Piezas únicas", emoji: "✨", hint: "Coleccionar" },
      { id: "uso-diario", label: "Algo práctico", emoji: "☀️", hint: "Para el día a día" },
    ],
  },
  {
    id: "productos",
    dimension: "products",
    eyebrow: "Antojos",
    title: "¿Qué productos te llaman la atención?",
    helper: "Elige hasta 4.",
    type: "multiple",
    maxSelections: 4,
    options: [
      { id: "bolsos", label: "Bolsos y mochilas", emoji: "👜" },
      { id: "tapices", label: "Tapices y textiles de hogar", emoji: "🧵" },
      { id: "jabones", label: "Jabones y champú sólido", emoji: "🧼" },
      { id: "velas", label: "Velas aromáticas", emoji: "🕯️" },
      { id: "lamparas", label: "Lámparas", emoji: "🏮" },
      { id: "cuadernos", label: "Cuadernos y libretas", emoji: "📒" },
      { id: "cafe", label: "Café y chocolate", emoji: "🍫" },
      { id: "aretes", label: "Aretes y collares", emoji: "📿" },
    ],
  },
  {
    id: "prioridad",
    dimension: "priorities",
    eyebrow: "Último paso",
    title: "Al momento de comprar, ¿qué pesa más?",
    helper: "Elige solo una.",
    type: "single",
    maxSelections: 1,
    options: [
      { id: "precio-accesible", label: "Precio accesible", emoji: "💸" },
      { id: "durabilidad", label: "Calidad que dure", emoji: "🛡️" },
      { id: "impacto", label: "Bajo impacto ambiental", emoji: "🍃" },
      { id: "exclusividad", label: "Que sea único", emoji: "🦄" },
      { id: "historia", label: "Conocer quién lo hizo", emoji: "📖" },
    ],
  },
];

export const QUIZ: QuizQuestion[] = [
  {
    id: "categoria", dimension: "category", eyebrow: "Para empezar",
    title: "¿Qué te gustaría descubrir en la feria?", helper: "Elige hasta 3 opciones.",
    type: "multiple", maxSelections: 3,
    options: [
      { id: "ferias-categoria", label: "Descubrir emprendimientos en ferias", emoji: "📍" },
      { id: "lectura-categoria", label: "Fomentar la lectura infantil", emoji: "📚" },
      { id: "recuerdos-categoria", label: "Conservar recuerdos familiares", emoji: "📷" },
      { id: "deporte-categoria", label: "Explorar nutrición deportiva", emoji: "🏃" },
      { id: "cachorro-categoria", label: "Aprender a cuidar a mi primer perro", emoji: "🐶" },
      { id: "desayuno-categoria", label: "Organizar desayunos escolares", emoji: "🍞" },
    ],
  },
  {
    id: "valores", dimension: "values", eyebrow: "Lo que te importa",
    title: "¿Qué te gustaría apoyar o fortalecer?", helper: "Elige hasta 3 opciones.",
    type: "multiple", maxSelections: 3,
    options: [
      { id: "ferias-valores", label: "Dar visibilidad a mi emprendimiento", emoji: "📍" },
      { id: "lectura-valores", label: "Fortalecer el vínculo familiar a través de la lectura", emoji: "📚" },
      { id: "recuerdos-valores", label: "Mantener vivas las historias de mi familia", emoji: "📷" },
      { id: "deporte-valores", label: "Tener opciones prácticas para entrenar", emoji: "🏃" },
      { id: "cachorro-valores", label: "Compartir el cuidado del perro en familia", emoji: "🐶" },
      { id: "desayuno-valores", label: "Involucrar a mis hijos en elegir su desayuno", emoji: "🍞" },
    ],
  },
  {
    id: "estilo", dimension: "aesthetics", eyebrow: "Cómo prefieres explorar",
    title: "¿Qué tipo de experiencia te serviría más?", helper: "Elige hasta 3 opciones.",
    type: "multiple", maxSelections: 3,
    options: [
      { id: "ferias-estilo", label: "Explorar un directorio de marcas", emoji: "📍" },
      { id: "lectura-estilo", label: "Aprender mediante cuentos interactivos", emoji: "📚" },
      { id: "recuerdos-estilo", label: "Crear un álbum con otras personas", emoji: "📷" },
      { id: "deporte-estilo", label: "Consumir algo fácil de llevar y tomar", emoji: "🏃" },
      { id: "cachorro-estilo", label: "Recibir recordatorios y consejos adaptados", emoji: "🐶" },
      { id: "desayuno-estilo", label: "Cocinar con videos paso a paso", emoji: "🍞" },
    ],
  },
  {
    id: "motivacion", dimension: "motivations", eyebrow: "Tu objetivo",
    title: "¿Qué te gustaría resolver o acompañar?", helper: "Elige hasta 3 opciones.",
    type: "multiple", maxSelections: 3,
    options: [
      { id: "ferias-motivacion", label: "Conectar con microempresas", emoji: "📍" },
      { id: "lectura-motivacion", label: "Acompañar la lectura de niños de 6 a 9 años", emoji: "📚" },
      { id: "recuerdos-motivacion", label: "Organizar fotos, videos, audios y textos", emoji: "📷" },
      { id: "deporte-motivacion", label: "Acompañar mi rendimiento y recuperación", emoji: "🏃" },
      { id: "cachorro-motivacion", label: "Entender el comportamiento de mi cachorro", emoji: "🐶" },
      { id: "desayuno-motivacion", label: "Dejar listo el plan del desayuno la noche anterior", emoji: "🍞" },
    ],
  },
  {
    id: "productos", dimension: "products", eyebrow: "Lo que quieres encontrar",
    title: "¿Qué te gustaría probar o conocer?", helper: "Elige hasta 3 opciones.",
    type: "multiple", maxSelections: 3,
    options: [
      { id: "ferias-productos", label: "Mapa de stands y perfiles de marca", emoji: "📍" },
      { id: "lectura-productos", label: "Cuentos y actividades de comprensión", emoji: "📚" },
      { id: "recuerdos-productos", label: "Álbumes y libros digitales o impresos", emoji: "📷" },
      { id: "deporte-productos", label: "Geles nutricionales deportivos", emoji: "🏃" },
      { id: "cachorro-productos", label: "App con guías y rutinas de cuidado", emoji: "🐶" },
      { id: "desayuno-productos", label: "Recetas de desayuno de 10 minutos o menos", emoji: "🍞" },
    ],
  },
  {
    id: "prioridad", dimension: "priorities", eyebrow: "Último paso",
    title: "¿Qué es lo más importante para ti?", helper: "Elige una opción.",
    type: "single", maxSelections: 1,
    options: [
      { id: "ferias-prioridad", label: "Encontrar las marcas que van conmigo", emoji: "📍" },
      { id: "lectura-prioridad", label: "Revisar el progreso lector", emoji: "📚" },
      { id: "recuerdos-prioridad", label: "Contar mis historias con plantillas y preguntas", emoji: "📷" },
      { id: "deporte-prioridad", label: "Cubrir el antes, durante y después del ejercicio", emoji: "🏃" },
      { id: "cachorro-prioridad", label: "Consultar información respaldada por veterinarios", emoji: "🐶" },
      { id: "desayuno-prioridad", label: "Usar ingredientes que ya tengo o consigo en Quito", emoji: "🍞" },
    ],
  },
];

export const QUIZ_OPTION_LABELS: Record<string, string> = Object.fromEntries(
  [...LEGACY_QUIZ, ...QUIZ].flatMap((q) => q.options.map((o) => [o.id, o.label])),
);

export function currentQuizSelections(question: QuizQuestion, selected: string[] = []) {
  return selected.filter((id) => question.options.some((option) => option.id === id));
}
