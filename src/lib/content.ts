export const CTA_LABEL = "Aplica para una sesión de diagnóstico — sin costo.";

export const HERO_STATEMENT =
  "Las empresas no dejan de crecer por falta de esfuerzo. Dejan de crecer porque resuelven los problemas equivocados.";

export const HERO_HIGHLIGHT_WORDS = ["crecer", "problemas"];

export const HERO_BACKGROUND_WORDS = [
  "Publicidad",
  "Contenido",
  "Más presupuesto",
  "Rediseño",
  "Más reuniones",
  "Más publicaciones",
];

export const BOTTLE_QUESTION = "¿Sabes dónde está el cuello de botella de tu empresa?";
export const BOTTLE_QUESTION_HIGHLIGHT_WORDS = ["botella"];

export const SYSTEM_WORDS = [
  "Posicionamiento",
  "Conversión",
  "Ventas",
  "Diferenciación",
  "Seguimiento",
  "Precio",
  "Oferta",
  "Publicidad",
  "Contenido",
  "Procesos",
  "Retención",
  "Automatización",
];

export type MethodStep = {
  number: string;
  title: string;
  description: string;
  /** Word(s) inside `description` to render with `.highlight`. */
  highlightWords: string[];
};

export const METHOD_STEPS: MethodStep[] = [
  {
    number: "01",
    title: "Comprender",
    description: "Entendemos tu negocio completo antes de proponer nada.",
    highlightWords: ["nada"],
  },
  {
    number: "02",
    title: "Identificar",
    description: "Encontramos la restricción real, no el síntoma más visible.",
    highlightWords: ["visible"],
  },
  {
    number: "03",
    title: "Implementar",
    description: "Ejecutamos directamente, sin intermediarios.",
    highlightWords: ["intermediarios"],
  },
  {
    number: "04",
    title: "Medir",
    description:
      "Se evalúa cada intervención con indicadores definidos desde el inicio.",
    highlightWords: ["inicio"],
  },
  {
    number: "05",
    title: "Optimizar",
    description: "Se replica lo que funciona, se elimina lo que no.",
    highlightWords: ["no"],
  },
];

export type CaseStudy = {
  number: string;
  belief: string;
  bottleneck: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    number: "01",
    belief: "creía que el problema estaba en la organización de sus eventos.",
    bottleneck:
      "Después del diagnóstico descubrimos que la principal restricción era el posicionamiento de la marca.",
  },
  {
    number: "02",
    belief:
      "buscaba aumentar sus ventas mediante un mejor catálogo de productos.",
    bottleneck:
      "El análisis mostró que el verdadero cuello de botella estaba en la forma en que el mercado percibía su oferta.",
  },
  {
    number: "03",
    belief: "quería optimizar el registro manual de su operación diaria.",
    bottleneck:
      "Antes de automatizar procesos fue necesario rediseñar el sistema completo de gestión de la información.",
  },
];

export type Objection = {
  question: string;
  answer: string;
  /** Words/phrases inside `answer` to render with `.highlight`. */
  highlightWords: string[];
};

export const OBJECTIONS: Objection[] = [
  {
    question: "¿Cómo se paga esto?",
    answer:
      "La cotización se hace de forma personalizada para cada empresa, según su situación, alcance e intervenciones necesarias. Puede ser una mensualidad o una comisión sobre resultados — depende del tipo de negocio.",
    highlightWords: ["personalizada", "comisión", "resultados"],
  },
  {
    question: "¿Por qué no contratar a alguien de cada área por separado?",
    answer:
      "Un especialista en dirección de marketing, uno en Meta Ads, uno en contenido y uno en desarrollo web cuestan entre $9,000 y $15,000 mensuales cada uno — más de $45,000 al mes en total. Los honorarios de Norte Studio equivalen a menos de una cuarta parte de esa cifra, integrando todo en una sola dirección externa.",
    highlightWords: ["$45,000", "cuarta parte", "externa"],
  },
  {
    question: "¿Y si el problema no es marketing?",
    answer:
      "Identificamos el verdadero problema. No somos una agencia. Somos un socio externo de crecimiento.",
    highlightWords: ["verdadero", "agencia", "crecimiento"],
  },
];

/**
 * Full question set for the "Todas las dudas" panel: the 3 visible
 * objections above, plus 8 more that only appear there. `\n\n` in an
 * `answer` renders as a paragraph break (see Accordion's `whitespace-pre-line`).
 */
