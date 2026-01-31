import Link from "next/link";
import GallerySlider from "./GallerySlider";
import Reveal from "./Reveal";

export default function GallerySection() {
  return (
    <section className="w-full" style={{ background: "#11151C" }}>
      <div className="mx-auto max-w-6xl px-8 py-16">
        <div className="mb-8">
          <Reveal delayMs={0}>
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                background: "rgba(13,16,20,0.70)",
                border: "1px solid #232A36",
                color: "#A8B0BD",
              }}
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: "#D4AF37" }}
              />
              <span className="text-[12px] font-semibold">Galerie</span>
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <h2
              className="mt-6 font-extrabold tracking-tight"
              style={{
                color: "#F5F7FA",
                fontSize: "clamp(28px, 2.8vw, 42px)",
              }}
            >
              SÉANCE EN{" "}
              <span
                className="titleOutline"
                style={{ fontStyle: "italic", letterSpacing: "0.18em" }}
              >
                IMAGE
              </span>
              .
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          <Reveal delayMs={220}>
            <GallerySlider />
          </Reveal>

          <Reveal delayMs={360}>
            <div
              className="rounded-[16px] p-6"
              style={{
                background: "#0D1014",
                border: "1px solid #232A36",
                boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
              }}
            >
              <div
                className="text-[18px] font-semibold"
                style={{ color: "#F5F7FA" }}
              >
                Une méthode claire
              </div>

              <div
                className="mt-3 text-[13px] leading-relaxed"
                style={{ color: "#A8B0BD" }}
              >
                On travail propre : technique, cardio, explosivité. Tout est
                adapté à ton niveau et à ton objectif.
              </div>

              <div className="mt-5 space-y-3">
                {[
                  "Séances sur-mesure",
                  "Prépa physique orientée perf",
                  "Suivi + ajustement",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-3">
                    <div
                      className="h-8 w-8 rounded-full flex items-center justify-center text-[14px] font-extrabold"
                      style={{ background: "#D4AF37", color: "#11151C" }}
                    >
                      ✓
                    </div>
                    <div className="text-[13px]" style={{ color: "#A8B0BD" }}>
                      {t}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/reservation"
                className="mt-6 inline-flex items-center justify-center rounded-full px-8 py-3 text-[14px] font-semibold transition hover:bg-[#E6C76A]"
                style={{
                  background: "#D4AF37",
                  color: "#11151C",
                  boxShadow: "0 10px 30px rgba(212,175,55,0.18)",
                }}
              >
                Réserver
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
