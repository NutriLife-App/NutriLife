"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "ua" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  ua: {
    // Header
    "nav.howItWorks": "Як це працює",
    "nav.forWhom": "Для кого",
    "nav.features": "Переваги",
    "nav.faq": "FAQ",
    "nav.waitlist": "Приєднатися",

    // Hero
    "hero.badge": "Розумний Помічник з Харчування",
    "hero.headline": "Персоналізоване харчування для українців",
    "hero.stats.recipes": "Рецептів",
    "hero.stats.local": "Локальні продукти",
    "hero.stats.ai": "Персоналізація",
    "hero.meal.breakfast": "Сніданок",
    "hero.meal.breakfast.desc": "Вівсянка з ягодами",
    "hero.meal.lunch": "Обід",
    "hero.meal.lunch.desc": "Курка з овочами",
    "hero.meal.dinner": "Вечеря",
    "hero.meal.dinner.desc": "Риба з рисом",
    "hero.dailyGoal": "Щоденна ціль",
    "hero.health": "Здоров'я",
    "hero.spending": "Витрати",
    "hero.subheadline": "NutriLife App - це персональний помічник зі здорового харчування, який допомагає складати зручний раціон під ваші цілі, бюджет і вподобання з урахуванням продуктів, які можна купити поруч.",
    "hero.cta.primary": "Спробувати першими",
    "hero.cta.secondary": "Дізнатися більше",

    // Problem
    "problem.label": "Проблема",
    "problem.headline": "Здорове харчування в Україні - це виклик",
    "problem.item1.title": "Складність планування",
    "problem.item1.desc": "Важко скласти раціон, який буде смачним, корисним і доступним одночасно.",
    "problem.item2.title": "Нереалістичні поради",
    "problem.item2.desc": "Більшість додатків пропонують продукти, яких просто немає в наших магазинах.",
    "problem.item3.title": "Обмежений бюджет",
    "problem.item3.desc": "Здорове харчування не повинно коштувати як крило літака.",
    "problem.item4.title": "Брак часу",
    "problem.item4.desc": "Щодня думати про те, що приготувати - виснажує.",

    // Solution
    "solution.label": "Рішення",
    "solution.headline": "NutriLife створює персональний план харчування для вас",
    "solution.desc": "Ми враховуємо ваші цілі, бюджет, уподобання та продукти, доступні в українських магазинах, щоб створити реалістичний та здоровий раціон.",
    "solution.feature1": "Персоналізовані рецепти",
    "solution.feature2": "Локальні продукти",
    "solution.feature3": "Розумний бюджет",
    "solution.feature4": "Доказова нутриціологія",
    "solution.weeklyPlan": "Ваш тижневий план",
    "solution.monday": "Понеділок",
    "solution.oatmeal": "Вівсянка",
    "solution.caesar": "Салат Цезар",
    "solution.chicken": "Курка гриль",
    "solution.total": "Всього:",
    "solution.availableAtb": "Доступно в АТБ",

    // How it works
    "howItWorks.label": "Як це працює",
    "howItWorks.headline": "Три простих кроки до здорового харчування",
    "howItWorks.step1.title": "Розкажіть про себе",
    "howItWorks.step1.desc": "Вкажіть свої цілі, уподобання, алергії та бюджет.",
    "howItWorks.step2.title": "Отримайте план",
    "howItWorks.step2.desc": "AI створить персоналізований тижневий раціон з рецептами та списком покупок.",
    "howItWorks.step3.title": "Насолоджуйтесь",
    "howItWorks.step3.desc": "Готуйте смачні страви та досягайте своїх цілей щодня.",

    // For whom
    "forWhom.label": "Для кого",
    "forWhom.headline": "NutriLife підходить кожному",
    "forWhom.card1.title": "Сім'ї",
    "forWhom.card1.desc": "Плануйте раціон для всієї родини, враховуючи смаки кожного.",
    "forWhom.card2.title": "Студенти",
    "forWhom.card2.desc": "Швидкі, прості та бюджетні рецепти для напруженого студентського життя.",
    "forWhom.card3.title": "Активні люди",
    "forWhom.card3.desc": "Оптимальне харчування для підтримки енергії та досягнення фітнес-цілей.",
    "forWhom.card4.title": "Зайняті професіонали",
    "forWhom.card4.desc": "Економте час на плануванні - більше часу для важливих справ.",

    // Product preview
    "preview.label": "Продукт",
    "preview.headline": "Інтуїтивний інтерфейс для щоденного використання",
    "preview.feature1": "Персональний дашборд",
    "preview.feature2": "Тижневий план харчування",
    "preview.feature3": "Розумний список покупок",
    "preview.feature4": "Відстеження прогресу",
    "preview.greeting": "Добрий день!",
    "preview.todayPlan": "Ваш план на сьогодні",
    "preview.protein": "білок",
    "preview.goal": "ціль",
    "preview.syrnyky": "Сирники",
    "preview.borscht": "Борщ",
    "preview.cutlets": "Котлети",
    "preview.shoppingList": "Список покупок",
    "preview.items": "12 продуктів",

    // Why different
    "different.label": "Чому ми",
    "different.headline": "Чому NutriLife - це інакше",
    "different.item1.title": "Локальний фокус",
    "different.item1.desc": "Ми знаємо, що можна купити в АТБ, Сільпо чи на базарі.",
    "different.item2.title": "AI + Наука",
    "different.item2.desc": "Поєднуємо штучний інтелект з доказовою нутриціологією.",
    "different.item3.title": "Реальний бюджет",
    "different.item3.desc": "Плануємо раціон, який не вдарить по гаманцю.",
    "different.item4.title": "Гнучкість",
    "different.item4.desc": "Легко адаптується до ваших змін - настрій, сезон, можливості.",
    "different.trust": "Підтримано наукою та експертами",
    "different.sources": "Наукових джерел",
    "different.experts": "Експертів",
    "different.products": "Продуктів в базі",

    // Partners visual
    "partners.program": "Партнерська програма",
    "partners.forRetailers": "Для ритейлерів",
    "partners.analytics": "Аналітика",
    "partners.conversion": "конверсія",
    "partners.targeting": "Таргетинг",
    "partners.roi": "ROI",
    "partners.loyalty": "Лояльність",
    "partners.retention": "утримання",

    // Footer
    "footer.madeWith": "Зроблено з любов'ю в Україні",

    // Partners
    "partners.label": "Партнерам",
    "partners.headline": "Можливості для ритейлерів",
    "partners.desc": "Інтегруйте NutriLife у ваш бізнес для підвищення лояльності клієнтів та збільшення продажів.",
    "partners.feature1": "Персоналізовані пропозиції для ваших клієнтів",
    "partners.feature2": "Інтеграція з вашим каталогом товарів",
    "partners.feature3": "Аналітика споживчих вподобань",
    "partners.cta": "Стати партнером",

    // Waitlist
    "waitlist.label": "Приєднатися",
    "waitlist.headline": "Будьте першими, хто спробує NutriLife",
    "waitlist.desc": "Залиште свій email і отримайте ранній доступ до бета-версії.",
    "waitlist.placeholder": "Ваш email",
    "waitlist.button": "Приєднатися до списку очікування",
    "waitlist.privacy": "Ми поважаємо вашу приватність і не будемо спамити.",
    "waitlist.success": "Дякуємо! Ви в списку очікування.",
    "waitlist.loading": "Зачекайте...",
    "waitlist.emailError": "Введіть коректний email",
    "waitlist.joined": "вже приєдналися",

    // FAQ
    "faq.label": "FAQ",
    "faq.headline": "Часті запитання",
    "faq.q1": "Чи безкоштовний NutriLife?",
    "faq.a1": "Ми плануємо базову безкоштовну версію та преміум-план з розширеними функціями.",
    "faq.q2": "Як NutriLife враховує локальні продукти?",
    "faq.a2": "Ми інтегруємо дані з українських мереж супермаркетів та регулярно оновлюємо базу доступних продуктів.",
    "faq.q3": "Чи підходить NutriLife для особливих дієт?",
    "faq.a3": "Так! Ми підтримуємо вегетаріанство, веганство, безглютенові та інші дієти.",
    "faq.q4": "Коли буде запуск?",
    "faq.a4": "Плануємо запустити бета-версію найближчим часом. Приєднуйтесь до списку очікування!",
    "faq.q5": "Чи потрібно вводити багато даних?",
    "faq.a5": "Початкове налаштування займає 2-3 хвилини. Далі система вчиться на ваших уподобаннях.",
    "faq.contact": "Не знайшли відповіді? Напишіть нам на",

    // Footer
    "footer.tagline": "Smart nutrition assistant для здорового харчування в Україні.",
    "footer.product": "Продукт",
    "footer.company": "Компанія",
    "footer.contact": "Контакти",
    "footer.legal": "Правова інформація",
    "footer.about": "Про нас",
    "footer.blog": "Блог",
    "footer.careers": "Кар'єра",
    "footer.press": "Преса",
    "footer.privacy": "Приватність",
    "footer.terms": "Умови використання",
    "footer.cookies": "Cookies",
    "footer.copyright": "© 2026 NutriLife. Всі права захищені.",
  },
  en: {
    // Header
    "nav.howItWorks": "How It Works",
    "nav.forWhom": "For Whom",
    "nav.features": "Features",
    "nav.faq": "FAQ",
    "nav.waitlist": "Join",

    // Hero
    "hero.badge": "Smart Nutrition Assistant",
    "hero.headline": "Personalized Nutrition for Real Life in Ukraine",
    "hero.stats.recipes": "Recipes",
    "hero.stats.local": "Local Products",
    "hero.stats.ai": "Personalization",
    "hero.meal.breakfast": "Breakfast",
    "hero.meal.breakfast.desc": "Oatmeal with berries",
    "hero.meal.lunch": "Lunch",
    "hero.meal.lunch.desc": "Chicken with vegetables",
    "hero.meal.dinner": "Dinner",
    "hero.meal.dinner.desc": "Fish with rice",
    "hero.dailyGoal": "Daily Goal",
    "hero.health": "Health",
    "hero.spending": "Spending",
    "hero.subheadline": "NutriLife is a smart nutrition assistant that helps you create a convenient meal plan based on your goals, budget, preferences, and products actually available near you.",
    "hero.cta.primary": "Be the First to Try",
    "hero.cta.secondary": "Learn More",

    // Problem
    "problem.label": "The Problem",
    "problem.headline": "Healthy Eating in Ukraine is a Challenge",
    "problem.item1.title": "Complex Planning",
    "problem.item1.desc": "It's hard to create a diet that's tasty, healthy, and affordable all at once.",
    "problem.item2.title": "Unrealistic Advice",
    "problem.item2.desc": "Most apps suggest products that simply don't exist in our stores.",
    "problem.item3.title": "Limited Budget",
    "problem.item3.desc": "Healthy eating shouldn't cost a fortune.",
    "problem.item4.title": "Lack of Time",
    "problem.item4.desc": "Thinking about what to cook every day is exhausting.",

    // Solution
    "solution.label": "The Solution",
    "solution.headline": "NutriLife Creates a Personal Meal Plan for You",
    "solution.desc": "We consider your goals, budget, preferences, and products available in Ukrainian stores to create a realistic and healthy diet.",
    "solution.feature1": "Personalized Recipes",
    "solution.feature2": "Local Products",
    "solution.feature3": "Smart Budget",
    "solution.feature4": "Evidence-Based Nutrition",
    "solution.weeklyPlan": "Your Weekly Plan",
    "solution.monday": "Monday",
    "solution.oatmeal": "Oatmeal",
    "solution.caesar": "Caesar Salad",
    "solution.chicken": "Grilled Chicken",
    "solution.total": "Total:",
    "solution.availableAtb": "Available at ATB",

    // How it works
    "howItWorks.label": "How It Works",
    "howItWorks.headline": "Three Simple Steps to Healthy Eating",
    "howItWorks.step1.title": "Tell Us About Yourself",
    "howItWorks.step1.desc": "Share your goals, preferences, allergies, and budget.",
    "howItWorks.step2.title": "Get Your Plan",
    "howItWorks.step2.desc": "AI creates a personalized weekly meal plan with recipes and shopping list.",
    "howItWorks.step3.title": "Enjoy",
    "howItWorks.step3.desc": "Cook delicious meals and achieve your goals every day.",

    // For whom
    "forWhom.label": "For Whom",
    "forWhom.headline": "NutriLife is for Everyone",
    "forWhom.card1.title": "Families",
    "forWhom.card1.desc": "Plan meals for the whole family, considering everyone's tastes.",
    "forWhom.card2.title": "Students",
    "forWhom.card2.desc": "Quick, simple, and budget-friendly recipes for busy student life.",
    "forWhom.card3.title": "Active People",
    "forWhom.card3.desc": "Optimal nutrition to maintain energy and achieve fitness goals.",
    "forWhom.card4.title": "Busy Professionals",
    "forWhom.card4.desc": "Save time on planning - more time for what matters.",

    // Product preview
    "preview.label": "Product",
    "preview.headline": "Intuitive Interface for Daily Use",
    "preview.feature1": "Personal Dashboard",
    "preview.feature2": "Weekly Meal Plan",
    "preview.feature3": "Smart Shopping List",
    "preview.feature4": "Progress Tracking",
    "preview.greeting": "Good morning!",
    "preview.todayPlan": "Your plan for today",
    "preview.protein": "protein",
    "preview.goal": "goal",
    "preview.syrnyky": "Syrnyky",
    "preview.borscht": "Borscht",
    "preview.cutlets": "Cutlets",
    "preview.shoppingList": "Shopping list",
    "preview.items": "12 items",

    // Why different
    "different.label": "Why Us",
    "different.headline": "Why NutriLife is Different",
    "different.item1.title": "Local Focus",
    "different.item1.desc": "We know what you can buy at ATB, Silpo, or the local market.",
    "different.item2.title": "AI + Science",
    "different.item2.desc": "Combining artificial intelligence with evidence-based nutrition.",
    "different.item3.title": "Real Budget",
    "different.item3.desc": "Planning meals that won't break the bank.",
    "different.item4.title": "Flexibility",
    "different.item4.desc": "Easily adapts to your changes - mood, season, possibilities.",
    "different.trust": "Backed by Science and Experts",
    "different.sources": "Scientific sources",
    "different.experts": "Experts",
    "different.products": "Products in database",

    // Partners visual
    "partners.program": "Partner Program",
    "partners.forRetailers": "For retailers",
    "partners.analytics": "Analytics",
    "partners.conversion": "conversion",
    "partners.targeting": "Targeting",
    "partners.roi": "ROI",
    "partners.loyalty": "Loyalty",
    "partners.retention": "retention",

    // Footer
    "footer.madeWith": "Made with love in Ukraine",

    // Partners
    "partners.label": "For Partners",
    "partners.headline": "Opportunities for Retailers",
    "partners.desc": "Integrate NutriLife into your business to increase customer loyalty and boost sales.",
    "partners.feature1": "Personalized offers for your customers",
    "partners.feature2": "Integration with your product catalog",
    "partners.feature3": "Consumer preference analytics",
    "partners.cta": "Become a Partner",

    // Waitlist
    "waitlist.label": "Join",
    "waitlist.headline": "Be the First to Try NutriLife",
    "waitlist.desc": "Leave your email and get early access to the beta version.",
    "waitlist.placeholder": "Your email",
    "waitlist.button": "Join the Waitlist",
    "waitlist.privacy": "We respect your privacy and won't spam you.",
    "waitlist.success": "Thank you! You're on the waitlist.",
    "waitlist.loading": "Please wait...",
    "waitlist.emailError": "Please enter a valid email",
    "waitlist.joined": "already joined",

    // FAQ
    "faq.label": "FAQ",
    "faq.headline": "Frequently Asked Questions",
    "faq.q1": "Is NutriLife free?",
    "faq.a1": "We plan a basic free version and a premium plan with advanced features.",
    "faq.q2": "How does NutriLife account for local products?",
    "faq.a2": "We integrate data from Ukrainian supermarket chains and regularly update our available products database.",
    "faq.q3": "Does NutriLife support special diets?",
    "faq.a3": "Yes! We support vegetarian, vegan, gluten-free, and other diets.",
    "faq.q4": "When is the launch?",
    "faq.a4": "We plan to launch the beta version soon. Join the waitlist!",
    "faq.q5": "Do I need to enter a lot of data?",
    "faq.a5": "Initial setup takes 2-3 minutes. Then the system learns from your preferences.",
    "faq.contact": "Didn't find your answer? Contact us at",

    // Footer
    "footer.tagline": "Smart nutrition assistant for healthy eating in Ukraine.",
    "footer.product": "Product",
    "footer.company": "Company",
    "footer.contact": "Contact",
    "footer.legal": "Legal",
    "footer.about": "About Us",
    "footer.blog": "Blog",
    "footer.careers": "Careers",
    "footer.press": "Press",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms of Use",
    "footer.cookies": "Cookies",
    "footer.copyright": "© 2026 NutriLife. All rights reserved.",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ua")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("nutrilife-language") as Language
    if (savedLanguage && (savedLanguage === "ua" || savedLanguage === "en")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("nutrilife-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ua] || key
  }

  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: "ua", setLanguage, t }}>
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
