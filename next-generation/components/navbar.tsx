"use client";

import Image from "next/image"
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthIndicator } from "@/components/auth-indicator";

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const pendingScroll = useRef<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isHome && pendingScroll.current) {
      const section = pendingScroll.current;
      pendingScroll.current = null;
      requestAnimationFrame(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [isHome]);

  function navigateTo(section: string) {
    setMenuOpen(false);
    if (isHome) {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    } else {
      pendingScroll.current = section;
      router.push("/");
    }
  }

  return (
    <nav className={`nav${scrolled ? " nav--scrolled" : ""}${menuOpen ? " nav--open" : ""}`} aria-label="Hauptnavigation">
      <div className="nav-inner container">
        <div className="nav-logo">
          <Link href="/" aria-label="Next Generation, zur Startseite">
            <Image src="/next_generation_logo.png" alt="Logo" width={80} height={43} priority />
          </Link>
        </div>

        <ul id="nav-menu" className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <li><a href="#hero" className="nav-link" onClick={(e) => { e.preventDefault(); navigateTo("hero"); }}>Startseite</a></li>
          <li><a href="#auftritte" className="nav-link" onClick={(e) => { e.preventDefault(); navigateTo("auftritte"); }}>Auftritte</a></li>
          <li><a href="#band" className="nav-link" onClick={(e) => { e.preventDefault(); navigateTo("band"); }}>Die Band</a></li>
          <li><a href="#gallery" className="nav-link" onClick={(e) => { e.preventDefault(); navigateTo("gallery"); }}>Galerie</a></li>
          <li><a href="#buchung" className="nav-link" onClick={(e) => { e.preventDefault(); navigateTo("buchung"); }}>Ablauf &amp; FAQ</a></li>
        </ul>

        <div className="nav-actions">
          <AuthIndicator />
          <a href="#kontakt" className="nav-btn nav-btn-primary" onClick={(e) => { e.preventDefault(); navigateTo("kontakt"); }}>Buchen</a>
          <button
            className="nav-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </div>
    </nav>
  )
}
