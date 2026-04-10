import { describe, it, expect } from "vitest";
import {
  getClassReferenceHint,
  getFixedRacialAbilityBonuses,
  getRacialBonusHints,
} from "@/lib/racial-class-reference";

describe("racial-class-reference", () => {
  it("getRacialBonusHints per Elf", () => {
    expect(getRacialBonusHints("Elf")).toContain("+2 Destrezza");
  });

  it("getFixedRacialAbilityBonuses per Human +1 tutte", () => {
    const b = getFixedRacialAbilityBonuses("Human");
    expect(b.strength).toBe(1);
    expect(b.charisma).toBe(1);
  });

  it("getClassReferenceHint per Fighter", () => {
    expect(getClassReferenceHint("Fighter")).toMatch(/Forza/i);
  });
});
