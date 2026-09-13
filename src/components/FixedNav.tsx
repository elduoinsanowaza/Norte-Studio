"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { useBookingPanel } from "./booking/BookingPanelContext";
import { useSymptomsPanel } from "./symptoms/SymptomsPanelContext";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const ITEM_CLASS =
  "px-ns-2 py-ns-1 text-micro tracking-[0.08em] uppercase transition-opacity duration-200 hover:opacity-70 sm:px-ns-3";
const DIVIDER_CLASS = "border-l border-ns-black/20";

/**
 * One unified fixed bar for every persistent nav action, instead of several
 * separate floating pills — adding items (Norte News) to the old 3-pill
 * layout made it look crowded/uneven. A single bar with dividers scales to
 * any number of items without that.
 *
 * Solid black/white (not mix-blend-mode: difference) — the blend-mode trick
 * rendered inconsistently across browsers (some items shifted to a stray
 * blue instead of inverting cleanly), because promoting just the animated
 * "Agenda" button to its own GPU compositing layer made it blend separately
 * from its siblings. Plain opacity is simpler and always correct: an opaque
 * dark bar reads fine over any section without needing to invert.
 */
export default function FixedNav() {
  const { open: openBooking } = useBookingPanel();
  const { open: openSymptoms } = useSymptomsPanel();
  const agendaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const agendaEl = agendaRef.current;
    if (!agendaEl) return;

    const ctx = gsap.context(() => {
      const pulseTl = gsap
        .timeline({ paused: true })
        .to(agendaEl, { scale: 1.08, duration: 0.4, ease: "power2.out" })
        .to(
          agendaEl,
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
          gsap.set(agendaEl, { scale: 1, opacity: 1 });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <nav
      aria-label="Navegación fija"
      className="fixed top-ns-2 right-ns-2 z-40 flex items-stretch border border-ns-black bg-ns-black text-ns-white"
    >
      <a
        href="https://norte-studio-clientes.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className={ITEM_CLASS}
      >
        <span className="sm:hidden">Panel</span>
        <span className="hidden sm:inline">Panel de cliente</span>
      </a>
      <button type="button" onClick={() => openSymptoms()} className={`${DIVIDER_CLASS} ${ITEM_CLASS}`}>
        <span className="sm:hidden">Carta</span>
        <span className="hidden sm:inline">Una carta, una señal</span>
      </button>
      <Link
        href="/norte-news"
        className={`${DIVIDER_CLASS} ${ITEM_CLASS} bg-white/10 backdrop-blur-md backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-white/20`}
      >
        <span className="sm:hidden">News</span>
        <span className="hidden sm:inline">Norte News</span>
      </Link>
      <button
        ref={agendaRef}
        type="button"
        onClick={() => openBooking()}
        className={`${DIVIDER_CLASS} ${ITEM_CLASS}`}
      >
        <span className="sm:hidden">Agenda</span>
        <span className="hidden sm:inline">Agenda tu cita</span>
      </button>
    </nav>
  );
}
