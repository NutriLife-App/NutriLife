import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppChip } from '@/components/ui/AppChip';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useNutriLifeState } from '@/app/_layout';
import type { Meal, MealType } from '@/types/meal-plan';

const MEAL_TYPES: { key: MealType; label: string }[] = [
  { key: 'breakfast', label: 'Breakfast' },
  { key: 'lunch', label: 'Lunch' },
  { key: 'dinner', label: 'Dinner' },
  { key: 'snack', label: 'Snack' },
];

export default function PlanTabScreen() {
  const { mealPlan, generateMealPlan, replaceMeal } = useNutriLifeState();
  const [cadence, setCadence] = useState<'daily' | 'weekly'>('daily');

  useEffect(() => {
    if (!mealPlan) return;
    setCadence(mealPlan.cadence);
  }, [mealPlan]);

  const mealsByType = useMemo(() => {
    const map = new Map<MealType, Meal>();
    if (!mealPlan) return map;
    mealPlan.meals.forEach((m) => map.set(m.type, m));
    return map;
  }, [mealPlan]);

  const summary = mealPlan?.nutritionSummary;

  const ensureMealPlan = () => {
    generateMealPlan({ cadence, variantIndex: 0 });
  };

  return (
    <ScreenContainer>
      <View style={styles.top}>
        <Text style={styles.step}>Meal Plan</Text>
        <Text style={styles.title}>Build your day with calm, nourishing meals</Text>
      </View>

      <AppCard style={styles.section}>
        <Text style={styles.label}>Plan cadence</Text>
        <View style={styles.chipsRow}>
          <AppChip
            label="Daily"
            selected={cadence === 'daily'}
            onPress={() => {
              setCadence('daily');
              generateMealPlan({ cadence: 'daily', variantIndex: 0 });
            }}
          />
          <AppChip
            label="Weekly"
            selected={cadence === 'weekly'}
            onPress={() => {
              setCadence('weekly');
              generateMealPlan({ cadence: 'weekly', variantIndex: 0 });
            }}
          />
        </View>
      </AppCard>

      {mealPlan ? (
        <AppCard variant="elevated" style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Nutrition summary</Text>
          {summary ? (
            <View style={styles.macroGrid}>
              <Macro label="Calories" value={`${summary.calories} kcal`} />
              <Macro label="Protein" value={`${summary.protein}g`} />
              <Macro label="Fat" value={`${summary.fat}g`} />
              <Macro label="Carbs" value={`${summary.carbs}g`} />
              <Macro label="Fiber" value={`${summary.fiber}g`} />
            </View>
          ) : null}
        </AppCard>
      ) : (
        <AppCard variant="elevated" style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>No meal plan yet</Text>
          <Text style={styles.placeholder}>Tap below to generate a mock plan.</Text>
          <View style={{ height: spacing.sm }} />
          <AppButton onPress={ensureMealPlan}>Generate meal plan</AppButton>
        </AppCard>
      )}

      <View style={styles.replaceRow}>
        <AppButton
          variant="secondary"
          disabled={!mealPlan}
          onPress={() => {
            replaceMeal();
          }}
        >
          Replace meal
        </AppButton>
        <AppButton variant="ghost" onPress={() => router.push('/groceries')} disabled={!mealPlan}>
          Grocery list
        </AppButton>
      </View>

      <View style={styles.meals}>
        {MEAL_TYPES.map(({ key, label }) => {
          const m = mealsByType.get(key);
          if (!m) return null;
          return (
            <MealCard key={key} label={label} meal={m} />
          );
        })}
      </View>
    </ScreenContainer>
  );
}

function MealCard({ label, meal }: { label: string; meal: Meal }) {
  return (
    <AppCard style={styles.mealCard} variant="elevated">
      <View style={styles.mealHeader}>
        <Text style={styles.mealTitle}>{label}</Text>
        <Text style={styles.mealRecipeTitle}>{meal.title}</Text>
      </View>
      <View style={styles.mealNutritionRow}>
        <MiniMetric label="Calories" value={`${meal.nutrition.calories}`} />
        <MiniMetric label="Protein" value={`${meal.nutrition.protein}g`} />
        <MiniMetric label="Fiber" value={`${meal.nutrition.fiber}g`} />
      </View>
    </AppCard>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.miniMetric}>
      <Text style={styles.miniMetricLabel}>{label}</Text>
      <Text style={styles.miniMetricValue}>{value}</Text>
    </View>
  );
}

function Macro({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.macroItem}>
      <Text style={styles.macroLabel}>{label}</Text>
      <Text style={styles.macroValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create<any>({
  top: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  step: {
    color: colors.accentWarm,
    fontWeight: '900',
    letterSpacing: 0.2,
    fontSize: 12,
  },
  title: {
    color: colors.text,
    fontWeight: '950',
    fontSize: 22,
    lineHeight: 28,
  },
  section: {
    marginBottom: spacing.md,
  },
  label: {
    color: colors.mutedText,
    fontWeight: '900',
    marginBottom: spacing.sm,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  summaryCard: {
    marginBottom: spacing.md,
  },
  summaryTitle: {
    color: colors.text,
    fontWeight: '950',
    fontSize: 16,
    marginBottom: spacing.sm,
  },
  placeholder: {
    color: 'rgba(234,243,238,0.6)',
    fontSize: 13,
    lineHeight: 18,
  },
  replaceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  meals: {
    gap: spacing.sm,
  },
  mealCard: {
    borderRadius: 22,
  },
  mealHeader: {
    marginBottom: spacing.sm,
    gap: 4,
  },
  mealTitle: {
    color: colors.accent,
    fontWeight: '950',
    fontSize: 14,
  },
  mealRecipeTitle: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 16,
  },
  mealNutritionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  miniMetric: {
    flex: 1,
    minWidth: 110,
    padding: spacing.sm,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  miniMetricLabel: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: '800',
  },
  miniMetricValue: {
    color: colors.text,
    fontWeight: '950',
    fontSize: 14,
    marginTop: 3,
  },
  macroGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  macroItem: {
    width: '48%',
    borderRadius: 16,
    padding: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  macroLabel: {
    color: colors.mutedText,
    fontWeight: '900',
    fontSize: 12,
  },
  macroValue: {
    color: colors.text,
    fontWeight: '950',
    fontSize: 14,
    marginTop: 2,
  },
  mealCardPad: {},
});

