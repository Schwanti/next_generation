import Link from 'next/link';

const services = [
  {
    id: "festzelt",
    title: "Bierzelt & Kirchweih",
    description: "Klassische Wiesn-Hits und knalliger Partyrock, der die Stimmung zum Kochen bringt.",
    featured: true,
  },
  {
    id: "verein",
    title: "Vereins- & Privatfeiern",
    description: "Geburtstage, Jubiläen, Vereinsfeste: Tanzmusik für alle Generationen, ganz nach Ihren Wünschen.",
    featured: false,
  },
  {
    id: "fasching",
    title: "Fasching & Bälle",
    description: "Feuerwehrball, Ball der Vereine oder Rosenmontag: Tanzmusik und Partyrock für die närrische Zeit.",
    featured: false,
  },
  {
    id: "stadtfest",
    title: "Brauerei- & Altstadtfeste",
    description: "Von AC/DC bis zu den aktuellen Charts: Classic Rock und Partykracher für Ihr Publikum.",
    featured: false,
  },
];

export function ServicesPage() {
  return (
    <>
      <section id="services" className="services-section">
        <div className="container">
          <div className="services-header split-head">
            <h2 className="services-title">Ihr Anlass, unsere Musik</h2>
            <p className="services-subtitle lead">
              Egal ob Kirchweih, Vereinsfeier, Brauerei- oder Altstadtfest: wir gestalten
              musikalisch einen unvergesslichen Abend.
            </p>
          </div>

          <ol className="services-grid record">
            {services.map((service, i) => (
              <li key={service.id} className={`service-card record-row${service.featured ? ' featured' : ''}`}>
                <span className="record-num" aria-hidden="true">{i + 1}</span>
                <h3 className="record-title">
                  {service.title}
                </h3>
                <div className="record-body">
                  <p>{service.description}</p>
                  {service.featured && <p className="service-badge">Beliebt</p>}
                </div>
              </li>
            ))}
          </ol>

          <p className="services-custom">
            Sie stellen sich etwas anderes vor?{" "}
            <Link href="#kontakt">Kontaktieren Sie uns</Link> und wir planen das Programm
            ganz speziell nach Ihren Wünschen.
          </p>
        </div>
      </section>

      <section className="repertoire-section" aria-labelledby="repertoire-title">
        <div className="container">
          <h2 id="repertoire-title" className="repertoire-line">
            <span>Von AC/DC</span>
            <span>bis ZZ Top</span>
          </h2>
          <ul className="repertoire-styles">
            <li>Aktuelle Nummern aus den Charts</li>
            <li>Tanzmusik für alle Generationen</li>
            <li>Classic und Cover Rock</li>
            <li>Knalliger Partyrock</li>
          </ul>
        </div>
      </section>

      <section className="figures-section" aria-labelledby="figures-title">
        <div className="container">
          <h2 id="figures-title" className="visually-hidden">Die Band in Zahlen</h2>
          <dl className="services-stats">
            <div className="stat">
              <dt className="stat-label">Events gespielt</dt>
              <dd className="stat-number num">100+</dd>
            </div>
            <div className="stat">
              <dt className="stat-label">Musiker</dt>
              <dd className="stat-number num">8</dd>
            </div>
            <div className="stat">
              <dt className="stat-label">im Herzen</dt>
              <dd className="stat-number">Bayern</dd>
            </div>
          </dl>

          <div className="services-cta">
            <p className="cta-text">Bereit für Ihr nächstes Event?</p>
            <div className="services-actions">
              <Link href="#auftritte" className="btn btn-ghost">Zu den Auftritten</Link>
              <Link href="#kontakt" className="btn btn-primary">Anfragen</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
