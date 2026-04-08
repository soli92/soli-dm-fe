"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const THEMES = [
  { id: "fantasy", label: "Fantasy" },
  { id: "dark", label: "Scuro" },
  { id: "light", label: "Chiaro" },
  { id: "cyberpunk", label: "Cyberpunk" },
  { id: "90s-party", label: "90s" },
] as const;

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span
        className="inline-block h-11 min-w-[8.5rem] rounded-full border border-border/80 bg-muted/40 sm:h-10"
        aria-hidden
      />
    );
  }

  const current = theme ?? resolvedTheme ?? "fantasy";

  return (
    <label className="flex min-h-11 items-center gap-2 text-muted-foreground sm:min-h-10">
      <span className="hidden text-sm sm:inline">Tema</span>
      <select
        value={current}
        onChange={(e) => setTheme(e.target.value)}
        className={cn(
          "min-h-11 w-[min(100%,9rem)] rounded-full border-2 border-border/80 bg-background px-3 py-2 text-sm text-foreground sm:min-h-10",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
