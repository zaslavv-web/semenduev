import { useState } from "react";
import { FileDown, CheckCircle2 } from "lucide-react";
import { useSection } from "@/lib/content/ContentProvider";

export function Checklist() {
  const c = useSection("checklist");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    const a = document.createElement("a");
    a.href = c.fileUrl;
    a.download = c.fileUrl.split("/").pop() ?? "file";
    a.click();
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
                <p className="mt-2 text-muted-foreground">
                  {c.successDescription}{" "}
                  <a href={c.fileUrl} className="text-[var(--brand)] underline font-semibold" download>
                    скачайте вручную
                  </a>
                  .
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl font-bold text-foreground">{c.formTitle}</h3>
                <p className="mt-2 text-muted-foreground">{c.formSubtitle}</p>
                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                  <Field label="Ваше имя" name="name" required />
                  <Field label="Телефон или email" name="contact" required />
                  <button type="submit" className="btn-cta w-full">
                    <FileDown size={18} /> {c.submitLabel}
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
