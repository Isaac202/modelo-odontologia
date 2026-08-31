import {
  Sparkles,
  Sparkle,
  AlignCenter,
  Syringe,
  Baby,
  ShieldCheck,
  Smile,
  Activity,
  type LucideIcon,
} from "lucide-react";

export type Specialty = {
  icon: LucideIcon;
  title: string;
  short: string;
  desc: string;
};

export const specialties: Specialty[] = [
  {
    icon: Sparkles,
    title: "Clareamento dental",
    short: "Clareamento",
    desc: "Tratamentos a laser e caseiros para um sorriso mais branco e uniforme, com acompanhamento profissional.",
  },
  {
    icon: ShieldCheck,
    title: "Implantes dentários",
    short: "Implantes",
    desc: "Reposição de dentes perdidos com implantes de titânio e planejamento digital de precisão.",
  },
  {
    icon: AlignCenter,
    title: "Ortodontia",
    short: "Ortodontia",
    desc: "Aparelhos fixos e alinhadores transparentes para corrigir o alinhamento dos dentes em qualquer idade.",
  },
  {
    icon: Syringe,
    title: "Endodontia",
    short: "Endodontia",
    desc: "Tratamento de canal com tecnologia rotatória, reduzindo o tempo de consulta e o desconforto.",
  },
  {
    icon: Baby,
    title: "Odontopediatria",
    short: "Infantil",
    desc: "Atendimento humanizado e lúdico para as crianças criarem uma relação tranquila com o dentista.",
  },
  {
    icon: Sparkle,
    title: "Estética dental",
    short: "Estética",
    desc: "Facetas, lentes de contato dental e harmonização do sorriso com resultados naturais.",
  },
  {
    icon: Activity,
    title: "Periodontia",
    short: "Gengiva",
    desc: "Prevenção e tratamento de doenças da gengiva, para uma base saudável para os seus dentes.",
  },
  {
    icon: Smile,
    title: "Próteses dentárias",
    short: "Próteses",
    desc: "Próteses fixas, móveis e protocolos sobre implante devolvendo função e confiança ao sorrir.",
  },
];
