import type { CharacterAbilityKey } from "@/lib/character-sheet";

/** Bonus caratteristica tipici (SRD / PHB semplificati) per etichetta razza in scheda. */
export function getRacialBonusHints(race: string): string[] {
  const r = race.trim();
  const map: Record<string, string[]> = {
    Dragonborn: ["+2 Forza", "+1 Carisma"],
    Dwarf: ["+2 Costituzione"],
    Elf: ["+2 Destrezza"],
    Gnome: ["+2 Intelligenza"],
    "Half-Elf": ["+2 Carisma", "+1 a due caratteristiche a scelta"],
    "Half-Orc": ["+2 Forza", "+1 Costituzione"],
    Halfling: ["+2 Destrezza"],
    Human: ["+1 a tutte le caratteristiche (umano standard)"],
    Tiefling: ["+2 Carisma", "+1 Intelligenza"],
    Asimar: ["+2 Carisma"],
    Genasi: ["+2 Costituzione"],
    Goliath: ["+2 Forza", "+1 Costituzione"],
  };
  return map[r] ?? [];
}

/** Nota di riferimento su tiri salvezza / focus della classe (testo breve, non sostituisce il manuale). */
export function getClassReferenceHint(className: string): string {
  const c = className.trim();
  const map: Record<string, string> = {
    Barbarian: "Tiri salvezza: Forza, Costituzione.",
    Bard: "Tiri salvezza: Destrezza, Carisma.",
    Cleric: "Tiri salvezza: Saggezza, Carisma.",
    Druid: "Tiri salvezza: Intelligenza, Saggezza.",
    Fighter: "Tiri salvezza: Forza, Costituzione.",
    Monk: "Tiri salvezza: Forza, Destrezza.",
    Paladin: "Tiri salvezza: Saggezza, Carisma.",
    Ranger: "Tiri salvezza: Forza, Destrezza.",
    Rogue: "Tiri salvezza: Destrezza, Intelligenza.",
    Sorcerer: "Tiri salvezza: Costituzione, Carisma.",
    Warlock: "Tiri salvezza: Saggezza, Carisma.",
    Wizard: "Tiri salvezza: Intelligenza, Saggezza.",
    Warrior: "Come combattente marziale: spesso Forza o Destrezza; tiri salvezza tipici Forza e Costituzione (allinea a Fighter).",
  };
  return map[c] ?? "Consulta la descrizione della classe per tiri salvezza e competenze.";
}

/** Somma i bonus numerici noti dalla razza (solo voci fisse; es. Half-Elf “scelta” resta fuori). */
export function getFixedRacialAbilityBonuses(
  race: string
): Partial<Record<CharacterAbilityKey, number>> {
  const r = race.trim();
  const out: Partial<Record<CharacterAbilityKey, number>> = {};
  const add = (k: CharacterAbilityKey, v: number) => {
    out[k] = (out[k] ?? 0) + v;
  };
  switch (r) {
    case "Dragonborn":
      add("strength", 2);
      add("charisma", 1);
      break;
    case "Dwarf":
      add("constitution", 2);
      break;
    case "Elf":
      add("dexterity", 2);
      break;
    case "Gnome":
      add("intelligence", 2);
      break;
    case "Half-Elf":
      add("charisma", 2);
      break;
    case "Half-Orc":
      add("strength", 2);
      add("constitution", 1);
      break;
    case "Halfling":
      add("dexterity", 2);
      break;
    case "Human":
      for (const k of [
        "strength",
        "dexterity",
        "constitution",
        "intelligence",
        "wisdom",
        "charisma",
      ] as CharacterAbilityKey[]) {
        add(k, 1);
      }
      break;
    case "Tiefling":
      add("charisma", 2);
      add("intelligence", 1);
      break;
    case "Asimar":
      add("charisma", 2);
      break;
    case "Genasi":
      add("constitution", 2);
      break;
    case "Goliath":
      add("strength", 2);
      add("constitution", 1);
      break;
    default:
      break;
  }
  return out;
}
