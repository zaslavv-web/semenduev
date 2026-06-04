import { FileDown, CheckCircle2, ArrowRight } from "lucide-react";
import { useSection } from "@/lib/content/ContentProvider";
import { useCtaProps } from "./RequestDialog";

export function Checklist() {
  const c = useSection("checklist");
  const ctaProps = useCtaProps();

  return (
    <section id="checklist" className="section relative overflow-hidden" style={{ background: "var(--gradient-brand)" }}>
      <div className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full bg-[oklch(0.78_0.15_78_/_0.18)] blur-3xl" aria-hidden />
      <div className="container-px mx-auto max-w-7xl relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="text-white">
            <span className="eyebrow-light mb-5">{c.eyebrow}</span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold leading-tight">{c.title}</h2>
            <p className="mt-5 text-lg text-white/85 leading-relaxed">{c.description}</p>
            <ul className="mt-6 space-y-2.5">
              {c.bullets.map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-white/90">
                  <CheckCircle2 size={20} className="text-[oklch(0.85_0.13_80)] shrink-0" />
                  <span className="font-medium">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-7 md:p-9 shadow-[var(--shadow-elegant)] text-center">
            <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-5" style={{ background: "var(--gradient-brand)" }}>
              <FileDown size={28} className="text-white" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground">{c.formTitle}</h3>
            <p className="mt-2 text-muted-foreground">{c.formSubtitle}</p>
            <a {...ctaProps("checklist")} className="btn-cta inline-flex mt-6">
              <FileDown size={18} /> Получить чек-лист <ArrowRight size={18} />
            </a>
            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
              PDF • бесплатно
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
