"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import Grappling from "../../../public/images/grappling.png";
import KickBoxing from "../../../public/images/kickboxing.png";
import Mma from "../../../public/images/mma.png";
import perte_de_poids from "../../../public/images/perte_de_poids.png";
import renforcement from "../../../public/images/renforcement.png";
import self_defence from "../../../public/images/self_defence.png";

type OfferKey =
  | "Grappling"
  | "MMA"
  | "Kickboxing"
  | "Renforcement"
  | "Self-défence"
  | "Perte de poids";

function toSlug(k: OfferKey) {
  if (k === "Self-défence") return "self-defence";
  if (k === "Perte de poids") return "perte-de-poids";
  if (k === "Kickboxing") return "kickboxing";
  return k.toLowerCase(); // mma, grappling, renforcement
}

export default function OffresPage() {
  const offers = useMemo(
    () =>
      [
        {
          key: "MMA" as const,
          img: Mma,
          tagline: "Polyvalence & combat complet",
          desc: "Striking + lutte + sol. Progression structurée : technique, timing, transitions, et condition physique adaptée.",
          bullets: ["Technique", "Transitions", "Condition"],
        },
        {
          key: "Kickboxing" as const,
          img: KickBoxing,
          tagline: "Striking propre & explosif",
          desc: "Boxe pieds-poings : précision, enchaînements, déplacements, puissance utile. Travail pad + intensité.",
          bullets: ["Précision", "Explosivité", "Cardio"],
        },
        {
          key: "Grappling" as const,
          img: Grappling,
          tagline: "Contrôle, sol, soumission",
          desc: "Clés, contrôles, sorties, défense, pressure. Tu deviens difficile à tenir et encore plus difficile à finir.",
          bullets: ["Contrôle", "Défense", "Soumissions"],
        },
        {
          key: "Renforcement" as const,
          img: renforcement,
          tagline: "Force utile & prévention",
          desc: "Renfo intelligent : posture, gainage, chaînes musculaires, explosivité. Objectif : performer sans te cramer.",
          bullets: ["Force", "Mobilité", "Prévention"],
        },
        {
          key: "Self-défence" as const,
          img: self_defence,
          tagline: "Efficace, simple, réaliste",
          desc: "Scénarios concrets : distance, gestion du stress, sorties, frappes simples, contrôle. Priorité : sécurité.",
          bullets: ["Réflexes", "Distance", "Scénarios"],
        },
        {
          key: "Perte de poids" as const,
          img: perte_de_poids,
          tagline: "Transformation durable",
          desc: "Plan d’entraînement + intensité progressive. Tu construis un physique solide, avec des repères clairs et tenables.",
          bullets: ["Progressif", "Intensité", "Suivi"],
        },
      ] as const,
    [],
  );

  return (
    <section
      className="w-full"
      style={{ background: "#11151C", minHeight: "calc(100vh - 86px)" }}
    >
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
              OFFRES • DISCIPLINES
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
            Offres
          </h1>

          <p
            className="mt-4 max-w-[760px] text-[15px] md:text-[16px] leading-relaxed"
            style={{ color: "#A8B0BD" }}
          >
            Choisis une discipline. Je m’occupe du reste : structure, intensité,
            progression.
          </p>

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
                background: "transparent",
                color: "#E6C76A",
                border: "1px solid rgba(212,175,55,0.45)",
              }}
            >
              Une question ?
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          {offers.map((o) => {
            const slug = toSlug(o.key);
            return (
              <article
                key={o.key}
                className="offerCard relative overflow-hidden"
                style={{
                  borderRadius: 22,
                  background: "#0D1014",
                  padding: 14,
                  boxShadow: "0 30px 120px rgba(0,0,0,0.45)",
                }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{
                    borderRadius: 18,
                    background: "#11151C",
                    minHeight: 340,
                  }}
                >
                  <Image
                    src={o.img}
                    alt={o.key}
                    fill
                    className="offerImg object-cover"
                    draggable={false}
                  />
                  <div className="offerOverlay" />
                  <div className="offerGlow" />

                  <div className="relative p-6 flex flex-col h-full">
                    <div
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 w-fit"
                      style={{
                        background: "rgba(13,16,20,0.72)",
                        border: "1px solid rgba(35,42,54,0.9)",
                        color: "#A8B0BD",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ background: "#D4AF37" }}
                      />
                      <span className="text-[12px] font-semibold tracking-wide">
                        {o.tagline}
                      </span>
                    </div>

                    <h3
                      className="mt-4 font-extrabold leading-none"
                      style={{
                        color: "#F5F7FA",
                        fontSize: "clamp(22px, 2.2vw, 30px)",
                        letterSpacing: "-0.02em",
                        textTransform: "uppercase",
                        textShadow: "0 12px 40px rgba(0,0,0,0.65)",
                      }}
                    >
                      {o.key}
                    </h3>

                    <p
                      className="mt-3 text-[13px] leading-relaxed"
                      style={{ color: "#A8B0BD" }}
                    >
                      {o.desc}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {o.bullets.map((b) => (
                        <span
                          key={b}
                          className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold"
                          style={{
                            background: "rgba(13,16,20,0.72)",
                            border: "1px solid rgba(35,42,54,0.85)",
                            color: "#E6C76A",
                          }}
                        >
                          {b}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-6 flex items-center gap-3">
                      {/* ✅ param discipline */}
                      <Link
                        href={`/reservations?discipline=${slug}`}
                        className="inline-flex items-center justify-center rounded-full px-8 py-2 text-[13px] font-semibold transition offerBtn"
                        style={{
                          background: "#D4AF37",
                          color: "#11151C",
                          boxShadow: "0 10px 30px rgba(212,175,55,0.18)",
                        }}
                      >
                        Réserver →
                      </Link>

                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-full px-8 py-2 text-[13px] font-semibold transition"
                        style={{
                          background: "transparent",
                          color: "#A8B0BD",
                          border: "1px solid rgba(35,42,54,1)",
                        }}
                      >
                        En savoir +
                      </Link>
                    </div>
                  </div>
                </div>

                <style jsx>{`
                  .offerImg {
                    transform: scale(1.02);
                    transition: transform 520ms
                      cubic-bezier(0.22, 0.61, 0.36, 1);
                  }
                  .offerOverlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                      180deg,
                      rgba(0, 0, 0, 0.55) 0%,
                      rgba(0, 0, 0, 0.78) 55%,
                      rgba(0, 0, 0, 0.88) 100%
                    );
                    opacity: 0.9;
                    transition: opacity 260ms ease;
                  }
                  .offerGlow {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(
                      900px 520px at 30% 35%,
                      rgba(212, 175, 55, 0.18) 0%,
                      rgba(0, 0, 0, 0) 55%
                    );
                    opacity: 0;
                    transition: opacity 300ms ease;
                  }
                  .offerCard:hover .offerImg {
                    transform: scale(1.08);
                  }
                  .offerCard:hover .offerOverlay {
                    opacity: 0.68;
                  }
                  .offerCard:hover .offerGlow {
                    opacity: 1;
                  }
                  .offerBtn:hover {
                    filter: brightness(1.04);
                  }
                `}</style>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
