import { Link } from "@tanstack/react-router";
import { useSection } from "@/lib/content/ContentProvider";

export function Footer() {
  const c = useSection("footer");
  const copyright = c.copyright.replace("{year}", String(new Date().getFullYear()));
  return (
    <footer className="bg-[oklch(0.16_0.03_255)] text-white/75 py-12">
      <div className="container-px mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
          <div className="flex items-center gap-2.5">
            <img src={c.logo} alt={c.brand || "Logo"} className="h-8 w-auto" width={40} height={32} />
            {c.brand && <span className="font-display font-bold text-white">{c.brand}</span>}
          </div>
          <div className="text-sm">{copyright}</div>
          <div className="text-sm flex flex-wrap gap-5">
            <a href={c.phoneHref} className="hover:text-white">
              {c.phone}
            </a>
            <a href={c.emailHref} className="hover:text-white">
              {c.email}
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-xs text-white/60">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {c.privacyHref?.startsWith("/") ? (
              <Link to={c.privacyHref} className="hover:text-white underline-offset-4 hover:underline">
                {c.privacyLabel}
              </Link>
            ) : (
              <a href={c.privacyHref} className="hover:text-white underline-offset-4 hover:underline">
                {c.privacyLabel}
              </a>
            )}
            <a href={c.consentHref} className="hover:text-white underline-offset-4 hover:underline">
              {c.consentLabel}
            </a>
          </div>
          {c.requisites && <div className="md:text-right">{c.requisites}</div>}
        </div>
      </div>
    </footer>
  );
}
