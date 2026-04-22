# ZABERG / SOTOVIK — Project Status

Живой документ для передачи между сессиями. Обновляй этот файл когда делаешь значимые изменения. Пиши по-русски, кратко, с указанием файлов и причин.

---

## Стек

- **Frontend**: React 18 + Vite + TypeScript, React Router v6, Tailwind CSS, lucide-react.
- **Backend**: Supabase (Postgres + Auth + Edge Functions для серверной логики).
- **Email**: Яндекс SMTP (smtp.yandex.ru:465, SSL) — из Edge Function через Deno SMTP.
- **Messenger**: Telegram Bot API (sendMessage).
- **Статическая витрина**: продукты хранятся в `src/data/products.ts` (локальный массив). Supabase для продуктов пока не используется.

## Общая структура сайта

### Публичные страницы
- `/` — Home (`src/pages/Home.tsx`)
- `/catalog` и `/catalog/:category` — каталог с фильтрами (`src/pages/Catalog.tsx`)
- `/product/:id` — карточка товара (`src/pages/ProductDetail.tsx`)
- `/cart` — корзина (`src/pages/Cart.tsx`)

### Служебные (скрытые от юзер-навигации)
- `/login` — вход для админа (не линкуется из UI)
- `/admin` — админ-каталог, защищён `AdminRoute`

### Удалено (см. «История»)
- `/register`, `/profile` — личного кабинета нет.

## Ключевые компоненты

- `src/components/Layout.tsx` — шапка (desktop/mobile), левый сайдбар со «язычком» сворачивания, мобильный drawer (бургер), нижняя навигация.
- `src/components/ProductCard.tsx` — карточка товара в сетке (Link в `/product/:id`).
- `src/components/ProductFilters.tsx` — фильтры каталога.
- `src/components/BuyForm.tsx` — **модальное окно быстрого заказа** (имя опц., телефон РФ обяз.), используется на ProductDetail и в Cart.
- `src/components/ChatWidget.tsx` — AI-чат (OpenAI, опциональный).

## Корзина и идентификация юзера (MVP)

- **Нет логина.** Юзер идентифицируется по паре `visitor_id` (UUID в куке `z_visitor_id`, 1 год) + IP (фиксируется на сервере при заказе).
- **Корзина в localStorage**, ключ `z_cart_<visitor_id>`, массив `{productId, qty}`.
- Хранилище: `src/lib/visitor.ts` (getOrCreateVisitorId, cookie helpers).
- Контекст: `src/context/CartContext.tsx` (`useCart()` → items, addItem, removeItem, setQty, clear, total).

## Заказы

- Таблица Supabase `orders` (миграция `supabase/migrations/20260422_orders.sql`).
- Колонки: `id (uuid pk)`, `order_code (text unique short)`, `visitor_id (uuid)`, `ip (text)`, `name (text null)`, `phone (text)`, `items (jsonb)`, `source (text: 'buy_now' | 'cart')`, `total (int)`, `created_at (timestamptz default now())`.
- RLS: anon может `insert`, но не `select/update/delete`. Service role — всё.
- Edge Function `supabase/functions/submit-order/index.ts`:
  1. Валидирует телефон РФ и payload.
  2. Пишет заказ в БД (service role).
  3. Шлёт email менеджеру через Яндекс SMTP.
  4. Шлёт сообщение в Telegram.
  5. Возвращает `{ order_code }`.
- Фронт вызывает функцию через `supabase.functions.invoke('submit-order', …)`.

## Переменные окружения

