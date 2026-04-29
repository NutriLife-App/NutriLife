# NutriLife — Package and Plan Selection

## 1. Мета
Дати користувачу зрозумілий стартовий вибір режиму використання і одночасно показати базову продуктову та тарифну логіку NutriLife.

## 2. Product intent
Цей модуль не стільки про монетизацію, скільки про позиціювання продукту. Користувач має зрозуміти:
- для кого продукт;
- як він може використовуватися;
- де проходить межа між ознайомчим і ціннісним рівнем функцій.

## 3. MVP scope
Входить:
- вибір package type
- вибір plan tier
- відображення Premium як майбутнього рівня
- збереження вибору в state

Не входить:
- реальний paywall
- оплата
- trial logic
- billing
- промокоди

## 4. Пакети
### 4.1 Package type
- Individual
- Family

### 4.2 Призначення
Individual — для одного користувача.
Family — для родини або домогосподарства, але в MVP без складної multi-profile логіки.

## 5. Тарифи
### 5.1 Free
Стартова цінність продукту.
У MVP може бути просто доступним рівнем у UI.

### 5.2 Basic
Основний цільовий тариф MVP.
Показує головну користь NutriLife:
- персоналізований meal plan
- grocery list
- більш практичний досвід

### 5.3 Premium
Показується в UI як Coming later.
Не реалізується функціонально.

## 6. Theme and localization requirements
- light-first подача з повною підтримкою dark mode
- українська як основна мова
- англійська як друга мова
- package / plan labels зберігаються як keys, а не як хардкод текстів

## 7. User stories
- As a user, I want to choose how I plan to use NutriLife so that the app feels relevant to my situation.
- As a user, I want to understand the difference between free and basic value so that the app feels structured.
- As a user, I want premium to be visible but not confusing if it is not available yet.

## 8. UI requirements
- окремий екран після Welcome
- чітке розділення між package type і plan tier
- картки або великі selectable blocks
- зрозуміле позначення selected state
- Premium має виглядати недоступним, але не зламаним
- короткі описи переваг кожного рівня
- коректний вигляд у light і dark

## 9. Логіка
1. Користувач обирає package type.
2. Користувач обирає доступний plan tier.
3. Вибір зберігається.
4. Користувач продовжує в onboarding.

## 10. Дані
- packageType: individual | family
- planTier: free | basic | premium
- isPremiumAvailable: false

## 11. Validation
- package type має бути вибраний
- доступний plan tier має бути вибраний
- premium не повинен дозволяти continue

## 12. States
- nothing selected
- package selected
- plan selected
- both selected
- premium disabled

## 13. Edge cases
- користувач змінює package type після вибору тарифу
- користувач намагається натиснути Premium
- користувач повертається назад і змінює вибір

## 14. Acceptance criteria
- екран відкривається після Welcome
- можна обрати Individual або Family
- можна обрати Free або Basic
- Premium видно як Coming later
- continue активується лише після валідного вибору
- package type і plan tier передаються в Home та Settings
- тексти легко локалізуються

## 15. Out of scope
- реальна тарифікація
- справжні price cards
- абонентські цикли
- серверна логіка доступів

## 16. Notes for implementation
- не ускладнювати модуль paywall-логікою
- не змішувати package type і тариф в один control
- продуктова цінність має бути зрозуміліша за цінову логіку
