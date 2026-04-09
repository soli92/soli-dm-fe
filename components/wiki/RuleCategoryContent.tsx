"use client";

import type { ReactNode } from "react";
import { isWikiRuleCategoryId } from "@/lib/tipologiche";
import { appMuted, appSectionLabel } from "@/lib/ui-classes";
import { cn } from "@/lib/utils";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function subsectionTitle(className?: string) {
  return cn(appSectionLabel, "mb-3 block", className);
}

function MechanicList({
  items,
  heading,
  sectionId,
}: {
  items: unknown;
  heading: string;
  sectionId: string;
}) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <section aria-labelledby={sectionId}>
      <h2 id={sectionId} className={subsectionTitle()}>
        {heading}
      </h2>
      <ul className="space-y-4">
        {items.map((item, i) => {
          if (!isRecord(item)) return null;
          const name =
            typeof item.name === "string" ? item.name : `Voce ${i + 1}`;
          const desc =
            typeof item.description === "string" ? item.description : null;
          return (
            <li
              key={`${name}-${i}`}
              className="rounded-xl border border-border/50 bg-muted/20 p-4"
            >
              <h3 className="font-serif text-base font-semibold text-foreground">
                {name}
              </h3>
              {desc ? (
                <p className={cn(appMuted, "mt-2 text-sm leading-relaxed")}>
                  {desc}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function AbilityScoresSection({ data }: { data: Record<string, unknown> }) {
  const abilities = data.abilities;
  if (!Array.isArray(abilities) || abilities.length === 0) return null;
  return (
    <section aria-labelledby="rule-abilities-heading">
      <h2 id="rule-abilities-heading" className={subsectionTitle()}>
        Caratteristiche
      </h2>
      <ul className="space-y-5">
        {abilities.map((ab, i) => {
          if (!isRecord(ab)) return null;
          const name = typeof ab.name === "string" ? ab.name : `Abilità ${i + 1}`;
          const abbrev =
            typeof ab.abbreviation === "string" ? ab.abbreviation : null;
          const desc =
            typeof ab.description === "string" ? ab.description : null;
          const checks = ab.checks;
          return (
            <li
              key={`${name}-${i}`}
              className="rounded-xl border border-border/50 bg-muted/20 p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {name}
                </h3>
                {abbrev ? (
                  <span
                    className="rounded-md bg-primary/15 px-2 py-0.5 font-mono text-xs font-semibold text-primary"
                    aria-label={`Abbreviazione: ${abbrev}`}
                  >
                    {abbrev}
                  </span>
                ) : null}
              </div>
              {desc ? (
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                  {desc}
                </p>
              ) : null}
              {Array.isArray(checks) && checks.length > 0 ? (
                <div className="mt-3">
                  <p className={cn(appMuted, "text-xs font-semibold uppercase tracking-wide")}>
                    Esempi di prove
                  </p>
                  <ul className="mt-2 list-inside list-disc text-sm text-foreground/90">
                    {checks.map((c, j) => (
                      <li key={j}>{typeof c === "string" ? c : String(c)}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function SkillChecksDcTable({ data }: { data: Record<string, unknown> }) {
  const rows = data.dc_table;
  if (!Array.isArray(rows) || rows.length === 0) return null;
  return (
    <section aria-labelledby="rule-dc-heading">
      <h2 id="rule-dc-heading" className={subsectionTitle()}>
        Difficoltà (CD)
      </h2>
      <div className="overflow-x-auto rounded-xl border border-border/60">
        <table className="w-full min-w-[280px] text-left text-sm">
          <caption className="sr-only">
            Tabella gradi di difficoltà e classe di difficoltà
          </caption>
          <thead>
            <tr className="border-b border-border/60 bg-muted/40">
              <th scope="col" className="px-4 py-3 font-semibold text-foreground">
                CD
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-foreground">
                Difficoltà
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              if (!isRecord(row)) return null;
              const dc = typeof row.dc === "number" ? row.dc : null;
              const diff =
                typeof row.difficulty === "string" ? row.difficulty : "—";
              return (
                <tr
                  key={i}
                  className="border-b border-border/40 last:border-0 odd:bg-background even:bg-muted/15"
                >
                  <td className="px-4 py-2.5 font-mono tabular-nums text-foreground">
                    {dc ?? "—"}
                  </td>
                  <td className="px-4 py-2.5 text-foreground">{diff}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function RestingSection({ data }: { data: Record<string, unknown> }) {
  const shortR = data.short_rest;
  const longR = data.long_rest;
  return (
    <div className="space-y-8">
      {isRecord(shortR) ? (
        <section aria-labelledby="rule-short-rest">
          <h2 id="rule-short-rest" className={subsectionTitle()}>
            Riposo breve
          </h2>
          {typeof shortR.duration === "string" ? (
            <p className="mb-3 text-sm font-medium text-primary">
              Durata: {shortR.duration}
            </p>
          ) : null}
          {Array.isArray(shortR.benefits) ? (
            <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-foreground/90">
              {shortR.benefits.map((b, i) => (
                <li key={i}>{typeof b === "string" ? b : String(b)}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}
      {isRecord(longR) ? (
        <section aria-labelledby="rule-long-rest">
          <h2 id="rule-long-rest" className={subsectionTitle()}>
            Riposo lungo
          </h2>
          {typeof longR.duration === "string" ? (
            <p className="mb-3 text-sm font-medium text-primary">
              Durata: {longR.duration}
            </p>
          ) : null}
          {Array.isArray(longR.benefits) ? (
            <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-foreground/90">
              {longR.benefits.map((b, i) => (
                <li key={i}>{typeof b === "string" ? b : String(b)}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}

function MulticlassSection({ data }: { data: Record<string, unknown> }) {
  const req = data.requirements;
  const benefits = data.benefits;
  return (
    <div className="space-y-6">
      {typeof req === "string" ? (
        <section aria-labelledby="rule-mc-req">
          <h2 id="rule-mc-req" className={subsectionTitle()}>
            Requisiti
          </h2>
          <p className="text-sm leading-relaxed text-foreground/90">{req}</p>
        </section>
      ) : null}
      {Array.isArray(benefits) && benefits.length > 0 ? (
        <section aria-labelledby="rule-mc-benefits">
          <h2 id="rule-mc-benefits" className={subsectionTitle()}>
            Vantaggi
          </h2>
          <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-foreground/90">
            {benefits.map((b, i) => (
              <li key={i}>{typeof b === "string" ? b : String(b)}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function FallbackStructured({ data }: { data: Record<string, unknown> }) {
  const entries = Object.entries(data).filter(
    ([k]) => k !== "title" && k !== "description"
  );
  if (entries.length === 0) return null;
  return (
    <section aria-label="Dettagli aggiuntivi">
      <dl className="space-y-4">
        {entries.map(([key, val]) => (
          <div key={key}>
            <dt className={cn(appMuted, "text-xs font-semibold uppercase tracking-wide")}>
              {key.replace(/_/g, " ")}
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {typeof val === "string" || typeof val === "number"
                ? String(val)
                : JSON.stringify(val, null, 2)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/**
 * Corpo leggibile per GET /api/rules/:category (dati statici sul backend).
 */
export function RuleCategoryContent({
  categoryId,
  data,
}: {
  categoryId: string;
  data: unknown;
}) {
  if (!isRecord(data)) {
    return (
      <p className="text-muted-foreground" role="status">
        Nessun contenuto disponibile.
      </p>
    );
  }

  const description =
    typeof data.description === "string" ? data.description : null;

  let specific: ReactNode = null;
  if (isWikiRuleCategoryId(categoryId)) {
    switch (categoryId) {
      case "ability_scores":
        specific = <AbilityScoresSection data={data} />;
        break;
      case "combat":
        specific = (
          <MechanicList
            items={data.key_mechanics}
            heading="Meccaniche"
            sectionId="rule-combat-mechanics"
          />
        );
        break;
      case "saving_throws":
        specific = (
          <MechanicList
            items={data.mechanics}
            heading="Tiri salvezza"
            sectionId="rule-saving-mechanics"
          />
        );
        break;
      case "skill_checks":
        specific = (
          <div className="space-y-8">
            <SkillChecksDcTable data={data} />
          </div>
        );
        break;
      case "resting":
        specific = <RestingSection data={data} />;
        break;
      case "multiclassing":
        specific = <MulticlassSection data={data} />;
        break;
    }
  } else {
    specific = <FallbackStructured data={data} />;
  }

  return (
    <div className="space-y-6">
      {description ? (
        <p className="text-base leading-relaxed text-foreground/95">{description}</p>
      ) : null}
      <div className="space-y-10 border-t border-border/60 pt-6">{specific}</div>
    </div>
  );
}
