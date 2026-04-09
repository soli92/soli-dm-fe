/**
 * Categorie regole esposte da GET /api/rules (contenuto statico backend).
 * Allineare a `src/routes/rules.ts` se cambiano lì.
 */

export const WIKI_RULE_CATEGORY_IDS = [
  "ability_scores",
  "combat",
  "saving_throws",
  "skill_checks",
  "resting",
  "multiclassing",
] as const;

export type WikiRuleCategoryId = (typeof WIKI_RULE_CATEGORY_IDS)[number];

export function isWikiRuleCategoryId(id: string): id is WikiRuleCategoryId {
  return (WIKI_RULE_CATEGORY_IDS as readonly string[]).includes(id);
}
