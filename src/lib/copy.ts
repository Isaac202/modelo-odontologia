export type SiteCopy = {
  headerBadge: string | null;
  footerTagline: string;
  footerSuffix: string;
  home: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    specialtiesEyebrow: string;
    specialtiesTitle: string;
    testimonials: { name: string; text: string }[];
    ctaTitle: string;
    ctaSubtitle: string;
  };
  especialidades: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
  };
  sobre: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    quemSomosTitle: string;
    quemSomosP1: string;
    values: { title: string; desc: string }[];
    ctaTitle: string;
    ctaSubtitle: string;
  };
  equipe: {
    sectionTitle: string;
    sectionDesc: string;
    points: { title: string; desc: string }[];
  };
};

export const demoCopy: SiteCopy = {
  headerBadge: "Odontologia",
  footerTagline:
    "Odontologia completa para toda a família, com carinho, tecnologia e um sorriso de cada vez.",
  footerSuffix: " Odontologia. Todos os direitos reservados.",
  home: {
    heroBadge: "Odontologia para toda a família",
    heroTitle: "Um sorriso saudável começa com o cuidado certo.",
    heroSubtitle:
      "Da limpeza de rotina aos tratamentos mais avançados, a {clinicName} cuida de cada detalhe com tecnologia, carinho e uma equipe que você confia.",
    specialtiesEyebrow: "O que tratamos",
    specialtiesTitle: "Especialidades para cada fase do seu sorriso",
    testimonials: [
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
    ],
    ctaTitle: "Pronta pra cuidar do seu sorriso?",
    ctaSubtitle: "Fale com a nossa equipe e agende sua avaliação, sem compromisso.",
  },
  especialidades: {
    heroEyebrow: "Tratamentos",
    heroTitle: "Especialidades para cuidar do seu sorriso por completo",
    heroSubtitle:
      "Do preventivo ao mais avançado, você encontra tudo em um só lugar, com profissionais especializados em cada área.",
    ctaTitle: "Não sabe qual tratamento você precisa?",
    ctaSubtitle: "Fale com a nossa equipe e a gente te orienta sem compromisso.",
  },
  sobre: {
    heroEyebrow: "Nossa história",
    heroTitle: "Cuidado odontológico com nome e sobrenome",
    heroSubtitle:
      "Há mais de 15 anos cuidando de sorrisos com uma equipe que trata cada paciente pelo nome.",
    quemSomosTitle: "Uma clínica pensada para o seu conforto",
    quemSomosP1:
      "A {clinicName} nasceu com um propósito simples: oferecer um atendimento odontológico próximo, honesto e sem enrolação. Começamos com um único consultório e, hoje, contamos com uma equipe multidisciplinar preparada para cuidar de toda a família.",
    values: [
      {
        title: "Missão",
        desc: "Cuidar da saúde bucal de cada paciente com excelência técnica e acolhimento humano.",
      },
      {
        title: "Visão",
        desc: "Ser a clínica de referência em odontologia na região, reconhecida pela confiança dos pacientes.",
      },
      {
        title: "Valores",
        desc: "Ética, transparência, atualização constante e respeito ao tempo e ao bolso do paciente.",
      },
    ],
    ctaTitle: "Vamos cuidar do seu sorriso juntos?",
    ctaSubtitle: "Agende uma avaliação e conheça de perto a nossa estrutura.",
  },
  equipe: {
    sectionTitle: "Quem cuida do seu sorriso na {clinicName}",
    sectionDesc:
      "Nossa equipe reúne cirurgiões-dentistas especializados em diferentes áreas da odontologia, prontos para cuidar de cada fase do seu tratamento com atenção e transparência.",
    points: [
      {
        title: "Profissionais especializados",
        desc: "Cirurgiões-dentistas com especialização em cada área de tratamento, sempre atualizados com as técnicas mais modernas.",
      },
      {
        title: "Atendimento humanizado",
        desc: "Cada paciente é ouvido com atenção, com explicações claras sobre diagnóstico e tratamento, sem pressa.",
      },
      {
        title: "Educação continuada",
        desc: "Equipe em constante atualização, participando de cursos e congressos para trazer o que há de mais moderno pra clínica.",
      },
    ],
  },
};

