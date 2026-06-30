"use client";

import { useEffect, useState, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AuthIndicator } from "@/components/auth-indicator";
import { ConfirmModal } from "@/components/confirm-modal";
import type { Performance } from "@/types/performance";

export default function AdminAuftritte() {
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [eventType, setEventType] = useState("Festzelt");
  const [featured, setFeatured] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [showDeleteImageModal, setShowDeleteImageModal] = useState(false);
  const router = useRouter();
  const previewUrlRef = useRef<string | null>(null);

  async function loadPerformances() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      setIsSuperAdmin(user?.app_metadata?.role === "super_admin");

      const res = await fetch("/api/auftritte");
      if (!res.ok) throw new Error("Fehler beim Laden");
      const data = await res.json();
      setPerformances(data);
    } catch {
      alert("Fehler beim Laden der Auftritte");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPerformances();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  function resetForm() {
    setDate("");
    setTitle("");
    setVenue("");
    setEventType("Festzelt");
    setFeatured(false);
    setImageFile(null);
    setImagePreview(null);
    setExistingImageUrl(null);
    setEditingId(null);
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
  }

  function handleEditClick(gig: Performance) {
    setDate(gig.date);
    setTitle(gig.title);
    setVenue(gig.venue);
    setEventType(gig.event_type);
    setFeatured(gig.featured);
    setExistingImageUrl(gig.image_url);
    setImagePreview(null);
    setImageFile(null);
    setEditingId(gig.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    resetForm();
  }

  function handleRemoveImage() {
    setShowDeleteImageModal(true);
  }

  function confirmRemoveImage() {
    setShowDeleteImageModal(false);
    setExistingImageUrl(null);
    setImageFile(null);
    setImagePreview(null);
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
      setImageFile(file);
      const url = URL.createObjectURL(file);
      previewUrlRef.current = url;
      setImagePreview(url);
    }
  }

  async function handleImageUpload(file: File): Promise<string | null> {
    const supabase = createClient();
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("gig-images")
      .upload(fileName, file);

    if (error) {
      alert("Fehler beim Hochladen: " + error.message);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("gig-images")
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setUploading(true);
    console.log("handleSubmit CALLED");

    try {
      let imageUrl: string | null = existingImageUrl;
      console.log("handleSubmit state:", { existingImageUrl, imageFile: !!imageFile, editingId, imageUrl });
      if (imageFile) {
        const uploaded = await handleImageUpload(imageFile);
        if (!uploaded) {
          return;
        }
        imageUrl = uploaded;
      }

      const isEditing = editingId !== null;
      const url = isEditing ? `/api/auftritte/${editingId}` : "/api/auftritte";
      const method = isEditing ? "PUT" : "POST";

      const body = JSON.stringify({
        date,
        title,
        venue,
        event_type: eventType,
        image_url: imageUrl,
        featured,
      });
      console.log("Sending PUT body:", body);

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (res.ok) {
        resetForm();
        await loadPerformances();
      } else {
        const err = await res.text();
        console.error("PUT failed:", res.status, err);
      }
    } catch (err) {
      console.error("handleSubmit error:", err);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Wirklich löschen?")) return;

    const res = await fetch(`/api/auftritte/${id}`, { method: "DELETE" });

    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }

    if (res.ok) {
      await loadPerformances();
    }
  }

  if (loading) return <div className="admin-loading">Lädt...</div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Auftritte verwalten</h1>
        <div className="admin-header-links">
          <button onClick={() => router.push("/admin/mitglieder")} className="btn btn-ghost">
            Bandmitglieder
          </button>
          {isSuperAdmin && (
            <button onClick={() => router.push("/admin/users")} className="btn btn-ghost">
              Benutzer
            </button>
          )}
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
          className="btn btn-ghost"
          style={{ marginLeft: "0.5rem", color: "#e74c3c" }}
        >
          Abmelden
        </button>
        <AuthIndicator />
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <h2>{editingId ? "Auftritt bearbeiten" : "Neuen Auftritt hinzufügen"}</h2>
        <div className="admin-form-grid">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <input type="text" placeholder="Titel (z.B. Sommerfest)" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input type="text" placeholder="Veranstaltungsort" value={venue} onChange={(e) => setVenue(e.target.value)} required />
          <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
            <option value="Festzelt">Festzelt</option>
            <option value="Hochzeit">Hochzeit</option>
            <option value="Private Feier">Private Feier</option>
            <option value="Firmenfeier">Firmenfeier</option>
            <option value="Sonstiges">Sonstiges</option>
          </select>
          <label className="admin-checkbox">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Hervorgehoben
          </label>
          <div className="admin-upload">
            <label htmlFor="image-upload" className="btn btn-ghost">
              {imageFile ? "Anderes Bild auswählen" : "Bild auswählen"}
            </label>
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              className="admin-file-input"
              onChange={handleFileSelect}
            />
            {(imagePreview || existingImageUrl) && (
              <div className="admin-image-preview">
                <img
                  src={imagePreview || existingImageUrl || ""}
                  alt="Vorschau"
                  className="admin-preview"
                />
                {existingImageUrl && editingId && (
                  <button type="button" onClick={handleRemoveImage} className="admin-delete-image">
                    Bild löschen
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="admin-form-actions">
            <button type="submit" disabled={uploading} className="btn btn-accent">
              {uploading ? "Wird gespeichert..." : editingId ? "Speichern" : "Hinzufügen"}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancelEdit} className="btn btn-ghost">
                Abbrechen
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="admin-list">
        <h2>Alle Auftritte ({performances.length})</h2>
        {performances.map((gig) => (
          <div key={gig.id} className="admin-item">
            <div className="admin-item-info">
              <span className="admin-item-date">{gig.date}</span>
              <strong>{gig.title}</strong>
              <span>{gig.venue}</span>
              <span className="admin-item-type">{gig.event_type}</span>
              {gig.image_url && <span className="admin-has-image">📷</span>}
              {gig.featured ? <span className="admin-badge-featured">Hervorgehoben</span> : <span className="admin-badge-default">Standard</span>}
            </div>
            <div className="admin-item-actions">
              <button onClick={() => handleEditClick(gig)} className="admin-edit">
                Bearbeiten
              </button>
              <button onClick={() => handleDelete(gig.id)} className="admin-delete">
                Löschen
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        open={showDeleteImageModal}
        title="Bild löschen"
        message="Willst du das Bild wirklich löschen?"
        onConfirm={confirmRemoveImage}
        onCancel={() => setShowDeleteImageModal(false)}
      />
    </div>
  );
}
