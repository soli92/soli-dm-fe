import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-20">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-4 flex items-center justify-center gap-4">
              <span className="text-7xl">🎲</span>
              Soli Dungeon Master
            </h1>
            <p className="text-2xl text-slate-300 mb-8">
              Gestisci le tue campagne D&D, personaggi, regole e wiki in un unico posto
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/campaigns">
                <Button size="lg" className="text-lg px-8">
                  Inizia una Campagna
                </Button>
              </Link>
              <Link href="/wiki">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Esplora il Wiki
                </Button>
              </Link>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 hover:border-blue-500 transition">
              <div className="text-3xl mb-2">⚔️</div>
              <h3 className="text-xl font-bold mb-2">Campagne</h3>
              <p className="text-slate-300 text-sm">
                Crea e gestisci le tue campagne D&D con facilità
              </p>
            </div>

            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 hover:border-blue-500 transition">
              <div className="text-3xl mb-2">👤</div>
              <h3 className="text-xl font-bold mb-2">Personaggi</h3>
              <p className="text-slate-300 text-sm">
                Crea e personalizza i tuoi personaggi D&D
              </p>
            </div>

            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 hover:border-blue-500 transition">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="text-xl font-bold mb-2">Simulatore Dadi</h3>
              <p className="text-slate-300 text-sm">
                Lancia dadi e tieni traccia dei tuoi tiri
              </p>
            </div>

            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 hover:border-blue-500 transition">
              <div className="text-3xl mb-2">📖</div>
              <h3 className="text-xl font-bold mb-2">Wiki D&D</h3>
              <p className="text-slate-300 text-sm">
                Accedi alle regole, classi, razze e divinità D&D
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Link href="/campaigns">
              <div className="bg-slate-700 rounded-lg p-8 border border-slate-600 hover:border-green-500 transition cursor-pointer text-center">
                <h2 className="text-2xl font-bold mb-3">Le Mie Campagne</h2>
                <p className="text-slate-300">Visualizza e gestisci le tue campagne</p>
              </div>
            </Link>

            <Link href="/characters">
              <div className="bg-slate-700 rounded-lg p-8 border border-slate-600 hover:border-purple-500 transition cursor-pointer text-center">
                <h2 className="text-2xl font-bold mb-3">I Miei Personaggi</h2>
                <p className="text-slate-300">Gestisci i tuoi personaggi</p>
              </div>
            </Link>

            <Link href="/dice-roller">
              <div className="bg-slate-700 rounded-lg p-8 border border-slate-600 hover:border-red-500 transition cursor-pointer text-center">
                <h2 className="text-2xl font-bold mb-3">Lancia Dadi</h2>
                <p className="text-slate-300">Simulatore di lancio dadi</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
