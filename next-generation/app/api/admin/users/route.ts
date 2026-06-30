import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

async function requireSuperAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.app_metadata?.role !== "super_admin") {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 403 });
  }
  return null;
}

export async function GET() {
  const authError = await requireSuperAdmin();
  if (authError) return authError;

  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.listUsers();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const users = data.users.map((u) => ({
    id: u.id,
    email: u.email,
    role: u.app_metadata?.role || "pending",
    created_at: u.created_at,
  }));

  return NextResponse.json(users);
}

export async function PUT(request: Request) {
  const authError = await requireSuperAdmin();
  if (authError) return authError;

  const body = await request.json();
  const { userId, role } = body;

  if (!userId || !role) {
    return NextResponse.json({ error: "Benutzer-ID und Rolle sind Pflichtfelder" }, { status: 400 });
  }

  if (!["editor", "pending"].includes(role)) {
    return NextResponse.json({ error: "Ungültige Rolle" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.updateUserById(userId, {
    app_metadata: { role },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
