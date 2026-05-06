import { ArrowRight, Stethoscope, Users, Target, Package } from "lucide-react";
import { CTA } from "./CTA";
import { useSection } from "@/lib/content/ContentProvider";

const icons = [Stethoscope, Users, Target, Package];

export function CompanySteps() {
  const c = useSection("companySteps");
  return (
    <section id="company-steps" className="section">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="eyebrow mb-5">{c.eyebrow}</span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">{c.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{c.description}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {c.steps.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article key={i} className="card-soft flex gap-5">
                <div
                  className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--gradient-brand)", color: "var(--brand-foreground)" }}
                >
                  <Icon size={26} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold tracking-widest text-muted-foreground mb-1">
                    ШАГ {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground">{s.title}</h3>
                  <p className="mt-2 text-foreground/75 leading-relaxed">{s.text}</p>
                  <a
                    href={s.linkHref}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[oklch(0.45_0.12_70)] hover:gap-2.5 transition-all"
                  >
                    {s.linkLabel} <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12">
          <CTA title={c.ctaTitle} subtitle={c.ctaSubtitle} />
        </div>
      </div>
    </section>
  );
}
