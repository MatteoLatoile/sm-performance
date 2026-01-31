"use client";

import { useMemo, useState } from "react";

export default function GallerySlider() {
  const slides = useMemo(
    () => [
      "/images/boxe1.webp",
      "/images/boxe2.webp",
      "/images/boxe3.webp",
      "/images/boxe4.webp",
    ],
    [],
  );

  const [index, setIndex] = useState(0);

  const prev = () => setIndex((v) => (v - 1 + slides.length) % slides.length);
  const next = () => setIndex((v) => (v + 1) % slides.length);

  return (
    <div
      className="rounded-[16px] overflow-hidden relative"
      style={{
        background: "#0D1014",
        border: "1px solid #232A36",
        boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
      }}
    >
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        <img
          src={slides[index]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </div>

      <button
        onClick={prev}
        aria-label="Précédent"
        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full flex items-center justify-center transition"
        style={{
          background: "rgba(13,16,20,0.75)",
          border: "1px solid #232A36",
          color: "#A8B0BD",
        }}
      >
        ‹
      </button>

      <button
        onClick={next}
        aria-label="Suivant"
        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full flex items-center justify-center transition"
        style={{
          background: "rgba(13,16,20,0.75)",
          border: "1px solid #232A36",
          color: "#A8B0BD",
        }}
      >
        ›
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Aller à l'image ${i + 1}`}
            className="h-2.5 w-2.5 rounded-full transition"
            style={{
              background: i === index ? "#D4AF37" : "rgba(168,176,189,0.35)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
