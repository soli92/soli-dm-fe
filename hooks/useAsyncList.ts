"use client";

import { useEffect, useState } from "react";

/**
 * Carica una lista al mount. Passa solo funzioni **stabili** importate da `@/lib/api`
 * (non arrow create inline nel render).
 */
export function useAsyncList<T>(loader: () => Promise<T[]>) {
  const [list, setList] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    void loader()
      .then((data) => {
        if (!cancelled) setList(data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `loader` = export stabile da lib/api
  }, []);

  return { list, loading, error };
}
