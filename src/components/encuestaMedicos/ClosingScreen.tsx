import { buildWhatsappLink, WHATSAPP_DISPLAY } from "@/lib/encuestaMedicos";
import { CameraIcon, CheckBadgeIcon, WhatsappIcon } from "./icons";

export default function ClosingScreen({
  status,
  folio,
  onRetry,
}: {
  status: "saving" | "ready" | "error";
  folio: string;
  onRetry: () => void;
}) {
  if (status === "saving") {
    return (
      <div className="em-rise flex w-full flex-col items-center text-center">
        <div className="em-r-pill h-14 w-14 animate-spin border-4 border-[var(--em-teal-pale)] border-t-[var(--em-teal)]" />
        <p className="mt-6 text-base font-medium text-[var(--em-ink-soft)]">
          Guardando tus respuestas…
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="em-rise flex w-full flex-col items-center text-center">
        <h2 className="text-2xl font-semibold text-[var(--em-ink)]">
          Algo no salió bien
        </h2>
        <p className="mt-3 max-w-sm text-[var(--em-ink-soft)]">
          No pudimos guardar tu encuesta. Revisa tu conexión e inténtalo de
          nuevo.
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="em-btn-primary em-r-pill mt-7 px-8 py-3.5 text-sm font-semibold"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="em-rise flex w-full flex-col items-center text-center">
      <CheckBadgeIcon className="em-pop mb-5 h-16 w-16 text-[var(--em-teal)]" />

      <h2 className="text-[1.9rem] font-bold leading-tight text-[var(--em-ink)] sm:text-4xl">
        ¡Gracias! Tu respuesta quedó registrada
      </h2>

      <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--em-ink-soft)]">
        Con esto nos ayudas a construir un espacio pensado para médicos que,
        como tú, están armando su consulta privada en Durango.
      </p>

      <div className="em-r-xl mt-7 border border-[var(--em-border)] bg-white px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--em-ink-soft)]">
          Tu folio de descuento
        </p>
        <p className="mt-1 text-3xl font-bold tracking-[0.1em] text-[var(--em-teal-dark)]">
          {folio}
        </p>
      </div>

      <div className="em-r-xl mt-6 max-w-md border border-dashed border-[var(--em-coral)]/50 bg-[#fff6f3] px-6 py-5 text-left">
        <p className="flex items-center gap-2 text-sm font-semibold text-[var(--em-coral-dark)]">
          <CameraIcon className="h-4 w-4" /> Para validar tu 5% de descuento
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--em-ink-soft)]">
          Toma una captura de pantalla de esta página (con tu folio visible) y
          envíala por WhatsApp al{" "}
          <span className="font-semibold text-[var(--em-ink)]">
            {WHATSAPP_DISPLAY}
          </span>{" "}
          para continuar tu registro.
        </p>
      </div>

      <a
        href={buildWhatsappLink(folio)}
        target="_blank"
        rel="noopener noreferrer"
        className="em-btn-whatsapp em-r-pill mt-7 inline-flex items-center gap-2.5 px-9 py-4 text-base font-semibold"
      >
        <WhatsappIcon className="h-5 w-5" />
        Enviar captura por WhatsApp
      </a>
    </div>
  );
}
