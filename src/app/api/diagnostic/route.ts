import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email: unknown;

  try {
    const body = await request.json();
    email = body?.email;
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Correo inválido." }, { status: 400 });
  }

  const apiKey = process.env.SYSTEME_API_KEY;
  if (!apiKey) {
    console.error("SYSTEME_API_KEY is not set");
    return NextResponse.json(
      { error: "El servicio no está configurado todavía." },
      { status: 500 }
    );
  }

  const response = await fetch("https://api.systeme.io/api/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
    body: JSON.stringify({ email }),
  });

  // systeme.io returns 201 for a new contact and 422 when the email
  // already exists — either way the person is on the list, so treat both
  // as success from the visitor's point of view.
  if (response.ok || response.status === 422) {
    return NextResponse.json({ ok: true });
  }

  const detail = await response.text();
  console.error("systeme.io contact creation failed", response.status, detail);
  return NextResponse.json(
    { error: "No se pudo registrar el correo. Intenta de nuevo en un momento." },
    { status: 502 }
  );
}
