"use client";

import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";

import { isAdminEmail } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const supabase = useMemo(() => createClient(), []);

  const baseLinks = useMemo(
    () => [
      { label: "Accueil", href: "/" },
      { label: "Réservation", href: "/reservations" },
      { label: "À propos", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    [],
  );

  const [show, setShow] = useState(!isHome);

  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // UI state
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setShow(true);
      return;
    }

    const threshold = window.innerHeight;
    const onScroll = () => setShow(window.scrollY >= threshold);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const isActiveLink = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) return;

      setUser(user ?? null);
      setIsAdmin(isAdminEmail(user?.email));
      setAuthLoading(false);
    };

    init();

    const { data } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, session: Session | null) => {
        const u = session?.user ?? null;
        setUser(u);
        setIsAdmin(isAdminEmail(u?.email));
        setAuthLoading(false);

        // refresh SSR (si tu as des server components dépendants de session)
        router.refresh();
      },
    );

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, [supabase, router]);

  const links = useMemo(() => {
    if (!isAdmin) return baseLinks;
    return [...baseLinks, { label: "Dashboard", href: "/dashboard" }];
  }, [baseLinks, isAdmin]);

  const logout = async () => {
    try {
      setLoggingOut(true);
      setProfileOpen(false);
      setMobileOpen(false);

      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (!res.ok) {
        console.error("Logout failed", await res.text());
        return;
      }

      setUser(null);
      setIsAdmin(false);
      setAuthLoading(false);

      router.refresh();
      router.push("/");
    } finally {
      setLoggingOut(false);
    }
  };

  // Home avant 100vh : rien
  if (isHome && !show) return null;

  return (
    <>
      {/* Spacer */}
      <div style={{ height: 78 }} />

      <header className="fixed top-0 left-0 right-0 z-[60] w-full bg-[#11151C] border-b border-[#232A36]">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="flex items-center justify-between h-[78px]">
            {/* Logo */}
            <Link href="/" className="flex items-center h-[78px]">
              <div className="w-[44px] flex items-center overflow-hidden">
                <img
                  src="/images/logo.png"
                  alt="SM"
                  draggable={false}
                  className="h-full w-full object-contain block"
                />
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center justify-center gap-10">
              {links.map((l) => {
                const active = isActiveLink(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={[
                      "text-[14px] tracking-tight transition-colors",
                      active ? "text-[#F5F7FA]" : "text-[#A8B0BD]",
                      "hover:text-[#F5F7FA]",
                    ].join(" ")}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop actions */}
            <div className="hidden md:flex justify-end items-center gap-3">
              {!user ? (
                <Link
                  href="/login"
                  className={[
                    "px-6 py-3 rounded-full text-[14px] font-medium transition",
                    "border border-[#232A36]",
                    "text-[#A8B0BD]",
                    "hover:text-[#F5F7FA] hover:bg-[#11151C] hover:border-[#D4AF37]",
                  ].join(" ")}
                >
                  Connexion
                </Link>
              ) : (
                <div
                  className="relative"
                  onMouseEnter={() => setProfileOpen(true)}
                  onMouseLeave={() => setProfileOpen(false)}
                >
                  <button
                    type="button"
                    className={[
                      "h-[44px] w-[44px] rounded-full grid place-items-center transition",
                      "border border-[#232A36]",
                      "text-[#A8B0BD] hover:text-[#F5F7FA] hover:border-[#D4AF37]",
                    ].join(" ")}
                    aria-label="Profil"
                    onClick={() => setProfileOpen((v) => !v)}
                  >
                    <FaUserCircle size={22} />
                  </button>

                  {/* Pont invisible (évite que le hover se coupe) */}
                  <div className="absolute right-0 top-full h-2 w-[220px]" />

                  <div
                    className={[
                      "absolute right-0 top-full mt-2 w-[220px] rounded-[18px] border border-[#232A36] p-2",
                      "bg-[#0D1014] shadow-[0_30px_120px_rgba(0,0,0,0.55)]",
                      "transition",
                      profileOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-1 pointer-events-none",
                    ].join(" ")}
                  >
                    <div className="px-3 py-2 text-[12px] text-[#788291]">
                      {user.email}
                    </div>

                    {isAdmin && !authLoading && (
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="block px-3 py-2 rounded-[14px] text-[13px] font-semibold text-[#F5F7FA] hover:bg-[#11151C] transition"
                      >
                        Dashboard
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={logout}
                      disabled={loggingOut}
                      className={[
                        "w-full mt-1 px-3 py-2 rounded-[14px] text-[13px] font-semibold transition flex items-center gap-2 justify-center",
                        "border border-[#232A36]",
                        "text-[#F5F7FA] hover:border-[#D4AF37] hover:bg-[#11151C]",
                        loggingOut ? "opacity-60 cursor-not-allowed" : "",
                      ].join(" ")}
                    >
                      <FiLogOut />
                      {loggingOut ? "Déconnexion..." : "Déconnexion"}
                    </button>
                  </div>
                </div>
              )}

              <Link
                href="/reservations"
                className={[
                  "px-10 py-3 rounded-full text-[15px] font-semibold transition",
                  "bg-[#D4AF37] text-[#11151C]",
                  "shadow-[0_10px_30px_rgba(212,175,55,0.18)]",
                  "hover:bg-[#E6C76A]",
                ].join(" ")}
              >
                Réserver
              </Link>
            </div>

            {/* Mobile burger */}
            <button
              type="button"
              className="md:hidden h-[44px] w-[44px] rounded-full grid place-items-center border border-[#232A36] text-[#F5F7FA]"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden pb-5">
              <div className="mt-2 rounded-[18px] border border-[#232A36] bg-[#0D1014] p-3">
                <nav className="flex flex-col">
                  {links.map((l) => {
                    const active = isActiveLink(l.href);
                    return (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => setMobileOpen(false)}
                        className={[
                          "px-3 py-3 rounded-[14px] text-[14px] transition",
                          active ? "text-[#F5F7FA]" : "text-[#A8B0BD]",
                          "hover:bg-[#11151C] hover:text-[#F5F7FA]",
                        ].join(" ")}
                      >
                        {l.label}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-3 flex flex-col gap-2">
                  {!user ? (
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="w-full text-center px-6 py-3 rounded-full text-[14px] font-medium transition border border-[#232A36] text-[#A8B0BD] hover:text-[#F5F7FA] hover:border-[#D4AF37]"
                    >
                      Connexion
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={logout}
                      disabled={loggingOut}
                      className="w-full px-6 py-3 rounded-full text-[14px] font-semibold transition border border-[#232A36] text-[#F5F7FA] hover:border-[#D4AF37]"
                    >
                      {loggingOut ? "Déconnexion..." : "Déconnexion"}
                    </button>
                  )}

                  <Link
                    href="/reservations"
                    onClick={() => setMobileOpen(false)}
                    className="w-full text-center px-10 py-3 rounded-full text-[15px] font-semibold transition bg-[#D4AF37] text-[#11151C] hover:bg-[#E6C76A]"
                  >
                    Réserver
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
