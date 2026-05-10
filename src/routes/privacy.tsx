import { createFileRoute, Link } from "@tanstack/react-router";
import { useSection } from "@/lib/content/ContentProvider";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Политика конфиденциальности — Семендуев" },
      {
        name: "description",
        content:
          "Политика обработки персональных данных и согласие пользователей сайта Виктора Семендуева.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function PrivacyPage() {
  const c = useSection("privacy");
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="section bg-surface">
          <div className="container-px mx-auto max-w-3xl">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground inline-block mb-6"
            >
              ← На главную
            </Link>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">
              {c.title}
            </h1>
            {c.updatedAt && (
              <p className="mt-3 text-sm text-muted-foreground">
                Последнее обновление: {c.updatedAt}
              </p>
            )}
            <p className="mt-6 text-base md:text-lg text-foreground/85 leading-relaxed">
              {c.intro}
            </p>

            <div className="mt-10 space-y-8" id="consent">
              {c.sections.map((s) => (
                <article key={s.title}>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-base text-foreground/80 leading-relaxed whitespace-pre-line">
                    {s.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
