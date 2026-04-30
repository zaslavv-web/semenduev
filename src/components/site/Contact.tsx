import { useState } from "react";
import { Phone, Mail, Clock, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contacts" className="section bg-surface">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <span className="eyebrow mb-5">Контакты</span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Запишитесь на бесплатную диагностику бизнеса
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Разберём вашу ситуацию, определим ключевые проблемы и покажем, какие действия можно
              предпринять уже в ближайшие недели.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href="tel:+79269882199"
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:shadow-[var(--shadow-soft)] transition"
              >
                <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-brand)" }}>
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Телефон</div>
                  <div className="font-display font-bold text-lg text-foreground">+7 926 988 21 99</div>
                </div>
              </a>
              <a
                href="mailto:viktor@semenduev.pro"
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:shadow-[var(--shadow-soft)] transition"
              >
                <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-brand)" }}>
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Email</div>
                  <div className="font-display font-bold text-lg text-foreground">viktor@semenduev.pro</div>
                </div>
              </a>
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-3">
              {[
                { icon: Clock, t: "Ответ в течение рабочего дня" },
                { icon: Zap, t: "Экспресс-разбор за 1 день" },
                { icon: ShieldCheck, t: "Конфиденциально" },
              ].map((b) => (
                <div key={b.t} className="bg-card border border-border rounded-xl p-4 flex flex-col items-start gap-2">
                  <b.icon size={20} className="text-[oklch(0.45_0.13_70)]" />
                  <span className="text-sm font-semibold text-foreground">{b.t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-7 md:p-9 shadow-[var(--shadow-elegant)]">
            {sent ? (
              <div className="text-center py-10">
                <CheckCircle2 size={56} className="text-[oklch(0.55_0.14_155)] mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground">Заявка отправлена</h3>
                <p className="mt-2 text-muted-foreground">
                  Свяжусь с вами в течение рабочего дня.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl font-bold text-foreground">Заявка на диагностику</h3>
                <p className="mt-2 text-muted-foreground">Заполните форму — отвечу лично.</p>
                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                  <Field label="Имя" name="name" required />
                  <Field label="Телефон" name="phone" required />
                  <label className="block">
                    <span className="text-sm font-semibold text-foreground">Кратко о ситуации</span>
                    <textarea
                      name="message"
                      rows={4}
                      className="mt-1.5 w-full px-4 py-3 rounded-lg border border-border bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--brand)] transition resize-none"
                    />
                  </label>
                  <button type="submit" className="btn-cta w-full">
                    Получить бесплатную диагностику <ArrowRight size={18} />
                  </button>
                  <p className="text-xs text-muted-foreground text-center">
                    Отправляя форму, вы соглашаетесь с обработкой персональных данных.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, required }: { label: string; name: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <input
        name={name}
        required={required}
        className="mt-1.5 w-full px-4 py-3 rounded-lg border border-border bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--brand)] transition"
      />
    </label>
  );
}
