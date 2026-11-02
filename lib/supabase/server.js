import { createClient } from "@supabase/supabase-js";

/**
 * Membuat koneksi Supabase di sisi server untuk pengunjung menggunakan SUPABASE_SECRET_KEY.
 * Digunakan untuk membaca katalog dan detail produk (melewati RLS).
 */
export function createServerClient() {
  const rawUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!rawUrl || !supabaseSecretKey) {
    throw new Error(
      "SUPABASE_URL dan SUPABASE_SECRET_KEY wajib diisi di environment variable."
    );
  }

  // Bersihkan URL jika ada akhiran /rest/v1 atau trailing slash
  const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export const createClientServer = createServerClient;
export const getSupabase = createServerClient;

