export default function MainLoading() {
  return (
    <div className="state-page" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <span className="visually-hidden">Wird geladen</span>
    </div>
  );
}
