import { describe, it, expect } from "vitest";
import {
  CUSTOM_SUBCLASS_SELECT_VALUE,
  PLAYBOOK_CLASS_NAMES,
  SUBCLASSES_BY_CLASS,
  getSubclassOptionsForClass,
  isSubclassInPlaybook,
} from "@/lib/tipologiche";

describe("tipologiche/subclasses", () => {
  it("ogni classe playbook ha un array di sottoclassi definito", () => {
    for (const c of PLAYBOOK_CLASS_NAMES) {
      const list = SUBCLASSES_BY_CLASS[c];
      expect(Array.isArray(list)).toBe(true);
      expect(list.length).toBeGreaterThan(0);
    }
  });

  it("getSubclassOptionsForClass: classe sconosciuta o vuota → []", () => {
    expect(getSubclassOptionsForClass("")).toEqual([]);
    expect(getSubclassOptionsForClass("   ")).toEqual([]);
    expect(getSubclassOptionsForClass("NecromancerPrime")).toEqual([]);
  });

  it("il valore sentinella custom non è mai un’opzione SRD", () => {
    for (const c of PLAYBOOK_CLASS_NAMES) {
      expect(SUBCLASSES_BY_CLASS[c]).not.toContain(
        CUSTOM_SUBCLASS_SELECT_VALUE
      );
    }
  });

  it("isSubclassInPlaybook riconosce voci dell’elenco", () => {
    expect(isSubclassInPlaybook("Cleric", "Life Domain")).toBe(true);
    expect(isSubclassInPlaybook("Cleric", "Vita inventata")).toBe(false);
  });
});
