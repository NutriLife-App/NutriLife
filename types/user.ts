import type { PackageType } from './subscription';

export type Gender = 'female' | 'male' | 'other';

export type PhysicalActivityLevel = 'low' | 'medium' | 'high';

export type NutritionGoal = 'lose' | 'maintain' | 'gain';

export type DietaryRestriction = 'lactose' | 'gluten' | 'allergens' | 'vegetarian';

export type GeolocationPreference = string;

export interface UserBudget {
  cadence: 'daily' | 'weekly';
  amount: number; // in major currency units (e.g., 25.00)
  currency: 'USD' | 'EUR' | 'GBP';
}

export interface UserProfile {
  // Package-related info is also shown in Home for continuity.
  packageType: PackageType;

  email: string;
  dateOfBirth: string; // ISO date (YYYY-MM-DD)
  gender: Gender;

  heightCm: number;
  currentWeightKg: number;

  activityLevel: PhysicalActivityLevel;
  nutritionGoal: NutritionGoal;

  dietaryRestrictions: DietaryRestriction[];

  // Placeholder for now; will later be geocoding-based.
  geolocation: GeolocationPreference;

  budget: UserBudget;
}

