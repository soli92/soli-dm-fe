"use client";

import { useEffect } from "react";
import Link from "next/link";
import { getRuleCategories } from "@/lib/api";
import { useAsyncList } from "@/hooks/useAsyncList";
import {
  appLinkBack,
  appMuted,
  appPageShell,
  appPageTitle,
  appPanelStack,
  appSectionLabel,
  appTitle,
} from "@/lib/ui-classes";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function WikiRulesPage() {
  const { list, loading, error } = useAsyncList(getRuleCategories);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const cardLink = cn(
    appPanelStack,
    "block no-underline motion-safe:transition-[box-shadow,border-color,transform]",
    "hover:border-primary/35 hover:shadow-md motion-safe:active:scale-[0.99]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  );

  return (
    <main className={appPageShell}>
      <div className="space-y-8">
        <Link href="/wiki" className={appLinkBack}>
          ← Wiki
        </Link>
        <header className="space-y-2">
          <p className={appSectionLabel}>Wiki 5e</p>
          <h1 className={appPageTitle}>Regole</h1>
        </header>
        {loading ? (
          <p className={appMuted}>Caricamento…</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {list.map((cat) => (
              <li key={cat.id}>
                <Link href={`/wiki/rules/${encodeURIComponent(cat.id)}`} className={cardLink}>
                  <span className={appTitle}>{cat.title}</span>
                  <p className={`${appMuted} text-sm leading-relaxed`}>{cat.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
