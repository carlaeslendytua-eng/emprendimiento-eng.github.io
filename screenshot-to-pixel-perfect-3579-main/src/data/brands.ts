import tramaImg from "@/assets/brand-trama-nomada.jpg";
import broteImg from "@/assets/brand-brote-circular.jpg";
import luminaImg from "@/assets/brand-lumina-pliegue.jpg";
import granoImg from "@/assets/brand-grano-alto.jpg";
import chakanaImg from "@/assets/brand-chakana-plata.jpg";
import barroImg from "@/assets/brand-barro-vivo.jpg";
import ceibaImg from "@/assets/brand-ceiba-cuero.jpg";
import entreSiLogo from "@/assets/logo-entre-si.png";
import cuenticoLogo from "@/assets/Logo cuentico.png";
import memoraLogo from "@/assets/MEMORA.jpg.jpeg";
import nergyLogo from "@/assets/logo nergy.png";
import cuidaDogLogo from "@/assets/Restauración fiel del logo CuidaDog.png";
import panComidoLogo from "@/assets/pan-comido-logo.png";
import tramaGallery from "@/assets/gallery-trama-nomada.jpg";
import broteGallery from "@/assets/gallery-brote-circular.jpg";
import luminaGallery from "@/assets/gallery-lumina-pliegue.jpg";
import granoGallery from "@/assets/gallery-grano-alto.jpg";
import chakanaGallery from "@/assets/gallery-chakana-plata.jpg";
import barroGallery from "@/assets/gallery-barro-vivo.jpg";
import ceibaGallery from "@/assets/gallery-ceiba-cuero.jpg";
import type { PlanId } from "@/data/plans";
import type { DimensionKey } from "@/lib/affinity";

export const BRAND_GROUPS = [
  "Otros emprendimientos",
  "Textiles y cuero",
  "Cuidado personal",
  "Hogar y decoración",
  "Papelería y diseño",
  "Alimentos",
  "Accesorios y joyería",
] as const;
export type BrandGroup = (typeof BRAND_GROUPS)[number];

/** Demo data (fictitious brands). Every affinity tag must have an `evidence` phrase grounded in the profile. */
export type Brand = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  image: string;
  /** Filter group shown on the Marcas page. */
  group: BrandGroup;
  /** Service plan the brand has with Entre Sí. */
  plan: PlanId;
  story: string;
  highlights: { name: string; description: string }[];
  gallery: { src: string; alt: string }[];
  products: string[];
  materials: string[];
  processes: string[];
  style: string[];
  values: string[];
  differentiators: string[];
  priceRange?: { min: number; max: number; currency: "USD" };
  keywords: string[];
  affinity: Record<DimensionKey, string[]>;
  /** Verifiable phrase per matched tag, used in "Te recomendamos esta marca porque...". */
  evidence: Record<string, string>;
};

