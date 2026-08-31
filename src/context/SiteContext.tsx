import { createContext, useContext, type ReactNode } from "react";
import { ALL_SPECIALTY_KEYS } from "../lib/specialties";

export type SiteConfig = {
  slug: string | null;
  basePath: string;
  clinicName: string;
  address: string;
  phoneDisplay: string;
  primaryColor: string;
  specialtyKeys: string[];
  logoUrl: string | null;
};

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  slug: null,
  basePath: "",
  clinicName: "Sorriso Vital",
  address: "Av. Sete de Setembro, 1200 — Centro, Salvador - BA",
  phoneDisplay: "(71) 98432-7073",
  primaryColor: "#0f9b8e",
  specialtyKeys: ALL_SPECIALTY_KEYS,
  logoUrl: null,
};

type SiteContextValue = {
  config: SiteConfig;
  path: (subPath: string) => string;
  ctaMessage: (intent: string) => string;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ config, children }: { config: SiteConfig; children: ReactNode }) {
  const path = (subPath: string) => `${config.basePath}${subPath}`;
  const ctaMessage = (intent: string) =>
    config.slug
      ? `Olá! Vi o site da ${config.clinicName} e ${intent}.`
      : `Olá! Vim pelo site e ${intent}.`;

  return <SiteContext.Provider value={{ config, path, ctaMessage }}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within a SiteProvider");
  return ctx;
}
