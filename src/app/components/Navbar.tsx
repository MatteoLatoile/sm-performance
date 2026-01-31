"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { label: "Accueil", href: "/" },
  { label: "Réservation", href: "/reservation" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [show, setShow] = useState(!isHome);

  useEffect(() => {
    // si on change de route, on reset l'état correctement
    if (!isHome) {
      setShow(true);
      return;
    }

    const onScroll = () => {
      const threshold = window.innerHeight; // 100vh
      setShow(window.scrollY >= threshold);
    };

    onScroll(); // init
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const isActiveLink = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  // Si on est sur la home et qu'on n'a pas encore scroll 100vh -> rien afficher
  if (isHome && !show) return null;

  return (
    <header className="w-full bg-[#11151C] border-b border-[#232a36]">
      <div className="mx-auto max-w-6xl px-8">
        <div className="grid grid-cols-[120px_1fr_320px] items-center h-[86px]">
          {/* LEFT: Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/images/logo.png"
              alt="SM"
              className="h-[44px] w-auto"
              draggable={false}
            />
          </Link>

          {/* CENTER: Nav */}
          <nav className="flex items-center justify-center gap-10">
            {links.map((l) => {
              const active = isActiveLink(l.href);

              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={[
                    "text-[14px] tracking-tight transition-colors",
                    active ? "text-[#f5f7fa]" : "text-[#a8b0bd]",
                    "hover:text-[#f5f7fa]",
                  ].join(" ")}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Actions */}
          <div className="flex justify-end items-center gap-3">
            {/* Connexion */}
            <Link
              href="/login"
              className="px-6 py-3 rounded-full text-[14px] font-medium
                         border border-[#232a36] text-[#a8b0bd]
                         hover:text-[#f5f7fa] hover:border-[#d4af37]/40 hover:bg-[#11151c]
                         transition focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40"
            >
              Connexion
            </Link>

            {/* Réserver */}
            <Link
              href="/reservation"
              className="px-10 py-3 rounded-full bg-[#d4af37] text-[#11151c] font-semibold text-[15px]
                         shadow-[0_10px_30px_rgba(212,175,55,0.18)]
                         hover:bg-[#e6c76a] transition
                         focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40"
            >
              Réserver
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
