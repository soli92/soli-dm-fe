import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soli Dungeon Master",
  description:
    "Campagne D&D, personaggi, dadi e wiki — strumenti per giocatori e Dungeon Master.",
  icons: {
    icon: [{ url: "/brand/d20-icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/brand/d20-icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#b45309",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
