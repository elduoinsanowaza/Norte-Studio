"use client";

import { useEffect } from "react";
import { SYMPTOMS } from "@/lib/symptoms";
import { useSymptomsPanel } from "./SymptomsPanelContext";

export default function SymptomDetailPopup({
  selectedIds,
  onToggleSelect,
}: {
  selectedIds: number[];
  onToggleSelect: (id: number) => void;
}) {
  const { detailId, openDetail, closeDetail } = useSymptomsPanel();

  useEffect(() => {
    if (detailId === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDetail();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [detailId, closeDetail]);

  if (detailId === null) return null;

  const item = SYMPTOMS.find((s) => s.id === detailId);
  if (!item) return null;

  const number = String(SYMPTOMS.indexOf(item) + 1).padStart(2, "0");
  const selected = selectedIds.includes(item.id);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-ns-2 sm:p-ns-4">
      <div
        className="absolute inset-0 bg-ns-black/50 backdrop-blur-sm"
        onClick={closeDetail}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Síntoma ${number}`}
        className="relative flex h-[92vh] w-full max-w-3xl flex-col overflow-y-auto border border-ns-black bg-ns-white text-ns-black"
      >
        <div className="flex items-center justify-between border-b border-ns-black/20 px-ns-4 py-ns-3">
          <span className="text-micro tracking-[0.08em] uppercase opacity-60">
            #{number} · Síntoma
          </span>
          <button
            type="button"
            onClick={closeDetail}
            aria-label="Cerrar"
            className="border border-ns-black px-ns-2 py-ns-1 text-micro uppercase tracking-[0.08em] hover:bg-ns-black hover:text-ns-white"
          >
            Cerrar ✕
          </button>
        </div>

        <div className="flex flex-col gap-ns-5 p-ns-4">
          {/* Stand-in for the card-front JPG Diego will provide. */}
          <div
            className="flex min-h-[220px] w-full items-center justify-center border border-ns-black/20 px-ns-3 text-center text-micro uppercase tracking-[0.04em] opacity-40"
            title={item.imageConcept ?? undefined}
          >
            {item.image}
          </div>

          <p className="font-serif text-2xl leading-snug italic">
            &ldquo;{item.symptom}&rdquo;
          </p>

          <div className="flex flex-col gap-1 border-t border-ns-black/20 pt-ns-3">
            <span className="text-micro tracking-[0.08em] uppercase opacity-60">
              Identificamos
            </span>
            <span className="text-body font-medium">{item.service}</span>
          </div>

          {item.secondaryCauses.length > 0 && (
            <div className="flex flex-col gap-ns-2">
              <span className="text-micro tracking-[0.08em] uppercase opacity-40">
                Causas secundarias
              </span>
              <div className="grid grid-cols-1 gap-ns-2 sm:grid-cols-2">
                {item.secondaryCauses.map((cause) => {
                  const match = SYMPTOMS.find((s) => s.service === cause);
                  const tile = (
                    <div className="border border-ns-black/30 px-ns-3 py-ns-3 text-micro">
                      {cause}
                    </div>
                  );

                  return match ? (
                    <button
                      key={cause}
                      type="button"
                      onClick={() => openDetail(match.id)}
                      className="text-left transition-opacity duration-200 hover:opacity-70"
                    >
                      {tile}
                    </button>
                  ) : (
                    <div key={cause}>{tile}</div>
                  );
                })}
              </div>
            </div>
          )}

          <p className="text-micro opacity-40">
            La causa real se confirma durante el diagnóstico.
          </p>

          <button
            type="button"
            onClick={() => onToggleSelect(item.id)}
            className={`self-start border px-ns-4 py-ns-2 text-micro tracking-[0.08em] uppercase transition-colors duration-200 ${
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
