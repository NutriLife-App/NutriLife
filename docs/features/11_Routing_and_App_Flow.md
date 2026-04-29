# NutriLife — Routing and App Flow

## 1. Мета
Зафіксувати маршрутизацію, структуру екранів і головні правила переходів у NutriLife MVP.

## 2. Product intent
Routing має бути простим, передбачуваним і дружнім до mobile-first сценарію. Користувач не повинен губитися між вкладеними екранами, а розробка не повинна заплутуватися в хаотичних маршрутах.

## 3. Основний flow
Welcome → Package Selection → Onboarding → Tabs → Home / Plan / Recipes / Grocery List / Progress / Settings

## 4. Route structure
### Root
- /index
- /package-selection
- /onboarding/*
- /(tabs)/*

### Onboarding
- /onboarding/account
- /onboarding/body
- /onboarding/lifestyle
- /onboarding/restrictions
- /onboarding/budget

### Tabs
- /(tabs)/home
- /(tabs)/plan
- /(tabs)/recipes
- /(tabs)/groceries
- /(tabs)/progress
- /(tabs)/settings

## 5. Routing principles
- welcome є першою точкою входу
- package-selection завжди йде перед onboarding
- onboarding є послідовним flow
- після завершення onboarding користувач потрапляє в tabs
- регулярне використання продукту відбувається всередині tabs

## 6. Navigation rules
- з onboarding можна рухатися вперед і назад між кроками
- на tabs користувач може вільно перемикатися між основними модулями
- quick actions на Home мають вести у відповідні tabs
- settings не повинен бути прихованим занадто глибоко

## 7. Route ownership
### Entry routes
відповідають за перший запуск і стартовий сценарій

### Onboarding routes
відповідають за збір профільних даних

### Tab routes
відповідають за основні регулярні сценарії використання

## 8. State dependencies
Routing залежить від:
- package selected
- plan tier selected
- onboarding completion
- optional theme preference
- optional language preference

У MVP це може бути реалізовано простими guard conditions або flow logic у current state.

## 9. Theme and localization implications
- маршрути не повинні дублюватися окремо для тем чи мов
- тема та мова керуються на presentation layer
- deep linking у майбутньому не повинен ламатися через locale logic
- route names лишаються технічними, тексти навігації — локалізованими

## 10. Error prevention
- не створювати дубльовані маршрути
- не змішувати onboarding і tabs в один плоский список
- уникати циклів навігації без явного сенсу

## 11. Edge cases
- користувач повернувся назад до package-selection після частини onboarding
- onboarding completion flag не виставився
- Home відкрився без повного профілю
- маршрут існує, але дані не готові
- частина локалізації не підвантажилась

## 12. Acceptance criteria
- всі основні маршрути відкриваються
- onboarding flow проходиться послідовно
- після завершення onboarding відкривається tabs layout
- quick actions працюють
- жоден ключовий маршрут не веде в тупик
- routing стабільний незалежно від теми і мови

## 13. Notes for implementation
- цей документ є джерелом правди для app/ route structure
- будь-які нові екрани потрібно додавати так, щоб не ламати головний flow
- простота маршрутизації тут важливіша за архітектурну акробатику
