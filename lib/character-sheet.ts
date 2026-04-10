import type { CharacterSheetData, CharacterGameSession, CharacterStats } from "./types";

function randomSessionId(): string {
  if (typeof globalThis !== "undefined" && globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }
  return `s-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const CHARACTER_ABILITY_KEYS = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
] as const;

export type CharacterAbilityKey = (typeof CHARACTER_ABILITY_KEYS)[number];

export const CHARACTER_ABILITY_LABELS_IT: Record<CharacterAbilityKey, string> =
  {
    strength: "Forza",
    dexterity: "Destrezza",
    constitution: "Costituzione",
    intelligence: "Intelligenza",
    wisdom: "Saggezza",
    charisma: "Carisma",
  };

export function emptySheetData(): CharacterSheetData {
  return {
    subclass: "",
    bonuses_penalties: "",
    armaments: "",
    deposit: "",
    sessions: [],
  };
}

function normalizeSession(raw: unknown): CharacterGameSession | null {
  if (raw == null || typeof raw !== "object" || Array.isArray(raw)) return null;
  const o = raw as Record<string, unknown>;
  const id =
    typeof o.id === "string" && o.id.trim() !== "" ? o.id : randomSessionId();
  const title = typeof o.title === "string" ? o.title : "";
  const session_date =
    typeof o.session_date === "string" ? o.session_date : undefined;
  const notes = typeof o.notes === "string" ? o.notes : "";
  return { id, title, session_date, notes };
}

export function normalizeSheetData(raw: unknown): CharacterSheetData {
  const base = emptySheetData();
  if (raw == null || typeof raw !== "object" || Array.isArray(raw)) return base;
  const o = raw as Record<string, unknown>;
  if (typeof o.subclass === "string") base.subclass = o.subclass;
  if (typeof o.bonuses_penalties === "string")
    base.bonuses_penalties = o.bonuses_penalties;
  if (typeof o.armaments === "string") base.armaments = o.armaments;
  if (typeof o.deposit === "string") base.deposit = o.deposit;
  if (Array.isArray(o.sessions)) {
    base.sessions = o.sessions
      .map(normalizeSession)
      .filter((s): s is CharacterGameSession => s != null);
  }
  return base;
}

export function defaultAbilityStats(): CharacterStats {
  return {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  };
}

export function normalizeCharacterStats(raw: unknown): CharacterStats {
  const d = defaultAbilityStats();
  if (raw == null || typeof raw !== "object" || Array.isArray(raw)) return d;
  const o = raw as Record<string, unknown>;
  for (const k of CHARACTER_ABILITY_KEYS) {
    const v = o[k];
    if (typeof v === "number" && Number.isFinite(v)) {
      d[k] = Math.round(v);
    }
  }
  return d;
}

export function newSessionEntry(): CharacterGameSession {
  return {
    id: randomSessionId(),
    title: "",
    notes: "",
  };
}
