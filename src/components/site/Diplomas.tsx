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

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {c.items.map((d, i) => (
            <a
              key={i}
              href={d.pdf}
              target="_blank"
              rel="noreferrer"
              className="group block bg-card border border-border rounded-xl overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition"
            >
              <div className="aspect-[3/4] overflow-hidden bg-surface-2">
                <img
                  src={d.src}
                  alt={d.alt || `Диплом ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <FileText size={14} /> Открыть PDF
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
