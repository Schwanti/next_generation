"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/auftritte");
    } else {
      const data = await res.json();
      setError(data.error || "Fehler beim Anmelden");
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            autoComplete="current-password"
          />
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-accent">
            {loading ? "Wird angemeldet..." : "Anmelden"}
          </button>
        </form>
      </div>
    </div>
  );
}
