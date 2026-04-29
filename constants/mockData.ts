import type { DietaryRestriction, NutritionGoal } from '@/types/user';
import type { GroceryCategory, GroceryItem, GroceryCategoryKey } from '@/types/grocery';
import type { Meal, MealPlan } from '@/types/meal-plan';
import type { MealType } from '@/types/meal-plan';
import type { NutritionGoal as GoalType } from '@/types/user';
import type { PlanTier, PackageType } from '@/types/subscription';
import type { Recipe, RecipeTag, RecipeNutrition } from '@/types/recipe';
import type { ProgressEntry } from '@/types/progress';

import type { UserBudget, UserProfile } from '@/types/user';
import type { UserProfile as UserProfileType } from '@/types/user';

export const mockPackageTypes: Array<{ key: PackageType; label: string }> = [
  { key: 'individual', label: 'Individual' },
  { key: 'family', label: 'Family' },
];

export const mockPlanTiers: Array<{
  key: PlanTier;
  label: string;
  priceLabel: string;
  disabled?: boolean;
  badge?: string;
}> = [
  { key: 'free', label: 'Free', priceLabel: '$0' },
  { key: 'basic', label: 'Basic', priceLabel: '$9.99/mo' },
  { key: 'premium', label: 'Premium', priceLabel: '$19.99/mo', disabled: true, badge: 'Coming later' },
];

const r = (nutrition: RecipeNutrition, caloriesFudge = 0): RecipeNutrition => ({
  calories: Math.round(nutrition.calories + caloriesFudge),
  protein: Math.round(nutrition.protein),
  fat: Math.round(nutrition.fat),
  carbs: Math.round(nutrition.carbs),
  fiber: Math.round(nutrition.fiber),
});

export const mockRecipes: Recipe[] = [
  {
    id: 'recipe-oats-berry',
    title: 'Oats + Berry Glow Bowl',
    photoPlaceholder: 'Oats bowl photo placeholder',
    ingredients: ['Rolled oats', 'Greek yogurt', 'Berries', 'Chia seeds', 'Cinnamon', 'Honey (optional)'],
    nutrition: r({ calories: 420, protein: 28, fat: 12, carbs: 48, fiber: 10 }),
    tags: ['Quick', 'Anti-stress', 'Budget-friendly'],
    instructions: ['Stir oats with yogurt.', 'Top with berries and chia.', 'Finish with cinnamon.'],
  },
  {
    id: 'recipe-eggs-avocado-toast',
    title: 'Eggs + Avocado Wellness Toast',
    photoPlaceholder: 'Egg toast photo placeholder',
    ingredients: ['Eggs', 'Whole-grain toast', 'Avocado', 'Lemon juice', 'Salt', 'Pepper'],
    nutrition: r({ calories: 460, protein: 27, fat: 18, carbs: 44, fiber: 9 }),
    tags: ['Quick'],
  },
  {
    id: 'recipe-chicken-quinoa-bowl',
    title: 'Chicken Quinoa Balance Bowl',
    photoPlaceholder: 'Chicken quinoa bowl placeholder',
    ingredients: ['Chicken breast', 'Quinoa', 'Cherry tomatoes', 'Cucumber', 'Olive oil', 'Parsley'],
    nutrition: r({ calories: 620, protein: 45, fat: 16, carbs: 58, fiber: 12 }),
    tags: ['Budget-friendly'],
    instructions: ['Cook quinoa.', 'Sear chicken.', 'Assemble with veggies and olive oil.'],
  },
  {
    id: 'recipe-turkey-citrus-salad',
    title: 'Turkey Citrus Power Salad',
    photoPlaceholder: 'Turkey salad photo placeholder',
    ingredients: ['Turkey', 'Mixed greens', 'Orange segments', 'Cucumber', 'Olive oil', 'Mustard dressing'],
    nutrition: r({ calories: 540, protein: 43, fat: 14, carbs: 45, fiber: 11 }),
    tags: ['Anti-stress'],
  },
  {
    id: 'recipe-salmon-roast-veg',
    title: 'Salmon Roast + Warm Veggies',
    photoPlaceholder: 'Salmon roast photo placeholder',
    ingredients: ['Salmon', 'Sweet potato', 'Broccoli', 'Garlic', 'Olive oil', 'Lemon'],
    nutrition: r({ calories: 700, protein: 44, fat: 28, carbs: 66, fiber: 12 }),
    tags: ['Anti-stress'],
    instructions: ['Roast sweet potato and broccoli.', 'Bake salmon.', 'Finish with lemon.'],
  },
  {
    id: 'recipe-tofu-ginger-stirfry',
    title: 'Ginger Tofu Stirfry (Plant Calm)',
    photoPlaceholder: 'Tofu stirfry placeholder',
    ingredients: ['Tofu', 'Rice', 'Broccoli', 'Carrots', 'Ginger', 'Soy sauce (or tamari)'],
    nutrition: r({ calories: 640, protein: 28, fat: 18, carbs: 78, fiber: 11 }),
    tags: ['Budget-friendly'],
    instructions: ['Sear tofu.', 'Stir-fry veggies.', 'Combine with rice and sauce.'],
  },
  {
    id: 'recipe-greek-yogurt-berries',
    title: 'Greek Yogurt + Berry Calm',
    photoPlaceholder: 'Yogurt bowl placeholder',
    ingredients: ['Greek yogurt', 'Berries', 'Walnuts', 'Vanilla', 'Cinnamon'],
    nutrition: r({ calories: 310, protein: 22, fat: 14, carbs: 22, fiber: 6 }),
    tags: ['Quick', 'Anti-stress'],
  },
  {
    id: 'recipe-hummus-veg-crunch',
    title: 'Hummus Veg Crunch',
    photoPlaceholder: 'Hummus plate placeholder',
    ingredients: ['Hummus', 'Cucumber', 'Carrots', 'Bell peppers', 'Olive oil', 'Lemon'],
    nutrition: r({ calories: 280, protein: 10, fat: 12, carbs: 32, fiber: 9 }),
    tags: ['Budget-friendly', 'Quick'],
  },
  {
    id: 'recipe-protein-smoothie',
    title: 'Protein Green Smoothie',
    photoPlaceholder: 'Smoothie placeholder',
    ingredients: ['Protein powder (mock)', 'Spinach', 'Banana', 'Milk (or alt)', 'Chia', 'Ice'],
    nutrition: r({ calories: 390, protein: 33, fat: 8, carbs: 46, fiber: 8 }),
    tags: ['Quick'],
  },
];

