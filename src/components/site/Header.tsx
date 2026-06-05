import { useState } from "react";
import { Menu, X, Phone, Send } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSection } from "@/lib/content/ContentProvider";
import { useCtaProps } from "./RequestDialog";
import { useLeadDialog } from "./LeadDialogProvider";

const TELEGRAM_URL = "https://t.me/semenduev_pro";

const toHomeHref = (h: string) => {
  const hash = h.startsWith("#") ? h : `#${h}`;
  return `/${hash}`;
};

export function Header() {
  const [open, setOpen] = useState(false);
  const c = useSection("header");
  const ctaProps = useCtaProps();
  const { openCallback } = useLeadDialog();
  const navigate = useNavigate();

  const scrollToHash = (hash: string) => {
    const id = hash.replace(/^#/, "");
    if (!id) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // allow new-tab / modifier clicks to use the absolute href
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || (e as any).button === 1) return;
    e.preventDefault();
    setOpen(false);
    const onHome = typeof window !== "undefined" && window.location.pathname === "/";
    if (onHome) {
      scrollToHash(href);
    } else {
      navigate({ to: "/" }).then(() => {
        setTimeout(() => scrollToHash(href), 50);
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[oklch(0.18_0.04_255_/_0.85)] border-b border-white/10">
      <div className="container-px mx-auto max-w-7xl flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2.5" aria-label="На главную">
          <img src={c.logo} alt={c.logoAlt} className="h-9 w-auto" width={48} height={36} />
        </Link>
        <nav className="hidden lg:flex items-center gap-7">
          {c.links.map((l) => (
            <a
              key={l.href}
              href={toHomeHref(l.href)}
              onClick={(e) => handleNavClick(e, l.href)}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram-канал"
            className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-lg text-white/85 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Send size={20} />
          </a>
          <button
            type="button"
            onClick={openCallback}
            aria-label="Заказать обратный звонок"
            className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-lg text-white/85 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Phone size={20} />
          </button>
          <a {...ctaProps("diagnostic")} className="hidden sm:inline-flex btn-cta !py-2.5 !px-4 !text-sm">
            {c.ctaLabel}
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2" aria-label="Меню">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[oklch(0.18_0.04_255)]">
          <div className="container-px mx-auto max-w-7xl py-4 flex flex-col gap-3">
            {c.links.map((l) => (
              <a
                key={l.href}
                href={toHomeHref(l.href)}
                onClick={(e) => handleNavClick(e, l.href)}
                className="text-white/90 py-2 text-base font-medium"
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram-канал"
                className="inline-flex items-center justify-center w-11 h-11 rounded-lg text-white bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Send size={20} />
              </a>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openCallback();
                }}
                aria-label="Заказать обратный звонок"
                className="inline-flex items-center justify-center w-11 h-11 rounded-lg text-white bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Phone size={20} />
              </button>
            </div>
            <a
              {...ctaProps("diagnostic")}
              onClick={(e) => {
                ctaProps("diagnostic").onClick(e);
                setOpen(false);
              }}
              className="btn-cta mt-2"
            >
              {c.ctaLabel}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
