import type { Symptom } from "@/lib/symptoms";

/**
 * Grid tile only — a stand-in for the card-back JPG Diego will provide.
 * Clicking opens that symptom's detail pop-up (SymptomDetailPopup).
 */
export default function SymptomCard({
  item,
  index,
  onOpen,
}: {
  item: Symptom;
  index: number;
  onOpen: () => void;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Abrir carta ${number}`}
      className="flex min-h-[320px] w-full flex-col items-center justify-center gap-ns-2 border border-ns-black bg-ns-black text-ns-white transition-opacity duration-200 hover:opacity-80"
    >
      <span className="text-micro tracking-[0.08em] uppercase opacity-70">
        #{number} · Norte Studio
      </span>
      <span className="text-body font-medium">Mazo de síntomas</span>
      <span className="sr-only">{item.symptom}</span>
    </button>
  );
}
