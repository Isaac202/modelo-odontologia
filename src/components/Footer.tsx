import { Link } from "react-router-dom";
import { Smile, MapPin, Clock } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { NAV_LINKS, SITE_NAME, SITE_TAGLINE, waLink } from "../lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <Smile className="w-4 h-4" />
              </div>
              <span className="font-display text-lg font-semibold">{SITE_NAME}</span>
            </div>
            <p className="text-sm text-white/55 leading-relaxed max-w-xs">
              {SITE_TAGLINE} completa para toda a família, com carinho, tecnologia e um sorriso de
              cada vez.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white/35 mb-5">
              Navegação
            </div>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-white/60 hover:text-white transition-colors">
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
              <span>Av. Sete de Setembro, 1200 — Centro, Salvador - BA</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white/35 mb-5">
              Contato
            </div>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href={waLink("Olá! Vim pelo site e quero agendar uma consulta.")}
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
                Seg. a Sex., 8h às 19h
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35">
            © {year} {SITE_NAME} {SITE_TAGLINE}. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/35">Site-modelo criado por Oliveira & Co.</p>
        </div>
      </div>
    </footer>
  );
}