export const BRANDS: Brand[] = [
  {
    slug: "trama-nomada",
    name: "Trama Nómada",
    tagline: "Tejidos andinos que viajan contigo",
    category: "Textiles y accesorios",
    image: tramaImg,
    group: "Textiles y cuero",
    plan: "conexion",
    highlights: [
      { name: "Bolso Cotopaxi", description: "Bolso de hombro tejido en lana con forro de algodón." },
      { name: "Tapiz Camino del Sol", description: "Tapiz de pared teñido con nogal y cochinilla." },
      { name: "Mochila Nómada", description: "Mochila diaria con correas reforzadas." },
    ],
    gallery: [
      { src: tramaImg, alt: "Bolsos y tapices de Trama Nómada" },
      { src: tramaGallery, alt: "Tejedora trabajando en telar de pedal" },
    ],
    story:
      "Taller quiteño que trabaja con tejedoras de Otavalo. Cada bolso y tapiz se teje en telar de pedal con lana teñida con plantas, y lleva el nombre de quien lo hizo.",
    products: ["Bolsos tejidos", "Mochilas", "Tapices", "Caminos de mesa"],
    materials: ["Lana de oveja de Cotopaxi", "Algodón", "Tintes naturales"],
    processes: ["Tejido en telar de pedal", "Teñido con plantas"],
    style: ["Andino colorido", "Cálido y rústico"],
    values: ["Hecho a mano", "Comercio justo", "Herencia textil andina", "Materia prima local"],
    differentiators: ["Piezas únicas en series cortas", "Cada pieza firmada por su tejedora", "Fibras resistentes"],
    priceRange: { min: 18, max: 95, currency: "USD" },
    keywords: ["tejido", "telar", "lana", "andino", "bolso", "tapiz", "Otavalo"],
    affinity: {
      category: ["textiles"],
      values: ["hecho-a-mano", "herencia", "comercio-justo", "ingredientes-locales"],
      aesthetics: ["andino-colorido", "calido-rustico"],
      motivations: ["regalo", "piezas-unicas", "apoyar-local", "decorar"],
      products: ["bolsos", "tapices"],
      priorities: ["durabilidad", "historia", "exclusividad"],
    },
    evidence: {
      textiles: "elabora textiles y accesorios",
      "hecho-a-mano": "cada pieza se teje a mano en telar de pedal",
      herencia: "mantiene vivas técnicas de tejido andino",
      "comercio-justo": "trabaja con tejedoras de Otavalo bajo comercio justo",
      "ingredientes-locales": "usa lana de oveja de Cotopaxi y tintes naturales",
      "andino-colorido": "su estilo andino y colorido coincide con el tuyo",
      "calido-rustico": "sus texturas de lana tienen el estilo cálido que te gusta",
      regalo: "sus bolsos y tapices son un regalo con historia",
      "piezas-unicas": "produce piezas únicas en series cortas",
      "apoyar-local": "es una microempresa quiteña",
      decorar: "sus tapices y caminos de mesa pueden renovar tu espacio",
      bolsos: "ofrece bolsos y mochilas tejidas",
      tapices: "ofrece tapices y caminos de mesa",
      durabilidad: "trabaja con fibras resistentes pensadas para durar",
      historia: "cada pieza lleva el nombre de la tejedora que la hizo",
      exclusividad: "ninguna de sus piezas se repite",
    },
  },
  {
    slug: "brote-circular",
    name: "Brote Circular",
    tagline: "Cuidado natural que vuelve a empezar",
    category: "Cuidado personal y bienestar",
    image: broteImg,
    group: "Cuidado personal",
    plan: "identidad-ferial",
    highlights: [
      { name: "Jabón Eucalipto y Menta", description: "Jabón de saponificación en frío para piel normal." },
      { name: "Champú sólido Romero", description: "Una barra rinde lo mismo que dos frascos de champú." },
      { name: "Kit Regalo Sierra", description: "Jabón, vela y bálsamo en caja de cartón reciclado." },
    ],
    gallery: [
      { src: broteImg, alt: "Jabones y velas de Brote Circular" },
      { src: broteGallery, alt: "Corte de jabón artesanal con eucalipto y romero" },
    ],
    story:
      "Laboratorio artesanal de cosmética natural. Formula jabones, champú sólido y velas con plantas de la Sierra, y recupera sus envases para volver a llenarlos.",
    products: ["Jabones artesanales", "Champú sólido", "Velas de cera de soya", "Kits de regalo"],
    materials: ["Aceites vegetales", "Cera de soya", "Eucalipto, romero y menta de la Sierra"],
    processes: ["Saponificación en frío", "Envasado retornable"],
    style: ["Natural y minimalista", "Botánico"],
    values: ["Cero residuos", "Ingredientes biodegradables", "Materia prima local", "Hecho a mano"],
    differentiators: ["Envases retornables", "Productos desde USD 4", "Kits de regalo armados a mano"],
    priceRange: { min: 4, max: 22, currency: "USD" },
    keywords: ["jabón", "champú sólido", "velas", "natural", "eucalipto", "retornable"],
    affinity: {
      category: ["cuidado"],
      values: ["sostenible", "residuo-cero", "ingredientes-locales", "hecho-a-mano"],
      aesthetics: ["natural-minimal", "botanico"],
      motivations: ["autocuidado", "uso-diario", "regalo", "apoyar-local"],
      products: ["jabones", "velas"],
      priorities: ["precio-accesible", "impacto"],
    },
    evidence: {
      cuidado: "crea productos de cuidado personal natural",
      sostenible: "formula sus productos con ingredientes biodegradables",
      "residuo-cero": "vende en envases retornables y sin plástico de un solo uso",
      "ingredientes-locales": "usa eucalipto, romero y menta de la Sierra",
      "hecho-a-mano": "elabora sus jabones a mano por saponificación en frío",
      "natural-minimal": "su estética natural y minimalista va contigo",
      botanico: "su línea botánica de eucalipto, romero y menta encaja con tu estilo",
      autocuidado: "sus productos están pensados para consentirte",
      "uso-diario": "sus jabones y champús sólidos son de uso diario",
      regalo: "arma kits de regalo a mano",
      "apoyar-local": "es una microempresa quiteña",
      jabones: "ofrece jabones artesanales y champú sólido",
      velas: "ofrece velas de cera de soya",
      "precio-accesible": "tiene productos desde USD 4",
      impacto: "recupera sus envases para reducir su huella",
    },
  },
  {
    slug: "lumina-pliegue",
    name: "Lúmina Pliegue",
    tagline: "Luz y papel, doblados con intención",
    category: "Decoración y papelería",
    image: luminaImg,
    group: "Papelería y diseño",
    plan: "visibilidad",
    highlights: [
      { name: "Lámpara Pliegue Diamante", description: "Pantalla plegada en papel de abacá, varios tamaños." },
      { name: "Cuaderno Cosido", description: "Encuadernación japonesa con hojas de papel reciclado." },
      { name: "Set de libretas", description: "Tres libretas de bolsillo en colores a elección." },
    ],
    gallery: [
      { src: luminaImg, alt: "Lámparas y cuadernos de Lúmina Pliegue" },
      { src: luminaGallery, alt: "Manos plegando una pantalla de lámpara de papel" },
    ],
    story:
      "Estudio de diseño que transforma papel reciclado y fibra de abacá en lámparas plegadas y cuadernos encuadernados a mano. Cada colección se diseña en su taller de Quito.",
    products: ["Lámparas de papel plegado", "Cuadernos encuadernados a mano", "Libretas", "Objetos decorativos"],
    materials: ["Papel reciclado", "Fibra de abacá", "Hilo de algodón"],
    processes: ["Plegado manual", "Encuadernación cosida a mano"],
    style: ["Geométrico y moderno", "Natural y minimalista"],
    values: ["Diseño de autor", "Materiales reciclados", "Hecho a mano"],
    differentiators: ["Colores y medidas personalizables", "Colecciones de diseño propio"],
    priceRange: { min: 9, max: 120, currency: "USD" },
    keywords: ["lámpara", "origami", "papel", "cuaderno", "encuadernación", "diseño"],
    affinity: {
      category: ["decoracion", "papeleria"],
      values: ["diseno-autor", "sostenible", "hecho-a-mano"],
      aesthetics: ["geometrico", "natural-minimal"],
      motivations: ["decorar", "regalo", "piezas-unicas", "apoyar-local"],
      products: ["lamparas", "cuadernos"],
      priorities: ["exclusividad"],
    },
    evidence: {
      decoracion: "diseña lámparas y objetos decorativos",
      papeleria: "crea papelería de diseño encuadernada a mano",
      "diseno-autor": "cada colección es diseño de autor de su taller",
      sostenible: "trabaja con papel reciclado y fibra de abacá",
      "hecho-a-mano": "pliega y cose cada pieza a mano",
      geometrico: "sus formas geométricas plegadas encajan con tu estilo moderno",
      "natural-minimal": "sus piezas en tonos naturales siguen una estética minimalista",
      decorar: "sus lámparas plegadas transforman la luz de un espacio",
      regalo: "sus cuadernos y lámparas son regalos con diseño",
      "piezas-unicas": "permite personalizar cada pieza",
      "apoyar-local": "es una microempresa quiteña",
      lamparas: "ofrece lámparas de papel plegado",
      cuadernos: "ofrece cuadernos y libretas encuadernados a mano",
      exclusividad: "personaliza colores y medidas de cada pieza",
    },
  },
  {
    slug: "grano-alto",
    name: "Grano Alto",
    tagline: "Café y cacao de altura, del bosque nublado a tu taza",
    category: "Café y chocolate",
    image: granoImg,
    group: "Alimentos",
    plan: "conexion",
    story:
      "Familia productora de Nanegal, en el noroccidente de Quito. Cultivan su propio café bajo sombra, lo tuestan en pequeños lotes y elaboran chocolate de cacao fino de aroma comprado directamente a productores del cantón.",
    highlights: [
      { name: "Café de altura tostado medio", description: "Bolsa de 340 g, en grano o molido al momento." },
      { name: "Chocolate 70 %", description: "Barra de cacao fino de aroma con panela." },
      { name: "Caja degustación", description: "Tres cafés y dos chocolates para compartir." },
    ],
    gallery: [
      { src: granoImg, alt: "Bolsas de café y barras de chocolate de Grano Alto" },
      { src: granoGallery, alt: "Tueste artesanal de café en Nanegal" },
    ],
    products: ["Café en grano y molido", "Chocolate en barra", "Cajas de degustación"],
    materials: ["Café arábica de Nanegal", "Cacao fino de aroma", "Panela"],
    processes: ["Cultivo bajo sombra", "Tueste en pequeños lotes"],
    style: ["Cálido y rústico", "Natural y minimalista"],
    values: ["Materia prima local", "Comercio directo con productores", "Agricultura bajo sombra"],
    differentiators: ["Tuesta cada semana", "Productos desde USD 3", "Conoces la finca de origen"],
    priceRange: { min: 3, max: 28, currency: "USD" },
    keywords: ["café", "chocolate", "cacao", "Nanegal", "tostado", "panela"],
    affinity: {
      category: ["alimentos"],
      values: ["ingredientes-locales", "comercio-justo", "sostenible"],
      aesthetics: ["calido-rustico", "natural-minimal"],
      motivations: ["regalo", "uso-diario", "apoyar-local"],
      products: ["cafe"],
      priorities: ["precio-accesible", "historia"],
    },
    evidence: {
      alimentos: "produce café y chocolate",
      "ingredientes-locales": "cultiva su café en Nanegal y usa cacao del mismo cantón",
      "comercio-justo": "compra el cacao directamente a productores",
      sostenible: "cultiva su café bajo sombra, cuidando el bosque nublado",
      "calido-rustico": "su empaque kraft y sus aromas tienen el estilo cálido que buscas",
      "natural-minimal": "presenta sus productos de forma sencilla y natural",
      regalo: "arma cajas de degustación para regalar",
      "uso-diario": "su café es para disfrutar todos los días",
      "apoyar-local": "es una microempresa familiar del noroccidente de Quito",
      cafe: "ofrece café de altura y chocolate",
      "precio-accesible": "tiene productos desde USD 3",
      historia: "te cuenta de qué finca viene cada lote",
    },
  },
  {
    slug: "chakana-plata",
    name: "Chakana Plata",
    tagline: "Joyería en plata y semillas con símbolos andinos",
    category: "Joyería artesanal",
    image: chakanaImg,
    group: "Accesorios y joyería",
    plan: "visibilidad",
    story:
      "Taller de orfebrería del Centro Histórico de Quito. Trabajan plata 950 a mano y la combinan con semillas de tagua y huayruro para crear aretes, collares y pulseras inspirados en la chakana andina.",
    highlights: [
      { name: "Aretes Chakana", description: "Aretes de plata 950 con perlas de tagua." },
      { name: "Collar Huayruro", description: "Collar de semillas con dije de plata calada." },
      { name: "Pulsera Semilla", description: "Pulsera ajustable de tagua y plata." },
    ],
    gallery: [
      { src: chakanaImg, alt: "Aretes y collares de plata y semillas de Chakana Plata" },
      { src: chakanaGallery, alt: "Orfebre dando forma a un dije de plata" },
    ],
    products: ["Aretes", "Collares", "Pulseras", "Anillos"],
    materials: ["Plata 950", "Semillas de tagua", "Semillas de huayruro"],
    processes: ["Orfebrería a mano", "Calado en plata"],
    style: ["Andino colorido", "Geométrico y moderno"],
    values: ["Hecho a mano", "Saberes de orfebrería quiteña", "Materiales naturales"],
    differentiators: ["Grabado de iniciales sin costo", "Garantía de un año en la plata"],
    priceRange: { min: 12, max: 85, currency: "USD" },
    keywords: ["plata", "joyas", "aretes", "collar", "tagua", "chakana"],
    affinity: {
      category: ["joyeria"],
      values: ["hecho-a-mano", "herencia", "ingredientes-locales"],
      aesthetics: ["andino-colorido", "geometrico"],
      motivations: ["regalo", "piezas-unicas", "apoyar-local"],
      products: ["aretes"],
      priorities: ["durabilidad", "exclusividad"],
    },
    evidence: {
      joyeria: "crea joyería artesanal en plata",
      "hecho-a-mano": "trabaja cada pieza a mano en su taller",
      herencia: "mantiene la tradición orfebre del Centro Histórico de Quito",
      "ingredientes-locales": "usa semillas de tagua y huayruro de Ecuador",
      "andino-colorido": "sus diseños con huayruro y chakana tienen el estilo andino que te gusta",
      geometrico: "sus formas caladas son geométricas",
      regalo: "graba iniciales sin costo para regalar",
      "piezas-unicas": "sus piezas se hacen a mano, una por una",
      "apoyar-local": "es una microempresa quiteña",
      aretes: "ofrece aretes, collares y pulseras",
      durabilidad: "da un año de garantía en la plata",
      exclusividad: "personaliza cada pieza con grabado",
    },
  },
  {
    slug: "barro-vivo",
    name: "Barro Vivo",
    tagline: "Cerámica utilitaria para la mesa de todos los días",
    category: "Cerámica y hogar",
    image: barroImg,
    group: "Hogar y decoración",
    plan: "identidad-ferial",
    story:
      "Dos ceramistas de Conocoto que modelan en torno tazas, bowls y floreros con arcilla de la zona y esmaltes sin plomo. Cada colección tiene pocas piezas y ningún tono sale exactamente igual.",
    highlights: [
      { name: "Taza Lila", description: "Taza de 300 ml con esmalte mate sin plomo." },
      { name: "Set de bowls Conocoto", description: "Tres bowls apilables en tonos tierra." },
      { name: "Florero Neblina", description: "Florero alto de cuello estrecho." },
    ],
    gallery: [
      { src: barroImg, alt: "Tazas, bowls y florero de Barro Vivo" },
      { src: barroGallery, alt: "Manos modelando un bowl en el torno" },
    ],
    products: ["Tazas", "Bowls", "Platos", "Floreros"],
    materials: ["Arcilla local", "Esmaltes sin plomo"],
    processes: ["Modelado en torno", "Cocción a alta temperatura"],
    style: ["Natural y minimalista", "Cálido y rústico"],
    values: ["Hecho a mano", "Esmaltes seguros para alimentos", "Materia prima local"],
    differentiators: ["Aptas para microondas y lavavajillas", "Series cortas de cada color"],
    priceRange: { min: 10, max: 60, currency: "USD" },
    keywords: ["cerámica", "taza", "bowl", "florero", "arcilla", "torno"],
    affinity: {
      category: ["decoracion"],
      values: ["hecho-a-mano", "ingredientes-locales"],
      aesthetics: ["natural-minimal", "calido-rustico"],
      motivations: ["decorar", "uso-diario", "regalo", "apoyar-local"],
      products: [],
      priorities: ["durabilidad", "exclusividad"],
    },
    evidence: {
      decoracion: "crea cerámica para tu mesa y tu espacio",
      "hecho-a-mano": "modela cada pieza a mano en torno",
      "ingredientes-locales": "trabaja con arcilla de Conocoto",
      "natural-minimal": "sus esmaltes mate siguen una estética natural y minimalista",
      "calido-rustico": "sus tonos tierra tienen el estilo cálido que te gusta",
      decorar: "sus floreros y bowls renuevan tu espacio",
      "uso-diario": "sus tazas y platos son para usar todos los días",
      regalo: "sus sets de bowls son un regalo práctico",
      "apoyar-local": "es una microempresa de Conocoto, en Quito",
      durabilidad: "cuece sus piezas a alta temperatura y son aptas para lavavajillas",
      exclusividad: "hace series cortas de cada color",
    },
  },
  {
    slug: "ceiba-cuero",
    name: "Ceiba Cuero",
    tagline: "Cuero curtido al vegetal, cosido a mano para durar",
    category: "Marroquinería",
    image: ceibaImg,
    group: "Textiles y cuero",
    plan: "visibilidad",
    story:
      "Taller de marroquinería de San Roque. Cortan y cosen a mano bolsos, billeteras y tarjeteros en cuero curtido al vegetal, con punto silla y hilo encerado.",
    highlights: [
      { name: "Bandolera Ceiba", description: "Bolso cruzado con correa regulable." },
      { name: "Billetera clásica", description: "Billetera de seis tarjetas cosida a mano." },
      { name: "Tarjetero", description: "Tarjetero delgado con grabado opcional." },
    ],
    gallery: [
      { src: ceibaImg, alt: "Bolso, billetera y tarjetero de Ceiba Cuero" },
      { src: ceibaGallery, alt: "Costura a mano de una pieza de cuero" },
    ],
    products: ["Bolsos", "Billeteras", "Tarjeteros", "Cinturones"],
    materials: ["Cuero curtido al vegetal", "Hilo encerado"],
    processes: ["Corte a mano", "Costura punto silla"],
    style: ["Cálido y rústico"],
    values: ["Hecho a mano", "Piezas para toda la vida"],
    differentiators: ["Reparación gratuita de costuras", "Grabado de iniciales"],
    priceRange: { min: 15, max: 110, currency: "USD" },
    keywords: ["cuero", "bolso", "billetera", "tarjetero", "marroquinería"],
    affinity: {
      category: ["textiles"],
      values: ["hecho-a-mano"],
      aesthetics: ["calido-rustico"],
      motivations: ["regalo", "uso-diario", "apoyar-local"],
      products: ["bolsos"],
      priorities: ["durabilidad"],
    },
    evidence: {
      textiles: "elabora bolsos y accesorios de cuero",
      "hecho-a-mano": "corta y cose cada pieza a mano",
      "calido-rustico": "su cuero natural tiene el estilo cálido que te gusta",
      regalo: "graba iniciales para regalar",
      "uso-diario": "sus billeteras y bolsos son para el día a día",
      "apoyar-local": "es una microempresa del barrio San Roque, en Quito",
      bolsos: "ofrece bolsos y billeteras de cuero",
      durabilidad: "repara gratis sus costuras para que tus piezas duren",
    },
  },
];

