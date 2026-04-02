import type {
  ApiItemResponse,
  ApiListResponse,
  Campaign,
  CreateCampaignInput,
} from "../types";
import { fetchJson } from "./client";

export type { CreateCampaignInput };

export async function getCampaigns(): Promise<Campaign[]> {
  const res = await fetchJson<ApiListResponse<Campaign[]>>("/api/campaigns");
  return res.data ?? [];
}

export async function getCampaign(id: string): Promise<Campaign> {
  const res = await fetchJson<ApiItemResponse<Campaign>>(`/api/campaigns/${id}`);
  return res.data;
}

export async function createCampaign(
  data: CreateCampaignInput
): Promise<Campaign> {
  const res = await fetchJson<ApiItemResponse<Campaign>>("/api/campaigns", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.data;
}

export async function updateCampaign(
  id: string,
  updates: Partial<Omit<Campaign, "id">>
): Promise<Campaign> {
  const res = await fetchJson<ApiItemResponse<Campaign>>(
    `/api/campaigns/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(updates),
    }
  );
  return res.data;
}

export async function deleteCampaign(id: string): Promise<void> {
  await fetchJson(`/api/campaigns/${id}`, { method: "DELETE" });
}
