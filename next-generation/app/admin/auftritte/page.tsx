"use client";

import { useEffect, useState, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Performance } from "@/types/performance";

export default function AdminAuftritte() {
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [eventType, setEventType] = useState("Festzelt");
  const [featured, setFeatured] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    setUploading(true);

    let imageUrl: string | null = null;
    if (imageFile) {
      imageUrl = await handleImageUpload(imageFile);
      if (!imageUrl) {
        setUploading(false);
        return;
      }
    }

    const res = await fetch("/api/auftritte", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        title,
        venue,
        event_type: eventType,
        image_url: imageUrl,
        featured,
      }),
    });

    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }

    if (res.ok) {
      setDate("");
      setTitle("");
      setVenue("");
      setEventType("Festzelt");
      setFeatured(false);
      setImageFile(null);
      setImagePreview(null);
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
      await loadPerformances();
    }

    setUploading(false);
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
        <button onClick={() => router.push("/")} className="btn btn-ghost">
          Zur Website
        </button>
      </div>

      <form onSubmit={handleAdd} className="admin-form">
        <h2>Neuen Auftritt hinzufügen</h2>
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
              Bild auswählen
            </label>
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              className="admin-file-input"
              onChange={handleFileSelect}
            />
            {imagePreview && <img src={imagePreview} alt="Vorschau" className="admin-preview" />}
          </div>
          <button type="submit" disabled={uploading} className="btn btn-accent">
            {uploading ? "Wird hochgeladen..." : "Hinzufügen"}
          </button>
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
              {gig.featured && <span className="admin-has-image">⭐</span>}
            </div>
            <button onClick={() => handleDelete(gig.id)} className="admin-delete">
              Löschen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
