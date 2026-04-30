import { ArrowRight, Stethoscope, Users, Target, Package } from "lucide-react";
import { CTA } from "./CTA";

const steps = [
  {
    icon: Stethoscope,
    title: "Диагностика и самоанализ",
    text: "Шаги для верхнеуровневого понимания возможных причин кризиса.",
  },
  {
    icon: Users,
    title: "Анализ работы команды",
    text: "Шаги для оценки точек роста действий команды, определение слабых звеньев оргструктуры.",
  },
  {
    icon: Target,
    title: "Анализ конкурентной среды",
    text: "Дополнительные действия для оценки внешней среды, которые привели компанию к кризису.",
  },
  {
    icon: Package,
    title: "Аудит продуктовой политики",
    text: "Шаги для аудита продуктовой стратегии и её гибкости к изменениям во внешней среде.",
  },
];

export function CompanySteps() {
  return (
    <section id="company-steps" className="section">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="eyebrow mb-5">Шаги для компании</span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">
            Самостоятельные шаги для компании
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Основные предварительные действия перед вызовом антикризисного эксперта.
            Эти шаги помогут вам подготовиться и понять масштаб ситуации.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <article key={s.title} className="card-soft flex gap-5">
                <div
                  className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{
                    background: "var(--gradient-brand)",
                    color: "var(--brand-foreground)",
                  }}
                >
                  <Icon size={26} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold tracking-widest text-muted-foreground mb-1">
                    ШАГ {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-foreground/75 leading-relaxed">{s.text}</p>
                  <a
                    href="#checklist"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[oklch(0.45_0.12_70)] hover:gap-2.5 transition-all"
                  >
                    Получить чек-лист по шагу <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12">
          <CTA
            title="Прошли шаги, но кризис не уходит?"
            subtitle="Запишитесь на бесплатную экспресс-диагностику — разберём вашу ситуацию вместе."
          />
        </div>
      </div>
    </section>
  );
}
