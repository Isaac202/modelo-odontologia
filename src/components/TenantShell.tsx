import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "./Layout";
import NotFound from "../pages/NotFound";
import { SiteProvider, DEFAULT_SITE_CONFIG, type SiteConfig } from "../context/SiteContext";
import { getTenantBySlug, type Tenant } from "../lib/tenant";
import { fetchSiteData } from "../lib/siteData";

function tenantToConfig(tenant: Tenant): SiteConfig {
  return {
    slug: tenant.slug,
    basePath: `/c/${tenant.slug}`,
    clinicName: tenant.clinic_name,
    address: tenant.address || DEFAULT_SITE_CONFIG.address,
    phoneDisplay: tenant.phone_display || DEFAULT_SITE_CONFIG.phoneDisplay,
    primaryColor: tenant.primary_color || DEFAULT_SITE_CONFIG.primaryColor,
    specialtyKeys: tenant.specialty_keys ?? [],
    logoUrl: tenant.logo_url || null,
    bookingSlug: tenant.booking_slug || null,
    eaServices: null,
    eaWorkingPlan: null,
  };
}

export function TenantShell() {
  const { slug } = useParams<{ slug: string }>();
  const [status, setStatus] = useState<"loading" | "ready" | "notfound">("loading");
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    let active = true;
    setStatus("loading");
    if (!slug) {
      setStatus("notfound");
      return;
    }
    getTenantBySlug(slug).then((tenant) => {
      if (!active) return;
      if (!tenant) {
        setStatus("notfound");
        return;
      }
      setConfig(tenantToConfig(tenant));
      setStatus("ready");

      if (tenant.booking_slug) {
        fetchSiteData(tenant.slug).then((data) => {
          if (!active || !data.connected) return;
          setConfig((prev) =>
            prev
              ? {
                  ...prev,
                  eaServices: data.services,
                  eaWorkingPlan: data.workingPlan,
                  address: data.address || prev.address,
                  phoneDisplay: data.phoneDisplay || prev.phoneDisplay,
                }
              : prev,
          );
        });
      }
    });
    return () => {
      active = false;
    };
  }, [slug]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Carregando site da clínica...
      </div>
    );
  }

  if (status === "notfound" || !config) {
    return <NotFound />;
  }

  return (
    <SiteProvider config={config}>
      <Layout />
    </SiteProvider>
  );
}
