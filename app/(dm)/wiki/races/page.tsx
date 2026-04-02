"use client";

import { useEffect } from "react";
import Link from "next/link";
import { getRaces } from "@/lib/api";
import { useAsyncList } from "@/hooks/useAsyncList";
import { appLinkBack, appListItem, appMuted, appPageTitle } from "@/lib/ui-classes";
import { toast } from "sonner";

export default function WikiRacesPage() {
  const { list, loading, error } = useAsyncList(getRaces);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <main className="px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-4">
        <Link href="/wiki" className={appLinkBack}>
          ← Wiki
        </Link>
        <h1 className={appPageTitle}>Razze</h1>
        {loading ? (
          <p className={appMuted}>Caricamento…</p>
        ) : (
          <ul className="space-y-2">
            {list.map((r) => (
              <li key={r.name}>
                <Link
                  href={`/wiki/races/${encodeURIComponent(r.name)}`}
                  className={appListItem}
                >
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
