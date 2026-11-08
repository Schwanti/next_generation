"use client";

export default function MainError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="state-page container">
      <h1 className="state-title">Etwas ist schiefgelaufen</h1>
      <p className="state-text">
        Leider ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal.
      </p>
      <button onClick={reset} className="btn btn-primary">
        Erneut versuchen
      </button>
    </div>
  );
}
