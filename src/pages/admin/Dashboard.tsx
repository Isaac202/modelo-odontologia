import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, ExternalLink, Copy, Pencil, Trash2, Check } from "lucide-react";
import { listTenants, deleteTenant, type Tenant } from "../../lib/tenant";

export default function AdminDashboard() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setTenants(await listTenants());
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCopy = async (slug: string, id: string) => {
    const url = `${window.location.origin}/c/${slug}`;
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Excluir o site personalizado de "${name}"? Essa ação não pode ser desfeita.`)) {
      return;
    }
    await deleteTenant(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold text-foreground">Clínicas personalizadas</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Crie um link personalizado pra cada clínica prospectada e mande pra ela.
          </p>
        </div>
        <Link
          to="/admin/new"
          className="inline-flex items-center gap-2 bg-[#0f9b8e] hover:bg-[#0c7a70] text-white font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Nova clínica
        </Link>
      </div>

      {loading ? (
        <p className="text-muted-foreground text-sm">Carregando...</p>
      ) : tenants.length === 0 ? (
        <div className="border border-dashed border-border rounded-2xl p-12 text-center text-muted-foreground">
          Nenhuma clínica cadastrada ainda. Clique em "Nova clínica" pra criar a primeira.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {tenants.map((t) => (
            <div
              key={t.id}
              className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-4 flex-wrap"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: t.primary_color }}
                  />
                  <h2 className="font-semibold text-foreground truncate">{t.clinic_name}</h2>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">/c/{t.slug}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleCopy(t.slug, t.id)}
                  title="Copiar link"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {copiedId === t.id ? <Check className="w-4 h-4 text-[#0f9b8e]" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={`/c/${t.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Ver ao vivo"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  to={`/admin/${t.id}/edit`}
                  title="Editar"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(t.id, t.clinic_name)}
                  title="Excluir"
                  className="p-2 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
