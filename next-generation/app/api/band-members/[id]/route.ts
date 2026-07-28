import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { deleteImageFromUrl } from "@/lib/supabase/storage";
import { requireRole } from "@/lib/auth";

async function getMemberOrNull(id: string) {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin.from("band_members").select("id, image_url").eq("id", id).single();
    if (error) {
      console.error("getMemberOrNull error:", error);
      return null;
    }
    return data;
  } catch (e) {
    console.error("getMemberOrNull connection error:", e);
    return null;
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error: authError } = await requireRole(["editor", "super_admin"]);
    if (authError) return authError;

    const { id } = await params;

    const member = await getMemberOrNull(id);

    const admin = createAdminClient();
    const { error } = await admin.from("band_members").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await deleteImageFromUrl(member?.image_url ?? null);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DELETE /api/band-members/[id] error:", e);
    return NextResponse.json(
      { error: "Datenbank nicht erreichbar" },
      { status: 503 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error: authError } = await requireRole(["editor", "super_admin"]);
    if (authError) return authError;

    const { id } = await params;
    const body = await request.json();
    const { name, role, description, image_url, sort_order } = body;

    const validString = (v: unknown) => typeof v === "string" && v.trim().length > 0;
    if (!validString(name) || !validString(role)) {
      return NextResponse.json({ error: "Name und Rolle sind Pflichtfelder" }, { status: 400 });
    }

    const old = await getMemberOrNull(id);

    const admin = createAdminClient();
    const { data, error } = await admin
      .from("band_members")
      .update({ name, role, description, image_url, sort_order })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (old?.image_url && old.image_url !== image_url) {
      await deleteImageFromUrl(old.image_url);
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error("PUT /api/band-members/[id] error:", e);
    return NextResponse.json(
      { error: "Datenbank nicht erreichbar" },
      { status: 503 }
    );
  }
}
