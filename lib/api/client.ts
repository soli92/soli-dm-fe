import type { ApiErrorBody } from "../types";

export type ApiClientEnv = {
  baseUrl: string;
  apiKey: string;
};

function readEnv(): ApiClientEnv {
  const baseUrl =
    (typeof process !== "undefined" &&
      process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")) ||
    "http://localhost:5000";
  const apiKey =
    (typeof process !== "undefined" &&
      process.env.NEXT_PUBLIC_SOLI_DM_API_KEY?.trim()) ||
    "";
  return { baseUrl, apiKey };
}

function headersFor(apiKey: string): HeadersInit {
  const h: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (apiKey) {
    h["x-soli-dm-api-key"] = apiKey;
  }
  return h;
}

/** Factory utile in test con `fetch` mockato. */
export function createFetchJson(env: ApiClientEnv) {
  return async function fetchJson<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${env.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...headersFor(env.apiKey),
        ...(options?.headers as Record<string, string>),
      },
    });

    const body = (await response.json().catch(() => ({}))) as T & ApiErrorBody;

    if (!response.ok) {
      const msg =
        (body as ApiErrorBody).error ||
        (body as ApiErrorBody).message ||
        `API error: ${response.status}`;
      throw new Error(msg);
    }

    return body as T;
  };
}

const defaultFetchJson = createFetchJson(readEnv());

export async function fetchJson<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  return defaultFetchJson<T>(endpoint, options);
}
