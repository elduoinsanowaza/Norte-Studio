import { NextResponse } from "next/server";
import { createMazoSubmission } from "@/lib/mazoSubmissions";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const { name, email, symptoms } = (body ?? {}) as {
    name?: unknown;
    email?: unknown;
    symptoms?: unknown;
  };

  if (typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Falta el nombre." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Correo inválido." }, { status: 400 });
  }
  if (
    !Array.isArray(symptoms) ||
    symptoms.length === 0 ||
    !symptoms.every((s) => typeof s === "string")
  ) {
    return NextResponse.json(
      { error: "Selecciona al menos un síntoma." },
      { status: 400 }
    );
  }

  try {
    const submission = await createMazoSubmission({
      name: name.trim(),
      email: email.trim(),
      symptoms,
    });
    return NextResponse.json({ ok: true, id: submission.id });
  } catch (err) {
    console.error("Failed to save mazo submission", err);
    return NextResponse.json(
      { error: "No se pudo guardar tu mazo. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
