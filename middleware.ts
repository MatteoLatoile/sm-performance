import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { supabaseAnonKey, supabaseUrl } from "./src/lib/supabase/keys";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(supabaseUrl(), supabaseAnonKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  // refresh session cookie
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/user/:path*"],
};
