import Logo from "@/components/Logo";
import { StethoscopeIcon, ClockIcon, ClipboardIcon } from "./icons";

export default function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="em-rise flex w-full flex-col items-center text-center">
      <div
        className="em-r-pill em-pop mb-7 inline-flex items-center gap-2 border border-[var(--em-coral)]/30 bg-white px-4 py-2 text-sm font-semibold text-[var(--em-coral-dark)] shadow-sm sm:text-[15px]"
        style={{ animationDelay: "0.1s" }}
      >
        🎉 Llévate 5% de descuento en la primera renta de tu próximo consultorio
        respondiendo esta encuesta
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
        Así arrancan y crecen las consultas privadas en Durango
      </h1>

      <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--em-ink-soft)] sm:text-lg">
        Cinco minutos tuyos: queremos conocer tu experiencia y tus
        necesidades reales para diseñar el consultorio que de verdad
        buscas — accesible y amigable, pensado para médicos que están
        iniciando.
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

      <div className="mt-12 flex items-center gap-2 opacity-70">
        <span className="text-[11px] font-medium uppercase tracking-wide text-[var(--em-ink-soft)]">
          Un estudio de
        </span>
        <Logo heightRem={1} />
      </div>
    </div>
  );
}
