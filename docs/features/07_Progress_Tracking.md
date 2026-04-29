# NutriLife — Progress Tracking

## 1. Мета
Дати користувачу простий інструмент для фіксації прогресу і відчуття руху вперед без перевантаження медичними або спортивними метриками.

## 2. Product intent
Progress підтримує мотивацію і повторне повернення в застосунок. Це не діагностичний центр і не спортивна панель аналітики. Основна цінність — наочність динаміки.

## 3. MVP scope
Входить:
- manual weight entry
- month / year toggle
- simple chart placeholder
- list або summary of recent entries

Не входить:
- медичні дані
- інтеграції з wearable devices
- blood pressure
- glucose tracking
- advanced insights

## 4. User stories
- As a user, I want to record my weight so that I can track progress.
- As a user, I want to see a simple trend so that the app feels helpful and motivating.

## 5. Основний сценарій
1. Користувач відкриває Progress.
2. Бачить поточну динаміку.
3. Додає новий запис ваги.
4. Перемикає month / year view.
5. Бачить оновлений список або графічний блок.

## 6. Структура екрана
- title
- quick summary block
- weight input
- add entry button
- month / year toggle
- chart placeholder
- recent entries list

## 7. Дані
### ProgressEntry
- id
- date
- weight
- note optional

## 8. Логіка
- записи зберігаються в локальному state
- новий запис додається у список
- chart placeholder може просто змінюватися за кількістю точок
- month / year toggle змінює подання

## 9. Theme and localization requirements
- світла тема має підтримувати легкість і читабельність
- темна тема має не перевантажувати екран
- підписи полів, buttons, time range labels локалізуються
- формати дат і чисел готуються до локалізації

## 10. UI requirements
- екран має бути легким і зрозумілим
- вага вводиться просто
- графічний блок не повинен виглядати фальшиво складним
- summary має підтримувати відчуття прогресу

## 11. States
- default with existing data
- no entries yet
- entry added successfully
- invalid input

## 12. Edge cases
- користувач вводить нереалістичну вагу
- масив progress entries порожній
- chart placeholder не має достатньо даних

## 13. Acceptance criteria
- Progress screen відкривається без runtime errors
- можна додати новий запис ваги
- month / year toggle працює
- entries відображаються
- екран зрозумілий без додаткових пояснень
- екран виглядає коректно в light і dark
- дати й тексти легко локалізуються

## 14. Out of scope
- клінічні дані
- глибока аналітика
- персональні рекомендації на основі прогресу

## 15. Notes for implementation
- простота тут важливіша за візуальні ефекти
- користувач має відчувати підтримку, а не контрольний допит від терезів
