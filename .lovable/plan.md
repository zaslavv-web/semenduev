
## Цель

После сабмита формы «Получить чек-лист» **не скачивать PDF**, а показывать приглашение подписаться на Telegram-канал `https://t.me/semenduev_pro`.

## Изменения

### 1. `src/lib/content/defaults.ts` — секция `checklist`

Заменить блок:

```ts
formTitle: "Получите PDF на устройство",
formSubtitle: "Заполните форму — отправим файл мгновенно.",
submitLabel: "Получить материал",
fileUrl: "/files/antikrizisnye-mery-2026.pdf",
successTitle: "Файл скачивается!",
successDescription: "Если загрузка не началась — скачайте вручную.",
```

На:

```ts
formTitle: "Получите доступ к материалу",
formSubtitle: "Заполните форму — пришлём ссылку и пригласим в авторский Telegram-канал.",
submitLabel: "Получить доступ",
telegramUrl: "https://t.me/semenduev_pro",
telegramLabel: "Подписаться на канал",
successTitle: "Спасибо! Последний шаг.",
successDescription: "Чек-лист и новые материалы я публикую в авторском Telegram-канале. Подпишитесь, чтобы получить файл и не пропустить разборы кейсов.",
```

Поле `fileUrl` удаляется. TypeScript-тип `SiteContent['checklist']` пересоберётся автоматически (он выводится из `defaultContent`).

### 2. `src/components/site/Checklist.tsx`

- Удалить весь блок с `document.createElement("a")` / `a.download` / `a.click()` в `onSubmit` — оставить только `setSent(true)`.
- В success-блоке вместо ссылки «скачайте вручную» рендерить кнопку-ссылку:

```tsx
<a
  href={c.telegramUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="btn-cta inline-flex mt-6"
>
  <Send size={18} /> {c.telegramLabel}
</a>
```

(иконка `Send` из `lucide-react` вместо `FileDown`; `FileDown` оставить только на кнопке сабмита формы, либо тоже заменить на `Send` — заменю на `Send` для единообразия).

- Заменить параграф `successDescription` на обычный `<p>` без вложенной ссылки на PDF.

### 3. Админка

Ничего менять не нужно — `ValueEditor` в `src/routes/admin.tsx` рекурсивно генерит поля из объекта, поэтому новые `telegramUrl` и `telegramLabel` сразу появятся в секции «Чек-лист» как обычные текстовые поля.

### 4. Старые данные в БД

В `site_content` сейчас сохранены только `footer` и `about` (проверял через psql). Секция `checklist` в БД отсутствует → берётся из `defaultContent` → новые поля подхватятся автоматически. Миграция БД не нужна.

### 5. Файл PDF

Сам `public/files/antikrizisnye-mery-2026.pdf` оставляю на диске — на него больше ничего не ссылается, но удалять файл вне рамок задачи. Если хотите — отдельно скажите, удалю.

## Проверка после внедрения

1. Открыть `/#checklist`, заполнить «Имя» и «Телефон», нажать «Получить доступ».
2. Загрузка PDF **не должна** начаться.
3. Должен появиться блок с заголовком «Спасибо! Последний шаг.» и кнопкой «Подписаться на канал», ведущей в новой вкладке на `https://t.me/semenduev_pro`.
4. В админке `/admin` → секция «Чек-лист» — должны быть редактируемые поля `telegramUrl`, `telegramLabel`, обновлённые `successTitle`/`successDescription`.