const fairBrandAffinity = {
  "entre-si": {
    affinity: { category: ["ferias-categoria"], values: ["ferias-valores"], aesthetics: ["ferias-estilo"], motivations: ["ferias-motivacion"], products: ["ferias-productos"], priorities: ["ferias-prioridad"] },
    evidence: {
      "ferias-categoria": "conecta a visitantes con microempresas en ferias",
      "ferias-valores": "ofrece servicios de visibilidad para microempresas",
      "ferias-estilo": "reúne perfiles de emprendimientos",
      "ferias-motivacion": "facilita el contacto entre personas y marcas",
      "ferias-productos": "ayuda a ubicar emprendimientos en el recinto",
      "ferias-prioridad": "recomienda marcas por afinidad",
    },
  },
  "cuentico": {
    affinity: { category: ["lectura-categoria"], values: ["lectura-valores"], aesthetics: ["lectura-estilo"], motivations: ["lectura-motivacion"], products: ["lectura-productos"], priorities: ["lectura-prioridad"] },
    evidence: {
      "lectura-categoria": "ayuda a desarrollar hábitos lectores en niños",
      "lectura-valores": "propone actividades de comprensión que fomentan el vínculo familiar",
      "lectura-estilo": "ofrece cuentos interactivos",
      "lectura-motivacion": "aplica estrategias de lectura guiada para niños de 6 a 9 años",
      "lectura-productos": "incluye cuentos y actividades de comprensión lectora",
      "lectura-prioridad": "permite a los padres conocer los avances de sus hijos",
    },
  },
  "memora": {
    affinity: { category: ["recuerdos-categoria"], values: ["recuerdos-valores"], aesthetics: ["recuerdos-estilo"], motivations: ["recuerdos-motivacion"], products: ["recuerdos-productos"], priorities: ["recuerdos-prioridad"] },
    evidence: {
      "recuerdos-categoria": "permite conservar y compartir recuerdos",
      "recuerdos-valores": "ayuda a preservar momentos especiales y fortalecer los vínculos familiares",
      "recuerdos-estilo": "permite crear álbumes de forma colaborativa",
      "recuerdos-motivacion": "reúne fotografías, videos, audios y textos en álbumes",
      "recuerdos-productos": "transforma recuerdos en libros digitales o impresos",
      "recuerdos-prioridad": "ofrece plantillas y preguntas guiadas para reconstruir historias",
    },
  },
  "nergy": {
    affinity: { category: ["deporte-categoria"], values: ["deporte-valores"], aesthetics: ["deporte-estilo"], motivations: ["deporte-motivacion"], products: ["deporte-productos"], priorities: ["deporte-prioridad"] },
    evidence: {
      "deporte-categoria": "está enfocada en la nutrición deportiva",
      "deporte-valores": "ofrece geles prácticos para complementar el entrenamiento",
      "deporte-estilo": "diseña geles de fácil consumo",
      "deporte-motivacion": "busca acompañar el rendimiento y la recuperación del deportista",
      "deporte-productos": "ofrece una línea de geles nutricionales",
      "deporte-prioridad": "plantea nutrición para antes, durante y después de la actividad física",
    },
  },
  "cuida-dog": {
    affinity: { category: ["cachorro-categoria"], values: ["cachorro-valores"], aesthetics: ["cachorro-estilo"], motivations: ["cachorro-motivacion"], products: ["cachorro-productos"], priorities: ["cachorro-prioridad"] },
    evidence: {
      "cachorro-categoria": "acompaña a dueños primerizos desde que el cachorro llega a casa",
      "cachorro-valores": "promueve el cuidado en familia y el vínculo emocional",
      "cachorro-estilo": "incluye recordatorios y consejos adaptados a cada perro",
      "cachorro-motivacion": "ofrece guías para entender el comportamiento del cachorro",
      "cachorro-productos": "reúne guías y rutinas de cuidado en una app",
      "cachorro-prioridad": "ofrece información respaldada por veterinarios",
    },
  },
} satisfies Record<string, Pick<Brand, "affinity" | "evidence">>;