export const genericCopy: SiteCopy = {
  headerBadge: null,
  footerTagline:
    "Atendimento completo para toda a família, com carinho, tecnologia e cuidado em cada etapa.",
  footerSuffix: ". Todos os direitos reservados.",
  home: {
    heroBadge: "Cuidado para toda a família",
    heroTitle: "Um atendimento de confiança começa com o cuidado certo.",
    heroSubtitle:
      "Do atendimento de rotina aos tratamentos mais avançados, a {clinicName} cuida de cada detalhe com tecnologia, carinho e uma equipe que você confia.",
    specialtiesEyebrow: "O que oferecemos",
    specialtiesTitle: "Especialidades para cuidar de você em cada etapa",
    testimonials: [
      {
        name: "Juliana R.",
        text: "Equipe super atenciosa, me senti acolhida do início ao fim do atendimento. Recomendo de olhos fechados!",
      },
      {
        name: "Marcelo T.",
        text: "Fiz uma avaliação completa na clínica e o resultado ficou perfeito. Processo tranquilo e bem explicado.",
      },
      {
        name: "Fernanda A.",
        text: "Já indiquei a clínica pra vários amigos. Atendimento rápido, atencioso e sem enrolação.",
      },
    ],
    ctaTitle: "Pronta pra cuidar de mais pacientes?",
    ctaSubtitle: "Fale com a nossa equipe e agende sua avaliação, sem compromisso.",
  },
  especialidades: {
    heroEyebrow: "Especialidades",
    heroTitle: "Especialidades para cuidar de você por completo",
    heroSubtitle:
      "Do preventivo ao mais avançado, você encontra tudo em um só lugar, com profissionais especializados em cada área.",
    ctaTitle: "Não sabe qual atendimento você precisa?",
    ctaSubtitle: "Fale com a nossa equipe e a gente te orienta sem compromisso.",
  },
  sobre: {
    heroEyebrow: "Nossa história",
    heroTitle: "Cuidado de verdade, com nome e sobrenome",
    heroSubtitle:
      "Há mais de 15 anos cuidando de pessoas com uma equipe que trata cada paciente pelo nome.",
    quemSomosTitle: "Uma clínica pensada para o seu conforto",
    quemSomosP1:
      "A {clinicName} nasceu com um propósito simples: oferecer um atendimento próximo, honesto e sem enrolação. Começamos com um único consultório e, hoje, contamos com uma equipe multidisciplinar preparada para cuidar de toda a família.",
    values: [
      {
        title: "Missão",
        desc: "Cuidar da saúde de cada paciente com excelência técnica e acolhimento humano.",
      },
      {
        title: "Visão",
        desc: "Ser a clínica de referência na região, reconhecida pela confiança dos pacientes.",
      },
      {
        title: "Valores",
        desc: "Ética, transparência, atualização constante e respeito ao tempo e ao bolso do paciente.",
      },
    ],
    ctaTitle: "Vamos cuidar de você também?",
    ctaSubtitle: "Agende uma avaliação e conheça de perto a nossa estrutura.",
  },
  equipe: {
    sectionTitle: "Quem cuida de você na {clinicName}",
    sectionDesc:
      "Nossa equipe reúne profissionais especializados em diferentes áreas, prontos para cuidar de cada fase do seu atendimento com atenção e transparência.",
    points: [
      {
        title: "Profissionais especializados",
        desc: "Profissionais com especialização em cada área de atuação, sempre atualizados com as técnicas mais modernas.",
      },
      {
        title: "Atendimento humanizado",
        desc: "Cada paciente é ouvido com atenção, com explicações claras sobre diagnóstico e tratamento, sem pressa.",
      },
      {
        title: "Educação continuada",
        desc: "Equipe em constante atualização, participando de cursos e congressos para trazer o que há de mais moderno pra clínica.",
      },
    ],
  },
};

export function getCopy(isDemo: boolean): SiteCopy {
  return isDemo ? demoCopy : genericCopy;
}

export function fillClinicName(template: string, clinicName: string): string {
  return template.replace(/\{clinicName\}/g, clinicName);
}
