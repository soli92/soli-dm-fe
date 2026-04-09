# AGENTS.md — Soli Dungeon Master Frontend

**Ultimo aggiornamento:** 2026-04-09

## Progetto

**Next.js 15** (App Router), **React 18**, **TypeScript**, **Tailwind** + **[@soli92/solids](https://www.npmjs.com/package/@soli92/solids)** (^1.5.0). Autenticazione **Supabase** (email/password in UI; OAuth configurabile in dashboard). API REST verso **soli-dm-be** (`lib/api.ts`). Notifiche: **Sonner**. PWA: **@ducanh2912/next-pwa** (SW disabilitato in `development`).

**URL produzione:** https://soli-dm-fe.vercel.app (Vercel). Backend tipico: https://soli-dm-be.onrender.com

## Checklist prima di una PR

1. `npm run lint` · `npm run type-check` · `npm test` · `npm run build` (allineato a `.github/workflows/ci.yml`, Node **22** in CI).
2. Non committare `.env.local` né segreti; usare `.env.example` come riferimento.
3. Dopo cambi a **PWA / URL API**: verificare build e che `NEXT_PUBLIC_API_URL` sia coerente con Vercel.

## Struttura rilevante

| Area | Path |
|------|------|
| Pagine app | `app/(dm)/` — home, auth, campaigns, characters, dice-roller, wiki (`wiki/*` static + `[name]` / `[category]`) |
| Layout DM | `app/(dm)/layout.tsx` — skip link, `#main-content`, `appCanvas` |
| Nav / tema | `components/navigation.tsx`, `components/theme-switcher.tsx` |
| UI primitives | `components/ui/button.tsx`, `card.tsx`, `input.tsx`, … |
| Classi layout copy | `lib/ui-classes.ts` — `appPageShell`, `appPanelStack`, `appMuted`, … |
| Util class names | `lib/utils.ts` — `cn` (clsx + tailwind-merge) |
| Errori auth IT | `lib/auth-errors.ts` — `formatAuthError()` usato in login/register |
| Client API | `lib/api.ts` — header opzionale `NEXT_PUBLIC_SOLI_DM_API_KEY` se il backend ha `SOLI_DM_API_KEY` |
| Tipologiche dominio | `lib/tipologiche/` — allineamenti D&D, classi/razze SRD per form, range livelli campagna, preset dadi, id categorie regole wiki (`index.ts` re-export) |
| PWA / Workbox | `next.config.ts` — `dynamicStartUrl: false` (evita `_async_to_generator` nel SW); runtime cache cross-origin con matcher che **esclude** le basi API (stringhe inlined nel SW) |

## Test (Vitest)

- `npm test` / `npm run test:watch`
- File: `tests/auth-errors.test.ts`, `tests/utils.test.ts`, `tests/tipologiche.test.ts`, `tests/client.test.ts`, `tests/useCampaigns.test.tsx`
- Setup: `vitest.config.ts` → `vitest.setup.ts`; `@testing-library/react` dove serve

## Variabili d’ambiente

Vedi **`.env.example`**. In sintesi:

- `NEXT_PUBLIC_API_URL` — backend (es. `http://localhost:5000` in locale)
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SOLI_DM_API_KEY` — opzionale, solo se attiva la chiave sul backend

## Comandi

`npm run dev` · `npm run lint` · `npm run type-check` · `npm test` · `npm run build` · `npm start`

## Note storiche (build)

Problemi già risolti in passato: versioni npm mancanti per `@radix-ui/react-slot` (rimosso), `react-leaflet@^4.2.3` (usare ^4.2.1), `@apply font-body` assente in Tailwind, `swcMinify` deprecato in `next.config`.

## Link

- **README.md** — guida utente / setup
- **SETUP.md** — Vercel, Git, deploy
- **Backend:** [soli92/soli-dm-be](https://github.com/soli92/soli-dm-be)
- **Design system:** [soli92/solids](https://github.com/soli92/solids)

## Regole per l’agente

- Non aggiungere librerie UI pesanti duplicate rispetto al pattern SoliDS + componenti locali.
- Messaggi utente e copy auth: **italiano**; errori Supabase mappati con `formatAuthError` dove appropriato.
- Coerenza **CORS**: configurazione sul backend; il FE non “sistema” CORS da solo.
