import { ArrowRight, FileDown } from "lucide-react";
import { useSection } from "@/lib/content/ContentProvider";

export function Hero() {
  const c = useSection("hero");
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${c.backgroundImage})` }} aria-hidden />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden />
      <div className="relative container-px mx-auto max-w-7xl pt-[40px] pb-24 md:pt-[88px] md:pb-40">
        <div className="max-w-3xl">
          <span className="eyebrow-light mb-6">{c.eyebrow}</span>
          <h1 className="text-white font-display text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
            {c.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl">{c.description}</p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a href={c.primaryCtaHref} className="btn-cta">
              {c.primaryCtaLabel} <ArrowRight size={18} />
            </a>
            <a href={c.secondaryCtaHref} className="btn-ghost">
              <FileDown size={18} /> {c.secondaryCtaLabel}
            </a>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {c.stats.map((s) => (
              <div key={s.l} className="border-l-2 border-[oklch(0.78_0.15_78)] pl-3">
                <div className="text-white text-xl md:text-2xl font-display font-bold">{s.v}</div>
                <div className="text-white/65 text-xs md:text-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
