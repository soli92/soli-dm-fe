import { describe, it, expect } from "vitest";
import {
  defaultAbilityStats,
  emptySheetData,
  normalizeCharacterStats,
  normalizeSheetData,
  newSessionEntry,
  CHARACTER_ABILITY_KEYS,
} from "@/lib/character-sheet";

describe("character-sheet", () => {
  it("defaultAbilityStats ha tutte le caratteristiche a 10", () => {
    const s = defaultAbilityStats();
    for (const k of CHARACTER_ABILITY_KEYS) {
      expect(s[k]).toBe(10);
    }
  });

  it("normalizeCharacterStats ignora valori non numerici e arrotonda", () => {
    expect(
      normalizeCharacterStats({
        strength: 16,
        dexterity: "12" as unknown as number,
        wisdom: NaN,
      })
    ).toMatchObject({
      strength: 16,
      dexterity: 10,
      wisdom: 10,
    });
  });

  it("normalizeSheetData restituisce default su input invalido", () => {
    expect(normalizeSheetData(null)).toEqual(emptySheetData());
    expect(normalizeSheetData([])).toEqual(emptySheetData());
  });

  it("normalizeSheetData legge campi e sessioni", () => {
    const n = normalizeSheetData({
      subclass: "Champion",
      bonuses_penalties: "+1",
      armaments: "Lancia",
      deposit: "Oro",
      sessions: [
        { id: "a", title: "G1", session_date: "2026-01-01", notes: "ok" },
      ],
    });
    expect(n.subclass).toBe("Champion");
    expect(n.sessions).toHaveLength(1);
    expect(n.sessions![0]!.title).toBe("G1");
    expect(n.sessions![0]!.notes).toBe("ok");
  });

  it("newSessionEntry ha id e campi vuoti", () => {
    const s = newSessionEntry();
    expect(s.id.length).toBeGreaterThan(0);
    expect(s.title).toBe("");
    expect(s.notes).toBe("");
  });
});
