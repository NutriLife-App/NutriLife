# NutriLife — Grocery List

## 1. Мета
Перетворити meal plan на практичний список покупок, який допомагає користувачу зрозуміти, що саме потрібно купити і приблизно у який бюджет це вкладається.

## 2. Product intent
Grocery List — ключовий міст між планом харчування і реальною поведінкою користувача. Саме тут NutriLife перестає бути просто красивим інтерфейсом і стає побутово корисним інструментом.

## 3. MVP scope
Входить:
- список продуктів
- групування за категоріями
- estimated price
- cheapest offer placeholder
- purchased toggle
- total estimated cost

Не входить:
- реальні API супермаркетів
- live offers
- cart integration
- delivery integration
- barcode scanning

## 4. User stories
- As a user, I want to see what I need to buy so that I can follow the meal plan.
- As a user, I want to check off purchased items so that the list feels useful in real life.
- As a user, I want an estimated total cost so that the app feels budget-aware.

## 5. Основний сценарій
1. Користувач відкриває Grocery List.
2. Бачить продукти, згруповані за категоріями.
3. Переглядає estimated prices.
4. Позначає деякі позиції як purchased.
5. Бачить total estimated cost.

## 6. Структура екрана
- header
- grouped categories
- grocery items rows
- checkbox / toggle
- estimated item price
- cheapest offer placeholder text
- total estimated cost block

## 7. Дані
### GroceryCategory
- id
- title

### GroceryItem
- id
- categoryId
- name
- quantity
- unit
- estimatedPrice
- cheapestOfferLabel optional
- purchased

## 8. Логіка
- grocery list береться з mock data
- purchased state оновлюється локально
- total cost або лишається фіксованим по списку, або рахується з items
- у майбутньому модуль може будуватися з Meal Plan автоматично

## 9. Theme and localization requirements
- світла тема є базовою для сприйняття списку
- темна тема має лишати список читабельним
- category titles, item labels, price prefixes і service texts локалізуються
- формат валюти готується до локалізації

## 10. UI requirements
- список має легко скануватися
- категорії мають бути чітко виділені
- purchased state має бути візуально зрозумілим
- ціни не повинні візуально домінувати

## 11. States
- default grouped list
- some items purchased
- all items purchased
- empty fallback

## 12. Edge cases
- item без estimatedPrice
- category без items
- purchased state не синхронізувався
- currency label відрізняється залежно від мови

## 13. Acceptance criteria
- Grocery List screen відкривається без помилок
- items видно
- category grouping працює
- purchased toggle змінює state
- total estimated cost відображається стабільно
- користувач розуміє, як використовувати екран без пояснень
- модуль коректно працює в light і dark
- тексти легко локалізуються

## 14. Out of scope
- справжні retailer comparisons
- geographic store radius
- купони і знижки
- price history

## 15. Notes for implementation
- Grocery List має виглядати корисно навіть без реальних API
- у фокусі — побутова практичність
- це один із найбільш ціннісних екранів MVP
