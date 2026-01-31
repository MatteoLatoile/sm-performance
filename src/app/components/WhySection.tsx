import Reveal from "./Reveal";

export default function WhySection() {
  const cards = [
    {
      title: "Sur-mesure",
      desc: "Objectifs, niveau, contraintes...\nPlan adapté dès la première séance.",
    },
    {
      title: "Suivi sérieux",
      desc: "Progression cadrée.\nAjustements continus selon tes résultats.",
    },
    {
      title: "Résultats",
      desc: "Technique, cardio, explosivité.\nDu concret, pas du blabla.",
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
              <span className="text-[12px] font-semibold">Méthodes</span>
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
              POURQUOI{" "}
              <span
                className="titleOutline"
                style={{ fontStyle: "italic", letterSpacing: "0.18em" }}
              >
                SM PERFORMANCE
              </span>{" "}
              ?
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.title} delayMs={200 + i * 120}>
              <div
                className="rounded-[16px] p-6"
                style={{
                  background: "#0D1014",
                  border: "1px solid #232A36",
                  boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="h-9 w-9 rounded-full flex items-center justify-center"
                    style={{
                      background: "#D4AF37",
                      color: "#11151C",
                      fontWeight: 800,
                    }}
                  >
                    ✓
                  </div>

                  <div>
                    <div
                      className="text-[16px] font-semibold"
                      style={{ color: "#F5F7FA" }}
                    >
                      {c.title}
                    </div>
                    <div
                      className="mt-2 text-[13px] leading-relaxed whitespace-pre-line"
                      style={{ color: "#A8B0BD" }}
                    >
                      {c.desc}
                    </div>
                  </div>
                </div>

                <div
                  className="mt-6 h-[1px] w-full"
                  style={{ background: "#232A36" }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
