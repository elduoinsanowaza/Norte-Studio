"use client";

import { useState } from "react";
import type { Symptom } from "@/lib/symptoms";

export default function SymptomCard({
  item,
  index,
  selected,
  onToggleSelect,
}: {
  item: Symptom;
  index: number;
  selected: boolean;
  onToggleSelect: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const number = String(index + 1).padStart(2, "0");

  return (
    <div style={{ perspective: "1400px" }}>
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        className="relative min-h-[460px] w-full transition-transform duration-700 ease-out"
      >
        {/* Back — initial state */}
        <button
          type="button"
          onClick={() => setFlipped(true)}
          disabled={flipped}
          aria-label={`Voltear carta ${number}`}
          style={{ backfaceVisibility: "hidden" }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-ns-2 border border-ns-black bg-ns-black text-ns-white disabled:cursor-default"
        >
          <span className="text-micro tracking-[0.08em] uppercase opacity-70">
            Norte Studio
          </span>
          <span className="text-body font-medium">Mazo de síntomas</span>
        </button>

        {/* Front — revealed on flip */}
        <div
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          className="absolute inset-0 flex flex-col gap-ns-3 border border-ns-black bg-ns-white p-ns-3 text-ns-black"
          aria-hidden={!flipped}
        >
          <div className="flex items-center justify-between text-micro tracking-[0.08em] uppercase opacity-60">
            <span>#{number}</span>
            <span>Síntoma</span>
          </div>

          <div
            className="flex flex-1 items-center justify-center border border-ns-black/20 px-ns-2 text-center text-micro uppercase tracking-[0.04em] opacity-40"
            title={item.imageConcept ?? undefined}
          >
            {item.image}
          </div>

          <p className="font-serif text-lg leading-snug italic">
            &ldquo;{item.symptom}&rdquo;
          </p>

          <div className="flex flex-col gap-1 border-t border-ns-black/20 pt-ns-2">
            <span className="text-micro tracking-[0.08em] uppercase opacity-60">
              Identificamos
            </span>
            <span className="text-body font-medium">{item.service}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-micro tracking-[0.08em] uppercase opacity-40">
              Causas secundarias
            </span>
            <ul className="text-micro opacity-70">
              {item.secondaryCauses.map((cause) => (
                <li key={cause}>{cause}</li>
              ))}
            </ul>
          </div>

          <p className="text-micro opacity-40">
            La causa real se confirma durante el diagnóstico.
          </p>

          <button
            type="button"
            onClick={onToggleSelect}
            className={`mt-auto border px-ns-3 py-ns-2 text-micro tracking-[0.08em] uppercase transition-colors duration-200 ${
              selected
                ? "border-ns-black bg-ns-black text-ns-white"
                : "border-ns-black text-ns-black hover:bg-ns-black hover:text-ns-white"
            }`}
          >
            {selected ? "✓ En tu mazo" : "+ Agregar a mi mazo"}
          </button>
        </div>
      </div>
    </div>
  );
}
