"use client";

import { useState } from "react";

export default function MazoRegistrationGate({
  onSubmit,
}: {
  onSubmit: (name: string, email: string) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (trimmedName.length === 0 || trimmedEmail.length === 0) return;
    onSubmit(trimmedName, trimmedEmail);
  }

  return (
    <div className="flex max-w-[var(--text-width)] flex-col gap-ns-5">
      <div className="flex flex-col gap-ns-3">
        <h2 className="text-micro tracking-[0.08em] uppercase opacity-60">
          Mazo de síntomas
        </h2>
        <p className="text-2xl font-medium sm:text-3xl">
          ¿Qué está pasando en tu negocio?
        </p>
        <p className="text-body opacity-70">
          Escribe tu nombre y correo para armar tu mazo. Selecciona los
          problemas que reconoces — no buscamos darte una respuesta antes de
          entender el problema, queremos saber qué estás viviendo.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex max-w-sm flex-col gap-ns-4">
        <label className="flex flex-col gap-1">
          <span className="text-micro tracking-[0.06em] uppercase opacity-60">
            Nombre
          </span>
          <input
            type="text"
            autoFocus
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-b border-ns-black/30 bg-transparent py-ns-1 text-body outline-none focus:border-ns-black"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-micro tracking-[0.06em] uppercase opacity-60">
            Correo electrónico
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@empresa.com"
            className="border-b border-ns-black/30 bg-transparent py-ns-1 text-body outline-none placeholder:opacity-40 focus:border-ns-black"
          />
        </label>

        <button
          type="submit"
          className="self-start border border-ns-black px-ns-4 py-ns-2 text-micro tracking-[0.08em] uppercase transition-colors duration-200 hover:bg-ns-black hover:text-ns-white"
        >
          Empezar
        </button>
      </form>
    </div>
  );
}
