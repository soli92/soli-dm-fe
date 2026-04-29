import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://soli-dm-fe.vercel.app"),
  applicationName: "Soli Dungeon Master",
  title: "Soli Dungeon Master",
  description:
    "Campagne D&D, personaggi, dadi e wiki — strumenti per giocatori e Dungeon Master.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/brand/soli-favicon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: [{ url: "/brand/soli-favicon.svg", type: "image/svg+xml" }],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "Soli DM",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "Soli Dungeon Master",
    description:
      "Campagne D&D, personaggi, dadi e wiki — strumenti per giocatori e Dungeon Master.",
    images: ["/brand/soli-logo-gold.svg"],
  },
  twitter: {
    card: "summary",
    title: "Soli Dungeon Master",
    description:
      "Campagne D&D, personaggi, dadi e wiki — strumenti per giocatori e Dungeon Master.",
    images: ["/brand/soli-logo-gold.svg"],
  },
  formatDetection: {
    telephone: false,
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Space+Grotesk:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cinzel:wght@400;600;700&family=Courier+Prime&family=Crimson+Text:wght@600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Merriweather:wght@400;700&family=Orbitron:wght@400;500;600;700&family=Oswald:wght@400;600;700&family=Rajdhani:wght@500;600;700&family=Russo+One&family=Share+Tech+Mono&family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
