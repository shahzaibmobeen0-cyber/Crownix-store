"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import Logo from "@/components/logo";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (!isSupabaseConfigured) {
      // Demo mode: allow entry so the dashboard UI can be reviewed.
      // Replace this branch once Supabase + the `profiles.is_admin` flag
      // are configured — see README "Admin Access".
      toast.success("Demo mode — entering dashboard preview.");
      sessionStorage.setItem("crownix-admin-demo", "1");
      router.push("/admin/dashboard");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) {
      toast.error(error?.message ?? "Invalid credentials.");
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", data.user.id)
      .single();

    if (!profile?.is_admin) {
      toast.error("This account does not have admin access.");
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-onyx-radial px-6">
      <div className="glass w-full max-w-sm p-8">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <p className="eyebrow mb-6 text-center">Admin Access</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            type="email"
            placeholder="Admin Email"
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
            {loading ? "Verifying…" : "Sign In"}
          </button>
        </form>
        {!isSupabaseConfigured && (
          <p className="mt-4 text-center text-xs text-ivory/40">
            Supabase not configured — any submission opens a demo preview of the dashboard.
          </p>
        )}
      </div>
    </div>
  );
}
