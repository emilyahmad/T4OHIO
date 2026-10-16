import { supabase } from "./supabase.js";

const BUCKET = "site-images";
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // matches the bucket's limit in supabase/admin.sql

// Uploads an image to the public "site-images" bucket under `folder` and returns { url } or { error }.
export async function uploadImage(file, folder) {
    if (!file.type.startsWith("image/")) return { error: "That file isn't an image." };
    if (file.size > MAX_IMAGE_BYTES) return { error: "Images must be 5 MB or smaller." };

    const extension = file.name.split(".").pop().toLowerCase();
    const path = `${folder}/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, { cacheControl: "31536000" });
    if (error) return { error: error.message };

    return { url: supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl };
}
