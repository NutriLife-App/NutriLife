import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { buildMockMealPlan, mockGroceryItems, mockProgressEntries, mockStarterProfile } from '@/constants/mockData';
import type { GroceryItem } from '@/types/grocery';
import type { MealPlan } from '@/types/meal-plan';
import type { ProgressEntry } from '@/types/progress';
import type { SubscriptionPlan } from '@/types/subscription';
import type { UserProfile } from '@/types/user';

type OnboardingCompletedReason = 'profile_complete';

type NutriLifeState = {
  subscriptionPlan: SubscriptionPlan | null;
  profile: UserProfile | null;
  mealPlan: MealPlan | null;
  groceryItems: GroceryItem[];
  progressEntries: ProgressEntry[];
  onboardingCompleted: boolean;
  onboardingCompletedReason?: OnboardingCompletedReason;
  mealPlanVariantIndex: number;

  selectSubscriptionPlan: (next: SubscriptionPlan) => void;
  patchProfile: (patch: Partial<UserProfile>) => void;
  initProfileDraftFromSubscription: () => void;
  finishOnboarding: () => void;

  generateMealPlan: (args: { cadence: 'daily' | 'weekly'; variantIndex?: number }) => void;
  replaceMeal: () => void;

  setGroceryPurchased: (id: string, purchased: boolean) => void;
  addProgressEntry: (entry: ProgressEntry) => void;
  logout: () => void;
};

const NutriLifeStateContext = createContext<NutriLifeState | undefined>(undefined);

export function useNutriLifeState() {
  const ctx = useContext(NutriLifeStateContext);
  if (!ctx) throw new Error('useNutriLifeState must be used within RootLayout provider');
  return ctx;
}

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(() =>
    mockGroceryItems.map((it) => ({ ...it })),
  );
  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>(() => mockProgressEntries.map((it) => ({ ...it })));
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [onboardingCompletedReason, setOnboardingCompletedReason] = useState<OnboardingCompletedReason | undefined>(undefined);
  const [mealPlanVariantIndex, setMealPlanVariantIndex] = useState(0);

  const profileRef = useRef<UserProfile | null>(null);
  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  const selectSubscriptionPlan = (next: SubscriptionPlan) => {
    setSubscriptionPlan(next);
  };

  const initProfileDraftFromSubscription = () => {
    // Create a complete draft so step screens can safely patch fields.
    if (!subscriptionPlan) return;
    const draft: UserProfile = {
      ...mockStarterProfile,
      packageType: subscriptionPlan.packageType,
    };
    profileRef.current = draft;
    setProfile(draft);
  };

  const patchProfile = (patch: Partial<UserProfile>) => {
    setProfile((prev) => {
      if (prev) return { ...prev, ...patch };
      if (!subscriptionPlan) return null;
      const next: UserProfile = {
        ...mockStarterProfile,
        packageType: subscriptionPlan.packageType,
        ...patch,
      };
      profileRef.current = next;
      return next;
    });
  };

  const finishOnboarding = () => {
    setOnboardingCompleted(true);
    setOnboardingCompletedReason('profile_complete');

    // Seed a first meal plan so Home looks alive immediately.
    const activeProfile = profileRef.current;
    if (!activeProfile) {
      setMealPlan(null);
      return;
    }
    setMealPlan(buildMockMealPlan({ goal: activeProfile.nutritionGoal, cadence: 'daily', variantIndex: 0 }));
  };

  const generateMealPlan = ({ cadence, variantIndex }: { cadence: 'daily' | 'weekly'; variantIndex?: number }) => {
    const activeProfile = profileRef.current;
    if (!activeProfile) return;
    const nextVariant = variantIndex ?? 0;
    setMealPlan(buildMockMealPlan({ goal: activeProfile.nutritionGoal, cadence, variantIndex: nextVariant }));
    setMealPlanVariantIndex(nextVariant);
  };

  const replaceMeal = () => {
    const activeProfile = profileRef.current;
    if (!activeProfile) return;
    const nextVariantIndex = mealPlanVariantIndex + 1;
    // Replace keeps the current cadence (daily/weekly) from the active plan if available.
    const cadence = mealPlan?.cadence ?? 'daily';
    setMealPlan(buildMockMealPlan({ goal: activeProfile.nutritionGoal, cadence, variantIndex: nextVariantIndex }));
    setMealPlanVariantIndex(nextVariantIndex);
  };

  const setGroceryPurchased = (id: string, purchased: boolean) => {
    setGroceryItems((prev) => prev.map((it) => (it.id === id ? { ...it, purchased } : it)));
  };

  const addProgressEntry = (entry: ProgressEntry) => {
    setProgressEntries((prev) => {
      const without = prev.filter((p) => p.id !== entry.id && p.period !== entry.period);
      return [...without, entry].sort((a, b) => a.period.localeCompare(b.period));
    });
  };

  const logout = () => {
    setSubscriptionPlan(null);
    setProfile(null);
    setMealPlan(null);
    setGroceryItems(mockGroceryItems.map((it) => ({ ...it })));
    setProgressEntries(mockProgressEntries.map((it) => ({ ...it })));
    setOnboardingCompleted(false);
    setOnboardingCompletedReason(undefined);
    setMealPlanVariantIndex(0);
  };

  const value: NutriLifeState = {
    subscriptionPlan,
    profile,
    mealPlan,
    groceryItems,
    progressEntries,
    onboardingCompleted,
    onboardingCompletedReason,
    mealPlanVariantIndex,

    selectSubscriptionPlan,
    patchProfile,
    initProfileDraftFromSubscription,
    finishOnboarding,

    generateMealPlan,
    replaceMeal,

    setGroceryPurchased,
    addProgressEntry,
    logout,
  };

  return (
    <ThemeProvider value={DarkTheme}>
      <NutriLifeStateContext.Provider value={value}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="light" />
      </NutriLifeStateContext.Provider>
    </ThemeProvider>
  );
}
