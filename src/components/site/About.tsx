import portrait from "@/assets/portrait.jpg";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { CTA } from "./CTA";

const facts = [
  "20 лет практического опыта",
  "Обороты до 1 млрд ₽ в год",
  "Антикризисное управление",
  "Финансы, команда, процессы",
  "Экспресс-диагностика за 1 день",
];

export function About() {
  return (
    <section id="about" className="section bg-surface">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-[oklch(0.78_0.15_78_/_0.15)] -z-10" />
            <img
              src={portrait}
              alt="Виктор Семендуев — антикризисный менеджер"
              className="rounded-2xl w-full shadow-[var(--shadow-elegant)]"
              loading="lazy"
              width={1024}
              height={1024}
            />
          </div>
          <div>
            <span className="eyebrow mb-5">Обо мне</span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold leading-tight text-foreground">
              Виктор Семендуев
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">Антикризисный менеджер · к.э.н.</p>

            <div className="mt-6 space-y-4 text-base md:text-lg text-foreground/85 leading-relaxed">
              <p>
                Антикризисный менеджер с <strong>20-летним практическим опытом</strong>.
                В 2005 году основал российское подразделение CreditExpress, которое за 12 лет
                выросло в одного из лидеров рынка с оборотом почти <strong>1 млрд рублей в месяц</strong>.
              </p>
              <p>
                Мой опыт — это не теория, а работа в агрессивной бизнес-среде: долги, падение
                cash flow, неэффективные команды, управленческие конфликты, внешнее давление и
                кризисы роста.
              </p>
              <p>
                Помогаю собственникам увидеть не симптомы, а <strong>корневые причины</strong> проблем
                — в финансах, команде, процессах и управлении. После диагностики вы получаете не
                общие советы, а <strong>конкретный план действий</strong> на ближайшие недели.
              </p>
            </div>

            <ul className="mt-7 grid sm:grid-cols-2 gap-3">
              {facts.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-foreground/90">
                  <CheckCircle2 size={20} className="text-[oklch(0.55_0.14_155)] shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base font-medium">{f}</span>
                </li>
              ))}
            </ul>

            <a href="#contacts" className="btn-cta mt-8 inline-flex">
              Получить диагностику бизнеса <ArrowRight size={18} />
            </a>
          </div>
        </div>

        <div className="mt-16">
          <CTA
            variant="dark"
            title="Хотите понять, где ваш бизнес теряет деньги?"
            subtitle="Бесплатная экспресс-диагностика за 1 день. Конфиденциально."
          />
        </div>
      </div>
    </section>
  );
}
