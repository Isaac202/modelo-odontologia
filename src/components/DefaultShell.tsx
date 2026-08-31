import { Layout } from "./Layout";
import { SiteProvider, DEFAULT_SITE_CONFIG } from "../context/SiteContext";

export function DefaultShell() {
  return (
    <SiteProvider config={DEFAULT_SITE_CONFIG}>
      <Layout />
    </SiteProvider>
  );
}
