"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { solidsNativeSelectTrigger } from "@/lib/solids-native-classes";

const THEMES = [
  { id: "fantasy", label: "Fantasy" },
  { id: "dark", label: "Scuro" },
  { id: "light", label: "Chiaro" },
  { id: "cyberpunk", label: "Cyberpunk" },
  { id: "90s-party", label: "90s" },
  { id: "steampunk", label: "Steampunk" },
  { id: "ichigo", label: "Ichigo" },
  { id: "vegeta", label: "Vegeta" },
  { id: "zoro", label: "Zoro" },
  { id: "captain-america", label: "Captain America" },
  { id: "sasuke", label: "Sasuke" },
  { id: "inuyasha", label: "Inuyasha" },
] as const;

export type ThemeSwitcherProps = {
  /** `stacked`: colonna piena (sidebar); `inline`: riga compatta (toolbar). */
  layout?: "inline" | "stacked";
  className?: string;
};

export function ThemeSwitcher({
  layout = "inline",
  className,
}: ThemeSwitcherProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span
        className={cn(
          "inline-block rounded-full border border-border/80 bg-muted/40",
          layout === "stacked"
            ? "h-10 w-full"
            : "h-11 min-w-[8.5rem] sm:h-10",
          className
        )}
        aria-hidden
      />
    );
  }

  const current = theme ?? resolvedTheme ?? "fantasy";

  if (layout === "stacked") {
    return (
      <div className={cn("flex w-full flex-col gap-1.5", className)}>
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Tema
        </span>
        <select
          value={current}
          onChange={(e) => setTheme(e.target.value)}
          className={cn(solidsNativeSelectTrigger, "min-h-10 w-full")}
          aria-label="Seleziona tema colore"
        >
          {THEMES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <label
      className={cn(
        "flex min-h-11 items-center gap-2 text-muted-foreground sm:min-h-10",
        className
      )}
    >
      <span className="hidden text-sm sm:inline">Tema</span>
      <select
        value={current}
        onChange={(e) => setTheme(e.target.value)}
        className={cn(
          solidsNativeSelectTrigger,
          "min-h-9 w-[min(100%,9rem)] sm:min-h-9"
        )}
        aria-label="Seleziona tema colore"
      >
        {THEMES.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>
    </label>
  );
}
