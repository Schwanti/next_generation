import type { Metadata } from "next";
import { Anton, Public_Sans } from "next/font/google";
import "./tokens.css";
import "./base.css";
import "./globals.css";
import "./styles.css";
import { CookieConsentProvider, CookieConsentBanner, CookieSettingsButton } from "@/components/cookie-consent";
import { DemoBanner } from "@/components/demo-banner";

const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nextgeneration-live.de"),
  title: {
    default: "Next Generation | Coverband Eichstätt – Bayern",
    template: "%s | Next Generation",
  },
  description:
    "Next Generation – Ihre Coverband für Kirchweih, Bierzelt, Fasching, Vereinsfeier & Altstadtfest in Eichstätt und ganz Bayern. Von AC/DC bis ZZ Top: 8 Musiker, 100+ Events, knalliger Partyrock.",
  keywords: [
    "Coverband Eichstätt",
    "Coverband Bayern",
    "Live-Musik Kirchweih",
    "Partyband buchen",
    "Bierzelt Band",
    "Hochzeitsband Bayern",
    "Partyrock Band",
    "Faschingsband",
    "Band Feuerwehrball",
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
  genre: ["Coverband", "Partyrock", "Rock", "Pop"],
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
    "https://www.facebook.com/nextgenerationlive",
    "https://www.nextgeneration-live.de",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${anton.variable} ${publicSans.variable}`}>
      <body
        className={isDemoMode ? "body-demo-mode" : undefined}
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
