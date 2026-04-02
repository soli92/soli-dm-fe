"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getCampaigns,
  createCampaign,
  type CreateCampaignInput,
} from "@/lib/api";
import type { Campaign } from "@/lib/types";

export function useCampaigns() {
  const [list, setList] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await getCampaigns();
      setList(data);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Errore caricamento");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const create = useCallback(
    async (data: CreateCampaignInput) => {
      setSaving(true);
      try {
        await createCampaign(data);
        await refresh();
      } finally {
        setSaving(false);
      }
    },
    [refresh]
  );

  return { list, loading, saving, loadError, refresh, create };
}
