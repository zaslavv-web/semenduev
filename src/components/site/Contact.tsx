import { useState } from "react";
import { Phone, Mail, Clock, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { useSection } from "@/lib/content/ContentProvider";

const badgeIcons = [Clock, Zap, ShieldCheck];

export function Contact() {
  const c = useSection("contact");
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
            <span className="eyebrow mb-5">{c.eyebrow}</span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">{c.title}</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{c.description}</p>

            <div className="mt-8 space-y-3">
              <a href={c.phoneHref} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:shadow-[var(--shadow-soft)] transition">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-brand)" }}>
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{c.phoneLabel}</div>
                  <div className="font-display font-bold text-lg text-foreground">{c.phone}</div>
                </div>
              </a>
              <a href={c.emailHref} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:shadow-[var(--shadow-soft)] transition">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-brand)" }}>
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{c.emailLabel}</div>
                  <div className="font-display font-bold text-lg text-foreground">{c.email}</div>
                </div>
              </a>
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-3">
              {c.badges.map((t, i) => {
                const Icon = badgeIcons[i % badgeIcons.length];
                return (
                  <div key={t} className="bg-card border border-border rounded-xl p-4 flex flex-col items-start gap-2">
                    <Icon size={20} className="text-[oklch(0.45_0.13_70)]" />
                    <span className="text-sm font-semibold text-foreground">{t}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-7 md:p-9 shadow-[var(--shadow-elegant)]">
            {sent ? (
              <div className="text-center py-10">
                <CheckCircle2 size={56} className="text-[oklch(0.55_0.14_155)] mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground">{c.successTitle}</h3>
                <p className="mt-2 text-muted-foreground">{c.successDescription}</p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl font-bold text-foreground">{c.formTitle}</h3>
                <p className="mt-2 text-muted-foreground">{c.formSubtitle}</p>
                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                  <Field label={c.nameLabel} name="name" required />
                  <Field label={c.phoneFieldLabel} name="phone" required />
                  <label className="block">
                    <span className="text-sm font-semibold text-foreground">{c.messageLabel}</span>
                    <textarea
                      name="message"
                      rows={4}
                      className="mt-1.5 w-full px-4 py-3 rounded-lg border border-border bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--brand)] transition resize-none"
                    />
                  </label>
                  <button type="submit" className="btn-cta w-full">
                    {c.submitLabel} <ArrowRight size={18} />
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
