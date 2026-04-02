import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Soli Dungeon Master",
    short_name: "Soli DM",
    description:
      "Campagne D&D, personaggi, dadi e wiki — strumenti per giocatori e Dungeon Master.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#b45309",
    icons: [
      {
        src: "/brand/d20-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/brand/d20-icon.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
