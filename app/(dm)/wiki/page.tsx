import Link from "next/link";
import {
  appBodySmall,
  appMuted,
  appPageShell,
  appPageTitle,
  appPanel,
  appSectionLabel,
} from "@/lib/ui-classes";
import { cn } from "@/lib/utils";

export default function WikiHomePage() {
  const cards = [
    { href: "/wiki/classes", title: "Classi", emoji: "⚔️" },
    { href: "/wiki/races", title: "Razze", emoji: "🧝" },
    { href: "/wiki/deities", title: "Divinità", emoji: "✨" },
    { href: "/wiki/rules", title: "Regole", emoji: "📜" },
  ];

  return (
    <main className={appPageShell}>
      <div className="space-y-8">
        <header className="space-y-2">
          <p className={appSectionLabel}>Riferimento 5e</p>
          <h1 className={appPageTitle}>Wiki D&amp;D</h1>
          <p className={cn(appMuted, appBodySmall, "max-w-lg")}>
            Contenuti serviti dall&apos;API backend (dati statici sul server).
          </p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className={cn(
                appPanel,
                "flex min-h-[5.5rem] items-center gap-4 no-underline",
                "motion-safe:transition-[box-shadow,transform,border-color] hover:border-primary/35 hover:shadow-md",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "motion-safe:active:scale-[0.99]"
              )}
            >
              <span className="text-3xl" aria-hidden>
                {c.emoji}
              </span>
              <span className="font-serif text-xl font-semibold text-foreground">
                {c.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
