"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CHARACTER_ABILITY_KEYS,
  CHARACTER_ABILITY_LABELS_IT,
  newSessionEntry,
  type CharacterAbilityKey,
} from "@/lib/character-sheet";
import type { CharacterGameSession, CharacterSheetData, CharacterStats } from "@/lib/types";
import { appMuted, appSectionLabel } from "@/lib/ui-classes";
import { cn } from "@/lib/utils";

export type CharacterTabsFieldsProps = {
  stats: CharacterStats;
  onChangeStat: (key: CharacterAbilityKey, value: number) => void;
  sheet: CharacterSheetData;
  patchSheet: (patch: Partial<CharacterSheetData>) => void;
  /** Contenuto in cima al tab Classe (classe, razza, livello, allineamento, …). */
  classTabTop: React.ReactNode;
  /** Tab Storia: testo libero (colonna `background` sul backend). */
  background: string;
  onBackgroundChange: (value: string) => void;
  tabsListClassName?: string;
};

export function CharacterTabsFields({
  stats,
  onChangeStat,
  sheet,
  patchSheet,
  classTabTop,
  background,
  onBackgroundChange,
  tabsListClassName,
}: CharacterTabsFieldsProps) {
  const sessions = sheet.sessions ?? [];

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
          "flex h-auto min-h-9 w-full flex-wrap justify-start gap-1 p-1",
          tabsListClassName
        )}
      >
        <TabsTrigger value="stats">Statistiche</TabsTrigger>
        <TabsTrigger value="class">Classe</TabsTrigger>
        <TabsTrigger value="armaments">Armamenti</TabsTrigger>
        <TabsTrigger value="deposit">Deposito</TabsTrigger>
        <TabsTrigger value="story">Storia</TabsTrigger>
      </TabsList>

      <TabsContent value="stats" className="space-y-4 pt-2">
        <p className={`${appMuted} text-sm`}>
          Punteggi caratteristica (tipicamente 8–20 prima di bonus di razza e
          livello).
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {CHARACTER_ABILITY_KEYS.map((key) => (
            <Input
              key={key}
              label={CHARACTER_ABILITY_LABELS_IT[key]}
              type="number"
              min={1}
              max={30}
              value={String(stats[key] ?? 10)}
              onChange={(e) => {
                const n = parseInt(e.target.value, 10);
                onChangeStat(key, Number.isFinite(n) ? n : 10);
              }}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="class" className="space-y-5 pt-2">
        <div className="space-y-4">{classTabTop}</div>
        <div>
          <p className={appSectionLabel}>Sottoclasse</p>
          <Input
            label="Sottoclasse / archetipo"
            value={sheet.subclass ?? ""}
            onChange={(e) => patchSheet({ subclass: e.target.value })}
            className="mt-2"
          />
        </div>
        <Textarea
          label="Bonus e malus"
          placeholder="Bonus di razza, talenti, condizioni, svantaggi…"
          value={sheet.bonuses_penalties ?? ""}
          onChange={(e) => patchSheet({ bonuses_penalties: e.target.value })}
          className="min-h-[120px]"
        />
      </TabsContent>

      <TabsContent value="armaments" className="pt-2">
        <Textarea
          label="Armamenti"
          placeholder="Armi, scudi, munizioni, oggetti combattimento…"
          value={sheet.armaments ?? ""}
          onChange={(e) => patchSheet({ armaments: e.target.value })}
          className="min-h-[200px]"
        />
      </TabsContent>

      <TabsContent value="deposit" className="pt-2">
        <Textarea
          label="Deposito / inventario"
          placeholder="Equipaggiamento, tesori, consumabili, zaino…"
          value={sheet.deposit ?? ""}
          onChange={(e) => patchSheet({ deposit: e.target.value })}
          className="min-h-[200px]"
        />
      </TabsContent>

      <TabsContent value="story" className="space-y-4 pt-2">
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
