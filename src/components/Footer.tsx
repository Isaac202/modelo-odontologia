import { Link } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { BrandMark } from "./BrandMark";
import { NAV_ITEMS, waLink } from "../lib/site";
import { getCopy } from "../lib/copy";
import { formatWorkingPlan } from "../lib/siteData";
import { useSite } from "../context/SiteContext";

export function Footer() {
  const year = new Date().getFullYear();
  const { config, path, ctaMessage } = useSite();
  const copy = getCopy(config.slug === null);
  const workingHours = config.eaWorkingPlan ? formatWorkingPlan(config.eaWorkingPlan) : null;
  const hoursLabel =
    workingHours && workingHours.length > 0
      ? `${workingHours[0].label}, ${workingHours[0].hours}`
      : "Seg. a Sex., 8h às 19h";

  return (
    <footer className="bg-foreground text-white py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <BrandMark size="sm" />
              <span className="font-display text-lg font-semibold">{config.clinicName}</span>
            </div>
            <p className="text-sm text-white/55 leading-relaxed max-w-xs">{copy.footerTagline}</p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white/35 mb-5">
              Navegação
            </div>
            <ul className="flex flex-col gap-3">
              {NAV_ITEMS.map((l) => (
                <li key={l.to}>
                  <Link to={path(l.to)} className="text-sm text-white/60 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white/35 mb-5">
              Endereço
            </div>
            <div className="flex items-start gap-2.5 text-sm text-white/60 max-w-[200px]">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{config.address}</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white/35 mb-5">
              Contato
            </div>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href={waLink(ctaMessage("quero agendar uma consulta"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 shrink-0" />
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <Clock className="w-4 h-4 shrink-0" />
                {hoursLabel}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35">
            © {year} {config.clinicName}
            {copy.footerSuffix}
          </p>
          <p className="text-xs text-white/35">Site-modelo criado por Oliveira & Co.</p>
        </div>
      </div>
    </footer>
  );
}
