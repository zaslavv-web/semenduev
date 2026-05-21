import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { defaultContent, type SectionKey, type SiteContent } from "@/lib/content/defaults";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LogOut, Upload, RotateCcw, Plus, Trash2, Check, Loader2, Monitor, Smartphone, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null);
    });
    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user?.id ?? null);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) {
      setIsAdmin(false);
      return;
    }
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [userId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Загрузка…</div>;
  }
  if (!userId) return <AuthForm />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-2xl font-bold">Доступ запрещён</h1>
        <p className="text-muted-foreground">У этой учётной записи нет прав администратора.</p>
        <Button variant="outline" onClick={() => supabase.auth.signOut()}>
          <LogOut size={16} className="mr-2" /> Выйти
        </Button>
      </div>
    );
  }
  return <Editor />;
}

function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Регистрация успешна. Вы вошли в систему.");
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Письмо со ссылкой для восстановления отправлено на email.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Вход выполнен");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setBusy(false);
    }
  }

  const titles = {
    signin: "Вход в админ-панель",
    signup: "Регистрация администратора",
    forgot: "Восстановление пароля",
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 bg-card border border-border rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold">{titles[mode]}</h1>
        <p className="text-sm text-muted-foreground">
          {mode === "signup"
            ? "Первый зарегистрированный пользователь автоматически получит роль администратора."
            : mode === "forgot"
            ? "Введите email — мы пришлём ссылку для сброса пароля."
            : "Введите email и пароль администратора."}
        </p>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        {mode !== "forgot" && (
          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>
        )}
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "..." : mode === "signin" ? "Войти" : mode === "signup" ? "Зарегистрироваться" : "Отправить ссылку"}
        </Button>
        {mode === "forgot" && (
          <p className="text-xs text-muted-foreground">
            Ссылка действует ограниченное время и срабатывает только при первом
            переходе. Если ваш почтовый клиент или антивирус автоматически
            "проверяет" ссылки, она может сгореть до того, как вы её откроете —
            тогда запросите новую.
          </p>
        )}

        <div className="flex flex-col gap-1.5">
          {mode === "signin" && (
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-foreground w-full text-center"
              onClick={() => setMode("forgot")}
            >
              Забыли пароль?
            </button>
          )}
          <button
            type="button"
            className="text-sm text-muted-foreground hover:text-foreground w-full text-center"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin" ? "Нет аккаунта? Зарегистрироваться" : mode === "signup" ? "Уже есть аккаунт? Войти" : "Вернуться ко входу"}
          </button>
        </div>
      </form>
    </div>
  );
}

const SECTION_LABELS: Record<SectionKey, string> = {
  header: "Шапка",
  hero: "Главный экран",
  about: "Обо мне",
  howIWork: "Как я работаю",
  companySteps: "Шаги для компании",
  checklist: "Чек-лист",
  process: "Этапы работы",
  tools: "Инструменты",
  cases: "Кейсы",
  packages: "Пакеты",
  contact: "Контакты",
  footer: "Футер",
  diplomas: "Дипломы",
  privacy: "Политика конфиденциальности",
  analytics: "Аналитика и пиксели",
};


const SECTION_KEYS = Object.keys(SECTION_LABELS) as SectionKey[];

