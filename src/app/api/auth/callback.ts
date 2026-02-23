import { createServerClient } from "@supabase/ssr";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/keys";

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

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/";

  if (code) {
    const cookieStore = await cookies();
    const headerStore = await headers();
    const cookieHeader = headerStore.get("cookie") ?? "";

    const supabase = createServerClient(supabaseUrl(), supabaseAnonKey(), {
      cookies: {
        getAll() {
          // Next récent
          if (typeof (cookieStore as any).getAll === "function") {
            return (cookieStore as any).getAll();
          }
          // Fallback
          return parseCookieHeader(cookieHeader);
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            (cookieStore as any).set?.(name, value, options);
          });
        },
      },
    });

    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL(next, url.origin));
}
