import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { HowIWork } from "@/components/site/HowIWork";
import { Process } from "@/components/site/Process";
import { CompanySteps } from "@/components/site/CompanySteps";
import { Checklist } from "@/components/site/Checklist";
import { Cases } from "@/components/site/Cases";
import { Packages } from "@/components/site/Packages";
import { Diplomas } from "@/components/site/Diplomas";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Семендуев — антикризисное управление для бизнеса" },
      {
        name: "description",
        content:
          "Антикризисный менеджер Виктор Семендуев. Диагностика финансов, команды и процессов. Конкретный план выхода из кризиса. Бесплатная экспресс-диагностика за 1 день.",
      },
      { property: "og:title", content: "Семендуев — антикризисное управление для бизнеса" },
      {
        property: "og:description",
        content:
          "Находим причины убытков и управленческого хаоса. Формируем план выхода из кризиса.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <About />
        <HowIWork />
        <Process />
        <CompanySteps />
        <Checklist />
        <Cases />
        <Packages />
        <Diplomas />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
