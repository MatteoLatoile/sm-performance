import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/keys";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ ok: true });

  try {
    const supabase = createServerClient(supabaseUrl(), supabaseAnonKey(), {
      cookies: {
        // ✅ ICI : on lit depuis request.cookies (getAll existe)
        getAll() {
          return request.cookies.getAll();
        },
        // ✅ ICI : on écrit sur la response
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    });

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("[LOGOUT] signOut error:", error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 },
      );
    }

    return response;
  } catch (e: any) {
    console.error("[LOGOUT] crash:", e);
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Logout failed" },
      { status: 500 },
    );
  }
}
