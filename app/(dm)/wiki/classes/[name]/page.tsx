"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getClassByName } from "@/lib/api";
import { useResourceByParam } from "@/hooks/useResourceByParam";
import { appLinkBack, appMuted, appPageTitle } from "@/lib/ui-classes";
import { toast } from "sonner";

export default function WikiClassDetailPage() {
  const params = useParams();
  const raw = typeof params.name === "string" ? params.name : "";
  const name = decodeURIComponent(raw);
  const { data: c, loading, error } = useResourceByParam(name, getClassByName);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <main className="px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-4">
        <Link href="/wiki/classes" className={appLinkBack}>
          ← Classi
        </Link>
        {loading ? (
          <p className={appMuted}>Caricamento…</p>
        ) : !c ? (
          <p className={appMuted}>Classe non trovata.</p>
        ) : (
          <>
            <h1 className={appPageTitle}>{c.name}</h1>
            <p className="text-foreground/90">{c.description}</p>
            <dl className="grid gap-2 text-sm text-muted-foreground">
              <div>
                <dt className="text-foreground/70">Dado vita</dt>
                <dd>{c.hit_die}</dd>
              </div>
              <div>
                <dt className="text-foreground/70">Caratteristica primaria</dt>
                <dd>{c.primary_ability}</dd>
              </div>
              <div>
                <dt className="text-foreground/70">Tiri salvezza</dt>
                <dd>{c.saving_throws.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-foreground/70">Tratti</dt>
                <dd>{c.features.join(", ")}</dd>
              </div>
            </dl>
          </>
        )}
      </div>
    </main>
  );
}
