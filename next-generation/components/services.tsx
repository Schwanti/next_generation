import Link from 'next/link';

const services = [
  {
    id: "festzelt",
    title: "Bierzelt & Kirchweih",
    description: "Wiesn-Hits und knalliger Partyrock, der die Stimmung im Zelt zum Kochen bringt.",
    featured: true,
  },
  {
    id: "verein",
    title: "Vereins- & Privatfeiern",
    description: "Geburtstag, Jubiläum oder Vereinsfest: Tanzmusik für alle Generationen, abgestimmt auf Ihre Gäste.",
    featured: false,
  },
  {
    id: "fasching",
    title: "Fasching & Bälle",
    description: "Feuerwehrball, Ball der Vereine oder Rosenmontag: Tanzmusik und Partyrock bis zum Kehraus.",
    featured: false,
  },
  {
    id: "stadtfest",
    title: "Brauerei- & Altstadtfeste",
    description: "Classic Rock und Partykracher unter freiem Himmel, für ein Publikum, das mitsingt.",
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
              Ob Bierzelt, Ball oder Vereinsfest: Wir spielen, was Ihr Publikum
              auf die Tanzfläche bringt.
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
            Ihr Anlass ist nicht dabei?{" "}
            <Link href="#kontakt">Schreiben Sie uns</Link>, wir stellen das Programm
            passend zu Ihrem Fest zusammen.
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
            <p className="cta-text">Bereit für Ihr nächstes Fest?</p>
            <div className="services-actions">
              <Link href="#auftritte" className="btn btn-ghost">Termine ansehen</Link>
              <Link href="#kontakt" className="btn btn-primary">Anfragen</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
