import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

async function requireAuth() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }
  return null;
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await params;

  const admin = createAdminClient();
  const { error } = await admin.from("performances").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await params;
  const body = await request.json();
  const { date, title, venue, event_type, image_url, featured } = body;

  const validString = (v: unknown) => typeof v === "string" && v.trim().length > 0;
  if (!validString(date) || !validString(title) || !validString(venue)) {
    return NextResponse.json({ error: "Datum, Titel und Ort sind Pflichtfelder" }, { status: 400 });
  }

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

  return NextResponse.json(data);
}
