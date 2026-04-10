"use client";

import { Input } from "@/components/ui/input";
import {
  DND_ALIGNMENTS,
  PLAYBOOK_CLASS_NAMES,
  PLAYBOOK_RACE_NAMES,
} from "@/lib/tipologiche";
import { appSelectField, appSectionLabel } from "@/lib/ui-classes";
import { cn } from "@/lib/utils";

export type CharacterIdentityPanelProps = {
  className?: string;
  /** Es. selettore campagna (solo creazione) */
  topSlot?: React.ReactNode;
  class_name: string;
  onClassNameChange: (v: string) => void;
  race: string;
  onRaceChange: (v: string) => void;
  subclass: string;
  onSubclassChange: (v: string) => void;
  alignment: string;
  onAlignmentChange: (v: string) => void;
  level: string;
  onLevelChange: (v: string) => void;
  multiclass_class: string;
  onMulticlassClassChange: (v: string) => void;
  multiclass_level: string;
  onMulticlassLevelChange: (v: string) => void;
};

export function CharacterIdentityPanel({
  className,
  topSlot,
  class_name,
  onClassNameChange,
  race,
  onRaceChange,
  subclass,
  onSubclassChange,
  alignment,
  onAlignmentChange,
  level,
  onLevelChange,
  multiclass_class,
  onMulticlassClassChange,
  multiclass_level,
  onMulticlassLevelChange,
}: CharacterIdentityPanelProps) {
  const mcActive = Boolean(multiclass_class?.trim());

  return (
    <div
      className={cn(
        "space-y-5 rounded-2xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/[0.06] p-5 shadow-md sm:p-6",
        className
      )}
    >
      <div>
        <p className={appSectionLabel}>Identità del personaggio</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Classe, razza, sottoclasse, allineamento e multiclasse sono sempre visibili qui;
          le statistiche e il resto della scheda sono nelle tab sotto.
        </p>
      </div>

      {topSlot ? <div className="space-y-3">{topSlot}</div> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground sm:col-span-1">
          Classe principale
          <select
            className={appSelectField}
            value={class_name}
            onChange={(e) => onClassNameChange(e.target.value)}
            aria-label="Classe principale"
          >
            {!PLAYBOOK_CLASS_NAMES.includes(
              class_name as (typeof PLAYBOOK_CLASS_NAMES)[number]
            ) ? (
              <option value={class_name}>{class_name}</option>
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
            value={race}
            onChange={(e) => onRaceChange(e.target.value)}
            aria-label="Razza"
          >
            {!PLAYBOOK_RACE_NAMES.includes(
              race as (typeof PLAYBOOK_RACE_NAMES)[number]
            ) ? (
              <option value={race}>{race}</option>
            ) : null}
            {PLAYBOOK_RACE_NAMES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>

        <Input
          label="Sottoclasse / archetipo"
          value={subclass}
          onChange={(e) => onSubclassChange(e.target.value)}
          placeholder="es. Champion, Thief, Life Domain…"
        />

        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          Allineamento
          <select
            className={appSelectField}
            value={alignment}
            onChange={(e) => onAlignmentChange(e.target.value)}
            aria-label="Allineamento"
          >
            {!DND_ALIGNMENTS.includes(
              alignment as (typeof DND_ALIGNMENTS)[number]
            ) ? (
              <option value={alignment}>{alignment}</option>
            ) : null}
            {DND_ALIGNMENTS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>

        <Input
          label="Livello (classe principale)"
          type="number"
          min={1}
          max={20}
          value={level}
          onChange={(e) => onLevelChange(e.target.value)}
        />
      </div>

      <div
        className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-4"
        data-testid="multiclass-block"
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Multiclasse (opzionale)
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
            Seconda classe
            <select
              className={appSelectField}
              value={multiclass_class || ""}
              onChange={(e) => {
                const v = e.target.value;
                onMulticlassClassChange(v);
                if (!v.trim()) onMulticlassLevelChange("");
              }}
              aria-label="Seconda classe per multiclasse"
            >
              <option value="">— Nessuna —</option>
              {PLAYBOOK_CLASS_NAMES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <Input
            label="Livelli nella seconda classe"
            type="number"
            min={0}
            max={20}
            value={multiclass_level}
            onChange={(e) => onMulticlassLevelChange(e.target.value)}
            disabled={!mcActive}
            placeholder={mcActive ? "es. 2" : "—"}
          />
        </div>
      </div>
    </div>
  );
}
