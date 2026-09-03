#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PATCH="$ROOT/scripts/patches/soli-dm-be-supabase-fix.patch"
TARGET="${1:-}"

if [[ -z "$TARGET" ]]; then
  echo "Uso: $0 /percorso/soli-dm-be"
  echo "Applica il patch Supabase sul clone locale del backend."
  exit 1
fi

if [[ ! -d "$TARGET/.git" ]]; then
  echo "Errore: $TARGET non è un repository git."
  exit 1
fi

if [[ ! -f "$PATCH" ]]; then
  echo "Errore: patch non trovato: $PATCH"
  exit 1
fi

cd "$TARGET"
git checkout -b cursor/fix-supabase-config-validation-0fa6 2>/dev/null || git checkout cursor/fix-supabase-config-validation-0fa6
git am "$PATCH"
echo "Patch applicato. Verifica con: npm test && git push -u origin cursor/fix-supabase-config-validation-0fa6"
