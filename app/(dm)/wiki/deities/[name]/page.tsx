"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getDeityByName } from "@/lib/api";
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

export default function WikiDeityDetailPage() {
  const params = useParams();
  const raw = typeof params.name === "string" ? params.name : "";
  const name = decodeURIComponent(raw);
  const { data: d, loading, error } = useResourceByParam(name, getDeityByName);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <main className={appPageShell}>
      <div className="space-y-8">
        <Link href="/wiki/deities" className={appLinkBack}>
          ← Divinità
        </Link>
        {loading ? (
          <p className={appMuted}>Caricamento…</p>
        ) : !d ? (
          <p className={appMuted}>Divinità non trovata.</p>
        ) : (
          <article className={appPanelStack}>
            <header className="space-y-1 border-b border-border/60 pb-4">
              <p className={appSectionLabel}>Divinità</p>
              <h1 className={appPageTitle}>{d.name}</h1>
              <p className="text-sm font-semibold text-primary">{d.alignment}</p>
            </header>
            <p className={cn(appBody, "leading-relaxed text-foreground/95")}>
              {d.description}
            </p>
            <dl className="grid gap-4 border-t border-border/60 pt-4 text-sm">
              <div>
                <dt className={cn(appMuted, "text-xs font-semibold uppercase tracking-wide")}>
                  Dominio
                </dt>
                <dd className="mt-1 text-foreground">{d.domain}</dd>
              </div>
              <div>
                <dt className={cn(appMuted, "text-xs font-semibold uppercase tracking-wide")}>
                  Simbolo sacro
                </dt>
                <dd className="mt-1 text-foreground">{d.holy_symbol}</dd>
              </div>
              <div>
                <dt className={cn(appMuted, "text-xs font-semibold uppercase tracking-wide")}>
                  Fedeli tipici
                </dt>
                <dd className="mt-1 leading-relaxed text-foreground">
                  {d.typical_worshippers}
                </dd>
              </div>
            </dl>
          </article>
        )}
      </div>
    </main>
  );
}
