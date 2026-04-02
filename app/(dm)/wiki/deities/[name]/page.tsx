"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getDeityByName } from "@/lib/api";
import { useResourceByParam } from "@/hooks/useResourceByParam";
import { appLinkBack, appMuted, appPageTitle } from "@/lib/ui-classes";
import { toast } from "sonner";

export default function WikiDeityDetailPage() {
  const params = useParams();
  const raw = typeof params.name === "string" ? params.name : "";
  const name = decodeURIComponent(raw);
  const { data: d, loading, error } = useResourceByParam(name, getDeityByName);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <main className="px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-4">
        <Link href="/wiki/deities" className={appLinkBack}>
          ← Divinità
        </Link>
        {loading ? (
          <p className={appMuted}>Caricamento…</p>
        ) : !d ? (
          <p className={appMuted}>Divinità non trovata.</p>
        ) : (
          <>
            <h1 className={appPageTitle}>{d.name}</h1>
            <p className="text-primary font-medium">{d.alignment}</p>
            <p className="text-foreground/90">{d.description}</p>
            <p className={`${appMuted} text-sm`}>Dominio: {d.domain}</p>
            <p className={`${appMuted} text-sm`}>Simbolo: {d.holy_symbol}</p>
            <p className={`${appMuted} text-sm`}>{d.typical_worshippers}</p>
          </>
        )}
      </div>
    </main>
  );
}
