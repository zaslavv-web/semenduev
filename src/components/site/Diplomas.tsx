import { GraduationCap, FileText } from "lucide-react";
import { useSection } from "@/lib/content/ContentProvider";

export function Diplomas() {
  const c = useSection("diplomas");
  return (
    <section className="section bg-surface">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="eyebrow mb-5">{c.eyebrow}</span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">
            {c.title}
          </h2>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {c.credentials.map((cr) => (
            <div key={cr.title} className="card-soft">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "var(--gradient-brand)" }}
              >
                <GraduationCap size={22} className="text-white" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground">{cr.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{cr.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {c.items.map((d, i) => (
            <a
              key={i}
              href={d.pdf}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition"
            >
              <div className="aspect-[3/4] overflow-hidden bg-[oklch(0.96_0.01_80)] p-3 flex items-center justify-center">
                <img
                  src={d.src}
                  alt={d.alt || `Диплом ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 border-t border-border">
                {d.category && (
                  <div className="text-xs font-bold uppercase tracking-wider text-[oklch(0.45_0.13_70)] mb-1">
                    {d.category}
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <FileText size={14} /> Открыть PDF
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
