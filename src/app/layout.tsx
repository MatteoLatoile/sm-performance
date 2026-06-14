import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import AppLoader from "../app/components/AppLoader";
import Footer from "../app/components/Footer";
import Navbar from "../app/components/Navbar";
import CookieConsent from "./components/CookieConsent";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "SM PERFORMANCE — Coaching sports de combat",
    template: "%s — SM PERFORMANCE",
  },
  description:
    "Coaching sports de combat & performance sur Saint-Étienne et ses alentours. Réservation simple, confirmation rapide.",
  applicationName: "SM PERFORMANCE",
  category: "Sports",
  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "SM PERFORMANCE",
    title: "SM PERFORMANCE — Coaching sports de combat",
    description:
      "Coaching sports de combat & performance sur Saint-Étienne et ses alentours. Réserve ta séance en quelques clics.",
    images: [
      {
        url: "/images/bg-hero.png",
        width: 1200,
        height: 630,
        alt: "SM PERFORMANCE — Coaching sports de combat",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SM PERFORMANCE — Coaching sports de combat",
    description:
      "Coaching sports de combat & performance sur Saint-Étienne et ses alentours. Réserve ta séance.",
    images: ["/images/bg-hero.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/logo.png",
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#11151C",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "SM PERFORMANCE",
    description:
      "Coaching sports de combat & performance sur Saint-Étienne et ses alentours.",
    url: siteUrl,
    image: `${siteUrl}/images/bg-hero.png`,
    logo: `${siteUrl}/images/logo.png`,
    areaServed: "Saint-Étienne et alentours",
    email: "smperformances.coaching@gmail.com",
  };

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

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
