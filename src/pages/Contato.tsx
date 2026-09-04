import { useState, type FormEvent } from "react";
import { MapPin, Clock, Map, CalendarCheck } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { waLink } from "../lib/site";
import { bookingUrl } from "../lib/booking";
import { formatWorkingPlan } from "../lib/siteData";
import { useSite } from "../context/SiteContext";

export default function Contato() {
  const { config, ctaMessage } = useSite();
  const workingHours = config.eaWorkingPlan ? formatWorkingPlan(config.eaWorkingPlan) : null;
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [mensagem, setMensagem] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const detalhe = [whatsapp && `Meu WhatsApp: ${whatsapp}.`, mensagem].filter(Boolean).join(" ");
    const base = ctaMessage("quero agendar uma consulta");
    const texto = nome ? `Olá! Me chamo ${nome}. ${base.replace(/^Olá! */, "")}` : base;
    window.open(waLink(detalhe ? `${texto} ${detalhe}` : texto), "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      <PageHero
        eyebrow="Fale com a gente"
        title="Vamos agendar o seu atendimento?"
        subtitle="Preencha o formulário ou chame a gente direto no WhatsApp — respondemos rapidinho."
      />

      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                Mande sua mensagem
              </h2>
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="nome">
                    Nome
                  </label>
                  <input
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="whatsapp">
                    WhatsApp
                  </label>
                  <input
                    id="whatsapp"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(71) 91234-5678"
                    className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="mensagem">
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    placeholder="Conte pra gente o que você precisa"
                    rows={4}
                    className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1DB954] text-white font-semibold px-6 py-3.5 rounded-full text-base transition-all"
                >
                  <WhatsAppIcon />
                  Enviar pelo WhatsApp
                </button>
                {config.bookingSlug && (
                  <a
                    href={bookingUrl(config.bookingSlug)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 bg-primary hover:opacity-90 text-primary-foreground font-semibold px-6 py-3.5 rounded-full text-base transition-all"
                  >
                    <CalendarCheck className="w-5 h-5" />
                    Agendar direto pelo sistema
                  </a>
                )}
              </form>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                Informações
              </h2>
              <div className="flex flex-col gap-5 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">Endereço</div>
                    <div className="text-sm text-muted-foreground">{config.address}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">Horário de atendimento</div>
                    {workingHours && workingHours.length > 0 ? (
                      workingHours.map((row) => (
                        <div key={row.label} className="text-sm text-muted-foreground">
                          {row.label}, {row.hours}
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="text-sm text-muted-foreground">Segunda a sexta, 8h às 19h</div>
                        <div className="text-sm text-muted-foreground">Sábado, 8h às 12h</div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">WhatsApp</div>
                    <a
                      href={waLink(ctaMessage("quero agendar uma consulta"))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {config.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-muted border border-border aspect-[16/10] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Map className="w-8 h-8" />
                  <span className="text-xs">Mapa ilustrativo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
