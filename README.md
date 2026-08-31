# Sorriso Vital — Site-modelo de clínica odontológica

Site-modelo multi-página para clínicas odontológicas, feito pela Oliveira & Co pra mostrar
a prospects um exemplo pronto de "Ver ao vivo" (igual ao padrão da sitedeclinica.com.br).

Primeiro modelo de uma futura galeria de sites-exemplo — por enquanto só este, sem galeria.

## Páginas

- `/` — Início
- `/sobre` — Sobre a clínica
- `/especialidades` — Especialidades odontológicas
- `/equipe` — Corpo clínico
- `/contato` — Formulário de contato (redireciona pro WhatsApp)

## Stack

Vite + React + TypeScript + Tailwind CSS v4 + React Router + lucide-react.

Todos os CTAs apontam pro WhatsApp da Oliveira & Co (`src/lib/site.ts`). Não usa
Supabase nem captura de lead — é uma vitrine de design, não um funil de conversão.

## Desenvolvimento

```sh
npm install
npm run dev
```
