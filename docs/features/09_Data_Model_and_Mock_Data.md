# NutriLife — Data Model and Mock Data

## 1. Мета
Зафіксувати структуру основних сутностей NutriLife та правила використання mock data для MVP.

## 2. Product intent
Документ потрібен, щоб не вигадувати випадкові структури даних для кожного екрана окремо. Один продукт — одна узгоджена модель.

## 3. MVP scope
Входить:
- основні сутності
- зв’язки між сутностями
- принципи seed data
- обмеження mock logic
- localized content rules
- theme / language preference entities

Не входить:
- production database schema
- SQL migrations
- backend API contracts
- auth schema

## 4. Основні сутності
### 4.1 UserProfile
- id
- email
- dateOfBirth
- gender
- heightCm
- weightKg
- activityLevel
- nutritionGoal
- dietaryRestrictions[]
- geolocationPlaceholder
- budgetType
- budgetAmount
- packageType
- planTier

### 4.2 SubscriptionPlan
- tier
- isAvailable
- labelKey
- descriptionKey
- lockedReasonKey optional

### 4.3 MealPlan
- id
- periodType
- targetCalories
- targetProtein
- targetFat
- targetCarbs
- targetFiber
- meals[]
- notesKey optional

### 4.4 Meal
- id
- type
- nameKey or localizedName
- calories
- protein
- fat
- carbs
- fiber
- recipeId optional
- tags optional

### 4.5 Recipe
- id
- nameKey or localizedName
- imagePlaceholder
- tags[]
- ingredients[]
- calories
- protein
- fat
- carbs
- fiber
- instructions optional

### 4.6 GroceryCategory
- id
- titleKey

### 4.7 GroceryItem
- id
- categoryId
- nameKey
- quantity
- unitKey
- estimatedPrice
- cheapestOfferLabelKey optional
- purchased

### 4.8 ProgressEntry
- id
- date
- weight
- note optional

### 4.9 ThemePreference
- system
- light
- dark

### 4.10 LanguageOption
- uk
- en

## 5. Зв’язки між сутностями
- UserProfile впливає на summary logic
- SubscriptionPlan впливає на allowed UX states
- MealPlan складається з Meal[]
- Meal може посилатися на Recipe
- GroceryItem може логічно походити з MealPlan
- ProgressEntry належить поточному user session
- ThemePreference і LanguageOption впливають на presentation layer

## 6. Mock data principles
- mock data має бути правдоподібною
- один і той самий seed набір використовується послідовно в кількох екранах
- значення не повинні суперечити одне одному
- meal plan, recipes і grocery list мають корелювати
- seed data має бути готовою до uk / en

## 7. Localization rules for data
- не використовувати user-facing text як головний business identifier
- де можливо, використовувати keys
- локалізований контент може зберігатися як:
  - translation keys
  - localized object { uk, en }
- форматування дат, валют і чисел має оброблятися окремо від seed content

## 8. Theme-related data rules
- тема не дублює контент
- тема впливає тільки на presentation tokens
- кольори та spacing не хардкодяться без системи

## 9. Обмеження mock data
- не симулювати повний production realism
- не додавати випадкові поля без потреби
- не дублювати однакові сутності з різними назвами

## 10. Acceptance criteria
- типи узгоджені між screens
- mock data покриває всі основні UI states
- meal plan, recipes, grocery list і progress не конфліктують логічно
- структура готова до тем і двомовності

## 11. Notes for implementation
- цей документ є джерелом правди для types/* та constants/mockData.ts
- будь-які нові поля в MVP потрібно спочатку узгоджувати тут
