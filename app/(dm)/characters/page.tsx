"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CharacterIdentityPanel } from "@/components/character/CharacterIdentityPanel";
import { CharacterTabsFields } from "@/components/character/CharacterTabsFields";
import { Button } from "@/components/ui/button";
import { FullScreenLoader } from "@/components/ui/full-screen-loader";
import { Input } from "@/components/ui/input";
import { getCampaigns, getCharacters, createCharacter } from "@/lib/api";
import {
  defaultAbilityStats,
  emptySheetData,
} from "@/lib/character-sheet";
import type { Campaign, Character, CharacterSheetData } from "@/lib/types";
import {
  appFormControl,
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
  const [campaignsBusy, setCampaignsBusy] = useState(true);
  const [listBusy, setListBusy] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    character_name: "",
    class_name: "Fighter",
    race: "Human",
    player_name: "",
    level: "1",
    alignment: "Neutral",
    background: "",
    stats: defaultAbilityStats(),
    sheet_data: emptySheetData(),
  });

  const dataLoading = campaignsBusy || listBusy;

  useEffect(() => {
    const q = searchParams.get("campaign_id");
    if (q) setCampaignId(q);
  }, [searchParams]);

  useEffect(() => {
    setCampaignsBusy(true);
    void (async () => {
      try {
        const data = await getCampaigns();
        setCampaigns(data);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Errore campagne");
      } finally {
        setCampaignsBusy(false);
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
    setListBusy(true);
    void (async () => {
      try {
        const data = await getCharacters(campaignId || undefined);
        setList(data);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Errore personaggi");
      } finally {
        setListBusy(false);
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
        class_name: "Fighter",
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

  const campaignTopSlot = (
    <>
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
          Con «Tutte» (nessuna scelta) puoi solo sfogliare l’elenco; per creare
          serve una campagna.
        </span>
      </label>
      <Input
        label="Nome personaggio"
        value={form.character_name}
        onChange={(e) =>
          setForm((f) => ({ ...f, character_name: e.target.value }))
        }
        className={appFormControl}
        required
      />
      <Input
        label="Giocatore (opzionale)"
        value={form.player_name}
        onChange={(e) =>
          setForm((f) => ({ ...f, player_name: e.target.value }))
        }
        className={appFormControl}
      />
    </>
  );

  return (
    <>
      <FullScreenLoader
        show={dataLoading}
        label="Caricamento campagne e personaggi…"
      />
      <main
        className={cn(appPageShell, dataLoading && "invisible")}
        aria-hidden={dataLoading}
      >
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

          <section
            className={cn(
              appPanelStack,
              "border-primary/15 shadow-lg shadow-primary/5"
            )}
          >
            <h2 className={appTitle}>Nuovo personaggio</h2>
            <p className={`${appMuted} text-sm leading-relaxed`}>
              Compila identità e statistiche; i dati estesi sono salvati nella
              scheda JSON sul server. La lista in basso si aggiorna in base alla
              campagna selezionata.
            </p>
            {campaigns.length === 0 && !campaignsBusy ? (
              <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-foreground">
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
              <CharacterIdentityPanel
                topSlot={campaignTopSlot}
                class_name={form.class_name}
                onClassNameChange={(v) =>
                  setForm((f) => ({ ...f, class_name: v }))
                }
                race={form.race}
                onRaceChange={(v) => setForm((f) => ({ ...f, race: v }))}
                subclass={form.sheet_data.subclass ?? ""}
                onSubclassChange={(v) => patchSheet({ subclass: v })}
                alignment={form.alignment}
                onAlignmentChange={(v) =>
                  setForm((f) => ({ ...f, alignment: v }))
                }
                level={form.level}
                onLevelChange={(v) => setForm((f) => ({ ...f, level: v }))}
                multiclass_class={form.sheet_data.multiclass_class ?? ""}
                onMulticlassClassChange={(v) =>
                  patchSheet({ multiclass_class: v })
                }
                multiclass_level={form.sheet_data.multiclass_level ?? ""}
                onMulticlassLevelChange={(v) =>
                  patchSheet({ multiclass_level: v })
                }
              />

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
                race={form.race}
                characterClass={form.class_name}
                background={form.background}
                onBackgroundChange={(background) =>
                  setForm((f) => ({ ...f, background }))
                }
              />

              <Button
                type="submit"
                disabled={saving || !campaignId}
                className="min-h-12 w-full touch-manipulation sm:min-h-10 sm:w-auto"
              >
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
                    campaigns.find((c) => c.id === campaignId)?.name ??
                    "campagna"
                  }`
                : "Personaggi — tutte le campagne"}
            </h2>
            {listBusy && !dataLoading ? (
              <p className={appMuted}>Aggiornamento elenco…</p>
            ) : list.length === 0 ? (
              <p className={appMuted}>Nessun personaggio.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {list.map((ch) => (
                  <li key={ch.id}>
                    <Link
                      href={`/characters/${ch.id}`}
                      className={cn(
                        appListItem,
                        "no-underline ring-1 ring-transparent hover:ring-primary/25"
                      )}
                    >
                      <span className="font-semibold text-foreground">
                        {ch.character_name}
                      </span>
                      <span
                        className={`${appMuted} block text-sm leading-relaxed`}
                      >
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
    </>
  );
}

export default function CharactersPage() {
  return (
    <Suspense
      fallback={
        <>
          <FullScreenLoader show label="Caricamento…" />
          <main className={cn(appPageShell, "invisible")} aria-hidden />
        </>
      }
    >
      <CharactersContent />
    </Suspense>
  );
}
