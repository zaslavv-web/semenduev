import { CheckCircle2, ArrowRight } from "lucide-react";
import { CTA } from "./CTA";
import { useSection } from "@/lib/content/ContentProvider";

export function About() {
  const c = useSection("about");
  return (
    <section id="about" className="section bg-surface">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-[oklch(0.78_0.15_78_/_0.15)] -z-10" />
            <img
              src={c.portrait}
              alt={c.title}
              className="rounded-2xl w-full shadow-[var(--shadow-elegant)]"
              loading="lazy"
              width={1024}
              height={1024}
            />
          </div>
          <div>
            <span className="eyebrow mb-5">{c.eyebrow}</span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold leading-tight text-foreground">
              {c.title}
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">{c.subtitle}</p>

            <div className="mt-6 space-y-4 text-base md:text-lg text-foreground/85 leading-relaxed">
              {c.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <ul className="mt-7 grid sm:grid-cols-2 gap-3">
              {c.facts.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-foreground/90">
                  <CheckCircle2 size={20} className="text-[oklch(0.55_0.14_155)] shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base font-medium">{f}</span>
                </li>
              ))}
            </ul>

            <a href={c.ctaHref} className="btn-cta mt-8 inline-flex">
              {c.ctaLabel} <ArrowRight size={18} />
            </a>
          </div>
        </div>

        <div className="mt-16">
          <CTA variant="dark" title={c.bottomCtaTitle} subtitle={c.bottomCtaSubtitle} />
        </div>
      </div>
    </section>
  );
}
