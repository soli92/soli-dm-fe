"use client";

import { Input } from "@/components/ui/input";
import {
  CUSTOM_SUBCLASS_SELECT_VALUE,
  DND_ALIGNMENTS,
  getSubclassOptionsForClass,
  PLAYBOOK_CLASS_NAMES,
  PLAYBOOK_RACE_NAMES,
} from "@/lib/tipologiche";
import {
  appFieldHint,
  appFieldLabel,
  appFormControl,
  appSelectField,
  appSectionLabel,
} from "@/lib/ui-classes";
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

function NativeField({
  label,
  hint,
  children,
  className: shellClass,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", shellClass)}>
      <span className={appFieldLabel}>{label}</span>
      {hint ? <p className={appFieldHint}>{hint}</p> : null}
      {children}
    </div>
  );
}

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
  const subOptions = getSubclassOptionsForClass(class_name);
  const trimmedSub = subclass.trim();
  const isCustomSubclass =
    Boolean(trimmedSub) && !subOptions.includes(trimmedSub);
  const subclassSelectValue = !trimmedSub
    ? ""
    : isCustomSubclass
      ? CUSTOM_SUBCLASS_SELECT_VALUE
      : trimmedSub;
  const showSubclassText =
    subclassSelectValue === CUSTOM_SUBCLASS_SELECT_VALUE ||
    isCustomSubclass;

  return (
    <div
      className={cn(
        "space-y-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/[0.06] p-5 shadow-md sm:p-6 md:p-7",
        className
      )}
    >
      <div>
        <p className={appSectionLabel}>Identità del personaggio</p>
        <p className={cn(appFieldHint, "mt-2 max-w-prose")}>
          Classe, razza, sottoclasse (elenco SRD), allineamento e multiclasse.
          Le statistiche sono nelle tab sotto. Controlli con altezza touch
          confortevole su mobile (Material Design 3).
        </p>
      </div>

      {topSlot ? <div className="space-y-4">{topSlot}</div> : null}

      <div
        className={cn(
          "grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-5",
          "lg:grid-cols-3 lg:gap-x-5"
        )}
      >
        <NativeField label="Classe principale">
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
        </NativeField>

        <NativeField label="Razza">
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
        </NativeField>

        <NativeField label="Allineamento">
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
        </NativeField>

        <NativeField
          label="Livello (classe principale)"
          hint="1–20. In multiclasse somma i livelli delle classi."
        >
          <Input
            type="number"
            min={1}
            max={20}
            value={level}
            onChange={(e) => onLevelChange(e.target.value)}
            className={appFormControl}
            aria-label="Livello classe principale"
          />
        </NativeField>

        <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-3">
          <span className={appFieldLabel}>Sottoclasse / percorso / dominio</span>
          <p className={appFieldHint}>
            Opzioni tipiche SRD per la classe scelta; usa «Altro» per
            homebrew o sottoclassi non in elenco.
          </p>
          <select
            className={appSelectField}
            value={subclassSelectValue}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "") onSubclassChange("");
              else if (v === CUSTOM_SUBCLASS_SELECT_VALUE) onSubclassChange("");
              else onSubclassChange(v);
            }}
            aria-label="Sottoclasse da tipologica"
          >
            <option value="">— Nessuna —</option>
            {subOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
            <option value={CUSTOM_SUBCLASS_SELECT_VALUE}>
              Altro (testo libero)
            </option>
          </select>
          {showSubclassText ? (
            <Input
              label="Nome personalizzato"
              value={subclass}
              onChange={(e) => onSubclassChange(e.target.value)}
              placeholder="Scrivi la sottoclasse (anche se non è in elenco)"
              className={appFormControl}
            />
          ) : null}
        </div>
      </div>

      <div
        className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-4 sm:p-5"
        data-testid="multiclass-block"
      >
        <p className={appSectionLabel}>Multiclasse (opzionale)</p>
        <p className={cn(appFieldHint, "mt-1")}>
          Seconda classe e livelli dedicati; resta vuoto se monoclassa.
        </p>
        <div
          className={cn(
            "mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4"
          )}
        >
          <NativeField label="Seconda classe">
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
          </NativeField>
          <NativeField
            label="Livelli nella seconda classe"
            hint={mcActive ? "Livelli solo in questa classe." : undefined}
          >
            <Input
              type="number"
              min={0}
              max={20}
              value={multiclass_level}
              onChange={(e) => onMulticlassLevelChange(e.target.value)}
              disabled={!mcActive}
              placeholder={mcActive ? "es. 2" : "—"}
              className={appFormControl}
              aria-label="Livelli seconda classe"
            />
          </NativeField>
        </div>
      </div>
    </div>
  );
}
