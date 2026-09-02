import { supabase } from "./supabase";

export type Tenant = {
  id: string;
  created_at: string;
  updated_at: string;
  slug: string;
  clinic_name: string;
  address: string | null;
  phone_display: string | null;
  primary_color: string;
  specialty_keys: string[];
  logo_url: string | null;
  booking_slug: string | null;
};

export type TenantInput = {
  slug: string;
  clinic_name: string;
  address: string;
  phone_display: string;
  primary_color: string;
  specialty_keys: string[];
  logo_url: string | null;
};

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export async function getTenantBySlug(slug: string): Promise<Tenant | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("odonto_tenants")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("Falha ao buscar clínica:", error.message);
    return null;
  }
  return data as Tenant | null;
}

export async function listTenants(): Promise<Tenant[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("odonto_tenants")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Falha ao listar clínicas:", error.message);
    return [];
  }
  return (data as Tenant[]) ?? [];
}

export async function getTenantById(id: string): Promise<Tenant | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from("odonto_tenants").select("*").eq("id", id).maybeSingle();
  if (error) {
    console.error("Falha ao buscar clínica:", error.message);
    return null;
  }
  return data as Tenant | null;
}

export async function createTenant(
  input: TenantInput,
): Promise<{ tenant: Tenant | null; error: string | null }> {
  if (!supabase) return { tenant: null, error: "Supabase não configurado" };
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("odonto_tenants")
    .insert({ ...input, created_by: user?.id })
    .select()
    .single();
  if (error) return { tenant: null, error: error.message };
  return { tenant: data as Tenant, error: null };
}

export async function updateTenant(
  id: string,
  input: TenantInput,
): Promise<{ tenant: Tenant | null; error: string | null }> {
  if (!supabase) return { tenant: null, error: "Supabase não configurado" };
  const { data, error } = await supabase
    .from("odonto_tenants")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) return { tenant: null, error: error.message };
  return { tenant: data as Tenant, error: null };
}

export async function deleteTenant(id: string): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Supabase não configurado" };
  const { error } = await supabase.from("odonto_tenants").delete().eq("id", id);
  return { error: error?.message ?? null };
}

export async function setTenantBookingSlug(
  id: string,
  bookingSlug: string,
): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Supabase não configurado" };
  const { error } = await supabase
    .from("odonto_tenants")
    .update({ booking_slug: bookingSlug })
    .eq("id", id);
  return { error: error?.message ?? null };
}

export type TenantSecrets = {
  tenant_id: string;
  booking_api_token: string;
  booking_admin_id: number | null;
  booking_admin_email: string | null;
};

export async function getTenantSecrets(tenantId: string): Promise<TenantSecrets | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("odonto_tenant_secrets")
    .select("*")
    .eq("tenant_id", tenantId)
    .maybeSingle();
  if (error) {
    console.error("Falha ao buscar credenciais de agendamento:", error.message);
    return null;
  }
  return data as TenantSecrets | null;
}

export async function saveTenantSecrets(
  secrets: TenantSecrets,
): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Supabase não configurado" };
  const { error } = await supabase.from("odonto_tenant_secrets").upsert(secrets);
  return { error: error?.message ?? null };
}
