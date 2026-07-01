"use client";

export function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="confirm-modal-actions">
          <button onClick={onCancel} className="btn btn-ghost">
            Abbrechen
          </button>
          <button onClick={onConfirm} className="btn btn-accent">
            Löschen
          </button>
        </div>
      </div>
    </div>
  );
}
