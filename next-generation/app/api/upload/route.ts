import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const bucket = formData.get("bucket") as string || "member-images";

  if (!file) {
    return NextResponse.json({ error: "Keine Datei" }, { status: 400 });
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
}
