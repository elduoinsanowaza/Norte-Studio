import Logo from "@/components/Logo";
import { StethoscopeIcon, ClockIcon, ClipboardIcon } from "./icons";

export default function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="em-rise flex w-full flex-col items-center text-center">
      <div
        className="em-r-pill em-pop mb-7 inline-flex flex-wrap items-baseline justify-center gap-x-2 border border-[var(--em-coral)]/30 bg-white px-6 py-3 text-base font-semibold text-[var(--em-coral-dark)] shadow-sm sm:text-lg"
        style={{ animationDelay: "0.1s" }}
      >
        <strong className="text-xl font-extrabold sm:text-2xl">🎉 5% de descuento</strong>
        <span>en tu primera renta de consultorio</span>
      </div>

      <div
        className="em-r-pill em-pop mb-6 flex h-16 w-16 items-center justify-center bg-[var(--em-teal)] text-white"
        style={{ animationDelay: "0.02s" }}
      >
        <StethoscopeIcon className="h-8 w-8" />
      </div>

      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--em-teal-dark)]">
        Encuesta · Médicos en Durango
      </p>

      <h1 className="max-w-2xl text-[2.1rem] font-bold leading-[1.08] text-[var(--em-ink)] sm:text-5xl">
        Cinco minutos tuyos nos ayudan muchísimo
      </h1>

      <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--em-ink-soft)] sm:text-lg">
        Cuéntanos tu experiencia como médico. No hay respuestas correctas
        ni incorrectas: solo lo que vives día a día.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-[var(--em-ink-soft)]">
        <span className="inline-flex items-center gap-1.5">
          <ClockIcon className="h-4 w-4" /> Menos de 5 minutos
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ClipboardIcon className="h-4 w-4" /> 100% anónima
        </span>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="em-btn-primary em-r-pill mt-10 px-10 py-4 text-base font-semibold sm:text-lg"
      >
        Empezar encuesta →
      </button>

      <div className="mt-12 flex items-center gap-2.5 opacity-70">
        <span className="text-[14px] font-medium uppercase tracking-wide text-[var(--em-ink-soft)]">
          Un estudio de
        </span>
        <Logo heightRem={1.25} />
      </div>
    </div>
  );
}
