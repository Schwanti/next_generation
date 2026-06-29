import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("band_members")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

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
  const { name, role, description, image_url, sort_order } = body;

  const validString = (v: unknown) => typeof v === "string" && v.trim().length > 0;
  if (!validString(name) || !validString(role)) {
    return NextResponse.json({ error: "Name und Rolle sind Pflichtfelder" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("band_members")
    .insert({ name, role, description, image_url, sort_order })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
