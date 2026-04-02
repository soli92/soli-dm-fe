"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getRaceByName } from "@/lib/api";
import { useResourceByParam } from "@/hooks/useResourceByParam";
import { appLinkBack, appMuted, appPageTitle } from "@/lib/ui-classes";
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
    <main className="px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-4">
        <Link href="/wiki/races" className={appLinkBack}>
          ← Razze
        </Link>
        {loading ? (
          <p className={appMuted}>Caricamento…</p>
        ) : !r ? (
          <p className={appMuted}>Razza non trovata.</p>
        ) : (
          <>
            <h1 className={appPageTitle}>{r.name}</h1>
            <p className="text-foreground/90">{r.description}</p>
            {r.ability_scores &&
              Object.keys(r.ability_scores).length > 0 && (
                <p className={`${appMuted} text-sm`}>
                  Punteggi:{" "}
                  {Object.entries(r.ability_scores)
                    .map(([k, v]) => `${k} ${v >= 0 ? "+" : ""}${v}`)
                    .join(", ")}
                </p>
              )}
            <p className={`${appMuted} text-sm`}>
              Taglia {r.size} · Velocità {r.speed}
            </p>
            <p className={`${appMuted} text-sm`}>Lingue: {r.languages.join(", ")}</p>
            <p className={`${appMuted} text-sm`}>Tratti: {r.traits.join(", ")}</p>
          </>
        )}
      </div>
    </main>
  );
}
