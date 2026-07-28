import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireRole } from "@/lib/auth";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("performances")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error("GET /api/auftritte error:", e);
    return NextResponse.json(
      { error: "Datenbank nicht erreichbar" },
      { status: 503 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { user, error: authError } = await requireRole(["editor", "super_admin"]);
    if (authError) return authError;

    const body = await request.json();
    const { date, title, venue, event_type, image_url, featured } = body;

    const validString = (v: unknown) => typeof v === "string" && v.trim().length > 0;
    if (!validString(date) || !validString(title) || !validString(venue)) {
      return NextResponse.json({ error: "Datum, Titel und Ort sind Pflichtfelder" }, { status: 400 });
    }

    const admin = createAdminClient();
    const { data, error } = await admin
      .from("performances")
      .insert({ date, title, venue, event_type, image_url, featured })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    console.error("POST /api/auftritte error:", e);
    return NextResponse.json(
      { error: "Datenbank nicht erreichbar" },
      { status: 503 }
    );
  }
}
