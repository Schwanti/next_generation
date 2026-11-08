"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AuthIndicator } from "@/components/auth-indicator";

interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  function loadUsers() {
    return fetch("/api/admin/users")
      .then((res) => {
        if (res.status === 403) {
          router.push("/admin/unauthorized");
          return null;
        }
        if (res.status === 401) {
          router.push("/admin/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setUsers(data);
      });
  }

  useEffect(() => {
    loadUsers().finally(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleApprove(userId: string) {
    const res = await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role: "editor" }),
    });

    if (res.status === 403) {
      router.push("/admin/unauthorized");
      return;
    }

    if (res.ok) {
      loadUsers();
    }
  }

  async function handleRevoke(userId: string) {
    const res = await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role: "pending" }),
    });

    if (res.status === 403) {
      router.push("/admin/unauthorized");
      return;
    }

    if (res.ok) {
      loadUsers();
    }
  }

  if (loading) return <div className="admin-loading">Lädt...</div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Benutzer verwalten</h1>
        <div className="admin-header-links">
          <button onClick={() => router.push("/admin/auftritte")} className="btn btn-ghost">
            Auftritte
          </button>
          <button onClick={() => router.push("/admin/mitglieder")} className="btn btn-ghost">
            Bandmitglieder
          </button>
          <button onClick={() => router.push("/")} className="btn btn-ghost">
            Zur Website
          </button>
        </div>
        <button
          onClick={async () => {
            const supabase = createClient();
            await supabase.auth.signOut();
            router.push("/");
          }}
          className="btn btn-ghost btn-signout"
        >
          Abmelden
        </button>
        <AuthIndicator />
      </div>

      <div className="admin-list">
        <h2>Alle Benutzer ({users.length})</h2>
        {users.length === 0 && <p className="admin-empty">Keine Benutzer gefunden.</p>}
        {users.map((user) => (
          <div key={user.id} className="admin-item">
            <div className="admin-item-info">
              <strong>{user.email}</strong>
              <span
                className={
                  user.role === "super_admin"
                    ? "admin-badge-featured"
                    : user.role === "editor"
                      ? "auftritte-badge"
                      : "admin-badge-default"
                }
              >
                {user.role === "super_admin"
                  ? "Super Admin"
                  : user.role === "editor"
                    ? "Editor"
                    : "Ausstehend"}
              </span>
              <span className="admin-item-type">
                Registriert: {new Date(user.created_at).toLocaleDateString("de-DE")}
              </span>
            </div>
            <div className="admin-item-actions">
              {user.role === "pending" && (
                <button onClick={() => handleApprove(user.id)} className="admin-edit">
                  Freischalten
                </button>
              )}
              {user.role === "editor" && (
                <button onClick={() => handleRevoke(user.id)} className="admin-delete">
                  Sperren
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
