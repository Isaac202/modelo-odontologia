import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase =
  typeof window !== "undefined" && supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

if (typeof window !== "undefined" && !supabase) {
  console.warn(
    "Supabase env vars ausentes (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) — personalização por clínica ficará desabilitada.",
  );
}
