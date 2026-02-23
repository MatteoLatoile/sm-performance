import Link from "next/link";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

export default function Footer() {
  return (
    <footer
      className="w-full"
      style={{
        background: "#0B0D10",
        borderTop: "1px solid #232A36",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(212,175,55,0.12) 0%, rgba(0,0,0,0) 60%)",
          borderBottom: "1px solid #1C222B",
        }}
      >
        <div className="mx-auto max-w-6xl px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div
                className="text-[22px] md:text-[26px] font-extrabold tracking-tight"
                style={{ color: "#F5F7FA" }}
              >
                Prêt à passer au niveau au-dessus ?
              </div>
              <div
                className="mt-2 text-[14px] leading-relaxed"
                style={{ color: "#A8B0BD" }}
              >
                Réserve une séance. Objectifs clairs. Progression mesurable.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/reservation"
                className="inline-flex items-center justify-center rounded-full px-10 py-3 text-[15px] font-semibold transition hover:bg-[#E6C76A]"
                style={{
                  background: "#D4AF37",
                  color: "#11151C",
                  boxShadow: "0 10px 30px rgba(212,175,55,0.18)",
                }}
              >
                Réserver
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full px-10 py-3 text-[15px] font-semibold transition hover:text-[#F5F7FA] hover:border-[#D4AF37]/40 hover:bg-[#11151C]"
                style={{
                  background: "transparent",
                  border: "1px solid #232A36",
                  color: "#A8B0BD",
                }}
              >
                Poser une question
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="SM"
                className="h-[40px] w-auto"
                draggable={false}
              />
              <div>
                <div
                  className="text-[14px] font-semibold tracking-wide"
                  style={{ color: "#F5F7FA" }}
                >
                  SM PERFORMANCE
                </div>
                <div className="text-[12px]" style={{ color: "#788291" }}>
                  Coaching • Sports de combat
                </div>
              </div>
            </div>

            <div
              className="mt-4 text-[13px] leading-relaxed"
              style={{ color: "#A8B0BD" }}
            >
              Coaching privé orienté résultats : technique, cardio, explosivité,
              discipline. Réservation simple, suivi sérieux.
            </div>
          </div>

          <div>
            <div
              className="text-[14px] font-semibold"
              style={{ color: "#F5F7FA" }}
            >
              Navigation
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {[
                { label: "Accueil", href: "/" },
                { label: "Réservation", href: "/reservation" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[13px] transition hover:text-[#F5F7FA]"
                  style={{ color: "#A8B0BD" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div
              className="text-[14px] font-semibold"
              style={{ color: "#F5F7FA" }}
            >
              Offres
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {[
                "Coaching privé",
                "Préparation physique",
                "Boxe / MMA",
                "Programme sur-mesure",
              ].map((t) => (
                <div
                  key={t}
                  className="text-[13px]"
                  style={{ color: "#A8B0BD" }}
                >
                  {t}
                </div>
              ))}
            </div>

            <div
              className="mt-6 rounded-[14px] p-4"
              style={{
                background: "#0D1014",
                border: "1px solid #1C222B",
              }}
            >
              <div
                className="text-[12px] font-semibold"
                style={{ color: "#F5F7FA" }}
              >
                Réponse rapide
              </div>
              <div className="mt-2 text-[12px]" style={{ color: "#A8B0BD" }}>
                Contacte-moi et je te réponds sous 24h (ouvré).
              </div>
            </div>
          </div>

          <div>
            <div
              className="text-[14px] font-semibold"
              style={{ color: "#F5F7FA" }}
            >
              Contact
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <div
                className="flex items-center gap-2 text-[13px]"
                style={{ color: "#A8B0BD" }}
              >
                <FiMapPin
                  size={16}
                  style={{ color: "#D4AF37", flex: "0 0 auto" }}
                />
                <span>Saint-Étienne</span>
              </div>

              <a
                className="flex items-center gap-2 text-[13px] transition hover:text-[#F5F7FA]"
                style={{ color: "#A8B0BD" }}
                href="tel:+33609258599"
              >
                <FiPhone
                  size={16}
                  style={{ color: "#D4AF37", flex: "0 0 auto" }}
                />
                <span>06 09 25 85 99</span>
              </a>

              <a
                className="flex items-center gap-2 text-[13px] transition hover:text-[#F5F7FA]"
                style={{ color: "#A8B0BD" }}
                href="mailto:smperformances.coaching@gmail.com"
              >
                <FiMail
                  size={16}
                  style={{ color: "#D4AF37", flex: "0 0 auto" }}
                />
                <span>smperformances.coaching@gmail.com</span>
              </a>
            </div>

            <div className="mt-6">
              <Link
                href="/reservation"
                className="inline-flex items-center justify-center rounded-full px-8 py-3 text-[14px] font-semibold transition hover:border-[#D4AF37]/40 hover:bg-[#11151C]"
                style={{
                  background: "#11151C",
                  border: "1px solid #232A36",
                  color: "#F5F7FA",
                }}
              >
                Voir les créneaux
              </Link>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ borderTop: "1px solid #1C222B" }}
        >
          <div className="text-[12px]" style={{ color: "#788291" }}>
            © {new Date().getFullYear()} SM PERFORMANCE. Tous droits réservés.
          </div>

          <div className="flex flex-wrap gap-6">
            <Link
              href="/mentions-legales"
              className="text-[12px] transition hover:text-[#F5F7FA]"
              style={{ color: "#788291" }}
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-confidentialite"
              className="text-[12px] transition hover:text-[#F5F7FA]"
              style={{ color: "#788291" }}
            >
              Confidentialité
            </Link>
            <Link
              href="/cgv"
              className="text-[12px] transition hover:text-[#F5F7FA]"
              style={{ color: "#788291" }}
            >
              CGV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
