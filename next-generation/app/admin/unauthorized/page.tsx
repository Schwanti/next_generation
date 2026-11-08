import Link from "next/link";

export default function AdminUnauthorized() {
  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1>Kein Zugriff</h1>
        <p className="admin-login-text">
          Du hast keine Berechtigung für diesen Bereich.
          <br />
          Wende dich an einen Administrator.
        </p>
        <Link href="/admin/auftritte" className="btn btn-accent btn-block">
          Zu den Auftritten
        </Link>
      </div>
    </div>
  );
}
