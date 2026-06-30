import Link from "next/link";

export default function AdminUnauthorized() {
  return (
    <div className="admin-login-page">
      <div className="admin-login-card" style={{ textAlign: "center" }}>
        <h1>Kein Zugriff</h1>
        <p style={{ margin: "1.5rem 0", color: "#555", lineHeight: "1.6" }}>
          Du hast keine Berechtigung für diesen Bereich.
          <br />
          Wende dich an einen Administrator.
        </p>
        <Link href="/admin/auftritte" className="btn btn-accent" style={{ display: "inline-block" }}>
          Zu den Auftritten
        </Link>
      </div>
    </div>
  );
}
