import { PageHero } from "../components/PageHero";
import { CtaSection } from "../components/CtaSection";
import { specialties } from "../lib/specialties";
import { waLink } from "../lib/site";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { useSite } from "../context/SiteContext";

export default function Especialidades() {
  const { config, ctaMessage } = useSite();
  const shown = specialties.filter((s) => config.specialtyKeys.includes(s.key));

  return (
    <div>
      <PageHero
        eyebrow="Tratamentos"
        title="Especialidades para cuidar do seu sorriso por completo"
        subtitle="Do preventivo ao mais avançado, você encontra tudo em um só lugar, com profissionais especializados em cada área."
      />

      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shown.map(({ key, icon: Icon, title, desc }) => (
              <div
                key={key}
                className="bg-card border border-border rounded-2xl p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{desc}</p>
                <a
                  href={waLink(ctaMessage(`quero saber mais sobre ${title.toLowerCase()}`))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Tirar dúvidas
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Não sabe qual tratamento você precisa?"
        subtitle="Fale com a nossa equipe e a gente te orienta sem compromisso."
      />
    </div>
  );
}
