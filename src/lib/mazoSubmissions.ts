import { redis } from "@/lib/redis";

export const SUBMISSION_LIFETIME_DAYS = 10;
const IDS_SET_KEY = "mazos:ids";
const entryKey = (id: string) => `mazo:${id}`;

export type MazoSubmission = {
  id: string;
  name: string;
  email: string;
  /** Each entry formatted as "síntoma → servicio". */
  symptoms: string[];
  createdAt: string;
  expiresAt: string;
};

function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function createMazoSubmission(input: {
  name: string;
  email: string;
  symptoms: string[];
}): Promise<MazoSubmission> {
  const createdAt = new Date();
  const expiresAt = new Date(
    createdAt.getTime() + SUBMISSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000
  );

  const submission: MazoSubmission = {
    id: generateId(),
    name: input.name,
    email: input.email,
    symptoms: input.symptoms,
    createdAt: createdAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };

  await redis.set(entryKey(submission.id), submission);
  await redis.sadd(IDS_SET_KEY, submission.id);

  return submission;
}
