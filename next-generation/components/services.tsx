import Link from 'next/link';
import { FireIcon, HeartIcon, SparklesIcon } from '@heroicons/react/24/outline';

const services = [
  {
    id: "bierzelt",
    title: "Bierzelt & Festzelt",
    description: "Stimmung pur! Klassische Wiesn-Hits und Partykracher, die dein Fest unvergesslich machen.",
    Icon: FireIcon,
    featured: true,
  },
  {
    id: "hochzeiten",
    title: "Hochzeiten",
    description: "Von der Trauung bis zur letzten Tanzeinlage – wir machen euren großen Tag perfekt.",
    Icon: HeartIcon,
    featured: false,
  },
  {
    id: "private",
    title: "Private Feiern",
    description: "Geburtstage, Jubiläen, Firmenfeiern – wir spielen für jeden Anlass die richtige Musik.",
    Icon: SparklesIcon,
    featured: false,
  },
];

export function ServicesPage() {
  return (
    <section id="services" className="services-section">
      <div className="services-header">
        <p className="services-label">Was wir bieten</p>
        <h2 className="services-title">Dein Anlass, unsere Musik</h2>
        <p className="services-subtitle">
          Ob mega Event oder intime Feier – wir liefern den Sound, der begeistert.
        </p>
        <div className="services-stats">
          <div className="stat">
            <span className="stat-number">100+</span>
            <span className="stat-label">Events gespielt</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">6</span>
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

      <div className="services-cta">
        <p className="cta-text">Bereit für dein nächstes Event?</p>
        <div className="services-actions">
          <Link href="/auftritte" className="btn btn-services btn-primary">Zu den Auftritten</Link>
          <Link href="/kontakt" className="btn btn-services">Anfragen</Link>
        </div>
      </div>
    </section>
  );
}
