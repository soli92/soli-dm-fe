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
import { cn } from "@/lib/utils";
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
    <main className={appPageShell}>
      <div className="space-y-8">
        <Link href="/wiki/rules" className={appLinkBack}>
          ← Regole
        </Link>
        {loading ? (
          <p className={appMuted}>Caricamento…</p>
        ) : error ? (
          <p className={appMuted}>Impossibile caricare la categoria.</p>
        ) : (
          <article className={appPanelStack}>
            <header className="space-y-1 border-b border-border/60 pb-4">
              <p className={appSectionLabel}>Regole</p>
              <h1 className={appPageTitle}>{heading}</h1>
            </header>
            <pre
              className={cn(
                "max-h-[min(70vh,32rem)] overflow-auto break-words rounded-xl border border-border/60 bg-muted/30 p-4 text-xs leading-relaxed text-muted-foreground",
                "whitespace-pre-wrap font-mono sm:text-sm"
              )}
            >
              {JSON.stringify(data, null, 2)}
            </pre>
          </article>
        )}
      </div>
    </main>
  );
}
