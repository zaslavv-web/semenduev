import { Check, Star, ArrowRight } from "lucide-react";
import { useSection } from "@/lib/content/ContentProvider";
import { useCtaProps } from "./RequestDialog";

export function Packages() {
  const c = useSection("packages");
  const ctaProps = useCtaProps();
  return (
    <section id="packages" className="section">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="eyebrow mb-5">{c.eyebrow}</span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">{c.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{c.description}</p>
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-5">
          {c.items.map((p, i) => (
            <article
              key={i}
              className={`relative rounded-2xl p-7 md:p-8 flex flex-col ${
                p.featured ? "text-white shadow-[var(--shadow-elegant)] lg:scale-[1.03]" : "bg-card border border-border shadow-[var(--shadow-soft)]"
              }`}
              style={p.featured ? { background: "var(--gradient-brand)" } : undefined}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[oklch(0.78_0.15_78)] text-[oklch(0.18_0.04_255)] text-xs font-bold uppercase tracking-wider">
                  <Star size={12} fill="currentColor" /> Рекомендую
                </span>
              )}
              <div className={`text-sm font-semibold uppercase tracking-wider ${p.featured ? "text-[oklch(0.85_0.13_80)]" : "text-muted-foreground"}`}>
                {p.name}
              </div>
              <h3 className={`mt-2 font-display font-extrabold text-2xl md:text-3xl ${p.featured ? "text-white" : "text-foreground"}`}>
                {p.sub}
              </h3>

              <ul className="mt-6 space-y-3 flex-1">
                {p.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5">
                    <Check size={18} className={`shrink-0 mt-0.5 ${p.featured ? "text-[oklch(0.85_0.13_80)]" : "text-[oklch(0.55_0.14_155)]"}`} />
                    <span className={p.featured ? "text-white/90" : "text-foreground/85"}>{it}</span>
                  </li>
                ))}
              </ul>

              <div className={`mt-6 p-4 rounded-xl text-sm ${p.featured ? "bg-white/10 text-white/90" : "bg-surface-2 text-foreground/85"}`}>
                <strong className="block mb-1">Результат</strong>
                {p.result}
              </div>

              <a
                {...ctaProps(p.ctaHref)}
                className={`mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold transition ${
                  p.featured
                    ? "bg-[oklch(0.78_0.15_78)] text-[oklch(0.18_0.04_255)] hover:brightness-110"
                    : "bg-[var(--brand)] text-white hover:opacity-90"
                }`}
              >
                {p.cta} <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
