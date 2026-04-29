"use client";

import { SoliBrandLogo } from "@/components/brand/SoliBrandLogo";
import { cn } from "@/lib/utils";

export type FullScreenLoaderProps = {
  show: boolean;
  /** Testo sotto lo spinner */
  label?: string;
  className?: string;
};

/**
 * Overlay a tutto schermo sopra il contenuto DM (sotto skip-link).
 * Usare mentre campagne/personaggi o scheda non sono ancora pronti.
 */
export function FullScreenLoader({
  show,
  label = "Caricamento…",
  className,
}: FullScreenLoaderProps) {
  if (!show) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5",
        "bg-background/90 backdrop-blur-md",
        className
      )}
    >
      <div className="relative flex items-center justify-center">
        <div
          className={cn(
            "absolute h-20 w-20 rounded-full border-2 border-primary/20 border-t-primary/70",
            "motion-safe:animate-spin"
          )}
          aria-hidden
        />
        <SoliBrandLogo
          variant="symbol"
          decorative
          className="h-12 w-12 drop-shadow-md motion-safe:animate-pulse"
        />
      </div>
      <p className="max-w-xs text-center text-sm font-medium text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
