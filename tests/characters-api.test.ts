import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { updateCharacter } from "@/lib/api/characters";

describe("updateCharacter", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            id: "char-1",
            campaign_id: "camp-1",
            character_name: "Hero",
            player_name: null,
            class_name: "Fighter",
            race: "Human",
            level: 3,
            alignment: "Neutral",
            background: null,
            stats: { strength: 12 },
            sheet_data: { deposit: "pozione" },
          },
        }),
      } as Response)
    );
  });

  afterEach(() => {
    vi.stubGlobal("fetch", originalFetch);
  });

  it("invia PUT con body JSON e restituisce il personaggio", async () => {
    const ch = await updateCharacter("char-1", {
      level: 3,
      sheet_data: { deposit: "pozione" },
    });
    expect(ch.level).toBe(3);
    expect(ch.sheet_data?.deposit).toBe("pozione");
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/characters\/char-1$/),
      expect.objectContaining({
        method: "PUT",
        body: JSON.stringify({
          level: 3,
          sheet_data: { deposit: "pozione" },
        }),
      })
    );
  });
});
