# 🎲 Soli-DM — Guida Setup Completa

Questa guida spiega come configurare **Supabase**, **Google OAuth**, variabili d'ambiente e deploy su **Vercel**.

---

## 📋 Indice

1. [Supabase Setup](#1-supabase-setup)
2. [Google OAuth Setup](#2-google-oauth-setup)
3. [Variabili d'Ambiente Locale](#3-variabili-dambiente-locale)
4. [Vercel Deploy](#4-vercel-deploy)
5. [Render Backend Deploy](#5-render-backend-deploy)
6. [Test E2E](#6-test-e2e)

---

## 1. Supabase Setup

### 1.1 Crea un progetto Supabase

1. Vai a https://supabase.com/
2. Sign in con GitHub o email
3. Clicca **"New project"**
4. Scegli **"Organization"** (o creane una)
5. **Project name**: `soli-dm`
6. **Database password**: Salva in un posto sicuro (LastPass, Bitwarden, ecc.)
7. **Region**: Scegli il più vicino a te (es. `eu-west-1` per Europa)
8. Clicca **"Create new project"** e aspetta il build (2-3 minuti)

### 1.2 Ottieni le credenziali Supabase

1. Progetto aperto → **Settings** (icona ingranaggio) → **API**
2. Copia questi valori:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Public Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Service Role Key** → `SUPABASE_SERVICE_KEY` (PRIVATO — solo backend!)

### 1.3 Abilita Auth in Supabase

1. **Authentication** → **Providers**
2. Abilita almeno:
   - ✅ **Email** (default, già acceso)
   - ✅ **Google** (configureremo nel prossimo step)

---

## 2. Google OAuth Setup

### 2.1 Crea Google OAuth 2.0 Client

1. Vai a **Google Cloud Console**: https://console.cloud.google.com/
2. Crea un **nuovo progetto** (o usa uno esistente):
   - Project name: `soli-dm`
   - Clicca **Create**
3. Aspetta l'attivazione (10-30 secondi)
4. **Abilita Google+ API**:
   - Vai a **APIs & Services** → **Library**
   - Cerca **"Google+ API"**
   - Clicca → **Enable**
5. **Crea OAuth 2.0 Client**:
   - Vai a **APIs & Services** → **Credentials**
   - Clicca **"+ Create Credentials"** → **OAuth 2.0 Client ID**
   - Ti chiede di creare una "OAuth consent screen" prima:
     - Scegli **External** → **Create**
     - Compila i dati base (app name, email)
     - Clicca **Save and Continue**
     - Aggiungi test users (il tuo email): **soli92@gmail.com**
     - Salva
   - Ritorna a **Credentials** → **+ Create Credentials** → **OAuth 2.0 Client ID**
   - Application type: **Web application**
   - Name: `soli-dm-oauth`
   - **Authorized JavaScript origins**:
     ```
     https://your-project.supabase.co
     ```
   - **Authorized redirect URIs**:
     ```
     https://your-project.supabase.co/auth/v1/callback
     https://soli-dm-fe.vercel.app/auth/callback
     https://localhost:3000
     ```
   - Clicca **Create**
   - Un popup mostra **Client ID** e **Client Secret** → **COPIA ENTRAMBI**

### 2.2 Configura Google OAuth in Supabase

1. Supabase Dashboard → **Authentication** → **Providers**
2. Clicca **Google**
3. **Enable Google Provider** → ON
4. Incolla:
   - **Client ID**: `(da Google Cloud Console)`
   - **Client Secret**: `(da Google Cloud Console)`
5. Copia il **Redirect URL** (formato `https://your-project.supabase.co/auth/v1/callback`)
6. Torna a **Google Cloud Console** → **Credentials** → Modifica il client OAuth 2.0
7. Incolla il **Redirect URL** in **Authorized redirect URIs**:
   ```
   https://your-project.supabase.co/auth/v1/callback
   ```
8. Salva
9. Ritorna a Supabase → **Save** (il form Google Provider)

✅ **Google OAuth è ora configurato!**

---

## 3. Variabili d'Ambiente Locale

### 3.1 Frontend (.env.local)

Nella root di `soli-dm-fe`:

```bash
# Copia .env.example a .env.local
cp .env.example .env.local
```

Modifica `.env.local`:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000

# Supabase (da step 1.2)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc... (la tua anon key)
```

### 3.2 Backend (.env)

Nella root di `soli-dm-be`:

```bash
# Copia .env.example a .env
cp .env.example .env
```

Modifica `.env`:

```env
# Server
PORT=5000
NODE_ENV=development

# Supabase (da step 1.2)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGc... (la tua service key — PRIVATA!)

# CORS — indirizzo del frontend locale
CORS_ORIGIN=http://localhost:3000

# JWT Secret — genera con:
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your-random-32-char-secret
```

---

## 4. Vercel Deploy

### 4.1 Configura Environment Variables su Vercel

1. Vai a https://vercel.com/soli92s-projects/soli-dm-fe
2. **Settings** → **Environment Variables**
3. Aggiungi:
   ```
   NEXT_PUBLIC_API_URL=https://soli-dm-be.onrender.com
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=(dalla step 1.2)
   ```
4. Per ogni variabile, seleziona gli ambienti:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. Clicca **Save**

### 4.2 Triggerare il deploy

1. Vai a **Deployments**
2. Clicca il 3-dot menu dell'ultimo deployment → **Redeploy**
3. Aspetta che il build finisca (2-3 minuti)
4. Clicca il link per visitare il sito

---

## 5. Render Backend Deploy

### 5.1 Configura Environment Variables su Render

1. Vai a https://dashboard.render.com → **soli-dm-be**
2. **Environment** → **Add Environment Variable**
3. Aggiungi:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_KEY=(dalla step 1.2)
   PORT=5000
   NODE_ENV=production
   CORS_ORIGIN=https://soli-dm-fe.vercel.app
   JWT_SECRET=(genera con crypto come sopra)
   ```
4. Clicca **Save** per ogni variabile
5. Render automaticamente riavvia il servizio

### 5.2 Verifica il deploy

```bash
# Test health check
curl https://soli-dm-be.onrender.com/health

# Risposta attesa:
# {"status":"ok"}
```

---

## 6. Test E2E

### 6.1 Test Locale

```bash
# Terminal 1 — Backend
cd soli-dm-be
npm run dev
# Dovrebbe avviare su http://localhost:5000

# Terminal 2 — Frontend
cd soli-dm-fe
npm run dev
# Dovrebbe avviare su http://localhost:3000
```

Apri http://localhost:3000 e testa:

1. **Login con Google**:
   - Clicca "Login with Google"
   - Autorizza l'app
   - Dovrebbe redirectare a `/dashboard`
   
2. **Crea una campagna**:
   - Clicca "New Campaign"
   - Compila nome e descrizione
   - Clicca "Create"
   - Dovrebbe apparire nella lista
   
3. **Dettagli campagna**:
   - Clicca su una campagna
   - Dovrebbe aprirsi `/campaigns/[id]`
   - Visualizza la **mappa Leaflet** (tab "Map")
   - Aggiungi un location trascinandolo sulla mappa
   - Clicca "Save" → dovrebbe salvare in Supabase

### 6.2 Test Produzione

1. Accedi a https://soli-dm-fe.vercel.app
2. Ripeti i test E2E sopra

---

## 🚨 Troubleshooting

### **Errore: "NEXT_PUBLIC_SUPABASE_URL is required"**
→ Variabili d'ambiente non caricate correttamente su Vercel
→ Soluzione: Verifica che le env vars siano configurate per **Production**

### **Errore: "Google OAuth redirect mismatch"**
→ L'URL di redirect non corrisponde su Google Cloud
→ Soluzione: Verifica che **sia Google Cloud che Supabase** abbiano lo stesso redirect URL

### **Errore: "CORS error when calling backend"**
→ `CORS_ORIGIN` nel backend non è corretto
→ Soluzione: Verifica che `CORS_ORIGIN` su Render sia l'URL di Vercel (`https://soli-dm-fe.vercel.app`)

### **Errore: "Service unavailable" su Render**
→ Il servizio è in sleep (Render free tier va in sleep dopo 15 minuti di inattività)
→ Soluzione: Aspetta 1-2 minuti che si riavvii, o upgrade a piano pagato

---

## 📚 Link Utili

- **Supabase Docs**: https://supabase.com/docs
- **Google OAuth**: https://console.cloud.google.com/
- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs

---

## ✅ Checklist Finale

- [ ] Supabase progetto creato
- [ ] Google OAuth Client creato (Client ID + Secret)
- [ ] Google OAuth abilitato in Supabase
- [ ] Env vars configurate in `.env.local` (locale)
- [ ] Env vars configurate su Vercel (production)
- [ ] Env vars configurate su Render (production)
- [ ] Test login Google funziona
- [ ] Test creazione campagna funziona
- [ ] Test mappa funziona
- [ ] Vercel deploy è live
- [ ] Render backend è live

---

🎲 **Buona fortuna! Se hai dubbi, apri un issue su GitHub.** ✨
