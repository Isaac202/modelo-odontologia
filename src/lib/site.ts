export const SITE_NAME = "Sorriso Vital";
export const SITE_TAGLINE = "Odontologia";

export const WA_NUMBER = "5571984327073";

export function waLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/especialidades", label: "Especialidades" },
  { to: "/equipe", label: "Equipe" },
  { to: "/contato", label: "Contato" },
];
