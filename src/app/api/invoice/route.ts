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
    // ✅ Auth obligatoire
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
        {
          ok: false,
          error: "Paiement non confirmé",
          status: session.payment_status,
        },
        { status: 400 },
      );
    }

    const m = session.metadata ?? {};
    const sessionEmail = safeText(m.email);

    // ✅ Ownership check (email)
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
    const paymentIntentId =
      typeof session.payment_intent === "string" ? session.payment_intent : "";

    const discipline = safeText(m.discipline || "—");
    const session_date = safeText(m.session_date || "—");
    const session_time = safeText(m.session_time || "—");
    const first_name = safeText(m.first_name || "");
    const last_name = safeText(m.last_name || "");
    const phone = safeText(m.phone || "");
    const note = safeText(m.note || "");

    const invoiceNo = `SM-${fmtDateFR(createdAt).replaceAll("/", "")}-${session.id
      .slice(-8)
      .toUpperCase()}`;

    // ---- PDF DESIGN
    const doc = new PDFDocument({ size: "A4", margin: 48 });

    const GOLD = "#D4AF37";
    const DARK = "#11151C";
    const MUTED = "#788291";
    const BORDER = "#232A36";

    doc.rect(0, 0, doc.page.width, 92).fill(DARK);
    doc.rect(0, 88, doc.page.width, 4).fill(GOLD);

    doc
      .fillColor("white")
      .font("Helvetica-Bold")
      .fontSize(20)
      .text("SM PERFORMANCE", 48, 30, { characterSpacing: 1 });

    doc
      .fillColor("#A8B0BD")
      .font("Helvetica")
      .fontSize(10)
      .text("Confirmation de réservation • Facture", 48, 58);

    doc
      .fillColor("white")
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("FACTURE", 0, 28, { align: "right" });
    doc
      .fillColor("#A8B0BD")
      .font("Helvetica")
      .fontSize(10)
      .text(`N° ${invoiceNo}`, 0, 50, { align: "right" })
      .text(`Date: ${fmtDateFR(new Date())}`, 0, 64, { align: "right" });

    let y = 120;
    const leftX = 48;
    const rightX = 320;
    const cardW = 247;
    const cardH = 120;

    const card = (x: number, y0: number, title: string) => {
      doc
        .roundedRect(x, y0, cardW, cardH, 14)
        .lineWidth(1)
        .strokeColor(BORDER)
        .stroke();
      doc
        .fillColor(DARK)
        .font("Helvetica-Bold")
        .fontSize(11)
        .text(title, x + 16, y0 + 14);
      doc
        .rect(x + 16, y0 + 34, cardW - 32, 1)
        .fillColor("#F0F2F5")
        .fill();
    };

    card(leftX, y, "ÉMETTEUR");
    card(rightX, y, "CLIENT");

    doc
      .fillColor(MUTED)
      .font("Helvetica")
      .fontSize(10)
      .text("SM Performance", leftX + 16, y + 44)
      .text("Adresse: (à compléter)", leftX + 16, y + 60)
      .text("Email: contact@sm-performance.fr", leftX + 16, y + 76)
      .text("SIRET: (à compléter)", leftX + 16, y + 92);

    doc
      .fillColor(MUTED)
      .font("Helvetica")
      .fontSize(10)
      .text(`${first_name} ${last_name}`.trim() || "—", rightX + 16, y + 44)
      .text(`Email: ${sessionEmail || "—"}`, rightX + 16, y + 60)
      .text(`Téléphone: ${phone || "—"}`, rightX + 16, y + 76);

    y += cardH + 22;

    doc
      .fillColor(DARK)
      .font("Helvetica-Bold")
      .fontSize(12)
      .text("Détails de la réservation", 48, y);
    y += 12;
    doc
      .rect(48, y, doc.page.width - 96, 1)
      .fillColor("#F0F2F5")
      .fill();
    y += 16;

    const detailLine = (label: string, value: string) => {
      doc.fillColor(MUTED).font("Helvetica").fontSize(10).text(label, 48, y);
      doc
        .fillColor(DARK)
        .font("Helvetica-Bold")
        .fontSize(10)
        .text(value || "—", 210, y);
      y += 16;
    };

    detailLine("Discipline", discipline);
    detailLine("Date", session_date);
    detailLine("Heure", session_time);
    detailLine("Créée le", fmtDateTimeFR(createdAt));
    if (note) detailLine("Note", note);

    y += 10;

    const tableX = 48;
    const tableW = doc.page.width - 96;

    doc.roundedRect(tableX, y, tableW, 34, 12).fillAndStroke("#11151C", BORDER);
    doc
      .fillColor("white")
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("Description", tableX + 16, y + 11);
    doc
      .fillColor("white")
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("Qté", tableX + tableW - 180, y + 11, {
        width: 40,
        align: "right",
      });
    doc
      .fillColor("white")
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("Prix", tableX + tableW - 120, y + 11, {
        width: 100,
        align: "right",
      });

    y += 44;

    const rowH = 44;
    doc
      .roundedRect(tableX, y, tableW, rowH, 12)
      .lineWidth(1)
      .strokeColor(BORDER)
      .stroke();

    doc
      .fillColor(DARK)
      .font("Helvetica-Bold")
      .fontSize(10)
      .text(`Séance ${discipline}`, tableX + 16, y + 10);
    doc
      .fillColor(MUTED)
      .font("Helvetica")
      .fontSize(9)
      .text(`${session_date} • ${session_time}`, tableX + 16, y + 26);

    doc
      .fillColor(DARK)
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("1", tableX + tableW - 180, y + 16, {
        width: 40,
        align: "right",
      });

    doc
      .fillColor(DARK)
      .font("Helvetica-Bold")
      .fontSize(10)
      .text(euro(amountCents), tableX + tableW - 120, y + 16, {
        width: 100,
        align: "right",
      });

    y += rowH + 18;

    const totalsW = 260;
    const totalsX = tableX + tableW - totalsW;

    doc
      .roundedRect(totalsX, y, totalsW, 108, 14)
      .lineWidth(1)
      .strokeColor(BORDER)
      .stroke();

    y += 16;
    const tLine = (label: string, value: string) => {
      doc
        .fillColor(MUTED)
        .font("Helvetica")
        .fontSize(10)
        .text(label, totalsX + 16, y);
      doc
        .fillColor(DARK)
        .font("Helvetica")
        .fontSize(10)
        .text(value, totalsX + 16, y, {
          width: totalsW - 32,
          align: "right",
        });
      y += 18;
    };

    tLine("Sous-total", euro(amountCents));
    tLine("TVA", "0,00 €");
    doc
      .rect(totalsX + 16, y + 6, totalsW - 32, 1)
      .fillColor("#F0F2F5")
      .fill();
    y += 16;

    doc
      .fillColor(GOLD)
      .font("Helvetica-Bold")
      .fontSize(11)
      .text("Total payé", totalsX + 16, y);
    doc
      .fillColor(GOLD)
      .font("Helvetica-Bold")
      .fontSize(11)
      .text(euro(amountCents), totalsX + 16, y, {
        width: totalsW - 32,
        align: "right",
      });

    const payY = y + 34;
    doc
      .fillColor(DARK)
      .font("Helvetica-Bold")
      .fontSize(11)
      .text("Paiement", 48, payY);
    doc
      .fillColor(MUTED)
      .font("Helvetica")
      .fontSize(10)
      .text("Statut: PAYÉ", 48, payY + 18)
      .text(`Devise: ${currency}`, 48, payY + 34)
      .text(`Stripe session: ${session.id}`, 48, payY + 50);

    if (paymentIntentId)
      doc.text(`Payment intent: ${paymentIntentId}`, 48, payY + 66);

    const footerY = doc.page.height - 86;
    doc.rect(0, footerY, doc.page.width, 1).fillColor("#F0F2F5").fill();
    doc
      .fillColor(MUTED)
      .font("Helvetica")
      .fontSize(9)
      .text(
        "Document généré automatiquement. Ceci peut servir de confirmation de réservation.",
        48,
        footerY + 16,
      )
      .text("Merci pour votre confiance.", 48, footerY + 32);

    doc
      .fillColor(GOLD)
      .font("Helvetica-Bold")
      .fontSize(9)
      .text("SM Performance", 0, footerY + 32, { align: "right" });

    doc.end();

    const pdfBuffer = await docToBuffer(doc);

    return new Response(pdfBuffer, {
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
