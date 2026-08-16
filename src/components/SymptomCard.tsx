import Logo from "@/components/Logo";
import type { Symptom } from "@/lib/symptoms";

/**
 * Grid tile only — a stand-in for the card-back JPG Diego will provide.
 * Clicking opens that symptom's detail pop-up (SymptomDetailPopup).
 */
export default function SymptomCard({
  item,
  onOpen,
}: {
  item: Symptom;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Abrir carta: ${item.symptom}`}
      className="flex min-h-[320px] w-full flex-col items-center justify-center gap-ns-4 border border-ns-black bg-ns-white p-ns-4 text-center text-ns-black transition-opacity duration-200 hover:opacity-80"
    >
      <Logo />
      <span className="text-body font-medium leading-snug">{item.symptom}</span>
    </button>
  );
}
