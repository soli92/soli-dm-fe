import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || "";

let client: SupabaseClient | null = null;

export function getSupabaseBrowser(): SupabaseClient | null {
  if (!url || !anon) return null;
  if (!client) {
    client = createClient(url, anon);
  }
  return client;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anon);
}
