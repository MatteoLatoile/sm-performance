import { createAdminSupabase } from "@/lib/supabase/admin-client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  discipline: string;
  session_date: string; // YYYY-MM-DD
  session_time: string; // "08:00"
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  note?: string;
};

function getOrigin(req: Request) {
  // ✅ En dev: toujours l'origin réel (localhost)
  if (process.env.NODE_ENV === "development") {
    return new URL(req.url).origin;
  }

  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env) {
    try {
      return new URL(env).origin;
    } catch {
      return env.replace(/\/$/, "");
    }
  }

  return new URL(req.url).origin;
}

export async function POST(req: Request) {
  const admin = createAdminSupabase();

  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY manquante dans .env.local" },
        { status: 500 },
      );
    }

    const stripe = new Stripe(secretKey);

    const body = (await req.json()) as Partial<Body>;

    const required: Array<keyof Body> = [
      "discipline",
      "session_date",
      "session_time",
      "first_name",
      "last_name",
      "phone",
      "email",
    ];

    for (const k of required) {
      if (!body[k] || String(body[k]).trim().length === 0) {
        return NextResponse.json(
          { error: `Champ manquant: ${k}` },
          { status: 400 },
        );
      }
    }

    const origin = getOrigin(req);

    // ✅ Prix (ex 30€)
    const amountInCents = 3000;

    // 1) LOCK créneau en DB (pending)
    const pendingPayload = {
      discipline: String(body.discipline),
      session_date: String(body.session_date),
      session_time: String(body.session_time),
      first_name: String(body.first_name),
      last_name: String(body.last_name),
      phone: String(body.phone),
      email: String(body.email),
      note: String(body.note ?? ""),
      status: "pending",
      amount_cents: amountInCents,
      currency: "eur",
    };

    const { data: created, error: insertErr } = await admin
      .from("reservations")
      .insert(pendingPayload)
      .select("id")
      .single();

    if (insertErr) {
      // Unique violation => créneau déjà pris
      // (supabase renvoie souvent code "23505")
      const code = (insertErr as any).code;
      if (code === "23505") {
        return NextResponse.json(
          { error: "Créneau déjà réservé. Choisis un autre horaire." },
          { status: 409 },
        );
      }

      return NextResponse.json({ error: insertErr.message }, { status: 500 });
    }

    const reservationId = created?.id;
    if (!reservationId) {
      return NextResponse.json(
        { error: "Impossible de créer la réservation pending (id manquant)." },
        { status: 500 },
      );
    }

    // 2) Crée Checkout Session Stripe
    const expiresAt = Math.floor(Date.now() / 1000) + 30 * 60; // 30 min (optionnel mais conseillé)

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      expires_at: expiresAt,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: amountInCents,
            product_data: {
              name: `Séance ${body.discipline}`,
              description: `${body.session_date} à ${body.session_time}`,
            },
          },
        },
      ],

      success_url: `${origin}/reservations/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/reservations/cancel`,

      metadata: {
        reservation_id: String(reservationId),

        discipline: String(body.discipline),
        session_date: String(body.session_date),
        session_time: String(body.session_time),
        first_name: String(body.first_name),
        last_name: String(body.last_name),
        phone: String(body.phone),
        email: String(body.email),
        note: String(body.note ?? ""),

        amount_cents: String(amountInCents),
        currency: "eur",
      },
    });

    // 3) On stocke l'id Stripe session sur la réservation pending (utile debug)
    await admin
      .from("reservations")
      .update({ stripe_session_id: session.id })
      .eq("id", reservationId);

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
