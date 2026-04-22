---

# AI Log — soli-dm-fe

Memoria di sviluppo AI-assisted. Annotazioni sui prompt, decisioni e pattern emersi costruendo questo progetto con il supporto di AI.

## Overview del progetto

Frontend **Next.js 15→16** (evoluzione in corso nei commit) per **Soli Dungeon Master**: shell UI con **@soli92/solids**, componenti primitivi, wiki, mappa, PWA, **Vitest** e **GitHub Actions** (lint, typecheck, test, build). Partenza con **shadcn/ui** poi rimozione Radix a favore di Tailwind+Solids.

**Stack AI usato (inferito)**: assistenza IDE/LLM (serie di commit “fix: create simple X component”); file `cd52603 📝 Aggiungi AGENTS.md` per contesto agenti — **non** menziona “Cursor” nel messaggio ma allinea al pattern ecosistema.

**Periodo di sviluppo**: 2026-04-02 (`9be38af` Initial commit) → 2026-04-09 (`ea2b362` fix characters UX).

**Numero di commit**: 53

---

## Fasi di sviluppo (inferite dal history)

### Fase 1 — Scaffold Next + shadcn + Solids preset

**Timeframe**: `9be38af` → `5baf006` (global styles with solids).

**Cosa è stato fatto**: dipendenze Next 15 + solids + shadcn, config TS/Next/Tailwind/PostCSS, layout, provider tema/toast, home hero, componenti Button/Input/Card, fix React 18, `components.json` shadcn.

**Evidenza di AI-assist** (inferita):

- Commit ripetuti `feat: add Button component` / `fix: add missing dependencies` — tipico scaffolding shadcn/Next assistito.

**Decisioni architetturali notevoli**:

- **Tailwind** con preset **solids** (`ae9e2d0`).
- Uso iniziale **shadcn/ui** e Radix.

**Prompt chiave usati**: > [TODO da compilare manualmente]

**Lezioni apprese**: > [TODO da compilare manualmente]

### Fase 2 — Rimozione Radix, componenti “simple”, API client, SETUP

**Timeframe**: `d28fe12` remove radix → `0fe1d23` shadcn config (coesistenza transitoria) fino a `4eed4c6` utilities.

**Cosa è stato fatto**: sostituzione progressiva con componenti Tailwind-only, fix versioni `react-leaflet`, helper `cn`, hook `useAuth`, SETUP.md, script `setup.sh`, docs README.

**Evidenza di AI-assist** (inferita):

- Sequenza `fix: create simple Button/Input/Card/...` molto uniforme — forte segnale di generazione assistita o copia template.

**Decisioni architetturali notevoli**:

- **Riduzione dipendenze** Radix (`d28fe12`) per allineamento al design system Solids.

**Prompt chiave usati**: > [TODO da compilare manualmente]

**Lezioni apprese**: > [TODO da compilare manualmente]

### Fase 3 — Route group (dm), CI GitHub Actions, PWA, shell MD-inspired

**Timeframe**: `6a4d4cd` → `2cc2c08` shell SoliDS MD-inspired.

**Cosa è stato fatto**: ristrutturazione route, tema fantasy, API modulare, wiki, test Vitest; CI; fix PWA cache; branding D20; bump SoliDS `273f9a7`.

**Evidenza di AI-assist** (inferita):

- Commit `6a4d4cd` aggrega molte aree (route, tema, API, wiki, test) — possibile batch assistito.

**Decisioni architetturali notevoli**:

- **Route group** `(dm)` per namespacing app (`6a4d4cd`).
- **PWA** con manifest e fix cache API (`2cc2c08`).

**Prompt chiave usati**: > [TODO da compilare manualmente]

**Lezioni apprese**: > [TODO da compilare manualmente]

### Fase 4 — Wiki accessibile, tipologiche, sidebar, allineamento primitive SoliDS

**Timeframe**: `517c08b` → `ea2b362`.

**Cosa è stato fatto**: UI wiki strutturata, tipi divinità, tipologiche D&D per form, sidebar con avatar/tema/logout, allineamento primitive a registry SoliDS, fix creazione personaggi con campagna obbligatoria.

**Evidenza di AI-assist** (inferita):

- Messaggi lunghi e multi-scope (`73c4d40`, `ea2b362`) coerenti con sessioni di pair programming.

**Decisioni architetturali notevoli**:

- **Registry** componenti SoliDS come fonte di verità UI (`73c4d40`).

**Prompt chiave usati**: > [TODO da compilare manualmente]

**Lezioni apprese**: > [TODO da compilare manualmente]

---

## Pattern ricorrenti identificati

- **Transizione shadcn → Solids-only** documentata nella history (meno dipendenze).
- **CI** introdotta a metà vita (`605a11f`).
- **Commit emoji** 📝 per documentazione AGENTS.
- **Fix** granulari su classi Tailwind (`a97f35f`, `4d660c3`).

---

## Tecnologie e scelte di stack

- **Framework**: Next.js (App Router), React, TypeScript
- **Styling**: Tailwind + SoliDS preset; temi fantasy
- **Mappe**: react-leaflet (versioni pin in fix)
- **Auth**: Supabase (env in docs)
- **Deploy**: Vercel (preview menzionate nel backend CORS)
- **LLM integration**: nessuna nel client DM oltre allo sviluppo assistito

## Problemi tecnici risolti (inferiti)

1. **swcMinify deprecato**: `1c87bb0`.
2. **react-leaflet version**: `3c3c5eb`.
3. **font-body class undefined**: `a97f35f`.
4. **Solids content path Tailwind**: `4d660c3`.
5. **Flusso creazione personaggi / campagna**: `ea2b362`.

---

## Appendice — Commit notevoli (estratto da `git log --oneline`)

- `ea2b362` fix(characters): campagna obbligatoria in creazione e UX elenco
- `73c4d40` feat(ui): allinea primitive a registry SoliDS, docs e test
- `605a11f` ci: GitHub Actions (lint, typecheck, test, build) + ESLint config
- `6a4d4cd` feat: route group (dm), SoliDS fantasy, API modulare, wiki e test Vitest
- `d28fe12` fix: remove @radix-ui dependency, use Tailwind + Solids only
- `8693d0f` feat: add Button component from shadcn/ui
- `58ff7c0` feat: add Next.js 15 + solids + shadcn/ui dependencies
- `9be38af` Initial commit

---

## Punti aperti / note per il futuro

> [TODO da compilare manualmente: allineamento versione Next 16 ovunque, accessibilità wiki, i18n]

---

> **Nota metodologica**: questo file è stato generato retroattivamente analizzando la history del repo. Le sezioni con `> [TODO da compilare manualmente]` richiedono la memoria del developer e non possono essere inferite dalla sola analisi automatica. Integra progressivamente con annotazioni manuali mentre lavori alle prossime fasi del progetto.

---
