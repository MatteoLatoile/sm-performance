"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Mode = "login" | "register";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function Auth({ mode }: { mode: Mode }) {
  const isLogin = mode === "login";

  // Text map => zéro confusion
  const copy = useMemo(() => {
    if (isLogin) {
      return {
        badge: "ACCÈS MEMBRE • CONNEXION",
        h1: "Connexion",
        lead: "Accède à ton espace pour réserver plus vite et suivre tes séances.",
        cta: "Se connecter",
        altHint: "Pas de compte ?",
        altLinkLabel: "Inscription",
        altLinkHref: "/register",
        smallRight: "Accès sécurisé",
      };
    }
    return {
      badge: "ACCÈS MEMBRE • INSCRIPTION",
      h1: "Inscription",
      lead: "Crée ton compte pour réserver en 2 clics et garder ton suivi.",
      cta: "Créer mon compte",
      altHint: "Déjà un compte ?",
      altLinkLabel: "Connexion",
      altLinkHref: "/login",
      smallRight: "Création rapide",
    };
  }, [isLogin]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [agree, setAgree] = useState(false);

  const canSubmit = useMemo(() => {
    if (!isValidEmail(email)) return false;
    if (password.trim().length < 8) return false;

    if (!isLogin) {
      if (firstName.trim().length < 2) return false;
      if (lastName.trim().length < 2) return false;
      if (password2 !== password) return false;
      if (!agree) return false;
    }
    return true;
  }, [agree, email, firstName, isLogin, lastName, password, password2]);

  return (
    <section
      className="w-full"
      style={{
        minHeight: "calc(100vh - 86px)",
        background: "#11151C",
      }}
    >
      {/* Background */}
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

        {/* overlays */}
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

        {/* Content */}
        <div className="relative mx-auto max-w-6xl px-8 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-center">
            {/* Left */}
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
                  {copy.badge}
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
                {copy.h1}
              </h1>

              <p
                className="mt-4 max-w-[520px] text-[15px] md:text-[16px] leading-relaxed"
                style={{ color: "#A8B0BD" }}
              >
                {copy.lead}
              </p>

              <div className="mt-8 flex items-center gap-3">
                <Link
                  href={isLogin ? "/register" : "/login"}
                  className="text-[14px] font-semibold transition"
                  style={{ color: "#A8B0BD" }}
                >
                  {isLogin
                    ? "Je n’ai pas de compte →"
                    : "J’ai déjà un compte →"}
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

              <div className="mt-10 flex flex-wrap gap-3">
                {["Accès rapide", "Historique", "Confirmation immédiate"].map(
                  (t) => (
                    <div
                      key={t}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2"
                      style={{
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

            {/* Right card */}
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
                {/* Tabs with animated gold indicator */}
                <div
                  className="relative rounded-full p-2"
                  style={{
                    background: "#11151C",
                    border: "1px solid #232A36",
                  }}
                >
                  <div
                    className="tabIndicator"
                    style={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      height: 40,
                      width: "calc(50% - 8px)",
                      borderRadius: 999,
                      background: "#D4AF37",
                      boxShadow: "0 10px 30px rgba(212,175,55,0.18)",
                      transform: isLogin
                        ? "translateX(0%)"
                        : "translateX(100%)",
                      transition:
                        "transform 260ms cubic-bezier(0.22,0.61,0.36,1)",
                    }}
                  />

                  <div className="relative grid grid-cols-2 gap-2">
                    <Link
                      href="/login"
                      className="h-[40px] rounded-full grid place-items-center text-[13px] font-semibold transition"
                      style={{
                        color: isLogin ? "#11151C" : "#A8B0BD",
                      }}
                    >
                      Connexion
                    </Link>

                    <Link
                      href="/register"
                      className="h-[40px] rounded-full grid place-items-center text-[13px] font-semibold transition"
                      style={{
                        color: !isLogin ? "#11151C" : "#A8B0BD",
                      }}
                    >
                      Inscription
                    </Link>
                  </div>
                </div>

                {/* Form title changes too (strong visual cue) */}
                <div className="mt-6">
                  <div
                    className="text-[12px] font-semibold tracking-[0.18em]"
                    style={{ color: "#788291" }}
                  >
                    {isLogin ? "SE CONNECTER" : "CRÉER UN COMPTE"}
                  </div>
                  <div
                    className="mt-2 text-[22px] font-extrabold tracking-tight"
                    style={{ color: "#F5F7FA" }}
                  >
                    {isLogin ? "Récupère ton accès" : "Commence maintenant"}
                  </div>
                </div>

                {/* Form */}
                <form
                  className="mt-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!canSubmit) return;
                    // Front only
                    // eslint-disable-next-line no-console
                    console.log("AUTH SUBMIT", {
                      mode,
                      firstName,
                      lastName,
                      email,
                      password,
                    });
                  }}
                >
                  {!isLogin && (
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
                  )}

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

                  {!isLogin && (
                    <div className="mt-3">
                      <Field
                        label="Confirmer le mot de passe"
                        value={password2}
                        onChange={setPassword2}
                        placeholder="Répète le mot de passe"
                        type="password"
                      />
                    </div>
                  )}

                  {/* helper row */}
                  <div className="mt-4 flex items-center justify-between gap-4">
                    {!isLogin ? (
                      <div className="flex items-start gap-3">
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
                    ) : (
                      <Link
                        href="#"
                        className="text-[12px] font-semibold transition"
                        style={{ color: "#A8B0BD" }}
                      >
                        Mot de passe oublié ?
                      </Link>
                    )}

                    <div className="text-[12px]" style={{ color: "#788291" }}>
                      {copy.smallRight}
                    </div>
                  </div>

                  {/* Errors */}
                  <div className="mt-4">
                    {email.trim() && !isValidEmail(email) && (
                      <div className="text-[12px]" style={{ color: "#E74C3C" }}>
                        Email invalide.
                      </div>
                    )}
                    {password.trim() && password.trim().length < 8 && (
                      <div className="text-[12px]" style={{ color: "#E74C3C" }}>
                        Mot de passe trop court (8+).
                      </div>
                    )}
                    {!isLogin && password2 && password2 !== password && (
                      <div className="text-[12px]" style={{ color: "#E74C3C" }}>
                        Les mots de passe ne correspondent pas.
                      </div>
                    )}
                    {!isLogin &&
                      !agree &&
                      (firstName || lastName || email || password) && (
                        <div
                          className="text-[12px]"
                          style={{ color: "#E74C3C" }}
                        >
                          Coche l’acceptation pour continuer.
                        </div>
                      )}
                  </div>

                  {/* CTA */}
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="w-full rounded-full px-10 py-3 text-[15px] font-semibold transition"
                      style={{
                        background: "#D4AF37",
                        color: "#11151C",
                        boxShadow: "0 10px 30px rgba(212,175,55,0.18)",
                        opacity: canSubmit ? 1 : 0.55,
                        cursor: canSubmit ? "pointer" : "not-allowed",
                      }}
                    >
                      {copy.cta}
                    </button>

                    <div
                      className="mt-4 text-center text-[12px]"
                      style={{ color: "#788291" }}
                    >
                      {copy.altHint}{" "}
                      <Link
                        href={copy.altLinkHref}
                        style={{ color: "#E6C76A", fontWeight: 700 }}
                      >
                        {copy.altLinkLabel}
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
