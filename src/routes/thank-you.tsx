import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useSection } from "@/lib/content/ContentProvider";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Спасибо за заявку — Семендуев" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Спасибо! Ваша заявка отправлена." },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  const c = useSection("contact");
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1 section">
        <div className="container-px mx-auto max-w-2xl text-center">
          <CheckCircle2 size={72} className="text-[oklch(0.55_0.14_155)] mx-auto mb-6" />
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground">
            {c.successTitle}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            {c.successDescription}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-cta inline-flex">
              <ArrowLeft size={18} /> На главную
            </Link>
            <a href={c.phoneHref} className="btn-outline inline-flex">
              {c.phone}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
