export type RecipeTag = 'Quick' | 'Anti-stress' | 'Budget-friendly';

export interface RecipeNutrition {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
}

export interface Recipe {
  id: string;
  title: string;
  photoPlaceholder: string; // mock-only; later can become an image source
  ingredients: string[];
  nutrition: RecipeNutrition;
  tags: RecipeTag[];
  instructions?: string[];
}

