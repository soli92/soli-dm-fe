"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="fantasy"
      enableSystem={false}
      themes={["light", "dark", "fantasy", "cyberpunk", "90s-party"]}
      storageKey="soli-dm-theme"
    >
      {children}
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}
