"use client";

import { useEffect, useState } from "react";
import { useBookingPanel } from "./BookingPanelContext";
import RotatingPhrase from "./RotatingPhrase";
import Rhizome from "@/components/Rhizome";
import Accordion from "@/components/Accordion";
import { BOOKING_CTA_LABEL, BOOKING_CTA_URL, BOOKING_FAQS } from "@/lib/content";
import { GLASS_BUTTON_LIGHT, GLASS_BUTTON_LIGHT_SM, GLASS_CARD_LIGHT } from "@/lib/glassButton";
import GlassBlobs from "@/components/GlassBlobs";

const VISIBLE_FAQ_COUNT = 3;

export default function BookingPanel() {
  const { isOpen, close, deckSummary } = useBookingPanel();
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  const visibleFaqs = showAllFaqs
    ? BOOKING_FAQS
    : BOOKING_FAQS.slice(0, VISIBLE_FAQ_COUNT);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Agenda tu cita"
      className="fixed inset-0 z-50 overflow-y-auto bg-ns-white text-ns-black"
    >
      <GlassBlobs />
      <div className="container-content flex min-h-full flex-col py-ns-6">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className={`radius-full px-ns-2 py-ns-1 text-micro uppercase tracking-[0.08em] ${GLASS_BUTTON_LIGHT_SM}`}
          >
            Cerrar ✕
          </button>
        </div>

        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-ns-5 py-ns-6 text-center">
          {deckSummary && deckSummary.length > 0 && (
            <div className={`flex w-full flex-col gap-ns-2 radius-2xl p-ns-4 text-left ${GLASS_CARD_LIGHT}`}>
              <span className="text-micro tracking-[0.08em] uppercase opacity-60">
                Basado en tu mazo
              </span>
              <ul className="flex flex-col gap-1 text-micro opacity-80">
                {deckSummary.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          )}

          <RotatingPhrase />

          <a
            href={BOOKING_CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block radius-2xl px-ns-5 py-ns-3 text-body ${GLASS_BUTTON_LIGHT}`}
          >
            {BOOKING_CTA_LABEL}
          </a>
        </div>

        <div className="py-ns-6">
          <Rhizome />
        </div>

        <div className="mx-auto w-full max-w-3xl py-ns-6">
          <Accordion items={visibleFaqs} />

          {!showAllFaqs && BOOKING_FAQS.length > VISIBLE_FAQ_COUNT && (
            <div className="pt-ns-3">
              <button
                type="button"
                onClick={() => setShowAllFaqs(true)}
                className={`inline-block radius-2xl px-ns-4 py-ns-2 text-micro tracking-[0.08em] uppercase ${GLASS_BUTTON_LIGHT}`}
              >
                Ver más preguntas
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
