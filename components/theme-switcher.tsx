"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
      <span className="h-8 w-[7rem] inline-block rounded-md border border-border bg-muted/30" />
    );
  }

  const current = theme ?? resolvedTheme ?? "fantasy";

  return (
    <label className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className="hidden sm:inline">Tema</span>
      <select
        value={current}
        onChange={(e) => setTheme(e.target.value)}
        className="rounded-md border border-border bg-background px-2 py-1 text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label="Seleziona tema"
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
