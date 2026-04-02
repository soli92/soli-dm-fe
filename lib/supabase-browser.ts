import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function normalizePublicEnv(value: string | undefined): string {
  if (value == null) return "";
  const t = String(value).trim();
  if (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    return t.slice(1, -1).trim();
  }
  return t;
}

const rawUrl = normalizePublicEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
const rawAnon = normalizePublicEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

function isValidHttpUrl(s: string): boolean {
  if (!s) return false;
  try {
    const u = new URL(s);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

/** Evita di chiamare createClient con placeholder da .env.example o valori incompleti. */
function looksLikePlaceholderUrl(url: string): boolean {
  const u = url.toLowerCase();
  return u.includes("your-project") || u.includes("placeholder");
}

function looksLikePlaceholderAnon(key: string): boolean {
  if (key.length < 32) return true;
  const k = key.toLowerCase();
  return (
    k.includes("your-anon") ||
    k.includes("placeholder") ||
    k.includes("changeme")
  );
}

export function isSupabaseConfigured(): boolean {
  return (
    isValidHttpUrl(rawUrl) &&
    !looksLikePlaceholderUrl(rawUrl) &&
    Boolean(rawAnon) &&
    !looksLikePlaceholderAnon(rawAnon)
  );
}

let client: SupabaseClient | null = null;

export function getSupabaseBrowser(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!client) {
    try {
      client = createClient(rawUrl, rawAnon);
    } catch {
      client = null;
    }
  }
  return client;
}
