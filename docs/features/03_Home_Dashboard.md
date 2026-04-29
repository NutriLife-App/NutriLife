# NutriLife — Home Dashboard

## 1. Мета
Створити головний екран, який дає відчуття персоналізації, показує короткий summary і швидко веде до основних сценаріїв NutriLife.

## 2. Product intent
Home — це не просто красива вітрина. Це операційний центр MVP, де користувач одразу бачить:
- хто він у системі;
- яка його мета;
- який у нього пакет і тариф;
- куди перейти далі.

## 3. MVP scope
Входить:
- greeting
- package and plan summary
- current goal block
- simple nutrition summary
- quick actions
- коротке персоналізоване пояснення

Не входить:
- складна аналітика
- реальні push reminders
- серверна персоналізація
- recommendation engine

## 4. User stories
- As a user, I want to immediately see that the app knows my goal and setup so that the product feels personalized.
- As a user, I want quick access to meal plan, recipes, grocery list, and progress so that I can continue my flow quickly.

## 5. Основний сценарій
1. Користувач завершує onboarding.
2. Потрапляє на Home.
3. Бачить коротке персоналізоване summary.
4. Обирає один із quick actions.

## 6. Вміст екрана
- greeting з іменем або нейтральним зверненням
- selected package
- selected plan tier
- current goal
- summary card:
  - target calories
  - protein / fat / carbs / fiber short view
- quick actions:
  - Generate meal plan
  - Recipes
  - Grocery list
  - Progress

## 7. Джерела даних
- onboarding profile
- package type
- plan tier
- mock nutrition data
- progress summary placeholder

## 8. Theme and localization requirements
- light-first брендова подача
- dark mode support без втрати ієрархії
- українська як основна мова інтерфейсу
- англійська як доступна друга мова
- усі назви кнопок, секцій і summary беруться з localization layer

## 9. UI requirements
- картковий інтерфейс
- акцент на readability
- не перевантажувати цифрами
- головні CTA мають бути очевидні
- один і той самий сенс екрана у light і dark

## 10. Логіка
- Home читає дані з current state
- відображає актуальні вибори користувача
- переходи з quick actions відкривають відповідні tab screens

## 11. States
- personalized default
- missing profile fallback
- empty summary fallback

## 12. Edge cases
- onboarding data неповні
- package type відсутній
- summary не може бути згенерований із seed data

## 13. Acceptance criteria
- Home відкривається після onboarding
- package type і plan tier видно
- goal видно
- quick actions працюють
- summary card не показує випадкові значення
- екран виглядає цілісно у light і dark
- тексти не захардкоджені

## 14. Out of scope
- deeply dynamic recommendations
- live nutrition recalculation
- dashboard widgets marketplace

## 15. Notes for implementation
- Home має виглядати як справжній продуктовий екран
- це перше місце, де користувач має відчути сенс введених даних
- дизайн має бути nutrition-first, а не спортзал із цифрами
