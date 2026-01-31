"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  delayMs?: number;
  once?: boolean;
  className?: string;
};

export default function Reveal({
  children,
  delayMs = 0,
  once = true,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else {
          if (!once) setInView(false);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={["reveal", inView ? "is-in" : "", className].join(" ").trim()}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
