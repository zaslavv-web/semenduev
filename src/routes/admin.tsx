import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { defaultContent, type SectionKey, type SiteContent } from "@/lib/content/defaults";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LogOut, Save, Upload, RotateCcw, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Админ-панель" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
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
  const [mode, setMode] = useState<"signin" | "signup">("signin");
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

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 bg-card border border-border rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold">{mode === "signin" ? "Вход в админ-панель" : "Регистрация администратора"}</h1>
        <p className="text-sm text-muted-foreground">
          {mode === "signup"
            ? "Первый зарегистрированный пользователь автоматически получит роль администратора."
            : "Введите email и пароль администратора."}
        </p>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="password">Пароль</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        </div>
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "..." : mode === "signin" ? "Войти" : "Зарегистрироваться"}
        </Button>
        <button
          type="button"
          className="text-sm text-muted-foreground hover:text-foreground w-full text-center"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        >
          {mode === "signin" ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}
        </button>
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
};

const SECTION_KEYS = Object.keys(SECTION_LABELS) as SectionKey[];

function Editor() {
  const [active, setActive] = useState<SectionKey>("hero");
  const [data, setData] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  async function save(section: SectionKey) {
    setSaving(true);
    const { error } = await supabase
      .from("site_content")
      .upsert({ section, data: data[section] as never, updated_by: (await supabase.auth.getUser()).data.user?.id });
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Сохранено");
  }

  async function resetSection(section: SectionKey) {
    if (!confirm("Сбросить эту секцию к значениям по умолчанию?")) return;
    setSaving(true);
    await supabase.from("site_content").delete().eq("section", section);
    setData((d) => ({ ...d, [section]: defaultContent[section] }));
    setSaving(false);
    toast.success("Сброшено");
  }

  function update(section: SectionKey, value: unknown) {
    setData((d) => ({ ...d, [section]: value as never }));
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Загрузка…</div>;

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 border-r border-border bg-card p-4 flex flex-col gap-1 sticky top-0 h-screen overflow-y-auto">
        <div className="text-lg font-bold mb-3 px-2">Админ-панель</div>
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
        <div className="mt-auto pt-4 flex flex-col gap-2 border-t border-border">
          <a href="/" target="_blank" rel="noreferrer" className="text-sm text-center text-muted-foreground hover:text-foreground py-2">
            Открыть сайт ↗
          </a>
          <Button variant="outline" size="sm" onClick={() => supabase.auth.signOut()}>
            <LogOut size={14} className="mr-2" /> Выйти
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">{SECTION_LABELS[active]}</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => resetSection(active)}>
              <RotateCcw size={14} className="mr-2" /> Сброс
            </Button>
            <Button size="sm" onClick={() => save(active)} disabled={saving}>
              <Save size={14} className="mr-2" /> Сохранить
            </Button>
          </div>
        </div>
        <ValueEditor
          value={data[active]}
          onChange={(v) => update(active, v)}
          defaultValue={defaultContent[active]}
        />
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
};

function prettyLabel(k: string) {
  return LABELS[k] ?? k;
}
