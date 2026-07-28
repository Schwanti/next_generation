import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireRole } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { user, error: authError } = await requireRole(["editor", "super_admin"]);
    if (authError) return authError;

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const bucketParam = formData.get("bucket") as string | null;
    const allowedBuckets = ["member-images", "gig-images"];
    const bucket = bucketParam && allowedBuckets.includes(bucketParam)
      ? bucketParam
      : "member-images";

    if (!file) {
      return NextResponse.json({ error: "Keine Datei" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Nur JPEG, PNG, WebP und AVIF erlaubt" }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Datei darf max. 10 MB groß sein" }, { status: 400 });
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const admin = createAdminClient();
    const { error } = await admin.storage
      .from(bucket)
      .upload(fileName, file, {
        contentType: file.type,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: urlData } = admin.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (e) {
    console.error("POST /api/upload error:", e);
    return NextResponse.json(
      { error: "Speicherdienst nicht erreichbar" },
      { status: 503 }
    );
  }
}
