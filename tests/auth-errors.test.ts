import { describe, it, expect } from "vitest";
import { formatAuthError } from "@/lib/auth-errors";

describe("formatAuthError", () => {
  it("mappa utente già registrato (messaggio API)", () => {
    expect(
      formatAuthError({ message: "User already registered", status: 422 })
    ).toMatch(/già registrata/i);
  });

  it("mappa codice user_already_exists", () => {
    expect(formatAuthError({ code: "user_already_exists" })).toMatch(
      /già registrata/i
    );
  });

  it("mappa codice user_already_registered", () => {
    expect(formatAuthError({ code: "user_already_registered" })).toMatch(
      /già registrata/i
    );
  });

  it("mappa error_code oltre a code", () => {
    expect(formatAuthError({ error_code: "user_already_exists" })).toMatch(
      /già registrata/i
    );
  });

  it("mappa credenziali non valide al login", () => {
    expect(
      formatAuthError({ message: "Invalid login credentials" })
    ).toMatch(/non corretti/i);
  });

  it("mappa password debole", () => {
    expect(formatAuthError({ code: "weak_password" })).toMatch(/requisiti/i);
  });

  it("mappa email non confermata", () => {
    expect(
      formatAuthError({ message: "Email not confirmed" })
    ).toMatch(/Conferma/i);
  });

  it("mappa rate limit", () => {
    expect(
      formatAuthError({ message: "Too many requests", code: "over_request_rate_limit" })
    ).toMatch(/Troppi tentativi/i);
  });

  it("mappa email non valida", () => {
    expect(formatAuthError({ message: "Invalid email" })).toMatch(
      /non valido/i
    );
  });

  it("stringa pass-through", () => {
    expect(formatAuthError("Errore diretto")).toBe("Errore diretto");
  });

  it("null/undefined → messaggio generico", () => {
    expect(formatAuthError(null)).toBe("Operazione non riuscita.");
    expect(formatAuthError(undefined)).toBe("Operazione non riuscita.");
  });

  it("fallback al messaggio originale se non mappato", () => {
    expect(formatAuthError({ message: "Custom API text" })).toBe(
      "Custom API text"
    );
  });
});
