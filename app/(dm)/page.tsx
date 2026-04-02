import Link from "next/link";
import { Button } from "@/components/ui/button";
import { D20Icon } from "@/components/brand/D20Icon";
import { appListItem, appMuted, appPageTitle, appPanelStack } from "@/lib/ui-classes";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-muted/30"
        aria-hidden
      />
      <div className="container relative mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-14 md:mb-16">
          <h1
            className={`${appPageTitle} mb-4 flex flex-wrap items-center justify-center gap-4 text-4xl md:gap-5 md:text-6xl`}
          >
            <D20Icon
              decorative
              className="h-16 w-16 drop-shadow-md md:h-24 md:w-24"
            />
            <span>Soli Dungeon Master</span>
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Gestisci le tue campagne D&amp;D, personaggi, regole e wiki in un unico posto
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/campaigns">
              <Button size="lg" className="text-lg px-8">
                Inizia una campagna
              </Button>
            </Link>
            <Link href="/wiki">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Esplora il wiki
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { emoji: "⚔️", title: "Campagne", desc: "Crea e gestisci le tue campagne D&D" },
            { emoji: "👤", title: "Personaggi", desc: "Scheda personaggi con classe e razza" },
            { emoji: "🎯", title: "Dadi", desc: "Lancia dadi e storico per campagna" },
            { emoji: "📖", title: "Wiki", desc: "Classi, razze, divinità e regole" },
          ].map((card) => (
            <div key={card.title} className={appPanelStack}>
              <div className="text-3xl leading-none" aria-hidden>
                {card.emoji}
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground">
                {card.title}
              </h3>
              <p className={`${appMuted} text-sm leading-relaxed`}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Link
            href="/campaigns"
            className={`${appListItem} flex flex-col gap-3 p-8 text-center`}
          >
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Le mie campagne
            </h2>
            <p className={`${appMuted} text-sm leading-relaxed`}>
              Visualizza e gestisci le tue campagne
            </p>
          </Link>
          <Link
            href="/characters"
            className={`${appListItem} flex flex-col gap-3 p-8 text-center`}
          >
            <h2 className="font-serif text-2xl font-bold text-foreground">
              I miei personaggi
            </h2>
            <p className={`${appMuted} text-sm leading-relaxed`}>
              Gestisci i tuoi personaggi
            </p>
          </Link>
          <Link
            href="/dice-roller"
            className={`${appListItem} flex flex-col gap-3 p-8 text-center`}
          >
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Lancia dadi
            </h2>
            <p className={`${appMuted} text-sm leading-relaxed`}>
              Simulatore di lancio dadi
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
