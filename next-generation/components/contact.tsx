import { BOOKING_EMAIL, CONTACT_EMAIL, MAILTO_HREF } from "@/lib/constants";
import { BookingForm } from "@/components/booking-form";

export function ContactSection() {
  return (
    <section id="kontakt" className="contact-section">
      <div className="container">
        <h2 className="contact-title">
          <span>Holen Sie uns</span>
          <span>auf Ihr Fest</span>
        </h2>
        <p className="contact-subtitle lead">
          Schreiben Sie uns, wir melden uns mit einem unverbindlichen Angebot.
        </p>

        <div className="contact-grid">
          <div className="contact-aside">
            <div className="contact-card contact-card--mail">
              <h3>Lieber direkt per E-Mail?</h3>
              <p>
                Veranstaltungsart, Datum und Ort genügen. Um den Rest kümmern wir uns.
              </p>
              <a href={MAILTO_HREF} className="contact-mail-link">
                {BOOKING_EMAIL}
              </a>
              <p className="contact-email">Allgemeine Fragen: {CONTACT_EMAIL}</p>
            </div>

            <div className="contact-card">
              <h3>Folgen Sie uns</h3>
              <p>
                Storys, Beiträge und Einblicke hinter die Bühne auf Instagram.
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
              <li>Programm nach Ihren Wünschen</li>
            </ul>
          </div>

          <BookingForm />
        </div>
      </div>
    </section>
  );
}
