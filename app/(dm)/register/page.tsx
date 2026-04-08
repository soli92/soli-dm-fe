"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { formatAuthError } from "@/lib/auth-errors";
import {
  appMuted,
  appPageTitle,
  appPanelStack,
  appSectionLabel,
} from "@/lib/ui-classes";
import { cn } from "@/lib/utils";
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
      toast.error(formatAuthError(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex justify-center px-4 py-10 sm:py-14">
      <div className="w-full max-w-md space-y-8">
        <header className="space-y-2 text-center">
          <p className={appSectionLabel}>Account</p>
          <h1 className={appPageTitle}>Registrati</h1>
          <p className={cn(appMuted, "text-sm")}>
            Crea un utente nel progetto Supabase collegato all&apos;app.
          </p>
        </header>
        {!supabaseReady && (
          <p
            className={cn(
              appMuted,
              "rounded-2xl border border-border/80 bg-card p-4 text-center text-sm shadow-sm"
            )}
            role="status"
          >
            Supabase non configurato: aggiungi{" "}
            <code className="text-foreground">NEXT_PUBLIC_SUPABASE_*</code> in{" "}
            <code className="text-foreground">.env.local</code>.
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
        <p className={cn(appMuted, "text-center text-sm")}>
          Hai già un account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Accedi
          </Link>
        </p>
      </div>
    </main>
  );
}
