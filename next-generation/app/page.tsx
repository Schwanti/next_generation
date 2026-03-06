"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <div className="page-wrapper">

      <div className="hero-section">
        {/* Background */}
        <div className="background-overlay" />

        {/* Light beams */}
        <div className="light-beam beam-1" />
        <div className="light-beam beam-2" />
        <div className="light-beam beam-3" />

        {/* Floating particles */}
        <div className="particles">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${8 + i * 8}%`,
                width: `${2 + (i % 4)}px`,
                height: `${2 + (i % 4)}px`,
                background: i % 3 === 0 ? 'rgba(255,180,80,0.7)' : i % 3 === 1 ? 'rgba(200,120,255,0.6)' : 'rgba(255,255,255,0.5)',
                animationDuration: `${6 + (i * 1.3)}s`,
                animationDelay: `${i * 0.7}s`,
              }}
            />
          ))}
        </div>

        {/* Navbar */}
        <nav className="nav">
          <div className="nav-logo">
            <Image src="/next_generation_logo.png" alt="Logo" width={80} height={80} />
          </div>

          <ul className="nav-menu">
            <li><a href="#" className="nav-link">Startseite</a></li>
            <li><a href="#" className="nav-link">Über uns</a></li>
            <li><a href="#" className="nav-link">Auftritte</a></li>
            <li>
              <button
                className="nav-link gallery-btn"
                onClick={() => setGalleryOpen(!galleryOpen)}
              >
                Galerie
                <svg viewBox="0 0 10 6" className="gallery-icon">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                </svg>
              </button>
            </li>
          </ul>

          <div className="nav-actions">
            <a href="#" className="nav-btn nav-btn-outline">Kontakt</a>
            <a href="#" className="nav-btn nav-btn-primary">Buchen</a>
          </div>

          <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </nav>

        {/* Hero Content */}
        <div className="hero-content">
          <Image src="/next_generation_logo.png" alt="Logo" width={400} height={400} className="hero-logo" />
          <h1 className="hero-title">
            Party Musik Live aus<br />Eichstätt
          </h1>
          <p className="hero-subtitle">
            Wir bringen authentische bayerische Klänge zu deinem Fest.
            Von Bierzelt bis Hochzeit – wir spielen, ihr feiert.
          </p>
          <div className="hero-buttons">
            <a href="#" className="btn btn-primary">Buchen</a>
            <a href="#" className="btn btn-secondary">Mehr</a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <svg viewBox="0 0 24 24" strokeWidth="2">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}