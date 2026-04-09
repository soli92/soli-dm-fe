/** Notazioni rapide per il lancio dadi (NdX come da backend). */
export const DICE_NOTATION_PRESETS = [
  { notation: "1d20", label: "1d20" },
  { notation: "2d20", label: "2d20" },
  { notation: "1d100", label: "1d100" },
  { notation: "1d12", label: "1d12" },
  { notation: "1d10", label: "1d10" },
  { notation: "1d8", label: "1d8" },
  { notation: "1d6", label: "1d6" },
  { notation: "2d6", label: "2d6" },
  { notation: "4d6", label: "4d6" },
  { notation: "1d4", label: "1d4" },
] as const;

export type DiceNotationPreset = (typeof DICE_NOTATION_PRESETS)[number];
