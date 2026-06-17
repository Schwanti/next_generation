"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Performance {
  id: number;
  date: string;
  title: string;
  venue: string;
  event_type: string;
  image_url: string | null;
  featured: boolean;
}

export default function AdminAuftritte() {
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [eventType, setEventType] = useState("Festzelt");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  async function loadPerformances() {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
      return;
    }

    const res = await fetch("/api/auftritte");
    const data = await res.json();
    setPerformances(data);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPerformances();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      setImageFile(null);
      setImagePreview(null);
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
          <div className="admin-upload">
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageFile(file);
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
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
