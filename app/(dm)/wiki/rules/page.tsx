"use client";

import { useEffect } from "react";
import Link from "next/link";
import { getRuleCategories } from "@/lib/api";
import { useAsyncList } from "@/hooks/useAsyncList";
import {
  appLinkBack,
  appMuted,
  appPageTitle,
  appPanelStack,
} from "@/lib/ui-classes";
import { toast } from "sonner";

export default function WikiRulesPage() {
  const { list, loading, error } = useAsyncList(getRuleCategories);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <main className="px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-4">
        <Link href="/wiki" className={appLinkBack}>
          ← Wiki
        </Link>
        <h1 className={appPageTitle}>Regole</h1>
        {loading ? (
          <p className={appMuted}>Caricamento…</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {list.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/wiki/rules/${encodeURIComponent(cat.id)}`}
                  className={`${appPanelStack} block no-underline transition-colors hover:border-primary/40`}
                >
                  <span className="font-serif font-semibold text-foreground">
                    {cat.title}
                  </span>
                  <p className={`${appMuted} text-sm leading-relaxed`}>
                    {cat.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
