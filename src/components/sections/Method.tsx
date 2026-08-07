"use client";

import { useLayoutEffect, useRef } from "react";
import Highlight from "@/components/Highlight";
import { METHOD_STEPS } from "@/lib/content";
import { gsap } from "@/lib/gsap";

const DESKTOP_QUERY = "(min-width: 768px)";
const MOBILE_QUERY = "(max-width: 767px)";

export default function Method() {
  const wrapperRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const wrapperEl = wrapperRef.current;
    const pinEl = pinRef.current;
    const steps = stepRefs.current.filter((el): el is HTMLDivElement => !!el);

    if (!wrapperEl || !pinEl || steps.length === 0) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add({ isDesktop: DESKTOP_QUERY, isMobile: MOBILE_QUERY }, (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };

        gsap.set(steps, { opacity: 0, y: 24 });

        if (!isDesktop) {
          const triggers = steps.map((stepEl) =>
            gsap.to(stepEl, {
              opacity: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: stepEl,
                start: "top 80%",
                end: "top 45%",
                scrub: true,
              },
            })
          );

          return () => {
            triggers.forEach((tw) => tw.scrollTrigger?.kill());
          };
        }

        const segment = 1 / steps.length;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperEl,
            start: "top top",
            end: "bottom bottom",
            pin: pinEl,
            scrub: true,
            anticipatePin: 1,
          },
          defaults: { ease: "none" },
        });

        steps.forEach((stepEl, i) => {
          const segStart = i * segment;
          const fadeInDuration = segment * 0.25;
          const holdDuration = segment * 0.5;
          const fadeOutDuration = segment * 0.25;

          tl.to(stepEl, { opacity: 1, y: 0, duration: fadeInDuration }, segStart);

          if (i < steps.length - 1) {
            tl.to(
              stepEl,
              { opacity: 0, y: -24, duration: fadeOutDuration },
              segStart + fadeInDuration + holdDuration
            );
          }
        });

        tl.set(pinEl, {}, 1);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
    }, wrapperEl);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative bg-ns-black text-ns-white md:h-[500vh]"
    >
      <div
        ref={pinRef}
        className="relative flex flex-col gap-ns-7 px-ns-4 py-ns-8 md:h-screen md:justify-center md:overflow-hidden md:px-0 md:py-0"
      >
        <h2 className="container-content text-2xl font-medium tracking-[0.08em] uppercase opacity-60 md:absolute md:top-ns-6 md:left-1/2 md:-translate-x-1/2">
          Método
        </h2>

        <div className="container-content relative w-full flex flex-col gap-ns-7 md:h-full md:justify-center md:gap-0">
          {METHOD_STEPS.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="flex flex-col gap-ns-2 border-t border-ns-white/20 pt-ns-5 md:absolute md:inset-0 md:flex md:items-center md:justify-center md:border-none md:pt-0"
            >
              <div className="flex flex-col items-start gap-ns-2 md:max-w-3xl md:flex-row md:items-baseline md:gap-ns-6">
                <span className="text-4xl font-medium tabular-nums opacity-40 md:text-stage-number">
                  {step.number}
                </span>
                <div className="flex flex-col gap-ns-1 md:max-w-[var(--text-width)]">
                  <h3 className="text-2xl font-medium md:text-3xl lg:text-stage-word">
                    {step.title}
                  </h3>
                  <p className="text-body opacity-75">
                    <Highlight
                      text={step.description}
                      words={step.highlightWords}
                    />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
