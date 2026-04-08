"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getRaceByName } from "@/lib/api";
import { useResourceByParam } from "@/hooks/useResourceByParam";
import {
  appBody,
  appLinkBack,
  appMuted,
  appPageShell,
  appPageTitle,
  appPanelStack,
  appSectionLabel,
} from "@/lib/ui-classes";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function WikiRaceDetailPage() {
  const params = useParams();
  const raw = typeof params.name === "string" ? params.name : "";
  const name = decodeURIComponent(raw);
  const { data: r, loading, error } = useResourceByParam(name, getRaceByName);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <main className={appPageShell}>
      <div className="space-y-8">
        <Link href="/wiki/races" className={appLinkBack}>
          ← Razze
        </Link>
        {loading ? (
          <p className={appMuted}>Caricamento…</p>
        ) : !r ? (
          <p className={appMuted}>Razza non trovata.</p>
        ) : (
          <article className={appPanelStack}>
            <header className="space-y-1 border-b border-border/60 pb-4">
              <p className={appSectionLabel}>Razza</p>
              <h1 className={appPageTitle}>{r.name}</h1>
            </header>
            <p className={cn(appBody, "leading-relaxed text-foreground/95")}>
              {r.description}
            </p>
            <dl className="grid gap-4 border-t border-border/60 pt-4 text-sm">
              {r.ability_scores && Object.keys(r.ability_scores).length > 0 ? (
                <div>
                  <dt className={cn(appMuted, "text-xs font-semibold uppercase tracking-wide")}>
                    Punteggi caratteristica
                  </dt>
                  <dd className="mt-1 text-foreground">
                    {Object.entries(r.ability_scores)
                      .map(([k, v]) => `${k} ${v >= 0 ? "+" : ""}${v}`)
                      .join(", ")}
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className={cn(appMuted, "text-xs font-semibold uppercase tracking-wide")}>
                  Taglia e movimento
                </dt>
                <dd className="mt-1 text-foreground">
                  Taglia {r.size} · Velocità {r.speed}
                </dd>
              </div>
              <div>
                <dt className={cn(appMuted, "text-xs font-semibold uppercase tracking-wide")}>
                  Lingue
                </dt>
                <dd className="mt-1 text-foreground">{r.languages.join(", ")}</dd>
              </div>
              <div>
                <dt className={cn(appMuted, "text-xs font-semibold uppercase tracking-wide")}>
                  Tratti
                </dt>
                <dd className="mt-1 leading-relaxed text-foreground">
                  {r.traits.join(", ")}
                </dd>
              </div>
            </dl>
          </article>
        )}
      </div>
    </main>
  );
}
