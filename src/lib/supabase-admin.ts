import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service role key.
 * NEVER import this file from a Client Component — it will throw
 * because the "server-only" package blocks client bundling.
 * Used by admin server actions / route handlers in src/app/admin and
 * src/app/api to bypass RLS for privileged operations (order management,
 * inventory writes, analytics aggregation).
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-role",
  { auth: { persistSession: false } }
);
