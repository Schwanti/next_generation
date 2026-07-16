import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createAdminClient } from "@/lib/supabase/admin";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email und Passwort sind Pflichtfelder" },
        { status: 400 },
      );
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const { success, remaining, resetInMs } = await rateLimit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Zu viele Login-Versuche. Bitte versuche es später erneut." },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(resetInMs / 1000)),
            "X-RateLimit-Remaining": "0",
          },
        },
      );
    }

    const response = NextResponse.json({ success: true }, {
      headers: {
        "X-RateLimit-Remaining": String(remaining),
      },
    });

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
              request.cookies.set(name, value);
              response.cookies.set(name, value, options);
            });
          },
        },
      },
    );

    const admin = createAdminClient();

    // Bootstrap: ADMIN_EMAIL + ADMIN_PASSWORD creates/upgrades the super admin
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const { error: createError } = await admin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          app_metadata: { role: "super_admin" },
        });

        if (createError) {
          return NextResponse.json(
            { error: "Login fehlgeschlagen" },
            { status: 401 },
          );
        }

        const { error: retryError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (retryError) {
          return NextResponse.json(
            { error: "Login fehlgeschlagen" },
            { status: 401 },
          );
        }
      }

      // Ensure super_admin role in app_metadata
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.app_metadata?.role !== "super_admin") {
        if (!user) {
          return NextResponse.json(
            { error: "Benutzer nicht gefunden" },
            { status: 500 },
          );
        }
        await admin.auth.admin.updateUserById(user.id, {
          app_metadata: { role: "super_admin" },
        });
      }

      return response;
    }

    // Normal login: Supabase Auth + role check via getUser()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      const isUnconfirmed =
        signInError.code === "email_not_confirmed" ||
        signInError.message?.toLowerCase().includes("email not confirmed");

      return NextResponse.json(
        {
          error: isUnconfirmed
            ? "E-Mail wurde noch nicht bestätigt. Bitte prüfe dein Postfach."
            : "Email oder Passwort falsch",
        },
        { status: 401 },
      );
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const role = user?.app_metadata?.role;

    if (role === "pending" || !role) {
      return NextResponse.json(
        { error: "Account wurde noch nicht freigeschaltet" },
        { status: 403 },
      );
    }

    return response;
  } catch (e) {
    console.error("Login route error:", e);
    return NextResponse.json(
      { error: "Anmeldedienst momentan nicht erreichbar. Bitte versuch es später nochmal." },
      { status: 503 },
    );
  }
}
