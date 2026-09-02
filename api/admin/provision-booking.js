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

  const { clinicName } = req.body || {};
  if (!clinicName || typeof clinicName !== "string") {
    res.status(400).json({ error: "Nome da clínica é obrigatório." });
    return;
  }

  const easyBaseUrl = process.env.EASYAPPT_BASE_URL;
  const platformToken = process.env.EASYAPPT_PLATFORM_TOKEN;
  if (!easyBaseUrl || !platformToken) {
    res.status(500).json({ error: "Sistema de agendamentos ainda não configurado." });
    return;
  }

  try {
    const eaRes = await fetch(`${easyBaseUrl.replace(/\/$/, "")}/index.php/api/v1/companies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${platformToken}`,
      },
      body: JSON.stringify({ name: clinicName }),
    });

    const eaData = await eaRes.json().catch(() => null);
    if (!eaRes.ok || !eaData?.slug) {
      res.status(502).json({ error: "Não foi possível provisionar o agendamento." });
      return;
    }

    res.status(200).json({ bookingSlug: eaData.slug });
  } catch {
    res.status(502).json({ error: "Não foi possível conectar ao sistema de agendamentos." });
  }
}
