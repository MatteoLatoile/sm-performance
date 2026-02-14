import { createBrowserClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "./keys";

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function createBrowserSupabase() {
  if (!browserClient) {
    browserClient = createBrowserClient(supabaseUrl(), supabaseAnonKey());
  }
  return browserClient;
}

// Alias si tu veux continuer à importer createClient()
export function createClient() {
  return createBrowserSupabase();
}
