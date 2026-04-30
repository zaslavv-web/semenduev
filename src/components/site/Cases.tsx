import { TrendingDown, Wallet, UsersRound, ArrowRight } from "lucide-react";

const cases = [
  {
    icon: TrendingDown,
    title: "Падение прибыли при сохранении выручки",
    problem: "Компания продавала на прежнем уровне, но прибыль снижалась.",
    cause: "Рост расходов, слабый контроль маржинальности, неэффективная структура затрат.",
    solution: "Финансовая диагностика, пересборка расходов, контроль ключевых показателей.",
    result: "Собственник получил прозрачную картину и план восстановления прибыли.",
  },
  {
    icon: Wallet,
    title: "Кассовые разрывы и долги",
    problem: "Бизнес работал, но регулярно не хватало денег на обязательства.",
    cause: "Ошибки в планировании ДДС, неуправляемые расходы, слабый контроль платежей.",
    solution: "Финансовая модель, приоритизация платежей, план стабилизации cash flow.",
    result: "Компания получила систему контроля денежных потоков.",
  },
  {
    icon: UsersRound,
    title: "Команда саботирует изменения",
    problem: "Решения собственника не внедрялись, сотрудники работали по-старому.",
    cause: "Размытая ответственность, конфликт интересов, отсутствие управленческого контроля.",
    solution: "Аудит команды, перераспределение ответственности, корректировка структуры.",
    result: "Изменения начали внедряться, управляемость компании выросла.",
  },
];

export function Cases() {
  return (
    <section id="cases" className="section bg-surface">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="eyebrow mb-5">Кейсы</span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">
            С какими ситуациями я работаю
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Типовые сценарии из практики. Если узнаёте свою ситуацию — давайте разберём детально.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-5">
          {cases.map((c) => (
            <article key={c.title} className="card-soft flex flex-col">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "var(--gradient-brand)" }}
              >
                <c.icon size={22} className="text-white" />
              </div>
              <h3 className="font-display font-bold text-lg md:text-xl text-foreground">{c.title}</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-bold text-foreground">Проблема</dt>
                  <dd className="text-muted-foreground mt-0.5">{c.problem}</dd>
                </div>
                <div>
                  <dt className="font-bold text-foreground">Причина</dt>
                  <dd className="text-muted-foreground mt-0.5">{c.cause}</dd>
                </div>
                <div>
                  <dt className="font-bold text-foreground">Решение</dt>
                  <dd className="text-muted-foreground mt-0.5">{c.solution}</dd>
                </div>
                <div className="pt-3 border-t border-border">
                  <dt className="font-bold text-[oklch(0.4_0.1_155)]">Результат</dt>
                  <dd className="text-foreground/90 mt-0.5 font-medium">{c.result}</dd>
                </div>
              </dl>
              <a href="#contacts" className="btn-outline mt-6 self-start">
                Разобрать мою ситуацию <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
