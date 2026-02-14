import { createAdminSupabase } from "@/lib/supabase/admin";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const admin = createAdminSupabase();

  const { data: reservations, error: rErr } = await admin
    .from("reservations")
    .select(
      "id, created_at, discipline, session_date, session_time, first_name, last_name, phone, email, note, status, amount_cents, currency, stripe_session_id",
    )
    .order("created_at", { ascending: false });

  const { data: messages, error: mErr } = await admin
    .from("contact_messages")
    .select("id, created_at, name, email, subject, message")
    .order("created_at", { ascending: false });

  if (rErr) {
    return (
      <main className="mx-auto max-w-6xl px-8 py-10">
        <div style={{ color: "#E74C3C" }}>
          Erreur réservations: {rErr.message}
        </div>
      </main>
    );
  }

  if (mErr) {
    return (
      <main className="mx-auto max-w-6xl px-8 py-10">
        <div style={{ color: "#E74C3C" }}>Erreur messages: {mErr.message}</div>
      </main>
    );
  }

  return (
    <DashboardClient
      reservations={(reservations ?? []) as any}
      messages={(messages ?? []) as any}
    />
  );
}
