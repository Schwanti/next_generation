import Link from 'next/link';
import { FireIcon, SparklesIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';

const services = [
  {
    id: "festzelt",
    title: "Bierzelt & Kirchweih",
    description: "Klassische Wiesn-Hits und knalliger Partyrock, der die Stimmung zum Kochen bringt.",
    Icon: FireIcon,
    featured: true,
  },
  {
    id: "verein",
    title: "Vereins- & Privatfeiern",
    description: "Geburtstage, Jubiläen, Vereinsfeste – Tanzmusik für alle Generationen, ganz nach Ihren Wünschen.",
    Icon: SparklesIcon,
    featured: false,
  },
  {
    id: "stadtfest",
    title: "Brauerei- & Altstadtfeste",
    description: "Von AC/DC bis zu den aktuellen Charts – Classic Rock und Partykracher für Ihr Publikum.",
    Icon: BuildingLibraryIcon,
    featured: false,
  },
];

export function ServicesPage() {
  return (
    <section id="services" className="services-section">
      <div className="services-header">
        <p className="services-label">Was wir bieten</p>
        <h2 className="services-title">Ihr Anlass, unsere Musik</h2>
        <p className="services-subtitle">
          Egal ob Kirchweih, Vereinsfeier, Brauerei- oder Altstadtfest – wir gestalten
          musikalisch einen unvergesslichen Abend.
        </p>
        <div className="services-stats">
          <div className="stat">
            <span className="stat-number">100+</span>
            <span className="stat-label">Events gespielt</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">8</span>
            <span className="stat-label">Musiker</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">Bayern</span>
            <span className="stat-label">im Herzen</span>
          </div>
        </div>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className={`service-card ${service.featured ? 'featured' : ''}`}>
            {service.featured && <span className="service-badge">Beliebt</span>}
            <div className="service-icon"><service.Icon className="w-8 h-8" /></div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      <p className="services-custom">
        Sie stellen sich etwas anderes vor?{" "}
        <Link href="#kontakt">Kontaktieren Sie uns</Link> und wir planen das Programm
        ganz speziell nach Ihren Wünschen.
      </p>

      <div className="services-cta">
        <p className="cta-text">Bereit für Ihr nächstes Event?</p>
        <div className="services-actions">
          <Link href="#auftritte" className="btn btn-accent">Zu den Auftritten</Link>
          <Link href="#kontakt" className="btn btn-ghost">Anfragen</Link>
        </div>
      </div>
    </section>
  );
}
