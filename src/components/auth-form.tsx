"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      toast.error("Connect Supabase to enable accounts — see README.");
      return;
    }
    setLoading(true);
    const action =
      mode === "login"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password });
    const { error } = await action;
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(mode === "login" ? "Welcome back." : "Account created — check your inbox to confirm.");
    router.refresh();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
  }

  if (user) {
    return (
      <div className="glass max-w-md p-8">
        <p className="eyebrow mb-2">Signed In</p>
        <p className="font-display text-2xl text-ivory">{user.email}</p>
        <button onClick={handleLogout} className="btn-outline mt-6 w-full">
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="glass max-w-md p-8">
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setMode("login")}
          className={`font-mono text-xs uppercase tracking-widest2 ${mode === "login" ? "text-champagne" : "text-ivory/40"}`}
        >
          Sign In
        </button>
        <button
          onClick={() => setMode("signup")}
          className={`font-mono text-xs uppercase tracking-widest2 ${mode === "signup" ? "text-champagne" : "text-ivory/40"}`}
        >
          Create Account
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-white/15 bg-transparent px-4 py-3 text-sm focus:border-champagne focus:outline-none"
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-white/15 bg-transparent px-4 py-3 text-sm focus:border-champagne focus:outline-none"
        />
        <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-50">
          {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
        </button>
      </form>
      {!isSupabaseConfigured && (
        <p className="mt-4 text-xs text-ivory/40">
          Demo mode — connect Supabase (see README) to enable real accounts.
        </p>
      )}
    </div>
  );
}
