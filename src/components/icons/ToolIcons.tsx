import type { SVGProps } from "react";

export type ToolIconProps = SVGProps<SVGSVGElement>;

export function IconInfraestructuraDigital(props: ToolIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      data-tool="Infraestructura Digital"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      {...props}
    >
      <circle cx={32} cy={32} r={22} />
      <line x1={32} y1={6} x2={32} y2={18} />
      <line x1={32} y1={46} x2={32} y2={58} />
      <line x1={6} y1={32} x2={18} y2={32} />
      <line x1={46} y1={32} x2={58} y2={32} />
      <circle cx={32} cy={32} r={3} fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconBranding(props: ToolIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      data-tool="Branding"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      {...props}
    >
      <circle cx={26} cy={32} r={16} />
      <circle cx={38} cy={32} r={16} />
    </svg>
  );
}

export function IconSistemasAudiovisuales(props: ToolIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      data-tool="Sistemas Audiovisuales"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="32,8 50,19 50,45 32,56 14,45 14,19" />
      <circle cx={32} cy={32} r={6} />
    </svg>
  );
}

export function IconPaginasWeb(props: ToolIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      data-tool="Páginas Web"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinejoin="round"
      {...props}
    >
      <rect x={8} y={12} width={48} height={40} rx={4} />
      <line x1={8} y1={24} x2={56} y2={24} />
    </svg>
  );
}

export function IconIA(props: ToolIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      data-tool="IA"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      {...props}
    >
      <line x1={20} y1={44} x2={32} y2={14} />
      <line x1={32} y1={14} x2={46} y2={40} />
      <line x1={20} y1={44} x2={46} y2={40} />
      <circle cx={20} cy={44} r={4} fill="currentColor" stroke="none" />
      <circle cx={32} cy={14} r={4} fill="currentColor" stroke="none" />
      <circle cx={46} cy={40} r={4} fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconAutomatizacion(props: ToolIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      data-tool="Automatización"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      {...props}
    >
      <path d="M12,32 A20,20 0 1 1 20,47" />
      <polyline points="20,36 20,47 9,47" />
    </svg>
  );
}

export function IconSistemasContenido(props: ToolIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      data-tool="Sistemas de Contenido"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      {...props}
    >
      <line x1={10} y1={18} x2={54} y2={18} />
      <line x1={10} y1={32} x2={54} y2={32} />
      <line x1={10} y1={46} x2={36} y2={46} />
    </svg>
  );
}

/**
 * Placeholder icon — no final art yet for this service. Simple, consistent
 * with the hand-drawn set's stroke language, meant to be swapped later.
 */
export function IconSistemasAdministrativos(props: ToolIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      data-tool="Sistemas Administrativos"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinejoin="round"
      {...props}
    >
      <rect x={10} y={10} width={44} height={44} rx={3} />
      <line x1={10} y1={30} x2={54} y2={30} />
      <line x1={32} y1={10} x2={32} y2={54} />
    </svg>
  );
}

/** Placeholder icon — no final art yet for this service. */
export function IconSistemasInventario(props: ToolIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      data-tool="Sistemas de Inventario"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinejoin="round"
      {...props}
    >
      <rect x={12} y={20} width={28} height={28} />
      <rect x={24} y={12} width={28} height={28} />
    </svg>
  );
}

/** Placeholder icon — no final art yet for this service. */
export function IconHerramientasInternas(props: ToolIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      data-tool="Herramientas Internas"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20,24 a12,10 0 0 1 24,0" />
      <rect x={12} y={24} width={40} height={26} rx={3} />
      <line x1={12} y1={38} x2={52} y2={38} />
    </svg>
  );
}

export const TOOL_ICONS = {
  "Infraestructura Digital": IconInfraestructuraDigital,
  Branding: IconBranding,
  "Sistemas de Contenido": IconSistemasContenido,
  "Páginas Web": IconPaginasWeb,
  "Sistemas Audiovisuales": IconSistemasAudiovisuales,
  "Sistemas Administrativos": IconSistemasAdministrativos,
  "Sistemas de Inventario": IconSistemasInventario,
  "Herramientas Internas": IconHerramientasInternas,
  Automatización: IconAutomatizacion,
  IA: IconIA,
} as const;

export type ToolName = keyof typeof TOOL_ICONS;
