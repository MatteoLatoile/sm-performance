import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import Link from "next/link";

type Reservation = {
  id: string;
  discipline: string | null;
  session_date: string | null;
  session_time: string | null;
  status: string | null;
  amount_cents: number | null;
  currency: string | null;
  stripe_session_id: string | null;
  created_at?: string | null;
};

function formatEuro(cents: number | null | undefined) {
  if (typeof cents !== "number") return "—";
  return (cents / 100).toFixed(2).replace(".", ",") + " €";
}

function badgeStyle(status: string | null | undefined) {
  const s = (status ?? "").toLowerCase();
  if (s === "paid")
    return {
      bg: "rgba(212,175,55,0.14)",
      fg: "#E6C76A",
      bd: "rgba(212,175,55,0.30)",
    };
  if (s === "pending")
    return {
      bg: "rgba(120,130,145,0.16)",
      fg: "#A8B0BD",
      bd: "rgba(120,130,145,0.30)",
    };
  if (s === "expired" || s === "canceled" || s === "cancelled")
    return {
      bg: "rgba(231,76,60,0.10)",
      fg: "#E74C3C",
      bd: "rgba(231,76,60,0.24)",
    };
  return {
    bg: "rgba(120,130,145,0.16)",
    fg: "#A8B0BD",
    bd: "rgba(120,130,145,0.30)",
  };
}

