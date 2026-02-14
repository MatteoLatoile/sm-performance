// src/lib/supabase/admin.ts
import { createClient } from "@supabase/supabase-js";
import { supabaseUrl } from "./keys";

export const ADMIN_EMAIL = (
  process.env.ADMIN_EMAIL ?? "smperformances.coaching@gmail.com"
).toLowerCase();

export function isAdminEmail(email?: string | null) {
  return (email ?? "").toLowerCase() === ADMIN_EMAIL;
}

let adminClient: ReturnType<typeof createClient> | null = null;

export function createAdminSupabase() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY in .env.local");
  }

  if (!adminClient) {
    adminClient = createClient(supabaseUrl(), serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return adminClient;
}
