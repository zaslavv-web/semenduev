import { CTA } from "./CTA";
import { useSection } from "@/lib/content/ContentProvider";

export function Process() {
  const c = useSection("process");
  return (
    <section id="process" className="section bg-surface">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="eyebrow mb-5">{c.eyebrow}</span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">{c.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{c.description}</p>
        </div>

        <ol className="mt-12 space-y-4">
          {c.steps.map((s, i) => (
            <li key={i} className="bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 shadow-[var(--shadow-soft)]">
              <div
                className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center font-display font-extrabold text-xl md:text-2xl"
                style={{ background: "var(--gradient-brand)", color: "var(--brand-foreground)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-xl md:text-2xl text-foreground">{s.title}</h3>
                <p className="mt-2 text-foreground/80 leading-relaxed">{s.text}</p>
                <div className="mt-4 inline-flex items-start gap-2 text-sm md:text-base bg-[oklch(0.95_0.05_155)] text-[oklch(0.35_0.1_155)] px-3.5 py-2 rounded-lg font-medium">
                  <span className="font-bold">Результат:</span>
                  <span>{s.result}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <CTA variant="dark" title={c.ctaTitle} subtitle={c.ctaSubtitle} />
        </div>
      </div>
    </section>
  );
}
