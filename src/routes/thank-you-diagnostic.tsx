import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Send, ArrowLeft } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useSection } from "@/lib/content/ContentProvider";

const TELEGRAM_URL = "https://t.me/semenduev_pro";

export const Route = createFileRoute("/thank-you-diagnostic")({
  head: () => ({
    meta: [
      { title: "Заявка принята — Семендуев" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Спасибо! Заявка на диагностику принята." },
    ],
  }),
  component: ThankYouDiagnosticPage,
});

function ThankYouDiagnosticPage() {
  const c = useSection("contact");
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1 section pt-24 md:pt-32">
        <div className="container-px mx-auto max-w-2xl text-center">
          <CheckCircle2 size={72} className="text-[oklch(0.55_0.14_155)] mx-auto mb-6" />
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground">
            Заявка принята
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Свяжусь с вами в течение рабочего дня. А пока — рекомендую подписаться на авторский Telegram-канал: там антикризисный чек-лист и регулярные разборы кейсов.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta inline-flex"
            >
              <Send size={18} /> Подписаться на канал
            </a>
            <a href={c.phoneHref} className="btn-outline inline-flex">
              {c.phone}
            </a>
          </div>

          <div className="mt-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft size={16} /> На главную
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
