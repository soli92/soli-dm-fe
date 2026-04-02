"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { appMuted, appPageTitle, appPanelStack } from "@/lib/ui-classes";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const { register, supabaseReady, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabaseReady) {
      toast.error(
        "Configura NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
      );
      return;
    }
    if (password.length < 6) {
      toast.error("La password deve avere almeno 6 caratteri.");
      return;
    }
    setSubmitting(true);
    try {
      await register(email, password, name);
      toast.success(
        "Registrazione inviata. Se la conferma email è attiva, controlla la posta."
      );
      router.push("/login");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registrazione fallita");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="px-4 py-12 flex justify-center">
      <div className="w-full max-w-md space-y-6">
        <h1 className={`${appPageTitle} text-center`}>Registrati</h1>
        {!supabaseReady && (
          <p
            className={`${appMuted} text-sm text-center rounded-lg border border-border bg-muted/40 p-3`}
          >
            Supabase non configurato: aggiungi le variabili{" "}
            <code className="text-xs text-foreground">NEXT_PUBLIC_SUPABASE_*</code> in{" "}
            <code className="text-xs text-foreground">.env.local</code>.
          </p>
        )}
        <form onSubmit={handleSubmit} className={appPanelStack}>
          <Input
            label="Nome (opzionale)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <Button type="submit" disabled={submitting || loading} className="w-full">
            {submitting ? "Invio…" : "Crea account"}
          </Button>
        </form>
        <p className={`${appMuted} text-center text-sm`}>
          Hai già un account?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Accedi
          </Link>
        </p>
      </div>
    </main>
  );
}
