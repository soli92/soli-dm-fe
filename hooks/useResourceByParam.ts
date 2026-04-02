"use client";

import { useEffect, useState } from "react";

/**
 * Carica una risorsa in base a un parametro URL (id, slug, …).
 * Il fetcher è tipicamente un import stabile da `@/lib/api`.
 */
export function useResourceByParam<T>(
  param: string,
  fetcher: (p: string) => Promise<T>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(Boolean(param));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!param) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    void fetcher(param)
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Errore");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // fetcher da @/lib/api è stabile; dipendere da essa causerebbe loop se inline.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- solo `param`
  }, [param]);

  return { data, loading, error };
}
