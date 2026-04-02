"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getRuleCategory } from "@/lib/api";
import { useResourceByParam } from "@/hooks/useResourceByParam";
import { appLinkBack, appMuted, appPageTitle, appPanel } from "@/lib/ui-classes";
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
    <main className="px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-4">
        <Link href="/wiki/rules" className={appLinkBack}>
          ← Regole
        </Link>
        {loading ? (
          <p className={appMuted}>Caricamento…</p>
        ) : error ? (
          <p className={appMuted}>Impossibile caricare la categoria.</p>
        ) : (
          <>
            <h1 className={appPageTitle}>{heading}</h1>
            <pre
              className={`${appPanel} text-sm text-muted-foreground overflow-x-auto whitespace-pre-wrap font-mono`}
            >
              {JSON.stringify(data, null, 2)}
            </pre>
          </>
        )}
      </div>
    </main>
  );
}
