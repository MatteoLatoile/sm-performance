import { createAdminSupabase } from "@/lib/supabase/admin-client";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return new Response("Missing stripe-signature or STRIPE_WEBHOOK_SECRET", {
      status: 400,
    });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Webhook Error";
    return new Response(msg, { status: 400 });
  }

  const supabase = createAdminSupabase();

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const reservationId = session.metadata?.reservation_id;
      const paymentIntent =
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : null;

      if (reservationId && session.payment_status === "paid") {
        await supabase
          .from("reservations")
          .update({
            status: "paid",
            stripe_session_id: session.id,
            stripe_payment_intent_id: paymentIntent,
          })
          .eq("id", reservationId);
      }
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session;
      const reservationId = session.metadata?.reservation_id;

      if (reservationId) {
        await supabase
          .from("reservations")
          .update({
            status: "expired",
            stripe_session_id: session.id,
          })
          .eq("id", reservationId)
          .eq("status", "pending");
      }
    }

    return new Response("ok", { status: 200 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Webhook handler error";
    return new Response(msg, { status: 500 });
  }
}
