import { Wallet, UsersRound, TrendingUp, Workflow, ShieldAlert, Map } from "lucide-react";

const tools = [
  { icon: Wallet, title: "Финансовая диагностика", text: "Находим, где бизнес теряет деньги: кассовые разрывы, лишние расходы, слабая маржинальность, неэффективная структура затрат." },
  { icon: UsersRound, title: "Аудит команды и управления", text: "Определяем, кто и какие решения тормозят бизнес: собственник, руководители, сотрудники, конфликты или отсутствие ответственности." },
  { icon: TrendingUp, title: "Анализ продаж и маркетинга", text: "Проверяем, почему падают заявки, средний чек, повторные продажи и конверсия." },
  { icon: Workflow, title: "Оценка бизнес-процессов", text: "Находим хаос в операционке: дублирование функций, слабый контроль, неработающие регламенты, потерю времени и денег." },
  { icon: ShieldAlert, title: "Карта рисков 360°", text: "Оцениваем внутренние и внешние угрозы: рынок, конкурентов, поставщиков, долги, персонал, управленческие ошибки." },
  { icon: Map, title: "Roadmap выхода из кризиса", text: "Формируем пошаговый план действий с приоритетами, сроками и зонами ответственности." },
];

export function Tools() {
  return (
    <section className="section">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="eyebrow mb-5">Инструменты</span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">
            Инструменты, которые я использую
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((t) => (
            <article key={t.title} className="card-soft">
              <div className="w-11 h-11 rounded-lg bg-[oklch(0.78_0.15_78_/_0.18)] flex items-center justify-center mb-4">
                <t.icon size={22} className="text-[oklch(0.45_0.13_70)]" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground">{t.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
