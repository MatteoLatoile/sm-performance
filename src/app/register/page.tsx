"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [agree, setAgree] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    if (firstName.trim().length < 2) return false;
    if (lastName.trim().length < 2) return false;
    if (!isValidEmail(email)) return false;
    if (password.trim().length < 8) return false;
    if (password2 !== password) return false;
    if (!agree) return false;
    return true;
  }, [agree, email, firstName, lastName, password, password2]);

  return (
    <section
      className="w-full"
      style={{
        minHeight: "calc(100vh - 86px)",
        background: "#11151C",
      }}
    >
      <div
        className="relative w-full"
        style={{ minHeight: "calc(100vh - 86px)" }}
      >
        <img
          src="/images/bg-hero.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #0B0D10F2 0%, #0B0D10CC 45%, #0B0D1055 78%, #0B0D1033 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1100px 650px at 30% 40%, #D4AF3720 0%, #00000000 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 540px at 65% 15%, #00000000 0%, #000000A6 100%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-8 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-center">
            {/* LEFT */}
            <div>
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
                  ESPACE MEMBRE • INSCRIPTION
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
                Inscription
              </h1>

              <p
                className="mt-4 max-w-[520px] text-[15px] md:text-[16px] leading-relaxed"
                style={{ color: "#A8B0BD" }}
              >
                Crée ton compte : réservation plus rapide, suivi, confirmations.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-[14px] font-semibold transition"
                  style={{ color: "#A8B0BD" }}
                >
                  J’ai déjà un compte →
                </Link>
                <span style={{ color: "#232A36" }}>•</span>
                <Link
                  href="/reservations"
                  className="text-[14px] font-semibold transition"
                  style={{ color: "#E6C76A" }}
                >
                  Réserver sans compte →
                </Link>
              </div>
            </div>

            {/* RIGHT CARD */}
            <div>
              <div
                className="rounded-[22px] p-6 md:p-8"
                style={{
                  background: "#0D1014CC",
                  border: "1px solid #232A36",
                  boxShadow: "0 30px 120px rgba(0,0,0,0.55)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="rounded-full px-5 py-2 inline-flex items-center gap-2"
                  style={{
                    background: "rgba(212,175,55,0.10)",
                    border: "1px solid rgba(212,175,55,0.22)",
                    color: "#E6C76A",
                  }}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: "#D4AF37" }}
                  />
                  <span className="text-[12px] font-semibold tracking-[0.16em]">
                    INSCRIPTION
                  </span>
                </div>

                <div
                  className="mt-4 text-[22px] font-extrabold"
                  style={{ color: "#F5F7FA" }}
                >
                  Commence maintenant
                </div>
                <div className="mt-2 text-[12px]" style={{ color: "#788291" }}>
                  Crée ton compte et réserve plus vite.
                </div>

                <form
                  className="mt-6"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!canSubmit || loading) return;

                    setLoading(true);
                    setErrorMsg(null);
                    setInfoMsg(null);

                    try {
                      const supabase = createClient();

                      const { data, error } = await supabase.auth.signUp({
                        email: email.trim(),
                        password: password.trim(),
                        options: {
                          data: {
                            first_name: firstName.trim(),
                            last_name: lastName.trim(),
                          },
                          emailRedirectTo: `${window.location.origin}/auth/callback`,
                        },
                      });

                      if (error) {
                        setErrorMsg(error.message);
                        return;
                      }

                      // Si email confirmation ON -> pas de session direct
                      if (!data.session) {
                        setInfoMsg(
                          "Compte créé. Vérifie tes emails (Mailpit en local) et clique le lien de confirmation.",
                        );
                        return;
                      }

                      // Sinon connecté direct
                      router.push("/reservations");
                      router.refresh();
                    } catch (err: any) {
                      setErrorMsg(err?.message ?? "Erreur inconnue");
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Field
                      label="Prénom"
                      value={firstName}
                      onChange={setFirstName}
                      placeholder="Ex: Samy"
                    />
                    <Field
                      label="Nom"
                      value={lastName}
                      onChange={setLastName}
                      placeholder="Ex: Martin"
                    />
                  </div>

                  <div className="mt-3">
                    <Field
                      label="Email"
                      value={email}
                      onChange={setEmail}
                      placeholder="ex: samy@email.com"
                      type="email"
                    />
                  </div>

                  <div className="mt-3">
                    <Field
                      label="Mot de passe"
                      value={password}
                      onChange={setPassword}
                      placeholder="Minimum 8 caractères"
                      type="password"
                    />
                  </div>

                  <div className="mt-3">
                    <Field
                      label="Confirmer le mot de passe"
                      value={password2}
                      onChange={setPassword2}
                      placeholder="Répète le mot de passe"
                      type="password"
                    />
                  </div>

                  <div className="mt-4 flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => setAgree(!agree)}
                      className="mt-[2px] h-[18px] w-[18px] rounded-[5px] transition"
                      style={{
                        background: agree ? "#D4AF37" : "#0D1014",
                        boxShadow: agree
                          ? "0 10px 30px rgba(212,175,55,0.18)"
                          : "0 0 0 1px #232A36",
                      }}
                      aria-pressed={agree}
                    />
                    <div
                      className="text-[12px]"
                      style={{ color: "#A8B0BD", lineHeight: 1.5 }}
                    >
                      J’accepte d’être contacté pour la gestion de mes
                      réservations.
                    </div>
                  </div>

                  <div className="mt-4">
                    {!!errorMsg && (
                      <div className="text-[12px]" style={{ color: "#E74C3C" }}>
                        {errorMsg}
                      </div>
                    )}
                    {!!infoMsg && (
                      <div
                        className="text-[12px] mt-2"
                        style={{
                          color: "#2ECC71",
                          background: "rgba(46,204,113,0.10)",
                          border: "1px solid rgba(46,204,113,0.18)",
                          borderRadius: 12,
                          padding: 10,
                        }}
                      >
                        {infoMsg}
                        <div className="mt-2" style={{ color: "#A8B0BD" }}>
                          Local: ouvre Mailpit → <b>http://127.0.0.1:54324</b>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={!canSubmit || loading}
                      className="w-full rounded-full px-10 py-3 text-[15px] font-semibold transition"
                      style={{
                        background: "#D4AF37",
                        color: "#11151C",
                        boxShadow: "0 10px 30px rgba(212,175,55,0.18)",
                        opacity: canSubmit && !loading ? 1 : 0.55,
                        cursor:
                          canSubmit && !loading ? "pointer" : "not-allowed",
                      }}
                    >
                      {loading ? "Création..." : "Créer mon compte"}
                    </button>

                    <div
                      className="mt-4 text-center text-[12px]"
                      style={{ color: "#788291" }}
                    >
                      Déjà un compte ?{" "}
                      <Link
                        href="/login"
                        style={{ color: "#E6C76A", fontWeight: 700 }}
                      >
                        Connexion
                      </Link>
                    </div>
                  </div>
                </form>
              </div>

              <div className="mt-6 text-[12px]" style={{ color: "#788291" }}>
                En continuant, tu acceptes les conditions d’utilisation.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        input:focus {
          border-color: rgba(212, 175, 55, 0.55) !important;
          box-shadow:
            0 0 0 3px rgba(212, 175, 55, 0.18),
            0 18px 60px rgba(0, 0, 0, 0.35) !important;
        }
      `}</style>
    </section>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  const { label, value, onChange, placeholder, type } = props;

  return (
    <div>
      <div className="text-[12px] font-semibold" style={{ color: "#A8B0BD" }}>
        {label}
      </div>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type ?? "text"}
        className="w-full mt-2 rounded-[14px] px-4 py-3 text-[14px] outline-none transition"
        style={{
          background: "#11151C",
          color: "#F5F7FA",
          boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
          border: "1px solid #232A36",
        }}
        placeholder={placeholder}
      />
    </div>
  );
}
