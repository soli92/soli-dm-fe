"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCampaigns, rollDice, getDiceHistory } from "@/lib/api";
import type { Campaign, DiceRollRow } from "@/lib/types";
import { DICE_NOTATION_PRESETS } from "@/lib/tipologiche";
import {
  appMuted,
  appPageShell,
  appPageTitle,
  appPanelStack,
  appSelectField,
  appTitle,
} from "@/lib/ui-classes";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function DiceRollerPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [campaignId, setCampaignId] = useState("");
  const [notation, setNotation] = useState("1d20");
  const [last, setLast] = useState<{
    rolls: number[];
    total: number;
    notation: string;
  } | null>(null);
  const [history, setHistory] = useState<DiceRollRow[]>([]);
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    void getCampaigns()
      .then(setCampaigns)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!campaignId) {
      setHistory([]);
      return;
    }
    void getDiceHistory(campaignId, 15)
      .then(setHistory)
      .catch(() => setHistory([]));
  }, [campaignId]);

  async function handleRoll(e: React.FormEvent) {
    e.preventDefault();
    setRolling(true);
    try {
      const result = await rollDice({
        notation: notation.trim(),
        campaign_id: campaignId || undefined,
      });
      setLast(result);
      toast.success(`Totale: ${result.total}`);
      if (campaignId) {
        const h = await getDiceHistory(campaignId, 15);
        setHistory(h);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Lancio non valido");
    } finally {
      setRolling(false);
    }
  }

  return (
    <main className={cn(appPageShell, "max-w-lg")}>
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className={appPageTitle}>Lancia dadi</h1>
          <p className={`${appMuted} text-sm leading-relaxed`}>
            Notazione <code className="font-mono text-primary">NdX</code> (es.{" "}
            <code className="font-mono text-primary">2d6</code>). Il backend accetta solo{" "}
            <code className="font-mono text-primary">NdX</code>, senza modificatori tipo +5.
          </p>
        </header>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Notazioni rapide">
          {DICE_NOTATION_PRESETS.map((p) => (
            <Button
              key={p.notation}
              type="button"
              variant="outline"
              size="sm"
              className="font-mono"
              onClick={() => setNotation(p.notation)}
            >
              {p.label}
            </Button>
          ))}
        </div>

        <form onSubmit={handleRoll} className={appPanelStack}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium leading-none text-foreground">
              Campagna (opzionale, per salvare nello storico)
            </label>
            <select
              value={campaignId}
              onChange={(e) => setCampaignId(e.target.value)}
              className={appSelectField}
              aria-label="Campagna per storico lanci"
            >
              <option value="">— Nessuna —</option>
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <Input label="Notazione" value={notation} onChange={(e) => setNotation(e.target.value)} />
          <Button type="submit" disabled={rolling}>
            {rolling ? "Lancio…" : "Lancia"}
          </Button>
        </form>

        {last && (
          <div className={`${appPanelStack} gap-3`}>
            <p className="font-serif font-semibold text-foreground">{last.notation}</p>
            <p className="leading-relaxed text-foreground/90">
              Tiri: {last.rolls.join(", ")} → <strong>{last.total}</strong>
            </p>
          </div>
        )}

        {campaignId && history.length > 0 && (
          <div>
            <h2 className={`${appTitle} mb-3`}>Storico recente</h2>
            <ul className={`text-sm ${appMuted} space-y-1 max-h-48 overflow-y-auto`}>
              {history.map((h) => (
                <li key={h.id}>
                  {h.notation}: {h.result_rolls?.join(", ") ?? "—"} ={" "}
                  <strong className="text-foreground">{h.result_total}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
