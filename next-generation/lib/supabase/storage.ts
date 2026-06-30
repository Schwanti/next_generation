import { createAdminClient } from "./admin";

export async function deleteImageFromUrl(imageUrl: string | null): Promise<void> {
  if (!imageUrl) return;

  try {
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split("/");
    const publicIndex = pathParts.indexOf("public");
    if (publicIndex === -1 || publicIndex + 2 >= pathParts.length) {
      console.warn("deleteImageFromUrl: Ungültige URL-Struktur:", imageUrl);
      return;
    }

    const bucket = pathParts[publicIndex + 1];
    const fileName = pathParts.slice(publicIndex + 2).join("/");

    console.log("deleteImageFromUrl:", { bucket, fileName });

    const admin = createAdminClient();
    const { data, error } = await admin.storage.from(bucket).remove([fileName]);

    if (error) {
      console.error("Fehler beim Löschen des Bildes aus Storage:", error);
    } else {
      console.log("Bild erfolgreich gelöscht:", { bucket, fileName, data });
    }
  } catch (e) {
    console.error("Unerwarteter Fehler beim Löschen des Bildes:", e);
  }
}
