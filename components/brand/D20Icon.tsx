import React from "react";
import { cn } from "@/lib/utils";

type D20IconProps = {
  className?: string;
  decorative?: boolean;
};

function pentagonPoints(
  cx: number,
  cy: number,
  r: number,
  squashY: number
): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < 5; i++) {
    const deg = -90 + i * 72;
    const rad = (deg * Math.PI) / 180;
    pts.push({
      x: cx + r * Math.cos(rad),
      y: cy + r * squashY * Math.sin(rad),
    });
  }
  return pts;
}

/**
 * D20 stilizzato: 5 facce triangolari attorno al vertice; contorno unico e linee interne
 * senza doppio stroke sulle diagonali condivise.
 */
export function D20Icon({ className, decorative = false }: D20IconProps) {
  const stroke = "#0f0f0f";
  const sw = 2.2;
  const apex = { x: 50, y: 10 };
  const pts = pentagonPoints(50, 66, 34, 0.45);
  const fills = ["#FDE047", "#FACC15", "#EAB308", "#FBBF24", "#FCD34D"];

  const faces = [0, 1, 2, 3, 4].map((i) => {
    const a = apex;
    const b = pts[i]!;
    const c = pts[(i + 1) % 5]!;
    return { d: `M ${a.x} ${a.y} L ${b.x} ${b.y} L ${c.x} ${c.y} Z`, fill: fills[i]! };
  });

  const outerD = `M ${apex.x} ${apex.y} L ${pts.map((p) => `${p.x} ${p.y}`).join(" L ")} Z`;
  const cx = pts.reduce((s, p) => s + p.x, 0) / 5;
  const cy = pts.reduce((s, p) => s + p.y, 0) / 5 + 4;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("h-10 w-10 shrink-0", className)}
      role="img"
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : "Soli Dungeon Master — dado a 20 facce"}
    >
      {!decorative ? <title>Soli Dungeon Master</title> : null}
      {faces.map((f, i) => (
        <path key={i} d={f.d} fill={f.fill} stroke="none" />
      ))}
      {/* Spigoli interni apice → vertici (escluso primo, già nel contorno T–P0–P1) */}
      {[1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={apex.x}
          y1={apex.y}
          x2={pts[i]!.x}
          y2={pts[i]!.y}
          stroke={stroke}
          strokeWidth={sw}
          strokeLinecap="round"
        />
      ))}
      <path
        d={outerD}
        fill="none"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="system-ui,Segoe UI,sans-serif"
        fontSize="18"
        fontWeight="800"
        fill={stroke}
      >
        ?
      </text>
      <text
        x={(apex.x + pts[0]!.x + pts[1]!.x) / 3}
        y={(apex.y + pts[0]!.y + pts[1]!.y) / 3 + 2}
        textAnchor="middle"
        fontFamily="system-ui,Segoe UI,sans-serif"
        fontSize="7.5"
        fontWeight="700"
        fill={stroke}
      >
        7
      </text>
      <text
        x={(apex.x + pts[4]!.x + pts[0]!.x) / 3}
        y={(apex.y + pts[4]!.y + pts[0]!.y) / 3 + 2}
        textAnchor="middle"
        fontFamily="system-ui,Segoe UI,sans-serif"
        fontSize="7.5"
        fontWeight="700"
        fill={stroke}
      >
        14
      </text>
    </svg>
  );
}
