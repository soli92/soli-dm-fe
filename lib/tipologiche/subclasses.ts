/**
 * Sottoclassi / percorsi / domini SRD 5e (etichette inglesi, coerenti con PHB/SRD).
 * Allineare al `PLAYBOOK_CLASS_NAMES` in `dnd.ts` (una entry per classe in form).
 */

import type { PlaybookClassName } from "./dnd";

const FIGHTER_SUBCLASSES = [
  "Champion",
  "Battle Master",
  "Eldritch Knight",
] as const;

/** Valore `<select>` per aprire il campo testo personalizzato (non salvare in DB). */
export const CUSTOM_SUBCLASS_SELECT_VALUE = "__soli_custom_subclass__";

export const SUBCLASSES_BY_CLASS: {
  readonly [K in PlaybookClassName]: readonly string[];
} = {
  Barbarian: ["Path of the Berserker", "Path of the Totem Warrior"],
  Bard: ["College of Lore", "College of Valor"],
  Cleric: [
    "Knowledge Domain",
    "Life Domain",
    "Light Domain",
    "Nature Domain",
    "Tempest Domain",
    "Trickery Domain",
    "War Domain",
  ],
  Druid: ["Circle of the Land", "Circle of the Moon"],
  Fighter: [...FIGHTER_SUBCLASSES],
  Monk: [
    "Way of the Open Hand",
    "Way of Shadow",
    "Way of the Four Elements",
  ],
  Paladin: [
    "Oath of Devotion",
    "Oath of the Ancients",
    "Oath of Vengeance",
  ],
  Ranger: ["Hunter", "Beast Master"],
  Rogue: ["Thief", "Assassin", "Arcane Trickster"],
  Sorcerer: ["Draconic Bloodline", "Wild Magic"],
  Warlock: ["The Fiend", "The Archfey", "The Great Old One"],
  Wizard: [
    "School of Abjuration",
    "School of Conjuration",
    "School of Divination",
    "School of Enchantment",
    "School of Evocation",
    "School of Illusion",
    "School of Necromancy",
    "School of Transmutation",
  ],
  /** Stesso elenco del Fighter (etichetta alternativa in tavola). */
  Warrior: [...FIGHTER_SUBCLASSES],
};

export function getSubclassOptionsForClass(
  className: string
): readonly string[] {
  const key = className.trim() as PlaybookClassName;
  if (key in SUBCLASSES_BY_CLASS) {
    return SUBCLASSES_BY_CLASS[key];
  }
  return [];
}

export function isSubclassInPlaybook(
  className: string,
  subclass: string
): boolean {
  const s = subclass.trim();
  if (!s) return true;
  return getSubclassOptionsForClass(className).includes(s);
}
