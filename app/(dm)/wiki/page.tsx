import Link from "next/link";
import { appMuted, appPageTitle, appPanel } from "@/lib/ui-classes";

export default function WikiHomePage() {
  const cards = [
    { href: "/wiki/classes", title: "Classi", emoji: "⚔️" },
    { href: "/wiki/races", title: "Razze", emoji: "🧝" },
    { href: "/wiki/deities", title: "Divinità", emoji: "✨" },
    { href: "/wiki/rules", title: "Regole", emoji: "📜" },
  ];

  return (
    <main className="px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className={appPageTitle}>Wiki D&amp;D 5e</h1>
        <p className={appMuted}>
          Contenuti di riferimento serviti dall&apos;API backend (dati statici nel server).
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className={`${appPanel} block no-underline hover:no-underline transition-colors hover:border-primary/40`}
            >
              <span className="text-3xl mr-2" aria-hidden>
                {c.emoji}
              </span>
              <span className="text-xl font-semibold font-serif text-foreground">{c.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
