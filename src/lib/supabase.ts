import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

/**
 * Browser/client-side Supabase client. Safe to import in Client Components.
 * Falls back gracefully in local/demo mode when env vars are not set —
 * the storefront runs entirely on mock data from src/data until Supabase
 * is configured (see README "Connecting Supabase").
 */
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
  { auth: { persistSession: true, autoRefreshToken: true } }
);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
