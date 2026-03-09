import Link from 'next/link';

export default function ServicesPage() {
  return (
    <section id="services" className="services-section" style={{ backgroundColor: '#fff', padding: '4rem 2rem', paddingTop: '8rem', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <p className="services-label" style={{ textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
        Leistungen
      </p>
      <h2 className="services-title" style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem' }}>
        Wo wir spielen und was wir können
      </h2>
      <p className="services-subtitle" style={{ maxWidth: 600, margin: '0 auto 3rem' }}>
        Ob Volksfest oder privates Ereignis – wir bringen die richtige Musik mit.
      </p>

      <div className="services-grid" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        <div className="service-card" style={{ flex: '1 1 200px', maxWidth: 300 }}>
          <div className="service-icon" style={{ marginBottom: '1rem' }}>
            {/* Placeholder for TSV icon */}
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <path d="M9 12h6" />
              <path d="M12 9v6" />
            </svg>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Bierzeltmusik</h3>
          <p style={{ fontSize: '0.9rem' }}>Authentische Klänge für dein Fest im Zelt.</p>
        </div>

        <div className="service-card" style={{ flex: '1 1 200px', maxWidth: 300 }}>
          <div className="service-icon" style={{ marginBottom: '1rem' }}>
            {/* Placeholder for wedding music icon (speaker crossed?) */}
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V6l12-3v18z" />
              <line x1="9" y1="9" x2="9" y2="18" />
            </svg>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Hochzeitsmusik</h3>
          <p style={{ fontSize: '0.9rem' }}>Der perfekte Soundtrack für deinen großen Tag.</p>
        </div>

        <div className="service-card" style={{ flex: '1 1 200px', maxWidth: 300 }}>
          <div className="service-icon" style={{ marginBottom: '1rem' }}>
            {/* Placeholder for private events icon */}
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
            </svg>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Privatveranstaltungen</h3>
          <p style={{ fontSize: '0.9rem' }}>Wir spielen auch bei Geburtstagen und Familienfeiern.</p>
        </div>
      </div>

      <div className="services-actions" style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Link href="/auftritte" className="btn" style={{ padding: '0.75rem 1.5rem', background: '#f0f0f0', borderRadius: '0.5rem' }}>
          Auftritte
        </Link>
        <Link href="/mehr" className="btn" style={{ padding: '0.75rem 1.5rem', fontWeight: 600 }}>
          Mehr &#8250;
        </Link>
      </div>
    </section>
  );
}
