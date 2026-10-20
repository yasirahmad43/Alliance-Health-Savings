import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client for lead storage.
 *
 * The `leads` table has RLS enabled with an INSERT-only policy for the
 * anon/publishable role, so a submission can be written but never read back
 * with that key. Reading leads requires the service role key or the dashboard.
 *
 * SUPABASE_SERVICE_ROLE_KEY is preferred when it is present; the publishable
 * key is the fallback so lead capture works the moment the project exists.
 * Neither key is ever sent to the browser — this module is server-only.
 */
function writeKey() {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    ""
  );
}

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = writeKey();
  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars (NEXT_PUBLIC_SUPABASE_URL plus SUPABASE_SERVICE_ROLE_KEY or SUPABASE_PUBLISHABLE_KEY).",
    );
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const isSupabaseConfigured = () =>
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!writeKey();
