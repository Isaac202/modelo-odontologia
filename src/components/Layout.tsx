import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useSite } from "../context/SiteContext";
import { darken } from "../lib/color";

export function Layout() {
  const { config } = useSite();

  return (
    <div
      className="min-h-screen bg-background text-foreground font-sans flex flex-col"
      style={
        {
          "--color-primary": config.primaryColor,
          "--color-primary-dark": darken(config.primaryColor),
        } as React.CSSProperties
      }
    >
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
