import { useSection } from "@/lib/content/ContentProvider";

export function Footer() {
  const c = useSection("footer");
  const copyright = c.copyright.replace("{year}", String(new Date().getFullYear()));
  return (
    <footer className="bg-[oklch(0.16_0.03_255)] text-white/75 py-12">
      <div className="container-px mx-auto max-w-7xl flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <img src={c.logo} alt={c.brand || "Logo"} className="h-8 w-auto" width={40} height={32} />
          {c.brand && <span className="font-display font-bold text-white">{c.brand}</span>}
        </div>
        <div className="text-sm">{copyright}</div>
        <div className="text-sm flex gap-5">
          <a href={c.phoneHref} className="hover:text-white">{c.phone}</a>
          <a href={c.emailHref} className="hover:text-white">{c.email}</a>
        </div>
      </div>
    </footer>
  );
}
