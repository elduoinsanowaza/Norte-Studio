"use client";

import { useState } from "react";

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
  const borderColor = inverted ? "border-ns-white/30" : "border-ns-black/20";

  return (
    <div className={`divide-y ${borderColor} border-t ${borderColor}`}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question} className={`border-b ${borderColor}`}>
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
              <p className="max-w-[var(--text-width)] pb-ns-3 text-micro leading-relaxed whitespace-pre-line opacity-80">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
