import { GraduationCap, HeartHandshake, RefreshCcw } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { CtaSection } from "../components/CtaSection";
import { getCopy, fillClinicName } from "../lib/copy";
import { useSite } from "../context/SiteContext";

const pointIcons = [GraduationCap, HeartHandshake, RefreshCcw];

export default function Equipe() {
  const { config } = useSite();
  const isDemo = config.slug === null;
  const copy = getCopy(isDemo);
  const points = copy.equipe.points.map((p, i) => ({ ...p, icon: pointIcons[i] }));

  return (
    <div>
      <PageHero
        eyebrow="Corpo clínico"
        title="Profissionais que cuidam de você com atenção"
        subtitle="Uma equipe especializada, sempre atualizada e pronta para te receber com atenção de verdade."
      />

      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <span className="text-accent-dark font-semibold text-sm uppercase tracking-widest">
              Nossa equipe
            </span>
            <h2 className="font-display text-3xl font-semibold text-foreground mt-3 mb-4">
              {fillClinicName(copy.equipe.sectionTitle, config.clinicName)}
            </h2>
            <p className="text-muted-foreground leading-relaxed">{copy.equipe.sectionDesc}</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {points.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-7 text-center">
                <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Quer conhecer nossa equipe pessoalmente?"
        subtitle={`Agende uma visita e conheça a estrutura e os profissionais da ${config.clinicName}.`}
      />
    </div>
  );
}
