"use client";

import { useEffect } from "react";
import Link from "next/link";
import { getRuleCategories } from "@/lib/api";
import { useAsyncList } from "@/hooks/useAsyncList";
import { appLinkBack, appListItem, appMuted, appPageTitle, appPanel } from "@/lib/ui-classes";
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
          <ul className="space-y-3">
            {list.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/wiki/rules/${encodeURIComponent(cat.id)}`}
                  className={`${appListItem} ${appPanel} block`}
                >
                  <span className="font-semibold font-serif text-foreground">{cat.title}</span>
                  <p className={`${appMuted} text-sm mt-1`}>{cat.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
