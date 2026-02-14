import { createAdminSupabase } from "@/lib/supabase/admin-client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { ok: false, error: "STRIPE_SECRET_KEY manquante" },
        { status: 500 },
      );
    }

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { ok: false, error: "session_id manquant" },
        { status: 400 },
      );
    }

    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ ok: false, status: session.payment_status });
    }

    const reservationId = session.metadata?.reservation_id;
    if (!reservationId) {
      // On peut afficher quand même, mais on ne touche pas la DB
      return NextResponse.json({
        ok: true,
        payload: {
          discipline: session.metadata?.discipline ?? "—",
          session_date: session.metadata?.session_date ?? "—",
          session_time: session.metadata?.session_time ?? "—",
          email: session.metadata?.email ?? "—",
        },
        warning: "reservation_id manquant dans metadata",
      });
    }

    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : null;

    const admin = createAdminSupabase();

    // Update idempotent (refresh safe)
    const { data, error } = await admin
      .from("reservations")
      .update({
        status: "paid",
        stripe_session_id: session.id,
        stripe_payment_intent_id: paymentIntentId,
      })
      .eq("id", reservationId)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message, details: error.details ?? null },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      payload: data,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
