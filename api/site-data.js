import { createClient } from "@supabase/supabase-js";

const EMPTY_RESPONSE = { connected: false, services: [], workingPlan: null };

export default async function handler(req, res) {
  const slug = Array.isArray(req.query.slug) ? req.query.slug[0] : req.query.slug;
  if (!slug) {
    res.status(400).json({ error: "Parâmetro slug é obrigatório." });
    return;
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const easyBaseUrl = process.env.EASYAPPT_BASE_URL;

  if (!supabaseUrl || !serviceRoleKey || !easyBaseUrl) {
    res.status(200).json(EMPTY_RESPONSE);
    return;
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  try {
    const { data: tenant } = await supabase
      .from("odonto_tenants")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!tenant) {
      res.status(200).json(EMPTY_RESPONSE);
      return;
    }

    const { data: secrets } = await supabase
      .from("odonto_tenant_secrets")
      .select("booking_api_token")
      .eq("tenant_id", tenant.id)
      .maybeSingle();
    if (!secrets?.booking_api_token) {
      res.status(200).json(EMPTY_RESPONSE);
      return;
    }

    const base = easyBaseUrl.replace(/\/$/, "");
    const headers = { Authorization: `Bearer ${secrets.booking_api_token}` };

    const [servicesRes, providersRes] = await Promise.all([
      fetch(`${base}/index.php/api/v1/services?length=100`, {
        headers,
        signal: AbortSignal.timeout(8000),
      }),
      fetch(`${base}/index.php/api/v1/providers?length=50`, {
        headers,
        signal: AbortSignal.timeout(8000),
      }),
    ]);

    const servicesData = servicesRes.ok ? await servicesRes.json().catch(() => []) : [];
    const providersData = providersRes.ok ? await providersRes.json().catch(() => []) : [];

    const services = Array.isArray(servicesData)
      ? servicesData
          .filter((s) => !s.isPrivate)
          .map((s) => ({ id: s.id, name: s.name, description: s.description || null }))
      : [];

    const providerWithPlan = Array.isArray(providersData)
      ? providersData.find((p) => p.settings?.workingPlan)
      : null;
    const workingPlan = providerWithPlan?.settings?.workingPlan ?? null;

    res.status(200).json({ connected: true, services, workingPlan });
  } catch {
    res.status(200).json(EMPTY_RESPONSE);
  }
}
