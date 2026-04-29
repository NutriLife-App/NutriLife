# NutriLife — Meal Plan

## 1. Мета
Показати користувачу базовий персоналізований план харчування у зручній, зрозумілій і практичній формі.

## 2. Product intent
Meal Plan — центральний модуль цінності NutriLife. Тут продукт має виглядати не як калькулятор, а як помічник, який перетворює дані профілю на конкретний план.

## 3. MVP scope
Входить:
- daily / weekly toggle
- meal cards
- nutrition summary
- Replace meal UI action
- mock generation logic

Не входить:
- реальний AI generation engine
- автоматичні підстановки на основі live inventory
- повна нутриціологічна оптимізація
- real-time recalculation

## 4. User stories
- As a user, I want to see a clear meal plan so that I know what to eat.
- As a user, I want the plan to feel connected to my goal so that it feels personalized.
- As a user, I want the option to replace a meal so that the plan feels flexible.

## 5. Основний сценарій
1. Користувач відкриває Meal Plan.
2. Бачить daily plan за замовчуванням.
3. Перемикається на weekly view за потреби.
4. Дивиться meal cards.
5. Переглядає nutrition summary.
6. Натискає Replace meal і бачить placeholder state.

## 6. Структура екрана
- header with title
- daily / weekly segmented control
- summary card:
  - calories
  - protein
  - fat
  - carbs
  - fiber
- meal sections:
  - Breakfast
  - Lunch
  - Dinner
  - Snack
- action button / link: Replace meal

## 7. Дані
### MealPlan
- periodType
- targetCalories
- targetProtein
- targetFat
- targetCarbs
- targetFiber
- meals[]

### Meal
- id
- name
- type
- calories
- protein
- fat
- carbs
- fiber
- recipeId optional
- tags optional

## 8. Логіка MVP
- план береться з mock data
- summary узгоджується з current goal
- budget може впливати на explanatory text або mock plan variation
- replace meal поки не генерує справжню альтернативу, але показує controllable UI state

## 9. Персоналізація
Meal Plan має як мінімум відображати зв’язок із:
- nutrition goal
- package / tier
- budget band
- dietary restrictions, якщо це можливо на моковому рівні

## 10. Theme and localization requirements
- світла тема є основною
- темна тема підтримується на рівні всіх cards, toggles і section titles
- назви прийомів їжі, summary labels і CTA локалізуються
- не використовувати текстові значення як business keys

## 11. UI requirements
- картки мають легко читатися
- summary має бути зверху
- daily / weekly toggle має бути інтуїтивним
- Replace meal не має виглядати як зламана кнопка
- читабельність має лишатися доброю в обох темах

## 12. States
- daily view
- weekly view
- replace meal pressed
- empty fallback
- summary available

## 13. Edge cases
- profile goal відсутня
- mock plan не знайдений
- meals array порожній
- weekly view має неповні дані

## 14. Acceptance criteria
- екран відкривається без runtime errors
- daily / weekly toggle працює
- summary card відображається
- meals відображаються по типах
- Replace meal button існує і не ламає flow
- план виглядає логічно пов’язаним із профілем користувача
- екран працює в light і dark
- тексти беруться з localization layer

## 15. Out of scope
- точний розрахунок БЖВ на основі складних формул
- справжня генерація альтернативних страв
- сервіс рекомендацій
- зовнішні бази нутрієнтів

## 16. Notes for implementation
- Meal Plan має бути найбільш переконливим модулем MVP
- навіть моковий результат повинен виглядати реалістично
- не перевантажувати екран зайвими мікронутрієнтами
