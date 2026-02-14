import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales • SM Performance",
  description:
    "Mentions légales du site SM Performance : éditeur, hébergeur, propriété intellectuelle, données personnelles.",
};

export default function MentionsLegalesPage() {
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
              <span style={{ fontStyle: "italic" }}>MENTIONS</span>{" "}
              <span
                style={{
                  fontStyle: "italic",
                  letterSpacing: "0.14em",
                  color: GOLD,
                }}
              >
                LÉGALES
              </span>
            </h1>
            <p className="mt-2" style={{ color: MUTED, maxWidth: 760 }}>
              Informations légales conformément à la législation française.
            </p>
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

        {/* Content card */}
        <section
          className="mt-8 rounded-2xl border p-6 md:p-8"
          style={{ background: CARD, borderColor: BORDER }}
        >
          {/* Notice */}

          <div className="mt-8 space-y-8">
            <Block
              title="1) Éditeur du site"
              muted={MUTED}
              text={TEXT}
              soft={SOFT}
              border={BORDER}
            >
              <InfoLine
                label="Nom / Raison sociale"
                value="SM Performance"
                muted={MUTED}
                text={TEXT}
              />

              <InfoLine
                label="SIRET"
                value="94363807200018"
                muted={MUTED}
                text={TEXT}
              />
              <InfoLine
                label="Email"
                value="smperformances.coaching@gmail.com"
                muted={MUTED}
                text={TEXT}
              />
              <InfoLine
                label="Téléphone"
                value="+33 6 09 25 85 99"
                muted={MUTED}
                text={TEXT}
              />
            </Block>

            <Block
              title="2) Directeur de la publication"
              muted={MUTED}
              text={TEXT}
              soft={SOFT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.7 }}>
                Directeur de publication :{" "}
                <b style={{ color: TEXT }}>(à compléter)</b>
                <br />
                Contact :{" "}
                <b style={{ color: TEXT }}>contact@sm-performance.fr</b> (à
                confirmer)
              </p>
            </Block>

            <Block
              title="3) Hébergement"
              muted={MUTED}
              text={TEXT}
              soft={SOFT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.7 }}>
                Hébergeur : <b style={{ color: TEXT }}>(VERCEL)</b>
                <br />
                Adresse : <b style={{ color: TEXT }}>(à compléter)</b>
                <br />
                Téléphone : <b style={{ color: TEXT }}>(à compléter)</b>
              </p>
              <p className="mt-3" style={{ color: SOFT, lineHeight: 1.7 }}>
                Exemple : Vercel, OVH, Scaleway, etc. Mets le nom exact +
                adresse légale.
              </p>
            </Block>

            <Block
              title="4) Propriété intellectuelle"
              muted={MUTED}
              text={TEXT}
              soft={SOFT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.7 }}>
                L’ensemble du contenu présent sur le site (textes, images,
                logos, éléments graphiques, code, etc.) est protégé par le droit
                de la propriété intellectuelle. Toute reproduction,
                représentation, modification, publication, adaptation — totale
                ou partielle — est interdite sans autorisation écrite préalable
                de l’éditeur, sauf exceptions prévues par la loi.
              </p>
            </Block>

            <Block
              title="5) Responsabilité"
              muted={MUTED}
              text={TEXT}
              soft={SOFT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.7 }}>
                L’éditeur s’efforce de fournir sur ce site des informations
                aussi précises que possible, mais ne garantit pas l’exactitude,
                la complétude ou l’actualité des informations. L’utilisation du
                site se fait sous la responsabilité de l’utilisateur.
              </p>
              <p className="mt-3" style={{ color: MUTED, lineHeight: 1.7 }}>
                Le site peut contenir des liens vers des sites tiers. L’éditeur
                n’exerce aucun contrôle sur ces sites et ne saurait être tenu
                responsable de leur contenu ou disponibilité.
              </p>
            </Block>

            <Block
              title="6) Données personnelles"
              muted={MUTED}
              text={TEXT}
              soft={SOFT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.7 }}>
                Les données collectées via les formulaires (réservation,
                contact) sont utilisées pour traiter les demandes, gérer les
                réservations, et assurer la communication liée aux services.
              </p>
              <p className="mt-3" style={{ color: MUTED, lineHeight: 1.7 }}>
                Conformément au RGPD, vous pouvez exercer vos droits (accès,
                rectification, suppression, opposition, limitation) en
                contactant :{" "}
                <b style={{ color: TEXT }}>contact@sm-performance.fr</b> (à
                confirmer).
              </p>
              <p className="mt-3" style={{ color: SOFT, lineHeight: 1.7 }}>
                ⚠️ À compléter : durée de conservation, base légale
                (contrat/consentement), DPO si applicable, et mention des
                sous-traitants (ex: Stripe, Supabase).
              </p>
            </Block>

            <Block
              title="7) Cookies"
              muted={MUTED}
              text={TEXT}
              soft={SOFT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.7 }}>
                Le site peut utiliser des cookies ou technologies similaires
                pour assurer son bon fonctionnement, mesurer l’audience, et
                améliorer l’expérience utilisateur.
              </p>
              <p className="mt-3" style={{ color: SOFT, lineHeight: 1.7 }}>
                Si tu utilises un outil analytics (GA, Plausible, etc.), ajoute
                ici la liste des cookies, leur finalité, et la durée de
                conservation.
              </p>
            </Block>

            <Block
              title="8) Paiement en ligne"
              muted={MUTED}
              text={TEXT}
              soft={SOFT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.7 }}>
                Les paiements sont traités via un prestataire de paiement
                sécurisé (ex : Stripe). Les informations bancaires ne sont pas
                stockées par l’éditeur du site.
              </p>
              <p className="mt-3" style={{ color: SOFT, lineHeight: 1.7 }}>
                Ajoute éventuellement les liens vers les conditions Stripe si tu
                veux être carré juridiquement.
              </p>
            </Block>

            <Block
              title="9) Contact"
              muted={MUTED}
              text={TEXT}
              soft={SOFT}
              border={BORDER}
            >
              <p style={{ color: MUTED, lineHeight: 1.7 }}>
                Pour toute question, vous pouvez contacter :{" "}
                <b style={{ color: TEXT }}>contact@sm-performance.fr</b> (à
                confirmer).
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
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

        {/* Footer */}
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
  soft: string;
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

function InfoLine(props: {
  label: string;
  value: string;
  muted: string;
  text: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div className="text-[12px] font-semibold" style={{ color: props.muted }}>
        {props.label}
      </div>
      <div
        className="text-[12px] font-semibold"
        style={{ color: props.text, textAlign: "right", maxWidth: 520 }}
      >
        {props.value}
      </div>
    </div>
  );
}
