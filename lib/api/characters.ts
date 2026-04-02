import type {
  ApiItemResponse,
  ApiListResponse,
  Character,
  CreateCharacterInput,
} from "../types";
import { fetchJson } from "./client";

export async function getCharacters(campaignId?: string): Promise<Character[]> {
  const q = campaignId
    ? `?campaign_id=${encodeURIComponent(campaignId)}`
    : "";
  const res = await fetchJson<ApiListResponse<Character[]>>(
    `/api/characters${q}`
  );
  return res.data ?? [];
}

export async function getCharacter(id: string): Promise<Character> {
  const res = await fetchJson<ApiItemResponse<Character>>(
    `/api/characters/${id}`
  );
  return res.data;
}

export async function createCharacter(
  data: CreateCharacterInput
): Promise<Character> {
  const res = await fetchJson<ApiItemResponse<Character>>("/api/characters", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.data;
}
