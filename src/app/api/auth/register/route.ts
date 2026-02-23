import { NextResponse } from "next/server";
import { createServerSupabase } from "../../../../lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body)
    return NextResponse.json({ error: "Body invalide" }, { status: 400 });

  const { firstName, lastName, email, password } = body;

  if (!firstName || firstName.trim().length < 2)
    return NextResponse.json({ error: "Prénom invalide" }, { status: 400 });

  if (!lastName || lastName.trim().length < 2)
    return NextResponse.json({ error: "Nom invalide" }, { status: 400 });

  if (!email || typeof email !== "string")
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });

  if (!password || typeof password !== "string" || password.length < 8)
    return NextResponse.json(
      { error: "Mot de passe invalide" },
      { status: 400 },
    );

  const supabase = await createServerSupabase();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { first_name: firstName, last_name: lastName },
    },
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ ok: true });
}
