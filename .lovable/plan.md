
## Что меняем

### 1. Меняем порядок блоков на главной
В `src/routes/index.tsx` меняем местами `<About />` и `<HowIWork />`. Новый порядок:
Hero → HowIWork (Подход) → About (Обо мне) → Process → CompanySteps → Checklist → Cases → Packages → Diplomas → Contact.

### 2. Сокращаем блок «Обо мне»
В `src/lib/content/defaults.ts` (секция `about`) оставляем тезисный формат:
- 1 короткий лид-абзац (1–2 предложения) вместо нескольких длинных параграфов
- Список `facts` (буллеты с галочками) — основные факты карьеры/опыта/цифры
- Убираем длинные параграфы из `paragraphs` (оставляем только лид)
- Нижний CTA-блок (`bottomCtaTitle/Subtitle`) под этим блоком удаляем (см. п.3)

`About.tsx` уже умеет рендерить и `paragraphs`, и `facts` — менять компонент не нужно, кроме удаления нижнего `<CTA />`.

### 3. По одной CTA на блок + попап-форма
Создаём единый компонент попапа `src/components/site/LeadDialog.tsx` (на базе `@/components/ui/dialog`) с двумя режимами:
- `kind="checklist"` — заголовок «Получить антикризисный чек-лист», поля: имя, телефон, email (опц.), honeypot
- `kind="diagnostic"` — заголовок «Заявка на диагностику», поля: имя, телефон, сообщение (опц.), honeypot

Сабмит идёт на `FORM_ENDPOINT` (`/send.php`) с `source: "checklist" | "diagnostic"`. После успеха `navigate` на `/thank-you-checklist` или `/thank-you-diagnostic`. Honeypot, длины и базовая валидация — как в `Contact.tsx`.

Заменяем текущий хук `useCtaProps` (который раньше переводил все CTA на `/contact`) на хук, открывающий нужный диалог. Делаем контекст `LeadDialogProvider` в `__root.tsx` с методом `openLead(kind)`. CTA-кнопки в каждом блоке принимают свой `kind` и вызывают `openLead(kind)` — это гарантирует, что каждая кнопка открывает форму **своего** блока, а не «последнюю».

Назначение CTA по блокам (по вашему порядку — Hero, Подход, Процесс, Шаги, Обо мне; чередование checklist/diagnostic):
- Hero → **diagnostic** («Записаться на диагностику»)
- HowIWork (Подход) → **checklist** («Получить антикризисный чек-лист»)
- Process → **diagnostic**
- CompanySteps (Шаги компании) → **checklist**
- About (Обо мне) → **diagnostic**

Оставшиеся блоки (Checklist, Cases, Packages, Diplomas) — продолжаем чередование, сохраняя по одной CTA на блок:
- Checklist (это профильный блок) → **checklist**
- Cases → **diagnostic**
- Packages → **checklist**
- Diplomas → **diagnostic**

Везде убираем «вторичные» кнопки и дубль-CTA: в `CTA.tsx` оставляем одну primary-кнопку (secondary рендерим только если явно передан), компоненты блоков переводим на новый `LeadButton`/обновлённый `useCtaProps`. Блок `Contact` сохраняем как полноразмерную форму на странице `/contact`.

### 4. Две страницы «Спасибо»
- Переименовываем текущую `/thank-you` логику в две отдельные:
  - `src/routes/thank-you-checklist.tsx` — заголовок «Чек-лист готов», кнопка **«Скачать PDF»** (`<a href="/checklist.pdf" download>` — файл пользователь загрузит сам в `public/`), кнопка **«Открыть в новой вкладке»** (`target="_blank"`), и кнопка-ссылка на TG `https://t.me/semenduev_pro`.
  - `src/routes/thank-you-diagnostic.tsx` — «Заявка принята», текст «Ответим в рабочее время», рекомендация подписаться на TG `https://t.me/semenduev_pro` (там же чек-лист), и контакт-телефон.
