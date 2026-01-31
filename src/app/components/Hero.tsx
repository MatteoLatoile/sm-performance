import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#11151C" }}
    >
      {/* Background image (Ken Burns) */}
      <img
        src="/images/bg-hero.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover heroBg"
        draggable={false}
      />

      {/* Overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #0B0D10EB 0%, #0B0D10C7 42%, #0B0D1040 78%, #0B0D1026 100%)",
        }}
      />
      <div
        className="absolute inset-0 heroGlowPulse"
        style={{
          background:
            "radial-gradient(1200px 600px at 30% 40%, #D4AF371A 0%, #00000000 60%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 60% 10%, #00000000 0%, #0000008C 100%)",
        }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-8 py-20 md:py-24">
        {/* Badge */}
        <div
          className="heroIn inline-flex items-center gap-2 rounded-full px-4 py-2"
          style={{
            animationDelay: "120ms",
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
            COACHING PRIVÉ • BOXE • MMA
          </span>
        </div>

        <h1
          className="heroIn mt-6 font-extrabold leading-[0.95]"
          style={{
            animationDelay: "240ms",
            color: "#F5F7FA",
            fontSize: "clamp(40px, 5.2vw, 72px)",
            letterSpacing: "-0.02em",
          }}
        >
          SM PERFORMANCE
        </h1>

        <p
          className="heroIn mt-3 text-[18px] md:text-[20px] font-medium"
          style={{ animationDelay: "360ms" }}
        >
          <span style={{ color: "#A8B0BD" }}>
            Coaching sports de combat &amp;{" "}
          </span>
          <span className="heroUnderline" style={{ color: "#A8B0BD" }}>
            performance
          </span>
        </p>

        {/* "Plus" fixe + volet sur le 2e mot */}
        <h2
          className="heroIn mt-8 font-semibold"
          style={{
            animationDelay: "520ms",
            color: "#F5F7FA",
            fontSize: "clamp(30px, 3.2vw, 48px)",
            lineHeight: 1.1,
          }}
        >
          <span>Plus </span>
          <span
            className="heroFlipWrap"
            aria-label="Plus confiant, plus fort, plus performant"
          >
            <span className="heroFlipTrack">
              <span className="heroFlipWord">Confiant.</span>
              <span className="heroFlipWord">Fort.</span>
              <span className="heroFlipWord">Performant.</span>
              <span className="heroFlipWord">Confiant.</span>
            </span>
          </span>
        </h2>

        <p
          className="heroIn mt-4 max-w-[520px] text-[15px] md:text-[16px] leading-relaxed"
          style={{ animationDelay: "640ms", color: "#A8B0BD" }}
        >
          Séances sur-mesure. Suivi sérieux. Objectifs mesurables.
          <br />
          Réservation en 2 clics.
        </p>

        {/* CTAs */}
        <div
          className="heroIn mt-10 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "760ms" }}
        >
          <Link
            href="/reservation"
            className="heroCtaShimmer inline-flex items-center justify-center rounded-full px-10 py-3 text-[15px] font-semibold transition"
            style={{
              background: "#D4AF37",
              color: "#11151C",
              boxShadow: "0 10px 30px #D4AF372E",
            }}
          >
            Réserver
          </Link>

          <Link
            href="#offres"
            className="inline-flex items-center justify-center rounded-full px-10 py-3 text-[15px] font-semibold transition"
            style={{
              background: "#00000000",
              color: "#D4AF37",
              border: "2px solid #D4AF37",
            }}
          >
            Voir les offres
          </Link>
        </div>

        {/* Chips */}
        <div className="mt-10 flex flex-wrap gap-3">
          {["Bilan inclus", "Coach certifié", "Confirmation immédiate"].map(
            (t, i) => (
              <div
                key={t}
                className="heroIn heroChipFloat inline-flex items-center gap-2 rounded-full px-4 py-2"
                style={{
                  animationDelay: `${900 + i * 120}ms`,
                  background: "#0D1014A6",
                  border: "1px solid #232A36",
                  color: "#A8B0BD",
                }}
              >
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: "#D4AF37" }}
                />
                <span className="text-[12px] font-semibold">{t}</span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
