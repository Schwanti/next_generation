import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createAdminClient } from "@/lib/supabase/admin";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const { success } = await rateLimit(request.headers.get("x-forwarded-for") || "unknown");

  if (!success) {
    return NextResponse.json(
      { error: "Zu viele Registrierungsversuche. Bitte versuche es später erneut." },
      { status: 429 },
    );
  }

  const { email, password, privacyAccepted } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email und Passwort sind Pflichtfelder" }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "Passwort muss mindestens 8 Zeichen lang sein" }, { status: 400 });
  }

  if (privacyAccepted !== true) {
    return NextResponse.json({ error: "Bitte akzeptiere die Datenschutzerklärung" }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (data.user) {
    const admin = createAdminClient();
    await admin.auth.admin.updateUserById(data.user.id, {
      app_metadata: { role: "pending", privacy_accepted_at: new Date().toISOString() },
    });
  }

  return response;
}
