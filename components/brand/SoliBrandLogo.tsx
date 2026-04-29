"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type SoliBrandLogoProps = {
  className?: string;
  decorative?: boolean;
  priority?: boolean;
  variant?: "wordmark" | "symbol";
};

const brandSources = {
  wordmark: "/brand/soli-logo-gold.svg",
  symbol: "/brand/soli-symbol-gold.svg",
} as const;

export function SoliBrandLogo({
  className,
  decorative = false,
  priority = false,
  variant = "wordmark",
}: SoliBrandLogoProps) {
  const alt = variant === "symbol" ? "Soli" : "Soli Dungeon Master";
  const src = brandSources[variant];

  return (
    <Image
      src={src}
      alt={decorative ? "" : alt}
      aria-hidden={decorative ? true : undefined}
      width={variant === "symbol" ? 40 : 164}
      height={variant === "symbol" ? 40 : 64}
      className={cn("h-auto w-auto object-contain", className)}
      priority={priority}
    />
  );
}
