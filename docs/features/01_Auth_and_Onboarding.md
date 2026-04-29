# NutriLife — Auth and Onboarding

## 1. Мета
Допомогти новому користувачу швидко зрозуміти цінність NutriLife, обрати стартовий режим використання і пройти базовий онбординг без перевантаження.

## 2. Product intent
Це не важка реєстрація, а м’який вхід у продукт. Користувач послідовно залишає лише ті дані, які потрібні для базової персоналізації.

## 3. MVP scope
Входить:
- Welcome screen
- Sign in placeholder
- Start onboarding flow
- Multi-step onboarding
- Базове збереження даних у локальному state

Не входить:
- реальна бекенд-авторизація
- social login
- reset password
- email verification
- multi-device sync

## 4. User stories
- As a new user, I want to quickly understand what NutriLife does so that I know whether it is useful for me.
- As a new user, I want to move through onboarding step by step so that I am not overwhelmed.
- As a user, I want my entered data to be reflected in the app so that the experience feels personalized.

## 5. Основний сценарій
1. Користувач відкриває застосунок.
2. Бачить welcome screen.
3. Натискає Get started.
4. Потрапляє на Package Selection.
5. Після вибору пакета і тарифу переходить в onboarding.
6. Заповнює кроки onboarding.
7. Завершує flow.
8. Потрапляє на Home.

## 6. Структура екранів
### 6.1 Welcome
Контент:
- назва NutriLife
- короткий підзаголовок
- кнопка Get started
- secondary link Sign in

CTA:
- Get started → package-selection
- Sign in → placeholder route або info state

### 6.2 Onboarding steps
- account
- body
- lifestyle
- restrictions
- budget

## 7. Дані, які збираємо
### Account step
- email
- date of birth
- gender

### Body step
- height
- current weight

### Lifestyle step
- activity level
- nutrition goal

### Restrictions step
- dietary restrictions
- geolocation placeholder

### Budget step
- daily or weekly food budget

## 8. Theme and localization requirements
- основна візуальна подача: light-first
- обов’язкова підтримка dark mode
- українська є основною мовою
- англійська є другою мовою
- тексти не хардкодяться в компонентах
- welcome та onboarding мають бути повністю сумісні з localization layer

## 9. UI requirements
- світла тема має виглядати основною та чистою
- темна тема не повинна виглядати як “додали потім”
- великий основний CTA
- чіткий progress indication між кроками
- мінімум тексту на одному екрані
- великі tap targets
- прості форми без відчуття анкети на 14 сторінок

## 10. Логіка переходів
- назад можна повертатися між кроками без втрати даних поточного session state
- вперед можна йти тільки після заповнення required fields
- після фінального кроку застосунок зберігає profile state і переводить користувача на Home

## 11. Validation rules
- email має мати базово валідний формат
- height > 0
- weight > 0
- activity level має бути вибраний
- nutrition goal має бути вибрана
- budget не може бути порожнім

## 12. States
- default
- filled
- validation error
- step completed
- onboarding finished

## 13. Edge cases
- користувач натиснув back із середини onboarding
- користувач залишив частину полів порожніми
- користувач оновив екран або перезапустив session
- budget введений у некоректному форматі
- частина перекладів ще не підключена

## 14. Acceptance criteria
- welcome screen відкривається без помилок
- Get started веде до наступного кроку
- усі onboarding screens доступні
- required fields перевіряються
- дані зберігаються в state
- після завершення onboarding користувач бачить Home
- Home використовує введені дані
- екран працює у light і dark
- всі тексти беруться з localization layer

## 15. Out of scope
- реальний auth backend
- магічні links
- remember me
- password creation flow
- consent management beyond simple placeholder

## 16. Notes for implementation
- використовувати in-memory store
- уникати складної auth abstraction
- sign in поки не повинен ламати UX
- onboarding має відчуватися як продуктова частина, а не просто форма
