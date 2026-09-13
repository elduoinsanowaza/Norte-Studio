"use client";

import { useState } from "react";
import { GLASS_CARD_DARK, GLASS_CARD_LIGHT } from "@/lib/glassButton";

export type AccordionEntry = {
  question: string;
  answer: string;
};

export default function Accordion({
  items,
  inverted = false,
}: {
  items: AccordionEntry[];
  inverted?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const glass = inverted ? GLASS_CARD_DARK : GLASS_CARD_LIGHT;

  return (
    <div className="flex flex-col gap-ns-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question} className={`radius-2xl px-ns-4 ${glass}`}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-ns-3 py-ns-3 text-left text-body"
            >
              <span>{item.question}</span>
              <span className="shrink-0 text-micro">{isOpen ? "—" : "+"}</span>
            </button>
            {isOpen && (
              <p className="max-w-[var(--text-width)] pb-ns-4 text-micro leading-relaxed whitespace-pre-line opacity-80">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
