import type { NutritionGoal } from './user';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface MealNutrition {
  calories: number;
  protein: number; // grams
  fat: number; // grams
  carbs: number; // grams
  fiber: number; // grams
}

export interface Meal {
  id: string;
  type: MealType;
  title: string;
  recipeId: string; // mock-only reference
  nutrition: MealNutrition;
}

export interface MealPlanNutritionSummary extends MealNutrition {}

export interface MealPlan {
  cadence: 'daily' | 'weekly';
  goal: NutritionGoal;
  meals: Meal[]; // includes breakfast, lunch, dinner, snack
  nutritionSummary: MealPlanNutritionSummary;
  updatedAt: string; // ISO timestamp
}

