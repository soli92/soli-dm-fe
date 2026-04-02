import Link from "next/link";
import { Button } from "@/components/ui/button";
import { appListItem, appMuted, appPageTitle, appPanel } from "@/lib/ui-classes";

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
            className={`${appPageTitle} text-4xl md:text-6xl mb-4 flex flex-wrap items-center justify-center gap-3 md:gap-4`}
          >
            <span className="text-5xl md:text-7xl" aria-hidden>
              🎲
            </span>
            Soli Dungeon Master
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            { emoji: "⚔️", title: "Campagne", desc: "Crea e gestisci le tue campagne D&D" },
            { emoji: "👤", title: "Personaggi", desc: "Scheda personaggi con classe e razza" },
            { emoji: "🎯", title: "Dadi", desc: "Lancia dadi e storico per campagna" },
            { emoji: "📖", title: "Wiki", desc: "Classi, razze, divinità e regole" },
          ].map((card) => (
            <div key={card.title} className={appPanel}>
              <div className="text-3xl mb-2" aria-hidden>
                {card.emoji}
              </div>
              <h3 className="text-xl font-bold font-serif mb-2 text-foreground">{card.title}</h3>
              <p className={`${appMuted} text-sm`}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Link href="/campaigns" className={appListItem + " text-center p-8"}>
            <h2 className="text-2xl font-bold font-serif mb-3 text-foreground">Le mie campagne</h2>
            <p className={appMuted}>Visualizza e gestisci le tue campagne</p>
          </Link>
          <Link href="/characters" className={appListItem + " text-center p-8"}>
            <h2 className="text-2xl font-bold font-serif mb-3 text-foreground">I miei personaggi</h2>
            <p className={appMuted}>Gestisci i tuoi personaggi</p>
          </Link>
          <Link href="/dice-roller" className={appListItem + " text-center p-8"}>
            <h2 className="text-2xl font-bold font-serif mb-3 text-foreground">Lancia dadi</h2>
            <p className={appMuted}>Simulatore di lancio dadi</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
