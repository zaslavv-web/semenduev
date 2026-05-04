import { useState } from "react";
import logo from "@/assets/logo.png";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "Обо мне" },
  { href: "#how", label: "Как я работаю" },
  { href: "#company-steps", label: "Шаги для компании" },
  { href: "#process", label: "Диагностика" },
  { href: "#cases", label: "Кейсы" },
  { href: "#packages", label: "Пакеты" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[oklch(0.18_0.04_255_/_0.85)] border-b border-white/10">
      <div className="container-px mx-auto max-w-7xl flex items-center justify-between h-16 md:h-20">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={logo} alt="Семендуев — антикризисный менеджер" className="h-9 w-auto" width={48} height={36} />
          <span className="text-white font-display font-bold tracking-tight text-base md:text-lg">​</span>
        </a>
        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contacts" className="hidden md:inline-flex btn-cta !py-2.5 !px-4 !text-sm">
          Бесплатная диагностика
        </a>
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2"
          aria-label="Меню"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[oklch(0.18_0.04_255)]">
          <div className="container-px mx-auto max-w-7xl py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-white/90 py-2 text-base font-medium">
                {l.label}
              </a>
            ))}
            <a href="#contacts" onClick={() => setOpen(false)} className="btn-cta mt-2">
              Бесплатная диагностика
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
