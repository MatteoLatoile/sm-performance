import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  const email = data.user?.email ?? null;

  if (!email) {
    // pas connecté
    return new NextResponse(null, { status: 204 });
  }

  return NextResponse.json({ email }, { status: 200 });
}
