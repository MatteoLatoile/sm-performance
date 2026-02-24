import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function euro(amountCents: number) {
  return (amountCents / 100).toFixed(2).replace(".", ",") + " €";
}

function fmtDateFR(d: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

function fmtDateTimeFR(d: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

function safeText(v: unknown) {
  return String(v ?? "").trim();
}

async function docToBuffer(doc: any) {
  const chunks: Buffer[] = [];
  return await new Promise<Buffer>((resolve, reject) => {
    doc.on("data", (c: Buffer) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });
}

export async function GET(req: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;

    if (!user?.email) {
      return NextResponse.json(
        { ok: false, error: "Non autorisé" },
        { status: 401 },
      );
    }

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
      return NextResponse.json(
        { ok: false, error: "Paiement non confirmé" },
        { status: 400 },
      );
    }

    const m = session.metadata ?? {};
    const sessionEmail = safeText(m.email);

    if (
      !sessionEmail ||
      sessionEmail.toLowerCase() !== user.email.toLowerCase()
    ) {
      return NextResponse.json(
        { ok: false, error: "Accès refusé" },
        { status: 403 },
      );
    }

    const createdAt =
      typeof session.created === "number"
        ? new Date(session.created * 1000)
        : new Date();

    const amountCents =
      (typeof session.amount_total === "number"
        ? session.amount_total
        : null) ??
      (m.amount_cents ? Number.parseInt(m.amount_cents, 10) : null);

    if (!amountCents || Number.isNaN(amountCents)) {
      return NextResponse.json(
        { ok: false, error: "amount_cents introuvable" },
        { status: 500 },
      );
    }

    const currency = safeText(
      session.currency || m.currency || "eur",
    ).toUpperCase();

    const discipline = safeText(m.discipline || "—");
    const session_date = safeText(m.session_date || "—");
    const session_time = safeText(m.session_time || "—");

    const invoiceNo = `SM-${fmtDateFR(createdAt).replaceAll("/", "")}-${session.id
      .slice(-8)
      .toUpperCase()}`;

    const doc = new PDFDocument({ size: "A4", margin: 48 });

    doc.fontSize(20).text("SM PERFORMANCE", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text("FACTURE", { align: "center" });
    doc.moveDown();

    doc.text(`Numéro : ${invoiceNo}`);
    doc.text(`Date : ${fmtDateFR(new Date())}`);
    doc.moveDown();

    doc.text(`Client : ${sessionEmail}`);
    doc.text(`Discipline : ${discipline}`);
    doc.text(`Date séance : ${session_date}`);
    doc.text(`Heure : ${session_time}`);
    doc.moveDown();

    doc.text(`Total payé : ${euro(amountCents)} ${currency}`);

    doc.end();

    const pdfBuffer = await docToBuffer(doc);

    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="facture-${invoiceNo}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
