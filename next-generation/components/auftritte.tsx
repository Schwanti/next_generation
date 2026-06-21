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

  useEffect(() => {
    fetch("/api/auftritte")
      .then((res) => res.json())
      .then((data) => {
        setPerformances(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const upcoming = performances
    .filter((g) => !isPast(g.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const past = performances
    .filter((g) => isPast(g.date))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const visiblePast = showAllPast ? past : past.slice(0, 3);

  if (loading) return null;

  const hasUpcoming = upcoming.length > 0;
  const hasPast = past.length > 0;
  const hasAny = hasUpcoming || hasPast;

  if (!hasAny) {
    return (
      <section id="auftritte" className="auftritte-section">
        <div className="auftritte-header">
          <p className="auftritte-label">Auftritte</p>
          <h2 className="auftritte-title">Nächste Termine</h2>
          <p className="auftritte-subtitle">
            Derzeit sind keine Termine geplant.
          </p>
          <p className="auftritte-empty-text">
            Für Buchungsanfragen kontaktiere uns gerne.
          </p>
          <a href="#kontakt" className="btn btn-accent">Jetzt anfragen</a>
        </div>
      </section>
    );
  }

  return (
    <section id="auftritte" className="auftritte-section">
      <div className="auftritte-header">
        <p className="auftritte-label">Auftritte</p>
        <h2 className="auftritte-title">Nächste Termine</h2>
        <p className="auftritte-subtitle">
          Hier siehst du alle unsere kommenden und vergangenen Auftritte.
        </p>
      </div>

      <div className="auftritte-list">
        {upcoming.map((gig) => (
          <div key={gig.id} className="auftritte-card upcoming">
            <div className="auftritte-card-top">
              <span className="auftritte-date">{formatDate(gig.date)}</span>
              <span className="auftritte-badge">Bevorstehend</span>
            </div>
            <h3 className="auftritte-card-title">{gig.title}</h3>
            <p className="auftritte-venue">{gig.venue}</p>
            <span className="auftritte-type">{gig.event_type}</span>
          </div>
        ))}
      </div>

      {hasPast && (
        <>
          <h3 className="auftritte-past-title">Vergangene Auftritte</h3>
          <div className="auftritte-list">
            {visiblePast.map((gig) => (
              <div key={gig.id} className="auftritte-card past">
                <div className="auftritte-card-top">
                  <span className="auftritte-date">{formatDate(gig.date)}</span>
                  <span className="auftritte-badge past-badge">Vergangen</span>
                </div>
                <h3 className="auftritte-card-title">{gig.title}</h3>
                <p className="auftritte-venue">{gig.venue}</p>
                <span className="auftritte-type">{gig.event_type}</span>
                {gig.image_url && (
                  <img
                    src={gig.image_url}
                    alt={`${gig.title} - ${gig.venue}`}
                    className="auftritte-image"
                    loading="lazy"
                  />
                )}
              </div>
            ))}
          </div>
          {past.length > 3 && (
            <div className="auftritte-toggle">
              <button
                className="btn btn-ghost"
                onClick={() => setShowAllPast(!showAllPast)}
              >
                {showAllPast
                  ? "Weniger anzeigen"
                  : `Alle vergangenen Auftritte anzeigen (${past.length})`}
              </button>
            </div>
          )}
        </>
      )}

      <div className="auftritte-cta">
        <p className="cta-text">Lust uns zu buchen?</p>
        <a href="#kontakt" className="btn btn-accent">Jetzt anfragen</a>
      </div>
    </section>
  );
}
