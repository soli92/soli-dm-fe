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
    <main className={appPageShell} aria-busy={loading}>
      <div className="space-y-8">
        <Link href="/wiki" className={appLinkBack} aria-label={"Torna alla wiki"}>
          ← Wiki
        </Link>
        <header className="space-y-2">
          <p className={appSectionLabel}>Wiki 5e</p>
          <h1 className={appPageTitle} id="wiki-deities-title">
            Divinità
          </h1>
        </header>
        {loading ? (
          <p className={appMuted} role="status">
            Caricamento…
          </p>
        ) : (
          <nav aria-labelledby="wiki-deities-title">
          <ul className="flex flex-col gap-3">
            {list.map((d) => (
              <li key={d.name}>
                <Link
                  href={`/wiki/deities/${encodeURIComponent(d.name)}`}
                  className={appListItem}
                  aria-label={`${d.name}, allineamento ${d.alignment}`}
                >
                  <span className="font-semibold text-foreground">{d.name}</span>
                  <span className={`${appMuted} mt-1 block text-sm`}>{d.alignment}</span>
                </Link>
              </li>
            ))}
          </ul>
          </nav>
        )}
      </div>
    </main>
  );
}
