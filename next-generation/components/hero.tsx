import { NavBar } from "@/components/navbar";
import Image from "next/image";

export function Hero() {

  return (
    <div className="page-wrapper">
      <div className="hero-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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

        <NavBar />

        {/* Hero Content */}
        <div className="hero-content">
            <Image src="/next_generation_logo.png" alt="Logo" width={400} height={400} className="hero-logo" />
            <h1 className="hero-title">
            Party Musik Live aus<br />Eichstätt
            </h1>
            <p className="hero-subtitle">
            Wir machen deine Feier zu einem unvergesslichen Erlebnis.
            Von Bierzelt bis Hochzeit – wir spielen, ihr feiert.
            </p>
            <div className="hero-buttons">
            <a href="#" className="btn btn-primary">Buchen</a>
            <a href="#" className="btn btn-secondary">Mehr</a>
            </div>
        </div>

        {/* Scroll indicator */}
        <a href="#services" className="scroll-indicator" style={{ cursor: 'pointer' }}>
          <svg viewBox="0 0 24 24" strokeWidth="2">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
