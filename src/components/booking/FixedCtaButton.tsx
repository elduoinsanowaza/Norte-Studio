"use client";

import { useLayoutEffect, useRef } from "react";
import { useBookingPanel } from "./BookingPanelContext";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function FixedCtaButton() {
  const { open } = useBookingPanel();
  const btnRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const btnEl = btnRef.current;
    if (!btnEl) return;

    const ctx = gsap.context(() => {
      const pulseTl = gsap
        .timeline({ paused: true })
        .to(btnEl, { scale: 1.08, duration: 0.4, ease: "power2.out" })
        .to(
          btnEl,
          { opacity: 0.55, duration: 0.6, ease: "sine.inOut", repeat: -1, yoyo: true },
          "<"
        );

      ScrollTrigger.create({
        trigger: document.body,
        start: () => ScrollTrigger.maxScroll(window) - 150,
        end: () => ScrollTrigger.maxScroll(window),
        onEnter: () => pulseTl.play(),
        onLeaveBack: () => {
          pulseTl.pause(0);
          gsap.set(btnEl, { scale: 1, opacity: 1 });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={() => open()}
      style={{ mixBlendMode: "difference" }}
      className="fixed top-ns-2 right-ns-2 z-40 border border-ns-white bg-ns-white px-ns-2 py-ns-1 text-micro tracking-[0.08em] uppercase text-ns-black sm:px-ns-3"
    >
      <span className="sm:hidden">Agenda</span>
      <span className="hidden sm:inline">Agenda tu cita</span>
    </button>
  );
}
