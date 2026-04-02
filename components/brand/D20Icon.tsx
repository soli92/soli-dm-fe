import React from "react";
import { cn } from "@/lib/utils";

type D20IconProps = {
  className?: string;
  /** Se true, il logo è decorativo (es. accanto al testo del brand nel link). */
  decorative?: boolean;
};

/**
 * Marchio D20: facce gialle, bordi e numeri neri, ? sulla faccia inferiore (simbolo “critico / ignoto”).
 * Dimensioni: usa className (es. `h-10 w-10`); default 2.5rem.
 */
export function D20Icon({
  className,
  decorative = false,
}: D20IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      className={cn("h-10 w-10 shrink-0", className)}
      role="img"
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : "Soli Dungeon Master — dado a 20 facce"}
    >
      {!decorative ? <title>Soli Dungeon Master</title> : null}
      <path
        d="M60 18 L22 78 L60 98 Z"
        fill="#FCD34D"
        stroke="#0a0a0a"
        strokeWidth={2.4}
        strokeLinejoin="round"
      />
      <path
        d="M60 18 L98 78 L60 98 Z"
        fill="#FBBF24"
        stroke="#0a0a0a"
        strokeWidth={2.4}
        strokeLinejoin="round"
      />
      <path
        d="M22 78 L98 78 L60 98 Z"
        fill="#EAB308"
        stroke="#0a0a0a"
        strokeWidth={2.4}
        strokeLinejoin="round"
      />
      <path
        d="M22 78 L12 88 L60 98 Z"
        fill="#FDE047"
        stroke="#0a0a0a"
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <path
        d="M98 78 L108 88 L60 98 Z"
        fill="#FACC15"
        stroke="#0a0a0a"
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <text
        x={42}
        y={62}
        textAnchor="middle"
        fontFamily="system-ui,Segoe UI,sans-serif"
        fontSize={11}
        fontWeight={700}
        fill="#0a0a0a"
      >
        7
      </text>
      <text
        x={78}
        y={62}
        textAnchor="middle"
        fontFamily="system-ui,Segoe UI,sans-serif"
        fontSize={11}
        fontWeight={700}
        fill="#0a0a0a"
      >
        14
      </text>
      <text
        x={18}
        y={92}
        textAnchor="middle"
        fontFamily="system-ui,Segoe UI,sans-serif"
        fontSize={8}
        fontWeight={700}
        fill="#0a0a0a"
      >
        3
      </text>
      <text
        x={102}
        y={92}
        textAnchor="middle"
        fontFamily="system-ui,Segoe UI,sans-serif"
        fontSize={8}
        fontWeight={700}
        fill="#0a0a0a"
      >
        11
      </text>
      <text
        x={60}
        y={92}
        textAnchor="middle"
        fontFamily="system-ui,Segoe UI,sans-serif"
        fontSize={22}
        fontWeight={800}
        fill="#0a0a0a"
      >
        ?
      </text>
    </svg>
  );
}
