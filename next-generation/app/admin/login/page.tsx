"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function getInitialError(): string {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  if (params.get("error") === "service_unavailable") {
    return "Anmeldedienst momentan nicht erreichbar. Bitte versuch es später nochmal.";
  }
  return "";
}

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(getInitialError);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin/auftritte");
      } else {
        const data = await res.json();
        setError(data.error || "Fehler beim Anmelden");
        setLoading(false);
      }
    } catch {
      setError("Anmeldedienst momentan nicht erreichbar. Bitte versuch es später nochmal.");
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1>Admin Login</h1>
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
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-accent">
            {loading ? "Wird angemeldet..." : "Anmelden"}
          </button>
        </form>
        <p className="admin-login-alt">
          Noch kein Account? <Link href="/admin/register">Registrieren</Link>
        </p>
      </div>
    </div>
  );
}
