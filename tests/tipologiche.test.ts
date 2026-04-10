import { describe, it, expect } from "vitest";
import {
  CAMPAIGN_LEVEL_RANGE_PRESETS,
  CAMPAIGN_STATUSES,
  CHARACTER_STATUSES,
  DICE_NOTATION_PRESETS,
  DND_ALIGNMENTS,
  PLAYBOOK_CLASS_NAMES,
  PLAYBOOK_RACE_NAMES,
  SRD_CLASS_NAMES,
  isWikiRuleCategoryId,
} from "@/lib/tipologiche";

describe("tipologiche", () => {
  it("allineamenti PHB: 9 voci (allineare a soli-dm-be src/lib/tipologiche.ts)", () => {
    expect(DND_ALIGNMENTS).toHaveLength(9);
    expect(DND_ALIGNMENTS).toContain("Neutral");
  });

  it("classi SRD: 12 voci (wiki/API)", () => {
    expect(SRD_CLASS_NAMES).toHaveLength(12);
    expect(SRD_CLASS_NAMES).toContain("Fighter");
  });

  it("classi playbook form: include SRD e Warrior", () => {
    expect(PLAYBOOK_CLASS_NAMES).toHaveLength(13);
    expect(PLAYBOOK_CLASS_NAMES).toContain("Warrior");
    expect(PLAYBOOK_CLASS_NAMES).toContain("Fighter");
    for (const c of SRD_CLASS_NAMES) {
      expect(PLAYBOOK_CLASS_NAMES).toContain(c);
    }
  });

  it("razze playbook: 12 voci (SRD + estese)", () => {
    expect(PLAYBOOK_RACE_NAMES).toHaveLength(12);
    expect(PLAYBOOK_RACE_NAMES).toContain("Human");
  });

  it("stati campagna/personaggio allineati al backend", () => {
    expect(CAMPAIGN_STATUSES).toEqual(["active", "paused", "completed", "archived"]);
    expect(CHARACTER_STATUSES).toEqual(["active", "inactive", "dead"]);
  });

  it("preset range livelli ha valori attesi", () => {
    expect(CAMPAIGN_LEVEL_RANGE_PRESETS[0]?.value).toBe("1-4");
    expect(CAMPAIGN_LEVEL_RANGE_PRESETS.length).toBeGreaterThanOrEqual(5);
  });

  it("preset dadi hanno notazione non vuota", () => {
    expect(DICE_NOTATION_PRESETS.length).toBeGreaterThan(0);
    for (const p of DICE_NOTATION_PRESETS) {
      expect(p.notation.trim().length).toBeGreaterThan(0);
    }
  });

  it("isWikiRuleCategoryId riconosce categorie API rules", () => {
    expect(isWikiRuleCategoryId("combat")).toBe(true);
    expect(isWikiRuleCategoryId("ability_scores")).toBe(true);
    expect(isWikiRuleCategoryId("unknown_category")).toBe(false);
  });
});
