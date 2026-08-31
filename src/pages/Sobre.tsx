import { HeartHandshake, Target, Eye, Gem, Building2, Wifi, Coffee, Baby } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { CtaSection } from "../components/CtaSection";

const values = [
  {
    icon: Target,
    title: "Missão",
    desc: "Cuidar da saúde bucal de cada paciente com excelência técnica e acolhimento humano.",
  },
  {
    icon: Eye,
    title: "Visão",
    desc: "Ser a clínica de referência em odontologia na região, reconhecida pela confiança dos pacientes.",
  },
  {
    icon: Gem,
    title: "Valores",
    desc: "Ética, transparência, atualização constante e respeito ao tempo e ao bolso do paciente.",
  },
];

const structure = [
  { icon: Building2, label: "6 consultórios climatizados" },
  { icon: Wifi, label: "Wi-Fi grátis na recepção" },
  { icon: Coffee, label: "Espaço de espera confortável" },
  { icon: Baby, label: "Cantinho kids para as crianças" },
];

export default function Sobre() {
  return (
    <div>
      <PageHero
        eyebrow="Nossa história"
        title="Cuidado odontológico com nome e sobrenome"
        subtitle="Há mais de 15 anos cuidando de sorrisos com uma equipe que trata cada paciente pelo nome."
      />

      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent-dark font-semibold text-sm uppercase tracking-widest">
                Quem somos
              </span>
              <h2 className="font-display text-3xl font-semibold text-foreground mt-3 mb-5">
                Uma clínica pensada para o seu conforto
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A Sorriso Vital nasceu em 2010 com um propósito simples: oferecer um atendimento
                odontológico próximo, honesto e sem enrolação. Começamos com um único consultório e,
                hoje, contamos com uma equipe multidisciplinar preparada para cuidar de toda a família.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Investimos constantemente em equipamentos digitais e atualização da equipe para
                oferecer diagnósticos precisos e tratamentos menos invasivos, sempre explicando cada
                etapa em uma linguagem simples.
              </p>
            </div>
            <div className="rounded-[2rem] bg-muted border border-border aspect-square flex items-center justify-center">
              <HeartHandshake className="w-24 h-24 text-primary/30" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-7 text-center">
                <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-accent-dark font-semibold text-sm uppercase tracking-widest">
              Nossa estrutura
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-3">
              Um ambiente pensado para o seu bem-estar
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {structure.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="bg-card border border-border rounded-2xl p-6 text-center flex flex-col items-center gap-3"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Vamos cuidar do seu sorriso juntos?"
        subtitle="Agende uma avaliação e conheça de perto a nossa estrutura."
      />
    </div>
  );
}
