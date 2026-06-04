import { Wrench } from "lucide-react";
import { CTA } from "./CTA";
import { useSection } from "@/lib/content/ContentProvider";

export function Process() {
  const c = useSection("process");
  return (
    <section id="process" className="section bg-surface">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="eyebrow mb-5">{c.eyebrow}</span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">
            {c.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{c.description}</p>
          {c.tagline && (
            <p className="mt-5 text-base md:text-lg italic text-foreground/80 border-l-2 border-[oklch(0.78_0.15_78)] pl-4">
              «{c.tagline}»
            </p>
          )}
        </div>

        <ol className="mt-12 space-y-4">
          {c.steps.map((s, i) => (
            <li
              key={i}
              className="bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 shadow-[var(--shadow-soft)]"
            >
              <div
                className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center font-display font-extrabold text-xl md:text-2xl"
                style={{ background: "var(--gradient-brand)", color: "var(--brand-foreground)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-xl md:text-2xl text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-foreground/80 leading-relaxed">{s.text}</p>

                {s.tools && s.tools.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                      <Wrench size={14} /> Инструменты этапа
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {s.tools.map((t) => (
                        <span
                          key={t}
                          className="text-xs md:text-sm bg-[oklch(0.78_0.15_78_/_0.18)] text-[oklch(0.35_0.1_70)] px-3 py-1.5 rounded-lg font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 inline-flex items-start gap-2 text-sm md:text-base bg-[oklch(0.95_0.05_155)] text-[oklch(0.35_0.1_155)] px-3.5 py-2 rounded-lg font-medium">
                  <span className="font-bold">Результат:</span>
                  <span>{s.result}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <CTA
            variant="dark"
            title={c.ctaTitle}
            subtitle={c.ctaSubtitle}
            primaryLabel="Получить диагностику"
            secondaryLabel="Антикризисный чек-лист"
          />
        </div>
      </div>
    </section>
  );
}
