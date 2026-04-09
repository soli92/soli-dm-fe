"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCampaigns, getCharacters, createCharacter } from "@/lib/api";
import type { Campaign, Character } from "@/lib/types";
import {
  DND_ALIGNMENTS,
  PLAYBOOK_RACE_NAMES,
  SRD_CLASS_NAMES,
} from "@/lib/tipologiche";
import {
  appMuted,
  appPageShell,
  appPageTitle,
  appPanelStack,
  appSelectField,
  appTitle,
} from "@/lib/ui-classes";
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
    class_name: "Fighter" as (typeof SRD_CLASS_NAMES)[number],
    race: "Human" as (typeof PLAYBOOK_RACE_NAMES)[number],
    player_name: "",
    level: "1",
    alignment: "Neutral" as (typeof DND_ALIGNMENTS)[number],
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
        class_name: form.class_name,
        race: form.race,
        player_name: form.player_name.trim() || null,
        level: parseInt(form.level, 10) || 1,
        alignment: form.alignment,
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

  return (
    <main className={appPageShell}>
      <div className="space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className={appPageTitle}>Personaggi</h1>
          <Link
            href="/campaigns"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Gestisci campagne
          </Link>
        </div>

        <section className={appPanelStack}>
          <h2 className={appTitle}>Filtra per campagna</h2>
          <select
            value={campaignId}
            onChange={(e) => setCampaignId(e.target.value)}
            className={appSelectField}
            aria-label="Filtra personaggi per campagna"
          >
            <option value="">Tutte le campagne</option>
            {campaigns.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </section>

        <section className={appPanelStack}>
          <h2 className={appTitle}>Nuovo personaggio</h2>
          <form onSubmit={handleCreate} className="flex flex-col gap-4">
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
            <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
              Classe
              <select
                className={appSelectField}
                value={form.class_name}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    class_name: e.target.value as (typeof SRD_CLASS_NAMES)[number],
                  }))
                }
                aria-label="Classe del personaggio"
              >
                {SRD_CLASS_NAMES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
              Razza
              <select
                className={appSelectField}
                value={form.race}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    race: e.target.value as (typeof PLAYBOOK_RACE_NAMES)[number],
                  }))
                }
                aria-label="Razza del personaggio"
              >
                {PLAYBOOK_RACE_NAMES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
              Allineamento
              <select
                className={appSelectField}
                value={form.alignment}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    alignment: e.target.value as (typeof DND_ALIGNMENTS)[number],
                  }))
                }
                aria-label="Allineamento"
              >
                {DND_ALIGNMENTS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </label>
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
          <h2 className={`${appTitle} mb-4`}>Lista</h2>
          {loading ? (
            <p className={appMuted}>Caricamento…</p>
          ) : list.length === 0 ? (
            <p className={appMuted}>Nessun personaggio.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {list.map((ch) => (
                <li
                  key={ch.id}
                  className="rounded-2xl border border-border/80 bg-card p-4 text-card-foreground shadow-sm"
                >
                  <span className="font-semibold">{ch.character_name}</span>
                  <span className={`${appMuted} block text-sm leading-relaxed`}>
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
        <main className={appPageShell}>
          <p className={appMuted}>Caricamento…</p>
        </main>
      }
    >
      <CharactersContent />
    </Suspense>
  );
}
