export function Footer() {
  return (
    <footer id="kontakt" className="footer-section">
      <div className="footer-content">
        <div className="footer-brand">
          <h3 className="footer-title">Next Generation</h3>
          <p className="footer-text">
            Party Musik Live aus Eichstätt
          </p>
        </div>
        <div className="footer-links">
          <h4 className="footer-heading">Kontakt</h4>
          <a href="mailto:info@nextgeneration-live.de" className="footer-link">
            info@nextgeneration-live.de
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
      </div>
    </footer>
  );
}
