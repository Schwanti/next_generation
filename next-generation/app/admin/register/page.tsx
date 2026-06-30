"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

export default function AdminRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
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
          <p style={{ marginBottom: "1.5rem", color: "#555", lineHeight: "1.6" }}>
            Dein Account wurde angelegt. Bitte bestätige zuerst deine E-Mail
            (Link im Postfach), sobald ein Admin dich freigeschaltet hat,
            kannst du dich anmelden.
          </p>
          <Link href="/admin/login" className="btn btn-accent" style={{ textAlign: "center", display: "block" }}>
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
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-accent">
            {loading ? "Wird registriert..." : "Registrieren"}
          </button>
        </form>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#888", textAlign: "center" }}>
          Bereits registriert? <Link href="/admin/login" style={{ color: "#e53e1a" }}>Zum Login</Link>
        </p>
      </div>
    </div>
  );
}
