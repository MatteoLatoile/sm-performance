import { resend, RESEND_CONTACT_TO, RESEND_FROM } from "@/lib/resend";
import { createAdminSupabase } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const subject = (body.subject ?? "").trim();
    const message = (body.message ?? "").trim();

    if (name.length < 2) {
      return NextResponse.json({ error: "Nom invalide" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    if (subject.length < 2) {
      return NextResponse.json({ error: "Objet invalide" }, { status: 400 });
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: "Message trop court (10+ caractères)" },
        { status: 400 },
      );
    }

    // 1) Save in DB (Supabase service role)
    const admin = createAdminSupabase();

    const { error: dbError } = await admin.from("contact_messages").insert(
      [
        {
          name,
          email,
          subject,
          message,
          status: "new",
        },
      ] as any, // 👈 fix TypeScript Supabase (évite le type "never")
    );

    if (dbError) {
      return NextResponse.json(
        { error: "Erreur DB: " + dbError.message },
        { status: 500 },
      );
    }

    // 2) Email to admin
    await resend.emails.send({
      from: RESEND_FROM,
      to: RESEND_CONTACT_TO,
      subject: `📩 Contact — ${subject}`,
      replyTo: email,
      text: [
        `Nouveau message (Contact)`,
        ``,
        `Nom: ${name}`,
        `Email: ${email}`,
        `Objet: ${subject}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif">
          <h2>Nouveau message (Contact)</h2>
          <p><b>Nom:</b> ${escapeHtml(name)}</p>
          <p><b>Email:</b> ${escapeHtml(email)}</p>
          <p><b>Objet:</b> ${escapeHtml(subject)}</p>
          <hr/>
          <pre style="white-space:pre-wrap">${escapeHtml(message)}</pre>
        </div>
      `,
    });

    // 3) Confirmation au client
    await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      subject: "✅ Message reçu — SM Performance",
      replyTo: RESEND_CONTACT_TO,
      text: [
        `Bonjour ${name},`,
        ``,
        `On a bien reçu ton message (“${subject}”).`,
        `On te répond au plus vite.`,
        ``,
        `SM Performance`,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif">
          <h2>✅ Message reçu</h2>
          <p>Bonjour <b>${escapeHtml(name)}</b>,</p>
          <p>On a bien reçu ton message (“${escapeHtml(subject)}”).</p>
          <p>On te répond au plus vite.</p>
          <p style="margin-top:18px;color:#666">SM Performance</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message ?? "Erreur serveur" },
      { status: 500 },
    );
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
