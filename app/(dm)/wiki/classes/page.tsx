"use client";

import { useEffect } from "react";
import Link from "next/link";
import { getClasses } from "@/lib/api";
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

export default function WikiClassesPage() {
  const { list, loading, error } = useAsyncList(getClasses);

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
          <h1 className={appPageTitle}>Classi</h1>
        </header>
        {loading ? (
          <p className={appMuted}>Caricamento…</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {list.map((c) => (
              <li key={c.name}>
                <Link
                  href={`/wiki/classes/${encodeURIComponent(c.name)}`}
                  className={appListItem}
                >
                  <span className="font-semibold text-foreground">{c.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
