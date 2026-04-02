import { renderHook, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Campaign } from "@/lib/types";
import { useCampaigns } from "@/hooks/useCampaigns";

const getCampaigns = vi.fn();
const createCampaign = vi.fn();

vi.mock("@/lib/api", () => ({
  getCampaigns: (...a: unknown[]) => getCampaigns(...a),
  createCampaign: (...a: unknown[]) => createCampaign(...a),
}));

const sample: Campaign = {
  id: "c1",
  name: "Prima campagna",
  description: null,
  dm_name: "Mago",
  world_setting: null,
  level_range: null,
};

describe("useCampaigns", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getCampaigns.mockResolvedValue([]);
  });

  it("dopo il mount carica la lista e termina loading", async () => {
    getCampaigns.mockResolvedValueOnce([sample]);
    const { result } = renderHook(() => useCampaigns());
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.list).toEqual([sample]);
    expect(result.current.loadError).toBeNull();
  });

  it("imposta loadError se getCampaigns fallisce", async () => {
    getCampaigns.mockRejectedValueOnce(new Error("rete"));
    const { result } = renderHook(() => useCampaigns());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.list).toEqual([]);
    expect(result.current.loadError).toBe("rete");
  });

  it("create chiama l’API e poi refresh", async () => {
    getCampaigns.mockResolvedValue([]);
    createCampaign.mockResolvedValue(undefined);
    const { result } = renderHook(() => useCampaigns());
    await waitFor(() => expect(result.current.loading).toBe(false));
    const beforeCalls = getCampaigns.mock.calls.length;
    await act(async () => {
      await result.current.create({
        name: "Nuova",
        dm_name: "DM",
      });
    });
    expect(createCampaign).toHaveBeenCalledWith({
      name: "Nuova",
      dm_name: "DM",
    });
    expect(getCampaigns.mock.calls.length).toBeGreaterThan(beforeCalls);
  });
});
