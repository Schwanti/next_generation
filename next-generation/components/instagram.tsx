"use client";

import Script from "next/script";
import { useCookieConsent } from "./cookie-consent";

export function InstagramGallery() {
  const { consent } = useCookieConsent();
  const marketingAllowed = consent?.marketing ?? false;

  return (
    <section id="gallery" className="instagram-section">
      <div className="container instagram-layout">
        <div className="instagram-header">
          <h2 className="instagram-title">
            <a href="https://instagram.com/nextgeneration_band" target="_blank" rel="noopener noreferrer">
              <span className="visually-hidden">Auf Instagram: </span>@nextgeneration_band
            </a>
          </h2>
          <p className="instagram-subtitle lead">
            Live-Updates, Einblicke hinter die Bühne und Fotos von unseren Festen.
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
                Der Instagram-Feed wird nur geladen, wenn Sie den Marketing-Cookies zustimmen.
              </p>
              <a
                href="https://instagram.com/nextgeneration_band"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost instagram-placeholder-link"
              >
                Zu Instagram
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
