"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getRuleCategory } from "@/lib/api";
import { useResourceByParam } from "@/hooks/useResourceByParam";
import {
  appLinkBack,
  appMuted,
  appPageShell,
  appPageTitle,
  appPanelStack,
  appSectionLabel,
} from "@/lib/ui-classes";
import { RuleCategoryContent } from "@/components/wiki/RuleCategoryContent";
import { toast } from "sonner";

function titleFromRulePayload(data: unknown, fallback: string): string {
  if (
    data &&
    typeof data === "object" &&
    "title" in data &&
    typeof (data as { title: unknown }).title === "string"
  ) {
    return (data as { title: string }).title;
  }
  return fallback;
}

export default function WikiRuleCategoryPage() {
  const params = useParams();
  const raw = typeof params.category === "string" ? params.category : "";
  const category = decodeURIComponent(raw);
  const { data, loading, error } = useResourceByParam(category, getRuleCategory);

  const heading = useMemo(
    () => titleFromRulePayload(data, category),
    [data, category]
  );

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <main className={appPageShell} aria-busy={loading}>
      <div className="space-y-8">
        <Link
          href="/wiki/rules"
          className={appLinkBack}
          aria-label={"Torna all'indice delle regole"}
        >
          ← Regole
        </Link>
        {loading ? (
          <p className={appMuted} role="status">
            Caricamento…
          </p>
        ) : error ? (
          <p className={appMuted} role="alert">
            Impossibile caricare la categoria.
          </p>
        ) : (
          <article className={appPanelStack} aria-labelledby="wiki-rule-cat-title">
            <header className="space-y-1 border-b border-border/60 pb-4">
              <p className={appSectionLabel}>Regole</p>
              <h1 id="wiki-rule-cat-title" className={appPageTitle}>
                {heading}
              </h1>
            </header>
            <RuleCategoryContent categoryId={category} data={data} />
          </article>
        )}
      </div>
    </main>
  );
}
