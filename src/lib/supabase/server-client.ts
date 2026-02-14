import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/keys";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl(), supabaseAnonKey(), {
    cookies: {
      getAll() {
        // Next: cookieStore.getAll() est dispo une fois cookies() await
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        // Dans un Server Component, set() peut throw -> on ignore si middleware refresh déjà la session.
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // noop
        }
      },
    },
  });
}
