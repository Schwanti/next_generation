import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function requireRole(allowedRoles: string[]) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { user: null, error: NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 }) };
  }
  const role = user.app_metadata?.role as string | undefined;
  if (!role || !allowedRoles.includes(role)) {
    return { user: null, error: NextResponse.json({ error: "Keine Berechtigung" }, { status: 403 }) };
  }
  return { user, error: null };
}
