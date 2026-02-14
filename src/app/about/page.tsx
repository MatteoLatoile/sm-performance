"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <section
      className="w-full"
      style={{
        background: "#11151C",
        minHeight: "calc(100vh - 86px)",
      }}
    >
      {/* Top band */}
      <div
        style={{
          background: "linear-gradient(180deg, #0B0D10 0%, #11151C 100%)",
          borderBottom: "1px solid #232A36",
        }}
      >
        <div className="mx-auto max-w-6xl px-8 py-14">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{
              background: "#0D1014B3",
              border: "1px solid #232A36",
              color: "#A8B0BD",
            }}
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: "#D4AF37" }}
            />
            <span className="text-[12px] font-semibold tracking-wide">
              À PROPOS • SM PERFORMANCE
            </span>
          </div>

          <h1
            className="mt-6 font-extrabold leading-[0.95]"
            style={{
              color: "#F5F7FA",
              fontSize: "clamp(40px, 4.8vw, 64px)",
              letterSpacing: "-0.02em",
            }}
          >
            À propos
          </h1>

          <p
            className="mt-4 max-w-[760px] text-[15px] md:text-[16px] leading-relaxed"
            style={{ color: "#A8B0BD" }}
          >
            Un coaching exigeant, structuré, et pensé pour ceux qui veulent de
            vrais résultats — pas juste transpirer.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <Link
              href="/"
              className="text-[14px] font-semibold transition hover:text-[#F5F7FA]"
              style={{ color: "#A8B0BD" }}
            >
              ← Retour à l’accueil
            </Link>
            <span style={{ color: "#232A36" }}>•</span>
            <Link
              href="/reservations"
              className="text-[14px] font-semibold transition"
              style={{ color: "#E6C76A" }}
            >
              Réserver une séance →
            </Link>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-6xl px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          {/* Main content */}
          <div
            style={{
              background: "#0D1014",
              borderRadius: 22,
              padding: 14,
              boxShadow: "0 30px 120px rgba(0,0,0,0.45)",
            }}
          >
            <div
              style={{
                background: "#11151C",
                borderRadius: 18,
                padding: 22,
              }}
            >
              <div
                className="text-[12px] font-semibold tracking-[0.18em]"
                style={{ color: "#788291" }}
              >
                PARCOURS.
              </div>

              <h2
                className="mt-3 font-extrabold"
                style={{
                  color: "#F5F7FA",
                  fontSize: "clamp(20px, 2.2vw, 28px)",
                  letterSpacing: "-0.02em",
                }}
              >
                Une méthode sérieuse. Des résultats concrets.
              </h2>

              {/* Ton texte optimisé sans changer l’intention */}
              <div
                className="mt-6 space-y-4 text-[14px] md:text-[15px] leading-relaxed"
                style={{ color: "#A8B0BD" }}
              >
                <p>
                  <span style={{ color: "#F5F7FA", fontWeight: 800 }}>
                    Éducateur sportif diplômé
                  </span>
                  , j’accompagne depuis plusieurs années des pratiquants dans
                  les{" "}
                  <span style={{ color: "#F5F7FA", fontWeight: 800 }}>
                    sports de combat
                  </span>
                  , la{" "}
                  <span style={{ color: "#F5F7FA", fontWeight: 800 }}>
                    préparation physique
                  </span>{" "}
                  et la{" "}
                  <span style={{ color: "#F5F7FA", fontWeight: 800 }}>
                    transformation corporelle
                  </span>
                  .
                </p>

                <p>
                  J’ai eu l’honneur d’encadrer des{" "}
                  <span style={{ color: "#F5F7FA", fontWeight: 800 }}>
                    champions de France
                  </span>{" "}
                  et d’accompagner des compétiteurs, du niveau régional au haut
                  niveau, au sein d’un{" "}
                  <span style={{ color: "#F5F7FA", fontWeight: 800 }}>
                    club reconnu
                  </span>
                  . J’interviens également dans des{" "}
                  <span style={{ color: "#F5F7FA", fontWeight: 800 }}>
                    enseignes sportives de référence
                  </span>{" "}
                  et lors de{" "}
                  <span style={{ color: "#F5F7FA", fontWeight: 800 }}>
                    collaborations institutionnelles
                  </span>
                  .
                </p>

                <p>
                  Mon coaching repose sur une méthode{" "}
                  <span style={{ color: "#F5F7FA", fontWeight: 800 }}>
                    exigeante, structurée et personnalisée
                  </span>
                  , pensée pour celles et ceux qui veulent{" "}
                  <span style={{ color: "#F5F7FA", fontWeight: 800 }}>
                    progresser réellement
                  </span>
                  , repousser leurs limites et obtenir des résultats{" "}
                  <span style={{ color: "#F5F7FA", fontWeight: 800 }}>
                    concrets et durables
                  </span>
                  .
                </p>

                <p style={{ color: "#F5F7FA", fontWeight: 800 }}>
                  Un cadre structuré pour progresser efficacement, séance après
                  séance.
                </p>
              </div>

              {/* CTA row */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/reservations"
                  className="inline-flex items-center justify-center rounded-full px-10 py-3 text-[15px] font-semibold transition"
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
                  className="inline-flex items-center justify-center rounded-full px-10 py-3 text-[15px] font-semibold transition"
                  style={{
                    background: "#00000000",
                    color: "#E6C76A",
                    border: "1px solid rgba(212,175,55,0.45)",
                  }}
                >
                  Me contacter
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar cards */}
          <div className="flex flex-col gap-4">
            <MiniCard
              title="Méthode"
              subtitle="Structurée & personnalisée"
              lines={[
                "Bilan + objectifs clairs",
                "Progression mesurable",
                "Technique + condition physique",
              ]}
            />
            <MiniCard
              title="Expérience"
              subtitle="Du régional au haut niveau"
              lines={[
                "Encadrement compétiteurs",
                "Club reconnu",
                "Interventions & collaborations",
              ]}
            />
            <MiniCard
              title="Résultats"
              subtitle="Concrets & durables"
              lines={[
                "Performance & confiance",
                "Condition physique",
                "Transformation corporelle",
              ]}
            />

            <div
              style={{
                background: "#0D1014",
                borderRadius: 22,
                padding: 14,
                boxShadow: "0 30px 120px rgba(0,0,0,0.45)",
              }}
            >
              <div
                style={{
                  background: "#11151C",
                  borderRadius: 18,
                  padding: 18,
                }}
              >
                <div
                  className="text-[12px] font-semibold tracking-[0.18em]"
                  style={{ color: "#788291" }}
                >
                  NEXT STEP
                </div>
                <div
                  className="mt-2 text-[16px] font-extrabold"
                  style={{ color: "#F5F7FA" }}
                >
                  On commence.
                </div>

                <div className="mt-3 text-[12px]" style={{ color: "#A8B0BD" }}>
                  Tu choisis la discipline, le créneau, et on confirme.
                </div>

                <Link
                  href="/reservations"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full px-10 py-3 text-[14px] font-semibold transition"
                  style={{
                    background: "#11151C",
                    color: "#E6C76A",
                    border: "1px solid rgba(212,175,55,0.45)",
                  }}
                >
                  Aller à la réservation →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniCard(props: { title: string; subtitle: string; lines: string[] }) {
  return (
    <div
      style={{
        background: "#0D1014",
        borderRadius: 22,
        padding: 14,
        boxShadow: "0 30px 120px rgba(0,0,0,0.45)",
      }}
    >
      <div style={{ background: "#11151C", borderRadius: 18, padding: 18 }}>
        <div
          className="text-[12px] font-semibold tracking-[0.18em]"
          style={{ color: "#788291" }}
        >
          {props.subtitle.toUpperCase()}
        </div>
        <div
          className="mt-2 text-[18px] font-extrabold"
          style={{ color: "#F5F7FA" }}
        >
          {props.title}
        </div>

        <div className="mt-4 space-y-2">
          {props.lines.map((l) => (
            <div
              key={l}
              className="flex items-start gap-2 text-[12px]"
              style={{ color: "#A8B0BD" }}
            >
              <span
                className="mt-[6px] inline-block h-2 w-2 rounded-full"
                style={{ background: "#D4AF37" }}
              />
              <span>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
