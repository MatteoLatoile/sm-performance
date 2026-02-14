import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité • SM Performance",
  description:
    "Politique de confidentialité du site SM Performance : données collectées, finalités, base légale, durée de conservation, droits RGPD.",
};

export default function PolitiqueConfidentialitePage() {
  const BG = "#11151C";
  const CARD = "#0D1014";
  const BORDER = "#232A36";
  const TEXT = "#F5F7FA";
  const MUTED = "#A8B0BD";
  const SOFT = "#788291";
  const GOLD = "#D4AF37";

  return (
    <main className="min-h-screen px-6 py-14" style={{ background: BG }}>
      <div className="mx-auto max-w-4xl">
        {/* Header */}
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
              <span style={{ fontStyle: "italic" }}>POLITIQUE</span>{" "}
              <span
                style={{
                  fontStyle: "italic",
                  letterSpacing: "0.14em",
                  color: GOLD,
                }}
              >
                CONFIDENTIALITÉ
              </span>
            </h1>
          </div>

          <div className="flex gap-3">
            <Link
              href="/"
              className="px-6 py-3 rounded-full font-semibold"
              style={{
                background: GOLD,
                color: "#11151C",
                boxShadow: "0 10px 30px rgba(212,175,55,0.18)",
              }}
            >
              Retour accueil
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
              Réserver
            </Link>
          </div>
        </div>

        {/* Content */}
        <section
          className="mt-8 rounded-2xl border p-6 md:p-8"
          style={{ background: CARD, borderColor: BORDER }}
        >
          {/* Notice */}

          <div className="mt-8 space-y-8">
            <Block
              title="1) Responsable du traitement"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.75 }}>
                Le responsable du traitement est :{" "}
                <b style={{ color: TEXT }}>SM Performance (à compléter)</b>.
                <br />
                Contact :{" "}
                <b style={{ color: TEXT }}>contact@sm-performance.fr</b> (à
                confirmer).
                <br />
                Adresse : <b style={{ color: TEXT }}>(à compléter)</b>.
              </p>
            </Block>

            <Block
              title="2) Données collectées"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.75 }}>
                Selon votre utilisation du site, nous pouvons collecter :
              </p>
              <ul
                className="mt-3 list-disc pl-5"
                style={{ color: MUTED, lineHeight: 1.8 }}
              >
                <li>
                  <b style={{ color: TEXT }}>Données d’identification</b> :
                  prénom, nom, email, téléphone.
                </li>
                <li>
                  <b style={{ color: TEXT }}>Données de réservation</b> :
                  discipline, date, horaire, note optionnelle.
                </li>
                <li>
                  <b style={{ color: TEXT }}>Données de paiement</b> : traitées
                  par Stripe (nous ne stockons pas vos données bancaires).
                </li>
                <li>
                  <b style={{ color: TEXT }}>Données techniques</b> : logs, IP,
                  informations de session/cookies nécessaires au fonctionnement
                  (selon configuration).
                </li>
              </ul>
            </Block>

            <Block
              title="3) Finalités"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.75 }}>
                Vos données sont utilisées pour :
              </p>
              <ul
                className="mt-3 list-disc pl-5"
                style={{ color: MUTED, lineHeight: 1.8 }}
              >
                <li>
                  Gérer les réservations (création, confirmation, annulation,
                  suivi).
                </li>
                <li>
                  Communiquer avec vous (confirmation, informations pratiques,
                  support).
                </li>
                <li>Traiter le paiement et la facturation (via Stripe).</li>
                <li>
                  Assurer la sécurité et le bon fonctionnement du site
                  (anti-fraude, logs techniques).
                </li>
              </ul>
            </Block>

            <Block
              title="4) Base légale (RGPD)"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <ul
                className="list-disc pl-5"
                style={{ color: MUTED, lineHeight: 1.8 }}
              >
                <li>
                  <b style={{ color: TEXT }}>Exécution d’un contrat</b> :
                  gestion de votre réservation et du service.
                </li>
                <li>
                  <b style={{ color: TEXT }}>Obligation légale</b> : obligations
                  comptables/facturation (si applicable).
                </li>
                <li>
                  <b style={{ color: TEXT }}>Intérêt légitime</b> : sécurité du
                  site, prévention de la fraude.
                </li>
                <li>
                  <b style={{ color: TEXT }}>Consentement</b> : uniquement si
                  vous activez des cookies non essentiels (analytics/marketing).
                </li>
              </ul>
            </Block>

            <Block
              title="5) Destinataires & sous-traitants"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.75 }}>
                Les données peuvent être traitées par :
              </p>
              <ul
                className="mt-3 list-disc pl-5"
                style={{ color: MUTED, lineHeight: 1.8 }}
              >
                <li>
                  <b style={{ color: TEXT }}>SM Performance</b> (personnes
                  habilitées).
                </li>
                <li>
                  <b style={{ color: TEXT }}>Stripe</b> : paiement en ligne,
                  gestion des transactions.
                </li>
                <li>
                  <b style={{ color: TEXT }}>Supabase</b> : base de données et
                  authentification.
                </li>
                <li>
                  <b style={{ color: TEXT }}>Hébergeur</b> : (à compléter :
                  Vercel/OVH/…).
                </li>
              </ul>
              <p className="mt-3" style={{ color: SOFT, lineHeight: 1.75 }}>
                Ces prestataires agissent en tant que sous-traitants et
                uniquement sur nos instructions.
              </p>
            </Block>

            <Block
              title="6) Durées de conservation"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <ul
                className="list-disc pl-5"
                style={{ color: MUTED, lineHeight: 1.8 }}
              >
                <li>
                  <b style={{ color: TEXT }}>Réservations</b> : (à compléter)
                  ex. 3 ans après la dernière interaction.
                </li>
                <li>
                  <b style={{ color: TEXT }}>
                    Facturation / obligations légales
                  </b>{" "}
                  : (à compléter) ex. 10 ans (selon règles).
                </li>
                <li>
                  <b style={{ color: TEXT }}>Logs techniques</b> : (à compléter)
                  ex. 6 à 12 mois.
                </li>
              </ul>
              <p className="mt-3" style={{ color: SOFT, lineHeight: 1.75 }}>
                Ajuste selon ton statut et tes obligations légales réelles.
              </p>
            </Block>

            <Block
              title="7) Sécurité"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.75 }}>
                Nous mettons en œuvre des mesures techniques et
                organisationnelles raisonnables pour protéger vos données
                (contrôles d’accès, chiffrement en transit, clés privées côté
                serveur, etc.).
              </p>
              <p className="mt-3" style={{ color: SOFT, lineHeight: 1.75 }}>
                Aucun système n’est invulnérable : si ça casse, on traite ça
                vite et proprement.
              </p>
            </Block>

            <Block
              title="8) Vos droits (RGPD)"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.75 }}>
                Vous disposez des droits suivants : accès, rectification,
                effacement, opposition, limitation, portabilité (selon
                conditions).
              </p>
              <p className="mt-3" style={{ color: MUTED, lineHeight: 1.75 }}>
                Pour exercer vos droits :{" "}
                <b style={{ color: TEXT }}>contact@sm-performance.fr</b> (à
                confirmer).
              </p>
              <p className="mt-3" style={{ color: SOFT, lineHeight: 1.75 }}>
                Vous pouvez aussi déposer une réclamation auprès de la CNIL si
                nécessaire.
              </p>
            </Block>

            <Block title="9) Cookies" muted={MUTED} text={TEXT} border={BORDER}>
              <p style={{ color: MUTED, lineHeight: 1.75 }}>
                Le site peut utiliser des cookies nécessaires au fonctionnement
                (auth/session) et, selon votre configuration, des cookies de
                mesure d’audience.
              </p>
              <p className="mt-3" style={{ color: SOFT, lineHeight: 1.75 }}>
                Si tu as un analytics, liste : nom du cookie, finalité, durée,
                et méthode d’opposition.
              </p>
            </Block>

            <Block
              title="10) Transferts hors UE"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.75 }}>
                Certains prestataires (ex : paiement, hébergement) peuvent
                traiter des données hors UE. Dans ce cas, des garanties
                appropriées sont mises en place (ex : clauses contractuelles
                types).
              </p>
            </Block>

            <Block
              title="11) Mise à jour de la politique"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.75 }}>
                Cette politique peut être mise à jour. La date de mise à jour
                figure en bas de page.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/mentions-legales"
                  className="px-6 py-3 rounded-full font-semibold"
                  style={{
                    background: GOLD,
                    color: "#11151C",
                    boxShadow: "0 10px 30px rgba(212,175,55,0.18)",
                  }}
                >
                  Mentions légales
                </Link>
                <Link
                  href="/user"
                  className="px-6 py-3 rounded-full font-semibold border"
                  style={{
                    borderColor: BORDER,
                    color: TEXT,
                    background: "rgba(17,21,28,0.55)",
                  }}
                >
                  Mon espace
                </Link>
              </div>
            </Block>
          </div>
        </section>

        <div className="mt-8 text-[12px]" style={{ color: SOFT }}>
          Dernière mise à jour :{" "}
          {new Intl.DateTimeFormat("fr-FR").format(new Date())}
        </div>
      </div>
    </main>
  );
}

function Block(props: {
  title: string;
  children: React.ReactNode;
  muted: string;
  text: string;
  border: string;
}) {
  const { title, children, muted, text, border } = props;

  return (
    <div
      className="rounded-2xl border p-5 md:p-6"
      style={{ background: "#11151C", borderColor: border }}
    >
      <div className="text-[12px] font-semibold" style={{ color: muted }}>
        SECTION
      </div>
      <h2
        className="mt-2 text-[18px] md:text-[20px] font-extrabold"
        style={{ color: text }}
      >
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
