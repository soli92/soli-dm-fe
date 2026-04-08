"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getCampaign } from "@/lib/api";
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

export default function CampaignDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const { data: c, loading, error } = useResourceByParam(id, getCampaign);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <main className={appPageShell}>
      <div className="space-y-8">
        <Link href="/campaigns" className={appLinkBack}>
          ← Torna alle campagne
        </Link>

        {loading ? (
          <p className={appMuted}>Caricamento…</p>
        ) : !c ? (
          <p className={appMuted}>Campagna non disponibile.</p>
        ) : (
          <article className={appPanelStack}>
            <header className="space-y-1 border-b border-border/60 pb-4">
              <p className={appSectionLabel}>Campagna</p>
              <h1 className={appPageTitle}>{c.name}</h1>
            </header>
            <dl className="grid gap-4 text-sm">
              <div>
                <dt className={cn(appMuted, "text-xs font-semibold uppercase tracking-wide")}>
                  Dungeon Master
                </dt>
                <dd className={cn(appBody, "mt-1 font-medium")}>{c.dm_name}</dd>
              </div>
              {c.world_setting ? (
                <div>
                  <dt className={cn(appMuted, "text-xs font-semibold uppercase tracking-wide")}>
                    Ambientazione
                  </dt>
                  <dd className={cn(appBody, "mt-1")}>{c.world_setting}</dd>
                </div>
              ) : null}
              {c.level_range ? (
                <div>
                  <dt className={cn(appMuted, "text-xs font-semibold uppercase tracking-wide")}>
                    Livelli
                  </dt>
                  <dd className={cn(appBody, "mt-1")}>{c.level_range}</dd>
                </div>
              ) : null}
            </dl>
            {c.description ? (
              <p className={cn(appMuted, "whitespace-pre-wrap leading-relaxed")}>
                {c.description}
              </p>
            ) : null}
            <div className="border-t border-border/60 pt-4">
              <Link
                href={`/characters?campaign_id=${encodeURIComponent(c.id)}`}
                className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                Personaggi di questa campagna →
              </Link>
            </div>
          </article>
        )}
      </div>
    </main>
  );
}
