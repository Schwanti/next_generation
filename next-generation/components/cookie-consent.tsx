"use client";

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";

type CookieConsent = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

type StoredConsent = CookieConsent & {
  timestamp: string;
  version: string;
};

type CookieConsentContextType = {
  consent: CookieConsent | null;
  hasConsented: boolean;
  showBanner: boolean;
  giveConsent: (consent: CookieConsent) => void;
  acceptAll: () => void;
  acceptEssentialOnly: () => void;
  reopenBanner: () => void;
  withdrawConsent: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextType | null>(null);

const CONSENT_KEY = "cookie-consent";
const CONSENT_VERSION = "1.0";

const defaultConsent: CookieConsent = {
  essential: true,
  analytics: false,
  marketing: false,
};

const allConsent: CookieConsent = {
  essential: true,
  analytics: true,
  marketing: true,
};

function readStoredConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as StoredConsent;
    if (typeof parsed === "object" && parsed !== null && "essential" in parsed) {
      if (parsed.version !== CONSENT_VERSION) {
        localStorage.removeItem(CONSENT_KEY);
        return null;
      }
      return parsed;
    }
  } catch {
    // invalid data
  }
  return null;
}

function readConsent(): CookieConsent | null {
  const stored = readStoredConsent();
  if (!stored) return null;
  const { timestamp, version, ...consent } = stored;
  return consent;
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(readConsent);
  const [showBanner, setShowBanner] = useState(() => {
    if (typeof window === "undefined") return true;
    return readStoredConsent() === null;
  });

  const giveConsent = useCallback((c: CookieConsent) => {
    try {
      const stored: StoredConsent = {
        ...c,
        timestamp: new Date().toISOString(),
        version: CONSENT_VERSION,
      };
      localStorage.setItem(CONSENT_KEY, JSON.stringify(stored));
    } catch {
      // localStorage unavailable
    }
    setConsent(c);
    setShowBanner(false);
  }, []);

  const acceptAll = useCallback(() => giveConsent(allConsent), [giveConsent]);
  const acceptEssentialOnly = useCallback(() => giveConsent(defaultConsent), [giveConsent]);

  const reopenBanner = useCallback(() => {
    setShowBanner(true);
  }, []);

  const withdrawConsent = useCallback(() => {
    try {
      localStorage.removeItem(CONSENT_KEY);
    } catch {
      // ignore
    }
    setConsent(null);
    setShowBanner(true);
  }, []);

  const value = useMemo(
    () => ({
      consent,
      hasConsented: consent !== null,
      showBanner,
      giveConsent,
      acceptAll,
      acceptEssentialOnly,
      reopenBanner,
      withdrawConsent,
    }),
    [consent, showBanner, giveConsent, acceptAll, acceptEssentialOnly, reopenBanner, withdrawConsent],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
}

export function CookieConsentBanner() {
  const { showBanner, acceptAll, acceptEssentialOnly } = useCookieConsent();

  const descId = "cookie-consent-desc";

  return (
    <div
      className={`cookie-consent-banner${showBanner ? " cookie-consent-banner--visible" : ""}`}
      role="alertdialog"
      aria-label="Cookie-Einstellungen"
      aria-describedby={descId}
      hidden={!showBanner}
    >
      <div className="cookie-consent-content">
        <div className="cookie-consent-text">
          <h3 className="cookie-consent-title">Cookie-Einstellungen</h3>
          <p className="cookie-consent-description" id={descId}>
            Wir nutzen Cookies, um unsere Website nutzerfreundlich zu gestalten.
            Essentielle Cookies sind für den Betrieb notwendig. Marketing-Cookies
            werden benötigt, um den Instagram-Feed anzuzeigen.
            Weitere Informationen findest du in unserer{" "}
            <a href="/datenschutz" className="cookie-consent-link">
              Datenschutzerklärung
            </a>.
          </p>
        </div>
        <div className="cookie-consent-actions">
          <button
            onClick={acceptEssentialOnly}
            className="cookie-consent-btn cookie-consent-btn-secondary"
            type="button"
          >
            Nur essentielle
          </button>
          <button
            onClick={acceptAll}
            className="cookie-consent-btn cookie-consent-btn-primary"
            type="button"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsButton() {
  const { reopenBanner, hasConsented, showBanner } = useCookieConsent();

  if (!hasConsented || showBanner) return null;

  return (
    <button
      onClick={reopenBanner}
      className="cookie-settings-fab"
      type="button"
      aria-label="Cookie-Einstellungen öffnen"
      title="Cookie-Einstellungen ändern"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    </button>
  );
}
