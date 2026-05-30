import { createContext, useCallback, useContext, useState, type ReactNode, type MouseEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useSection } from "@/lib/content/ContentProvider";
import { FORM_ENDPOINT } from "@/lib/config";

type Ctx = { open: (source?: string) => void; close: () => void };
const RequestDialogCtx = createContext<Ctx>({ open: () => {}, close: () => {} });

export function useRequestDialog() {
  return useContext(RequestDialogCtx);
}

/**
 * Helper: returns props for CTA links/buttons.
 * If href points to "#contacts", intercepts navigation and opens the dialog.
 */
export function useCtaProps() {
  const { open } = useRequestDialog();
  return useCallback(
    (href?: string) => {
      const isRequest = !!href && href.startsWith("#contacts");
      if (!isRequest) return { href };
      return {
        href: href ?? "#",
        onClick: (e: MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          open(href);
        },
      };
    },
    [open],
  );
}

export function RequestDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <RequestDialogCtx.Provider value={{ open, close }}>
      {children}
      <RequestFormDialog open={isOpen} onOpenChange={setOpen} />
    </RequestDialogCtx.Provider>
  );
}

function RequestFormDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const c = useSection("contact");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      source: "dialog" as const,
      name: String(fd.get("name") ?? "").trim().slice(0, 200),
      phone: String(fd.get("phone") ?? "").trim().slice(0, 200),
      message: String(fd.get("message") ?? "").trim().slice(0, 2000),
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
      setError("Не удалось отправить заявку. Попробуйте позже.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleOpenChange(v: boolean) {
    onOpenChange(v);
    if (!v) setTimeout(() => {
      setSent(false);
      setError(null);
    }, 200);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg">
        {sent ? (
          <div className="text-center py-6">
            <CheckCircle2 size={56} className="text-[oklch(0.55_0.14_155)] mx-auto mb-4" />
            <DialogTitle className="font-display text-2xl font-bold text-foreground">{c.successTitle}</DialogTitle>
            <DialogDescription className="mt-2 text-muted-foreground">{c.successDescription}</DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl font-bold text-foreground">{c.formTitle}</DialogTitle>
              <DialogDescription className="text-muted-foreground">{c.formSubtitle}</DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="mt-2 space-y-4">
              <Field label={c.nameLabel} name="name" required />
              <Field label={c.phoneFieldLabel} name="phone" required />
              <label className="block">
                <span className="text-sm font-semibold text-foreground">{c.messageLabel}</span>
                <textarea
                  name="message"
                  rows={3}
                  className="mt-1.5 w-full px-4 py-3 rounded-lg border border-border bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--brand)] transition resize-none"
                />
              </label>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-10000px", width: 1, height: 1, opacity: 0 }}
              />
              <button type="submit" disabled={submitting} className="btn-cta w-full disabled:opacity-60">
                {submitting ? "Отправляем…" : c.submitLabel} <ArrowRight size={18} />
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
      </DialogContent>
    </Dialog>
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
