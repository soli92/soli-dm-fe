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

export default function LoginPage() {
  const router = useRouter();
  const { login, supabaseReady, loading } = useAuth();
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
    setSubmitting(true);
    try {
      await login(email, password);
      toast.success("Accesso effettuato.");
      router.push("/campaigns");
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
          <h1 className={appPageTitle}>Accedi</h1>
          <p className={cn(appMuted, "text-sm")}>
            Usa le credenziali del tuo progetto Supabase.
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={submitting || loading} className="w-full">
            {submitting ? "Accesso…" : "Entra"}
          </Button>
        </form>
        <p className={cn(appMuted, "text-center text-sm")}>
          Non hai un account?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Registrati
          </Link>
        </p>
      </div>
    </main>
  );
}
