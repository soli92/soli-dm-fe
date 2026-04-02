# AGENTS.md — Soli Dungeon Master Frontend

**Ultimo aggiornamento:** 2026-04-02 15:40 UTC  
**Status:** ✅ **BUILD RIUSCITO & DEPLOYMENT LIVE**

---

## 📊 **STATO PROGETTO**

| Componente | Status | Details |
|-----------|--------|---------|
| **Build** | ✅ Passato | Next.js 15.5.14, TypeScript 5.7, Tailwind CSS |
| **Deploy** | ✅ Live | Vercel (production) |
| **URL** | 🔗 https://soli-dm-fe.vercel.app | |
| **Theme** | 🎨 @soli92/solids | Fantasy theme (integrato) |
| **Auth** | ⏳ In Progresso | Google OAuth via Supabase (pending setup) |
| **Maps** | ⏳ In Progresso | Leaflet + react-leaflet (struttura pronta) |

---

## 🏗️ **STACK TECNOLOGICO**

```
Frontend:
  - Framework: Next.js 15.5.14 (React 18, TypeScript)
  - Styling: Tailwind CSS 3.4 + tailwindcss-animate
  - Design System: @soli92/solids 1.4.0 (Fantasy theme)
  - Form Handling: react-hook-form + zod validation
  - State Management: next-themes (dark/light/fantasy/cyberpunk)
  - Maps: Leaflet + react-leaflet 4.2
  - Notifications: Sonner
  - Backend API: Supabase (@supabase/supabase-js 2.43)
  - Build: Vercel CI/CD

Dependencies:
  ✅ Aggiunte: @types/leaflet, react-leaflet
  ✅ Rimosse: @radix-ui/react-slot (incompatibile)
  ✅ Risolto: next.config.ts (rimosso swcMinify deprecato)
```

---

## 📁 **STRUTTURA PROGETTO**

```
soli-dm-fe/
├── app/
│   ├── layout.tsx          # Root layout + Providers (themes, Supabase)
│   ├── page.tsx            # Home page (hero + featured campaigns)
│   ├── globals.css         # Tailwind + @soli92/solids theme
│   └── fonts/              # Font assets (Fantasy theme)
├── components/
│   ├── navigation.tsx       # Header + Nav bar
│   ├── ui/                 # Component library
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── tabs.tsx
│   │   └── scroll-area.tsx
│   ├── campaigns/          # Campaign components (grid, detail, map)
│   ├── characters/         # Character components (list, form, sheet)
│   └── auth/               # Auth components (Google OAuth provider)
├── lib/
│   ├── utils.ts            # clsx, cn, classname helpers
│   ├── supabase.ts         # Supabase client config
│   └── auth.ts             # OAuth + Session management
├── styles/                 # CSS modules (optional)
├── public/                 # Assets, favicons, images
├── .env.local              # Local env vars (git-ignored)
├── .env.example            # Template env vars
├── tailwind.config.ts      # Tailwind + @soli92/solids preset
├── tsconfig.json           # TypeScript config
├── next.config.ts          # Next.js config (rimosso swcMinify)
├── package.json            # Dependencies
├── README.md               # User documentation
└── AGENTS.md               # This file
```

---

## 🚀 **DEPLOYMENT STATUS**

### Vercel (Production)
```
🔗 URL: https://soli-dm-fe.vercel.app
📊 Build: ✅ Passato (6.9s)
📦 Pages: 4 (/, /_not-found, + 2 dynamic)
📝 Logs: https://vercel.com/soli92s-projects/soli-dm-fe
```

**Commit di deploy:** `2236eaf` (fix CSS + dipendenze)

**Build Command:** `next build`  
**Start Command:** `next start`

**Deploy automatico non parte dopo un push:** controllare su Vercel **Settings → Git** (repository collegato, **Production Branch** = `main`, opzione **Require Verified Commits** che annulla deploy su commit non firmati), webhook su GitHub. Procedura: **`SETUP.md`** § 4.0 e § 4.3.

---

## 🔧 **FIX APPLICATI (Timeline)**

### Build 1 ❌
```
Error: npm ERR! notarget No matching version found for @radix-ui/react-slot@^2.1.0
Fix: Rimosso @radix-ui (non usato), creati componenti UI custom
```

### Build 2 ❌
```
Error: npm ERR! notarget No matching version found for react-leaflet@^4.2.3
Fix: Aggiornato a react-leaflet@^4.2.1 (versione disponibile)
```

### Build 3 ❌
```
Error: Syntax error in app/globals.css — font-body class non esiste
Fix: Rimosso @apply font-body, config Tailwind aggiornata
```

### Build 4 ✅
```
✓ Compiled successfully in 6.9s
✓ Generating static pages (4/4)
Risolto: next.config.ts (rimosso swcMinify deprecato)
```

---

## 📋 **CHECKLIST — FEATURE IN IMPLEMENTAZIONE**

### ✅ **Setup Base**
- [x] Next.js + TypeScript scaffolding
- [x] Tailwind CSS + @soli92/solids theme
- [x] Build & Deployment su Vercel
- [x] Navigation component
- [x] UI component library (button, card, input, textarea, tabs)

### ⏳ **Autenticazione (Pending)**
- [ ] Google OAuth setup su Google Cloud Console
- [ ] Supabase Auth config (Google provider)
- [ ] Login page con Google button
- [ ] Session management
- [ ] Protected routes

