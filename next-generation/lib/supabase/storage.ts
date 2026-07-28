import { createAdminClient } from "./admin";

export async function deleteImageFromUrl(imageUrl: string | null): Promise<void> {
  if (!imageUrl) return;

  try {
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split("/");
    const publicIndex = pathParts.indexOf("public");
    if (publicIndex === -1 || publicIndex + 2 >= pathParts.length) {
      return;
    }

    const bucket = pathParts[publicIndex + 1];
    const fileName = pathParts.slice(publicIndex + 2).join("/");

    const admin = createAdminClient();
    const { error } = await admin.storage.from(bucket).remove([fileName]);
  } catch (e) {
    console.error(e);
  }
}
