"use client";

import { useEffect, useState } from "react";

export default function MazoRegistrationPopup({
  onSubmit,
  onClose,
}: {
  onSubmit: (name: string, email: string) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (trimmedName.length === 0 || trimmedEmail.length === 0) return;
    onSubmit(trimmedName, trimmedEmail);
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-ns-2 sm:p-ns-4">
      <div
        className="absolute inset-0 bg-ns-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Regístrate para armar tu mazo"
        className="relative flex w-full max-w-md flex-col gap-ns-5 border border-ns-black bg-ns-white p-ns-5 text-ns-black"
      >
        <div className="flex items-start justify-between gap-ns-3">
          <div className="flex flex-col gap-ns-2">
            <h2 className="text-micro tracking-[0.08em] uppercase opacity-60">
              Antes de ver esta carta
            </h2>
            <p className="text-xl font-medium leading-snug">
              Escribe tu nombre y correo para armar tu mazo.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="shrink-0 border border-ns-black px-ns-2 py-ns-1 text-micro uppercase tracking-[0.08em] hover:bg-ns-black hover:text-ns-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-ns-4">
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
            Ver carta
          </button>
        </form>
      </div>
    </div>
  );
}
