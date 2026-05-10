import { Search, Users, Globe2, ListChecks } from "lucide-react";
import { CTA } from "./CTA";
import { useSection } from "@/lib/content/ContentProvider";

const icons = [Search, Users, Globe2, ListChecks];

export function HowIWork() {
  const c = useSection("howIWork");
  return (
    <section id="how" className="section">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="eyebrow mb-5">{c.eyebrow}</span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">{c.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{c.description}</p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {c.cards.map((card, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article key={i} className="card-soft">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--gradient-brand)" }}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-lg md:text-xl text-foreground">{card.title}</h3>
                <p className="mt-2.5 text-muted-foreground leading-relaxed">{card.text}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-12">
          <CTA
            title={c.ctaTitle}
            subtitle={c.ctaSubtitle}
            primaryLabel="Разобрать ситуацию"
            secondaryLabel="Получить чек-лист"
          />
        </div>
      </div>
    </section>
  );
}
