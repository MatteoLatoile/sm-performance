import { createServerClient } from "@supabase/ssr";
import { cookies, headers } from "next/headers";
import { supabaseAnonKey, supabaseUrl } from "./keys";

function parseCookieHeader(cookieHeader: string) {
  if (!cookieHeader) return [];

  return cookieHeader
    .split(";")
    .map((v) => v.trim())
    .filter(Boolean)
    .map((part) => {
      const eq = part.indexOf("=");
      if (eq === -1) return null;

      const rawName = part.slice(0, eq).trim();
      const rawValue = part.slice(eq + 1).trim();

      // decode safe
      let name = rawName;
      let value = rawValue;
      try {
        name = decodeURIComponent(rawName);
        value = decodeURIComponent(rawValue);
      } catch {
        // no-op
      }

      return { name, value };
    })
    .filter((x): x is { name: string; value: string } => Boolean(x));
}

/**
 * ✅ À utiliser dans les Server Components / Route Handlers
 */
export async function createServerSupabase() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const cookieHeader = headerStore.get("cookie") ?? "";

  return createServerClient(supabaseUrl(), supabaseAnonKey(), {
    cookies: {
      getAll() {
        // Next récent
        if (typeof (cookieStore as any).getAll === "function") {
          return (cookieStore as any).getAll();
        }
        // Fallback (si getAll n'existe pas)
        return parseCookieHeader(cookieHeader);
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            (cookieStore as any).set?.(name, value, options);
          });
        } catch {
          // en Server Components, set peut throw -> on ignore
        }
      },
    },
  });
}
