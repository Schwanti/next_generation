"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="admin-page state-page">
      <h1 className="state-title">Ein Fehler ist aufgetreten</h1>
      <p className="state-text">Bitte versuche es später noch einmal.</p>
      <button onClick={reset} className="btn btn-accent">
        Erneut versuchen
      </button>
    </div>
  );
}
