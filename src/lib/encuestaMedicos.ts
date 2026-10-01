// Content + data model for the "Médicos en Durango" survey microsite.
// Question text and options are transcribed verbatim from
// "Contenido de Diagnostico Inicial" (encuesta_medicos_durango.pdf) —
// only the surrounding intro/closing copy was written fresh for the web.

export type QuestionOption = {
  value: string;
  label: string;
  /** Reveals a free-text field when selected. */
  other?: boolean;
};

type BaseQuestion = {
  id: string;
  section: 1 | 2 | 3 | 4;
  prompt: string;
  /** Small helper line under the prompt (e.g. "Elige máximo 2"). */
  help?: string;
  /** Context box shown above the prompt, only on the first question of a run. */
  contextBox?: string;
  /** Whether this question is shown, based on prior answers. */
  condition?: (answers: Record<string, unknown>) => boolean;
};

export type SingleQuestion = BaseQuestion & {
  type: "single";
  options: QuestionOption[];
};

export type MultiQuestion = BaseQuestion & {
  type: "multi";
  options: QuestionOption[];
  max?: number;
};

export type ScaleQuestion = BaseQuestion & {
  type: "scale";
  minLabel: string;
  maxLabel: string;
};

export type NumberQuestion = BaseQuestion & {
  type: "number";
  unit?: string;
  skippable?: boolean;
};

export type RankingQuestion = BaseQuestion & {
  type: "ranking";
  items: QuestionOption[];
};

export type ExtrasQuestion = BaseQuestion & {
  type: "extras";
  contactPrompt: string;
  commentsPrompt: string;
};

