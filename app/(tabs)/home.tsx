import { router } from 'expo-router';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { mockPackageTypes, mockPlanTiers } from '@/constants/mockData';
import { useNutriLifeState } from '@/app/_layout';

export default function HomeTabScreen() {
  const { subscriptionPlan, profile, mealPlan, generateMealPlan } = useNutriLifeState();

  const packageLabel = useMemo(() => {
    if (!subscriptionPlan) return '';
    return mockPackageTypes.find((p) => p.key === subscriptionPlan.packageType)?.label ?? subscriptionPlan.packageType;
  }, [subscriptionPlan]);

  const planTierLabel = useMemo(() => {
    if (!subscriptionPlan) return '';
    return mockPlanTiers.find((t) => t.key === subscriptionPlan.planTier)?.label ?? subscriptionPlan.planTier;
  }, [subscriptionPlan]);

  const goalLabel = profile?.nutritionGoal === 'lose' ? 'Lose weight' : profile?.nutritionGoal === 'gain' ? 'Gain muscle mass' : 'Maintain balance';

  const summary = mealPlan?.nutritionSummary;

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi{profile?.email ? `, ${profile.email.split('@')[0]}` : ''}</Text>
        <Text style={styles.smallMuted}>Your personalized nutrition MVP</Text>
      </View>

      <AppCard variant="elevated" style={styles.summaryCard}>
        <SectionTitle title="Today at a glance" />

        <View style={styles.kvRow}>
          <Text style={styles.kvLabel}>Package</Text>
          <Text style={styles.kvValue}>{packageLabel}</Text>
        </View>
        <View style={styles.kvRow}>
          <Text style={styles.kvLabel}>Plan tier</Text>
          <Text style={styles.kvValue}>{planTierLabel}</Text>
        </View>
        <View style={styles.kvRow}>
          <Text style={styles.kvLabel}>Current goal</Text>
          <Text style={styles.kvValue}>{goalLabel}</Text>
        </View>

        <View style={styles.miniDivider} />

        {summary ? (
          <View style={styles.macroGrid}>
            <Macro label="Calories" value={`${summary.calories} kcal`} />
            <Macro label="Protein" value={`${summary.protein}g`} />
            <Macro label="Fat" value={`${summary.fat}g`} />
            <Macro label="Carbs" value={`${summary.carbs}g`} />
            <Macro label="Fiber" value={`${summary.fiber}g`} />
          </View>
        ) : (
          <Text style={styles.placeholder}>Generate your meal plan to see nutrition totals.</Text>
        )}
      </AppCard>

      <SectionTitle title="Quick actions" style={{ marginBottom: 0 }} />

      <View style={styles.actions}>
        <AppButton
          onPress={() => {
            // Generate a fresh daily mock plan.
            generateMealPlan({ cadence: 'daily', variantIndex: 0 });
            router.push('/plan');
          }}>
          Generate meal plan
        </AppButton>
        <AppButton variant="secondary" onPress={() => router.push('/recipes')}>
          Recipes
        </AppButton>
        <AppButton variant="secondary" onPress={() => router.push('/groceries')}>
          Grocery list
        </AppButton>
        <AppButton variant="secondary" onPress={() => router.push('/progress')}>
          Progress
        </AppButton>
      </View>

      <AppCard style={styles.tipCard}>
        <Text style={styles.tipTitle}>Meal plan is mock data only</Text>
        <Text style={styles.tipBody}>
          Replace meal and grocery checkboxes update locally. No backend, no AI, no supermarket APIs.
        </Text>
      </AppCard>
    </ScreenContainer>
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
  header: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  greeting: {
    color: colors.text,
    fontWeight: '950',
    fontSize: 26,
    lineHeight: 32,
  },
  smallMuted: {
    color: colors.mutedText,
    fontSize: 13,
  },
  summaryCard: {
    marginBottom: spacing.lg,
  },
  kvRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  kvLabel: {
    color: colors.mutedText,
    fontWeight: '800',
    fontSize: 13,
  },
  kvValue: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 13,
    textAlign: 'right',
  },
  miniDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  macroGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  macroItem: {
    width: '48%',
    borderRadius: 14,
    padding: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  macroLabel: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: '800',
  },
  macroValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '950',
    marginTop: 2,
  },
  actions: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  placeholder: {
    color: 'rgba(234,243,238,0.6)',
    fontSize: 13,
    lineHeight: 18,
  },
  tipCard: {
    borderRadius: 22,
    padding: spacing.md,
  },
  tipTitle: {
    color: colors.text,
    fontWeight: '900',
    marginBottom: 6,
  },
  tipBody: {
    color: 'rgba(234,243,238,0.7)',
    fontSize: 13,
    lineHeight: 18,
  },
});

