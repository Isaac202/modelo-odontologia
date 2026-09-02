import { supabase } from "./supabase";

export type ProvisionResult = {
  bookingSlug: string | null;
  apiToken: string | null;
  adminId: number | null;
  adminEmail: string | null;
  error: string | null;
};

export async function provisionBooking(
  clinicName: string,
  adminEmail?: string,
  adminPassword?: string,
): Promise<ProvisionResult> {
  const empty: ProvisionResult = {
    bookingSlug: null,
    apiToken: null,
    adminId: null,
    adminEmail: null,
    error: null,
  };

  if (!supabase) return { ...empty, error: "Supabase não configurado" };

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return { ...empty, error: "Sessão expirada. Faça login novamente." };

  try {
    const res = await fetch("/api/admin/provision-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ clinicName, adminEmail, adminPassword }),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.bookingSlug) {
      return { ...empty, error: data?.error ?? "Falha ao conectar ao sistema de agendamentos." };
    }
    return {
      bookingSlug: data.bookingSlug,
      apiToken: data.apiToken ?? null,
      adminId: data.adminId ?? null,
      adminEmail: data.adminEmail ?? null,
      error: null,
    };
  } catch {
    return { ...empty, error: "Falha ao conectar ao sistema de agendamentos." };
  }
}

export async function createBookingAdmin(
  apiToken: string,
  clinicName: string,
  email: string,
  password: string,
): Promise<{ adminId: number | null; error: string | null }> {
  const base = import.meta.env.VITE_EASYAPPT_BASE_URL as string | undefined;
  if (!base) return { adminId: null, error: "Sistema de agendamento não configurado." };

  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/index.php/api/v1/admins`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        firstName: "Admin",
        lastName: clinicName,
        email,
        settings: { username: email, password },
      }),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.id) {
      return { adminId: null, error: "Não foi possível criar o acesso." };
    }
    return { adminId: data.id, error: null };
  } catch {
    return { adminId: null, error: "Não foi possível criar o acesso." };
  }
}

export async function resetBookingPassword(
  apiToken: string,
  adminId: number,
  newPassword: string,
): Promise<{ error: string | null }> {
  const base = import.meta.env.VITE_EASYAPPT_BASE_URL as string | undefined;
  if (!base) return { error: "Sistema de agendamento não configurado." };

  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/index.php/api/v1/admins/${adminId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({ settings: { password: newPassword } }),
    });
    if (!res.ok) return { error: "Não foi possível redefinir a senha." };
    return { error: null };
  } catch {
    return { error: "Não foi possível redefinir a senha." };
  }
}

export function bookingUrl(bookingSlug: string): string {
  const base = import.meta.env.VITE_EASYAPPT_BASE_URL as string | undefined;
  if (!base) return "";
  return `${base.replace(/\/$/, "")}/index.php/booking/${bookingSlug}`;
}

export function bookingPanelLoginUrl(): string {
  const base = import.meta.env.VITE_EASYAPPT_BASE_URL as string | undefined;
  if (!base) return "";
  return `${base.replace(/\/$/, "")}/index.php/login`;
}