export default async function UserPage() {
  const supabase = await createSupabaseServerClient();

  const { data: auth, error: authErr } = await supabase.auth.getUser();
  const user = auth?.user ?? null;

  // DA
  const BG = "#11151C";
  const CARD = "#0D1014";
  const SURFACE = "#11151C";
  const BORDER = "#232A36";
  const TEXT = "#F5F7FA";
  const MUTED = "#A8B0BD";
  const SOFT = "#788291";
  const GOLD = "#D4AF37";

  if (!user) {
    return (
      <main className="min-h-screen px-6 py-14" style={{ background: BG }}>
        <div className="mx-auto max-w-4xl">
          <div
            className="rounded-2xl border p-7"
            style={{ background: CARD, borderColor: BORDER }}
          >
            <h1 className="text-2xl font-extrabold" style={{ color: TEXT }}>
              Espace utilisateur
            </h1>
            <p className="mt-2" style={{ color: MUTED }}>
              Connecte-toi pour voir tes réservations et télécharger tes
              factures.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/login"
                className="px-6 py-3 rounded-full font-semibold"
                style={{
                  background: GOLD,
                  color: "#11151C",
                  boxShadow: "0 10px 30px rgba(212,175,55,0.18)",
                }}
              >
                Se connecter
              </Link>
              <Link
                href="/reservations"
                className="px-6 py-3 rounded-full font-semibold border"
                style={{
                  borderColor: BORDER,
                  color: TEXT,
                  background: "rgba(17,21,28,0.55)",
                }}
              >
                Réserver une séance
              </Link>
            </div>

            {authErr && (
              <div className="mt-4 text-[12px]" style={{ color: "#E74C3C" }}>
                Auth error: {authErr.message}
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  const email = (user.email ?? "").trim();
  const displayName =
    (user.user_metadata?.full_name as string | undefined) ||
    (user.user_metadata?.name as string | undefined) ||
    (user.user_metadata?.display_name as string | undefined) ||
    email ||
    "Utilisateur";

  const { data: reservationsData, error: resErr } = await supabase
    .from("reservations")
    .select(
      "id,discipline,session_date,session_time,status,amount_cents,currency,stripe_session_id,created_at",
    )
    // ✅ case-insensitive exact match
    .ilike("email", email)
    .order("created_at", { ascending: false });

  const reservations = (reservationsData ?? []) as Reservation[];
  const paid = reservations.filter(
    (r) => (r.status ?? "").toLowerCase() === "paid",
  );

  return (
    <main className="min-h-screen px-6 py-14" style={{ background: BG }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1
              className="font-extrabold"
              style={{
                color: TEXT,
                fontSize: "clamp(28px, 3.6vw, 44px)",
                letterSpacing: "-0.02em",
              }}
            >
              <span style={{ fontStyle: "italic" }}>MON</span>{" "}
              <span style={{ fontStyle: "italic", letterSpacing: "0.14em" }}>
                ESPACE
              </span>
            </h1>
            <p className="mt-2" style={{ color: MUTED }}>
              {displayName} • {email}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/reservations"
              className="px-6 py-3 rounded-full font-semibold"
              style={{
                background: GOLD,
                color: "#11151C",
                boxShadow: "0 10px 30px rgba(212,175,55,0.18)",
              }}
            >
              Réserver une séance
            </Link>
            <Link
              href="/"
              className="px-6 py-3 rounded-full font-semibold border"
              style={{
                borderColor: BORDER,
                color: TEXT,
                background: "rgba(17,21,28,0.55)",
              }}
            >
              Accueil
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4">
          <section
            className="rounded-2xl border p-6"
            style={{ background: CARD, borderColor: BORDER }}
          >
            <div className="text-[12px] font-semibold" style={{ color: MUTED }}>
              PROFIL
            </div>
            <div
              className="mt-2 text-[20px] font-extrabold"
              style={{ color: TEXT }}
            >
              {displayName}
            </div>

            <div
              className="mt-5 rounded-xl border p-4"
              style={{ background: SURFACE, borderColor: BORDER }}
            >
              <div
                className="text-[12px] font-semibold"
                style={{ color: SOFT }}
              >
                Email
              </div>
              <div
                className="mt-1 text-[13px] font-semibold"
                style={{ color: TEXT }}
              >
                {email || "—"}
              </div>

              <div
                className="mt-4 text-[12px] font-semibold"
                style={{ color: SOFT }}
              >
                UID
              </div>
              <div
                className="mt-1 text-[12px] font-semibold"
                style={{ color: MUTED, wordBreak: "break-all" }}
              >
                {user.id}
              </div>
            </div>

            <div
              className="mt-5 rounded-xl border p-4"
              style={{ background: SURFACE, borderColor: BORDER }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="text-[12px] font-semibold"
                  style={{ color: SOFT }}
                >
                  Réservations
                </div>
                <div
                  className="text-[12px] font-extrabold"
                  style={{ color: TEXT }}
                >
                  {reservations.length}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div
                  className="text-[12px] font-semibold"
                  style={{ color: SOFT }}
                >
                  Payées
                </div>
                <div
                  className="text-[12px] font-extrabold"
                  style={{ color: "#E6C76A" }}
                >
                  {paid.length}
                </div>
              </div>
            </div>

            {resErr && (
              <div
                className="mt-5 rounded-xl border p-4"
                style={{ background: "#11151C", borderColor: BORDER }}
              >
                <div
                  className="text-[12px] font-semibold"
                  style={{ color: "#E74C3C" }}
                >
                  RLS / Permission
                </div>
                <div
                  className="mt-2 text-[12px]"
                  style={{ color: MUTED, lineHeight: 1.6 }}
                >
                  {resErr.message}
                  <br />
                  👉 Si tu vois “permission denied” : applique la policy SQL que
                  je t’ai donnée.
                </div>
              </div>
            )}
          </section>

          <section
            className="rounded-2xl border p-6"
            style={{ background: CARD, borderColor: BORDER }}
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <div
                  className="text-[12px] font-semibold"
                  style={{ color: MUTED }}
                >
                  MES RÉSERVATIONS
                </div>
                <div
                  className="mt-2 text-[20px] font-extrabold"
                  style={{ color: TEXT }}
                >
                  Historique & factures
                </div>
              </div>
              <div
                className="text-[12px] font-semibold"
                style={{ color: SOFT }}
              >
                PDF dispo si <span style={{ color: "#E6C76A" }}>PAYÉ</span>
              </div>
            </div>

            <div
              className="mt-5 overflow-hidden rounded-xl border"
              style={{ borderColor: BORDER }}
            >
              <div
                className="grid grid-cols-[1.2fr_.9fr_.7fr_.7fr_1fr] px-4 py-3"
                style={{ background: "#11151C" }}
              >
                {["Discipline", "Créneau", "Statut", "Montant", "Facture"].map(
                  (h) => (
                    <div
                      key={h}
                      className="text-[12px] font-semibold"
                      style={{ color: MUTED }}
                    >
                      {h}
                    </div>
                  ),
                )}
              </div>

              {reservations.length === 0 ? (
                <div
                  className="px-4 py-6"
                  style={{ background: "#0D1014", color: MUTED }}
                >
                  Aucune réservation trouvée pour{" "}
                  <b style={{ color: TEXT }}>{email}</b>.
                </div>
              ) : (
                reservations.map((r) => {
                  const b = badgeStyle(r.status);
                  const isPaid = (r.status ?? "").toLowerCase() === "paid";
                  const canInvoice = isPaid && !!r.stripe_session_id;

                  return (
                    <div
                      key={r.id}
                      className="grid grid-cols-[1.2fr_.9fr_.7fr_.7fr_1fr] px-4 py-4 items-center"
                      style={{
                        borderTop: `1px solid ${BORDER}`,
                        background: "#0D1014",
                      }}
                    >
                      <div>
                        <div
                          className="text-[13px] font-extrabold"
                          style={{ color: TEXT }}
                        >
                          {r.discipline ?? "—"}
                        </div>
                        <div
                          className="text-[12px] mt-1"
                          style={{ color: SOFT }}
                        >
                          ID: <span style={{ color: MUTED }}>{r.id}</span>
                        </div>
                      </div>

                      <div
                        className="text-[13px] font-semibold"
                        style={{ color: TEXT }}
                      >
                        {(r.session_date ?? "—") +
                          " • " +
                          (r.session_time ?? "—")}
                      </div>

                      <div>
                        <span
                          className="inline-flex items-center justify-center rounded-full px-3 py-1 text-[12px] font-extrabold"
                          style={{
                            background: b.bg,
                            color: b.fg,
                            border: `1px solid ${b.bd}`,
                          }}
                        >
                          {(r.status ?? "—").toUpperCase()}
                        </span>
                      </div>

                      <div
                        className="text-[13px] font-extrabold"
                        style={{ color: TEXT }}
                      >
                        {formatEuro(r.amount_cents)}
                      </div>

                      <div>
                        {canInvoice ? (
                          <a
                            href={`/api/invoice?session_id=${encodeURIComponent(r.stripe_session_id!)}`}
                            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-[12px] font-extrabold"
                            style={{
                              background: GOLD,
                              color: "#11151C",
                              boxShadow: "0 10px 30px rgba(212,175,55,0.18)",
                            }}
                          >
                            Télécharger PDF
                          </a>
                        ) : (
                          <span
                            className="text-[12px] font-semibold"
                            style={{ color: SOFT }}
                          >
                            —
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
