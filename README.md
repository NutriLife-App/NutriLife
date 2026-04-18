# NutriLife landing page

Двомовний landing page для NutriLife на Next.js 16, React 19 і Tailwind CSS 4.

## Що всередині

- головна сторінка продукту NutriLife
- перемикач мов UA / EN
- секції Hero, Problem, Solution, How it works, For whom, Product preview, Partners, Waitlist, FAQ
- базові legal-сторінки: Privacy, Terms, Cookies

## Швидкий старт

```bash
pnpm install
pnpm dev
```

Відкрити локально:

```bash
http://localhost:3000
```

## Скрипти

```bash
pnpm dev
pnpm build
pnpm start
pnpm typecheck
```

## Waitlist-форма

За замовчуванням форма відкриває лист на `yurii.korenets@gmail.com`.

Якщо хочеш реальну відправку без зміни компонента, додай публічний endpoint у `.env.local`:

```bash
NEXT_PUBLIC_WAITLIST_ENDPOINT=https://your-endpoint.example.com
```

Очікується `POST` із JSON такого вигляду:

```json
{
  "email": "user@example.com",
  "source": "nutrilife-landing"
}
```

## Де редагувати тексти

- переклади: `lib/language-context.tsx`
- hero та інші секції: `components/landing/*`
- metadata: `app/layout.tsx`

## Що ще варто доробити перед публічним запуском

- підключити реальний endpoint для waitlist
- перевірити legal-тексти юристом перед публічним запуском
- додати реальні соціальні посилання, коли вони будуть готові
