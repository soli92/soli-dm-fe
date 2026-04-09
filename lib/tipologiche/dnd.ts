/**
 * Tipologiche D&D 5e (etichette allineate al PHB/SRD, lingua inglese per coerenza con API wiki).
 */

export const DND_ALIGNMENTS = [
  "Lawful Good",
  "Neutral Good",
  "Chaotic Good",
  "Lawful Neutral",
  "Neutral",
  "Chaotic Neutral",
  "Lawful Evil",
  "Neutral Evil",
  "Chaotic Evil",
] as const;

export type DndAlignment = (typeof DND_ALIGNMENTS)[number];

/** Classi SRD (12) — stesso set della wiki/API standard. */
export const SRD_CLASS_NAMES = [
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard",
] as const;

export type SrdClassName = (typeof SRD_CLASS_NAMES)[number];

/**
 * Razze offerte in creazione guidata (include SRD + estese dal fallback wiki backend).
 */
export const PLAYBOOK_RACE_NAMES = [
  "Dragonborn",
  "Dwarf",
  "Elf",
  "Gnome",
  "Half-Elf",
  "Half-Orc",
  "Halfling",
  "Human",
  "Tiefling",
  "Asimar",
  "Genasi",
  "Goliath",
] as const;

export type PlaybookRaceName = (typeof PLAYBOOK_RACE_NAMES)[number];

export const DND_ABILITY_KEYS = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
] as const;

export type DndAbilityKey = (typeof DND_ABILITY_KEYS)[number];

/** Etichette UI italiane per caratteristiche (chiavi API restano inglesi). */
export const DND_ABILITY_LABELS_IT: Record<DndAbilityKey, string> = {
  strength: "Forza",
  dexterity: "Destrezza",
  constitution: "Costituzione",
  intelligence: "Intelligenza",
  wisdom: "Saggezza",
  charisma: "Carisma",
};