const recipeById: Record<string, Recipe> = mockRecipes.reduce((acc, it) => {
  acc[it.id] = it;
  return acc;
}, {} as Record<string, Recipe>);

type MealPlanVariant = {
  variantLabel: string;
  recipesByType: Record<MealType, string>;
};

const variantIndexByGoal: Record<NutritionGoal, { daily: MealPlanVariant[]; weekly: MealPlanVariant[] }> = {
  lose: {
    daily: [
      {
        variantLabel: 'Lean Day',
        recipesByType: {
          breakfast: 'recipe-oats-berry',
          lunch: 'recipe-turkey-citrus-salad',
          dinner: 'recipe-salmon-roast-veg',
          snack: 'recipe-greek-yogurt-berries',
        },
      },
      {
        variantLabel: 'Low-Load Day',
        recipesByType: {
          breakfast: 'recipe-eggs-avocado-toast',
          lunch: 'recipe-chicken-quinoa-bowl',
          dinner: 'recipe-tofu-ginger-stirfry',
          snack: 'recipe-hummus-veg-crunch',
        },
      },
    ],
    weekly: [
      {
        variantLabel: 'Week Cut',
        recipesByType: {
          breakfast: 'recipe-protein-smoothie',
          lunch: 'recipe-turkey-citrus-salad',
          dinner: 'recipe-salmon-roast-veg',
          snack: 'recipe-hummus-veg-crunch',
        },
      },
      {
        variantLabel: 'Week Balanced',
        recipesByType: {
          breakfast: 'recipe-oats-berry',
          lunch: 'recipe-chicken-quinoa-bowl',
          dinner: 'recipe-tofu-ginger-stirfry',
          snack: 'recipe-greek-yogurt-berries',
        },
      },
    ],
  },
  maintain: {
    daily: [
      {
        variantLabel: 'Balance Day',
        recipesByType: {
          breakfast: 'recipe-eggs-avocado-toast',
          lunch: 'recipe-chicken-quinoa-bowl',
          dinner: 'recipe-salmon-roast-veg',
          snack: 'recipe-greek-yogurt-berries',
        },
      },
    ],
    weekly: [
      {
        variantLabel: 'Steady Week',
        recipesByType: {
          breakfast: 'recipe-oats-berry',
          lunch: 'recipe-turkey-citrus-salad',
          dinner: 'recipe-salmon-roast-veg',
          snack: 'recipe-hummus-veg-crunch',
        },
      },
      {
        variantLabel: 'Steady Week (2)',
        recipesByType: {
          breakfast: 'recipe-protein-smoothie',
          lunch: 'recipe-chicken-quinoa-bowl',
          dinner: 'recipe-tofu-ginger-stirfry',
          snack: 'recipe-greek-yogurt-berries',
        },
      },
    ],
  },
  gain: {
    daily: [
      {
        variantLabel: 'Muscle Builder',
        recipesByType: {
          breakfast: 'recipe-protein-smoothie',
          lunch: 'recipe-chicken-quinoa-bowl',
          dinner: 'recipe-salmon-roast-veg',
          snack: 'recipe-greek-yogurt-berries',
        },
      },
      {
        variantLabel: 'Strength Day',
        recipesByType: {
          breakfast: 'recipe-oats-berry',
          lunch: 'recipe-turkey-citrus-salad',
          dinner: 'recipe-tofu-ginger-stirfry',
          snack: 'recipe-hummus-veg-crunch',
        },
      },
    ],
    weekly: [
      {
        variantLabel: 'Bulk Week',
        recipesByType: {
          breakfast: 'recipe-protein-smoothie',
          lunch: 'recipe-chicken-quinoa-bowl',
          dinner: 'recipe-salmon-roast-veg',
          snack: 'recipe-hummus-veg-crunch',
        },
      },
    ],
  },
};

