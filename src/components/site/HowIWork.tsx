import { Search, Users, Globe2, ListChecks } from "lucide-react";
import { CTA } from "./CTA";

const cards = [
  {
    icon: Search,
    title: "Ищу источник проблемы, а не её последствия",
    text: "Не борюсь только с убытками, долгами и падением продаж. Сначала определяю, почему они возникли.",
  },
  {
    icon: Users,
    title: "Анализирую команду и управленческие решения",
    text: "Проверяю, где бизнес тормозят люди, конфликты, сопротивление изменениям или слабое управление.",
  },
  {
    icon: Globe2,
    title: "Смотрю на бизнес в формате 360°",
    text: "Оцениваю финансы, продажи, процессы, рынок, конкурентов, поставщиков и внешние риски.",
  },
  {
    icon: ListChecks,
    title: "Формирую план, который можно внедрить",
    text: "После диагностики вы получаете не теорию, а верхнеуровневый план действий по выходу из кризиса.",
  },
];

export function HowIWork() {
  return (
    <section id="how" className="section">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="eyebrow mb-5">Подход</span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">
            Как я работаю
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Четыре принципа, которые позволяют выводить компании из кризиса быстро и с
            устойчивым результатом.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {cards.map((c) => (
            <article key={c.title} className="card-soft">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "var(--gradient-brand)" }}
              >
                <c.icon size={22} className="text-white" />
              </div>
              <h3 className="font-display font-bold text-lg md:text-xl text-foreground">
                {c.title}
              </h3>
              <p className="mt-2.5 text-muted-foreground leading-relaxed">{c.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <CTA
            title="Хотите понять, где ваш бизнес теряет деньги?"
            subtitle="Запишитесь на бесплатную диагностику — разберу вашу ситуацию лично."
          />
        </div>
      </div>
    </section>
  );
}
