import type {
  ApiItemResponse,
  ApiListResponse,
  WikiClass,
  WikiDeity,
  WikiRace,
  WikiRuleCategoryMeta,
} from "../types";
import { fetchJson } from "./client";

export async function getClasses(): Promise<WikiClass[]> {
  const res = await fetchJson<ApiListResponse<WikiClass[]>>("/api/classes");
  return res.data ?? [];
}

export async function getClassByName(name: string): Promise<WikiClass> {
  const enc = encodeURIComponent(name);
  const res = await fetchJson<ApiItemResponse<WikiClass>>(`/api/classes/${enc}`);
  return res.data;
}

export async function getRaces(): Promise<WikiRace[]> {
  const res = await fetchJson<ApiListResponse<WikiRace[]>>("/api/races");
  return res.data ?? [];
}

export async function getRaceByName(name: string): Promise<WikiRace> {
  const enc = encodeURIComponent(name);
  const res = await fetchJson<ApiItemResponse<WikiRace>>(`/api/races/${enc}`);
  return res.data;
}

export async function getDeities(): Promise<WikiDeity[]> {
  const res = await fetchJson<ApiListResponse<WikiDeity[]>>("/api/deities");
  return res.data ?? [];
}

export async function getDeityByName(name: string): Promise<WikiDeity> {
  const enc = encodeURIComponent(name);
  const res = await fetchJson<ApiItemResponse<WikiDeity>>(`/api/deities/${enc}`);
  return res.data;
}

export async function getRuleCategories(): Promise<WikiRuleCategoryMeta[]> {
  const res = await fetchJson<ApiListResponse<WikiRuleCategoryMeta[]>>(
    "/api/rules"
  );
  return res.data ?? [];
}

export async function getRuleCategory(categoryId: string): Promise<unknown> {
  const enc = encodeURIComponent(categoryId);
  const res = await fetchJson<ApiItemResponse<unknown>>(`/api/rules/${enc}`);
  return res.data;
}
