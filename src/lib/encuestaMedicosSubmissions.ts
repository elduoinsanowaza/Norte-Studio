import { redis } from "@/lib/redis";

const IDS_SET_KEY = "encuesta-medicos:ids";
const entryKey = (id: string) => `encuesta-medicos:${id}`;

export type EncuestaMedicosSubmission = {
  id: string;
  folio: string;
  answers: Record<string, unknown>;
  contactName: string;
  contactInfo: string;
  comments: string;
  createdAt: string;
};

function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function generateFolio() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export async function createEncuestaMedicosSubmission(input: {
  answers: Record<string, unknown>;
  contactName?: string;
  contactInfo?: string;
  comments?: string;
}): Promise<EncuestaMedicosSubmission> {
  const submission: EncuestaMedicosSubmission = {
    id: generateId(),
    folio: generateFolio(),
    answers: input.answers,
    contactName: input.contactName?.trim() ?? "",
    contactInfo: input.contactInfo?.trim() ?? "",
    comments: input.comments?.trim() ?? "",
    createdAt: new Date().toISOString(),
  };

  await redis.set(entryKey(submission.id), submission);
  await redis.sadd(IDS_SET_KEY, submission.id);

  return submission;
}
