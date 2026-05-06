import { GraduationCap, Award, FileText } from "lucide-react";

const diplomas = [
  { src: "/diplomas/diploma-1-1.jpg", pdf: "/diplomas/diploma-1.pdf" },
  { src: "/diplomas/diploma-2-1.jpg", pdf: "/diplomas/diploma-2.pdf" },
  { src: "/diplomas/diploma-3-1.jpg", pdf: "/diplomas/diploma-3.pdf" },
  { src: "/diplomas/diploma-4-1.jpg", pdf: "/diplomas/diploma-4.pdf" },
];

const credentials = [
  {
    icon: GraduationCap,
    title: "Кандидат экономических наук",
    text: 'Специальность 08.00.05 — Экономика и управление народным хозяйством. Тема диссертации: «Антикризисное управление предприятием в условиях высокой экономической нестабильности».',
  },
  {
    icon: Award,
    title: "ДПО «Консалтинг в управлении бизнесом» (2025)",
    text: "Основы консалтинга, методология консалтинга, создание консультационных программ, консультационный менеджмент.",
  },
];

export function Diplomas() {
  return (
    <section className="section bg-surface">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="eyebrow mb-5">Образование и квалификация</span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">
            Дипломы и сертификаты
          </h2>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {credentials.map((c) => (
            <div key={c.title} className="card-soft">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "var(--gradient-brand)" }}
              >
                <c.icon size={22} className="text-white" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground">{c.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {diplomas.map((d, i) => (
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
                  alt={`Диплом ${i + 1}`}
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
