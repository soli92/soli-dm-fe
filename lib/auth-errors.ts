/**
 * Messaggi in italiano per errori Supabase Auth (signup/login).
 * L’API spesso risponde in inglese; qui mappiamo code/msg ricorrenti.
 */
export function formatAuthError(err: unknown): string {
  if (err == null) return "Operazione non riuscita.";
  if (typeof err === "string") return err;

  const obj = err as Record<string, unknown>;
  const message = String(obj.message ?? "").trim();
  const code = String(obj.code ?? obj.error_code ?? "").toLowerCase();
  const lower = message.toLowerCase();

  if (
    code === "user_already_registered" ||
    code === "user_already_exists" ||
    lower.includes("already registered") ||
    lower.includes("already been registered") ||
    lower.includes("user already registered") ||
    lower.includes("email address is already registered")
  ) {
    return "Questa email è già registrata. Usa «Accedi» oppure, se disponibile, il recupero password.";
  }

  if (
    code === "weak_password" ||
    (lower.includes("password") &&
      (lower.includes("weak") ||
        lower.includes("least") ||
        lower.includes("characters") ||
        lower.includes("long enough")))
  ) {
    return "La password non rispetta i requisiti del progetto (lunghezza o complessità). Controlla le impostazioni in Supabase.";
  }

  if (
    code === "invalid_credentials" ||
    lower.includes("invalid login credentials") ||
    lower.includes("invalid email or password")
  ) {
    return "Email o password non corretti.";
  }

  if (
    lower.includes("email not confirmed") ||
    lower.includes("confirm your email")
  ) {
    return "Conferma l’indirizzo email prima di accedere (controlla anche lo spam).";
  }

  if (lower.includes("signup") && lower.includes("disabled")) {
    return "Le nuove registrazioni sono disabilitate sul progetto Supabase.";
  }

  if (
    lower.includes("rate limit") ||
    lower.includes("too many requests") ||
    code === "over_request_rate_limit"
  ) {
    return "Troppi tentativi. Riprova tra qualche minuto.";
  }

  if (lower.includes("invalid email")) {
    return "Indirizzo email non valido.";
  }

  if (message) return message;
  return "Operazione non riuscita.";
}
