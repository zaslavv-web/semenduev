import { createFileRoute, Link } from "@tanstack/react-router";
import { FileDown, ExternalLink, Send, ArrowLeft } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const CHECKLIST_FILE = "/checklist.pdf";
const TELEGRAM_URL = "https://t.me/semenduev_pro";

export const Route = createFileRoute("/thank-you-checklist")({
  head: () => ({
    meta: [
      { title: "Чек-лист готов — Семендуев" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Скачайте антикризисный чек-лист для собственника." },
    ],
  }),
  component: ThankYouChecklistPage,
});

function ThankYouChecklistPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1 section pt-24 md:pt-32">
        <div className="container-px mx-auto max-w-2xl text-center">
          <div
            className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center mb-6"
            style={{ background: "var(--gradient-brand)" }}
          >
            <FileDown size={36} className="text-white" />
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground">
            Чек-лист готов
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Скачайте PDF или откройте его в новой вкладке. Свежие разборы и материалы — в авторском Telegram-канале.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={CHECKLIST_FILE} download className="btn-cta inline-flex">
              <FileDown size={18} /> Скачать PDF
            </a>
            <a
              href={CHECKLIST_FILE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex"
            >
              <ExternalLink size={18} /> Открыть в новой вкладке
            </a>
          </div>

          <div className="mt-10 p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-soft)]">
            <h2 className="font-display font-bold text-xl text-foreground">
              Подпишитесь на Telegram-канал
            </h2>
            <p className="mt-2 text-muted-foreground">
              Авторские разборы кейсов и новые антикризисные материалы.
            </p>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta inline-flex mt-5"
            >
              <Send size={18} /> Открыть канал в Telegram
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
