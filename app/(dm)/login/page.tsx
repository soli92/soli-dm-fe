"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { appMuted, appPageTitle, appPanel } from "@/lib/ui-classes";
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
      toast.error(err instanceof Error ? err.message : "Login fallito");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="px-4 py-12 flex justify-center">
      <div className="w-full max-w-md space-y-6">
        <h1 className={`${appPageTitle} text-center`}>Accedi</h1>
        {!supabaseReady && (
          <p
            className={`${appMuted} text-sm text-center rounded-lg border border-border bg-muted/40 p-3`}
          >
            Supabase non configurato: aggiungi le variabili{" "}
            <code className="text-xs text-foreground">NEXT_PUBLIC_SUPABASE_*</code> in{" "}
            <code className="text-xs text-foreground">.env.local</code>.
          </p>
        )}
        <form onSubmit={handleSubmit} className={`${appPanel} space-y-4`}>
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
        <p className={`${appMuted} text-center text-sm`}>
          Non hai un account?{" "}
          <Link href="/register" className="text-primary hover:underline font-medium">
            Registrati
          </Link>
        </p>
      </div>
    </main>
  );
}
