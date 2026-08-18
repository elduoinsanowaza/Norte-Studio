export type Symptom = {
  id: number;
  symptom: string | null;
  /** Internal reference for future art direction — not shown to the user yet. */
  feeling: string | null;
  /** Internal reference for future art direction — not shown to the user yet. */
  imageConcept: string | null;
  service: string | null;
  secondaryCauses: string[];
  image: string;
};

/** Shared card back — identical for every symptom card. */
export const CARD_BACK_IMAGE = "/images/cartas/reverso.png";

export const SYMPTOMS: Symptom[] = [
  {
    id: 1,
    symptom: "Mi negocio ya cambió, pero mi marca sigue contando una versión vieja de él.",
    feeling: "Contradicción · desbalance · apariencia vs. realidad",
    imageConcept: "Un palacio monumental con una puerta diminuta",
    service: "Branding e identidad de marca",
    secondaryCauses: ["Dirección Visual y Comunicación", "Diseño y desarrollo de páginas web"],
    image: "/images/cartas/branding.png",
  },
  {
    id: 2,
    symptom: "No tengo un sistema, solo voy apagando fuegos.",
    feeling: "Caos · urgencia · desgaste",
    imageConcept:
      "Un enorme cubo de hielo derritiéndose sobre una mesa perfectamente minimalista",
    service: "Consultoría estratégica de crecimiento",
    secondaryCauses: [
      "Automatización de procesos y CRM",
      "Acompañamiento estratégico continuo",
    ],
    image: "/images/cartas/consultoria.png",
  },
  {
    id: 3,
    symptom: "Mis campañas de Meta Ads no convierten.",
    feeling: "Esfuerzo sin resultado · espera · frustración",
    imageConcept: "Una pista de aterrizaje perfectamente iluminada, pero sin ningún avión",
    service: "Gestión de campañas de Meta Ads",
    secondaryCauses: ["Diseño y desarrollo de páginas web", "Branding e identidad de marca"],
    // No final art yet for this one — falls back to the card back until Diego provides it.
    image: CARD_BACK_IMAGE,
  },
  {
    id: 4,
    symptom: "Mi página web no genera clientes, solo existe.",
    feeling: "Presencia sin función · vacío · potencial desaprovechado",
    imageConcept: "Una puerta monumental perfectamente diseñada en medio de un campo",
    service: "Diseño y desarrollo de páginas web",
    secondaryCauses: [
      "Branding e identidad de marca",
      "Analítica y medición de resultados (KPIs)",
    ],
    image: "/images/cartas/paginas-web.png",
  },
  {
    id: 5,
    symptom: "Pierdo tiempo en procesos que deberían ser automáticos.",
    feeling: "Repetición · desgaste · desperdicio",
    imageConcept: "Una persona colocando manualmente la misma pieza en una torre interminable",
    service: "Automatización de procesos y CRM",
    secondaryCauses: [
      "Implementación de Inteligencia Artificial",
      "Consultoría estratégica de crecimiento",
    ],
    image: "/images/cartas/automatizacion.png",
  },
  {
    id: 6,
    symptom: "No sé si lo que estoy haciendo está funcionando de verdad.",
    feeling: "Incertidumbre · falta de control · confusión",
    imageConcept: "Un enorme tablero lleno de instrumentos con todas las pantallas en blanco",
    service: "Analítica y medición de resultados (KPIs)",
    secondaryCauses: [
      "Acompañamiento estratégico continuo",
      "Consultoría estratégica de crecimiento",
    ],
    image: "/images/cartas/kpis.png",
  },
  {
    id: 7,
    symptom: "Publico pero nadie interactúa ni recuerda mi marca.",
    feeling: "Invisibilidad · indiferencia · aislamiento",
    imageConcept: "Una gigantesca valla publicitaria perfectamente iluminada en medio de un desierto",
    service: "Manejo de redes sociales y contenido",
    secondaryCauses: ["Branding e identidad de marca", "Dirección Visual y Comunicación"],
    image: "/images/cartas/redes.png",
  },
  {
    id: 8,
    symptom: "Mis materiales visuales no se ven profesionales ni consistentes.",
    feeling: "Fragmentación · desorden · falta de identidad",
    imageConcept: "Una galería donde cada cuadro pertenece a una época completamente diferente",
    service: "Dirección Visual y Comunicación",
    secondaryCauses: ["Branding e identidad de marca", "Manejo de redes sociales y contenido"],
    image: "/images/cartas/diseno-grafico.png",
  },
  {
    id: 9,
    symptom:
      "Sé que la Inteligencia Artificial podría ayudarme pero no sé por dónde empezar.",
    feeling: "Potencial sin dirección · incertidumbre · exceso de posibilidades",
    imageConcept: "Una enorme estructura futurista mientras alguien sostiene un mapa al revés",
    service: "Implementación de Inteligencia Artificial",
    secondaryCauses: ["Automatización de procesos y CRM", "Consultoría estratégica de crecimiento"],
    image: "/images/cartas/ia.png",
  },
  {
    id: 10,
    symptom: "Creo que no conozco a mi mercado y no sé por qué me eligen mis clientes.",
    feeling: null,
    imageConcept: null,
    service: "Posicionamiento y diferenciación estratégica",
    secondaryCauses: [],
    image: "/images/cartas/posicionamiento.png",
  },
];
