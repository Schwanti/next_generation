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
  metadataBase: new URL("https://nextgeneration-live.de"),
  title: {
    default: "Next Generation | Coverband Eichstätt – Bayern",
    template: "%s | Next Generation",
  },
  description:
    "Next Generation – Ihre Coverband für Kirchweih, Bierzelt, Vereinsfeier & Altstadtfest in Eichstätt und ganz Bayern. 8 Musiker, 100+ Events, knalliger Partyrock.",
  keywords: [
    "Coverband Eichstätt",
    "Coverband Bayern",
    "Live-Musik Kirchweih",
    "Partyband buchen",
    "Bierzelt Band",
    "Hochzeitsband Bayern",
    "Partyrock Band",
  ],
  openGraph: {
    title: "Next Generation | Coverband Eichstätt – Bayern",
    description: "Party Musik Live aus Eichstätt – Coverband für Hochzeiten, Bierzelte und private Feiern in Bayern.",
    images: [{ url: "/next_generation_logo.png", width: 500, height: 267 }],
    type: "website",
    locale: "de_DE",
    siteName: "Next Generation",
    url: "https://nextgeneration-live.de",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Next Generation",
  url: "https://nextgeneration-live.de",
  image: "/next_generation_logo.png",
  genre: ["Coverband", "Partyrock", "Rock"],
  description: "Party Musik Live aus Eichstätt – Coverband für Hochzeiten, Bierzelte und private Feiern in Bayern.",
  location: {
    "@type": "Place",
    name: "Eichstätt",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Eichstätt",
      addressRegion: "Bayern",
      addressCountry: "DE",
    },
  },
  sameAs: [
    "https://instagram.com/nextgeneration_band",
    "https://www.nextgeneration-live.de",
  ],
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
