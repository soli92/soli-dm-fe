/**
 * Pattern UI ispirati a Material Design 3, su token SoliDS (colori, radius, font).
 * Obiettivi: gerarchia chiara, target touch ≥44px, stati focus visibili.
 */

import { cn } from "@/lib/utils";
import { solidsNativeSelectTrigger } from "@/lib/solids-native-classes";

/** Superficie principale delle pagine (sfondo sotto le card). Mobile: sotto header compatto; desktop: altezza viewport con sidebar. */
export const appCanvas =
  "min-h-[calc(100dvh-3.5rem)] bg-gradient-to-b from-muted/50 via-muted/30 to-background text-foreground motion-safe:transition-colors md:min-h-dvh";

/** Contenitore centrato: respiro maggiore su tablet, max-width su desktop largo. */
export const appPageShell =
  "mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8 md:py-10 lg:max-w-4xl lg:px-8";

/** Scheda personaggio / viste dense: più larghezza su XL. */
export const appPageShellCharacter =
  "mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8 md:py-10 lg:max-w-4xl xl:max-w-5xl xl:px-10";

export const appPageShellWide =
  "mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 md:py-10 lg:px-8";

/** Ombre tipo elevation MD (layered surfaces). */
export const appElevation0 = "shadow-none";
export const appElevation1 =
  "shadow-sm shadow-black/5 dark:shadow-black/25";
export const appElevation2 =
  "shadow-md shadow-black/8 dark:shadow-black/30";
export const appElevation3 =
  "shadow-lg shadow-black/10 dark:shadow-black/35";

/** Card / pannello: shape MD3 (12–16), bordo sottile. */
export const appPanel = cn(
  "rounded-2xl border border-border/80 bg-card p-6 text-card-foreground",
  appElevation1
);

export const appPanelStack = cn(
  "flex flex-col gap-5 rounded-2xl border border-border/80 bg-card/95 p-5 text-card-foreground backdrop-blur-[2px] sm:gap-6 sm:p-7 md:p-8",
  appElevation1
);

/** Tipografia — scala titoli (display / headline / title). */
export const appDisplay =
  "font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl";

export const appHeadline =
  "font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl";

export const appTitle =
  "font-serif text-xl font-semibold text-foreground sm:text-2xl";

export const appSectionLabel =
  "text-xs font-semibold uppercase tracking-wider text-muted-foreground";

/** Etichetta campo form (MD3 / SoliDS). */
export const appFieldLabel =
  "text-sm font-medium leading-tight text-foreground";

/** Testo di supporto sotto etichetta. */
export const appFieldHint =
  "text-xs leading-snug text-muted-foreground";

export const appBody = "text-base leading-relaxed text-foreground";

export const appBodySmall = "text-sm leading-relaxed text-muted-foreground";

/**
 * Select nativo (SoliDS): target touch MD3 ~48px su mobile, compatto da sm.
 */
export const appSelectField = cn(
  solidsNativeSelectTrigger,
  "min-h-12 px-3 py-2.5 text-base touch-manipulation sm:min-h-10 sm:py-2 sm:text-sm"
);

/** Input / number in form scheda: stessa logica touch-first. */
export const appFormControl = cn(
  "h-auto min-h-12 touch-manipulation py-2.5 text-base sm:min-h-10 sm:py-2 sm:text-sm"
);

/** @deprecated Usa appDisplay / appHeadline; mantenuto per compatibilità import. */
export const appPageTitle = appHeadline;

export const appMuted = "text-muted-foreground";

export const appLinkBack = cn(
  appMuted,
  "text-sm font-medium underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
);

/** Lista / tile cliccabile con hover state (tonal surface). */
export const appListItem = cn(
  "block rounded-2xl border border-border/80 bg-card p-4 sm:p-5",
  appElevation0,
  "motion-safe:transition-[box-shadow,transform,background-color,border-color] duration-200",
  "hover:border-primary/35 hover:bg-accent/30 hover:shadow-md",
  "active:scale-[0.99]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
);
