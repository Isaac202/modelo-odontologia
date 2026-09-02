import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import {
  createTenant,
  updateTenant,
  getTenantById,
  setTenantBookingSlug,
  getTenantSecrets,
  saveTenantSecrets,
  slugify,
  type TenantInput,
} from "../../lib/tenant";
import { specialties, ALL_SPECIALTY_KEYS } from "../../lib/specialties";
import { isValidHexColor } from "../../lib/color";
import { DEFAULT_SITE_CONFIG } from "../../context/SiteContext";
import { uploadTenantLogo, validateLogoFile } from "../../lib/storage";
import {
  provisionBooking,
  createBookingAdmin,
  resetBookingPassword,
  bookingUrl,
  bookingPanelLoginUrl,
} from "../../lib/booking";

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
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  const [existingLogoUrl, setExistingLogoUrl] = useState<string | null>(null);
  const [bookingSlug, setBookingSlug] = useState<string | null>(null);
  const [bookingWarning, setBookingWarning] = useState<string | null>(null);
  const [bookingApiToken, setBookingApiToken] = useState<string | null>(null);
  const [bookingAdminId, setBookingAdminId] = useState<number | null>(null);
  const [bookingAdminEmail, setBookingAdminEmail] = useState<string | null>(null);
  const [adminEmailInput, setAdminEmailInput] = useState("");
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [resetPasswordInput, setResetPasswordInput] = useState("");
  const [resetPasswordSaving, setResetPasswordSaving] = useState(false);
  const [resetPasswordMessage, setResetPasswordMessage] = useState<string | null>(null);
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
      setExistingLogoUrl(tenant.logo_url ?? null);
      setBookingSlug(tenant.booking_slug ?? null);
      setLoading(false);

      if (tenant.booking_slug) {
        getTenantSecrets(tenant.id).then((secrets) => {
          if (!secrets) return;
          setBookingApiToken(secrets.booking_api_token);
          setBookingAdminId(secrets.booking_admin_id);
          setBookingAdminEmail(secrets.booking_admin_email);
        });
      }
    });
  }, [id]);

  useEffect(() => {
    return () => {
      if (logoPreviewUrl) URL.revokeObjectURL(logoPreviewUrl);
    };
  }, [logoPreviewUrl]);

  const handleNameChange = (value: string) => {
    setClinicName(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const toggleSpecialty = (key: string) => {
    setSpecialtyKeys((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const validationError = validateLogoFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    if (logoPreviewUrl) URL.revokeObjectURL(logoPreviewUrl);
    setLogoFile(file);
    setLogoPreviewUrl(URL.createObjectURL(file));
  };

  const removeLogo = () => {
    if (logoPreviewUrl) URL.revokeObjectURL(logoPreviewUrl);
    setLogoFile(null);
    setLogoPreviewUrl(null);
    setExistingLogoUrl(null);
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
    if (!bookingSlug && adminEmailInput && adminPasswordInput.length < 7) {
      setError("A senha de acesso precisa ter pelo menos 7 caracteres.");
      return;
    }

    setSaving(true);

    let logoUrl = existingLogoUrl;
    if (logoFile) {
      const uploadResult = await uploadTenantLogo(logoFile, finalSlug);
      if (uploadResult.error) {
        setSaving(false);
        setError(uploadResult.error);
        return;
      }
      logoUrl = uploadResult.url;
    }

    const input: TenantInput = {
      slug: finalSlug,
      clinic_name: clinicName.trim(),
      address: address.trim(),
      phone_display: phoneDisplay.trim(),
      primary_color: primaryColor,
      specialty_keys: specialtyKeys,
      logo_url: logoUrl,
    };

    const result = isEdit ? await updateTenant(id!, input) : await createTenant(input);

    if (result.error) {
      setSaving(false);
      setError(
        result.error.includes("duplicate") || result.error.includes("unique")
          ? "Já existe uma clínica com esse link. Escolha outro."
          : result.error,
      );
      return;
    }

    const tenant = result.tenant!;
    if (!bookingSlug) {
      const prov = await provisionBooking(
        tenant.clinic_name,
        adminEmailInput.trim() || undefined,
        adminPasswordInput || undefined,
      );
      if (prov.bookingSlug) {
        await setTenantBookingSlug(tenant.id, prov.bookingSlug);
        if (prov.apiToken) {
          await saveTenantSecrets({
            tenant_id: tenant.id,
            booking_api_token: prov.apiToken,
            booking_admin_id: prov.adminId,
            booking_admin_email: prov.adminEmail,
          });
        }
      } else {
        setBookingWarning(
          "Clínica salva, mas não deu pra conectar ao sistema de agendamentos agora. Edite a clínica de novo pra tentar de novo.",
        );
      }
    }

    setSaving(false);
    navigate("/admin");
  };

  const retryBookingConnection = async () => {
    if (!id) return;
    if (adminEmailInput && adminPasswordInput.length < 7) {
      setBookingWarning("A senha de acesso precisa ter pelo menos 7 caracteres.");
      return;
    }
    setBookingWarning(null);
    setSaving(true);
    const prov = await provisionBooking(
      clinicName.trim(),
      adminEmailInput.trim() || undefined,
      adminPasswordInput || undefined,
    );
    if (prov.bookingSlug) {
      await setTenantBookingSlug(id, prov.bookingSlug);
      setBookingSlug(prov.bookingSlug);
      if (prov.apiToken) {
        await saveTenantSecrets({
          tenant_id: id,
          booking_api_token: prov.apiToken,
          booking_admin_id: prov.adminId,
          booking_admin_email: prov.adminEmail,
        });
        setBookingApiToken(prov.apiToken);
        setBookingAdminId(prov.adminId);
        setBookingAdminEmail(prov.adminEmail);
        setAdminEmailInput("");
        setAdminPasswordInput("");
      }
    } else {
      setBookingWarning(prov.error ?? "Não deu pra conectar ao sistema de agendamentos agora.");
    }
    setSaving(false);
  };

  const handleCreateAccess = async () => {
    if (!id || !bookingApiToken) return;
    if (!adminEmailInput.trim() || adminPasswordInput.length < 7) {
      setBookingWarning("Informe um e-mail e uma senha de pelo menos 7 caracteres.");
      return;
    }
    setBookingWarning(null);
    setSaving(true);
    const { adminId, error: createError } = await createBookingAdmin(
      bookingApiToken,
      clinicName.trim(),
      adminEmailInput.trim(),
      adminPasswordInput,
    );
    if (adminId) {
      await saveTenantSecrets({
        tenant_id: id,
        booking_api_token: bookingApiToken,
        booking_admin_id: adminId,
        booking_admin_email: adminEmailInput.trim(),
      });
      setBookingAdminId(adminId);
      setBookingAdminEmail(adminEmailInput.trim());
      setAdminEmailInput("");
      setAdminPasswordInput("");
    } else {
      setBookingWarning(createError ?? "Não foi possível criar o acesso agora.");
    }
    setSaving(false);
  };

  const handleResetPassword = async () => {
    if (!id || !bookingApiToken || !bookingAdminId) return;
    if (resetPasswordInput.length < 7) {
      setResetPasswordMessage("A senha precisa ter pelo menos 7 caracteres.");
      return;
    }
    setResetPasswordSaving(true);
    setResetPasswordMessage(null);
    const { error: resetError } = await resetBookingPassword(
      bookingApiToken,
      bookingAdminId,
      resetPasswordInput,
    );
    setResetPasswordSaving(false);
    if (resetError) {
      setResetPasswordMessage(resetError);
      return;
    }
    setResetPasswordInput("");
    setResetPasswordMessage("Senha atualizada.");
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
          <label className="block text-sm font-medium text-foreground mb-1.5">Logomarca</label>
          <div className="flex items-center gap-4">
            {logoPreviewUrl || existingLogoUrl ? (
              <div className="relative">
                <img
                  src={logoPreviewUrl ?? existingLogoUrl ?? undefined}
                  alt="Logo da clínica"
                  className="w-16 h-16 rounded-xl object-contain bg-white border border-border"
                />
                <button
                  type="button"
                  onClick={removeLogo}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-foreground text-white flex items-center justify-center"
                  aria-label="Remover logo"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xl border border-dashed border-border flex items-center justify-center text-xs text-muted-foreground text-center px-1">
                Sem logo
              </div>
            )}
            <label className="cursor-pointer text-sm font-medium text-[#0f9b8e] hover:text-[#0c7a70] transition-colors">
              Escolher imagem
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={handleLogoChange}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            PNG, JPG, WEBP ou SVG, até 2MB. Se não enviar, usamos um ícone genérico.
          </p>
        </div>

        {isEdit && bookingSlug && bookingAdminId && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Sistema de agendamento
            </label>
            <div className="flex items-center gap-2.5 text-sm mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-foreground">Conectado</span>
              <span className="text-muted-foreground">— login: {bookingAdminEmail}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <a
                href={bookingUrl(bookingSlug)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#0f9b8e] hover:underline"
              >
                Ver página de agendamento
              </a>
              <a
                href={bookingPanelLoginUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#0f9b8e] hover:underline"
              >
                Entrar no painel
              </a>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="password"
                value={resetPasswordInput}
                onChange={(e) => setResetPasswordInput(e.target.value)}
                placeholder="Nova senha (mín. 7 caracteres)"
                className="w-64 rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9b8e]/40"
              />
              <button
                type="button"
                onClick={handleResetPassword}
                disabled={resetPasswordSaving}
                className="text-sm font-medium text-[#0f9b8e] hover:underline disabled:opacity-60"
              >
                Redefinir senha
              </button>
            </div>
            {resetPasswordMessage && (
              <p className="text-xs text-muted-foreground mt-1.5">{resetPasswordMessage}</p>
            )}
          </div>
        )}

        {isEdit && bookingSlug && !bookingAdminId && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Sistema de agendamento
            </label>
            <div className="flex items-center gap-2.5 text-sm mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-foreground">Conectado</span>
              <span className="text-muted-foreground">— sem login de acesso ainda</span>
              <a
                href={bookingUrl(bookingSlug)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0f9b8e] hover:underline"
              >
                ver página de agendamento
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <input
                value={adminEmailInput}
                onChange={(e) => setAdminEmailInput(e.target.value)}
                placeholder="E-mail de acesso da clínica"
                className="w-64 rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9b8e]/40"
              />
              <input
                type="password"
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
                placeholder="Senha (mín. 7 caracteres)"
                className="w-48 rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9b8e]/40"
              />
              <button
                type="button"
                onClick={handleCreateAccess}
                disabled={saving}
                className="text-sm font-medium text-[#0f9b8e] hover:underline disabled:opacity-60"
              >
                Criar acesso
              </button>
            </div>
          </div>
        )}

        {!bookingSlug && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Sistema de agendamento
            </label>
            <p className="text-xs text-muted-foreground mb-2">
              Opcional: informe um e-mail e senha pra clínica já entrar direto no painel de
              agendamentos. Se deixar em branco, dá pra configurar isso depois.
            </p>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <input
                value={adminEmailInput}
                onChange={(e) => setAdminEmailInput(e.target.value)}
                placeholder="E-mail de acesso da clínica"
                className="w-64 rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9b8e]/40"
              />
              <input
                type="password"
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
                placeholder="Senha (mín. 7 caracteres)"
                className="w-48 rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9b8e]/40"
              />
            </div>
            {isEdit && (
              <div className="flex items-center gap-2.5 text-sm">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 shrink-0" />
                <span className="text-muted-foreground">Ainda não conectado</span>
                <button
                  type="button"
                  onClick={retryBookingConnection}
                  disabled={saving}
                  className="text-[#0f9b8e] hover:underline font-medium disabled:opacity-60"
                >
                  Conectar agora
                </button>
              </div>
            )}
          </div>
        )}

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
        {bookingWarning && <p className="text-sm text-amber-600">{bookingWarning}</p>}

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
