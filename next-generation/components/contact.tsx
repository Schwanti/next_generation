import { BOOKING_EMAIL, CONTACT_EMAIL, MAILTO_HREF } from "@/lib/constants";
import { BookingForm } from "@/components/booking-form";

export function ContactSection() {
  return (
    <section id="kontakt" className="contact-section">
      <div className="container">
        <h2 className="contact-title">
          <span>Lust auf Live-Musik?</span>
          <span>Dann buch uns!</span>
        </h2>
        <p className="contact-subtitle lead">
          Schreib uns einfach eine Nachricht. Wir melden uns innerhalb von 24 Stunden
          mit einem unverbindlichen Angebot.
        </p>

        <div className="contact-grid">
          <div className="contact-aside">
            <div className="contact-card contact-card--mail">
              <h3>Lieber direkt per E-Mail?</h3>
              <p>
                Einfach eine kurze Nachricht mit Veranstaltungsart, Datum und Ort. Wir
                kümmern uns um den Rest.
              </p>
              <a href={MAILTO_HREF} className="contact-mail-link">
                {BOOKING_EMAIL}
              </a>
              <p className="contact-email">Allgemeine Fragen: {CONTACT_EMAIL}</p>
            </div>

            <div className="contact-card">
              <h3>Auf Instagram folgen</h3>
              <p>
                Verpass keine Updates und sieh dir unsere aktuellen Storys, Beiträge und
                Backstage-Einblicke an.
              </p>
              <a
                href="https://instagram.com/nextgeneration_band"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light"
              >
                Zu Instagram
              </a>
            </div>

            <ul className="contact-facts">
              <li>Unverbindliche Anfrage</li>
              <li>Flexible Programmgestaltung</li>
            </ul>
          </div>

          <BookingForm />
        </div>
      </div>
    </section>
  );
}
