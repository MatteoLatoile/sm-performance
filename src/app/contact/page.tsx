"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Coaching privé");
  const [message, setMessage] = useState("");

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    if (name.trim().length < 2) return false;
    if (!isValidEmail(email)) return false;
    if (message.trim().length < 10) return false;
    return true;
  }, [email, message, name]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || sending) return;

    setSending(true);
    setErrorMsg(null);
    setSent(false);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        subject,
        message: message.trim(),
      }),
    });

    const json = (await res.json()) as { ok?: true; error?: string };

    setSending(false);

    if (!res.ok || !json.ok) {
      setErrorMsg(json.error ?? "Erreur lors de l’envoi");
      return;
    }

    setSent(true);
    setMessage("");
  }

  return (
    <section
      className="w-full"
      style={{
        background: "#11151C",
        minHeight: "calc(100vh - 86px)",
      }}
    >
      {/* Header band */}
      <div
        className="w-full"
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
              CONTACT • SM PERFORMANCE
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
            Contact
          </h1>

          <p
            className="mt-4 max-w-[650px] text-[15px] md:text-[16px] leading-relaxed"
            style={{ color: "#A8B0BD" }}
          >
            Dis-moi ce que tu veux : coaching privé, préparation combat, remise
            en forme, perte de poids. Réponse rapide.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <Link
              href="/"
              className="text-[14px] font-semibold transition"
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
          {/* Form */}
          <div
            style={{
              background: "#0D1014",
              borderRadius: 22,
              padding: 18,
              boxShadow: "0 30px 120px rgba(0,0,0,0.45)",
            }}
          >
            <div
              style={{ background: "#11151C", borderRadius: 18, padding: 18 }}
            >
              <div
                className="text-[12px] font-semibold tracking-[0.18em]"
                style={{ color: "#788291" }}
              >
                ENVOYER UN MESSAGE
              </div>
              <div
                className="mt-2 text-[22px] font-extrabold"
                style={{ color: "#F5F7FA" }}
              >
                On s’organise.
              </div>
              <div className="mt-2 text-[12px]" style={{ color: "#A8B0BD" }}>
                Champs obligatoires : Nom, Email, Message (10+ caractères).
              </div>

              <form className="mt-6" onSubmit={onSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field
                    label="Nom"
                    value={name}
                    onChange={setName}
                    placeholder="Ex: Samy Martin"
                  />
                  <Field
                    label="Email"
                    value={email}
                    onChange={setEmail}
                    placeholder="ex: samy@email.com"
                    type="email"
                  />
                </div>

                <div className="mt-3">
                  <Label>Objet</Label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full mt-2 rounded-[14px] px-4 py-3 text-[14px] outline-none transition"
                    style={{
                      background: "#11151C",
                      color: "#F5F7FA",
                      border: "1px solid #232A36",
                      boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
                    }}
                  >
                    <option style={{ background: "#11151C", color: "#F5F7FA" }}>
                      Coaching privé
                    </option>
                    <option style={{ background: "#11151C", color: "#F5F7FA" }}>
                      Préparation combat
                    </option>
                    <option style={{ background: "#11151C", color: "#F5F7FA" }}>
                      Perte de poids
                    </option>
                    <option style={{ background: "#11151C", color: "#F5F7FA" }}>
                      Renforcement / mobilité
                    </option>
                    <option style={{ background: "#11151C", color: "#F5F7FA" }}>
                      Autre
                    </option>
                  </select>
                </div>

                <div className="mt-3">
                  <Label>Message</Label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    className="w-full mt-2 rounded-[14px] px-4 py-3 text-[14px] outline-none transition"
                    style={{
                      background: "#11151C",
                      color: "#F5F7FA",
                      border: "1px solid #232A36",
                      boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
                      resize: "vertical",
                    }}
                    placeholder="Dis-moi ton objectif + ton niveau + tes dispos (ex: soir / week-end)."
                  />
                </div>

                <div className="mt-4">
                  {email.trim() && !isValidEmail(email) && (
                    <div className="text-[12px]" style={{ color: "#E74C3C" }}>
                      Email invalide.
                    </div>
                  )}
                  {message.trim() && message.trim().length < 10 && (
                    <div className="text-[12px]" style={{ color: "#E74C3C" }}>
                      Message trop court (10+ caractères).
                    </div>
                  )}
                  {errorMsg && (
                    <div
                      className="text-[12px] mt-2"
                      style={{ color: "#E74C3C" }}
                    >
                      {errorMsg}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={!canSubmit || sending}
                    className="rounded-full px-12 py-3 text-[15px] font-semibold transition"
                    style={{
                      background: "#D4AF37",
                      color: "#11151C",
                      boxShadow: "0 10px 30px rgba(212,175,55,0.18)",
                      opacity: canSubmit && !sending ? 1 : 0.55,
                      cursor: canSubmit && !sending ? "pointer" : "not-allowed",
                    }}
                  >
                    {sending ? "Envoi..." : "Envoyer"}
                  </button>

                  {sent && (
                    <div
                      className="rounded-full px-5 py-3 text-[13px] font-semibold"
                      style={{
                        background: "rgba(46,204,113,0.12)",
                        color: "#2ECC71",
                        border: "1px solid rgba(46,204,113,0.18)",
                      }}
                    >
                      ✓ Message envoyé
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            <Card title="Infos" subtitle="Réponse rapide">
              <InfoRow label="Téléphone" value="06 09 25 85 99" />
              <InfoRow
                label="Email"
                value="smperformances.coaching@gmail.com"
              />
              <InfoRow label="Zone" value="Saint-Étienne" />
            </Card>

            <Card title="Horaires" subtitle="Sur réservation">
              <InfoRow label="Lun–Ven" value="07:00 — 22:00" />
              <InfoRow label="Sam" value="09:00 — 20:00" />
              <InfoRow label="Dim" value="09:00 — 14:00" />
            </Card>
          </div>
        </div>
      </div>

      {/* Focus glow */}
      <style jsx global>{`
        input:focus,
        textarea:focus,
        select:focus {
          border-color: rgba(212, 175, 55, 0.55) !important;
          box-shadow:
            0 0 0 3px rgba(212, 175, 55, 0.18),
            0 18px 60px rgba(0, 0, 0, 0.35) !important;
        }
      `}</style>
    </section>
  );
}

function Label({ children }: { children: string }) {
  return (
    <div className="text-[12px] font-semibold" style={{ color: "#A8B0BD" }}>
      {children}
    </div>
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
      <Label>{label}</Label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type ?? "text"}
        className="w-full mt-2 rounded-[14px] px-4 py-3 text-[14px] outline-none transition"
        style={{
          background: "#11151C",
          color: "#F5F7FA",
          border: "1px solid #232A36",
          boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
        }}
        placeholder={placeholder}
      />
    </div>
  );
}

function Card(props: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
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
        <div className="mt-4">{props.children}</div>
      </div>
    </div>
  );
}

function InfoRow(props: { label: string; value: string }) {
  return (
    <div
      className="flex items-center justify-between gap-3 py-2"
      style={{ borderBottom: "1px solid rgba(35,42,54,0.65)" }}
    >
      <div className="text-[12px] font-semibold" style={{ color: "#A8B0BD" }}>
        {props.label}
      </div>
      <div
        className="text-[12px] font-semibold"
        style={{ color: "#F5F7FA", textAlign: "right" }}
      >
        {props.value}
      </div>
    </div>
  );
}
