import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("performances")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

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
}
