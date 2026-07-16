import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const body = await request.json();
    const { members } = body;

    if (!Array.isArray(members) || members.length === 0) {
      return NextResponse.json({ error: "Ungültige Daten" }, { status: 400 });
    }

    const admin = createAdminClient();

    for (const member of members) {
      const { error } = await admin
        .from("band_members")
        .update({ sort_order: member.sort_order })
        .eq("id", member.id);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("PUT /api/band-members/batch error:", e);
    return NextResponse.json(
      { error: "Datenbank nicht erreichbar" },
      { status: 503 }
    );
  }
}
