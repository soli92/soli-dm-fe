"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCampaigns, rollDice, getDiceHistory } from "@/lib/api";
import type { Campaign, DiceRollRow } from "@/lib/types";
import { appMuted, appPageTitle, appPanelStack } from "@/lib/ui-classes";
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

  const selectClass =
    "w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <main className="px-4 py-8">
      <div className="max-w-lg mx-auto space-y-8">
        <h1 className={appPageTitle}>Lancia dadi</h1>
        <p className={`${appMuted} text-sm`}>
          Notazione <code className="text-primary font-mono">NdX</code> (es.{" "}
          <code className="text-primary font-mono">2d6</code>). Il backend accetta solo{" "}
          <code className="text-primary font-mono">NdX</code>, senza modificatori tipo +5.
        </p>

        <form onSubmit={handleRoll} className={appPanelStack}>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">
              Campagna (opzionale, per salvare nello storico)
            </label>
            <select
              value={campaignId}
              onChange={(e) => setCampaignId(e.target.value)}
              className={selectClass}
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
            <h2 className="text-lg font-semibold font-serif mb-2 text-foreground">
              Storico recente
            </h2>
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
