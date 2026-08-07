"use client";

import { useState } from "react";
import { TOOL_ICONS, type ToolName } from "@/components/icons/ToolIcons";

type Node = {
  name: ToolName;
  x: number;
  y: number;
  hub?: boolean;
};

const HUB: Node = { name: "Dirección Estratégica", x: 600, y: 320, hub: true };

const RING: Node[] = [
  { name: "Meta Ads", x: 860, y: 320 },
  { name: "Contenido", x: 810, y: 473 },
  { name: "KPIs", x: 680, y: 567 },
  { name: "Optimización", x: 520, y: 567 },
  { name: "Automatización", x: 390, y: 473 },
  { name: "IA", x: 340, y: 320 },
  { name: "Sitios Web", x: 390, y: 167 },
  { name: "Producción", x: 520, y: 73 },
  { name: "Branding", x: 680, y: 73 },
  { name: "Consultoría", x: 810, y: 167 },
];

const NODES: Node[] = [HUB, ...RING];

const RING_EDGES: [ToolName, ToolName][] = RING.map((node, i) => [
  node.name,
  RING[(i + 1) % RING.length].name,
]);

const SPOKE_EDGES: [ToolName, ToolName][] = RING.map((node) => [HUB.name, node.name]);

const EXTRA_EDGES: [ToolName, ToolName][] = [
  ["Meta Ads", "Sitios Web"],
  ["Branding", "Automatización"],
  ["Producción", "Optimización"],
];

const EDGES: [ToolName, ToolName][] = [...SPOKE_EDGES, ...RING_EDGES, ...EXTRA_EDGES];

const NODE_BY_NAME = new Map(NODES.map((n) => [n.name, n]));

function isConnected(a: ToolName, b: ToolName) {
  return EDGES.some(
    ([x, y]) => (x === a && y === b) || (x === b && y === a)
  );
}

export default function Rhizome() {
  const [hovered, setHovered] = useState<ToolName | null>(null);

  const nodeOpacity = (name: ToolName) => {
    if (!hovered) return 1;
    if (name === hovered) return 1;
    return isConnected(hovered, name) ? 0.55 : 0.18;
  };

  const edgeOpacity = ([a, b]: [ToolName, ToolName]) => {
    if (!hovered) return 0.3;
    if (a === hovered || b === hovered) return 0.85;
    return 0.06;
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 1200 640"
        className="mx-auto block w-full min-w-[720px] max-w-4xl text-current"
        role="img"
        aria-label="Herramientas de intervención de Norte Studio"
      >
        <g stroke="currentColor" fill="none">
          {EDGES.map(([a, b], i) => {
            const from = NODE_BY_NAME.get(a)!;
            const to = NODE_BY_NAME.get(b)!;
            return (
              <line
                key={`${a}-${b}-${i}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                strokeWidth={1}
                style={{
                  opacity: edgeOpacity([a, b]),
                  transition: "opacity 200ms ease",
                }}
              />
            );
          })}
        </g>

        {NODES.map((node) => {
          const Icon = TOOL_ICONS[node.name];
          const size = node.hub ? 72 : 52;
          return (
            <g
              key={node.name}
              style={{
                opacity: nodeOpacity(node.name),
                transition: "opacity 200ms ease",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHovered(node.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={size / 2 + 14}
                fill="transparent"
              />
              <Icon
                x={node.x - size / 2}
                y={node.y - size / 2}
                width={size}
                height={size}
              />
              <text
                x={node.x}
                y={node.y + size / 2 + 22}
                textAnchor="middle"
                fill="currentColor"
                stroke="none"
                fontSize={node.hub ? 16 : 13}
                fontFamily="var(--font-sans)"
                letterSpacing="0.02em"
              >
                {node.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
