## Что чиним

### 1. Настройка Supabase (вы — вручную)
Откройте **Cloud → Users → Auth Settings** (или Backend → Authentication → URL Configuration) и добавьте в **Redirect URLs**:
- `https://semenduev.lovable.app/reset-password`
- `https://semenduev.lovable.app/admin`
- `https://id-preview--480d868f-303d-4bcf-8c0b-9776779b7970.lovable.app/reset-password` (для превью)
- `https://id-preview--480d868f-303d-4bcf-8c0b-9776779b7970.lovable.app/admin`

Без этого Supabase будет всегда редиректить на корень `/`, игнорируя наш `redirectTo`.

### 2. Глобальный обработчик recovery + ошибок (правлю в коде)

**`src/routes/__root.tsx`** — добавить эффект, который:
- слушает `supabase.auth.onAuthStateChange` и при событии `PASSWORD_RECOVERY` навигирует на `/reset-password` (на случай если Supabase всё же перебросил на `/`);
- при загрузке проверяет `window.location.hash` на `error=access_denied` / `error_code=otp_expired` — показывает toast "Ссылка истекла или уже использована. Запросите новую." и чистит hash.

### 3. Понятная ошибка на `/reset-password`

**`src/routes/reset-password.tsx`** — если по таймауту (≈3 сек) не пришёл `PASSWORD_RECOVERY` и нет сессии, показать сообщение «Ссылка недействительна или истекла» + кнопку «Запросить новую» (ведёт на `/admin` в режиме forgot).

### 4. Кнопка «Запросить новую ссылку» в режиме forgot

В `admin.tsx` добавить читаемую подсказку, что ссылка действует ограниченное время и работает только при первом клике (некоторые антивирусы/почтовые превью могут "прокликивать" ссылку — тогда она сгорит до того, как вы её откроете).

## Технические детали

- Listener в `__root.tsx` ставится один раз через `useEffect` и unsubscribe на cleanup.
- Хеш `#error=...` парсится через `URLSearchParams(hash.slice(1))`.
- На `/reset-password` добавляется state `expired` с таймером 3000мс; если `ready` не выставился — рендерим экран ошибки вместо формы.

## Файлы

- `src/routes/__root.tsx` — добавить useEffect с listener и обработкой hash-ошибок (плюс импорт useEffect, useNavigate, supabase, toast).
- `src/routes/reset-password.tsx` — добавить state `expired`, таймер, экран ошибки.
- `src/routes/admin.tsx` — короткая подсказка под формой forgot.
