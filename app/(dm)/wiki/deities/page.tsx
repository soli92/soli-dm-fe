"use client";

import { useEffect } from "react";
import Link from "next/link";
import { getDeities } from "@/lib/api";
import { useAsyncList } from "@/hooks/useAsyncList";
import {
  appLinkBack,
  appListItem,
  appMuted,
  appPageShell,
  appPageTitle,
  appSectionLabel,
} from "@/lib/ui-classes";
import { toast } from "sonner";

export default function WikiDeitiesPage() {
  const { list, loading, error } = useAsyncList(getDeities);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <main className={appPageShell}>
      <div className="space-y-8">
        <Link href="/wiki" className={appLinkBack}>
          ← Wiki
        </Link>
        <header className="space-y-2">
          <p className={appSectionLabel}>Wiki 5e</p>
          <h1 className={appPageTitle}>Divinità</h1>
        </header>
        {loading ? (
          <p className={appMuted}>Caricamento…</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {list.map((d) => (
              <li key={d.name}>
                <Link
                  href={`/wiki/deities/${encodeURIComponent(d.name)}`}
                  className={appListItem}
                >
                  <span className="font-semibold text-foreground">{d.name}</span>
                  <span className={`${appMuted} mt-1 block text-sm`}>{d.alignment}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
