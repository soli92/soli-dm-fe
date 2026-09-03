#!/usr/bin/env node
/**
 * Diagnostica rapida del backend Soli DM.
 * Uso: npm run check:backend
 *      API_URL=https://soli-dm-be.onrender.com npm run check:backend
 */

const base = (
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://soli-dm-be.onrender.com"
).replace(/\/$/, "");

function fail(message) {
  console.error(`✗ ${message}`);
  process.exitCode = 1;
}

function ok(message) {
  console.log(`✓ ${message}`);
}

async function fetchJson(path) {
  const res = await fetch(`${base}${path}`);
  const text = await res.text();
  let body;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`${path}: risposta non JSON (${res.status})`);
  }
  return { res, body };
}

console.log(`Backend: ${base}\n`);

try {
  const health = await fetchJson("/health");
  if (!health.res.ok || health.body?.status !== "ok") {
    fail(`/health → HTTP ${health.res.status}`);
  } else {
    ok("/health risponde");
    if (health.body.supabase) {
      if (health.body.supabase.configured) {
        ok("Supabase configurato (secondo /health)");
      } else {
        fail(
          `Supabase non configurato: ${(health.body.supabase.issues || []).join("; ")}`
        );
      }
    } else {
      console.log("ℹ /health senza campo supabase (deploy backend fix consigliato)");
    }
  }

  const campaigns = await fetchJson("/api/campaigns");
  if (campaigns.res.ok && campaigns.body?.success) {
    ok(`/api/campaigns → ${campaigns.body.count ?? 0} campagne`);
  } else {
    fail(
      `/api/campaigns → HTTP ${campaigns.res.status}: ${campaigns.body?.error ?? "errore"}`
    );
  }

  const classes = await fetchJson("/api/classes");
  if (classes.res.ok && classes.body?.success) {
    ok(`/api/classes → ${classes.body.count ?? classes.body.data?.length ?? "?"} classi`);
  } else {
    fail(`/api/classes → HTTP ${classes.res.status}`);
  }
} catch (err) {
  fail(err instanceof Error ? err.message : String(err));
}

if (process.exitCode) {
  console.log(
    "\nSuggerimento: su Render (soli-dm-be) imposta SUPABASE_URL e SUPABASE_SERVICE_KEY, poi Manual Deploy."
  );
} else {
  console.log("\nBackend operativo.");
}