### ⏳ **Campagne (Pending)**
- [ ] Campaign list page con grid layout
- [ ] Campaign detail page con mappa Leaflet
- [ ] Campaign creation form
- [ ] Campaign edit / delete
- [ ] API integration con backend (soli-dm-be)

### ⏳ **Personaggi (Pending)**
- [ ] Character list page
- [ ] Character detail / sheet page
- [ ] Character creation form
- [ ] Character class/race selection
- [ ] API integration con backend

### ⏳ **Dadi & Regole (Pending)**
- [ ] Dice roller component
- [ ] Rules browser / wiki
- [ ] Class/Race/Deity lookup
- [ ] API integration con backend

### ⏳ **Tema & Accessibilità (Pending)**
- [ ] Dark mode toggle (next-themes)
- [ ] Fantasy theme selector (cyberpunk, 90s-party)
- [ ] WCAG 2.1 AA compliance
- [ ] Mobile responsive (touch targets, safe areas)

---

## 🔌 **VARIABILI D'AMBIENTE**

### `.env.local` (Development)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Vercel Environment Variables (Production)
```env
NEXT_PUBLIC_API_URL=https://soli-dm-be.onrender.com
NEXT_PUBLIC_SUPABASE_URL=<from Supabase Dashboard>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<from Supabase Dashboard>
```

**Come impostare su Vercel:**
1. https://vercel.com/soli92s-projects/soli-dm-fe → Settings → Environment Variables
2. Aggiungi le tre variabili per environment (preview, production)
3. Triggera redeploy manuale

---

## 🧪 **COMANDI LOCALI**

```bash
# Development
npm run dev
# Apri http://localhost:3000

# Build
npm run build

# Production
npm start

# Type checking
npm run type-check

# Lint
npm run lint
```

---

## 🐛 **ISSUE NOTI & WORKAROUNDS**

### Issue 1: Font-body class non trovata
**Status:** ✅ Risolto  
**Cause:** @apply font-body in globals.css riferiva a classe non definita  
**Fix:** Rimosso, usato font-sans di Tailwind di default

### Issue 2: @radix-ui/react-slot non trovato
**Status:** ✅ Risolto  
**Cause:** Versione ^2.1.0 non disponibile su npm  
**Fix:** Rimosso @radix-ui (non usato), creati componenti UI custom

### Issue 3: react-leaflet versioning
**Status:** ✅ Risolto  
**Cause:** react-leaflet@^4.2.3 non disponibile  
**Fix:** Downgrade a @^4.2.1

---

## 🔗 **LINK RISORSE**

| Risorsa | URL |
|---------|-----|
| **Frontend Repo** | https://github.com/soli92/soli-dm-fe |
| **Backend Repo** | https://github.com/soli92/soli-dm-be |
| **Design System** | https://github.com/soli92/solids |
| **Vercel Dashboard** | https://vercel.com/soli92s-projects/soli-dm-fe |
| **GitHub Actions (CI)** | `.github/workflows/ci.yml` — su `push`/`pull_request` verso `main`: `lint`, `type-check`, `test`, `build` (Node 22, `npm ci`) |
| **Supabase Project** | https://supabase.com/dashboard/projects |
| **Next.js Docs** | https://nextjs.org/docs |
| **Tailwind Docs** | https://tailwindcss.com/docs |

---

## 👥 **PROSSIMI AGENT / LLM — CONTEXT**

### Per agenti futuri che lavorano su questa repo:

1. **Leggere prima:** `README.md` (user-facing guide)
2. **Poi:** Questo file (`AGENTS.md`) per lo stato interno
3. **Stack:** Next.js 15, React 18, TypeScript, Tailwind, @soli92/solids theme
4. **Build:** ✅ Vercel (auto-deploy su push a `main`); ✅ CI GitHub su ogni PR/push `main`
5. **Status:** Frontend live; backend su Render (start script con risoluzione `dist/`)
6. **Priority:** 
   - Setup Google OAuth (Supabase)
   - Implementare campaign list/detail pages
   - Integrare Leaflet maps

### Comandi rapidi:
```bash
npm run dev          # Test locale
npm run lint         # ESLint (in CI: CI=true)
npm run type-check   # TypeScript
npm test             # Vitest
npm run build        # Pre-deploy check (stessa sequenza della CI)
git push origin main # Auto-deploy Vercel + run CI su GitHub
```

---

## 📝 **NOTE SVILUPPO**

- **Design System:** @soli92/solids fornisce tema Fantasy con Tailwind preset. Non aggiungere ulteriori librerie UI (shadcn/ui, MUI) per evitare conflitti.
- **Form Validation:** Usare zod + react-hook-form (già configurato). Non aggiungere altre librerie di validazione.
- **API Client:** Usare Supabase client (@supabase/supabase-js) per queries, e `fetch` nativa per backend REST.
- **Deployment:** Solo Vercel per FE (configurato con GitHub integration). Non toccare.
- **Theme Switcher:** Implementato con next-themes. Le opzioni sono: light, dark, fantasy, cyberpunk, 90s-party (da soli-ds).

---

**Ultimo update:** 2026-04-02 15:40 UTC  
**Agente:** Soli (autonomo)  
**Commit:** Questo file creato come parte del fix deployment
