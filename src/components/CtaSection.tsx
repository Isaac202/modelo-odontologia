import { WhatsAppIcon } from "./WhatsAppIcon";
import { waLink } from "../lib/site";

export function CtaSection({
  title = "Pronta pra cuidar do seu sorriso?",
  subtitle = "Fale com a nossa equipe e agende sua avaliação, sem compromisso.",
  message = "Olá! Vim pelo site e quero agendar uma avaliação.",
}: {
  title?: string;
  subtitle?: string;
  message?: string;
}) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-dark text-xs font-semibold px-4 py-1.5 rounded-full mb-8 border border-accent/20">
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          Sem compromisso
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground leading-[1.15] mb-4">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground mb-9 max-w-lg mx-auto leading-relaxed">{subtitle}</p>
        <a
          href={waLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1DB954] text-white font-semibold px-8 py-4 rounded-full text-lg transition-all hover:shadow-2xl hover:shadow-[#25D366]/30 hover:-translate-y-0.5"
        >
          <WhatsAppIcon className="w-6 h-6 shrink-0" />
          Falar no WhatsApp agora
        </a>
      </div>
    </section>
  );
}
