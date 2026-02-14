import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="relative flex items-center justify-center px-6 py-20 overflow-hidden"
      style={{
        minHeight: "100vh",
        background: "#11151C",
      }}
    >
      {/* Glows */}
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: 620,
          height: 620,
          top: -220,
          left: -220,
          background: "rgba(212,175,55,1)",
          filter: "blur(80px)",
          opacity: 0.22,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: 620,
          height: 620,
          bottom: -260,
          right: -240,
          background: "rgba(212,175,55,1)",
          filter: "blur(80px)",
          opacity: 0.16,
          pointerEvents: "none",
        }}
      />

      {/* Grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(35,42,54,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(35,42,54,0.25) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          opacity: 0.18,
          pointerEvents: "none",
          maskImage:
            "radial-gradient(700px 500px at 50% 35%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 75%)",
          WebkitMaskImage:
            "radial-gradient(700px 500px at 50% 35%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 75%)",
        }}
      />

      <div className="relative z-10 w-full max-w-4xl">
        <div
          className="relative rounded-[22px] border p-7 shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
          style={{
            background: "#0D1014",
            borderColor: "#232A36",
          }}
        >
          {/* Gold radial highlight */}
          <div
            aria-hidden
            className="absolute -inset-[2px]"
            style={{
              background:
                "radial-gradient(900px 500px at 35% 25%, rgba(212,175,55,0.18) 0%, rgba(0,0,0,0) 55%)",
              opacity: 0.9,
              pointerEvents: "none",
              borderRadius: 22,
            }}
          />

          <div className="relative">
            <div
              className="inline-flex items-center justify-center h-[34px] px-4 rounded-full border"
              style={{
                background: "rgba(212,175,55,0.10)",
                borderColor: "rgba(212,175,55,0.28)",
                color: "#E6C76A",
                fontWeight: 800,
                letterSpacing: "0.18em",
                fontSize: 12,
              }}
            >
              ERREUR
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-[240px_1fr] md:items-center">
              <div
                className="select-none"
                style={{
                  fontStyle: "italic",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                  fontSize: "clamp(84px, 12vw, 160px)",
                  color: "transparent",
                  WebkitTextStroke: "2px #D4AF37",
                  textShadow: "0 18px 60px rgba(0,0,0,0.55)",
                }}
              >
                404
              </div>

              <div>
                <h1
                  style={{
                    color: "#F5F7FA",
                    fontWeight: 900,
                    letterSpacing: "-0.02em",
                    fontSize: "clamp(20px, 3vw, 34px)",
                    lineHeight: 1.15,
                  }}
                >
                  Cette page n’existe pas.
                </h1>
                <p
                  className="mt-3"
                  style={{
                    color: "#A8B0BD",
                    fontWeight: 600,
                    fontSize: "clamp(13px, 1.7vw, 16px)",
                    lineHeight: 1.55,
                    maxWidth: "62ch",
                  }}
                >
                  Tu as probablement suivi un lien cassé ou tapé une mauvaise
                  URL.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center px-5 py-3 rounded-full font-extrabold no-underline transition-transform hover:-translate-y-[1px]"
                    style={{
                      background: "#D4AF37",
                      color: "#11151C",
                      boxShadow: "0 10px 30px rgba(212,175,55,0.18)",
                    }}
                  >
                    Retour accueil
                  </Link>

                  <Link
                    href="/reservations"
                    className="inline-flex items-center justify-center px-5 py-3 rounded-full font-extrabold no-underline transition-transform hover:-translate-y-[1px]"
                    style={{
                      border: "1px solid #232A36",
                      background: "rgba(17,21,28,0.55)",
                      color: "#F5F7FA",
                    }}
                  >
                    Réserver une séance
                  </Link>
                </div>

                <div
                  className="mt-5 flex items-center gap-3"
                  style={{ color: "#788291", fontSize: 13, fontWeight: 600 }}
                >
                  <span
                    aria-hidden
                    className="inline-block rounded-full"
                    style={{
                      width: 10,
                      height: 10,
                      background: "rgba(212,175,55,0.9)",
                      boxShadow: "0 0 0 6px rgba(212,175,55,0.12)",
                      flex: "0 0 auto",
                    }}
                  />
                  Astuce : vérifie l’URL ou reviens à l’accueil.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-4 text-center"
          style={{ color: "#A8B0BD", fontWeight: 600, fontSize: 13 }}
        >
          <span style={{ color: "#788291" }}>Lost?</span>{" "}
          <Link
            href="/"
            className="no-underline"
            style={{ color: "#E6C76A", fontWeight: 800 }}
          >
            On te remet sur la bonne route →
          </Link>
        </div>
      </div>
    </main>
  );
}
