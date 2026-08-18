"use client";

import { useState } from "react";
import Image from "next/image";
import SymptomCard from "@/components/SymptomCard";
import SymptomDetailPopup from "./SymptomDetailPopup";
import MazoRegistrationPopup from "./MazoRegistrationPopup";
import { useBookingPanel } from "@/components/booking/BookingPanelContext";
import { useSymptomsPanel } from "./SymptomsPanelContext";
import { SYMPTOMS } from "@/lib/symptoms";

const VISIBLE_SYMPTOMS = SYMPTOMS.filter((s) => s.symptom !== null);
const VALID_IDS = new Set(VISIBLE_SYMPTOMS.map((s) => s.id));

const REGISTRANT_STORAGE_KEY = "ns-mazo-registrant";
const SELECTION_STORAGE_KEY = "ns-mazo-selection";

type Registrant = { name: string; email: string };

function loadStoredRegistrant(): Registrant | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(REGISTRANT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.name === "string" && typeof parsed?.email === "string") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function loadStoredSelection(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SELECTION_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is number => typeof id === "number" && VALID_IDS.has(id));
  } catch {
    return [];
  }
}

function saveSelection(ids: number[]) {
  try {
    window.localStorage.setItem(SELECTION_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Private/incognito browsing can throw — the selection just won't
    // survive a reload in that case, which is an acceptable fallback.
  }
}

export default function SymptomsContent() {
  // Lazy-init reads localStorage once on mount — remembers this browser
  // across panel opens/closes and page reloads (not an account system,
  // just a local "you already registered here" flag).
  const [registrant, setRegistrant] = useState<Registrant | null>(loadStoredRegistrant);
  const [pendingCardId, setPendingCardId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>(loadStoredSelection);
  const [submitting, setSubmitting] = useState(false);
  const { open: openBooking } = useBookingPanel();
  const { close: closeSymptoms, openDetail } = useSymptomsPanel();

  const selectedItems = VISIBLE_SYMPTOMS.filter((s) => selectedIds.includes(s.id));

  function toggleSelect(id: number) {
    setSelectedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      saveSelection(next);
      return next;
    });
  }

  function handleCardOpen(id: number) {
    if (!registrant) {
      setPendingCardId(id);
      return;
    }
    openDetail(id);
  }

  function handleRegister(name: string, email: string) {
    const value = { name, email };
    setRegistrant(value);
    try {
      window.localStorage.setItem(REGISTRANT_STORAGE_KEY, JSON.stringify(value));
    } catch {
      // Private/incognito browsing can throw — registration still works
      // for the rest of this session via the in-memory state.
    }
    const cardId = pendingCardId;
    setPendingCardId(null);
    if (cardId !== null) openDetail(cardId);
  }

  async function handleRequestSession() {
    if (!registrant || submitting) return;

    const symptomLines = selectedItems.map((s) => `${s.symptom} → ${s.service}`);

    setSubmitting(true);
    try {
      await fetch("/api/mazo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registrant.name,
          email: registrant.email,
          symptoms: symptomLines,
        }),
      });
    } catch (err) {
      // Don't block booking on this — the person still gets to schedule
      // even if the mazo failed to save.
      console.error("Failed to save mazo submission", err);
    } finally {
      setSubmitting(false);
    }

    setSelectedIds([]);
    saveSelection([]);
    closeSymptoms();
    openBooking(symptomLines);
  }

  return (
    <div className="flex flex-col gap-ns-7">
      <div className="flex max-w-[var(--text-width)] flex-col gap-ns-3">
        <h2 className="text-micro tracking-[0.08em] uppercase opacity-60">
          Una carta, una señal
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
        {VISIBLE_SYMPTOMS.map((item) => (
          <SymptomCard
            key={item.id}
            item={item}
            onOpen={() => handleCardOpen(item.id)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-ns-4 border-t border-ns-black/20 pt-ns-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-medium sm:text-3xl">Tu mazo</h3>
          <p className="text-micro tracking-[0.08em] uppercase opacity-60">
            {selectedItems.length} síntoma{selectedItems.length === 1 ? "" : "s"}{" "}
            identificado{selectedItems.length === 1 ? "" : "s"}
          </p>
        </div>

        {selectedItems.length > 0 && (
          <>
            <div className="flex flex-wrap gap-ns-3">
              {selectedItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openDetail(item.id)}
                  aria-label={`Ver carta: ${item.symptom}`}
                  className="relative aspect-[5/7] w-24 shrink-0 transition-opacity duration-200 hover:opacity-80 sm:w-28"
                >
                  <Image
                    src={item.image}
                    alt={item.symptom ?? ""}
                    fill
                    sizes="120px"
                    className="object-contain"
                  />
                </button>
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
          disabled={selectedItems.length === 0 || submitting}
          className="self-start border border-ns-black px-ns-4 py-ns-2 text-micro tracking-[0.08em] uppercase transition-colors duration-200 hover:bg-ns-black hover:text-ns-white disabled:pointer-events-none disabled:opacity-30"
        >
          {submitting ? "Guardando…" : "Solicitar sesión de diagnóstico"}
        </button>
      </div>

      {pendingCardId !== null && (
        <MazoRegistrationPopup
          onSubmit={handleRegister}
          onClose={() => setPendingCardId(null)}
        />
      )}

      <SymptomDetailPopup selectedIds={selectedIds} onToggleSelect={toggleSelect} />
    </div>
  );
}
