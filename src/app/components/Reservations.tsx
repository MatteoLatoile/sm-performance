"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import Grappling from "../../../public/images/grappling.png";
import KickBoxing from "../../../public/images/kickboxing.png";
import Mma from "../../../public/images/mma.png";
import perte_de_poids from "../../../public/images/perte_de_poids.png";
import renforcement from "../../../public/images/renforcement.png";
import self_defence from "../../../public/images/self_defence.png";

type DisciplineKey =
  | "Grappling"
  | "MMA"
  | "Kickboxing"
  | "Renforcement"
  | "Self-défence"
  | "Perte de poids";

type Step = 1 | 2 | 3;

const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const SLOTS = ["08:00", "09:30", "11:00", "12:30", "18:00", "19:30", "21:00"];

function disciplineFromSlug(slug: string | null): DisciplineKey | null {
  if (!slug) return null;
  const s = slug.toLowerCase();

  if (s === "grappling") return "Grappling";
  if (s === "mma") return "MMA";
  if (s === "kickboxing") return "Kickboxing";
  if (s === "renforcement") return "Renforcement";
  if (s === "self-defence" || s === "self_defence") return "Self-défence";
  if (s === "perte-de-poids" || s === "perte_de_poids") return "Perte de poids";

  return null;
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function mondayIndex(jsDay: number) {
  return (jsDay + 6) % 7; // lundi=0
}

function monthLabel(d: Date) {
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

function formatDateLabel(d: Date) {
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function toLocalISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function Reservations() {
  const searchParams = useSearchParams();

  const [step, setStep] = useState<Step>(1);
  const [selected, setSelected] = useState<DisciplineKey | null>(null);

  // Step 2
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Step 3
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emailLocked, setEmailLocked] = useState(false);
  const [note, setNote] = useState("");
  const [accept, setAccept] = useState(false);

  // si connecté, pré-remplit l’email et lock
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        if (!alive) return;

        if (res.status === 204) return;

        if (res.ok) {
          const json = (await res.json()) as { email?: string };
          const e = (json.email ?? "").trim();
          if (e) {
            setEmail(e);
            setEmailLocked(true);
          }
        }
      } catch {
        // ignore
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const p1 = searchParams?.get("discipline") ?? null;
    const p2 =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("discipline")
        : null;

    const d = disciplineFromSlug(p1 || p2);
    if (!d) return;

    setSelected(d);
  }, [searchParams]);

  const items = useMemo(
    () => [
      { key: "Grappling" as const, img: Grappling },
      { key: "MMA" as const, img: Mma },
      { key: "Kickboxing" as const, img: KickBoxing },
      { key: "Renforcement" as const, img: renforcement },
      { key: "Self-défence" as const, img: self_defence },
      { key: "Perte de poids" as const, img: perte_de_poids },
    ],
    [],
  );

  // ====== Step 1 mobile/tablet swipe carousel ======
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const rafRef = useRef<number | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scrollToIndex = (idx: number, behavior: ScrollBehavior = "smooth") => {
    const el = itemRefs.current[idx];
    if (!el) return;
    el.scrollIntoView({ behavior, inline: "center", block: "nearest" });
    setActiveIdx(idx);
  };

  const onCarouselScroll = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const container = carouselRef.current;
      if (!container) return;

      const cRect = container.getBoundingClientRect();
      const cCenter = cRect.left + cRect.width / 2;

      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      for (let i = 0; i < itemRefs.current.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const center = r.left + r.width / 2;
        const dist = Math.abs(center - cCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }

      setActiveIdx(bestIdx);
    });
  };

  // si discipline pré-sélectionnée (query param), on centre la carte correspondante
  useEffect(() => {
    if (!selected) return;
    const idx = items.findIndex((it) => it.key === selected);
    if (idx >= 0) {
      setActiveIdx(idx);
      // petit timeout pour laisser le DOM poser les refs (safe)
      setTimeout(() => scrollToIndex(idx, "auto"), 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, items]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const stepLabel =
    step === 1
      ? "Choisis ta discipline."
      : step === 2
        ? "Choisis ton créneau."
        : "Tes informations.";

  return (
    <section
      className="w-full"
      style={{
        background: "#11151C",
        minHeight: "calc(100vh - 86px)",
      }}
    >
      <div className="mx-auto max-w-6xl px-8 py-16">
        <h1
          className="font-extrabold"
          style={{
            color: "#F5F7FA",
            fontSize: "clamp(34px, 4vw, 56px)",
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ fontStyle: "italic" }}>RESERVES</span>{" "}
          <span
            className="titleOutline"
            style={{ fontStyle: "italic", letterSpacing: "0.12em" }}
          >
            TA SEANCE ICI
          </span>{" "}
          !
        </h1>

        <div className="mt-8 flex items-center gap-3">
          <div
            className="h-9 w-9 rounded-full flex items-center justify-center font-extrabold"
            style={{ background: "#D4AF37", color: "#11151C" }}
          >
            {step}
          </div>
          <div
            className="text-[18px] md:text-[20px] font-semibold"
            style={{ color: "#A8B0BD" }}
          >
            {stepLabel}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-[14px] transition hover:text-[#F5F7FA]"
            style={{ color: "#A8B0BD" }}
          >
            ← Retour à l’accueil
          </Link>

          {step > 1 && (
            <button
              type="button"
              onClick={() => {
                if (step === 2) setStep(1);
                if (step === 3) setStep(2);
              }}
              className="text-[14px] transition hover:text-[#F5F7FA]"
              style={{ color: "#A8B0BD" }}
            >
              ← Retour étape {step - 1}
            </button>
          )}
        </div>

        {/* ✅ STEP 1 : desktop hover strips + mobile/tablet swipe */}
        {step === 1 && (
          <div className="mt-8">
            {/* Desktop / hover */}
            <div className="desktopStep1">
              <div
                className="group flex w-full gap-3 md:gap-4 overflow-hidden justify-center"
                style={{
                  height: 420,
                  borderRadius: 22,
                  background: "#0D1014",
                  padding: 14,
                }}
              >
                {items.map((it) => {
                  const isSelected = selected === it.key;

                  return (
                    <button
                      key={it.key}
                      type="button"
                      onClick={() => setSelected(it.key)}
                      className={[
                        "strip relative overflow-hidden outline-none",
                        "transition-[flex] duration-300 ease-out",
                        "group-hover:opacity-70 hover:opacity-100",
                        "focus-visible:opacity-100",
                      ].join(" ")}
                      style={{
                        cursor: "pointer",
                        boxShadow: isSelected
                          ? "0 0 0 2px #D4AF37, 0 18px 60px rgba(0,0,0,0.45)"
                          : "0 18px 60px rgba(0,0,0,0.35)",
                      }}
                      aria-pressed={isSelected}
                    >
                      <Image
                        src={it.img}
                        alt={it.key}
                        fill
                        className="object-cover stripImg"
                        draggable={false}
                      />

                      <div className="stripOverlay" />
                      <div className="stripGlow" />

                      <div className="absolute inset-0 flex items-end">
                        <div className="w-full p-5 md:p-6 stripContent">
                          <div
                            className="font-extrabold leading-none"
                            style={{
                              color: "#F5F7FA",
                              fontSize: "clamp(18px, 2.2vw, 34px)",
                              letterSpacing: "-0.02em",
                              textTransform: "uppercase",
                              textShadow: "0 12px 40px rgba(0,0,0,0.65)",
                            }}
                          >
                            {it.key}
                          </div>

                          <div className="mt-3 flex items-center gap-3">
                            <span
                              className="inline-flex items-center justify-center rounded-full px-6 py-2 text-[13px] font-semibold"
                              style={{
                                background: "#D4AF37",
                                color: "#11151C",
                                boxShadow: "0 10px 30px rgba(212,175,55,0.18)",
                              }}
                            >
                              Choisir
                            </span>

                            {isSelected && (
                              <span
                                className="text-[13px] font-semibold"
                                style={{ color: "#E6C76A" }}
                              >
                                Sélectionné
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile/Tablet / swipe carousel */}
            <div className="touchStep1">
              <div
                className="w-full"
                style={{
                  borderRadius: 22,
                  background: "#0D1014",
                  padding: 14,
                }}
              >
                <div className="flex items-center justify-between gap-3 px-2 pb-2">
                  <div
                    className="text-[12px] font-semibold"
                    style={{ color: "#788291" }}
                  >
                    Glisse → puis tape pour sélectionner
                  </div>
                  <div
                    className="text-[12px] font-extrabold"
                    style={{ color: "#E6C76A", opacity: selected ? 1 : 0.55 }}
                  >
                    {selected ?? "Aucune"}
                  </div>
                </div>

                <div className="relative">
                  <div
                    ref={carouselRef}
                    onScroll={onCarouselScroll}
                    className="carousel"
                    aria-label="Choix de discipline"
                  >
                    {items.map((it, idx) => {
                      const isSelected = selected === it.key;
                      const isActive = activeIdx === idx;

                      return (
                        <button
                          key={it.key}
                          ref={(el) => {
                            itemRefs.current[idx] = el;
                          }}
                          type="button"
                          onClick={() => {
                            setSelected(it.key);
                            scrollToIndex(idx);
                          }}
                          aria-pressed={isSelected}
                          className="carouselCard relative overflow-hidden outline-none"
                          style={{
                            border: isSelected
                              ? "2px solid #D4AF37"
                              : isActive
                                ? "1px solid rgba(212,175,55,0.45)"
                                : "1px solid #232A36",
                            boxShadow: isSelected
                              ? "0 10px 30px rgba(212,175,55,0.18)"
                              : "0 18px 60px rgba(0,0,0,0.30)",
                          }}
                        >
                          <Image
                            src={it.img}
                            alt={it.key}
                            fill
                            className="object-cover carouselImg"
                            draggable={false}
                          />

                          <div className="carouselOverlay" />
                          <div className="carouselGlow" />

                          {isSelected && (
                            <div
                              className="absolute right-3 top-3 rounded-full px-3 py-1 text-[12px] font-extrabold"
                              style={{
                                background: "rgba(212,175,55,0.16)",
                                color: "#E6C76A",
                                border: "1px solid rgba(212,175,55,0.35)",
                              }}
                            >
                              Sélectionné
                            </div>
                          )}

                          <div className="absolute inset-x-0 bottom-0 p-4">
                            <div
                              className="text-[15px] font-extrabold"
                              style={{
                                color: "#F5F7FA",
                                textTransform: "uppercase",
                                letterSpacing: "-0.02em",
                                textShadow: "0 12px 40px rgba(0,0,0,0.65)",
                              }}
                            >
                              {it.key}
                            </div>

                            <div className="mt-2 flex items-center justify-between gap-3">
                              <span
                                className="inline-flex items-center justify-center rounded-full px-4 py-2 text-[12px] font-semibold"
                                style={{
                                  background: isSelected
                                    ? "#D4AF37"
                                    : "rgba(17,21,28,0.65)",
                                  color: isSelected ? "#11151C" : "#A8B0BD",
                                  border: isSelected
                                    ? "none"
                                    : "1px solid #232A36",
                                }}
                              >
                                {isSelected ? "OK" : "Choisir"}
                              </span>

                              <span
                                className="text-[12px]"
                                style={{ color: "#A8B0BD" }}
                              >
                                Swipe
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="edgeFade left" />
                  <div className="edgeFade right" />
                </div>

                <div className="mt-4 flex items-center justify-center gap-2">
                  {items.map((it, idx) => {
                    const on = idx === activeIdx;
                    return (
                      <button
                        key={it.key}
                        type="button"
                        onClick={() => scrollToIndex(idx)}
                        aria-label={`Aller à ${it.key}`}
                        className="dot"
                        style={{
                          width: on ? 18 : 8,
                          height: 8,
                          borderRadius: 999,
                          background: on ? "#D4AF37" : "#232A36",
                          border: on
                            ? "none"
                            : "1px solid rgba(212,175,55,0.25)",
                          transition: "all 180ms ease",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <style jsx>{`
              /* Switch auto: si pas de hover (mobile/tablette) => carousel */
              .desktopStep1 {
                display: block;
              }
              .touchStep1 {
                display: none;
              }
              @media (hover: none), (pointer: coarse) {
                .desktopStep1 {
                  display: none;
                }
                .touchStep1 {
                  display: block;
                }
              }

              /* Desktop strips */
              .strip {
                flex: 0 0 64px;
              }
              @media (min-width: 768px) {
                .strip {
                  flex-basis: 78px;
                }
              }
              .strip:hover,
              .strip:focus-visible {
                flex: 1 0 520px;
              }

              .stripImg {
                transform: scale(1.03);
                transition: transform 420ms cubic-bezier(0.22, 0.61, 0.36, 1);
              }

              .stripOverlay {
                position: absolute;
                inset: 0;
                background: linear-gradient(
                  180deg,
                  rgba(0, 0, 0, 0.72) 0%,
                  rgba(0, 0, 0, 0.82) 60%,
                  rgba(0, 0, 0, 0.9) 100%
                );
                opacity: 0.92;
                transition: opacity 260ms ease;
              }

              .stripGlow {
                position: absolute;
                inset: 0;
                background: radial-gradient(
                  900px 500px at 35% 35%,
                  rgba(212, 175, 55, 0.18) 0%,
                  rgba(0, 0, 0, 0) 55%
                );
                opacity: 0;
                transition: opacity 280ms ease;
              }

              .stripContent {
                opacity: 0;
                transform: translate3d(0, 10px, 0);
                transition:
                  opacity 240ms ease,
                  transform 260ms ease;
              }

              .strip:hover .stripImg,
              .strip:focus-visible .stripImg {
                transform: scale(1.1);
              }
              .strip:hover .stripOverlay,
              .strip:focus-visible .stripOverlay {
                opacity: 0.55;
              }
              .strip:hover .stripGlow,
              .strip:focus-visible .stripGlow {
                opacity: 1;
              }
              .strip:hover .stripContent,
              .strip:focus-visible .stripContent {
                opacity: 1;
                transform: translate3d(0, 0, 0);
              }

              /* Carousel */
              .carousel {
                display: flex;
                gap: 12px;
                overflow-x: auto;
                padding: 8px;
                scroll-snap-type: x mandatory;
                scroll-padding-left: 18px;
                scroll-padding-right: 18px;
                -webkit-overflow-scrolling: touch;
                overscroll-behavior-x: contain;
                touch-action: pan-x;
              }
              .carousel::-webkit-scrollbar {
                display: none;
              }

              .carouselCard {
                scroll-snap-align: center;
                flex: 0 0 84%;
                height: 280px;
                border-radius: 18px;
              }

              @media (min-width: 640px) {
                .carouselCard {
                  flex-basis: 62%;
                }
              }

              @media (min-width: 768px) {
                .carouselCard {
                  flex-basis: 46%;
                  height: 320px;
                }
              }

              .carouselImg {
                transform: scale(1.03);
              }

              .carouselOverlay {
                position: absolute;
                inset: 0;
                background: linear-gradient(
                  180deg,
                  rgba(0, 0, 0, 0.35) 0%,
                  rgba(0, 0, 0, 0.82) 70%,
                  rgba(0, 0, 0, 0.92) 100%
                );
                opacity: 1;
              }

              .carouselGlow {
                position: absolute;
                inset: 0;
                background: radial-gradient(
                  700px 380px at 35% 35%,
                  rgba(212, 175, 55, 0.18) 0%,
                  rgba(0, 0, 0, 0) 55%
                );
                opacity: 1;
              }

              .edgeFade {
                pointer-events: none;
                position: absolute;
                top: 0;
                bottom: 0;
                width: 48px;
              }
              .edgeFade.left {
                left: 0;
                background: linear-gradient(
                  90deg,
                  rgba(13, 16, 20, 1) 0%,
                  rgba(13, 16, 20, 0) 100%
                );
              }
              .edgeFade.right {
                right: 0;
                background: linear-gradient(
                  270deg,
                  rgba(13, 16, 20, 1) 0%,
                  rgba(13, 16, 20, 0) 100%
                );
              }
            `}</style>

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  if (!selected) return;
                  setStep(2);
                }}
                className="rounded-full px-12 py-3 text-[15px] font-semibold transition"
                style={{
                  background: "#D4AF37",
                  color: "#11151C",
                  boxShadow: "0 10px 30px rgba(212,175,55,0.18)",
                  opacity: selected ? 1 : 0.55,
                  cursor: selected ? "pointer" : "not-allowed",
                }}
                disabled={!selected}
              >
                Suivant
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <Step2
            discipline={selected}
            selectedDate={selectedDate}
            setSelectedDate={(d) => {
              setSelectedDate(d);
              setSelectedSlot(null);
            }}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <Step3
            discipline={selected}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            firstName={firstName}
            lastName={lastName}
            phone={phone}
            email={email}
            emailLocked={emailLocked}
            note={note}
            accept={accept}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setPhone={setPhone}
            setEmail={setEmail}
            setNote={setNote}
            setAccept={setAccept}
          />
        )}
      </div>
    </section>
  );
}

function Step2(props: {
  discipline: DisciplineKey | null;
  selectedDate: Date | null;
  setSelectedDate: (d: Date) => void;
  selectedSlot: string | null;
  setSelectedSlot: (s: string) => void;
  onNext: () => void;
}) {
  const {
    discipline,
    selectedDate,
    setSelectedDate,
    selectedSlot,
    setSelectedSlot,
    onNext,
  } = props;

  const today = startOfDay(new Date());
  const [cursor, setCursor] = useState<Date>(
    selectedDate
      ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
      : new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startPad = mondayIndex(first.getDay());

  const cells: Array<{ date: Date | null; disabled?: boolean }> = [];
  for (let i = 0; i < startPad; i++) cells.push({ date: null });

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    const disabled = startOfDay(d).getTime() < today.getTime();
    cells.push({ date: d, disabled });
  }
  while (cells.length % 7 !== 0) cells.push({ date: null });

  const canNext = Boolean(selectedDate && selectedSlot);

  return (
    <div className="mt-8">
      <div style={{ borderRadius: 22, background: "#0D1014", padding: 14 }}>
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          style={{ padding: 12 }}
        >
          <div>
            <div
              className="text-[12px] font-semibold"
              style={{ color: "#A8B0BD" }}
            >
              Étape 2
            </div>
            <div
              className="mt-1 text-[22px] md:text-[26px] font-extrabold tracking-tight"
              style={{ color: "#F5F7FA" }}
            >
              Choisis une date & un créneau
            </div>
            <div className="mt-2 text-[13px]" style={{ color: "#788291" }}>
              Discipline :{" "}
              <span style={{ color: "#F5F7FA", fontWeight: 800 }}>
                {discipline ?? "—"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCursor(new Date(year, month - 1, 1))}
              className="h-[44px] px-4 rounded-full text-[14px] font-semibold transition"
              style={{ background: "#11151C", color: "#A8B0BD" }}
            >
              ←
            </button>

            <div
              className="text-[14px] font-semibold"
              style={{ color: "#F5F7FA", minWidth: 160, textAlign: "center" }}
            >
              {monthLabel(cursor)}
            </div>

            <button
              type="button"
              onClick={() => setCursor(new Date(year, month + 1, 1))}
              className="h-[44px] px-4 rounded-full text-[14px] font-semibold transition"
              style={{ background: "#11151C", color: "#A8B0BD" }}
            >
              →
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
          <div
            style={{
              borderRadius: 18,
              background: "#11151C",
              padding: 16,
              boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
            }}
          >
            <div className="grid grid-cols-7 gap-2">
              {WEEKDAYS.map((w) => (
                <div
                  key={w}
                  className="text-[12px] font-semibold text-center"
                  style={{ color: "#788291" }}
                >
                  {w}
                </div>
              ))}

              {cells.map((c, idx) => {
                if (!c.date)
                  return <div key={`e-${idx}`} className="h-[44px]" />;

                const d = c.date;
                const disabled = Boolean(c.disabled);
                const isToday = sameDay(d, today);
                const isSelected = selectedDate
                  ? sameDay(d, selectedDate)
                  : false;

                return (
                  <button
                    key={`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`}
                    type="button"
                    disabled={disabled}
                    onClick={() => setSelectedDate(d)}
                    className="h-[44px] rounded-[12px] text-[13px] font-semibold transition"
                    style={{
                      background: isSelected ? "#D4AF37" : "#0D1014",
                      color: isSelected
                        ? "#11151C"
                        : disabled
                          ? "#3B4250"
                          : "#F5F7FA",
                      boxShadow: isSelected
                        ? "0 10px 30px rgba(212,175,55,0.18)"
                        : "none",
                      outline:
                        isToday && !isSelected
                          ? "2px solid rgba(212,175,55,0.55)"
                          : "none",
                      cursor: disabled ? "not-allowed" : "pointer",
                    }}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            style={{
              borderRadius: 18,
              background: "#11151C",
              padding: 18,
              boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
            }}
          >
            <div
              className="text-[14px] font-semibold"
              style={{ color: "#F5F7FA" }}
            >
              Créneaux
            </div>

            <div className="mt-2 text-[12px]" style={{ color: "#788291" }}>
              {selectedDate ? (
                <>
                  Date sélectionnée :{" "}
                  <span style={{ color: "#F5F7FA", fontWeight: 800 }}>
                    {formatDateLabel(selectedDate)}
                  </span>
                </>
              ) : (
                "Choisis une date pour voir les créneaux."
              )}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {SLOTS.map((s) => {
                const active = selectedSlot === s;
                const disabled = !selectedDate;

                return (
                  <button
                    key={s}
                    type="button"
                    disabled={disabled}
                    onClick={() => setSelectedSlot(s)}
                    className="h-[44px] rounded-full text-[13px] font-semibold transition"
                    style={{
                      background: active ? "#D4AF37" : "#0D1014",
                      color: active
                        ? "#11151C"
                        : disabled
                          ? "#3B4250"
                          : "#A8B0BD",
                      cursor: disabled ? "not-allowed" : "pointer",
                      boxShadow: active
                        ? "0 10px 30px rgba(212,175,55,0.18)"
                        : "none",
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onNext}
                disabled={!canNext}
                className="rounded-full px-12 py-3 text-[15px] font-semibold transition"
                style={{
                  background: "#D4AF37",
                  color: "#11151C",
                  boxShadow: "0 10px 30px rgba(212,175,55,0.18)",
                  opacity: canNext ? 1 : 0.55,
                  cursor: canNext ? "pointer" : "not-allowed",
                }}
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step3(props: {
  discipline: DisciplineKey | null;
  selectedDate: Date | null;
  selectedSlot: string | null;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  emailLocked: boolean;
  note: string;
  accept: boolean;
  setFirstName: (v: string) => void;
  setLastName: (v: string) => void;
  setPhone: (v: string) => void;
  setEmail: (v: string) => void;
  setNote: (v: string) => void;
  setAccept: (v: boolean) => void;
}) {
  const {
    discipline,
    selectedDate,
    selectedSlot,
    firstName,
    lastName,
    phone,
    email,
    emailLocked,
    note,
    accept,
    setFirstName,
    setLastName,
    setPhone,
    setEmail,
    setNote,
    setAccept,
  } = props;

  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  const canConfirm =
    Boolean(discipline && selectedDate && selectedSlot) &&
    firstName.trim().length >= 2 &&
    lastName.trim().length >= 2 &&
    phone.trim().length >= 8 &&
    isValidEmail(email) &&
    accept;

  return (
    <div className="mt-8">
      <div style={{ borderRadius: 22, background: "#0D1014", padding: 14 }}>
        <div
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-4"
          style={{ padding: 12 }}
        >
          <div>
            <div
              className="text-[12px] font-semibold"
              style={{ color: "#A8B0BD" }}
            >
              Étape 3
            </div>
            <div
              className="mt-1 text-[22px] md:text-[26px] font-extrabold tracking-tight"
              style={{ color: "#F5F7FA" }}
            >
              Finalise ta réservation
            </div>
            <div className="mt-2 text-[13px]" style={{ color: "#788291" }}>
              Zéro spam. Contact uniquement pour confirmer.
            </div>
          </div>

          {paying && (
            <div
              className="rounded-full px-5 py-2 text-[13px] font-semibold"
              style={{
                background: "rgba(212,175,55,0.10)",
                color: "#E6C76A",
                boxShadow: "0 18px 60px rgba(0,0,0,0.25)",
              }}
            >
              Redirection vers Stripe…
            </div>
          )}
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
          <div
            style={{
              borderRadius: 18,
              background: "#11151C",
              padding: 18,
              boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
            }}
          >
            <div
              className="text-[14px] font-semibold"
              style={{ color: "#F5F7FA" }}
            >
              Tes informations
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
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
              <Field
                label="Téléphone"
                value={phone}
                onChange={setPhone}
                placeholder="Ex: 06 12 34 56 78"
              />

              <div>
                <Field
                  label="Email"
                  value={email}
                  onChange={(v) => {
                    if (emailLocked) return;
                    setEmail(v);
                  }}
                  placeholder={emailLocked ? "" : "Ex: samy@email.com"}
                  type="email"
                  disabled={emailLocked}
                />
                {emailLocked && (
                  <div
                    className="mt-2 text-[12px]"
                    style={{ color: "#788291" }}
                  >
                    Email lié à ton compte — non modifiable.
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3">
              <div
                className="text-[12px] font-semibold"
                style={{ color: "#A8B0BD" }}
              >
                Message (optionnel)
              </div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                className="w-full mt-2 rounded-[14px] px-4 py-3 text-[14px] outline-none"
                style={{
                  background: "#0D1014",
                  color: "#F5F7FA",
                  boxShadow: "0 18px 60px rgba(0,0,0,0.25)",
                  border: "1px solid #232A36",
                }}
                placeholder="Objectif, blessure, préférence…"
              />
            </div>

            <div className="mt-4 flex items-start gap-3">
              <button
                type="button"
                onClick={() => setAccept(!accept)}
                className="mt-[2px] h-[18px] w-[18px] rounded-[5px] transition"
                style={{
                  background: accept ? "#D4AF37" : "#0D1014",
                  boxShadow: accept
                    ? "0 10px 30px rgba(212,175,55,0.18)"
                    : "0 0 0 1px rgba(35,42,54,1)",
                }}
                aria-pressed={accept}
              />
              <div
                className="text-[12px]"
                style={{ color: "#A8B0BD", lineHeight: 1.5 }}
              >
                J’accepte d’être contacté pour la confirmation de la séance.
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={!canConfirm || paying}
                onClick={async () => {
                  if (!discipline || !selectedDate || !selectedSlot) return;

                  setPaying(true);
                  setPayError(null);

                  const payload = {
                    discipline,
                    session_date: toLocalISODate(selectedDate),
                    session_time: selectedSlot,
                    first_name: firstName,
                    last_name: lastName,
                    phone,
                    email,
                    note,
                  };

                  try {
                    const res = await fetch("/api/stripe/checkout", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(payload),
                    });

                    if (res.status === 409) {
                      setPayError(
                        "Créneau déjà réservé. Choisis un autre horaire.",
                      );
                      setPaying(false);
                      return;
                    }

                    const json = (await res.json()) as {
                      url?: string;
                      error?: string;
                    };

                    if (!res.ok || !json.url) {
                      setPayError(json.error ?? "Erreur paiement");
                      setPaying(false);
                      return;
                    }

                    window.location.href = json.url;
                  } catch (e) {
                    setPayError(
                      e instanceof Error ? e.message : "Erreur paiement",
                    );
                    setPaying(false);
                  }
                }}
                className="rounded-full px-12 py-3 text-[15px] font-semibold transition"
                style={{
                  background: "#D4AF37",
                  color: "#11151C",
                  boxShadow: "0 10px 30px rgba(212,175,55,0.18)",
                  opacity: canConfirm && !paying ? 1 : 0.55,
                  cursor: canConfirm && !paying ? "pointer" : "not-allowed",
                }}
              >
                {paying ? "Redirection vers Stripe..." : "Procéder au paiement"}
              </button>
            </div>

            {payError && (
              <div className="mt-3 text-[12px]" style={{ color: "#E74C3C" }}>
                {payError}
              </div>
            )}
          </div>

          <div
            style={{
              borderRadius: 18,
              background: "#11151C",
              padding: 18,
              boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
            }}
          >
            <div
              className="text-[14px] font-semibold"
              style={{ color: "#F5F7FA" }}
            >
              Récapitulatif
            </div>

            <div
              className="mt-4"
              style={{
                borderRadius: 18,
                background: "#0D1014",
                padding: 16,
                border: "1px solid #232A36",
              }}
            >
              <Line label="Discipline" value={discipline ?? "—"} />
              <Line
                label="Date"
                value={selectedDate ? formatDateLabel(selectedDate) : "—"}
              />
              <Line label="Heure" value={selectedSlot ?? "—"} />
              <div
                className="mt-4 h-[1px]"
                style={{ background: "rgba(35,42,54,1)" }}
              />
              <Line label="Prénom" value={firstName.trim() ? firstName : "—"} />
              <Line label="Nom" value={lastName.trim() ? lastName : "—"} />
              <Line label="Téléphone" value={phone.trim() ? phone : "—"} />
              <Line label="Email" value={email.trim() ? email : "—"} />
            </div>

            {!accept && (
              <div className="mt-4 text-[12px]" style={{ color: "#E74C3C" }}>
                ⚠️ Coche l’acceptation pour activer “Procéder au paiement”.
              </div>
            )}
            {email.trim() && !isValidEmail(email) && (
              <div className="mt-2 text-[12px]" style={{ color: "#E74C3C" }}>
                ⚠️ Email invalide.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  const { label, value, onChange, placeholder, type, disabled } = props;

  return (
    <div>
      <div className="text-[12px] font-semibold" style={{ color: "#A8B0BD" }}>
        {label}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type ?? "text"}
        disabled={disabled}
        className="w-full mt-2 rounded-[14px] px-4 py-3 text-[14px] outline-none"
        style={{
          background: disabled ? "rgba(13,16,20,0.75)" : "#0D1014",
          color: "#F5F7FA",
          border: "1px solid #232A36",
          boxShadow: "0 18px 60px rgba(0,0,0,0.25)",
          cursor: disabled ? "not-allowed" : "text",
          opacity: disabled ? 0.9 : 1,
        }}
        placeholder={placeholder}
      />
    </div>
  );
}

function Line(props: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
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
