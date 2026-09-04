import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { BrandMark } from "./BrandMark";
import { NAV_ITEMS, waLink } from "../lib/site";
import { getCopy } from "../lib/copy";
import { useSite } from "../context/SiteContext";

export function Header() {
  const [open, setOpen] = useState(false);
  const { config, path, ctaMessage } = useSite();
  const copy = getCopy(config.slug === null);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to={path("/")} className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <BrandMark />
            <span className="font-display text-lg font-semibold text-foreground leading-none">
              {config.clinicName}
              {copy.headerBadge && (
                <span className="block text-[10px] font-sans font-medium tracking-widest text-primary uppercase mt-0.5">
                  {copy.headerBadge}
                </span>
              )}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((l) => (
              <NavLink
                key={l.to}
                to={path(l.to)}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={waLink(ctaMessage("quero agendar uma consulta"))}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#25D366] hover:bg-[#1DB954] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Agendar consulta
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg text-foreground"
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t border-border py-4 flex flex-col">
            {NAV_ITEMS.map((l) => (
              <NavLink
                key={l.to}
                to={path(l.to)}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className="px-2 py-3.5 text-base font-medium text-foreground hover:text-primary transition-colors border-b border-border last:border-0"
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href={waLink(ctaMessage("quero agendar uma consulta"))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DB954] text-white font-semibold px-4 py-3.5 rounded-full transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Agendar consulta
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
