# NutriLife — Recipes

## 1. Мета
Дати користувачу зрозумілий і корисний каталог страв, які підкріплюють meal plan і роблять NutriLife практичнішим у повсякденному використанні.

## 2. Product intent
Recipes — допоміжний, але важливий модуль. Він не повинен перетворюватися на окремий кулінарний портал. Його задача — зробити meal plan конкретним і зрозумілим.

## 3. MVP scope
Входить:
- список рецептів
- картки рецептів
- recipe detail presentation
- теги
- інгредієнти
- nutrition values
- photo placeholders

Не входить:
- реальні фото CDN
- user-generated recipes
- rating system
- comments
- favorites sync
- cooking mode

## 4. User stories
- As a user, I want to see what specific dishes are included so that the meal plan feels real.
- As a user, I want to view ingredients and nutrition values so that I can decide whether a recipe fits me.

## 5. Основний сценарій
1. Користувач відкриває Recipes.
2. Бачить список рецептів.
3. Переглядає recipe cards.
4. Відкриває detail state або detail card.
5. Дивиться ingredients, tags, nutrition values.

## 6. Структура модуля
### List level
- recipe image placeholder
- recipe name
- short description optional
- tags
- calories summary

### Detail level
- large image placeholder
- ingredients list
- nutrition values
- tags
- instructions placeholder

## 7. Дані
### Recipe
- id
- name
- imagePlaceholder
- tags[]
- ingredients[]
- calories
- protein
- fat
- carbs
- fiber
- instructions optional

## 8. Tags
Приклади:
- Quick
- Anti-stress
- Budget-friendly
- High-protein
- Family-friendly

## 9. Theme and localization requirements
- рецепти мають читатися приємно у світлій темі
- темна тема не повинна псувати сприйняття карток і тегів
- назви рецептів, теги, labels і placeholders локалізуються
- при потребі seed data може зберігати окремі localized fields

## 10. UI requirements
- рецепти мають виглядати апетитно навіть із placeholders
- список має легко скануватися
- деталі мають бути читабельними
- теги мають бути візуально легкими, не крикливими

## 11. Логіка
- recipes беруться з mock data
- можуть бути пов’язані з Meal Plan через recipeId або тип страви
- модуль лишається read-only

## 12. States
- list default
- detail open
- empty fallback

## 13. Edge cases
- рецепт без фото
- рецепт без instructions
- recipeId у meal plan відсутній у mock data

## 14. Acceptance criteria
- Recipes screen відкривається стабільно
- рецептні картки відображаються
- nutrition values видно
- ingredients видно
- теги відображаються
- detail state не ламає навігацію
- модуль виглядає цілісно в light і dark
- тексти легко перемикаються між uk та en

## 15. Out of scope
- пошук по рецептах
- складні фільтри
- збереження в обране
- shopping export із detail screen

## 16. Notes for implementation
- recipes мають підтримувати відчуття, що NutriLife — реальний інструмент
- не перевантажувати текстом
- навіть мокові рецепти мають бути правдоподібними
