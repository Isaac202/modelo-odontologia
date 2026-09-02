async function verifySupabaseUser(accessToken) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey || !accessToken) return null;

  const res = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { apikey: anonKey, Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const authHeader = req.headers.authorization || "";
  const accessToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const user = await verifySupabaseUser(accessToken);
  if (!user) {
    res.status(401).json({ error: "Não autenticado." });
    return;
  }

  const { clinicName, adminEmail, adminPassword } = req.body || {};
  if (!clinicName || typeof clinicName !== "string") {
    res.status(400).json({ error: "Nome da clínica é obrigatório." });
    return;
  }
  if (adminEmail && (!adminPassword || adminPassword.length < 7)) {
    res.status(400).json({ error: "A senha precisa ter pelo menos 7 caracteres." });
    return;
  }

  const easyBaseUrl = process.env.EASYAPPT_BASE_URL;
  const platformToken = process.env.EASYAPPT_PLATFORM_TOKEN;
  if (!easyBaseUrl || !platformToken) {
    res.status(500).json({ error: "Sistema de agendamentos ainda não configurado." });
    return;
  }

  const base = easyBaseUrl.replace(/\/$/, "");

  try {
    const companyPayload = { name: clinicName };
    if (adminEmail) {
      companyPayload.email = adminEmail;
      companyPayload.password = adminPassword;
    }

    const eaRes = await fetch(`${base}/index.php/api/v1/companies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${platformToken}`,
      },
      body: JSON.stringify(companyPayload),
    });

    const eaData = await eaRes.json().catch(() => null);
    if (!eaRes.ok || !eaData?.slug || !eaData?.apiToken) {
      res.status(502).json({ error: "Não foi possível provisionar o agendamento." });
      return;
    }

    const result = { bookingSlug: eaData.slug, apiToken: eaData.apiToken };

    if (eaData.admin?.username) {
      const adminsRes = await fetch(
        `${base}/index.php/api/v1/admins?q=${encodeURIComponent(eaData.admin.username)}&length=1`,
        { headers: { Authorization: `Bearer ${eaData.apiToken}` } },
      );
      const admins = await adminsRes.json().catch(() => null);
      const admin = Array.isArray(admins) ? admins[0] : null;

      if (adminsRes.ok && admin?.id) {
        result.adminId = admin.id;
        result.adminEmail = eaData.admin.username;
      }
    }

    res.status(200).json(result);
  } catch {
    res.status(502).json({ error: "Não foi possível conectar ao sistema de agendamentos." });
  }
}
