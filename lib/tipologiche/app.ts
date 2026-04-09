/**
 * Tipologiche di dominio applicativo (campagne, personaggi).
 */

export const CAMPAIGN_STATUSES = ["active", "paused", "completed", "archived"] as const;
export type CampaignStatus = (typeof CAMPAIGN_STATUSES)[number];

export const CHARACTER_STATUSES = ["active", "inactive", "dead"] as const;
export type CharacterStatus = (typeof CHARACTER_STATUSES)[number];

/** Range livelli suggeriti per nuova campagna (valore inviato all’API). */
export const CAMPAIGN_LEVEL_RANGE_PRESETS = [
  { value: "1-4", label: "Livelli 1–4 (incipit)" },
  { value: "1-5", label: "Livelli 1–5" },
  { value: "1-10", label: "Livelli 1–10" },
  { value: "1-20", label: "Livelli 1–20 (campagna lunga)" },
  { value: "5-10", label: "Livelli 5–10" },
  { value: "11-16", label: "Livelli 11–16" },
  { value: "17-20", label: "Livelli 17–20 (endgame)" },
] as const;

export type CampaignLevelRangePreset = (typeof CAMPAIGN_LEVEL_RANGE_PRESETS)[number];
