export type ApiErrorBody = { error?: string; message?: string };

export type ApiListResponse<T> = {
  success: boolean;
  data: T;
  count?: number;
};

export type ApiItemResponse<T> = {
  success: boolean;
  data: T;
};

export type Campaign = {
  id: string;
  name: string;
  description: string | null;
  dm_name: string;
  world_setting: string | null;
  level_range: string | null;
  status?: string;
  created_at?: string;
  updated_at?: string;
};

/** Body per POST /api/campaigns */
export type CreateCampaignInput = {
  name: string;
  description?: string;
  dm_name: string;
  world_setting?: string;
  level_range?: string;
};

export type CharacterStats = Record<string, number>;

/** Body accettato da POST /api/characters */
export type CreateCharacterInput = {
  campaign_id: string;
  player_name?: string | null;
  character_name: string;
  class_name: string;
  race: string;
  level?: number;
  experience?: number;
  alignment?: string;
  background?: string | null;
  stats?: CharacterStats;
};

export type Character = {
  id: string;
  campaign_id: string;
  player_name: string | null;
  character_name: string;
  class_name: string;
  race: string;
  level: number;
  experience?: number;
  alignment: string;
  background: string | null;
  stats: CharacterStats;
  status?: string;
  created_at?: string;
};

export type DiceRollResult = {
  notation: string;
  rolls: number[];
  total: number;
};

export type DiceRollRow = {
  id: string;
  campaign_id: string;
  character_id: string | null;
  notation: string;
  result_total: number;
  result_rolls: number[];
  created_at?: string;
};

export type WikiClass = {
  name: string;
  description: string;
  hit_die: string;
  primary_ability: string;
  saving_throws: string[];
  armor_proficiency: string;
  weapon_proficiency: string;
  features: string[];
};

export type WikiRace = {
  name: string;
  description: string;
  ability_scores: Record<string, number>;
  size: string;
  speed: string;
  languages: string[];
  traits: string[];
};

export type WikiDeity = {
  name: string;
  alignment: string;
  domain: string;
  description: string;
  holy_symbol: string;
  typical_worshippers: string;
};

export type WikiRuleCategoryMeta = {
  id: string;
  title: string;
  description: string;
};