function Editor() {
  const [active, setActive] = useState<SectionKey>("hero");
  const [data, setData] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"idle" | "dirty" | "saving" | "saved" | "error">("idle");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const dirtySections = useRef<Set<SectionKey>>(new Set());
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const dataRef = useRef<SiteContent>(defaultContent);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const load = async () => {
    setLoading(true);
    const { data: rows } = await supabase.from("site_content").select("section, data");
    const next = { ...defaultContent } as SiteContent;
    for (const row of rows ?? []) {
      const k = row.section as SectionKey;
      if (k in defaultContent) {
        (next as Record<string, unknown>)[k] = {
          ...(defaultContent[k] as object),
          ...(row.data as object),
        };
      }
    }
    setData(next);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  async function flushSave() {
    if (dirtySections.current.size === 0) return;
    const sections = Array.from(dirtySections.current);
    dirtySections.current.clear();
    setStatus("saving");
    const userId = (await supabase.auth.getUser()).data.user?.id;
    const rows = sections.map((s) => ({ section: s, data: dataRef.current[s] as never, updated_by: userId }));
    const { error } = await supabase.from("site_content").upsert(rows);
    if (error) {
      setStatus("error");
      toast.error(error.message);
      sections.forEach((s) => dirtySections.current.add(s));
    } else {
      setStatus("saved");
      setTimeout(() => setStatus((s) => (s === "saved" ? "idle" : s)), 1500);
    }
  }

  function scheduleSave(section: SectionKey) {
    dirtySections.current.add(section);
    setStatus("dirty");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(flushSave, 700);
  }

  async function resetSection(section: SectionKey) {
    if (!confirm("Сбросить эту секцию к значениям по умолчанию?")) return;
    await supabase.from("site_content").delete().eq("section", section);
    setData((d) => ({ ...d, [section]: defaultContent[section] }));
    toast.success("Сброшено");
  }

  function update(section: SectionKey, value: unknown) {
    setData((d) => ({ ...d, [section]: value as never }));
    scheduleSave(section);
  }

  function reloadPreview() {
    if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Загрузка…</div>;

  const StatusBadge = () => {
    const map = {
      idle: { text: "Все изменения сохранены", icon: <Check size={14} />, cls: "text-muted-foreground" },
      dirty: { text: "Ожидает сохранения…", icon: <Loader2 size={14} className="animate-spin" />, cls: "text-amber-600" },
      saving: { text: "Сохранение…", icon: <Loader2 size={14} className="animate-spin" />, cls: "text-blue-600" },
      saved: { text: "Сохранено", icon: <Check size={14} />, cls: "text-green-600" },
      error: { text: "Ошибка сохранения", icon: <span>!</span>, cls: "text-destructive" },
    } as const;
    const s = map[status];
    return (
      <div className={`inline-flex items-center gap-1.5 text-xs font-medium ${s.cls}`}>
        {s.icon} {s.text}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-56 border-r border-border bg-card flex flex-col sticky top-0 h-screen">
        <div className="p-4 border-b border-border">
          <div className="text-base font-bold">Контент сайта</div>
          <div className="mt-1"><StatusBadge /></div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-0.5">
          {SECTION_KEYS.map((k) => (
            <button
              key={k}
              onClick={() => setActive(k)}
              className={`text-left px-3 py-2 rounded-md text-sm font-medium transition ${
                active === k ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
              }`}
            >
              {SECTION_LABELS[k]}
            </button>
          ))}
        </div>
        <div className="p-3 border-t border-border flex flex-col gap-2">
          <a href="/" target="_blank" rel="noreferrer" className="text-xs text-center text-muted-foreground hover:text-foreground py-1">
            Открыть сайт ↗
          </a>
          <Button variant="outline" size="sm" onClick={() => supabase.auth.signOut()}>
            <LogOut size={14} className="mr-2" /> Выйти
          </Button>
        </div>
      </aside>

      {/* Editor column */}
      <div className="w-[420px] border-r border-border flex flex-col h-screen sticky top-0">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-card">
          <h1 className="text-lg font-bold">{SECTION_LABELS[active]}</h1>
          <Button variant="ghost" size="sm" onClick={() => resetSection(active)} title="Сбросить секцию">
            <RotateCcw size={14} />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <ValueEditor
            value={data[active]}
            onChange={(v) => update(active, v)}
            defaultValue={defaultContent[active]}
          />
          <p className="mt-6 text-xs text-muted-foreground">
            Изменения сохраняются автоматически и сразу появляются на сайте справа.
          </p>
        </div>
      </div>

      {/* Live preview */}
      <main className="flex-1 flex flex-col h-screen sticky top-0 bg-muted/30">
        <div className="px-4 py-2 border-b border-border bg-card flex items-center justify-between gap-2">
          <div className="text-xs text-muted-foreground">Живой превью</div>
          <div className="flex items-center gap-1">
            <Button variant={device === "desktop" ? "secondary" : "ghost"} size="sm" onClick={() => setDevice("desktop")}>
              <Monitor size={14} />
            </Button>
            <Button variant={device === "mobile" ? "secondary" : "ghost"} size="sm" onClick={() => setDevice("mobile")}>
              <Smartphone size={14} />
            </Button>
            <Button variant="ghost" size="sm" onClick={reloadPreview} title="Обновить">
              <RefreshCw size={14} />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto flex items-start justify-center p-4">
          <iframe
            ref={iframeRef}
            src={`/?preview=1#${active}`}
            title="Preview"
            className="bg-white rounded-md shadow-lg border border-border transition-all"
            style={{
              width: device === "mobile" ? 390 : "100%",
              height: device === "mobile" ? 800 : "100%",
              minHeight: "100%",
            }}
          />
        </div>
      </main>
    </div>
  );
}

// ---- Generic value editor ----

function ValueEditor({
  value,
  onChange,
  defaultValue,
  path = "",
}: {
  value: unknown;
  onChange: (v: unknown) => void;
  defaultValue: unknown;
  path?: string;
}) {
  if (Array.isArray(value)) {
    const arr = value as unknown[];
    const sample = (defaultValue as unknown[])?.[0] ?? arr[0] ?? "";
    return (
      <div className="space-y-3">
        {arr.map((item, i) => (
          <div key={i} className="border border-border rounded-lg p-4 bg-card relative">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">#{i + 1}</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const next = arr.slice();
                  next.splice(i, 1);
                  onChange(next);
                }}
              >
                <Trash2 size={14} />
              </Button>
            </div>
            <ValueEditor
              value={item}
              defaultValue={sample}
              onChange={(v) => {
                const next = arr.slice();
                next[i] = v;
                onChange(next);
              }}
              path={`${path}[${i}]`}
            />
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange([...arr, structuredClone(sample)])}
        >
          <Plus size={14} className="mr-2" /> Добавить элемент
        </Button>
      </div>
    );
  }

  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const dObj = (defaultValue as Record<string, unknown>) ?? {};
    return (
      <div className="space-y-4">
        {Object.keys(obj).map((k) => (
          <FieldWrapper key={k} label={k}>
            <ValueEditor
              value={obj[k]}
              defaultValue={dObj[k]}
              onChange={(v) => onChange({ ...obj, [k]: v })}
              path={path ? `${path}.${k}` : k}
            />
          </FieldWrapper>
        ))}
      </div>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="inline-flex items-center gap-2">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
        <span className="text-sm">{value ? "Да" : "Нет"}</span>
      </label>
    );
  }

  // string
  const str = String(value ?? "");
  const isImage = looksLikeImage(path, str);
  if (isImage) return <ImageField value={str} onChange={(v) => onChange(v)} />;
  if (str.length > 80 || str.includes("\n")) {
    return <Textarea value={str} rows={4} onChange={(e) => onChange(e.target.value)} />;
  }
  return <Input value={str} onChange={(e) => onChange(e.target.value)} />;
}

function FieldWrapper({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{prettyLabel(label)}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function looksLikeImage(path: string, value: string) {
  const p = path.toLowerCase();
  if (p.endsWith("logo") || p.endsWith("portrait") || p.endsWith("backgroundimage") || p.endsWith("image") || p.endsWith("img")) return true;
  if (/\.(png|jpe?g|webp|gif|svg|avif)(\?|$)/i.test(value)) return true;
  return false;
}

function ImageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false);

  async function upload(file: File) {
    setBusy(true);
    try {
      const ext = file.name.split(".").pop() || "bin";
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("site-images").upload(path, file, { cacheControl: "3600" });
      if (error) throw error;
      const { data } = supabase.storage.from("site-images").getPublicUrl(path);
      onChange(data.publicUrl);
      toast.success("Изображение загружено");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      {value && (
        <div className="rounded-lg border border-border p-2 bg-muted/30 inline-block">
          <img src={value} alt="" className="max-h-32 max-w-full" />
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-2">
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="URL изображения" />
        <label className="inline-flex">
          <Button asChild variant="outline" size="default" disabled={busy}>
            <span className="cursor-pointer">
              <Upload size={14} className="mr-2" /> {busy ? "..." : "Загрузить"}
            </span>
          </Button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
            }}
          />
        </label>
      </div>
    </div>
  );
}

const LABELS: Record<string, string> = {
  title: "Заголовок",
  subtitle: "Подзаголовок",
  description: "Описание",
  text: "Текст",
  eyebrow: "Надзаголовок",
  ctaLabel: "Текст кнопки",
  ctaHref: "Ссылка кнопки",
  primaryCtaLabel: "Главная кнопка — текст",
  primaryCtaHref: "Главная кнопка — ссылка",
  secondaryCtaLabel: "Вторая кнопка — текст",
  secondaryCtaHref: "Вторая кнопка — ссылка",
  href: "Ссылка",
  label: "Текст",
  logo: "Логотип",
  logoAlt: "Alt логотипа",
  portrait: "Портрет",
  backgroundImage: "Фоновое изображение",
  paragraphs: "Параграфы",
  facts: "Факты",
  links: "Ссылки",
  stats: "Статистика",
  cards: "Карточки",
  steps: "Шаги",
  items: "Элементы",
  bullets: "Пункты списка",
  badges: "Бейджи",
  ctaTitle: "Заголовок CTA",
  ctaSubtitle: "Подзаголовок CTA",
  bottomCtaTitle: "Нижний CTA — заголовок",
  bottomCtaSubtitle: "Нижний CTA — подзаголовок",
  formTitle: "Заголовок формы",
  formSubtitle: "Подзаголовок формы",
  submitLabel: "Текст кнопки отправки",
  successTitle: "Заголовок после отправки",
  successDescription: "Описание после отправки",
  fileUrl: "Ссылка на файл",
  phone: "Телефон",
  phoneHref: "Ссылка телефона",
  phoneLabel: "Подпись телефона",
  email: "Email",
  emailHref: "Ссылка email",
  emailLabel: "Подпись email",
  nameLabel: "Поле «Имя» — подпись",
  phoneFieldLabel: "Поле «Телефон» — подпись",
  messageLabel: "Поле «Сообщение» — подпись",
  brand: "Название бренда",
  copyright: "Копирайт",
  problem: "Проблема",
  cause: "Причина",
  solution: "Решение",
  result: "Результат",
  name: "Название",
  sub: "Подзаголовок",
  cta: "Текст кнопки",
  featured: "Рекомендуемый",
  v: "Значение",
  l: "Подпись",
  linkLabel: "Текст ссылки",
  linkHref: "Ссылка",
  tagline: "Сильная цитата",
  tools: "Инструменты этапа",
  category: "Категория",
  consentText: "Текст согласия под формой",
  urgencyText: "Сообщение о срочности",
  privacyLabel: "Политика — текст ссылки",
  privacyHref: "Политика — ссылка",
  consentLabel: "Согласие — текст ссылки",
  consentHref: "Согласие — ссылка",
  requisites: "Реквизиты",
  credentials: "Образование (карточки)",
  intro: "Вступление",
  sections: "Разделы",
  updatedAt: "Дата обновления",
  yandexMetrikaId: "Яндекс.Метрика — ID счётчика",
  googleAnalyticsId: "Google Analytics — Measurement ID (G-XXXX)",
  googleAdsId: "Google Ads — Conversion ID (AW-XXXX)",
  googleTagManagerId: "Google Tag Manager — ID (GTM-XXXX)",
  vkPixelId: "VK Пиксель — ID",
  topMailRuId: "Top.Mail.Ru — ID счётчика",
  facebookPixelId: "Facebook Pixel — ID",
  customHeadHtml: "Произвольный HTML в <head> (любые скрипты)",
  customBodyHtml: "Произвольный HTML перед </body>",
};


function prettyLabel(k: string) {
  return LABELS[k] ?? k;
}