### Фронтенд (`VITE_*`, публичные — попадают в бандл)
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_OPENAI_API_KEY` (для чат-виджета, опционально)

### Edge Function `submit-order` (секреты Supabase, **не префиксуются VITE**)
Задаются через `supabase secrets set …` или в Dashboard → Edge Functions → Secrets:
- `SUPABASE_URL` — автоматически доступна в рантайме функций.
- `SUPABASE_SERVICE_ROLE_KEY` — автоматически доступна.
- `MANAGER_EMAIL` — почта менеджера (куда летят заказы).
- `YANDEX_SMTP_USER` — логин yandex (полный email, например `zaberg@yandex.ru`).
- `YANDEX_SMTP_PASSWORD` — **пароль приложения** из Яндекс-почты (не обычный).
- `YANDEX_SMTP_FROM` — отправитель (обычно = `YANDEX_SMTP_USER`).
- `TELEGRAM_BOT_TOKEN` — токен бота.
- `TELEGRAM_CHAT_ID` — id чата/канала менеджера.

Все эти значения хранятся **только на сервере** и недоступны клиенту.

---

## Что сделано (хронологически)

- Редизайн каталога под премиум-стиль (design_new).
- Глобальные фильтры, админ-инструменты каталога.
- Шапка с крутящимся слайдшоу лого (design_new/ChatGPT Image…).
- Левый сайдбар: категории с раскрываемыми брендами; свёртывание через «язычок» на правом крае.
- Мобильный бургер + выдвижной drawer с той же иерархией.
- Бренды в сайдбаре кликабельные → `/catalog/<cat>?brand=<Brand>`, чип «Бренд: X ✕» на странице каталога.
- `useProductFilters` сохраняет неуправляемые query-параметры (brand) при синхронизации URL.

### В рамках текущей задачи (удаление ЛК + заказы)
- Удалены пользовательские страницы `/register`, `/profile`, иконки профиля/юзера в шапке и нижней навигации.
- `AuthContext` и `/login` оставлены **только для админа** (`/admin`). Из пользовательского UI не линкуются.
- Создан `visitor_id` (cookie `z_visitor_id`) и `CartContext` (localStorage).
- Создан компонент `BuyForm` — форма быстрого заказа (имя опц., телефон РФ).
- Кнопки «Купить» / «В корзину» на `ProductCard`, `ProductDetail`, `Cart`.
- Миграция `supabase/migrations/20260422_orders.sql` с таблицей `orders` и RLS.
- Edge Function `supabase/functions/submit-order/index.ts` — DB + Яндекс SMTP + Telegram.
- `.env.example` обновлён (фронт-часть); серверные секреты описаны выше и в этом файле.

---

## Что надо сделать / TODO

### Блокеры для продакшна
- [ ] Задеплоить миграцию `orders`: `supabase db push` (требует Supabase CLI).
- [ ] Задеплоить Edge Function: `supabase functions deploy submit-order --no-verify-jwt`.
- [ ] Установить секреты функции:
  ```
  supabase secrets set MANAGER_EMAIL=... YANDEX_SMTP_USER=... YANDEX_SMTP_PASSWORD=... \
                      YANDEX_SMTP_FROM=... TELEGRAM_BOT_TOKEN=... TELEGRAM_CHAT_ID=...
  ```
- [ ] В Яндекс.Почте включить «Пароль приложений» и использовать его в `YANDEX_SMTP_PASSWORD` (обычный пароль от почты НЕ работает с SMTP).
- [ ] Создать Telegram-бота через @BotFather, добавить в нужный чат, получить `chat_id` (например, через @userinfobot или `getUpdates`).
- [ ] Проверить end-to-end: быстрый заказ → запись в БД → письмо → Telegram.

### Улучшения / будущее
- [ ] Перенести каталог продуктов в Supabase (сейчас статический массив).
- [ ] Серверная валидация/rate-limit по IP (сейчас только клиентская + БД insert).
- [ ] reCAPTCHA или honeypot на форме заказа (защита от спама).
- [ ] Страница «спасибо за заказ» / улучшенное состояние success в модалке.
- [ ] Логирование ошибок Edge Function (Sentry или supabase logs).
- [ ] Полноценный checkout из корзины: адрес, доставка, варианты оплаты.
- [ ] Редизайн мобильной нижней навигации (после удаления «Profile» там 3 пункта).

---

## Важные правила / гейты

- **Не коммить** `.env`, `.env.local`, `.claude/settings.local.json`. Всё это уже в `.gitignore` (проверь при сомнениях).
- **Секреты Edge Function** никогда не идут через `VITE_*` — они доступны только серверу.
- **RLS включён** для `orders`: anon может только INSERT, чтение только через service_role (в т.ч. из админки позже).
- Телефон валидируется строго РФ: `/^\+7\d{10}$/` после очистки от форматирования.
- Куки `z_visitor_id` ставится с `SameSite=Lax; Max-Age=31536000; Path=/`.

## Файлы-ориентиры для нового агента

- Маршруты: `src/App.tsx`
- Хедер/сайдбар/drawer: `src/components/Layout.tsx`
- Корзина (состояние): `src/context/CartContext.tsx`
- Посетитель/куки: `src/lib/visitor.ts`
- Форма заказа: `src/components/BuyForm.tsx`
- Карточка: `src/components/ProductCard.tsx`
- Детальная: `src/pages/ProductDetail.tsx`
- Корзина (страница): `src/pages/Cart.tsx`
- Supabase клиент: `src/lib/supabase.ts`
- Edge Function: `supabase/functions/submit-order/index.ts`
- Миграции: `supabase/migrations/`
