"use client";

import { useEffect } from "react";
import Link from "next/link";
import { getClasses } from "@/lib/api";
import { useAsyncList } from "@/hooks/useAsyncList";
import { appLinkBack, appListItem, appMuted, appPageTitle } from "@/lib/ui-classes";
import { toast } from "sonner";

export default function WikiClassesPage() {
  const { list, loading, error } = useAsyncList(getClasses);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <main className="px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-4">
        <Link href="/wiki" className={appLinkBack}>
          ← Wiki
        </Link>
        <h1 className={appPageTitle}>Classi</h1>
        {loading ? (
          <p className={appMuted}>Caricamento…</p>
        ) : (
          <ul className="space-y-2">
            {list.map((c) => (
              <li key={c.name}>
                <Link
                  href={`/wiki/classes/${encodeURIComponent(c.name)}`}
                  className={appListItem}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
