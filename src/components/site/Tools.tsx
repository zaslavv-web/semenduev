import { Wallet, UsersRound, TrendingUp, Workflow, ShieldAlert, Map } from "lucide-react";
import { useSection } from "@/lib/content/ContentProvider";

const icons = [Wallet, UsersRound, TrendingUp, Workflow, ShieldAlert, Map];

export function Tools() {
  const c = useSection("tools");
  return (
    <section className="section">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="eyebrow mb-5">{c.eyebrow}</span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">{c.title}</h2>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.items.map((t, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article key={i} className="card-soft">
                <div className="w-11 h-11 rounded-lg bg-[oklch(0.78_0.15_78_/_0.18)] flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[oklch(0.45_0.13_70)]" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
