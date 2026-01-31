import Reveal from "./Reveal";

export default function HowItWorksSection() {
  const steps = [
    {
      n: "1",
      title: "Tu réserves ton créneau.",
      desc: "Choisis ta séance au moment qui te convient selon les disponibilités.",
      sub: "Confirmation immédiate.",
    },
    {
      n: "2",
      title: "Tu choisis ta discipline.",
      desc: "Boxe, MMA, grappling...\nOn adapte à ton niveau et tes objectifs.",
      sub: "Plan clair dès le départ.",
    },
    {
      n: "3",
      title: "Tu démarres fort.",
      desc: "On bosse technique, cardio, explosivité.\nSuivi + ajustements.",
      sub: "Résultats mesurables.",
    },
  ];

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
              <span className="text-[12px] font-semibold">Process</span>
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
              COMMENT ÇA{" "}
              <span
                className="titleOutline"
                style={{ fontStyle: "italic", letterSpacing: "0.18em" }}
              >
                FONCTIONNE
              </span>{" "}
              ?
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {steps.map((s, i) => (
            <Reveal key={s.n} delayMs={220 + i * 140}>
              <div className="relative">
                <div
                  className="rounded-[16px] p-6 h-full"
                  style={{
                    background: "#0D1014",
                    border: "1px solid #232A36",
                    boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-full flex items-center justify-center text-[14px] font-extrabold"
                      style={{ background: "#D4AF37", color: "#11151C" }}
                    >
                      {s.n}
                    </div>
                    <div
                      className="text-[16px] font-semibold"
                      style={{ color: "#F5F7FA" }}
                    >
                      {s.title}
                    </div>
                  </div>

                  <div
                    className="mt-4 text-[13px] leading-relaxed whitespace-pre-line"
                    style={{ color: "#A8B0BD" }}
                  >
                    {s.desc}
                  </div>

                  <div
                    className="mt-3 text-[13px] font-semibold"
                    style={{ color: "#A8B0BD" }}
                  >
                    {s.sub}
                  </div>
                </div>

                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 items-center justify-center">
                    <div
                      className="h-10 w-10 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(13,16,20,0.75)",
                        border: "1px solid #232A36",
                        color: "#A8B0BD",
                      }}
                    >
                      ›
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
