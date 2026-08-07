"use client";

import { useLayoutEffect, useRef } from "react";
import CtaButton from "@/components/booking/CtaButton";
import { CASE_STUDIES } from "@/lib/content";
import { setupPinnedStaggerReveal } from "@/lib/scrollReveal";

export default function Cases() {
  const wrapperRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapperEl = wrapperRef.current;
    const pinEl = pinRef.current;
    const ctaEl = ctaRef.current;
    const cards = cardRefs.current.filter((el): el is HTMLDivElement => !!el);

    if (!wrapperEl || !pinEl || !ctaEl || cards.length === 0) return;

    const ctx = setupPinnedStaggerReveal({
      wrapperEl,
      pinEl,
      targets: [...cards, ctaEl],
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative bg-ns-black text-ns-white md:h-[220vh]"
    >
      <div
        ref={pinRef}
        className="container-content flex flex-col gap-ns-7 py-ns-8 md:h-screen md:justify-center md:py-0"
      >
        <h2 className="text-2xl font-medium tracking-[0.08em] uppercase opacity-60">
          Casos reales
        </h2>

        <div className="grid gap-ns-6 lg:grid-cols-3">
          {CASE_STUDIES.map((item, i) => (
            <div
              key={item.number}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
            >
              <article className="flex flex-col gap-ns-3 border-t border-ns-white/20 pt-ns-4">
                <span className="text-micro tracking-[0.08em] opacity-50">
                  {item.number}
                </span>
                <p className="text-body leading-relaxed">
                  <span aria-hidden className="blur-[6px] select-none">
                    Empresa confidencial
                  </span>{" "}
                  {item.belief}
                </p>
                <p className="text-body font-medium leading-relaxed">
                  {item.bottleneck}
                </p>
              </article>
            </div>
          ))}
        </div>

        <div ref={ctaRef}>
          <CtaButton inverted />
        </div>
      </div>
    </section>
  );
}
