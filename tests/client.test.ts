import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createFetchJson } from "@/lib/api/client";

describe("createFetchJson", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, data: { n: 42 } }),
      })
    );
  });

  afterEach(() => {
    vi.stubGlobal("fetch", originalFetch);
  });

  it("GET unisce baseUrl ed endpoint e restituisce il body tipizzato", async () => {
    const fetchJson = createFetchJson({ baseUrl: "http://api.test", apiKey: "" });
    const body = await fetchJson<{ success: boolean; data: { n: number } }>("/foo");
    expect(body.data.n).toBe(42);
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      "http://api.test/foo",
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      })
    );
  });

  it("invia x-soli-dm-api-key quando apiKey non è vuota", async () => {
    const fetchJson = createFetchJson({
      baseUrl: "http://api.test",
      apiKey: "secret",
    });
    await fetchJson("/x");
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      "http://api.test/x",
      expect.objectContaining({
        headers: expect.objectContaining({
          "x-soli-dm-api-key": "secret",
        }),
      })
    );
  });

  it("su risposta non ok lancia con messaggio da body.error", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "vietato" }),
    } as Response);
    const fetchJson = createFetchJson({ baseUrl: "http://x", apiKey: "" });
    await expect(fetchJson("/")).rejects.toThrow("vietato");
  });
});
