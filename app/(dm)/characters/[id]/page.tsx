"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CharacterTabsFields } from "@/components/character/CharacterTabsFields";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCharacter, updateCharacter } from "@/lib/api";
import {
  defaultAbilityStats,
  emptySheetData,
  normalizeCharacterStats,
  normalizeSheetData,
} from "@/lib/character-sheet";
import {
  DND_ALIGNMENTS,
  PLAYBOOK_CLASS_NAMES,
  PLAYBOOK_RACE_NAMES,
} from "@/lib/tipologiche";
import type { Character, CharacterSheetData } from "@/lib/types";
import {
  appLinkBack,
  appMuted,
  appPageShellWide,
  appPageTitle,
  appPanelStack,
  appSelectField,
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

  const classTabTop =
    draft == null ? null : (
      <>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          Classe
          <select
            className={appSelectField}
            value={draft.class_name}
            onChange={(e) =>
              setDraft((d) => (d ? { ...d, class_name: e.target.value } : d))
            }
            aria-label="Classe del personaggio"
          >
            {!PLAYBOOK_CLASS_NAMES.includes(
              draft.class_name as (typeof PLAYBOOK_CLASS_NAMES)[number]
            ) ? (
              <option value={draft.class_name}>{draft.class_name}</option>
            ) : null}
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
            value={draft.race}
            onChange={(e) =>
              setDraft((d) => (d ? { ...d, race: e.target.value } : d))
            }
            aria-label="Razza del personaggio"
          >
            {!PLAYBOOK_RACE_NAMES.includes(
              draft.race as (typeof PLAYBOOK_RACE_NAMES)[number]
            ) ? (
              <option value={draft.race}>{draft.race}</option>
            ) : null}
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
            value={draft.alignment}
            onChange={(e) =>
              setDraft((d) => (d ? { ...d, alignment: e.target.value } : d))
            }
            aria-label="Allineamento"
          >
            {!DND_ALIGNMENTS.includes(
              draft.alignment as (typeof DND_ALIGNMENTS)[number]
            ) ? (
              <option value={draft.alignment}>{draft.alignment}</option>
            ) : null}
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
          value={draft.level}
          onChange={(e) =>
            setDraft((d) => (d ? { ...d, level: e.target.value } : d))
          }
        />
      </>
    );

  return (
    <main className={appPageShellWide}>
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2">
          <Link href={listHref} className={appLinkBack}>
            ← Torna ai personaggi
          </Link>
          {loading ? (
            <h1 className={appPageTitle}>Caricamento…</h1>
          ) : draft ? (
            <h1 className={appPageTitle}>{draft.character_name}</h1>
          ) : (
            <h1 className={appPageTitle}>Personaggio</h1>
          )}
        </div>

        {loading ? (
          <p className={appMuted}>Caricamento scheda…</p>
        ) : !draft ? (
          <p className={appMuted}>
            Impossibile caricare il personaggio. Verifica l’URL o torna alla
            lista.
          </p>
        ) : (
          <form onSubmit={handleSave} className={appPanelStack}>
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
              />
            </div>

            <CharacterTabsFields
              stats={draft.stats}
              onChangeStat={(key, value) =>
                setDraft((d) =>
                  d ? { ...d, stats: { ...d.stats, [key]: value } } : d
                )
              }
              sheet={draft.sheet_data}
              patchSheet={patchSheet}
              classTabTop={classTabTop}
              background={draft.background}
              onBackgroundChange={(background) =>
                setDraft((d) => (d ? { ...d, background } : d))
              }
            />

            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={saving}>
                {saving ? "Salvataggio…" : "Salva modifiche"}
              </Button>
              <Link
                href={listHref}
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  saving && "pointer-events-none opacity-50"
                )}
              >
                Annulla
              </Link>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
