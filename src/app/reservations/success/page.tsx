"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type ConfirmResponse =
  | { ok: true; payload: any; saved?: any }
  | { ok: false; error?: string; status?: string };

export default function SuccessPage() {
  const sp = useSearchParams();
  const sessionId = sp.get("session_id");

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ConfirmResponse | null>(null);

  useEffect(() => {
    let alive = true;

    async function run() {
      if (!sessionId) {
        setLoading(false);
        setData({ ok: false, error: "session_id manquant dans l’URL" });
        return;
      }

      try {
        const res = await fetch(
          `/api/stripe/confirm?session_id=${encodeURIComponent(sessionId)}`,
          { cache: "no-store" },
        );
        const json = (await res.json()) as ConfirmResponse;

        if (!alive) return;
        setData(json);
        setLoading(false);
      } catch (e) {
        if (!alive) return;
        setData({
          ok: false,
          error: e instanceof Error ? e.message : "Erreur inconnue",
        });
        setLoading(false);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, [sessionId]);

  if (!sessionId) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-14">
        <h1 className="text-2xl font-extrabold text-white">
          Session manquante.
        </h1>
        <p className="mt-3 text-[#A8B0BD]">
          L’URL ne contient pas{" "}
          <span className="text-white font-semibold">session_id</span>.
        </p>
        <Link
          href="/reservations"
          className="mt-6 inline-block text-[#E6C76A] font-semibold"
        >
          Retour aux réservations →
        </Link>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-14">
        <div className="rounded-2xl border border-[#232A36] bg-[#0D1014] p-6">
          <h1 className="text-2xl font-extrabold text-white">
            Validation du paiement…
          </h1>
          <p className="mt-2 text-[#A8B0BD]">
            On vérifie la session Stripe et on confirme la réservation.
          </p>
          <p className="mt-4 text-[#788291] text-sm">
            Session: <span className="text-white">{sessionId}</span>
          </p>
        </div>
      </main>
    );
  }

  if (!data || data.ok === false) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-14">
        <div className="rounded-2xl border border-[#232A36] bg-[#0D1014] p-6">
          <h1 className="text-2xl font-extrabold text-white">
            Paiement non confirmé
          </h1>

          <p className="mt-2 text-[#A8B0BD]">
            {data?.status ? (
              <>
                Statut Stripe:{" "}
                <span className="text-white font-semibold">{data.status}</span>
              </>
            ) : (
              <>{data?.error ?? "Impossible de confirmer le paiement."}</>
            )}
          </p>

          <div className="mt-6 flex gap-3">
            <Link
              href="/reservations"
              className="px-6 py-3 rounded-full font-semibold bg-[#D4AF37] text-[#11151C]"
            >
              Revenir aux réservations
            </Link>
            <Link
              href="/"
              className="px-6 py-3 rounded-full font-semibold border border-[#232A36] text-[#F5F7FA]"
            >
              Retour accueil
            </Link>
          </div>

          <p className="mt-4 text-[#788291] text-sm">
            Session: <span className="text-white">{sessionId}</span>
          </p>
        </div>
      </main>
    );
  }

  const payload = data.payload;

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <div className="rounded-2xl border border-[#232A36] bg-[#0D1014] p-6">
        <h1 className="text-2xl font-extrabold text-white">
          ✅ Réservation confirmée
        </h1>
        <p className="mt-2 text-[#A8B0BD]">
          Paiement validé et réservation enregistrée.
        </p>

        <div className="mt-6 rounded-xl bg-[#11151C] p-4 border border-[#232A36]">
          <div className="text-[#A8B0BD] text-sm">Discipline</div>
          <div className="text-white font-semibold">{payload.discipline}</div>

          <div className="mt-3 text-[#A8B0BD] text-sm">Créneau</div>
          <div className="text-white font-semibold">
            {payload.session_date} • {payload.session_time}
          </div>

          <div className="mt-3 text-[#A8B0BD] text-sm">Email</div>
          <div className="text-white font-semibold">{payload.email}</div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`/api/invoice?session_id=${encodeURIComponent(sessionId)}`}
            className="px-6 py-3 rounded-full font-semibold bg-[#D4AF37] text-[#11151C]"
          >
            Télécharger la facture (PDF)
          </a>

          <Link
            href="/"
            className="px-6 py-3 rounded-full font-semibold border border-[#232A36] text-[#F5F7FA]"
          >
            Retour accueil
          </Link>

          <Link
            href="/reservations"
            className="px-6 py-3 rounded-full font-semibold border border-[#232A36] text-[#F5F7FA]"
          >
            Réserver une autre séance
          </Link>
        </div>

        <p className="mt-4 text-[#788291] text-sm">
          Session: <span className="text-white">{sessionId}</span>
        </p>
      </div>
    </main>
  );
}
