import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { useSection } from "@/lib/content/ContentProvider";
import { FORM_ENDPOINT } from "@/lib/config";

export function Checklist() {
  const c = useSection("checklist");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      source: "checklist" as const,
      name: String(fd.get("name") ?? "").trim().slice(0, 200),
      contact: String(fd.get("contact") ?? "").trim().slice(0, 200),
      website: String(fd.get("website") ?? ""),
    };
    setSubmitting(true);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSent(true);
    } catch {
      setError("Не удалось отправить. Попробуйте ещё раз или напишите в Telegram.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="checklist" className="section relative overflow-hidden" style={{ background: "var(--gradient-brand)" }}>
      <div className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full bg-[oklch(0.78_0.15_78_/_0.18)] blur-3xl" aria-hidden />
      <div className="container-px mx-auto max-w-7xl relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="text-white">
            <span className="eyebrow-light mb-5">{c.eyebrow}</span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold leading-tight">{c.title}</h2>
            <p className="mt-5 text-lg text-white/85 leading-relaxed">{c.description}</p>
            <ul className="mt-6 space-y-2.5">
              {c.bullets.map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-white/90">
                  <CheckCircle2 size={20} className="text-[oklch(0.85_0.13_80)] shrink-0" />
                  <span className="font-medium">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-7 md:p-9 shadow-[var(--shadow-elegant)]">
            {sent ? (
              <div className="text-center py-8">
                <CheckCircle2 size={56} className="text-[oklch(0.55_0.14_155)] mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground">{c.successTitle}</h3>
                <p className="mt-2 text-muted-foreground">{c.successDescription}</p>
                <a
                  href={c.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta inline-flex mt-6"
                >
                  <Send size={18} /> {c.telegramLabel}
                </a>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl font-bold text-foreground">{c.formTitle}</h3>
                <p className="mt-2 text-muted-foreground">{c.formSubtitle}</p>
                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                  <Field label="Ваше имя" name="name" required />
                  <Field label="Телефон или email" name="contact" required />
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-10000px", width: 1, height: 1, opacity: 0 }}
                  />
                  <button type="submit" disabled={submitting} className="btn-cta w-full disabled:opacity-60">
                    <Send size={18} /> {submitting ? "Отправляем…" : c.submitLabel}
                  </button>
                  {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                  <p className="text-xs text-muted-foreground text-center leading-relaxed">
                    {c.consentText}{" "}
                    <a href="/privacy" className="underline hover:text-foreground">
                      Подробнее
                    </a>
                    .
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
