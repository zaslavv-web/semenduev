import { ArrowRight } from "lucide-react";
import { useCtaProps } from "./RequestDialog";
import type { LeadKind } from "./LeadDialogProvider";

export function CTA({
  title,
  subtitle,
  variant = "light",
  ctaLabel = "Записаться на диагностику",
  ctaKind = "diagnostic",
}: {
  title: string;
  subtitle?: string;
  variant?: "light" | "dark";
  ctaLabel?: string;
  ctaKind?: LeadKind;
}) {
  const dark = variant === "dark";
  const ctaProps = useCtaProps();
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
        <h3
          className={`font-display font-bold text-xl md:text-2xl ${
            dark ? "text-white" : "text-foreground"
          }`}
        >
          {title}
        </h3>
        {subtitle && (
          <p className={`mt-2 text-base ${dark ? "text-white/80" : "text-muted-foreground"}`}>
            {subtitle}
          </p>
        )}
      </div>
      <div className="shrink-0 w-full md:w-auto">
        <a {...ctaProps(ctaKind)} className="btn-cta w-full sm:w-auto">
          {ctaLabel} <ArrowRight size={18} />
        </a>
      </div>
    </div>
  );
}
