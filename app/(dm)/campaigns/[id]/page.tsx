"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getCampaign } from "@/lib/api";
import { useResourceByParam } from "@/hooks/useResourceByParam";
import { appLinkBack, appMuted, appPageTitle } from "@/lib/ui-classes";
import { toast } from "sonner";

export default function CampaignDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const { data: c, loading, error } = useResourceByParam(id, getCampaign);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <main className="px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-4">
        <Link href="/campaigns" className={appLinkBack}>
          ← Torna alle campagne
        </Link>
        {loading ? (
          <p className={appMuted}>Caricamento…</p>
        ) : !c ? (
          <p className={appMuted}>Campagna non disponibile.</p>
        ) : (
          <>
            <h1 className={appPageTitle}>{c.name}</h1>
            <p className="text-foreground">
              <strong>DM:</strong> {c.dm_name}
            </p>
            {c.world_setting && (
              <p className="text-foreground">
                <strong>Ambientazione:</strong> {c.world_setting}
              </p>
            )}
            {c.level_range && (
              <p className="text-foreground">
                <strong>Livelli:</strong> {c.level_range}
              </p>
            )}
            {c.description && (
              <p className={`${appMuted} whitespace-pre-wrap`}>{c.description}</p>
            )}
            <div className="pt-4">
              <Link
                href={`/characters?campaign_id=${encodeURIComponent(c.id)}`}
                className="text-primary hover:underline font-medium"
              >
                Personaggi di questa campagna →
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
