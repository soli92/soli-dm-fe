"use client";

import { useEffect } from "react";
import Link from "next/link";
import { getDeities } from "@/lib/api";
import { useAsyncList } from "@/hooks/useAsyncList";
import { appLinkBack, appListItem, appMuted, appPageTitle } from "@/lib/ui-classes";
import { toast } from "sonner";

export default function WikiDeitiesPage() {
  const { list, loading, error } = useAsyncList(getDeities);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <main className="px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-4">
        <Link href="/wiki" className={appLinkBack}>
          ← Wiki
        </Link>
        <h1 className={appPageTitle}>Divinità</h1>
        {loading ? (
          <p className={appMuted}>Caricamento…</p>
        ) : (
          <ul className="space-y-2">
            {list.map((d) => (
              <li key={d.name}>
                <Link
                  href={`/wiki/deities/${encodeURIComponent(d.name)}`}
                  className={appListItem}
                >
                  <span className="font-medium text-foreground">{d.name}</span>
                  <span className={`${appMuted} text-sm block`}>{d.alignment}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
