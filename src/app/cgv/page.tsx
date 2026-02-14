import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente • SM Performance",
  description:
    "CGV SM Performance : réservation de séances, paiement, annulation, report, remboursement, responsabilité, droit applicable.",
};

export default function CGVPage() {
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
              <span style={{ fontStyle: "italic" }}>CGV</span>{" "}
              <span
                style={{
                  fontStyle: "italic",
                  letterSpacing: "0.14em",
                  color: GOLD,
                }}
              >
                CONDITIONS
              </span>
            </h1>
            <p className="mt-2" style={{ color: MUTED, maxWidth: 820 }}>
              Les présentes Conditions Générales de Vente régissent la
              réservation et l’achat de séances proposées sur SM Performance.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/reservations"
              className="px-6 py-3 rounded-full font-semibold"
              style={{
                background: GOLD,
                color: "#11151C",
                boxShadow: "0 10px 30px rgba(212,175,55,0.18)",
              }}
            >
              Réserver
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

        {/* Content */}
        <section
          className="mt-8 rounded-2xl border p-6 md:p-8"
          style={{ background: CARD, borderColor: BORDER }}
        >
          <div className="space-y-8">
            <Block
              title="1) Identité du vendeur"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.8 }}>
                Les informations d’identification (éditeur, coordonnées,
                hébergement) sont disponibles sur la page{" "}
                <Link
                  href="/mentions-legales"
                  style={{ color: GOLD, fontWeight: 800 }}
                >
                  Mentions légales
                </Link>
                .
              </p>
              <p className="mt-3" style={{ color: MUTED, lineHeight: 1.8 }}>
                Contact :{" "}
                <b style={{ color: TEXT }}>contact@sm-performance.fr</b>
              </p>
            </Block>

            <Block
              title="2) Objet et champ d’application"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.8 }}>
                Les présentes CGV définissent les conditions de réservation et
                d’achat de séances (sport/coaching) via le site. Toute commande
                implique l’acceptation sans réserve des CGV.
              </p>
            </Block>

            <Block
              title="3) Services"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.8 }}>
                SM Performance propose des séances réservables en ligne
                (discipline, date et créneau horaire). Les caractéristiques
                essentielles sont indiquées lors du parcours de réservation.
              </p>
            </Block>

            <Block title="4) Prix" muted={MUTED} text={TEXT} border={BORDER}>
              <p style={{ color: MUTED, lineHeight: 1.8 }}>
                Les prix sont indiqués en euros (€), toutes taxes comprises
                (sauf mention contraire), au moment de la réservation. Le prix
                applicable est celui affiché au moment du paiement.
              </p>
            </Block>

            <Block
              title="5) Réservation et commande"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.8 }}>
                La réservation s’effectue via le parcours en ligne : choix de la
                discipline, du créneau, puis saisie des informations
                nécessaires. Une fois le paiement validé, la réservation est
                confirmée.
              </p>
              <p className="mt-3" style={{ color: SOFT, lineHeight: 1.8 }}>
                En cas d’indisponibilité d’un créneau (réservation simultanée),
                la commande pourra être refusée.
              </p>
            </Block>

            <Block
              title="6) Paiement"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.8 }}>
                Le paiement est effectué en ligne via un prestataire de paiement
                sécurisé (ex : Stripe). Les données bancaires ne sont pas
                stockées par SM Performance.
              </p>
            </Block>

            <Block
              title="7) Confirmation"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.8 }}>
                Une page de confirmation s’affiche après paiement. Une
                facture/confirmation peut être mise à disposition dans l’espace
                utilisateur, le cas échéant.
              </p>
            </Block>

            <Block
              title="8) Annulation, report et non-présentation"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.8 }}>
                Les conditions suivantes s’appliquent, sauf accord écrit
                contraire :
              </p>
              <ul
                className="mt-3 list-disc pl-5"
                style={{ color: MUTED, lineHeight: 1.9 }}
              >
                <li>
                  <b style={{ color: TEXT }}>
                    Annulation / report par le client
                  </b>{" "}
                  : selon les conditions indiquées au moment de la réservation
                  ou communiquées par SM Performance.
                </li>
                <li>
                  <b style={{ color: TEXT }}>Non-présentation</b> : en cas
                  d’absence au rendez-vous, la séance est réputée due et ne
                  donne pas lieu à remboursement.
                </li>
                <li>
                  <b style={{ color: TEXT }}>Retard</b> : un retard peut réduire
                  la durée effective de la séance sans réduction de prix ;
                  au-delà d’un certain seuil, la séance peut être annulée.
                </li>
              </ul>
            </Block>

            <Block
              title="9) Annulation par SM Performance"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.8 }}>
                SM Performance peut annuler ou reporter une séance (motif
                légitime : indisponibilité, incident, sécurité, force majeure).
                Dans ce cas, une solution de report ou un remboursement pourra
                être proposé selon la situation.
              </p>
            </Block>

            <Block
              title="10) Droit de rétractation"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.8 }}>
                Conformément au droit applicable, le droit de rétractation peut
                ne pas s’appliquer aux prestations de services liées à des
                activités de loisirs fournies à une date ou période déterminée.
              </p>
            </Block>

            <Block
              title="11) Conditions de participation & santé"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.8 }}>
                Le client déclare être apte à pratiquer une activité sportive.
                Il lui appartient de consulter un professionnel de santé en cas
                de doute. SM Performance peut refuser une séance si la sécurité
                du client est en jeu.
              </p>
            </Block>

            <Block
              title="12) Responsabilité"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.8 }}>
                SM Performance est tenue à une obligation de moyens dans
                l’exécution des prestations. La responsabilité ne saurait être
                engagée en cas d’utilisation non conforme des services, de
                fausse déclaration, ou de non-respect des consignes de sécurité.
              </p>
            </Block>

            <Block
              title="13) Données personnelles"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.8 }}>
                Les données personnelles sont traitées conformément à la{" "}
                <Link
                  href="/politique-confidentialite"
                  style={{ color: GOLD, fontWeight: 800 }}
                >
                  Politique de confidentialité
                </Link>
                .
              </p>
            </Block>

            <Block
              title="14) Propriété intellectuelle"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.8 }}>
                Le contenu du site (textes, images, logos, design) est protégé.
                Toute reproduction sans autorisation est interdite.
              </p>
            </Block>

            <Block
              title="15) Force majeure"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.8 }}>
                Aucune des parties ne pourra être tenue responsable en cas
                d’inexécution due à un événement de force majeure au sens du
                droit français.
              </p>
            </Block>

            <Block
              title="16) Litiges, droit applicable"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.8 }}>
                Les présentes CGV sont soumises au droit français. En cas de
                litige, les parties rechercheront une solution amiable. À
                défaut, les tribunaux compétents seront saisis conformément aux
                règles de droit commun.
              </p>
            </Block>

            <Block
              title="17) Contact"
              muted={MUTED}
              text={TEXT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.8 }}>
                Pour toute question :{" "}
                <b style={{ color: TEXT }}>contact@sm-performance.fr</b>
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/mentions-legales"
                  className="px-6 py-3 rounded-full font-semibold border"
                  style={{
                    borderColor: BORDER,
                    color: TEXT,
                    background: "rgba(17,21,28,0.55)",
                  }}
                >
                  Mentions légales
                </Link>
                <Link
                  href="/politique-confidentialite"
                  className="px-6 py-3 rounded-full font-semibold border"
                  style={{
                    borderColor: BORDER,
                    color: TEXT,
                    background: "rgba(17,21,28,0.55)",
                  }}
                >
                  Politique de confidentialité
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
