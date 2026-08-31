import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  createTenant,
  updateTenant,
  getTenantById,
  slugify,
  type TenantInput,
} from "../../lib/tenant";
import { specialties, ALL_SPECIALTY_KEYS } from "../../lib/specialties";
import { isValidHexColor } from "../../lib/color";
import { DEFAULT_SITE_CONFIG } from "../../context/SiteContext";

export default function TenantForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [clinicName, setClinicName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [address, setAddress] = useState("");
  const [phoneDisplay, setPhoneDisplay] = useState(DEFAULT_SITE_CONFIG.phoneDisplay);
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_SITE_CONFIG.primaryColor);
  const [specialtyKeys, setSpecialtyKeys] = useState<string[]>(ALL_SPECIALTY_KEYS);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getTenantById(id).then((tenant) => {
      if (!tenant) {
        setError("Clínica não encontrada.");
        setLoading(false);
        return;
      }
      setClinicName(tenant.clinic_name);
      setSlug(tenant.slug);
      setSlugTouched(true);
      setAddress(tenant.address ?? "");
      setPhoneDisplay(tenant.phone_display ?? DEFAULT_SITE_CONFIG.phoneDisplay);
      setPrimaryColor(tenant.primary_color);
      setSpecialtyKeys(tenant.specialty_keys?.length ? tenant.specialty_keys : ALL_SPECIALTY_KEYS);
      setLoading(false);
    });
  }, [id]);

  const handleNameChange = (value: string) => {
    setClinicName(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const toggleSpecialty = (key: string) => {
    setSpecialtyKeys((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const finalSlug = slugify(slug);
    if (!finalSlug) {
      setError("Informe um link válido pra clínica.");
      return;
    }
    if (!isValidHexColor(primaryColor)) {
      setError("A cor principal precisa ser um hex válido, tipo #0f9b8e.");
      return;
    }

    const input: TenantInput = {
      slug: finalSlug,
      clinic_name: clinicName.trim(),
      address: address.trim(),
      phone_display: phoneDisplay.trim(),
      primary_color: primaryColor,
      specialty_keys: specialtyKeys,
    };

    setSaving(true);
    const result = isEdit ? await updateTenant(id!, input) : await createTenant(input);
    setSaving(false);

    if (result.error) {
      setError(
        result.error.includes("duplicate") || result.error.includes("unique")
          ? "Já existe uma clínica com esse link. Escolha outro."
          : result.error,
      );
      return;
    }

    navigate("/admin");
  };

  if (loading) {
    return <p className="text-muted-foreground text-sm">Carregando...</p>;
  }

  return (
    <div className="max-w-2xl">
      <Link
        to="/admin"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Link>

      <h1 className="font-display text-2xl font-semibold text-foreground mb-8">
        {isEdit ? "Editar clínica" : "Nova clínica"}
      </h1>

      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="clinicName">
            Nome da clínica
          </label>
          <input
            id="clinicName"
            required
            value={clinicName}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Ex: Clínica Sorriso BH"
            className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9b8e]/40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="slug">
            Link personalizado
          </label>
          <div className="flex items-center rounded-lg border border-border bg-card overflow-hidden focus-within:ring-2 focus-within:ring-[#0f9b8e]/40">
            <span className="pl-4 text-sm text-muted-foreground whitespace-nowrap">/c/</span>
            <input
              id="slug"
              required
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              placeholder="clinica-sorriso-bh"
              className="w-full bg-transparent px-1 py-2.5 pr-4 text-sm focus:outline-none"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            Link final: {window.location.origin}/c/{slugify(slug) || "..."}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="address">
            Endereço
          </label>
          <input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Rua Exemplo, 123 — Bairro, Cidade - UF"
            className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9b8e]/40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="phone">
            Telefone exibido no site
          </label>
          <input
            id="phone"
            value={phoneDisplay}
            onChange={(e) => setPhoneDisplay(e.target.value)}
            placeholder="(11) 91234-5678"
            className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9b8e]/40"
          />
          <p className="text-xs text-muted-foreground mt-1.5">
            É só exibição — os botões de WhatsApp do site continuam abrindo conversa com a Oliveira &
            Co.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="color">
            Cor principal
          </label>
          <div className="flex items-center gap-3">
            <input
              id="color"
              type="color"
              value={isValidHexColor(primaryColor) ? primaryColor : "#0f9b8e"}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-11 h-11 rounded-lg border border-border cursor-pointer bg-card"
            />
            <input
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              placeholder="#0f9b8e"
              className="w-32 rounded-lg border border-border bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9b8e]/40"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Especialidades oferecidas</label>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {specialties.map((s) => (
              <label
                key={s.key}
                className="flex items-center gap-2.5 border border-border rounded-lg px-3.5 py-2.5 text-sm cursor-pointer hover:bg-muted transition-colors"
              >
                <input
                  type="checkbox"
                  checked={specialtyKeys.includes(s.key)}
                  onChange={() => toggleSpecialty(s.key)}
                  className="accent-[#0f9b8e]"
                />
                {s.title}
              </label>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#0f9b8e] hover:bg-[#0c7a70] text-white font-semibold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-60"
          >
            {saving ? "Salvando..." : isEdit ? "Salvar alterações" : "Criar clínica"}
          </button>
        </div>
      </form>
    </div>
  );
}
