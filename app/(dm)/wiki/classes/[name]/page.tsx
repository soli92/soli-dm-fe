"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getClassByName } from "@/lib/api";
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

export default function WikiClassDetailPage() {
  const params = useParams();
  const raw = typeof params.name === "string" ? params.name : "";
  const name = decodeURIComponent(raw);
  const { data: c, loading, error } = useResourceByParam(name, getClassByName);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <main className={appPageShell} aria-busy={loading}>
      <div className="space-y-8">
        <Link
          href="/wiki/classes"
          className={appLinkBack}
          aria-label={"Torna all'elenco classi"}
        >
          ← Classi
        </Link>
        {loading ? (
          <p className={appMuted} role="status">
            Caricamento…
          </p>
        ) : !c ? (
          <p className={appMuted}>Classe non trovata.</p>
        ) : (
          <article className={appPanelStack}>
            <header className="space-y-1 border-b border-border/60 pb-4">
              <p className={appSectionLabel}>Classe</p>
              <h1 className={appPageTitle}>{c.name}</h1>
            </header>
            <p className={cn(appBody, "leading-relaxed text-foreground/95")}>
              {c.description}
            </p>
            <dl className="grid gap-4 border-t border-border/60 pt-4 text-sm">
              <div>
                <dt className={cn(appMuted, "text-xs font-semibold uppercase tracking-wide")}>
                  Dado vita
                </dt>
                <dd className="mt-1 text-foreground">{c.hit_die}</dd>
              </div>
              <div>
                <dt className={cn(appMuted, "text-xs font-semibold uppercase tracking-wide")}>
                  Caratteristica primaria
                </dt>
                <dd className="mt-1 text-foreground">{c.primary_ability}</dd>
              </div>
              <div>
                <dt className={cn(appMuted, "text-xs font-semibold uppercase tracking-wide")}>
                  Tiri salvezza
                </dt>
                <dd className="mt-1 text-foreground">{c.saving_throws.join(", ")}</dd>
              </div>
              <div>
                <dt className={cn(appMuted, "text-xs font-semibold uppercase tracking-wide")}>
                  Armature
                </dt>
                <dd className="mt-1 text-foreground">{c.armor_proficiency}</dd>
              </div>
              <div>
                <dt className={cn(appMuted, "text-xs font-semibold uppercase tracking-wide")}>
                  Armi
                </dt>
                <dd className="mt-1 text-foreground">{c.weapon_proficiency}</dd>
              </div>
              <div>
                <dt className={cn(appMuted, "text-xs font-semibold uppercase tracking-wide")}>
                  Tratti
                </dt>
                <dd className="mt-1 leading-relaxed text-foreground">
                  {c.features.join(", ")}
                </dd>
              </div>
            </dl>
          </article>
        )}
      </div>
    </main>
  );
}
