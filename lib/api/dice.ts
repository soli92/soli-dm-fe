import type {
  ApiItemResponse,
  ApiListResponse,
  DiceRollResult,
  DiceRollRow,
} from "../types";
import { fetchJson } from "./client";

export type RollDiceInput = {
  notation: string;
  campaign_id?: string;
  character_id?: string;
};

export async function rollDice(input: RollDiceInput): Promise<DiceRollResult> {
  const res = await fetchJson<ApiItemResponse<DiceRollResult>>(
    "/api/dice/roll",
    {
      method: "POST",
      body: JSON.stringify(input),
    }
  );
  return res.data;
}

export async function getDiceHistory(
  campaignId: string,
  limit = 20
): Promise<DiceRollRow[]> {
  const q = new URLSearchParams({
    campaign_id: campaignId,
    limit: String(limit),
  });
  const res = await fetchJson<ApiListResponse<DiceRollRow[]>>(
    `/api/dice/history?${q}`
  );
  return res.data ?? [];
}
