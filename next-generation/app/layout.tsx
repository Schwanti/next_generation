import type { Metadata } from "next";
import { Geist, Geist_Mono, Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import "./styles.css";
import { CookieConsentProvider, CookieConsentBanner, CookieSettingsButton } from "@/components/cookie-consent";
import { DemoBanner } from "@/components/demo-banner";

const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Next Generation - Offizielle Webseite",
  description: "Die offizielle Webseite der Band Next Generation, einer Coverband aus der Mitte Bayerns. Hier findest du alle Informationen über die Band, ihre Musik, Auftritte und Neuigkeiten.",
  openGraph: {
    title: "Next Generation - Coverband aus Bayern",
    description: "Party Musik Live aus Eichstätt – Coverband für Hochzeiten, Bierzelte und private Feiern in Bayern.",
    type: "website",
    locale: "de_DE",
    siteName: "Next Generation",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Next Generation",
  genre: "Coverband",
  location: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Eichstätt",
      addressCountry: "DE",
    },
  },
  description: "Party Musik Live aus Eichstätt – Coverband für Hochzeiten, Bierzelte und private Feiern in Bayern.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${barlow.variable} ${barlowCondensed.variable}${isDemoMode ? " body-demo-mode" : ""}`}
      >
        <a href="#main-content" className="skip-link">
          Zum Inhalt springen
        </a>
        {isDemoMode && <DemoBanner />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CookieConsentProvider>
          {children}
          <CookieConsentBanner />
          <CookieSettingsButton />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
