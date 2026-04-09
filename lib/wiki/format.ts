/** Normalizza campi wiki che il backend a volte espone come stringa o array. */
export function formatInlineText(value: string | string[] | undefined | null): string {
  if (value == null) return "";
  return Array.isArray(value) ? value.join(", ") : value;
}
