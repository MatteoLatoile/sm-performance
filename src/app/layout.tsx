import type { ReactNode } from "react";
import AppLoader from "../app/components/AppLoader";
import Footer from "../app/components/Footer";
import Navbar from "../app/components/Navbar";
import CookieConsent from "./components/CookieConsent";
import "./globals.css";

export const metadata = {
  title: "SM PERFORMANCE",
  description: "Coaching sports de combat & performance",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#11151C",
          color: "#F5F7FA",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <AppLoader
          minDurationMs={1400}
          preload={[
            "/images/logo.png",
            "/images/bg-hero.png",
            "/images/boxe1.webp",
            "/images/boxe2.webp",
            "/images/boxe3.webp",
            "/images/boxe4.webp",
          ]}
        >
          <Navbar />
          <main style={{ width: "100%", background: "#11151C" }}>
            {children}
            <CookieConsent />
          </main>
          <Footer />
        </AppLoader>
      </body>
    </html>
  );
}
