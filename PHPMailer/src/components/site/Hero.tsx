import { ArrowRight, FileDown } from "lucide-react";
import { useSection } from "@/lib/content/ContentProvider";
import { useCtaProps } from "./RequestDialog";

export function Hero() {
  const c = useSection("hero");
  const ctaProps = useCtaProps();
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${c.backgroundImage})` }}
        aria-hidden
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden />
      <div className="relative container-px mx-auto max-w-7xl pt-10 pb-16 md:pt-[88px] md:pb-40">
        <div className="max-w-3xl">
          <span className="eyebrow-light mb-6">{c.eyebrow}</span>
          <h1 className="text-white font-display text-3xl sm:text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
            {c.title}
          </h1>
          <p className="mt-5 text-base sm:text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl">
            {c.description}
          </p>
          {c.tagline && (
            <p className="mt-5 text-sm sm:text-base md:text-lg text-[oklch(0.85_0.13_80)] italic font-medium max-w-2xl border-l-2 border-[oklch(0.78_0.15_78)] pl-4">
              «{c.tagline}»
            </p>
          )}
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a {...ctaProps(c.primaryCtaHref)} className="btn-cta w-full sm:w-auto">
              {c.primaryCtaLabel} <ArrowRight size={18} />
            </a>
            <a href={c.secondaryCtaHref} className="btn-ghost w-full sm:w-auto">
              <FileDown size={18} /> {c.secondaryCtaLabel}
            </a>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-5 max-w-3xl">
            {c.stats.map((s) => (
              <div key={s.l} className="border-l-2 border-[oklch(0.78_0.15_78)] pl-3">
                <div className="text-white text-lg sm:text-xl md:text-2xl font-display font-bold">{s.v}</div>
                <div className="text-white/65 text-xs md:text-sm leading-snug">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
