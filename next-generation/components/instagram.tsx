"use client";

import Script from "next/script";
import { useCookieConsent } from "./cookie-consent";

export function InstagramGallery() {
  const { consent } = useCookieConsent();
  const marketingAllowed = consent?.marketing ?? false;

  return (
    <section id="gallery" className="instagram-section">
      <div className="instagram-header">
        <p className="instagram-label">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="18" cy="6" r="1" fill="currentColor" />
          </svg>
          Auf Instagram
        </p>
        <h2 className="instagram-title">
          <a href="https://instagram.com/nextgeneration_band" target="_blank" rel="noopener noreferrer">
            @nextgeneration_band
          </a>
        </h2>
        <p className="instagram-subtitle">
          Folgt uns für Live-Updates, Backstage-Einblicke und mehr
        </p>
      </div>

      <div className="elfsight-container">
        {marketingAllowed ? (
          <>
            <div className="elfsight-app-78e0ede2-0ecf-4056-b829-4a8671b29e0a" data-elfsight-app-lazy></div>
            <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
          </>
        ) : (
          <div className="instagram-placeholder">
            <p>
              Instagram-Feed wird nur geladen, wenn du den Marketing-Cookies zustimmst.
            </p>
            <a
              href="https://instagram.com/nextgeneration_band"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-placeholder-link"
            >
              Besuche uns auf Instagram
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
