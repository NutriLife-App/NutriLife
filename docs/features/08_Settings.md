# NutriLife — Settings

## 1. Мета
Дати користувачу зрозуміле місце для перегляду, уточнення та базового редагування своїх параметрів у NutriLife.

## 2. Product intent
Settings — не технічний смітник. Це екран довіри: користувач бачить, що застосунок зберіг про нього, і може при потребі це змінити.

## 3. MVP scope
Входить:
- profile info
- dietary preferences
- budget
- package info
- theme preference
- language preference
- logout placeholder

Не входить:
- account security center
- real password management
- notification center
- subscription billing

## 4. User stories
- As a user, I want to see my current profile data so that I know the app reflects my setup.
- As a user, I want to edit basic values later so that I am not trapped by my first onboarding answers.
- As a user, I want to understand the current language and theme behavior so that the app feels under control.

## 5. Основний сценарій
1. Користувач відкриває Settings.
2. Бачить зведення своїх даних.
3. За потреби редагує окремі значення.
4. Переглядає тему і мову.
5. Повертається у продукт із оновленими параметрами.

## 6. Структура екрана
- profile section
- goal and activity section
- restrictions section
- budget section
- package and plan section
- theme and language section
- logout placeholder action

## 7. Дані
- name or email
- age or date of birth
- gender
- height
- weight
- activity level
- nutrition goal
- dietary restrictions
- budget
- package type
- plan tier
- themePreference
- languagePreference

## 8. Логіка
- Settings читає поточний state
- редагування оновлює state
- зміни мають відображатися в Home та Meal Plan summary
- якщо перемикач теми або мови не реалізовано повністю, має бути коректний placeholder

## 9. UI requirements
- секційна структура
- легко читати навіть при великій кількості полів
- edit actions не повинні виглядати страшно або технічно
- logout не має бути головною зіркою екрана

## 10. Theme and localization requirements
- Settings має бути джерелом правди для user-facing theme and language controls
- світла тема є основною продуктово
- темна тема підтримується як повноцінний режим
- українська є primary locale
- англійська є secondary locale

## 11. States
- full profile visible
- some fields missing
- edit mode
- saved state

## 12. Edge cases
- частина даних не була введена під час onboarding
- користувач змінив critical field, але mock summary ще не оновився
- language selected, but some strings still fallback to default

## 13. Acceptance criteria
- Settings screen відкривається без помилок
- profile info видно
- package and plan видно
- budget видно
- basic edits possible or clearly prepared as placeholders
- logout placeholder не ламає навігацію
- theme / language sections присутні
- екран коректно працює у light і dark

## 14. Out of scope
- password change
- delete account
- notification permissions center
- billing history

## 15. Notes for implementation
- Settings має виглядати структуровано і спокійно
- тут користувач повинен відчути контроль над своїми даними, а не лабіринт
