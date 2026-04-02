# 🎲 Soli Dungeon Master - Frontend

**Soli-DM** è un'applicazione web completa per gestire campagne **Dungeons & Dragons 5e**. 

Questo repository contiene il **Frontend** costruito con **Next.js 15 + TypeScript + Tailwind CSS + Supabase Auth**.

---

## 📋 Caratteristiche

### ✅ Autenticazione
- **Google OAuth** via Supabase
- **Email/Password** JWT
- Session management
- Protected routes

### 🎯 Gestione Campagne
- Crea, visualizza, modifica, elimina campagne
- Descrizione, impostazioni mondo, livelli consigliati
- **Mappa interattiva** con Leaflet.js
  - Aggiungi location sulla mappa
  - Drag & drop
  - Zoom/pan
  - Salvataggio automatico

### 👤 Gestione Personaggi
- Crea personaggi per campagna
- Stats D&D (STR, DEX, CON, INT, WIS, CHA)
- Classe, razza, livello, allineamento, background
- Visualizzazione lista personaggi

### 🎲 Simulatore Dadi
- Lancia dadi (d4, d6, d8, d10, d12, d20)
- Notazione dadi: `4d6`, `2d20+5`, etc.
- Storico tiri
- Tiri multipli

### 📚 Wiki D&D
- **12 Classi**: Barbarian, Bard, Cleric, Druid, Fighter, Monk, Paladin, Ranger, Rogue, Sorcerer, Warlock, Wizard
- **12 Razze**: Dragonborn, Dwarf, Elf, Gnome, Half-Elf, Half-Orc, Halfling, Human, Tiefling, Asimar, Genasi, Goliath
- **20+ Divinità** (Forgotten Realms)
- **Core Rules**: Ability Scores, Combat, Saving Throws, Resting, Multiclassing

### 🎨 Tema Fantasy
- Tema dark/light con **Fantasy** (serif Cinzel, colori pergamena)
- Theme switcher
- Responsive design

---

## 🚀 Quick Start

