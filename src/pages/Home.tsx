import { Link } from "react-router-dom";
import { ArrowRight, Check, Star, CalendarCheck, ShieldCheck, Clock, Smile } from "lucide-react";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { CtaSection } from "../components/CtaSection";
import { specialties } from "../lib/specialties";
import { waLink } from "../lib/site";

const highlights = [
  { icon: CalendarCheck, label: "Agendamento online" },
  { icon: ShieldCheck, label: "Biossegurança total" },
  { icon: Clock, label: "Horários flexíveis" },
  { icon: Smile, label: "Atendimento humanizado" },
];

const testimonials = [
  {
    name: "Juliana R.",
    text: "Equipe super atenciosa, me senti acolhida do início ao fim do tratamento. Recomendo de olhos fechados!",
  },
  {
    name: "Marcelo T.",
    text: "Fiz meu implante com a clínica e o resultado ficou perfeito. Processo tranquilo e bem explicado.",
  },
  {
    name: "Fernanda A.",
    text: "Minha filha tinha medo de dentista e hoje pede pra voltar. A odontopediatra é incrível com as crianças.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="bg-background py-16 md:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-muted text-primary text-xs font-semibold px-3.5 py-1.5 rounded-full mb-7 border border-primary/15">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                Odontologia para toda a família
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-[1.12] mb-6">
                Um sorriso saudável começa com o cuidado certo.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Da limpeza de rotina aos tratamentos mais avançados, a Sorriso Vital cuida de cada
                detalhe com tecnologia, carinho e uma equipe que você confia.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a
                  href={waLink("Olá! Vim pelo site e quero agendar uma consulta.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1DB954] text-white font-semibold px-6 py-3.5 rounded-full text-base transition-all hover:shadow-lg hover:shadow-[#25D366]/25"
                >
                  <WhatsAppIcon />
                  Agendar consulta
                </a>
                <Link
                  to="/especialidades"
                  className="flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6 py-3.5 rounded-full text-base transition-all"
                >
                  Ver especialidades
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 text-sm">
                {["Convênios aceitos", "Parcelamento facilitado"].map((seal) => (
                  <div key={seal} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    <span>{seal}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative w-full max-w-sm">
                <div className="aspect-[4/5] rounded-[2.5rem] bg-primary/10 border border-primary/15 flex items-center justify-center overflow-hidden">
                  <Smile className="w-32 h-32 text-primary/40" />
                </div>
                <div className="absolute -right-4 top-8 bg-card shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3 border border-border">
                  <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center text-accent-dark">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-foreground">4.9 de avaliação</div>
                    <div className="text-[10px] text-muted-foreground">+800 pacientes</div>
                  </div>
                </div>
                <div className="absolute -left-4 bottom-10 bg-card shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3 border border-border">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-foreground">Ambiente seguro</div>
                    <div className="text-[10px] text-muted-foreground">Protocolos rígidos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {highlights.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 text-white">
              <Icon className="w-5 h-5 shrink-0 text-white/80" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="especialidades" className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-accent-dark font-semibold text-sm uppercase tracking-widest">
              O que tratamos
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-3">
              Especialidades para cada fase do seu sorriso
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {specialties.slice(0, 8).map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/especialidades"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              Ver todas as especialidades
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-accent-dark font-semibold text-sm uppercase tracking-widest">
              O que dizem
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-3">
              Pacientes que confiam no nosso cuidado
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-card border border-border rounded-2xl p-6">
                <div className="flex gap-0.5 text-accent mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="font-display font-semibold text-foreground text-sm">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
