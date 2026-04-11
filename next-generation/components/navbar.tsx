"use client";

import Image from "next/image"
import { useState } from "react";

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-logo">
        <Image src="/next_generation_logo.png" alt="Logo" width={80} height={80} />
      </div>

      <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
        <li><a href="#" className="nav-link">Startseite</a></li>
        <li><a href="#band" className="nav-link">Über uns</a></li>
        <li><a href="#" className="nav-link">Auftritte</a></li>
        <li>
          <a href="#" className="nav-link gallery-btn">
            Galerie
            <svg viewBox="0 0 10 6" className="gallery-icon">
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            </svg>
          </a>
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
  )
}