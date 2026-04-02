"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCampaigns, getCharacters, createCharacter } from "@/lib/api";
import type { Campaign, Character } from "@/lib/types";
import { appMuted, appPageTitle, appPanel } from "@/lib/ui-classes";
import { toast } from "sonner";

function CharactersContent() {
  const searchParams = useSearchParams();
  const initialCampaign = searchParams.get("campaign_id") || "";

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [campaignId, setCampaignId] = useState(initialCampaign);
  const [list, setList] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    character_name: "",
    class_name: "Fighter",
    race: "Human",
    player_name: "",
    level: "1",
  });

  useEffect(() => {
    const q = searchParams.get("campaign_id");
    if (q) setCampaignId(q);
  }, [searchParams]);

  useEffect(() => {
    void (async () => {
      try {
        const data = await getCampaigns();
        setCampaigns(data);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Errore campagne");
      }
    })();
  }, []);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      try {
        const data = await getCharacters(campaignId || undefined);
        setList(data);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Errore personaggi");
      } finally {
        setLoading(false);
      }
    })();
  }, [campaignId]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!campaignId) {
      toast.error("Seleziona o crea prima una campagna.");
      return;
    }
    if (!form.character_name.trim()) {
      toast.error("Nome personaggio obbligatorio.");
      return;
    }
    setSaving(true);
    try {
      await createCharacter({
        campaign_id: campaignId,
        character_name: form.character_name.trim(),
        class_name: form.class_name.trim(),
        race: form.race.trim(),
        player_name: form.player_name.trim() || null,
        level: parseInt(form.level, 10) || 1,
      });
      toast.success("Personaggio creato.");
      setForm((f) => ({
        ...f,
        character_name: "",
        player_name: "",
      }));
      const refreshed = await getCharacters(campaignId || undefined);
      setList(refreshed);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore creazione");
    } finally {
      setSaving(false);
    }
  }

  const selectClass =
    "w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <main className="px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h1 className={appPageTitle}>Personaggi</h1>
          <Link
            href="/campaigns"
            className="text-sm text-primary hover:underline font-medium"
          >
            Gestisci campagne
          </Link>
        </div>

        <section className={`${appPanel} space-y-4`}>
          <h2 className="text-lg font-semibold font-serif text-foreground">
            Filtra per campagna
          </h2>
          <select
            value={campaignId}
            onChange={(e) => setCampaignId(e.target.value)}
            className={selectClass}
          >
            <option value="">Tutte le campagne</option>
            {campaigns.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </section>

        <section className={`${appPanel} space-y-4`}>
          <h2 className="text-lg font-semibold font-serif text-foreground">
            Nuovo personaggio
          </h2>
          <form onSubmit={handleCreate} className="space-y-3">
            <Input
              label="Nome personaggio"
              value={form.character_name}
              onChange={(e) =>
                setForm((f) => ({ ...f, character_name: e.target.value }))
              }
              required
            />
            <Input
              label="Giocatore (opzionale)"
              value={form.player_name}
              onChange={(e) =>
                setForm((f) => ({ ...f, player_name: e.target.value }))
              }
            />
            <Input
              label="Classe"
              value={form.class_name}
              onChange={(e) =>
                setForm((f) => ({ ...f, class_name: e.target.value }))
              }
            />
            <Input
              label="Razza"
              value={form.race}
              onChange={(e) => setForm((f) => ({ ...f, race: e.target.value }))}
            />
            <Input
              label="Livello"
              type="number"
              min={1}
              max={20}
              value={form.level}
              onChange={(e) => setForm((f) => ({ ...f, level: e.target.value }))}
            />
            <Button type="submit" disabled={saving || !campaignId}>
              {saving ? "Salvataggio…" : "Crea personaggio"}
            </Button>
          </form>
        </section>

        <section>
          <h2 className="text-lg font-semibold font-serif mb-3 text-foreground">
            Lista
          </h2>
          {loading ? (
            <p className={appMuted}>Caricamento…</p>
          ) : list.length === 0 ? (
            <p className={appMuted}>Nessun personaggio.</p>
          ) : (
            <ul className="space-y-2">
              {list.map((ch) => (
                <li
                  key={ch.id}
                  className="rounded-lg border border-border bg-card p-4 text-card-foreground"
                >
                  <span className="font-semibold">{ch.character_name}</span>
                  <span className={`${appMuted} text-sm block`}>
                    {ch.class_name} {ch.race} · liv. {ch.level}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default function CharactersPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-8 text-muted-foreground">Caricamento…</div>
      }
    >
      <CharactersContent />
    </Suspense>
  );
}
