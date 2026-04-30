import { CTA } from "./CTA";

const steps = [
  {
    title: "Экспресс-диагностика бизнеса",
    text: "Разбираем финансы, команду, продажи, процессы и текущие риски. Определяем, где компания теряет деньги.",
    result: "Вы получаете карту проблем и точек роста.",
  },
  {
    title: "Анализ команды и управления",
    text: "Проверяем, как решения собственника, руководителей и сотрудников влияют на кризис.",
    result: "Становится понятно, где бизнес тормозит человеческий фактор.",
  },
  {
    title: "Финансовая и операционная картина 360°",
    text: "Смотрим не только внутрь компании, но и на рынок, конкурентов, поставщиков и внешние угрозы.",
    result: "Вы видите полную картину, а не отдельные симптомы.",
  },
  {
    title: "План выхода из кризиса",
    text: "Формируем конкретный список действий: что делать сейчас, что отложить, что остановить, что усилить.",
    result: "У вас появляется roadmap с приоритетами и сроками.",
  },
  {
    title: "Внедрение решений",
    text: "Помогаем последовательно внедрять изменения: финансы, команда, продажи, процессы.",
    result: "План превращается в реальные управленческие действия.",
  },
  {
    title: "Контроль результата и корректировка",
    text: "Регулярно отслеживаем показатели, корректируем действия и доводим бизнес до устойчивой модели.",
    result: "Компания выходит из хаоса в управляемую систему.",
  },
];

export function Process() {
  return (
    <section id="process" className="section bg-surface">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="eyebrow mb-5">Этапы работы</span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">
            Как проходит работа с бизнесом
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            От быстрой диагностики до внедрения антикризисного плана и контроля результата.
          </p>
        </div>

        <ol className="mt-12 space-y-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 shadow-[var(--shadow-soft)]"
            >
              <div
                className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center font-display font-extrabold text-xl md:text-2xl"
                style={{
                  background: "var(--gradient-brand)",
                  color: "var(--brand-foreground)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-xl md:text-2xl text-foreground">
                  {s.title}
                </h3>
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
          <CTA
            variant="dark"
            title="Готовы начать с экспресс-диагностики?"
            subtitle="Это бесплатно. Разберём вашу ситуацию за 1 день."
          />
        </div>
      </div>
    </section>
  );
}
