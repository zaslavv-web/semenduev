import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSection } from "@/lib/content/ContentProvider";
import { useCtaProps } from "./RequestDialog";

export function Header() {
  const [open, setOpen] = useState(false);
  const c = useSection("header");
  const ctaProps = useCtaProps();
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[oklch(0.18_0.04_255_/_0.85)] border-b border-white/10">
      <div className="container-px mx-auto max-w-7xl flex items-center justify-between h-16 md:h-20">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={c.logo} alt={c.logoAlt} className="h-9 w-auto" width={48} height={36} />
        </a>
        <nav className="hidden lg:flex items-center gap-7">
          {c.links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <a {...ctaProps(c.ctaHref)} className="hidden sm:inline-flex btn-cta !py-2.5 !px-4 !text-sm">
          {c.ctaLabel}
        </a>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2" aria-label="Меню">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[oklch(0.18_0.04_255)]">
          <div className="container-px mx-auto max-w-7xl py-4 flex flex-col gap-3">
            {c.links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-white/90 py-2 text-base font-medium">
                {l.label}
              </a>
            ))}
            <a
              {...ctaProps(c.ctaHref)}
              onClick={(e) => {
                setOpen(false);
                ctaProps(c.ctaHref).onClick?.(e);
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
