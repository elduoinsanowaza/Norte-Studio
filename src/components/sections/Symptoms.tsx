"use client";

import { useState } from "react";
import SymptomCard from "@/components/SymptomCard";
import { useBookingPanel } from "@/components/booking/BookingPanelContext";
import { SYMPTOMS } from "@/lib/symptoms";

const VISIBLE_SYMPTOMS = SYMPTOMS.filter((s) => s.symptom !== null);

export default function Symptoms() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { open } = useBookingPanel();

  const selectedItems = VISIBLE_SYMPTOMS.filter((s) => selectedIds.includes(s.id));

  function toggleSelect(id: number) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleRequestSession() {
    open(selectedItems.map((s) => `${s.symptom} → ${s.service}`));
  }

  return (
    <section className="bg-ns-white py-ns-8 text-ns-black">
      <div className="container-content flex flex-col gap-ns-7">
        <div className="flex max-w-[var(--text-width)] flex-col gap-ns-3">
          <h2 className="text-micro tracking-[0.08em] uppercase opacity-60">
            Mazo de síntomas
          </h2>
          <p className="text-2xl font-medium sm:text-3xl">
            ¿Qué está pasando en tu negocio?
          </p>
          <p className="text-body opacity-70">
            Selecciona los problemas que reconoces.
            <br />
            No buscamos darte una respuesta antes de entender el problema.
            Queremos saber qué estás viviendo.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-ns-4 sm:grid-cols-2 lg:grid-cols-3">
          {VISIBLE_SYMPTOMS.map((item, i) => (
            <SymptomCard
              key={item.id}
              item={item}
              index={i}
              selected={selectedIds.includes(item.id)}
              onToggleSelect={() => toggleSelect(item.id)}
            />
          ))}
        </div>

        <div className="flex flex-col gap-ns-4 border-t border-ns-black/20 pt-ns-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-micro tracking-[0.08em] uppercase opacity-60">
              Tu mazo
            </h3>
            <p className="text-body font-medium">
              {selectedItems.length} síntoma{selectedItems.length === 1 ? "" : "s"}{" "}
              identificado{selectedItems.length === 1 ? "" : "s"}
            </p>
          </div>

          {selectedItems.length > 0 && (
            <>
              <div className="flex flex-wrap gap-ns-2">
                {selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="max-w-[240px] border border-ns-black px-ns-3 py-ns-2 text-micro"
                  >
                    {item.symptom}
                  </div>
                ))}
              </div>
              <p className="max-w-[var(--text-width)] text-body opacity-70">
                Estos síntomas pueden estar relacionados. Durante la sesión de
                diagnóstico analizaremos qué hay detrás de ellos y dónde tiene
                sentido intervenir.
              </p>
            </>
          )}

          <button
            type="button"
            onClick={handleRequestSession}
            disabled={selectedItems.length === 0}
            className="self-start border border-ns-black px-ns-4 py-ns-2 text-micro tracking-[0.08em] uppercase transition-colors duration-200 hover:bg-ns-black hover:text-ns-white disabled:pointer-events-none disabled:opacity-30"
          >
            Solicitar sesión de diagnóstico
          </button>
        </div>
      </div>
    </section>
  );
}
