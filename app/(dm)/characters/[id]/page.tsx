"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CharacterIdentityPanel } from "@/components/character/CharacterIdentityPanel";
import { CharacterTabsFields } from "@/components/character/CharacterTabsFields";
import { Button, buttonVariants } from "@/components/ui/button";
import { FullScreenLoader } from "@/components/ui/full-screen-loader";
import { Input } from "@/components/ui/input";
import { getCharacter, updateCharacter } from "@/lib/api";
import {
  defaultAbilityStats,
  emptySheetData,
  normalizeCharacterStats,
  normalizeSheetData,
} from "@/lib/character-sheet";
import type { Character, CharacterSheetData } from "@/lib/types";
import {
  appFormControl,
  appLinkBack,
  appMuted,
  appPageShellCharacter,
  appPageTitle,
  appPanelStack,
  appTitle,
} from "@/lib/ui-classes";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Draft = {
  campaign_id: string;
  character_name: string;
  player_name: string;
  class_name: string;
  race: string;
  level: string;
  alignment: string;
  background: string;
  stats: ReturnType<typeof defaultAbilityStats>;
  sheet_data: CharacterSheetData;
};

function draftFromCharacter(ch: Character): Draft {
  return {
    campaign_id: ch.campaign_id,
    character_name: ch.character_name,
    player_name: ch.player_name ?? "",
    class_name: ch.class_name,
    race: ch.race,
    level: String(ch.level),
    alignment: ch.alignment,
    background: ch.background ?? "",
    stats: normalizeCharacterStats(ch.stats),
    sheet_data: normalizeSheetData(ch.sheet_data),
  };
}

export default function CharacterDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const ch = await getCharacter(id);
      setDraft(draftFromCharacter(ch));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Personaggio non trovato");
      setDraft(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  function patchSheet(patch: Partial<CharacterSheetData>) {
    setDraft((d) =>
      d
        ? {
            ...d,
            sheet_data: { ...emptySheetData(), ...d.sheet_data, ...patch },
          }
        : d
    );
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!draft || !id) return;
    if (!draft.character_name.trim()) {
      toast.error("Nome personaggio obbligatorio.");
      return;
    }
    setSaving(true);
    try {
      await updateCharacter(id, {
        character_name: draft.character_name.trim(),
        player_name: draft.player_name.trim() || null,
        class_name: draft.class_name,
        race: draft.race,
        level: parseInt(draft.level, 10) || 1,
        alignment: draft.alignment,
        background: draft.background.trim() || null,
        stats: draft.stats,
        sheet_data: draft.sheet_data,
      });
      toast.success("Scheda salvata.");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore salvataggio");
    } finally {
      setSaving(false);
    }
  }

  const listHref =
    draft?.campaign_id != null
      ? `/characters?campaign_id=${encodeURIComponent(draft.campaign_id)}`
      : "/characters";

  const showContent = !loading && draft != null;

  return (
    <>
      <FullScreenLoader
        show={loading}
        label="Caricamento scheda personaggio…"
      />
      <main
        className={cn(
          appPageShellCharacter,
          loading && "pointer-events-none invisible"
        )}
        aria-hidden={loading}
      >
        <div className="mx-auto w-full max-w-full space-y-8">
          <div className="space-y-2">
            <Link href={listHref} className={appLinkBack}>
              ← Torna ai personaggi
            </Link>
            {draft ? (
              <h1 className={appPageTitle}>{draft.character_name}</h1>
            ) : !loading ? (
              <h1 className={appPageTitle}>Personaggio</h1>
            ) : (
              <h1 className={appPageTitle}>Scheda</h1>
            )}
          </div>

          {!loading && !draft ? (
            <p className={appMuted}>
              Impossibile caricare il personaggio. Verifica l’URL o torna alla
              lista.
            </p>
          ) : null}

          {showContent ? (
            <form
              onSubmit={handleSave}
              className={cn(
                appPanelStack,
                "border-primary/15 shadow-lg shadow-primary/5"
              )}
            >
              <h2 className={appTitle}>Scheda personaggio</h2>

              <div className="space-y-4 rounded-xl border border-border/60 bg-muted/15 p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Anagrafica
                </p>
                <Input
                  label="Nome personaggio"
                  value={draft.character_name}
                  onChange={(e) =>
                    setDraft((d) =>
                      d ? { ...d, character_name: e.target.value } : d
                    )
                  }
                  className={appFormControl}
                  required
                />
                <Input
                  label="Giocatore (opzionale)"
                  value={draft.player_name}
                  onChange={(e) =>
                    setDraft((d) =>
                      d ? { ...d, player_name: e.target.value } : d
                    )
                  }
                  className={appFormControl}
                />
              </div>

              <CharacterIdentityPanel
                class_name={draft.class_name}
                onClassNameChange={(v) =>
                  setDraft((d) => (d ? { ...d, class_name: v } : d))
                }
                race={draft.race}
                onRaceChange={(v) =>
                  setDraft((d) => (d ? { ...d, race: v } : d))
                }
                subclass={draft.sheet_data.subclass ?? ""}
                onSubclassChange={(v) => patchSheet({ subclass: v })}
                alignment={draft.alignment}
                onAlignmentChange={(v) =>
                  setDraft((d) => (d ? { ...d, alignment: v } : d))
                }
                level={draft.level}
                onLevelChange={(v) =>
                  setDraft((d) => (d ? { ...d, level: v } : d))
                }
                multiclass_class={draft.sheet_data.multiclass_class ?? ""}
                onMulticlassClassChange={(v) =>
                  patchSheet({ multiclass_class: v })
                }
                multiclass_level={draft.sheet_data.multiclass_level ?? ""}
                onMulticlassLevelChange={(v) =>
                  patchSheet({ multiclass_level: v })
                }
              />

              <CharacterTabsFields
                stats={draft.stats}
                onChangeStat={(key, value) =>
                  setDraft((d) =>
                    d ? { ...d, stats: { ...d.stats, [key]: value } } : d
                  )
                }
                sheet={draft.sheet_data}
                patchSheet={patchSheet}
                race={draft.race}
                characterClass={draft.class_name}
                background={draft.background}
                onBackgroundChange={(background) =>
                  setDraft((d) => (d ? { ...d, background } : d))
                }
              />

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  type="submit"
                  disabled={saving}
                  className="min-h-12 w-full touch-manipulation sm:min-h-10 sm:w-auto"
                >
                  {saving ? "Salvataggio…" : "Salva modifiche"}
                </Button>
                <Link
                  href={listHref}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "default" }),
                    "inline-flex min-h-12 w-full items-center justify-center touch-manipulation sm:min-h-10 sm:w-auto",
                    saving && "pointer-events-none opacity-50"
                  )}
                >
                  Annulla
                </Link>
              </div>
            </form>
          ) : null}
        </div>
      </main>
    </>
  );
}
