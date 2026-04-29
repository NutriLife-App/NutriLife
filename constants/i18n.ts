export type Locale = 'uk' | 'en';

export const defaultLocale: Locale = 'uk';

export function isLocale(value: unknown): value is Locale {
  return value === 'uk' || value === 'en';
}

export function normalizeLocale(value: unknown): Locale {
  return isLocale(value) ? value : defaultLocale;
}

type TranslationMap = Record<string, string>;

export const translations: Record<Locale, TranslationMap> = {
  uk: {
    // Welcome
    'welcome.badge': 'NutriLife',
    'welcome.title': 'Персоналізоване харчування для вас',
    'welcome.subtitle':
      'Створюйте плани харчування з урахуванням цілей, обмежень, бюджету та локальної доступності продуктів.',
    'welcome.cardTitle': 'Почніть за ~2 хвилини',
    'welcome.cardBody': 'Оберіть пакет і дайте кілька відповідей, щоб персоналізувати ваш план харчування.',
    'welcome.ctaStart': 'Почати',
    'welcome.ctaSignIn': 'Увійти (скоро)',
    'welcome.finePrint': 'MVP-режим: лише mock дані (без бекенду та реальної AI-генерації).',

    // Package selection
    'package.badge': 'Вибір пакета',
    'package.title': 'Оберіть формат під ваш ритм',
    'package.subtitle': 'Premium видно в інтерфейсі, але він ще недоступний у MVP.',
    'package.packageType': 'Тип пакета',
    'package.planTier': 'Рівень тарифу',
    'package.comingLater': 'Скоро',
    'package.continue': 'Продовжити',
    'package.selected': 'Обрано',
    'package.individual': 'Індивідуальний',
    'package.family': 'Сімейний',
    'package.free': 'Free',
    'package.basic': 'Basic',
    'package.premium': 'Premium',

    // Common
    'common.back': 'Назад',
    'common.continue': 'Продовжити',
    'common.finish': 'Завершити',
    'common.preparingProfile': 'Готуємо ваш профіль…',
    'common.signInPlaceholder': 'Екран входу буде додано в наступній ітерації.',

    // Onboarding account
    'onboarding.account.step': 'Крок 1 / 5',
    'onboarding.account.title': 'Базові дані',
    'onboarding.account.email': 'Email',
    'onboarding.account.dob': 'Дата народження',
    'onboarding.account.gender': 'Стать',
    'onboarding.account.hint': 'Ці дані потрібні лише для персоналізації харчування.',
    'onboarding.account.errorEmail': 'Вкажіть коректний email.',
    'gender.female': 'Жінка',
    'gender.male': 'Чоловік',
    'gender.other': 'Інше',

    // Onboarding body
    'onboarding.body.step': 'Крок 2 / 5',
    'onboarding.body.title': 'Параметри тіла та активність',
    'onboarding.body.subtitle': 'Використовуємо це для базового розрахунку порцій і макроелементів.',
    'onboarding.body.height': 'Зріст (см)',
    'onboarding.body.weight': 'Поточна вага (кг)',
    'onboarding.body.activity': 'Рівень фізичної активності',
    'onboarding.body.errorHeight': 'Зріст має бути більше 0.',
    'onboarding.body.errorWeight': 'Вага має бути більше 0.',
    'onboarding.body.errorActivity': 'Оберіть рівень активності.',
    'activity.low': 'Низький',
    'activity.medium': 'Середній',
    'activity.high': 'Високий',

    // Onboarding lifestyle
    'onboarding.lifestyle.step': 'Крок 3 / 5',
    'onboarding.lifestyle.title': 'Ваша ціль харчування',
    'onboarding.lifestyle.choose': 'Оберіть одну ціль',
    'onboarding.lifestyle.errorGoal': 'Оберіть ціль харчування.',
    'goal.lose': 'Схуднення',
    'goal.maintain': 'Підтримка балансу',
    'goal.gain': 'Набір мʼязової маси',

    // Onboarding restrictions
    'onboarding.restrictions.step': 'Крок 4 / 5',
    'onboarding.restrictions.title': 'Дієтичні обмеження',
    'onboarding.restrictions.subtitle': 'Оберіть, чого уникати. Рецепти в MVP підлаштовуються через mock-логіку.',
    'onboarding.restrictions.label': 'Обмеження',
    'onboarding.restrictions.geo': 'Геолокація',
    'onboarding.restrictions.geoPlaceholder': 'Місто, країна (placeholder)',
    'onboarding.restrictions.geoHint': 'Поки лише placeholder: без GPS та API.',
    'restriction.lactose': 'Непереносимість лактози',
    'restriction.gluten': 'Непереносимість глютену / целіакія',
    'restriction.allergens': 'Алергени',
    'restriction.vegetarian': 'Вегетаріанство',
    'local.availability.mock': 'Локальна доступність (mock)',

    // Onboarding budget
    'onboarding.budget.step': 'Крок 5 / 5',
    'onboarding.budget.title': 'Бюджет на харчування',
    'onboarding.budget.subtitle': 'Це допомагає підбирати реалістичні варіанти.',
    'onboarding.budget.cadence': 'Період бюджету',
    'onboarding.budget.daily': 'Щодня',
    'onboarding.budget.weekly': 'Щотижня',
    'onboarding.budget.amount': 'Сума',
    'onboarding.budget.hint': 'Параметри можна змінити пізніше.',
    'onboarding.budget.errorAmount': 'Вкажіть коректну суму бюджету (> 0).',
  },
  en: {
    'welcome.badge': 'NutriLife',
    'welcome.title': 'Personal nutrition, built for you',
    'welcome.subtitle':
      'Create meal plans based on your goals, dietary restrictions, budget, and local product availability.',
    'welcome.cardTitle': 'Start in ~2 minutes',
    'welcome.cardBody': 'Choose a package, then answer a few questions to personalize your meal plan.',
    'welcome.ctaStart': 'Get started',
    'welcome.ctaSignIn': 'Sign in (soon)',
    'welcome.finePrint': 'MVP mode: mock data only (no backend, no real AI generation).',

    'package.badge': 'Package Selection',
    'package.title': 'Pick what fits your life',
    'package.subtitle': 'Premium is visible but unavailable in MVP.',
    'package.packageType': 'Package type',
    'package.planTier': 'Plan tier',
    'package.comingLater': 'Coming later',
    'package.continue': 'Continue',
    'package.selected': 'Selected',
    'package.individual': 'Individual',
    'package.family': 'Family',
    'package.free': 'Free',
    'package.basic': 'Basic',
    'package.premium': 'Premium',

    'common.back': 'Back',
    'common.continue': 'Continue',
    'common.finish': 'Finish',
    'common.preparingProfile': 'Preparing your profile…',
    'common.signInPlaceholder': 'Sign in screen will be added in a future iteration.',

    'onboarding.account.step': 'Step 1 / 5',
    'onboarding.account.title': 'Account basics',
    'onboarding.account.email': 'Email',
    'onboarding.account.dob': 'Date of birth',
    'onboarding.account.gender': 'Gender',
    'onboarding.account.hint': 'Used only to personalize your nutrition.',
    'onboarding.account.errorEmail': 'Enter a valid email.',
    'gender.female': 'Female',
    'gender.male': 'Male',
    'gender.other': 'Other',

    'onboarding.body.step': 'Step 2 / 5',
    'onboarding.body.title': 'Body & activity',
    'onboarding.body.subtitle': 'Used to shape portions and macro balance.',
    'onboarding.body.height': 'Height (cm)',
    'onboarding.body.weight': 'Current weight (kg)',
    'onboarding.body.activity': 'Physical activity level',
    'onboarding.body.errorHeight': 'Height must be greater than 0.',
    'onboarding.body.errorWeight': 'Weight must be greater than 0.',
    'onboarding.body.errorActivity': 'Select activity level.',
    'activity.low': 'Low',
    'activity.medium': 'Medium',
    'activity.high': 'High',

    'onboarding.lifestyle.step': 'Step 3 / 5',
    'onboarding.lifestyle.title': 'Your nutrition goal',
    'onboarding.lifestyle.choose': 'Choose one',
    'onboarding.lifestyle.errorGoal': 'Select a nutrition goal.',
    'goal.lose': 'Lose weight',
    'goal.maintain': 'Maintain balance',
    'goal.gain': 'Gain muscle mass',

    'onboarding.restrictions.step': 'Step 4 / 5',
    'onboarding.restrictions.title': 'Dietary restrictions',
    'onboarding.restrictions.subtitle': 'Choose what to avoid; recipes adapt via mock logic.',
    'onboarding.restrictions.label': 'Restrictions',
    'onboarding.restrictions.geo': 'Geolocation',
    'onboarding.restrictions.geoPlaceholder': 'City, Country (placeholder)',
    'onboarding.restrictions.geoHint': 'Placeholder only: no GPS and no APIs.',
    'restriction.lactose': 'Lactose intolerance',
    'restriction.gluten': 'Gluten intolerance / celiac',
    'restriction.allergens': 'Allergens',
    'restriction.vegetarian': 'Vegetarian',
    'local.availability.mock': 'Local availability (mock)',

    'onboarding.budget.step': 'Step 5 / 5',
    'onboarding.budget.title': 'Food budget',
    'onboarding.budget.subtitle': 'This helps pick practical options.',
    'onboarding.budget.cadence': 'Budget cadence',
    'onboarding.budget.daily': 'Daily',
    'onboarding.budget.weekly': 'Weekly',
    'onboarding.budget.amount': 'Amount',
    'onboarding.budget.hint': 'You can change this later.',
    'onboarding.budget.errorAmount': 'Enter a valid budget amount (> 0).',
  },
};

export type TranslationKey = keyof typeof translations.uk;

