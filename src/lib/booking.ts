import { supabase } from "./supabase";

export async function provisionBooking(
  clinicName: string,
): Promise<{ bookingSlug: string | null; error: string | null }> {
  if (!supabase) return { bookingSlug: null, error: "Supabase não configurado" };

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return { bookingSlug: null, error: "Sessão expirada. Faça login novamente." };

  try {
    const res = await fetch("/api/admin/provision-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ clinicName }),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.bookingSlug) {
      return { bookingSlug: null, error: data?.error ?? "Falha ao conectar ao sistema de agendamentos." };
    }
    return { bookingSlug: data.bookingSlug, error: null };
  } catch {
    return { bookingSlug: null, error: "Falha ao conectar ao sistema de agendamentos." };
  }
}

export function bookingUrl(bookingSlug: string): string {
  const base = import.meta.env.VITE_EASYAPPT_BASE_URL as string | undefined;
  if (!base) return "";
  return `${base.replace(/\/$/, "")}/index.php/booking/${bookingSlug}`;
}