export type Question =
  | SingleQuestion
  | MultiQuestion
  | ScaleQuestion
  | NumberQuestion
  | RankingQuestion
  | ExtrasQuestion;

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    section: 1,
    type: "single",
    prompt:
      "Pensando en tu experiencia atendiendo pacientes, si pudieras cambiar una cosa de cómo se da la consulta, ¿cuál elegirías?",
    options: [
      { value: "mas_tiempo", label: "Tener más tiempo por consulta" },
      { value: "menos_papeleo", label: "Menos papeleo y captura de expedientes" },
      { value: "videollamada", label: "Poder dar consultas por videollamada" },
      { value: "puntualidad", label: "Que los pacientes lleguen puntuales a su cita" },
    ],
  },
  {
    id: "q3",
    section: 1,
    type: "single",
    prompt: "¿Cuál es tu situación actual?",
    options: [
      { value: "residente", label: "Residente de último año" },
      { value: "especialista_nuevo", label: "Especialista con menos de 2 años de egresado" },
      {
        value: "publico_interes_privado",
        label: "Médico en sector público, con interés en atender también en privado",
      },
      {
        value: "privada_establecida",
        label: "Médico con práctica privada establecida (más de 2 años)",
      },
      { value: "otra", label: "Otra", other: true },
    ],
  },
  {
    id: "q4",
    section: 1,
    type: "single",
    prompt: "¿Cuál es tu especialidad?",
    options: [
      { value: "pediatria", label: "Pediatría" },
      { value: "gineco", label: "Ginecología y Obstetricia" },
      { value: "medicina_interna", label: "Medicina Interna" },
      { value: "medicina_familiar", label: "Medicina Familiar" },
      { value: "cirugia_general", label: "Cirugía General" },
      { value: "traumatologia", label: "Traumatología y Ortopedia" },
      { value: "otra", label: "Otra", other: true },
    ],
  },
  {
    id: "q6",
    section: 2,
    type: "single",
    prompt: "¿Cuánto pagas al mes por ese espacio?",
    options: [
      { value: "menos_3000", label: "Menos de $3,000" },
      { value: "3000_5000", label: "$3,000–$5,000" },
      { value: "5001_8000", label: "$5,001–$8,000" },
      { value: "8001_12000", label: "$8,001–$12,000" },
      { value: "mas_12000", label: "Más de $12,000" },
      { value: "no_pago", label: "No pago" },
    ],
  },
  {
    id: "q9",
    section: 2,
    type: "multi",
    max: 2,
    prompt: "¿Cuál es tu mayor obstáculo para iniciar o hacer crecer tu práctica privada?",
    help: "Elige máximo 2.",
    options: [
      { value: "costo", label: "Costo de rentar o equipar un consultorio" },
      { value: "contratos_largos", label: "Contratos largos sin saber si tendré pacientes" },
      { value: "conseguir_pacientes", label: "Conseguir pacientes" },
      { value: "tramites", label: "Trámites sanitarios y legales" },
      { value: "conocimiento_negocio", label: "Falta de conocimiento para administrar un negocio" },
      { value: "tiempo", label: "Tiempo disponible junto con mi trabajo actual" },
      { value: "otro", label: "Otro", other: true },
    ],
  },
  {
    id: "q10",
    section: 2,
    type: "multi",
    prompt: "¿En qué horario preferirías atender en privado?",
    help: "Puedes elegir varias.",
    options: [
      { value: "tardes", label: "Tardes entre semana" },
      { value: "mananas", label: "Mañanas entre semana" },
      { value: "sabados", label: "Sábados" },
      { value: "variable", label: "Horario variable" },
    ],
  },
  {
    id: "q12",
    section: 2,
    type: "single",
    prompt:
      "En tus primeros 3 meses de consulta privada, ¿cuántos pacientes por semana esperarías atender?",
    options: [
      { value: "0_5", label: "0 a 5" },
      { value: "6_15", label: "6 a 15" },
      { value: "16_30", label: "16 a 30" },
      { value: "mas_30", label: "Más de 30" },
      { value: "no_se", label: "No lo sé" },
    ],
  },
  {
    id: "q13",
    section: 3,
    type: "scale",
    prompt: "¿Qué tan interesado/a estarías en un espacio así?",
    minLabel: "Nada interesado/a",
    maxLabel: "Muy interesado/a",
    contextBox:
      "Se evalúa en Durango un espacio con varios consultorios listos para consultar: mobiliario médico, recepción, sala de espera, limpieza, manejo de RPBI e internet. Se usaría por horas mediante paquetes mensuales, sin contrato anual. Cada médico llevaría su propio instrumental.",
  },
  {
    id: "q14",
    section: 3,
    type: "single",
    prompt: "¿Cuántas horas al mes lo usarías?",
    options: [
      { value: "menos_10", label: "Menos de 10" },
      { value: "10_20", label: "10 a 20" },
      { value: "21_35", label: "21 a 35" },
      { value: "36_50", label: "36 a 50" },
      { value: "mas_50", label: "Más de 50" },
      { value: "no_usaria", label: "No lo usaría" },
    ],
  },
  {
    id: "q17",
    section: 3,
    type: "number",
    unit: "/ hora",
    skippable: true,
    prompt: "¿A partir de qué precio por hora dudarías de la calidad, por ser demasiado bajo?",
  },
  {
    id: "q20",
    section: 3,
    type: "number",
    unit: "/ hora",
    skippable: true,
    prompt: "¿A partir de qué precio por hora ya no lo pagarías, por caro?",
  },
  {
    id: "q21",
    section: 3,
    type: "single",
    prompt: "¿Pagarías más por hora si el consultorio estuviera en una zona de mayor prestigio?",
    options: [
      { value: "no_menor_precio", label: "No, prefiero el menor precio" },
      { value: "hasta_15", label: "Solo un poco más (hasta 15%)" },
      { value: "hasta_30", label: "Sí, hasta 30% más" },
      { value: "ubicacion_mas_importante", label: "Sí, la ubicación importa más que el precio" },
    ],
  },
  {
    id: "q22",
    section: 3,
    type: "multi",
    max: 2,
    prompt: "¿Qué zonas te convienen?",
    help: "Elige máximo 2.",
    options: [
      { value: "hospitales", label: "Cerca de hospitales" },
      { value: "la_salle", label: "Av. La Salle" },
      { value: "mazatlan_campestre", label: "Carretera Mazatlán / Campestre" },
      { value: "lomas_guadiana", label: "Lomas del Guadiana" },
      { value: "villa_dolores", label: "Blvd. Francisco Villa / Dolores del Río" },
      { value: "centro", label: "Centro" },
      { value: "otra", label: "Otra", other: true },
    ],
  },
  {
    id: "q23",
    section: 3,
    type: "ranking",
    prompt: "Ordena de más a menos importante en un consultorio.",
    help: "Toca las tarjetas en orden, de la más a la menos importante.",
    items: [
      { value: "precio", label: "Precio" },
      { value: "ubicacion", label: "Ubicación" },
      { value: "equipo", label: "Equipo y mobiliario listos" },
      { value: "estetica", label: "Estética y comodidad" },
      { value: "ayuda_pacientes", label: "Ayuda para conseguir pacientes" },
    ],
  },
  {
    id: "q24",
    section: 3,
    type: "multi",
    prompt: "Además del espacio, ¿qué apoyo te sería más útil?",
    help: "Puedes elegir varias.",
    options: [
      { value: "perfil_redes", label: "Perfil profesional en redes y Google" },
      { value: "fotos_video", label: "Fotos y video del consultorio" },
      { value: "agenda_online", label: "Agenda de citas en línea" },
      { value: "resenas", label: "Manejo de reseñas" },
      { value: "tramites_rpbi", label: "Ayuda con trámites sanitarios y contrato de RPBI" },
      { value: "expediente", label: "Expediente clínico electrónico" },
      { value: "ninguno", label: "Ninguno" },
    ],
  },
  {
    id: "q25",
    section: 3,
    type: "single",
    prompt: "¿Cuánto pagarías al mes por ese apoyo, además del espacio?",
    options: [
      { value: "nada", label: "Nada" },
      { value: "hasta_1000", label: "Hasta $1,000" },
      { value: "1001_2500", label: "$1,001–$2,500" },
      { value: "2501_5000", label: "$2,501–$5,000" },
      { value: "mas_5000", label: "Más de $5,000" },
    ],
  },
  // Not a numbered question: an optional closing space, kept out of the
  // counter and the progress bar. Its answers are still saved as
  // q26_name / q26_info / q27.
  {
    id: "extras",
    section: 4,
    type: "extras",
    prompt: "Espacio adicional",
    contactPrompt: "¿Quieres que te avisemos cuando abra, o platicar 15 minutos sobre esto?",
    commentsPrompt: "¿Algo más que quieras agregar?",
  },
];

export function getVisibleQuestions(answers: Record<string, unknown>): Question[] {
  return QUESTIONS.filter((q) => (q.condition ? q.condition(answers) : true));
}

export const WHATSAPP_NUMBER = "526181568166";
export const WHATSAPP_DISPLAY = "618 156 8166";

export function buildWhatsappLink(folio: string) {
  const text = `Hola, terminé la encuesta de médicos en Durango y quiero validar mi 5% de descuento. Mi folio es ${folio}, ahí les paso la captura 🩺`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
