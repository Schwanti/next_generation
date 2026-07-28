import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { CONTACT_EMAIL, MAILTO_HREF } from "@/lib/constants";

export function ContactSection() {
  return (
    <section id="kontakt" className="contact-section">
      <div className="contact-header">
        <p className="contact-label">Kontakt</p>
        <h2 className="contact-title">Lust auf Live-Musik? Dann buch uns!</h2>
        <p className="contact-subtitle">
          Schreib uns einfach eine Nachricht – wir melden uns innerhalb von 24 Stunden
          mit einem unverbindlichen Angebot.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-card">
          <div className="contact-card-icon">
            <EnvelopeIcon />
          </div>
          <h3>Per E-Mail anfragen</h3>
          <p>
            Einfach eine kurze Nachricht mit Veranstaltungsart, Datum und Ort – wir
            kümmern uns um den Rest.
          </p>
          <a href={MAILTO_HREF} className="btn btn-accent">
            Jetzt Nachricht senden
          </a>
          <p style={{ fontSize: "0.85rem", color: "#888", marginTop: "0.5rem" }}>
            {CONTACT_EMAIL}
          </p>
        </div>

        <div className="contact-card">
          <div className="contact-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="18" cy="6" r="1" fill="currentColor" />
            </svg>
          </div>
          <h3>Auf Instagram folgen</h3>
          <p>
            Verpass keine Updates und sieh dir unsere aktuellen Storys, Beiträge und
            Backstage-Einblicke an.
          </p>
          <a
            href="https://instagram.com/nextgeneration_band"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            Zu Instagram
          </a>
        </div>
      </div>

      <p style={{ textAlign: "center", fontSize: "0.9rem", color: "#999", marginTop: "2rem" }}>
        ✓ Unverbindliche Anfrage · ✓ Flexible Programmgestaltung
      </p>
    </section>
  );
}
