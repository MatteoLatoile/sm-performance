"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Consent = {
  v: 1;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  ts: number;
};

const COOKIE_NAME = "sm_cookie_consent";
const MAX_AGE_DAYS = 180;

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : null;
}

function setCookie(name: string, value: string, maxAgeDays: number) {
  if (typeof document === "undefined") return;
  const maxAge = maxAgeDays * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
}

function safeParse(json: string | null): Consent | null {
  if (!json) return null;
  try {
    const obj = JSON.parse(json) as Consent;
    if (obj && obj.v === 1 && obj.necessary === true) return obj;
    return null;
  } catch {
    return null;
  }
}

export default function CookieConsent() {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);

  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const existing = useMemo(() => {
    if (typeof document === "undefined") return null;
    return safeParse(getCookie(COOKIE_NAME));
  }, [ready]);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const c = safeParse(getCookie(COOKIE_NAME));
    if (!c) {
      setOpen(true);
      setSettings(false);
      setAnalytics(false);
      setMarketing(false);
      return;
    }

    setOpen(false);
    setSettings(false);
    setAnalytics(Boolean(c.analytics));
    setMarketing(Boolean(c.marketing));
  }, [ready]);

  const save = (next: Pick<Consent, "analytics" | "marketing">) => {
    const payload: Consent = {
      v: 1,
      necessary: true,
      analytics: next.analytics,
      marketing: next.marketing,
      ts: Date.now(),
    };

    setCookie(COOKIE_NAME, JSON.stringify(payload), MAX_AGE_DAYS);
    setAnalytics(payload.analytics);
    setMarketing(payload.marketing);
    setOpen(false);
    setSettings(false);

    // petit event utile si tu veux conditionner des scripts (analytics etc.)
    window.dispatchEvent(
      new CustomEvent("sm:cookie-consent", { detail: payload }),
    );
  };

  if (!ready) return null;
  if (!open) return null;

  const BG = "#0D1014";
  const BORDER = "#232A36";
  const TEXT = "#F5F7FA";
  const MUTED = "#A8B0BD";
  const SOFT = "#788291";
  const GOLD = "#D4AF37";

  return (
    <>
      {/* backdrop quand settings ouvert */}
      {settings && (
        <div
          onClick={() => setSettings(false)}
          className="fixed inset-0 z-[90]"
          style={{
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(6px)",
          }}
        />
      )}

      <div
        className="fixed left-0 right-0 bottom-0 z-[100] px-4 pb-4"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="mx-auto max-w-3xl rounded-2xl border p-4 md:p-5"
          style={{
            pointerEvents: "auto",
            background: BG,
            borderColor: BORDER,
            boxShadow: "0 30px 140px rgba(0,0,0,0.65)",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="min-w-0">
              <div
                className="text-[12px] font-extrabold tracking-[0.14em]"
                style={{ color: GOLD }}
              >
                COOKIES
              </div>

              <div
                className="mt-2 text-[15px] md:text-[16px] font-semibold"
                style={{ color: TEXT, lineHeight: 1.5 }}
              >
                On utilise des cookies pour faire tourner le site et améliorer
                l’expérience.
              </div>

              <div
                className="mt-2 text-[13px]"
                style={{ color: MUTED, lineHeight: 1.6 }}
              >
                Les cookies nécessaires sont indispensables. Tu peux accepter,
                refuser ou personnaliser les cookies optionnels.{" "}
                <Link
                  href="/politique-confidentialite"
                  style={{ color: GOLD, fontWeight: 800 }}
                >
                  Politique de confidentialité
                </Link>
                .
              </div>
            </div>

            <div className="flex flex-col gap-2 md:min-w-[260px]">
              <button
                type="button"
                onClick={() => save({ analytics: true, marketing: true })}
                className="w-full rounded-full px-6 py-3 text-[14px] font-extrabold transition"
                style={{
                  background: GOLD,
                  color: "#11151C",
                  boxShadow: "0 10px 30px rgba(212,175,55,0.18)",
                }}
              >
                Tout accepter
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => save({ analytics: false, marketing: false })}
                  className="rounded-full px-4 py-3 text-[13px] font-semibold transition border"
                  style={{
                    borderColor: BORDER,
                    background: "rgba(17,21,28,0.55)",
                    color: TEXT,
                  }}
                >
                  Refuser
                </button>

                <button
                  type="button"
                  onClick={() => setSettings((v) => !v)}
                  className="rounded-full px-4 py-3 text-[13px] font-semibold transition border"
                  style={{
                    borderColor: "rgba(212,175,55,0.35)",
                    background: "rgba(212,175,55,0.10)",
                    color: GOLD,
                  }}
                >
                  Personnaliser
                </button>
              </div>

              <div className="text-[12px]" style={{ color: SOFT }}>
                Durée du choix : {MAX_AGE_DAYS} jours
              </div>
            </div>
          </div>

          {/* Settings panel */}
          {settings && (
            <div
              className="mt-4 rounded-2xl border p-4"
              style={{ borderColor: BORDER, background: "#11151C" }}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div
                    className="text-[13px] font-extrabold"
                    style={{ color: TEXT }}
                  >
                    Préférences
                  </div>
                  <div className="mt-1 text-[12px]" style={{ color: MUTED }}>
                    Active/désactive les cookies optionnels.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSettings(false)}
                  className="rounded-full px-4 py-2 text-[12px] font-semibold border"
                  style={{
                    borderColor: BORDER,
                    color: MUTED,
                    background: "#0D1014",
                  }}
                >
                  Fermer
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <PrefRow
                  title="Nécessaires"
                  desc="Indispensables au fonctionnement du site."
                  locked
                  value
                  onToggle={() => {}}
                />
                <PrefRow
                  title="Analytics"
                  desc="Mesure anonyme pour comprendre l’usage."
                  value={analytics}
                  onToggle={() => setAnalytics((v) => !v)}
                />
                <PrefRow
                  title="Marketing"
                  desc="Contenus/personnalisation et mesure pubs."
                  value={marketing}
                  onToggle={() => setMarketing((v) => !v)}
                />
              </div>

              <div className="mt-4 flex flex-col md:flex-row gap-2 md:justify-end">
                <button
                  type="button"
                  onClick={() => save({ analytics: false, marketing: false })}
                  className="rounded-full px-6 py-3 text-[13px] font-semibold border"
                  style={{
                    borderColor: BORDER,
                    background: "rgba(17,21,28,0.55)",
                    color: TEXT,
                  }}
                >
                  Tout refuser
                </button>

                <button
                  type="button"
                  onClick={() => save({ analytics, marketing })}
                  className="rounded-full px-6 py-3 text-[13px] font-extrabold transition"
                  style={{
                    background: GOLD,
                    color: "#11151C",
                    boxShadow: "0 10px 30px rgba(212,175,55,0.18)",
                  }}
                >
                  Enregistrer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function PrefRow(props: {
  title: string;
  desc: string;
  value: boolean;
  locked?: boolean;
  onToggle: () => void;
}) {
  const BORDER = "#232A36";
  const TEXT = "#F5F7FA";
  const MUTED = "#A8B0BD";
  const GOLD = "#D4AF37";

  return (
    <div
      className="flex items-center justify-between gap-4 rounded-xl border p-3"
      style={{ borderColor: BORDER, background: "#0D1014" }}
    >
      <div className="min-w-0">
        <div className="text-[13px] font-extrabold" style={{ color: TEXT }}>
          {props.title}
        </div>
        <div
          className="mt-1 text-[12px]"
          style={{ color: MUTED, lineHeight: 1.5 }}
        >
          {props.desc}
        </div>
      </div>

      <button
        type="button"
        onClick={props.onToggle}
        disabled={props.locked}
        aria-pressed={props.value}
        className="relative h-[34px] w-[58px] rounded-full border transition"
        style={{
          borderColor: props.value ? "rgba(212,175,55,0.45)" : BORDER,
          background: props.value
            ? "rgba(212,175,55,0.18)"
            : "rgba(17,21,28,0.55)",
          cursor: props.locked ? "not-allowed" : "pointer",
          opacity: props.locked ? 0.75 : 1,
          flex: "0 0 auto",
        }}
      >
        <span
          className="absolute top-[50%] -translate-y-1/2 h-[26px] w-[26px] rounded-full transition"
          style={{
            left: props.value ? 28 : 4,
            background: props.value ? GOLD : "#A8B0BD",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          }}
        />
      </button>
    </div>
  );
}
