"use client";

import { useLayoutEffect, useRef } from "react";
import CtaButton from "@/components/booking/CtaButton";
import Highlight from "@/components/Highlight";
import { CLOSING_HIGHLIGHT_WORDS, CLOSING_LINES } from "@/lib/content";
import { setupPinnedStaggerReveal } from "@/lib/scrollReveal";

export default function Closing() {
  const wrapperRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapperEl = wrapperRef.current;
    const pinEl = pinRef.current;
    const ctaEl = ctaRef.current;
    const lines = lineRefs.current.filter((el): el is HTMLParagraphElement => !!el);

    if (!wrapperEl || !pinEl || !ctaEl || lines.length === 0) return;

    const ctx = setupPinnedStaggerReveal({
      wrapperEl,
      pinEl,
      targets: [...lines, ctaEl],
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative bg-ns-black text-ns-white md:h-[200vh]"
    >
      <div
        ref={pinRef}
        className="container-content flex flex-col items-start gap-ns-6 py-ns-9 md:h-screen md:justify-center md:py-0"
      >
        <div className="flex max-w-[var(--text-width)] flex-col gap-ns-5 font-serif text-3xl leading-[1.3] font-medium sm:text-4xl lg:text-emotional">
          {CLOSING_LINES.map((line, i) => (
            <p
              key={line}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
            >
              <Highlight text={line} words={CLOSING_HIGHLIGHT_WORDS} />
            </p>
          ))}
        </div>

        <div ref={ctaRef}>
          <CtaButton inverted />
        </div>
      </div>
    </section>
  );
}