BRANDS.push(
  {
    slug: "entre-si", name: "Entre Sí", tagline: "Ferias, microempresas y conexiones",
    category: "Conexiones y servicios para emprendimientos", image: entreSiLogo,
    group: "Otros emprendimientos", plan: "visibilidad",
    story: "Entre Sí conecta microempresas con personas interesadas en descubrir sus productos y propuestas en ferias.",
    highlights: [], gallery: [], products: [], materials: [], processes: [], style: [], values: [],
    differentiators: ["Descubrimiento de marcas por afinidad", "Orientación para encontrar emprendimientos en ferias", "Servicios de visibilidad y conexión para microempresas"],
    keywords: ["ferias", "emprendimientos", "conexiones"], ...fairBrandAffinity["entre-si"],
  },
  ...["Cuentico", "MEMORA"].map((name): Brand => ({
    slug: name.toLowerCase(),
    name,
    tagline: "Emprendimiento participante en la feria PUCE",
    category: "Emprendimiento",
    image: name === "Cuentico" ? cuenticoLogo : memoraLogo,
    group: "Otros emprendimientos", plan: "visibilidad",
    story:
      name === "Cuentico"
        ? "Cuentico es una aplicación de lectura infantil que integra metodologías pedagógicas para fortalecer las habilidades lectoras en niños de 6 a 9 años. A través de cuentos interactivos, actividades de comprensión y estrategias de lectura guiada, promueve el aprendizaje progresivo, la participación activa y el desarrollo de hábitos lectores. Además, ofrece herramientas para que los padres acompañen el proceso educativo y conozcan los avances de sus hijos."
        : "Memora es una plataforma digital que permite conservar, organizar y compartir recuerdos de manera creativa y colaborativa. A través de fotografías, videos, audios y textos, los usuarios pueden crear álbumes personalizados con plantillas y preguntas guiadas que facilitan la reconstrucción de sus historias. Además, ofrece la posibilidad de transformar estos recuerdos en libros digitales o impresos, fortaleciendo los vínculos familiares y evitando que las historias y los momentos especiales se pierdan con el paso del tiempo.",
    highlights: [], gallery: [], products: [], materials: [], processes: [], style: [], values: [],
    differentiators:
      name === "Cuentico"
        ? [
            "Actividades de comprensión lectora que fomentan el vínculo familiar",
            "Trabajo conjunto con pedagogos",
            "Revisión del progreso lector por parte de los padres",
          ]
        : [
            "Recuerdos multimedia",
            "Del recuerdo digital al físico",
            "Creación guiada y colaborativa",
          ],
    keywords: [name.toLowerCase()],
    ...(name === "Cuentico" ? fairBrandAffinity.cuentico : fairBrandAffinity.memora),
  })),
  {
    slug: "nergy",
    name: "NERGY",
    tagline: "",
    category: "Emprendimiento",
    image: nergyLogo,
    group: "Otros emprendimientos",
    plan: "visibilidad",
    story: "NERGY es una marca de nutrición deportiva enfocada en acompañar a atletas y personas físicamente activas en cada etapa de su entrenamiento. A través de una línea de geles nutricionales, buscamos ofrecer alternativas prácticas y funcionales que complementen las necesidades del deportista antes, durante y después de la actividad física. Nacemos de la necesidad de acercar la nutrición deportiva a quienes viven el deporte día a día, ayudándolos a cuidar su rendimiento y recuperación.",
    highlights: [], gallery: [], products: [], materials: [], processes: [], style: [], values: [],
    differentiators: [
      "Nutrición en tres fases",
      "Diseñado desde las necesidades del deportista",
      "Practicidad y fácil consumo",
    ],
    keywords: ["nergy"], ...fairBrandAffinity.nergy,
  },
  {
    slug: "cuida-dog",
    name: "Cuida Dog",
    tagline: "",
    category: "Cuidado de mascotas",
    image: cuidaDogLogo,
    group: "Otros emprendimientos",
    plan: "visibilidad",
    story: "CuidaDog es una app ecuatoriana que acompaña a los dueños primerizos de perros desde que su cachorro llega a casa y mientras crece. Reúne en un solo lugar guías para entender su comportamiento, su rutina de cuidados con recordatorios y consejos adaptados, para que nadie se sienta solo cuidando a su perrijo. ¡Únete a nuestra manada!",
    highlights: [], gallery: [], products: [], materials: [], processes: [], style: [], values: [],
    differentiators: [
      "Información respaldada por veterinarios",
      "Cuidados y información al momento según tu perrijo",
      "Cuidado en familia y vínculo emocional",
    ],
    keywords: ["cuidadog", "perros", "cachorros"], ...fairBrandAffinity["cuida-dog"],
  },
  {
    slug: "pan-comido",
    name: "Pan Comido",
    tagline: "",
    category: "Desayunos escolares",
    image: panComidoLogo,
    group: "Alimentos",
    plan: "visibilidad",
    story: "PanComido es una app para madres con hijos en edad escolar que deja decidido el desayuno desde la noche anterior, con recetas de 10 minutos o menos hechas con lo que ya hay en casa.",
    highlights: [], gallery: [], products: [], materials: [], processes: [], style: [], values: [],
    differentiators: [
      "Solo desayuno escolar. Las otras apps de recetas son para cualquier comida. PanComido se enfoca únicamente en el desayuno, con recetas de 10 minutos o menos y video paso a paso.",
      "Hecha para Ecuador. Usa ingredientes que se consiguen en Quito, no recetas de otros países.",
      "El niño participa. Cada hijo tiene su propio perfil y elige su desayuno entre las opciones que propone la app.",
    ],
    keywords: ["pancomido", "desayuno escolar", "recetas"],
    affinity: {
      category: ["desayuno-categoria"],
      values: ["desayuno-valores"],
      aesthetics: ["desayuno-estilo"],
      motivations: ["desayuno-motivacion"],
      products: ["desayuno-productos"],
      priorities: ["desayuno-prioridad"],
    },
    evidence: {
      "desayuno-categoria": "se especializa en desayunos escolares",
      "desayuno-valores": "permite que cada hijo elija entre las opciones de desayuno de la app",
      "desayuno-estilo": "incluye videos paso a paso",
      "desayuno-motivacion": "permite decidir el desayuno desde la noche anterior",
      "desayuno-productos": "propone recetas de 10 minutos o menos",
      "desayuno-prioridad": "usa ingredientes que ya hay en casa o que se consiguen en Quito",
    },
  },
);

export const normalizeBrandSlug = (slug: string) => slug === "cuenticos" ? "cuentico" : slug;

export const getBrand = (slug: string) => BRANDS.find((b) => b.slug === normalizeBrandSlug(slug));