export const ALL_OBJECTIONS: Objection[] = [
  ...OBJECTIONS,
  {
    question: "¿Qué diferencia hay entre Norte Studio y una agencia de marketing?",
    answer:
      "Una agencia normalmente optimiza un área específica del negocio: publicidad, contenido, diseño o redes sociales.\n\nNorte Studio comienza antes.\n\nAnalizamos el sistema completo para identificar qué está limitando realmente el crecimiento de la empresa y, a partir de ese diagnóstico, definimos la intervención con mayor impacto. En algunos casos será marketing. En otros, no.",
    highlightWords: [],
  },
  {
    question: "¿Cómo descubren el verdadero cuello de botella de una empresa?",
    answer:
      "No partimos de suposiciones.\n\nAnalizamos la empresa como un sistema: su propuesta de valor, posicionamiento, proceso comercial, comunicación, operación y métricas. A partir de ese análisis formulamos hipótesis, las contrastamos con evidencia y priorizamos la intervención que puede generar el mayor impacto.",
    highlightWords: [],
  },
  {
    question: "¿Cómo miden si una intervención realmente funcionó?",
    answer:
      "Toda intervención comienza con un objetivo medible.\n\nDependiendo del proyecto, evaluamos indicadores como conversión, adquisición de clientes, eficiencia operativa, tiempo de proceso o desempeño comercial. No trabajamos con percepciones; trabajamos con evidencia.",
    highlightWords: [],
  },
  {
    question: "¿Pueden trabajar con el equipo que ya tengo?",
    answer:
      "Sí.\n\nNuestro objetivo no es sustituir equipos existentes, sino integrarnos a ellos cuando sea necesario. Podemos colaborar con personal interno, agencias o proveedores externos, aportando dirección estratégica y coordinando las intervenciones para que todo el sistema avance en la misma dirección.",
    highlightWords: [],
  },
  {
    question: "¿Por qué no ofrecen un paquete igual para todas las empresas?",
    answer:
      "Porque ninguna empresa tiene la misma restricción.\n\nDos negocios pueden enfrentar síntomas similares y necesitar soluciones completamente distintas. Estandarizar el servicio significaría asumir que todos los problemas son iguales, y precisamente esa es la forma de trabajo que buscamos evitar.",
    highlightWords: [],
  },
  {
    question: "¿Qué esperan de mí durante el proceso?",
    answer:
      "Acceso a la información necesaria para comprender el negocio y disposición para tomar decisiones con base en evidencia.\n\nNuestro trabajo es aportar dirección, análisis y ejecución cuando corresponda. El conocimiento del negocio sigue estando del lado del empresario; la estrategia se construye en conjunto.",
    highlightWords: [],
  },
  {
    question: "¿Qué pasa si aparecen nuevos problemas durante el proyecto?",
    answer:
      "Es normal.\n\nCuando una restricción importante desaparece, otras pueden hacerse visibles. Norte Studio trabaja mediante un proceso continuo de análisis, medición y priorización, por lo que las intervenciones evolucionan conforme evoluciona la empresa.",
    highlightWords: [],
  },
  {
    question:
      "¿Cómo sé que mi empresa realmente necesita este tipo de dirección estratégica?",
    answer:
      "Si tu empresa está creciendo más lento de lo que debería, las ventas no reflejan el esfuerzo invertido o sientes que constantemente cambias de herramientas sin resolver el problema de fondo, probablemente el reto no sea ejecutar más, sino identificar correctamente dónde intervenir.",
    highlightWords: [],
  },
];

export const CLOSING_LINES = [
  "Las empresas rara vez necesitan comunicar mejor lo que venden. Necesitan comprender mejor el valor que realmente generan.",
  "No te ayudamos a verte mejor. Te ayudamos a funcionar mejor.",
];

export const CLOSING_HIGHLIGHT_WORDS = ["comprender", "valor", "funcionar"];

export const DIAGNOSTIC_TITLE = "¿Aún no estás listo para agendar una reunión?";

export const DIAGNOSTIC_TEXT =
  "No todas las decisiones deben tomarse hoy. Si prefieres comprender mejor cómo analizamos una empresa antes de hablar con nosotros, puedes recibir nuestro diagnóstico inicial y explorarlo a tu propio ritmo.";

export const DIAGNOSTIC_BUTTON_LABEL = "Recibir diagnóstico inicial";

export const DIAGNOSTIC_CONFIRMATION =
  "Listo. En unos momentos recibirás el diagnóstico inicial en tu correo.";

export const ROTATING_PHRASES = [
  "No preguntamos qué quieres hacer. Preguntamos qué necesita tu empresa.",
  "No vendemos servicios. Vendemos criterio.",
  "No medimos campañas. Medimos crecimiento.",
  "No optimizamos canales. Optimizamos sistemas.",
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const BOOKING_FAQS: FaqItem[] = [
  {
    question: "¿Es una llamada de ventas?",
    answer:
      "No, es una sesión real de diagnóstico. Si no somos el fit correcto, te lo decimos con toda honestidad.",
  },
  {
    question: "¿Cuánto dura?",
    answer: "Entre 20 y 30 minutos.",
  },
  {
    question: "¿Qué pasa si decido no continuar después?",
    answer:
      "Sin problema. Sales con más claridad sobre tu negocio, decidas lo que decidas.",
  },
  {
    question: "¿Trabajan con negocios de cualquier tamaño?",
    answer:
      "Trabajamos con pocas empresas, a fondo. Si no encajamos, te lo decimos ahí mismo.",
  },
  {
    question: "¿Necesito preparar algo antes?",
    answer: "No, solo ven con la situación real de tu negocio en mente.",
  },
  {
    question: "¿Quién me va a atender?",
    answer: "Yo directamente — sin intermediarios ni ejecutivos de cuenta.",
  },
  {
    question: "¿Es en línea o en persona?",
    answer: "En línea, por videollamada.",
  },
  {
    question: "¿Cómo sé si en verdad necesito esto?",
    answer:
      "Si sientes que algo no está funcionando como debería, ya es motivo suficiente para platicarlo.",
  },
  {
    question: "¿Puedo reagendar si surge algo?",
    answer: "Claro — solo escríbeme y buscamos otro horario.",
  },
];

export const BOOKING_CTA_LABEL = "Agendar sesión de diagnóstico";
export const BOOKING_CTA_URL = "https://calendly.com/diisranez/asesoria-norte-studio";
