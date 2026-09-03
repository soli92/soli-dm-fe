/**
 * Messaggi in italiano per errori REST verso soli-dm-be.
 */
export function formatApiError(err: unknown): string {
  if (err == null) return "Impossibile contattare il server.";
  if (typeof err === "string") return normalizeApiMessage(err);

  const message = err instanceof Error ? err.message.trim() : "";
  if (message) return normalizeApiMessage(message);

  return "Impossibile contattare il server.";
}

function normalizeApiMessage(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("typeerror: fetch failed")) {
    return "Il server non riesce a raggiungere il database. Riprova più tardi o contatta chi gestisce il backend.";
  }

  if (
    lower === "failed to fetch" ||
    lower.includes("fetch failed") ||
    lower.includes("networkerror") ||
    lower.includes("network request failed") ||
    lower.includes("load failed")
  ) {
    return "Impossibile contattare il server API. Verifica la connessione o riprova tra qualche minuto.";
  }

  if (lower.startsWith("api error: 5")) {
    return "Il server ha risposto con un errore interno. Riprova tra qualche minuto.";
  }

  if (lower.startsWith("api error: 404")) {
    return "Risorsa non trovata sul server.";
  }

  return message;
}
