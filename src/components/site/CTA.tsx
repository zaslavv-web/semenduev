import { ArrowRight, FileDown } from "lucide-react";

export function CTA({
  title,
  subtitle,
  variant = "light",
}: {
  title: string;
  subtitle?: string;
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  return (
    <div
      className={`rounded-2xl p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-5 ${
        dark ? "text-white" : ""
      }`}
      style={{
        background: dark
          ? "var(--gradient-brand)"
          : "linear-gradient(135deg, oklch(0.97 0.01 80), oklch(0.94 0.02 80))",
        boxShadow: dark ? "var(--shadow-elegant)" : "var(--shadow-soft)",
      }}
    >
      <div className="max-w-2xl">
        <h3 className={`font-display font-bold text-xl md:text-2xl ${dark ? "text-white" : "text-foreground"}`}>
          {title}
        </h3>
        {subtitle && (
          <p className={`mt-2 text-base ${dark ? "text-white/80" : "text-muted-foreground"}`}>{subtitle}</p>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 shrink-0">
        <a href="#contacts" className="btn-cta whitespace-nowrap">
          Записаться <ArrowRight size={18} />
        </a>
        <a
          href="#checklist"
          className={dark ? "btn-ghost whitespace-nowrap" : "btn-outline whitespace-nowrap"}
        >
          <FileDown size={18} /> Чек-лист
        </a>
      </div>
    </div>
  );
}
