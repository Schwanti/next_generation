"use client";

import { useEffect, useState } from "react";
import type { Performance } from "@/types/performance";

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function isPast(dateStr: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateStr + "T00:00:00") < today;
}

export function Auftritte() {
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [showAllPast, setShowAllPast] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/auftritte")
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((data) => {
        setPerformances(data || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const upcoming = performances
    .filter((g) => !isPast(g.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const past = performances
    .filter((g) => isPast(g.date))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const visiblePast = showAllPast ? past : past.slice(0, 3);

  if (loading) return null;

  const header = (subtitle: string) => (
    <div className="auftritte-header split-head">
      <h2 className="auftritte-title">Nächste Termine</h2>
      <p className="auftritte-subtitle lead">{subtitle}</p>
    </div>
  );

  if (error) {
    return (
      <section id="auftritte" className="auftritte-section">
        <div className="container">
          {header("Die Termine konnten gerade nicht geladen werden. Bitte versuch es später nochmal.")}
        </div>
      </section>
    );
  }

  const hasUpcoming = upcoming.length > 0;
  const hasPast = past.length > 0;
  const hasAny = hasUpcoming || hasPast;

  if (!hasAny) {
    return (
      <section id="auftritte" className="auftritte-section">
        <div className="container">
          {header("Derzeit sind keine Termine geplant.")}
          <div className="auftritte-cta">
            <p className="auftritte-empty-text">
              Für Buchungsanfragen kontaktiere uns gerne.
            </p>
            <a href="#kontakt" className="btn btn-primary">Jetzt anfragen</a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="auftritte" className="auftritte-section">
      <div className="container">
        {header("Hier siehst du alle unsere kommenden und vergangenen Auftritte.")}

        <ul className="auftritte-list">
          {upcoming.map((gig) => (
            <li key={gig.id} className={`auftritte-card upcoming${gig.featured ? " featured" : ""}`}>
              <time className="auftritte-date num" dateTime={gig.date}>{formatDate(gig.date)}</time>
              <div className="auftritte-main">
                <h3 className="auftritte-card-title">{gig.title}</h3>
                <p className="auftritte-venue">{gig.venue}</p>
              </div>
              <p className="auftritte-meta">
                <span className="auftritte-type">{gig.event_type}</span>
                <span className="auftritte-badge">Bevorstehend</span>
              </p>
            </li>
          ))}
        </ul>

        {hasPast && (
          <>
            <h3 className="auftritte-past-title">Vergangene Auftritte</h3>
            <ul className="auftritte-list auftritte-list--past">
              {visiblePast.map((gig) => (
                <li key={gig.id} className={`auftritte-card past${gig.featured ? " featured" : ""}`}>
                  <time className="auftritte-date num" dateTime={gig.date}>{formatDate(gig.date)}</time>
                  <div className="auftritte-main">
                    <h4 className="auftritte-card-title">{gig.title}</h4>
                    <p className="auftritte-venue">{gig.venue}</p>
                  </div>
                  <p className="auftritte-meta">
                    <span className="auftritte-type">{gig.event_type}</span>
                    <span className="auftritte-badge past-badge">Vergangen</span>
                  </p>
                  {gig.image_url && (
                    <img
                      src={gig.image_url}
                      alt={`${gig.title} - ${gig.venue}`}
                      className="auftritte-image"
                      loading="lazy"
                    />
                  )}
                </li>
              ))}
            </ul>
            {past.length > 3 && (
              <div className="auftritte-toggle">
                <button
                  className="btn btn-ghost"
                  onClick={() => setShowAllPast(!showAllPast)}
                  aria-expanded={showAllPast}
                >
                  {showAllPast
                    ? "Weniger anzeigen"
                    : `Alle ${past.length} anzeigen`}
                </button>
              </div>
            )}
          </>
        )}

        <div className="auftritte-cta">
          <p className="cta-text">Lust uns zu buchen?</p>
          <a href="#kontakt" className="btn btn-primary">Jetzt anfragen</a>
        </div>
      </div>
    </section>
  );
}
