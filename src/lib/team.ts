export type TeamMember = {
  name: string;
  role: string;
  cro: string;
  bio: string;
  initials: string;
};

export const team: TeamMember[] = [
  {
    name: "Dra. Beatriz Andrade",
    role: "Cirurgiã-dentista • Ortodontia",
    cro: "CRO-BA 12345",
    bio: "Mais de 12 anos de experiência em ortodontia e alinhadores transparentes.",
    initials: "BA",
  },
  {
    name: "Dr. Rafael Nogueira",
    role: "Cirurgião-dentista • Implantodontia",
    cro: "CRO-BA 23456",
    bio: "Especialista em implantes dentários e reabilitação oral com planejamento digital.",
    initials: "RN",
  },
  {
    name: "Dra. Camila Souza",
    role: "Cirurgiã-dentista • Odontopediatria",
    cro: "CRO-BA 34567",
    bio: "Dedicada ao atendimento infantil, com foco em deixar as crianças à vontade.",
    initials: "CS",
  },
  {
    name: "Dr. Thiago Lima",
    role: "Cirurgião-dentista • Endodontia",
    cro: "CRO-BA 45678",
    bio: "Referência em tratamento de canal com tecnologia rotatória de última geração.",
    initials: "TL",
  },
];
