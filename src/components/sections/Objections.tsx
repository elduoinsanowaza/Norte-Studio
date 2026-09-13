"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Accordion from "@/components/Accordion";
import Highlight from "@/components/Highlight";
import { ALL_OBJECTIONS, OBJECTIONS } from "@/lib/content";
import { setupPinnedStaggerReveal } from "@/lib/scrollReveal";
import { GLASS_BUTTON_LIGHT, GLASS_BUTTON_LIGHT_SM, GLASS_CARD_LIGHT } from "@/lib/glassButton";
import GlassBlobs from "@/components/GlassBlobs";

export default function Objections() {
  const [panelOpen, setPanelOpen] = useState(false);

  const wrapperRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const buttonWrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapperEl = wrapperRef.current;
    const pinEl = pinRef.current;
    const buttonWrapEl = buttonWrapRef.current;
    const cards = cardRefs.current.filter((el): el is HTMLDivElement => !!el);

    if (!wrapperEl || !pinEl || !buttonWrapEl || cards.length === 0) return;

    const ctx = setupPinnedStaggerReveal({
      wrapperEl,
      pinEl,
      targets: [...cards, buttonWrapEl],
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!panelOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanelOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [panelOpen]);

  return (
    <section
      ref={wrapperRef}
      className="relative overflow-hidden bg-ns-white text-ns-black md:h-[220vh]"
    >
      <div
        ref={pinRef}
        className="container-content relative flex flex-col gap-ns-7 py-ns-8 md:h-screen md:justify-center md:py-0"
      >
        <GlassBlobs />
        <h2 className="text-2xl font-medium tracking-[0.08em] uppercase opacity-60">
          Dudas frecuentes
        </h2>

        <div className="grid gap-ns-6 lg:grid-cols-3">
          {OBJECTIONS.map((item, i) => (
            <div
              key={item.question}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
            >
              <article className={`flex flex-col gap-ns-2 radius-2xl p-ns-4 ${GLASS_CARD_LIGHT}`}>
                <h3 className="text-body font-medium">{item.question}</h3>
                <p className="text-micro leading-relaxed opacity-70">
                  <Highlight text={item.answer} words={item.highlightWords} />
                </p>
              </article>
            </div>
          ))}
        </div>

        <div ref={buttonWrapRef}>
          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            className={`inline-block radius-full px-ns-4 py-ns-2 text-micro tracking-[0.08em] uppercase ${GLASS_BUTTON_LIGHT}`}
          >
            Ver todas las dudas
          </button>
        </div>
      </div>

      {panelOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Todas las dudas"
          className="fixed inset-0 z-50 overflow-y-auto bg-ns-white text-ns-black"
        >
          <GlassBlobs />
          <div className="container-content flex min-h-full flex-col py-ns-6">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                aria-label="Cerrar"
                className={`radius-full px-ns-2 py-ns-1 text-micro uppercase tracking-[0.08em] ${GLASS_BUTTON_LIGHT_SM}`}
              >
                Cerrar ✕
              </button>
            </div>

            <div className="mx-auto w-full max-w-3xl py-ns-6">
              <h3 className="pb-ns-4 text-2xl font-medium">Todas las dudas</h3>
              <Accordion items={ALL_OBJECTIONS} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
