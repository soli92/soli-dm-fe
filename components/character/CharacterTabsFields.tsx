"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CHARACTER_ABILITY_KEYS,
  CHARACTER_ABILITY_LABELS_IT,
  abilityModifierFromScore,
  formatAbilityModifier,
  newSessionEntry,
  type CharacterAbilityKey,
} from "@/lib/character-sheet";
import {
  getClassReferenceHint,
  getFixedRacialAbilityBonuses,
  getRacialBonusHints,
} from "@/lib/racial-class-reference";
import type { CharacterGameSession, CharacterSheetData, CharacterStats } from "@/lib/types";
import { appMuted, appSectionLabel } from "@/lib/ui-classes";
import { cn } from "@/lib/utils";

export type CharacterTabsFieldsProps = {
  stats: CharacterStats;
  onChangeStat: (key: CharacterAbilityKey, value: number) => void;
  sheet: CharacterSheetData;
  patchSheet: (patch: Partial<CharacterSheetData>) => void;
  race: string;
  characterClass: string;
  background: string;
  onBackgroundChange: (value: string) => void;
  tabsListClassName?: string;
};

export function CharacterTabsFields({
  stats,
  onChangeStat,
  sheet,
  patchSheet,
  race,
  characterClass,
  background,
  onBackgroundChange,
  tabsListClassName,
}: CharacterTabsFieldsProps) {
  const sessions = sheet.sessions ?? [];
  const racialNumeric = getFixedRacialAbilityBonuses(race);
  const racialLines = getRacialBonusHints(race);
  const classHint = getClassReferenceHint(characterClass);

  function setSessions(next: CharacterGameSession[]) {
    patchSheet({ sessions: next });
  }

  function updateSession(id: string, patch: Partial<CharacterGameSession>) {
    setSessions(
      sessions.map((s) => (s.id === id ? { ...s, ...patch } : s))
    );
  }

  function removeSession(id: string) {
    setSessions(sessions.filter((s) => s.id !== id));
  }

  return (
    <Tabs defaultValue="stats" className="w-full">
      <TabsList
        className={cn(
          "flex h-auto min-h-10 w-full flex-wrap justify-start gap-1.5 rounded-xl border border-border/60 bg-muted/40 p-1.5",
          tabsListClassName
        )}
      >
        <TabsTrigger value="stats" className="rounded-lg">
          Statistiche
        </TabsTrigger>
        <TabsTrigger value="class" className="rounded-lg">
          Bonus e talenti
        </TabsTrigger>
        <TabsTrigger value="armaments" className="rounded-lg">
          Armamenti
        </TabsTrigger>
        <TabsTrigger value="deposit" className="rounded-lg">
          Deposito
        </TabsTrigger>
        <TabsTrigger value="story" className="rounded-lg">
          Storia
        </TabsTrigger>
      </TabsList>

      <TabsContent value="stats" className="space-y-5 pt-4">
        <p className={`${appMuted} text-sm leading-relaxed`}>
          Inserisci i <strong>punteggi finali</strong> in scheda (dopo eventuali bonus di razza).
          Il <strong>modificatore</strong> è calcolato come in D&amp;D 5e: (punteggio − 10) ÷ 2,
          arrotondato per difetto.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {CHARACTER_ABILITY_KEYS.map((key) => {
            const raw = stats[key] ?? 10;
            const mod = abilityModifierFromScore(raw);
            const racial = racialNumeric[key];
            const impliedBase =
              racial != null && racial > 0 ? raw - racial : null;
            return (
              <div
                key={key}
                className="flex flex-col gap-2 rounded-xl border border-border/70 bg-card/80 p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {CHARACTER_ABILITY_LABELS_IT[key]}
                  </span>
                  <span
                    className={cn(
                      "tabular-nums text-lg font-bold tracking-tight text-primary",
                      mod < 0 && "text-amber-700 dark:text-amber-400"
                    )}
                    title="Modificatore da punteggio inserito"
                  >
                    {formatAbilityModifier(mod)}
                  </span>
                </div>
                <Input
                  aria-label={`Punteggio ${CHARACTER_ABILITY_LABELS_IT[key]}`}
                  type="number"
                  min={1}
                  max={30}
                  value={String(raw)}
                  onChange={(e) => {
                    const n = parseInt(e.target.value, 10);
                    onChangeStat(key, Number.isFinite(n) ? n : 10);
                  }}
                  className="font-mono"
                />
                {racial != null && racial > 0 ? (
                  <p className="text-xs text-muted-foreground">
                    Bonus razza SRD tipico su questa caratteristica:{" "}
                    <span className="font-medium text-foreground">
                      +{racial}
                    </span>
                    {impliedBase != null && impliedBase >= 1 ? (
                      <>
                        {" "}
                        · se il totale include già questo bonus, punteggio base
                        sarebbe circa{" "}
                        <span className="font-mono">{impliedBase}</span>
                      </>
                    ) : null}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border/60 bg-muted/25 p-4">
            <p className={appSectionLabel}>Razza — riferimento bonus (SRD)</p>
            <p className="mt-2 text-sm font-medium text-foreground">{race}</p>
            {racialLines.length > 0 ? (
              <ul className={`mt-2 list-inside list-disc space-y-1 ${appMuted} text-sm`}>
                {racialLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className={`mt-2 ${appMuted} text-sm`}>
                Nessun riepilogo predefinito per questa etichetta; usa i bonus
                manuali nel tab «Bonus e talenti» se serve.
              </p>
            )}
          </div>
          <div className="rounded-xl border border-border/60 bg-muted/25 p-4">
            <p className={appSectionLabel}>Classe — riferimento</p>
            <p className="mt-2 text-sm font-medium text-foreground">
              {characterClass}
            </p>
            <p className={`mt-2 text-sm leading-relaxed ${appMuted}`}>
              {classHint} I talenti, ASI e sottoclasse possono aggiungere altri
              bonus: annotali nel campo testo sotto o in «Bonus e talenti».
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="class" className="space-y-4 pt-4">
        <p className={`${appMuted} text-sm`}>
          Annota qui talenti, bonus di sottoclasse, oggetti magici che
          modificano le caratteristiche o i tiri, condizioni ricorrenti, ecc.
        </p>
        <Textarea
          label="Bonus, malus e note di gioco"
          placeholder="es. +2 Forza dal cinturone; Vantaggio su Percezione in natura; …"
          value={sheet.bonuses_penalties ?? ""}
          onChange={(e) => patchSheet({ bonuses_penalties: e.target.value })}
          className="min-h-[160px]"
        />
      </TabsContent>

      <TabsContent value="armaments" className="pt-4">
        <Textarea
          label="Armamenti"
          placeholder="Armi, scudi, munizioni, oggetti combattimento…"
          value={sheet.armaments ?? ""}
          onChange={(e) => patchSheet({ armaments: e.target.value })}
          className="min-h-[200px]"
        />
      </TabsContent>

      <TabsContent value="deposit" className="pt-4">
        <Textarea
          label="Deposito / inventario"
          placeholder="Equipaggiamento, tesori, consumabili, zaino…"
          value={sheet.deposit ?? ""}
          onChange={(e) => patchSheet({ deposit: e.target.value })}
          className="min-h-[200px]"
        />
      </TabsContent>

      <TabsContent value="story" className="space-y-4 pt-4">
        <Textarea
          label="Background e appunti generali"
          placeholder="Storia del personaggio, legami, obiettivi…"
          value={background}
          onChange={(e) => onBackgroundChange(e.target.value)}
          className="min-h-[100px]"
        />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className={appSectionLabel}>Sessioni di gioco</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setSessions([...sessions, newSessionEntry()])
            }
          >
            Aggiungi sessione
          </Button>
        </div>
        {sessions.length === 0 ? (
          <p className={`${appMuted} text-sm`}>
            Nessuna sessione registrata. Aggiungi una voce per ogni serata o
            capitolo.
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {sessions.map((s, idx) => (
              <li
                key={s.id}
                className="rounded-xl border border-border/80 bg-muted/20 p-4"
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-medium text-foreground">
                    Sessione {idx + 1}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => removeSession(s.id)}
                  >
                    Rimuovi
                  </Button>
                </div>
                <div className="space-y-3">
                  <Input
                    label="Titolo"
                    value={s.title}
                    onChange={(e) =>
                      updateSession(s.id, { title: e.target.value })
                    }
                    placeholder="es. La miniera perduta — parte 3"
                  />
                  <Input
                    label="Data (opzionale)"
                    type="date"
                    value={s.session_date ?? ""}
                    onChange={(e) =>
                      updateSession(s.id, {
                        session_date: e.target.value || undefined,
                      })
                    }
                  />
                  <Textarea
                    label="Cosa è successo"
                    value={s.notes}
                    onChange={(e) =>
                      updateSession(s.id, { notes: e.target.value })
                    }
                    className="min-h-[100px]"
                    placeholder="Eventi, NPC, decisioni importanti…"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </TabsContent>
    </Tabs>
  );
}