export function buildMockMealPlan(args: {
  goal: GoalType;
  cadence: 'daily' | 'weekly';
  variantIndex?: number;
}): MealPlan {
  const variants = variantIndexByGoal[args.goal][args.cadence];
  const variant = variants[args.variantIndex ?? 0] ?? variants[0];

  const meals: Meal[] = (['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map((type) => {
    const recipeId = variant.recipesByType[type];
    const recipe = recipeById[recipeId];
    return {
      id: `${type}-${recipeId}`,
      type,
      title: recipe ? recipe.title : `${type} (mock)`,
      recipeId,
      nutrition: recipe.nutrition,
    };
  });

  const nutritionSummary = meals.reduce(
    (acc, meal) => {
      acc.calories += meal.nutrition.calories;
      acc.protein += meal.nutrition.protein;
      acc.fat += meal.nutrition.fat;
      acc.carbs += meal.nutrition.carbs;
      acc.fiber += meal.nutrition.fiber;
      return acc;
    },
    { calories: 0, protein: 0, fat: 0, carbs: 0, fiber: 0 },
  );

  return {
    cadence: args.cadence,
    goal: args.goal,
    meals,
    nutritionSummary,
    updatedAt: new Date().toISOString(),
  };
}

export const mockGroceryCategories: GroceryCategory[] = [
  { key: 'produce', label: 'Produce' },
  { key: 'protein', label: 'Protein' },
  { key: 'pantry', label: 'Pantry' },
  { key: 'dairy', label: 'Dairy' },
  { key: 'extras', label: 'Extras' },
];