- Старый файл `src/routes/thank-you.tsx` удаляем (или оставляем редирект на diagnostic — на выбор; в плане удаляем). Тексты обеих страниц добавляем в `defaults.ts` отдельной секцией `thanks` для удобства редактирования.
- В обоих формах попапа после успеха `navigate({ to: "/thank-you-checklist" | "/thank-you-diagnostic" })`. То же — в форме на `/contact` (по умолчанию → diagnostic).

### 5. Шапка: иконка TG + телефон с попап-формой обратного звонка
В `Header.tsx`:
- Справа от навигации добавляем две иконки-кнопки: `Send` (Telegram) и `Phone`.
- TG — `<a href="https://t.me/semenduev_pro" target="_blank" rel="noopener">` с aria-label «Telegram».
- Телефон — кнопка, открывающая новый попап **«Перезвоните мне»** (`CallbackDialog.tsx`): поля имя + телефон, honeypot, сабмит на `/send.php` с `source: "callback"`, после успеха → `/thank-you-diagnostic`. Это отдельная мини-форма (как вы и подтвердили).
- Иконки активны и на десктопе, и в мобильном меню.
- Кнопка-CTA в шапке («Записаться») остаётся и открывает diagnostic-попап (через `openLead`).

### 6. Фиксированная шапка
Шапка уже имеет `sticky top-0 z-50` — она и так не пропадает при скролле. Чтобы гарантировать поведение и в мобильной, и в десктопной версии:
- Убедимся, что у `<html>`/`<body>` в `src/styles.css` **нет** `overflow-x: hidden` на корне (ломает sticky в Safari iOS) — при необходимости переносим на обёртку.
- Заменяем `sticky` на `fixed top-0 left-0 right-0` для гарантированной фиксации на всех устройствах и добавляем `padding-top` к `<main>` (или spacer-div высотой `h-16 md:h-20`), чтобы контент не уезжал под шапку.
- Проверяем якорные переходы (`#how`, `#about` и т.д.): добавляем `scroll-margin-top: 5rem` на секциях через утилитный класс, чтобы заголовок не прятался под фиксированной шапкой.

---

## Технические детали

**Новые файлы:**
- `src/components/site/LeadDialog.tsx` — единый попап (checklist/diagnostic)
- `src/components/site/CallbackDialog.tsx` — мини-попап для звонка
- `src/components/site/LeadDialogProvider.tsx` — контекст `openLead(kind)` / `openCallback()`
- `src/routes/thank-you-checklist.tsx`
- `src/routes/thank-you-diagnostic.tsx`

**Изменяемые файлы:**
- `src/routes/__root.tsx` — обернуть в `LeadDialogProvider`
- `src/routes/index.tsx` — поменять местами About/HowIWork
- `src/components/site/RequestDialog.tsx` — переписать `useCtaProps` под `openLead`
- `src/components/site/Header.tsx` — TG-иконка, иконка телефона, фикс-позиционирование
- `src/components/site/Hero.tsx`, `HowIWork.tsx`, `Process.tsx`, `CompanySteps.tsx`, `About.tsx`, `Cases.tsx`, `Packages.tsx`, `Diplomas.tsx`, `Checklist.tsx` — по одной CTA с нужным `kind`; убрать вторичные/дублирующие кнопки
- `src/components/site/CTA.tsx` — поддержка одной primary-кнопки с `kind`
- `src/components/site/Contact.tsx` — после успеха → `/thank-you-diagnostic`
- `src/lib/content/defaults.ts` — сократить тексты `about`, добавить секцию `thanks` (для двух страниц), добавить тексты для попапов и `callback`
- `src/styles.css` — `scroll-margin-top` для секций; проверка overflow на корне
- `src/routes/thank-you.tsx` — удалить (либо редирект на diagnostic)

**Файл чек-листа:** вы загрузите `public/checklist.pdf` сами. Кнопка «Скачать» и «Открыть» на `/thank-you-checklist` будут ссылаться на `/checklist.pdf`.

**Серверная часть:** `public/send.php` уже принимает разные `source` — изменений не требует. Новые значения `source`: `"checklist"`, `"diagnostic"`, `"callback"` будут попадать в тему/тело письма как есть.

**SEO:** обе страницы «Спасибо» — `noindex`, отдельные `title`/`description`. Остальные head-меты не трогаем.
