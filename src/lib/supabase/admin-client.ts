import { createClient } from "@supabase/supabase-js";
import { supabaseUrl } from "./keys";

export function createAdminSupabase() {
  const url = supabaseUrl();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY in .env.local");
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
