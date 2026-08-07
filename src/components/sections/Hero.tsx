"use client";

import { useLayoutEffect, useRef } from "react";
import Logo from "@/components/Logo";
import Highlight from "@/components/Highlight";
import {
  HERO_BACKGROUND_WORDS,
  HERO_HIGHLIGHT_WORDS,
  HERO_STATEMENT,
} from "@/lib/content";
import { gsap } from "@/lib/gsap";

const WORD_POSITIONS = [
  "left-[4%] top-[12%] -rotate-6",
  "right-[6%] top-[8%] rotate-3",
  "left-[8%] bottom-[16%] rotate-2",
  "right-[4%] bottom-[22%] -rotate-3",
  "left-[38%] top-[4%] rotate-1",
  "right-[30%] bottom-[6%] -rotate-2",
];

export default function Hero() {
  const wrapperRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const wrapperEl = wrapperRef.current;
    const revealEl = revealRef.current;
    if (!wrapperEl || !revealEl) return;

    const ctx = gsap.context(() => {
      gsap.set(revealEl, { clipPath: "inset(0 100% 0 0)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperEl,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        defaults: { ease: "none" },
      });

      tl.to(revealEl, { clipPath: "inset(0 0% 0 0)", duration: 0.15 }).set(
        revealEl,
        {},
        1
      );
    }, wrapperEl);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-ns-white text-ns-black"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {HERO_BACKGROUND_WORDS.map((word, i) => (
          <span
            key={word}
            className={`absolute select-none whitespace-nowrap font-sans text-4xl font-medium text-ns-black opacity-[0.05] sm:text-5xl lg:text-6xl ${WORD_POSITIONS[i % WORD_POSITIONS.length]}`}
          >
            {word}
          </span>
        ))}
      </div>

      <div className="container-content relative flex flex-col gap-ns-8 py-ns-8">
        <Logo priority />
        <p className="max-w-5xl text-4xl leading-[1.05] font-medium tracking-tight sm:text-6xl lg:text-hero">
          <span ref={revealRef} className="block">
            <Highlight text={HERO_STATEMENT} words={HERO_HIGHLIGHT_WORDS} />
          </span>
        </p>
      </div>
    </section>
  );
}