export const mockGroceryItems: GroceryItem[] = [
  {
    id: 'g-spinach',
    name: 'Spinach',
    categoryKey: 'produce',
    unitLabel: 'bunch',
    estimatedPrice: 3.5,
    cheapestOfferLabel: 'Cheapest offer: GreenMart',
    purchased: false,
  },
  {
    id: 'g-berries',
    name: 'Mixed berries',
    categoryKey: 'produce',
    unitLabel: 'portion',
    estimatedPrice: 6.75,
    cheapestOfferLabel: 'Cheapest offer: BerryBest',
    purchased: false,
  },
  {
    id: 'g-cucumber',
    name: 'Cucumber',
    categoryKey: 'produce',
    unitLabel: 'each',
    estimatedPrice: 1.35,
    cheapestOfferLabel: 'Cheapest offer: FreshCorner',
    purchased: false,
  },
  {
    id: 'g-tomatoes',
    name: 'Cherry tomatoes',
    categoryKey: 'produce',
    unitLabel: 'box',
    estimatedPrice: 4.25,
    cheapestOfferLabel: 'Cheapest offer: GrowNow',
    purchased: false,
  },
  {
    id: 'g-carrots',
    name: 'Carrots',
    categoryKey: 'produce',
    unitLabel: 'bag',
    estimatedPrice: 2.4,
    cheapestOfferLabel: 'Cheapest offer: FreshCorner',
    purchased: false,
  },
  {
    id: 'g-bell-peppers',
    name: 'Bell peppers',
    categoryKey: 'produce',
    unitLabel: 'each',
    estimatedPrice: 1.95,
    cheapestOfferLabel: 'Cheapest offer: GreenMart',
    purchased: false,
  },
  {
    id: 'g-sweet-potato',
    name: 'Sweet potato',
    categoryKey: 'produce',
    unitLabel: 'kg',
    estimatedPrice: 4.95,
    cheapestOfferLabel: 'Cheapest offer: GrowNow',
    purchased: false,
  },
  {
    id: 'g-broccoli',
    name: 'Broccoli',
    categoryKey: 'produce',
    unitLabel: 'head',
    estimatedPrice: 2.8,
    cheapestOfferLabel: 'Cheapest offer: VegVille',
    purchased: false,
  },
  {
    id: 'g-chicken-breast',
    name: 'Chicken breast',
    categoryKey: 'protein',
    unitLabel: 'portion',
    estimatedPrice: 7.5,
    cheapestOfferLabel: 'Cheapest offer: ProteinPlus',
    purchased: false,
  },
  {
    id: 'g-salmon',
    name: 'Salmon',
    categoryKey: 'protein',
    unitLabel: 'portion',
    estimatedPrice: 11.25,
    cheapestOfferLabel: 'Cheapest offer: OceanMart',
    purchased: false,
  },
  {
    id: 'g-tofu',
    name: 'Tofu',
    categoryKey: 'protein',
    unitLabel: 'pack',
    estimatedPrice: 3.9,
    cheapestOfferLabel: 'Cheapest offer: PlantPoint',
    purchased: false,
  },
  {
    id: 'g-turkey',
    name: 'Turkey',
    categoryKey: 'protein',
    unitLabel: 'portion',
    estimatedPrice: 6.95,
    cheapestOfferLabel: 'Cheapest offer: ProteinPlus',
    purchased: false,
  },
  {
    id: 'g-eggs',
    name: 'Eggs',
    categoryKey: 'protein',
    unitLabel: 'dozen',
    estimatedPrice: 4.75,
    cheapestOfferLabel: 'Cheapest offer: FarmFresh',
    purchased: false,
  },
  {
    id: 'g-rolled-oats',
    name: 'Rolled oats',
    categoryKey: 'pantry',
    unitLabel: 'bag',
    estimatedPrice: 3.25,
    cheapestOfferLabel: 'Cheapest offer: PantryPro',
    purchased: false,
  },
  {
    id: 'g-quinoa',
    name: 'Quinoa',
    categoryKey: 'pantry',
    unitLabel: 'bag',
    estimatedPrice: 5.5,
    cheapestOfferLabel: 'Cheapest offer: PantryPro',
    purchased: false,
  },
  {
    id: 'g-olive-oil',
    name: 'Olive oil',
    categoryKey: 'pantry',
    unitLabel: 'bottle',
    estimatedPrice: 9.2,
    cheapestOfferLabel: 'Cheapest offer: OliveWorld',
    purchased: false,
  },
  {
    id: 'g-chia-seeds',
    name: 'Chia seeds',
    categoryKey: 'pantry',
    unitLabel: 'jar',
    estimatedPrice: 4.1,
    cheapestOfferLabel: 'Cheapest offer: PantryPro',
    purchased: false,
  },
  {
    id: 'g-chickpeas',
    name: 'Chickpeas (for hummus)',
    categoryKey: 'pantry',
    unitLabel: 'can',
    estimatedPrice: 1.85,
    cheapestOfferLabel: 'Cheapest offer: PantryPro',
    purchased: false,
  },
  {
    id: 'g-greek-yogurt',
    name: 'Greek yogurt',
    categoryKey: 'dairy',
    unitLabel: 'tub',
    estimatedPrice: 6.4,
    cheapestOfferLabel: 'Cheapest offer: DairyDirect',
    purchased: false,
  },
  {
    id: 'g-walnuts',
    name: 'Walnuts',
    categoryKey: 'extras',
    unitLabel: 'bag',
    estimatedPrice: 7.25,
    cheapestOfferLabel: 'Cheapest offer: NutriNook',
    purchased: false,
  },
  {
    id: 'g-honey',
    name: 'Honey',
    categoryKey: 'extras',
    unitLabel: 'bottle',
    estimatedPrice: 5.1,
    cheapestOfferLabel: 'Cheapest offer: GoldenBee',
    purchased: false,
  },
  {
    id: 'g-hummus',
    name: 'Hummus (ready)',
    categoryKey: 'extras',
    unitLabel: 'container',
    estimatedPrice: 4.6,
    cheapestOfferLabel: 'Cheapest offer: PantryPro',
    purchased: false,
  },
];

export const mockProgressEntries: ProgressEntry[] = [
  { id: 'p-2026-01', period: '2026-01', weightKg: 78.4 },
  { id: 'p-2026-02', period: '2026-02', weightKg: 77.2 },
  { id: 'p-2026-03', period: '2026-03', weightKg: 76.6 },
  { id: 'p-2026-04', period: '2026-04', weightKg: 75.9 },
];

export const mockDefaultDietaryRestrictions: DietaryRestriction[] = [
  'lactose',
  'gluten',
];

export const mockStarterBudget: UserBudget = {
  cadence: 'daily',
  amount: 35,
  currency: 'USD',
};

export const mockStarterProfile: UserProfileType = {
  packageType: 'individual',
  email: '',
  dateOfBirth: '1995-06-12',
  gender: 'other',
  heightCm: 172,
  currentWeightKg: 76,
  activityLevel: 'medium',
  nutritionGoal: 'maintain',
  dietaryRestrictions: mockDefaultDietaryRestrictions,
  geolocation: 'City center (placeholder)',
  budget: mockStarterBudget,
};

