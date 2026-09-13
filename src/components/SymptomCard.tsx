import Logo from "@/components/Logo";
import type { Symptom } from "@/lib/symptoms";
import { GLASS_BUTTON_LIGHT } from "@/lib/glassButton";

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
      className={`flex aspect-[5/7] w-full flex-col items-center justify-center gap-ns-4 radius-2xl p-ns-4 text-center ${GLASS_BUTTON_LIGHT}`}
    >
      <span className="text-lg font-medium leading-snug">{item.symptom}</span>
      <Logo heightRem={3.5} />
    </button>
  );
}
