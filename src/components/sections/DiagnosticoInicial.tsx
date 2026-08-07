"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  DIAGNOSTIC_BUTTON_LABEL,
  DIAGNOSTIC_CONFIRMATION,
  DIAGNOSTIC_TEXT,
  DIAGNOSTIC_TITLE,
} from "@/lib/content";
import { gsap } from "@/lib/gsap";

export default function DiagnosticoInicial() {
  const wrapperRef = useRef<HTMLElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const wrapperEl = wrapperRef.current;
    const blockEl = blockRef.current;
    if (!wrapperEl || !blockEl) return;

    const ctx = gsap.context(() => {
      gsap.set(blockEl, { opacity: 0, y: 16 });

      gsap.to(blockEl, {
        opacity: 1,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperEl,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
      });
    }, wrapperEl);

    return () => ctx.revert();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to a real email/form service — no destination is defined yet.
    setSubmitted(true);
  }

  return (
    <section ref={wrapperRef} className="bg-ns-white py-ns-9 text-ns-black">
      <div ref={blockRef} className="container-content">
        <div className="flex max-w-[var(--text-width)] flex-col gap-ns-4">
          <h2 className="text-2xl font-medium leading-snug sm:text-3xl">
            {DIAGNOSTIC_TITLE}
          </h2>

          <p className="text-body opacity-70">{DIAGNOSTIC_TEXT}</p>

          {submitted ? (
            <p className="text-body pt-ns-2">{DIAGNOSTIC_CONFIRMATION}</p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-ns-3 pt-ns-2 sm:flex-row sm:items-end"
            >
              <label className="flex flex-1 flex-col gap-ns-1">
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
                className="shrink-0 border-b border-ns-black/40 pb-1 text-left text-micro tracking-[0.02em] opacity-70 transition-opacity duration-200 hover:opacity-100"
              >
                {DIAGNOSTIC_BUTTON_LABEL}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
