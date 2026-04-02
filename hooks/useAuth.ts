"use client";

import { useState, useEffect, useCallback } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { getSupabaseBrowser, isSupabaseConfigured } from "@/lib/supabase-browser";

export type AuthUser = {
  id: string;
  email: string | undefined;
  name?: string;
};

function mapUser(u: User | null): AuthUser | null {
  if (!u) return null;
  return {
    id: u.id,
    email: u.email,
    name: u.user_metadata?.name as string | undefined,
  };
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    void supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (cancelled) return;
      setSession(s);
      setUser(mapUser(s?.user ?? null));
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(mapUser(s?.user ?? null));
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const supabase = getSupabaseBrowser();
    if (!supabase) throw new Error("Supabase non configurato (env mancanti).");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      const supabase = getSupabaseBrowser();
      if (!supabase) throw new Error("Supabase non configurato (env mancanti).");
      setLoading(true);
      try {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { name: name.trim() || undefined } },
        });
        if (error) throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setUser(null);
      setSession(null);
      return;
    }
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    session,
    loading,
    login,
    logout,
    register,
    supabaseReady: isSupabaseConfigured(),
  };
}
