import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Contact } from "@/components/site/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Оставить заявку — Семендуев" },
      { name: "description", content: "Оставьте заявку на антикризисное управление. Ответим в течение рабочего дня." },
      { property: "og:title", content: "Оставить заявку — Семендуев" },
      { property: "og:description", content: "Оставьте заявку на антикризисное управление." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
