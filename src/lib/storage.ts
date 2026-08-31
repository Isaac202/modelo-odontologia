import { supabase } from "./supabase";

const BUCKET = "tenant-logos";
const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];

export function validateLogoFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Formato inválido. Use PNG, JPG, WEBP ou SVG.";
  }
  if (file.size > MAX_SIZE_BYTES) {
    return "Arquivo muito grande. O limite é 2MB.";
  }
  return null;
}

export async function uploadTenantLogo(
  file: File,
  slugHint: string,
): Promise<{ url: string | null; error: string | null }> {
  if (!supabase) return { url: null, error: "Supabase não configurado" };

  const validationError = validateLogoFile(file);
  if (validationError) return { url: null, error: validationError };

  const ext = file.name.split(".").pop() || "png";
  const path = `${slugHint || "clinica"}-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (uploadError) return { url: null, error: uploadError.message };

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, error: null };
}
