import type { SVGProps } from "react";

export type ToolIconProps = SVGProps<SVGSVGElement>;

export function IconDireccionEstrategica(props: ToolIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      data-tool="Dirección Estratégica"
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

export function IconMetaAds(props: ToolIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      data-tool="Meta Ads"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      {...props}
    >
      <circle cx={32} cy={32} r={6} />
      <path d="M32,18 A14,14 0 0 1 46,32" />
      <path d="M32,10 A22,22 0 0 1 54,32" />
      <path d="M32,26 A6,6 0 0 1 32,38" />
    </svg>
  );
}

export function IconProduccion(props: ToolIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      data-tool="Producción"
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

export function IconSitiosWeb(props: ToolIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      data-tool="Sitios Web"
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

export function IconContenido(props: ToolIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      data-tool="Contenido"
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

export function IconKPIs(props: ToolIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      data-tool="KPIs"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      {...props}
    >
      <line x1={16} y1={48} x2={16} y2={34} />
      <line x1={32} y1={48} x2={32} y2={20} />
      <line x1={48} y1={48} x2={48} y2={10} />
    </svg>
  );
}

export function IconOptimizacion(props: ToolIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      data-tool="Optimización"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1={12} y1={48} x2={48} y2={14} />
      <polyline points="32,14 48,14 48,30" />
    </svg>
  );
}

export function IconConsultoria(props: ToolIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      data-tool="Consultoría"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10,16 h32 v22 h-20 l-8,8 v-8 h-4 Z" />
    </svg>
  );
}

export const TOOL_ICONS = {
  "Dirección Estratégica": IconDireccionEstrategica,
  Branding: IconBranding,
  "Meta Ads": IconMetaAds,
  Producción: IconProduccion,
  "Sitios Web": IconSitiosWeb,
  IA: IconIA,
  Automatización: IconAutomatizacion,
  Contenido: IconContenido,
  KPIs: IconKPIs,
  Optimización: IconOptimizacion,
  Consultoría: IconConsultoria,
} as const;

export type ToolName = keyof typeof TOOL_ICONS;
