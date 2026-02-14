"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type ReservationRow = {
  id: string;
  created_at: string;
  discipline: string;
  session_date: string;
  session_time: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  note: string | null;
  status: string | null;
  amount_cents: number | null;
  currency: string | null;
  stripe_session_id: string | null;
};

type ContactMessageRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  subject: string;
  message: string;
};

function fmtDate(s: string) {
  return s?.slice(0, 10) ?? s;
}

function money(amountCents: number | null, currency: string | null) {
  if (!amountCents) return "—";
  const cur = (currency ?? "eur").toUpperCase();
  return `${(amountCents / 100).toFixed(2)} ${cur}`;
}

export default function DashboardClient(props: {
  reservations: ReservationRow[];
  messages: ContactMessageRow[];
}) {
  const router = useRouter();

  const [reservations, setReservations] = useState<ReservationRow[]>(
    props.reservations,
  );
  const [messages, setMessages] = useState<ContactMessageRow[]>(props.messages);

  const [busyId, setBusyId] = useState<string | null>(null);

  const stats = useMemo(() => {
    const totalRes = reservations.length;
    const totalMsg = messages.length;
    const paidLike = reservations.filter((r) =>
      String(r.status ?? "")
        .toLowerCase()
        .includes("paid"),
    ).length;
    return { totalRes, totalMsg, paidLike };
  }, [reservations, messages]);

  const delReservation = async (id: string) => {
    if (busyId) return;
    setBusyId(id);

    const res = await fetch(`/api/admin/reservations/${id}`, {
      method: "DELETE",
    });
    const json = (await res.json()) as { ok?: boolean; error?: string };

    if (!res.ok || !json.ok) {
      alert(json.error ?? "Erreur suppression réservation");
      setBusyId(null);
      return;
    }

    setReservations((prev) => prev.filter((r) => r.id !== id));
    setBusyId(null);
    router.refresh();
  };

  const delMessage = async (id: string) => {
    if (busyId) return;
    setBusyId(id);

    const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    const json = (await res.json()) as { ok?: boolean; error?: string };

    if (!res.ok || !json.ok) {
      alert(json.error ?? "Erreur suppression message");
      setBusyId(null);
      return;
    }

    setMessages((prev) => prev.filter((m) => m.id !== id));
    setBusyId(null);
    router.refresh();
  };

  return (
    <main className="mx-auto max-w-6xl px-8 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold" style={{ color: "#F5F7FA" }}>
            Dashboard Admin
          </h1>
          <p className="mt-3" style={{ color: "#A8B0BD" }}>
            Réservations + messages contact (local).
          </p>
        </div>

        <div className="flex gap-3">
          <StatChip label="Réservations" value={stats.totalRes} />
          <StatChip label="Messages" value={stats.totalMsg} />
          <StatChip label="Paid (status)" value={stats.paidLike} />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RESERVATIONS */}
        <section
          className="rounded-[22px] p-4"
          style={{
            background: "#0D1014",
            border: "1px solid #232A36",
            boxShadow: "0 30px 120px rgba(0,0,0,0.45)",
          }}
        >
          <div className="flex items-center justify-between gap-3 px-2 pt-2">
            <div>
              <div
                className="text-[12px] font-semibold tracking-[0.18em]"
                style={{ color: "#788291" }}
              >
                RESERVATIONS
              </div>
              <div
                className="mt-1 text-[18px] font-extrabold"
                style={{ color: "#F5F7FA" }}
              >
                Liste des réservations
              </div>
            </div>
            <div
              className="text-[12px] font-semibold"
              style={{ color: "#A8B0BD" }}
            >
              {reservations.length} item(s)
            </div>
          </div>

          <div
            className="mt-4 rounded-[18px] overflow-hidden"
            style={{ border: "1px solid #232A36", background: "#11151C" }}
          >
            <div className="max-h-[520px] overflow-auto">
              <table className="w-full text-left">
                <thead>
                  <tr style={{ background: "#0D1014" }}>
                    <Th>Date</Th>
                    <Th>Discipline</Th>
                    <Th>Client</Th>
                    <Th>Téléphone</Th>
                    <Th>Heure</Th>
                    <Th>Status</Th>
                    <Th>Montant</Th>
                    <Th></Th>
                  </tr>
                </thead>

                <tbody>
                  {reservations.map((r) => (
                    <tr
                      key={r.id}
                      style={{ borderTop: "1px solid rgba(35,42,54,0.65)" }}
                    >
                      <Td>{fmtDate(r.session_date)}</Td>
                      <Td>{r.discipline}</Td>
                      <Td>
                        <div
                          className="font-semibold"
                          style={{ color: "#F5F7FA" }}
                        >
                          {r.first_name} {r.last_name}
                        </div>
                        <div
                          className="text-[12px]"
                          style={{ color: "#788291" }}
                        >
                          {r.email}
                        </div>
                      </Td>
                      <Td>
                        <span style={{ color: "#F5F7FA", fontWeight: 700 }}>
                          {r.phone?.trim() ? r.phone : "—"}
                        </span>
                      </Td>
                      <Td>{r.session_time}</Td>
                      <Td>
                        <Badge value={r.status ?? "—"} />
                      </Td>
                      <Td>{money(r.amount_cents, r.currency)}</Td>
                      <Td>
                        <button
                          onClick={() => delReservation(r.id)}
                          disabled={busyId === r.id}
                          className="px-3 py-2 rounded-full text-[12px] font-semibold transition"
                          style={{
                            background: "#11151C",
                            color: "#E74C3C",
                            border: "1px solid rgba(231,76,60,0.35)",
                            opacity: busyId === r.id ? 0.6 : 1,
                            cursor: busyId === r.id ? "not-allowed" : "pointer",
                          }}
                        >
                          {busyId === r.id ? "..." : "Delete"}
                        </button>
                      </Td>
                    </tr>
                  ))}

                  {reservations.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="p-4 text-[13px]"
                        style={{ color: "#A8B0BD" }}
                      >
                        Aucune réservation pour l’instant.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* MESSAGES */}
        <section
          className="rounded-[22px] p-4"
          style={{
            background: "#0D1014",
            border: "1px solid #232A36",
            boxShadow: "0 30px 120px rgba(0,0,0,0.45)",
          }}
        >
          <div className="flex items-center justify-between gap-3 px-2 pt-2">
            <div>
              <div
                className="text-[12px] font-semibold tracking-[0.18em]"
                style={{ color: "#788291" }}
              >
                CONTACT
              </div>
              <div
                className="mt-1 text-[18px] font-extrabold"
                style={{ color: "#F5F7FA" }}
              >
                Messages reçus
              </div>
            </div>
            <div
              className="text-[12px] font-semibold"
              style={{ color: "#A8B0BD" }}
            >
              {messages.length} item(s)
            </div>
          </div>

          <div
            className="mt-4 rounded-[18px] overflow-hidden"
            style={{ border: "1px solid #232A36", background: "#11151C" }}
          >
            <div className="max-h-[520px] overflow-auto">
              <table className="w-full text-left">
                <thead>
                  <tr style={{ background: "#0D1014" }}>
                    <Th>Date</Th>
                    <Th>Nom</Th>
                    <Th>Email</Th>
                    <Th>Objet</Th>
                    <Th>Message</Th>
                    <Th></Th>
                  </tr>
                </thead>

                <tbody>
                  {messages.map((m) => (
                    <tr
                      key={m.id}
                      style={{ borderTop: "1px solid rgba(35,42,54,0.65)" }}
                    >
                      <Td>{m.created_at?.slice(0, 10)}</Td>
                      <Td>{m.name}</Td>
                      <Td>{m.email}</Td>
                      <Td>{m.subject}</Td>
                      <Td>
                        <div style={{ color: "#F5F7FA" }}>
                          {m.message.length > 80
                            ? m.message.slice(0, 80) + "…"
                            : m.message}
                        </div>
                      </Td>
                      <Td>
                        <button
                          onClick={() => delMessage(m.id)}
                          disabled={busyId === m.id}
                          className="px-3 py-2 rounded-full text-[12px] font-semibold transition"
                          style={{
                            background: "#11151C",
                            color: "#E74C3C",
                            border: "1px solid rgba(231,76,60,0.35)",
                            opacity: busyId === m.id ? 0.6 : 1,
                            cursor: busyId === m.id ? "not-allowed" : "pointer",
                          }}
                        >
                          {busyId === m.id ? "..." : "Delete"}
                        </button>
                      </Td>
                    </tr>
                  ))}

                  {messages.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-4 text-[13px]"
                        style={{ color: "#A8B0BD" }}
                      >
                        Aucun message pour l’instant.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatChip(props: { label: string; value: number }) {
  return (
    <div
      className="rounded-full px-4 py-2"
      style={{
        background: "#0D1014",
        border: "1px solid #232A36",
        color: "#A8B0BD",
      }}
    >
      <span className="text-[12px] font-semibold">{props.label}: </span>
      <span className="text-[12px] font-extrabold" style={{ color: "#F5F7FA" }}>
        {props.value}
      </span>
    </div>
  );
}

function Badge(props: { value: string }) {
  const v = props.value.toLowerCase();
  const ok = v.includes("paid") || v.includes("confirm") || v.includes("done");
  const warn = v.includes("pending") || v.includes("unpaid");

  const bg = ok
    ? "rgba(46,204,113,0.12)"
    : warn
      ? "rgba(212,175,55,0.10)"
      : "rgba(168,176,189,0.10)";

  const color = ok ? "#2ECC71" : warn ? "#E6C76A" : "#A8B0BD";

  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold"
      style={{ background: bg, color, border: "1px solid rgba(35,42,54,0.65)" }}
    >
      {props.value}
    </span>
  );
}

function Th(props: { children: React.ReactNode }) {
  return (
    <th
      className="px-3 py-3 text-[12px] font-semibold"
      style={{ color: "#A8B0BD" }}
    >
      {props.children}
    </th>
  );
}

function Td(props: { children: React.ReactNode }) {
  return (
    <td
      className="px-3 py-3 align-top text-[12px]"
      style={{ color: "#A8B0BD" }}
    >
      {props.children}
    </td>
  );
}