### Prerequisiti
- **Node.js 20+**
- **npm 10+**
- **Supabase** account (https://supabase.com)

### Installazione

```bash
# Clone il repository
git clone https://github.com/soli92/soli-dm-fe.git
cd soli-dm-fe

# Installa dipendenze
npm install

# Configura variabili d'ambiente
cp .env.example .env.local
# Modifica .env.local con i tuoi valori
```

### Avvia il server

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

L'app sarà disponibile su `http://localhost:3000`

---

## 🔐 Configurazione Supabase (CRITICO)

### 1. Crea progetto Supabase
- Vai a https://supabase.com
- Crea nuovo progetto
- Copia `SUPABASE_URL` e `SUPABASE_ANON_KEY`

### 2. Abilita Google OAuth

1. **Google Cloud Console:**
   - Vai a https://console.cloud.google.com/
   - Crea un nuovo progetto
   - Abilita **Google+ API**
   - **Credentials** → **Create OAuth 2.0 Client ID**
   - Tipo: **Web application**
   - **Authorized JavaScript origins:**
     ```
     https://your-project.supabase.co
     https://soli-dm-*.vercel.app
     http://localhost:3000
     ```
   - **Authorized redirect URIs:**
     ```
     https://your-project.supabase.co/auth/v1/callback
     https://soli-dm-*.vercel.app/auth/callback
     http://localhost:3000/auth/callback
     ```
   - Salva e copia **Client ID** + **Client Secret**

2. **Supabase Dashboard:**
   - Authentication → Providers → Google
   - Attiva **Enable Google Provider**
   - Incolla **Client ID** e **Client Secret**
   - Salva

### 3. Variabili d'Ambiente (`.env.local`)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Backend API
NEXT_PUBLIC_API_URL=https://soli-dm-be.onrender.com
```

---

## 📁 Struttura Directory

```
src/
├── app/
│   ├── layout.tsx                 (Layout principale con tema)
│   ├── page.tsx                   (Home page)
│   ├── globals.css                (CSS globale)
│   ├── auth/
│   │   └── callback/route.ts      (OAuth callback)
│   ├── dashboard/
│   │   ├── layout.tsx             (Layout dashboard)
│   │   └── page.tsx               (Dashboard principale)
│   └── campaigns/
│       └── [id]/
│           └── page.tsx           (Dettagli campagna)
│
├── components/
│   ├── navigation.tsx             (Navbar)
│   ├── dashboard-sidebar.tsx      (Sidebar dashboard)
│   ├── theme-provider.tsx         (Theme context)
│   ├── theme-switcher.tsx         (Theme selector)
│   ├── login-form.tsx             (Login con Google)
│   ├── campaigns/
│   │   ├── campaign-list.tsx
│   │   ├── campaign-detail.tsx
│   │   ├── campaign-form.tsx
│   │   ├── campaign-notes.tsx
│   │   └── campaign-members.tsx
│   ├── map/
│   │   └── campaign-map.tsx       (Mappa Leaflet)
│   ├── dice/
│   │   ├── dice-roller.tsx
│   │   └── dice-history.tsx
│   ├── wiki/
│   │   ├── classes-list.tsx
│   │   ├── races-list.tsx
│   │   ├── deities-list.tsx
│   │   └── rules-list.tsx
│   └── ui/
│       ├── button.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       └── ...
│
├── hooks/
│   ├── useAuth.ts                 (Auth + Google login)
│   ├── useCampaigns.ts            (Campaign CRUD)
│   ├── useCharacters.ts           (Character CRUD)
│   ├── useDice.ts                 (Dice roller)
│   └── useWiki.ts                 (Wiki data)
│
└── lib/
    ├── api.ts                     (Client API)
    ├── auth.ts                    (Auth helpers)
    ├── supabase.ts                (Supabase client)
    ├── utils.ts                   (Utilities)
    └── map.ts                     (Map utilities)
```

---

## 🔗 API Endpoints (Backend)

Il frontend comunica con il backend API su:
```
NEXT_PUBLIC_API_URL=https://soli-dm-be.onrender.com
```

**Endpoints principali:**
- `GET /health` — Health check
- `GET /api/campaigns` — Lista campagne
- `POST /api/campaigns` — Crea campagna
- `GET /api/campaigns/:id` — Dettagli campagna
- `PUT /api/campaigns/:id` — Modifica campagna
- `DELETE /api/campaigns/:id` — Elimina campagna
- `GET /api/characters?campaign_id=:id` — Personaggi campagna
- `POST /api/dice/roll` — Lancia dadi
- `GET /api/classes` — Wiki classi
- `GET /api/races` — Wiki razze
- `GET /api/deities` — Wiki divinità
- `GET /api/rules` — Wiki regole

---

## 🛠️ Sviluppo

### Comandi

```bash
# Dev server (hot reload)
npm run dev

# Type check
npm run type-check

# Lint (se configurato)
npm run lint

# Build per production
npm run build

# Avvia build prodotto
npm start
```

### Aggiungere un componente UI

Usa **shadcn/ui** (o crea manualmente):

```bash
# Esempio button (già incluso)
# Components sono in components/ui/
```

---

## 🎨 Tema

Il frontend supporta più temi via **CSS variables**:
- **Light** — Tema chiaro
- **Dark** — Tema scuro
- **Fantasy** — Tema fantasy D&D (Cinzel serif, colori pergamena)
- **Cyberpunk** — Tema cyberpunk (neon colors)

Cambia tema con il **theme switcher** nella navbar.

---

## 📱 Responsive Design

L'app è completamente responsive:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

Mappa Leaflet è adattiva su tutti i dispositivi.

---

## 🔒 Sicurezza

- **JWT** per autenticazione locale
- **Supabase RLS** per autorizzazione database
- **Google OAuth** per login social
- **HTTPS** in produzione (Vercel)
- **CORS** configurato nel backend

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Connetti GitHub a Vercel (repository soli92/soli-dm-fe)
# Production Branch: main
# Imposta variabili d'ambiente (Environment Variables):
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_API_URL=...

# Deploy automatico a ogni push sul branch di produzione
```

**URL Produzione:** https://soli-dm-*.vercel.app

Se dopo un push **non compare** un nuovo deployment: in dashboard Vercel → **Settings** → **Git** verifica **Production Branch** = `main`, repository collegato corretto e che **Require Verified Commits** non scarti i tuoi commit (se attivo, firma i commit o disattivalo). Dettaglio in **[SETUP.md](./SETUP.md)** § 4.0 e § 4.3.

### GitHub Actions (CI)

Su **push** e **pull request** verso `main`, [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) esegue in sequenza: `npm ci`, `npm run lint`, `npm run type-check`, `npm test`, `npm run build` (Node **22**, `CI=true`). Allineato allo stile CI usato in altri repo frontend (es. Pippify).

---

## 🐛 Troubleshooting

### Vercel: nessun deploy dopo `git push`

- **Production Branch** ≠ branch da cui pushi (es. push su `main` ma produzione è `master`) → allinea in **Settings → Git**.
- **Require Verified Commits** attivo e commit non firmati → Vercel non crea il deployment.
- Webhook GitHub verso Vercel in errore → riconnetti il repo da **Settings → Git**.

Vedi **[SETUP.md](./SETUP.md) § 4.3**.

### Build fallisce con "Module not found"
- Esegui `npm install` nuovamente
- Verifica che tutti gli import siano corretti
- Cancella `.next/` e riprova: `rm -rf .next && npm run build`

### OAuth Google non funziona
- Verifica che **Redirect URI** sia configurato sia in Google Cloud che in Supabase
- Assicurati che il dominio sia autorizzato in Google OAuth
- Controlla che `NEXT_PUBLIC_SUPABASE_*` siano impostati correttamente

### Mappa Leaflet non si visualizza
- Assicurati che `leaflet` e `react-leaflet` siano installati: `npm install leaflet react-leaflet`
- Verifica che il componente `campaign-map.tsx` sia importato correttamente
- Controlla la console per errori JavaScript

### Backend non raggiungibile
- Verifica che `NEXT_PUBLIC_API_URL` sia corretto
- Controlla che il backend sia online: `curl https://soli-dm-be.onrender.com/health`
- Verifica **CORS** nel backend

---

## 📝 Roadmap

- [ ] Drag & drop campagne su mappa (oltre ai pin)
- [ ] Real-time multiplayer (WebSocket)
- [ ] Export/Import campagne (JSON/PDF)
- [ ] Integrazione con D&D Beyond API
- [ ] Mobile app (React Native/Expo)
- [ ] Dark mode migliorato
- [ ] i18n (Internazionalizzazione)

---

## 🤝 Contribuire

Vedi [CONTRIBUTING.md](./CONTRIBUTING.md) per le linee guida.

---

## 📄 Licenza

MIT © [soli92](https://github.com/soli92)

---

## 🎯 Link Utili

- **Backend Repo**: [soli92/soli-dm-be](https://github.com/soli92/soli-dm-be)
- **Live Demo**: https://soli-dm-*.vercel.app
- **Backend API**: https://soli-dm-be.onrender.com
- **D&D 5e SRD**: https://dnd5e.wikidot.com/
- **Forgotten Realms Wiki**: https://forgottenrealms.fandom.com/

---

## 📧 Contatti

Domande? Apri un issue su GitHub.

🎲 **Buone avventure!**
