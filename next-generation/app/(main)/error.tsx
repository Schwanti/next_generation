"use client";

export default function MainError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#1a0a2e" }}>Etwas ist schiefgelaufen</h1>
      <p style={{ color: "#666", marginBottom: "2rem", maxWidth: "500px" }}>
        Leider ist ein Fehler aufgetreten. Bitte versuche es später noch einmal.
      </p>
      <button onClick={reset} className="btn btn-primary">
        Erneut versuchen
      </button>
    </div>
  );
}
