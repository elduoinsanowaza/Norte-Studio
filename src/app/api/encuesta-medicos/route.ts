import { NextResponse } from "next/server";
import { createEncuestaMedicosSubmission } from "@/lib/encuestaMedicosSubmissions";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const { answers, contactName, contactInfo, comments } = (body ?? {}) as {
    answers?: unknown;
    contactName?: unknown;
    contactInfo?: unknown;
    comments?: unknown;
  };

  if (
    typeof answers !== "object" ||
    answers === null ||
    Array.isArray(answers) ||
    Object.keys(answers).length === 0
  ) {
    return NextResponse.json(
      { error: "No se recibieron respuestas." },
      { status: 400 }
    );
  }

  try {
    const submission = await createEncuestaMedicosSubmission({
      answers: answers as Record<string, unknown>,
      contactName: typeof contactName === "string" ? contactName : undefined,
      contactInfo: typeof contactInfo === "string" ? contactInfo : undefined,
      comments: typeof comments === "string" ? comments : undefined,
    });
    return NextResponse.json({ ok: true, folio: submission.folio });
  } catch (err) {
    console.error("Failed to save encuesta-medicos submission", err);
    return NextResponse.json(
      { error: "No se pudo guardar tu encuesta. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
