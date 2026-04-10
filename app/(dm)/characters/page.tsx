"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CharacterTabsFields } from "@/components/character/CharacterTabsFields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCampaigns, getCharacters, createCharacter } from "@/lib/api";
import {
  defaultAbilityStats,
  emptySheetData,
} from "@/lib/character-sheet";
import type { Campaign, Character, CharacterSheetData } from "@/lib/types";
import {
  DND_ALIGNMENTS,
  PLAYBOOK_CLASS_NAMES,
  PLAYBOOK_RACE_NAMES,
} from "@/lib/tipologiche";
import {
  appListItem,
  appMuted,
  appPageShell,
  appPageTitle,
  appPanelStack,
  appSelectField,
  appTitle,
} from "@/lib/ui-classes";
import { cn } from "@/lib/utils";
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
    class_name: "Fighter" as (typeof PLAYBOOK_CLASS_NAMES)[number],
    race: "Human" as (typeof PLAYBOOK_RACE_NAMES)[number],
    player_name: "",
    level: "1",
    alignment: "Neutral" as (typeof DND_ALIGNMENTS)[number],
    background: "",
    stats: defaultAbilityStats(),
    sheet_data: emptySheetData(),
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
    if (campaigns.length !== 1) return;
    const only = campaigns[0]?.id;
    if (!only) return;
    setCampaignId((prev) => (prev ? prev : only));
  }, [campaigns]);

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

  function patchSheet(patch: Partial<CharacterSheetData>) {
    setForm((f) => ({
      ...f,
      sheet_data: { ...emptySheetData(), ...f.sheet_data, ...patch },
    }));
  }

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
        background: form.background.trim() || null,
        stats: form.stats,
        sheet_data: form.sheet_data,
      });
      toast.success("Personaggio creato.");
      setForm({
        character_name: "",
        class_name: "Fighter" as (typeof PLAYBOOK_CLASS_NAMES)[number],
        race: "Human",
        player_name: "",
        level: "1",
        alignment: "Neutral",
        background: "",
        stats: defaultAbilityStats(),
        sheet_data: emptySheetData(),
      });
      const refreshed = await getCharacters(campaignId || undefined);
      setList(refreshed);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore creazione");
    } finally {
      setSaving(false);
    }
  }

  const classTabTop = (
    <>
      <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
        Classe
        <select
          className={appSelectField}
          value={form.class_name}
          onChange={(e) =>
              setForm((f) => ({
                    ...f,
                    class_name: e.target.value as (typeof PLAYBOOK_CLASS_NAMES)[number],
                  }))
                }
                aria-label="Classe del personaggio"
              >
                {PLAYBOOK_CLASS_NAMES.map((c) => (
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
    </>
  );

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
          <h2 className={appTitle}>Nuovo personaggio</h2>
          <p className={`${appMuted} text-sm`}>
            Ogni personaggio è legato a una campagna. Compila le schede qui
            sotto; la lista in fondo usa la stessa campagna selezionata.
          </p>
          {campaigns.length === 0 ? (
            <p className="rounded-lg border border-border/80 bg-muted/40 px-4 py-3 text-sm text-foreground">
              Non hai ancora campagne.{" "}
              <Link
                href="/campaigns"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                Crea una campagna
              </Link>{" "}
              e torna qui per aggiungere personaggi.
            </p>
          ) : null}
          <form onSubmit={handleCreate} className="flex flex-col gap-6">
            <div className="space-y-4 rounded-xl border border-border/60 bg-muted/15 p-4 sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Anagrafica
              </p>
              <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
                Campagna <span className="text-destructive">*</span>
                <select
                  value={campaignId}
                  onChange={(e) => setCampaignId(e.target.value)}
                  className={appSelectField}
                  aria-label="Campagna a cui associare il personaggio"
                  aria-required
                >
                  <option value="">— Seleziona una campagna —</option>
                  {campaigns.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <span className="text-xs font-normal text-muted-foreground">
                  Con «Tutte» (nessuna scelta) puoi solo sfogliare l’elenco; per
                  creare serve una campagna.
                </span>
              </label>
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
            </div>

            <CharacterTabsFields
              stats={form.stats}
              onChangeStat={(key, value) =>
                setForm((f) => ({
                  ...f,
                  stats: { ...f.stats, [key]: value },
                }))
              }
              sheet={form.sheet_data}
              patchSheet={patchSheet}
              classTabTop={classTabTop}
              background={form.background}
              onBackgroundChange={(background) =>
                setForm((f) => ({ ...f, background }))
              }
            />

            <Button type="submit" disabled={saving || !campaignId}>
              {saving ? "Salvataggio…" : "Crea personaggio"}
            </Button>
            {!campaignId && campaigns.length > 0 ? (
              <p className="text-sm text-muted-foreground" role="status">
                Seleziona una campagna per abilitare la creazione.
              </p>
            ) : null}
          </form>
        </section>

        <section>
          <h2 className={`${appTitle} mb-4`}>
            {campaignId
              ? `Personaggi — ${
                  campaigns.find((c) => c.id === campaignId)?.name ?? "campagna"
                }`
              : "Personaggi — tutte le campagne"}
          </h2>
          {loading ? (
            <p className={appMuted}>Caricamento…</p>
          ) : list.length === 0 ? (
            <p className={appMuted}>Nessun personaggio.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {list.map((ch) => (
                <li key={ch.id}>
                  <Link
                    href={`/characters/${ch.id}`}
                    className={cn(appListItem, "no-underline")}
                  >
                    <span className="font-semibold text-foreground">
                      {ch.character_name}
                    </span>
                    <span className={`${appMuted} block text-sm leading-relaxed`}>
                      {ch.class_name} {ch.race} · liv. {ch.level}
                    </span>
                    <span
                      className={`${appMuted} mt-1 block text-xs font-medium text-primary`}
                    >
                      Apri scheda →
                    </span>
                  </Link>
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
