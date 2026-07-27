"use client";

import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/constants";
import { useCookieConsent } from "@/components/cookie-consent";

export function Footer() {
  const { reopenBanner } = useCookieConsent();

  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-brand">
          <h3 className="footer-title">Next Generation</h3>
          <p className="footer-text">
            Party Musik Live aus Eichstätt
          </p>
        </div>
        <div className="footer-links">
          <h4 className="footer-heading">Kontakt</h4>
          <a href={`mailto:${CONTACT_EMAIL}`} className="footer-link">
            {CONTACT_EMAIL}
          </a>
        </div>
        <div className="footer-social">
          <h4 className="footer-heading">Social Media</h4>
          <a
            href="https://instagram.com/nextgeneration_band"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            @nextgeneration_band
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Next Generation. Alle Rechte vorbehalten.</p>
        <div className="footer-legal">
          <Link href="/impressum" className="footer-legal-link">
            Impressum
          </Link>
          <Link href="/datenschutz" className="footer-legal-link">
            Datenschutz
          </Link>
          <button
            onClick={reopenBanner}
            className="footer-legal-link footer-legal-btn"
            type="button"
          >
            Cookie-Einstellungen
          </button>
        </div>
      </div>
    </footer>
  );
}
