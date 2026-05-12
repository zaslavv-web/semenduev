import { TrendingDown, Wallet, UsersRound, ArrowRight } from "lucide-react";
import { useSection } from "@/lib/content/ContentProvider";
import { useCtaProps } from "./RequestDialog";

const icons = [TrendingDown, Wallet, UsersRound];

export function Cases() {
  const c = useSection("cases");
  const ctaProps = useCtaProps();
  return (
    <section id="cases" className="section bg-surface">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="eyebrow mb-5">{c.eyebrow}</span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">{c.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{c.description}</p>
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-5">
          {c.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article key={i} className="card-soft flex flex-col">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--gradient-brand)" }}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-lg md:text-xl text-foreground">{item.title}</h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="font-bold text-foreground">Проблема</dt>
                    <dd className="text-muted-foreground mt-0.5">{item.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-foreground">Причина</dt>
                    <dd className="text-muted-foreground mt-0.5">{item.cause}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-foreground">Решение</dt>
                    <dd className="text-muted-foreground mt-0.5">{item.solution}</dd>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <dt className="font-bold text-[oklch(0.4_0.1_155)]">Результат</dt>
                    <dd className="text-foreground/90 mt-0.5 font-medium">{item.result}</dd>
                  </div>
                </dl>
                <a {...ctaProps(item.ctaHref)} className="btn-outline mt-6 self-start">
                  {item.ctaLabel} <ArrowRight size={16} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
