import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FORM_ENDPOINT } from "@/lib/config";

export type LeadKind = "checklist" | "diagnostic";

type Ctx = {
  openLead: (kind: LeadKind) => void;
  openCallback: () => void;
};

const LeadCtx = createContext<Ctx>({ openLead: () => {}, openCallback: () => {} });

export function useLeadDialog() {
  return useContext(LeadCtx);
}

const LEAD_COPY: Record<LeadKind, { title: string; description: string; submit: string }> = {
  checklist: {
    title: "Получить антикризисный чек-лист",
    description: "Оставьте контакты — пришлём PDF-чек-лист и пригласим в Telegram-канал.",
    submit: "Получить чек-лист",
  },
  diagnostic: {
    title: "Заявка на диагностику",
    description: "Оставьте контакты — свяжусь лично в течение рабочего дня.",
    submit: "Записаться на диагностику",
  },
};

export function LeadDialogProvider({ children }: { children: ReactNode }) {
  const [leadKind, setLeadKind] = useState<LeadKind | null>(null);
  const [callbackOpen, setCallbackOpen] = useState(false);

  const openLead = useCallback((kind: LeadKind) => setLeadKind(kind), []);
  const openCallback = useCallback(() => setCallbackOpen(true), []);

  return (
    <LeadCtx.Provider value={{ openLead, openCallback }}>
      {children}
      <LeadDialog
        kind={leadKind}
        onOpenChange={(open) => {
          if (!open) setLeadKind(null);
        }}
      />
      <CallbackDialog open={callbackOpen} onOpenChange={setCallbackOpen} />
    </LeadCtx.Provider>
  );
}

function LeadDialog({
  kind,
  onOpenChange,
}: {
  kind: LeadKind | null;
  onOpenChange: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!kind) {
    return (
      <Dialog open={false} onOpenChange={onOpenChange}>
        <DialogContent />
      </Dialog>
    );
  }

  const copy = LEAD_COPY[kind];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting || !kind) return;
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      source: kind,
      name: String(fd.get("name") ?? "").trim().slice(0, 200),
      phone: String(fd.get("phone") ?? "").trim().slice(0, 200),
      message: String(fd.get("message") ?? "").trim().slice(0, 2000),
      website: String(fd.get("website") ?? ""),
    };
    if (!payload.name || !payload.phone) {
      setError("Заполните имя и телефон.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      onOpenChange(false);
      navigate({
        to: kind === "checklist" ? "/thank-you-checklist" : "/thank-you-diagnostic",
      });
    } catch {
      setError("Не удалось отправить. Попробуйте позже или позвоните нам.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={!!kind} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{copy.title}</DialogTitle>
          <DialogDescription>{copy.description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 mt-2">
          <DialogField label="Имя" name="name" required />
          <DialogField label="Телефон" name="phone" type="tel" required />
          {kind === "diagnostic" && (
            <label className="block">
              <span className="text-sm font-semibold text-foreground">Кратко о ситуации</span>
              <textarea
                name="message"
                rows={3}
                className="mt-1.5 w-full px-4 py-3 rounded-lg border border-border bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--brand)] transition resize-none"
              />
            </label>
          )}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-10000px", width: 1, height: 1, opacity: 0 }}
          />
          <button type="submit" disabled={submitting} className="btn-cta w-full disabled:opacity-60">
            {submitting ? "Отправляем…" : copy.submit} <ArrowRight size={18} />
          </button>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Нажимая кнопку, вы соглашаетесь с{" "}
            <a href="/privacy" className="underline hover:text-foreground">
              политикой конфиденциальности
            </a>
            .
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CallbackDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      source: "callback" as const,
      name: String(fd.get("name") ?? "").trim().slice(0, 200),
      phone: String(fd.get("phone") ?? "").trim().slice(0, 200),
      message: "Запрос обратного звонка",
      website: String(fd.get("website") ?? ""),
    };
    if (!payload.name || !payload.phone) {
      setError("Заполните имя и телефон.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      onOpenChange(false);
      navigate({ to: "/thank-you-diagnostic" });
    } catch {
      setError("Не удалось отправить. Попробуйте позже.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Перезвоните мне</DialogTitle>
          <DialogDescription>
            Оставьте номер — свяжемся в ближайшее рабочее время.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 mt-2">
          <DialogField label="Имя" name="name" required />
          <DialogField label="Телефон" name="phone" type="tel" required />
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-10000px", width: 1, height: 1, opacity: 0 }}
          />
          <button type="submit" disabled={submitting} className="btn-cta w-full disabled:opacity-60">
            {submitting ? "Отправляем…" : "Жду звонка"} <ArrowRight size={18} />
          </button>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DialogField({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full px-4 py-3 rounded-lg border border-border bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--brand)] transition"
      />
    </label>
  );
}
