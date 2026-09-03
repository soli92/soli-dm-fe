"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCampaigns } from "@/hooks/useCampaigns";
import type { CreateCampaignInput } from "@/lib/types";
import { CAMPAIGN_LEVEL_RANGE_PRESETS } from "@/lib/tipologiche";
import {
  appListItem,
  appMuted,
  appPageShell,
  appPageTitle,
  appPanelStack,
  appSectionLabel,
  appSelectField,
  appTitle,
} from "@/lib/ui-classes";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ApiErrorHint, ApiErrorNotice } from "@/components/api/ApiErrorNotice";

export default function CampaignsPage() {
  const { list, loading, saving, loadError, create } = useCampaigns();
  const [form, setForm] = useState<CreateCampaignInput>({
    name: "",
    dm_name: "",
    description: "",
    world_setting: "",
    level_range: "1-5",
  });

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.dm_name.trim()) {
      toast.error("Nome campagna e nome DM sono obbligatori.");
      return;
    }
    try {
      await create({
        name: form.name.trim(),
        dm_name: form.dm_name.trim(),
        description: form.description?.trim() || undefined,
        world_setting: form.world_setting?.trim() || undefined,
        level_range: form.level_range?.trim() || undefined,
      });
      toast.success("Campagna creata.");
      setForm({
        name: "",
        dm_name: form.dm_name,
        description: "",
        world_setting: "",
        level_range: "1-5",
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore creazione");
    }
  }

  return (
    <main className={appPageShell}>
      <div className="space-y-10">
        <header className="space-y-2">
          <p className={appSectionLabel}>Gestione tavolo</p>
          <h1 className={appPageTitle}>Campagne</h1>
          <p className={cn(appMuted, "max-w-xl text-base")}>
            Crea una campagna e collega personaggi e lanci dadi.
          </p>
        </header>

        <section className={appPanelStack} aria-labelledby="new-campaign-heading">
          <h2 id="new-campaign-heading" className={appTitle}>
            Nuova campagna
          </h2>
          <form onSubmit={handleCreate} className="flex flex-col gap-4">
            <Input
              label="Nome"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
            <Input
              label="Nome Dungeon Master"
              value={form.dm_name}
              onChange={(e) =>
                setForm((f) => ({ ...f, dm_name: e.target.value }))
              }
              required
            />
            <Input
              label="Descrizione (opzionale)"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
            />
            <Input
              label="Ambientazione (opzionale)"
              value={form.world_setting}
              onChange={(e) =>
                setForm((f) => ({ ...f, world_setting: e.target.value }))
              }
            />
            <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
              Range livelli
              <select
                className={appSelectField}
                value={form.level_range ?? "1-5"}
                onChange={(e) =>
                  setForm((f) => ({ ...f, level_range: e.target.value }))
                }
                aria-label="Range livelli della campagna"
              >
                {CAMPAIGN_LEVEL_RANGE_PRESETS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>
            <Button type="submit" disabled={saving}>
              {saving ? "Salvataggio…" : "Crea campagna"}
            </Button>
          </form>
        </section>

        <section aria-labelledby="campaign-list-heading">
          <h2 id="campaign-list-heading" className={cn(appTitle, "mb-4")}>
            Le tue campagne
          </h2>
          {loadError ? (
            <div className="space-y-3">
              <ApiErrorNotice message={loadError} />
              <ApiErrorHint />
            </div>
          ) : loading ? (
            <p className={appMuted}>Caricamento…</p>
          ) : list.length === 0 ? (
            <p className={appMuted}>Nessuna campagna ancora.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {list.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/campaigns/${c.id}`}
                    className={cn(appListItem, "flex flex-col gap-1")}
                  >
                    <span className="text-base font-semibold text-foreground">
                      {c.name}
                    </span>
                    <span className={cn(appMuted, "block text-sm leading-relaxed")}>
                      DM: {c.dm_name}
                      {c.world_setting ? ` · ${c.world_setting}` : ""}
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
