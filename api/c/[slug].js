function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function fetchTenant(slug) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey || !slug) return null;

  const res = await fetch(
    `${supabaseUrl}/rest/v1/odonto_tenants?slug=eq.${encodeURIComponent(slug)}&select=clinic_name,logo_url`,
    { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` } },
  );
  if (!res.ok) return null;
  const data = await res.json();
  return Array.isArray(data) && data[0] ? data[0] : null;
}

export default async function handler(req, res) {
  const { slug } = req.query;
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host;

  const [tenant, htmlRes] = await Promise.all([
    fetchTenant(Array.isArray(slug) ? slug[0] : slug),
    fetch(`${protocol}://${host}/index.html`),
  ]);

  let html = await htmlRes.text();

  if (tenant) {
    const title = `${tenant.clinic_name} — Odontologia`;
    const description = `Site da ${tenant.clinic_name}: agendamento, especialidades e atendimento odontológico completo pelo WhatsApp.`;
    const url = `${protocol}://${host}/c/${slug}`;

    html = html
      .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
      .replace(
        /(<meta\s+name="description"\s+content=").*?(")/,
        `$1${escapeHtml(description)}$2`,
      )
      .replace(
        /(<meta\s+property="og:title"\s+content=").*?(")/,
        `$1${escapeHtml(title)}$2`,
      )
      .replace(
        /(<meta\s+property="og:description"\s+content=").*?(")/,
        `$1${escapeHtml(description)}$2`,
      )
      .replace(
        "</head>",
        `  <meta property="og:url" content="${escapeHtml(url)}" />\n${
          tenant.logo_url
            ? `  <meta property="og:image" content="${escapeHtml(tenant.logo_url)}" />\n`
            : ""
        }  </head>`,
      );
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
}
