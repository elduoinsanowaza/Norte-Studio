"use client";

import { useLayoutEffect, useRef } from "react";
import Rhizome from "@/components/Rhizome";
import { setupPinnedStaggerReveal } from "@/lib/scrollReveal";

export default function Tools() {
  const wrapperRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const rhizomeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapperEl = wrapperRef.current;
    const pinEl = pinRef.current;
    const headingEl = headingRef.current;
    const rhizomeEl = rhizomeRef.current;

    if (!wrapperEl || !pinEl || !headingEl || !rhizomeEl) return;

    const ctx = setupPinnedStaggerReveal({
      wrapperEl,
      pinEl,
      targets: [headingEl, rhizomeEl],
      holdAtEnd: 0.35,
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
        className="container-content flex flex-col gap-ns-6 py-ns-8 md:h-screen md:justify-center md:py-0"
      >
        <h2
          ref={headingRef}
          className="text-2xl font-medium tracking-[0.08em] uppercase opacity-60"
        >
          Herramientas
        </h2>
        <div ref={rhizomeRef}>
          <Rhizome />
        </div>
      </div>
    </section>
  );
}
