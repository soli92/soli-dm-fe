#!/bin/bash

# 🎲 Soli-DM Frontend — Setup Script
# Questo script installa dipendenze e configura le variabili d'ambiente locali

set -e  # Exit on error

echo "🎲 Soli-DM Frontend — Setup"
echo "============================"
echo ""

# Step 1: Verifica Node.js
echo "✓ Verificando Node.js..."
if ! command -v node &> /dev/null; then
  echo "❌ Node.js non trovato. Scaricalo da https://nodejs.org/"
  exit 1
fi
NODE_VERSION=$(node -v)
echo "  Node.js $NODE_VERSION ✓"

# Step 2: Installa dipendenze
echo ""
echo "✓ Installando dipendenze npm..."
npm install

# Step 3: Crea .env.local
echo ""
echo "✓ Creando .env.local..."
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "  .env.local creato (riempilo con i tuoi valori!)"
else
  echo "  .env.local già esiste (non sovrascritto)"
fi

# Step 4: Mostra istruzioni next steps
echo ""
echo "============================"
echo "✅ Setup completato!"
echo ""
echo "📝 Prossimi step:"
echo "1. Apri .env.local e riempi le variabili Supabase:"
echo "   - NEXT_PUBLIC_SUPABASE_URL"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   - NEXT_PUBLIC_API_URL"
echo ""
echo "2. Avvia il server di sviluppo:"
echo "   npm run dev"
echo ""
echo "3. Apri http://localhost:3000 nel browser"
echo ""
echo "📚 Per una guida completa, vedi SETUP.md"
echo "============================"
