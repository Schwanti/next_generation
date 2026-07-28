"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="admin-page" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Ein Fehler ist aufgetreten</h1>
      <p style={{ color: "#888", marginBottom: "2rem" }}>Bitte versuche es später noch einmal.</p>
      <button onClick={reset} className="btn btn-accent">
        Erneut versuchen
      </button>
    </div>
  );
}
