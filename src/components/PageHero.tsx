import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-primary text-white py-20">
      <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-white/10" />
      <div className="absolute -left-16 bottom-0 w-56 h-56 rounded-full bg-white/5" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full mb-5 uppercase tracking-widest">
          {eyebrow}
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-[1.1] mb-4">{title}</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      </div>
    </section>
  );
}
