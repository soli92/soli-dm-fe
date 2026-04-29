import Link from "next/link";
import { SoliBrandLogo } from "@/components/brand/SoliBrandLogo";
import {
  appBody,
  appBodySmall,
  appDisplay,
  appHeadline,
  appListItem,
  appMuted,
  appPageShellWide,
  appPanelStack,
  appSectionLabel,
  appTitle,
} from "@/lib/ui-classes";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-muted/40"
        aria-hidden
      />
      <div className={cn("relative", appPageShellWide)}>
        <div className="mb-14 text-center md:mb-20">
          <p className={cn(appSectionLabel, "mb-3")}>Strumenti per il tavolo</p>
          <h1
            className={cn(
              appDisplay,
              "mb-6 flex flex-wrap items-center justify-center gap-4 md:gap-6"
            )}
          >
            <SoliBrandLogo
              decorative
              className="h-16 w-auto drop-shadow-lg motion-safe:transition-transform md:h-24"
            />
            <span>Soli Dungeon Master</span>
          </h1>
          <p className={cn(appBody, "mx-auto mb-10 max-w-2xl text-muted-foreground md:text-xl")}>
            Campagne, personaggi, dadi e wiki in un&apos;unica interfaccia chiara e
            accessibile.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/campaigns"
              className={cn(
                "inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25",
                "transition-[transform,box-shadow] hover:bg-primary/90 hover:shadow-xl",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "motion-safe:active:scale-[0.98]"
              )}
            >
              Inizia una campagna
            </Link>
            <Link
              href="/wiki"
              className={cn(
                "inline-flex min-h-12 items-center justify-center rounded-full border-2 border-primary px-8 text-base font-semibold text-primary",
                "shadow-sm transition-colors hover:bg-primary/10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
            >
              Esplora il wiki
            </Link>
          </div>
        </div>

        <div className="mb-14 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { emoji: "⚔️", title: "Campagne", desc: "Crea e organizza le sessioni" },
            { emoji: "👤", title: "Personaggi", desc: "Schede con classe e razza" },
            { emoji: "🎯", title: "Dadi", desc: "Lanci e storico per campagna" },
            { emoji: "📖", title: "Wiki", desc: "Classi, razze, divinità, regole" },
          ].map((card) => (
            <div key={card.title} className={appPanelStack}>
              <span className="text-3xl leading-none" aria-hidden>
                {card.emoji}
              </span>
              <h2 className={appTitle}>{card.title}</h2>
              <p className={cn(appBodySmall, "leading-relaxed")}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div>
          <p className={cn(appSectionLabel, "mb-4 text-center sm:text-left")}>
            Accesso rapido
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            <Link
              href="/campaigns"
              className={cn(appListItem, "flex flex-col gap-2 p-8 text-center")}
            >
              <h2 className={appHeadline}>Le mie campagne</h2>
              <p className={cn(appMuted, "text-sm leading-relaxed")}>
                Elenco e dettaglio campagne
              </p>
            </Link>
            <Link
              href="/characters"
              className={cn(appListItem, "flex flex-col gap-2 p-8 text-center")}
            >
              <h2 className={appHeadline}>I miei personaggi</h2>
              <p className={cn(appMuted, "text-sm leading-relaxed")}>
                Crea e filtra per campagna
              </p>
            </Link>
            <Link
              href="/dice-roller"
              className={cn(appListItem, "flex flex-col gap-2 p-8 text-center")}
            >
              <h2 className={appHeadline}>Lancia dadi</h2>
              <p className={cn(appMuted, "text-sm leading-relaxed")}>
                Notazione NdX e cronologia
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
