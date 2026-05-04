import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-[oklch(0.16_0.03_255)] text-white/75 py-12">
      <div className="container-px mx-auto max-w-7xl flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="Семендуев" className="h-8 w-auto" width={40} height={32} />
          <span className="font-display font-bold text-white">{"\n"}</span>
        </div>
        <div className="text-sm">
          © {new Date().getFullYear()} Виктор Семендуев · Антикризисное управление
        </div>
        <div className="text-sm flex gap-5">
          <a href="tel:+79269882199" className="hover:text-white">+7 926 988 21 99</a>
          <a href="mailto:viktor@semenduev.pro" className="hover:text-white">viktor@semenduev.pro</a>
        </div>
      </div>
    </footer>
  );
}
