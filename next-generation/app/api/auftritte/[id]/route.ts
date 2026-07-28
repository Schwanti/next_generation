import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { deleteImageFromUrl } from "@/lib/supabase/storage";
import { requireRole } from "@/lib/auth";

async function getPerformanceOrNull(id: string) {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin.from("performances").select("id, image_url").eq("id", id).single();
    if (error) {
      console.error("getPerformanceOrNull error:", error);
      return null;
    }
    return data;
  } catch (e) {
    console.error("getPerformanceOrNull connection error:", e);
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

    const performance = await getPerformanceOrNull(id);

    const admin = createAdminClient();
    const { error } = await admin.from("performances").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await deleteImageFromUrl(performance?.image_url ?? null);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DELETE /api/auftritte/[id] error:", e);
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
    const { date, title, venue, event_type, image_url, featured } = body;

    const validString = (v: unknown) => typeof v === "string" && v.trim().length > 0;
    if (!validString(date) || !validString(title) || !validString(venue)) {
      return NextResponse.json({ error: "Datum, Titel und Ort sind Pflichtfelder" }, { status: 400 });
    }

    const old = await getPerformanceOrNull(id);

    const admin = createAdminClient();
    const { data, error } = await admin
      .from("performances")
      .update({ date, title, venue, event_type, image_url, featured })
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
    console.error("PUT /api/auftritte/[id] error:", e);
    return NextResponse.json(
      { error: "Datenbank nicht erreichbar" },
      { status: 503 }
    );
  }
}
