"use client";

import { useEffect, useState, FormEvent, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createClient } from "@/lib/supabase/client";
import { AuthIndicator } from "@/components/auth-indicator";
import { ConfirmModal } from "@/components/confirm-modal";
import type { BandMember } from "@/types/band-member";

function SortableMember({
  member,
  onEdit,
  onDelete,
}: {
  member: BandMember;
  onEdit: (m: BandMember) => void;
  onDelete: (id: number) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: member.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div ref={setNodeRef} style={style} className="admin-item">
      <div className="admin-item-info">
        <button className="admin-drag-handle" {...attributes} {...listeners}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <circle cx="7" cy="5" r="1.5" />
            <circle cx="13" cy="5" r="1.5" />
            <circle cx="7" cy="10" r="1.5" />
            <circle cx="13" cy="10" r="1.5" />
            <circle cx="7" cy="15" r="1.5" />
            <circle cx="13" cy="15" r="1.5" />
          </svg>
        </button>
        {member.image_url ? (
          <img src={member.image_url} alt={member.name} className="admin-member-thumb" />
        ) : (
          <div className="admin-member-thumb admin-member-placeholder">{initials}</div>
        )}
        <strong>{member.name}</strong>
        <span>{member.role}</span>
        <span className="admin-item-type">{member.description.slice(0, 40)}{member.description.length > 40 ? "..." : ""}</span>
      </div>
      <div className="admin-item-actions">
        <button onClick={() => onEdit(member)} className="admin-edit">
          Bearbeiten
        </button>
        <button onClick={() => onDelete(member.id)} className="admin-delete">
          Löschen
        </button>
      </div>
    </div>
  );
}

export default function AdminMitglieder() {
  const [members, setMembers] = useState<BandMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [showDeleteImageModal, setShowDeleteImageModal] = useState(false);
  const router = useRouter();
  const previewUrlRef = useRef<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  async function loadMembers() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      setIsSuperAdmin(user?.app_metadata?.role === "super_admin");

      const res = await fetch("/api/band-members");
      if (!res.ok) throw new Error("Fehler beim Laden");
      const data = await res.json();
      setMembers(data);
    } catch {
      alert("Fehler beim Laden der Bandmitglieder");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMembers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  function resetForm() {
    setName("");
    setRole("");
    setDescription("");
    setImageFile(null);
    setImagePreview(null);
    setExistingImageUrl(null);
    setEditingId(null);
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
  }

  function handleEditClick(member: BandMember) {
    setName(member.name);
    setRole(member.role);
    setDescription(member.description);
    setExistingImageUrl(member.image_url);
    setImagePreview(null);
    setImageFile(null);
    setEditingId(member.id);
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
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json();
      alert("Fehler beim Hochladen: " + (err.error || "Unbekannter Fehler"));
      return null;
    }

    const data = await res.json();
    return data.url;
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
      const url = isEditing ? `/api/band-members/${editingId}` : "/api/band-members";
      const method = isEditing ? "PUT" : "POST";

      const body = JSON.stringify({
        name,
        role,
        description,
        image_url: imageUrl,
        sort_order: editingId
          ? members.find((m) => m.id === editingId)?.sort_order ?? members.length
          : members.length,
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
        await loadMembers();
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

    const res = await fetch(`/api/band-members/${id}`, { method: "DELETE" });

    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }

    if (res.ok) {
      await loadMembers();
    }
  }

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = members.findIndex((m) => m.id === active.id);
      const newIndex = members.findIndex((m) => m.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;

      const reordered = arrayMove(members, oldIndex, newIndex);
      const updated = reordered.map((m, i) => ({ ...m, sort_order: i }));

      setMembers(updated);

      await fetch("/api/band-members/batch", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          members: updated.map((m) => ({ id: m.id, sort_order: m.sort_order })),
        }),
      });
    },
    [members]
  );

  if (loading) return <div className="admin-loading">Lädt...</div>;

  const memberIds = members.map((m) => m.id);

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Bandmitglieder verwalten</h1>
        <div className="admin-header-links">
          <Link href="/admin/auftritte" className="btn btn-ghost">Auftritte</Link>
          {isSuperAdmin && <Link href="/admin/users" className="btn btn-ghost">Benutzer</Link>}
          <Link href="/" className="btn btn-ghost">Zur Website</Link>
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
        <h2>{editingId ? "Mitglied bearbeiten" : "Neues Mitglied hinzufügen"}</h2>
        <div className="admin-form-grid">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Rolle (z.B. Gesang & Gitarre)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
          <textarea
            placeholder="Beschreibung"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="admin-textarea"
          />
          <div className="admin-upload">
            <label htmlFor="member-image-upload" className="btn btn-ghost">
              {imageFile ? "Anderes Bild auswählen" : "Bild auswählen"}
            </label>
            <input
              type="file"
              accept="image/*"
              id="member-image-upload"
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
        <h2>Alle Mitglieder ({members.length})</h2>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={memberIds} strategy={verticalListSortingStrategy}>
            {members.map((member) => (
              <SortableMember
                key={member.id}
                member={member}
                onEdit={handleEditClick}
                onDelete={handleDelete}
              />
            ))}
          </SortableContext>
        </DndContext>
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
