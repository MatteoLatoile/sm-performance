import Link from "next/link";

export const dynamic = "force-dynamic";

export default function CancelPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <div className="rounded-2xl border border-[#232A36] bg-[#0D1014] p-6">
        <h1 className="text-2xl font-extrabold text-white">Paiement annulé</h1>
        <p className="mt-2 text-[#A8B0BD]">
          Aucun paiement n’a été effectué. Tu peux relancer une réservation
          quand tu veux.
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
      </div>
    </main>
  );
}
