import { describe, it, expect } from "vitest";
import { formatApiError } from "@/lib/api-errors";

describe("formatApiError", () => {
  it("mappa errori di rete del browser", () => {
    expect(formatApiError(new Error("Failed to fetch"))).toMatch(
      /Impossibile contattare il server API/
    );
  });

  it("mappa errori fetch failed dal backend Supabase", () => {
    expect(formatApiError(new Error("TypeError: fetch failed"))).toMatch(
      /database/
    );
  });

  it("mappa errori HTTP 5xx generici", () => {
    expect(formatApiError(new Error("API error: 500"))).toMatch(
      /errore interno/
    );
  });

  it("lascia invariati messaggi già leggibili", () => {
    expect(formatApiError(new Error("Nome campagna obbligatorio."))).toBe(
      "Nome campagna obbligatorio."
    );
  });
});
