"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

export default function AdminRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!privacyAccepted) {
      setError("Bitte akzeptiere die Datenschutzerklärung.");
      return;
    }
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, privacyAccepted }),
    });

    if (res.ok) {
      setSuccess(true);
    } else {
      const data = await res.json();
      setError(data.error || "Fehler bei der Registrierung");
    }

    setLoading(false);
  }

  if (success) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-card">
          <h1>Registrierung erfolgreich</h1>
          <p className="admin-login-text">
            Dein Account wurde angelegt. Bitte bestätige zuerst deine E-Mail
            (Link im Postfach), sobald ein Admin dich freigeschaltet hat,
            kannst du dich anmelden.
          </p>
          <Link href="/admin/login" className="btn btn-accent btn-block">
            Zum Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1>Account erstellen</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-Mail-Adresse"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Passwort (mind. 8 Zeichen)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
          />
          <label className="admin-consent">
            <input
              type="checkbox"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
              required
            />
            <span>
              Ich akzeptiere die{" "}
              <a href="/datenschutz" target="_blank" rel="noopener noreferrer">
                Datenschutzerklärung
              </a>
            </span>
          </label>
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-accent">
            {loading ? "Wird registriert..." : "Registrieren"}
          </button>
        </form>
        <p className="admin-login-alt">
          Bereits registriert? <Link href="/admin/login">Zum Login</Link>
        </p>
      </div>
    </div>
  );
}
