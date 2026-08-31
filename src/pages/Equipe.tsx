import { GraduationCap } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { CtaSection } from "../components/CtaSection";
import { team } from "../lib/team";

export default function Equipe() {
  return (
    <div>
      <PageHero
        eyebrow="Corpo clínico"
        title="Profissionais que cuidam de você com atenção"
        subtitle="Uma equipe especializada, sempre atualizada e pronta para te receber com atenção de verdade."
      />

      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-card border border-border rounded-2xl p-7 flex gap-5 items-start"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-display font-semibold text-lg shrink-0">
                  {member.initials}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-1">{member.role}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-3">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {member.cro}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Quer conhecer nossa equipe pessoalmente?"
        subtitle="Agende uma visita e conheça a estrutura e os profissionais da Sorriso Vital."
      />
    </div>
  );
}
