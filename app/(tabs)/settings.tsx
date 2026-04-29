import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppChip } from '@/components/ui/AppChip';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { mockPlanTiers } from '@/constants/mockData';
import { useNutriLifeState } from '@/app/_layout';
import { router } from 'expo-router';
import type { DietaryRestriction } from '@/types/user';

const RESTRICTION_LABELS: Record<DietaryRestriction, string> = {
  lactose: 'Lactose intolerance',
  gluten: 'Gluten intolerance / celiac',
  allergens: 'Allergens',
  vegetarian: 'Vegetarian',
};

export default function SettingsTabScreen() {
  const { subscriptionPlan, profile, logout } = useNutriLifeState();

  const planTierLabel = useMemo(() => {
    if (!subscriptionPlan) return '';
    return mockPlanTiers.find((t) => t.key === subscriptionPlan.planTier)?.label ?? subscriptionPlan.planTier;
  }, [subscriptionPlan]);

  return (
    <ScreenContainer>
      <View style={styles.top}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Update preferences and review your MVP package.</Text>
      </View>

      <AppCard style={styles.section} variant="elevated">
        <Text style={styles.sectionTitle}>Edit profile</Text>
        <Text style={styles.sectionBody}>Update account details in the onboarding wizard (mock).</Text>
        <View style={{ height: spacing.sm }} />
        <AppButton onPress={() => router.push('/onboarding/account')} accessibilityLabel="Edit profile">
          Edit profile
        </AppButton>
      </AppCard>

      <AppCard style={styles.section} variant="elevated">
        <Text style={styles.sectionTitle}>Dietary preferences</Text>
        <View style={styles.chipsRow}>
          {profile?.dietaryRestrictions?.length ? (
            profile.dietaryRestrictions.map((r) => (
              <AppChip key={r} label={RESTRICTION_LABELS[r] ?? r} selected />
            ))
          ) : (
            <Text style={styles.muted}>No preferences selected.</Text>
          )}
        </View>
      </AppCard>

      <AppCard style={styles.section} variant="elevated">
        <Text style={styles.sectionTitle}>Budget</Text>
        <Text style={styles.sectionBody}>
          {profile?.budget?.cadence === 'weekly' ? 'Weekly' : 'Daily'} budget: {profile?.budget?.amount ?? '--'}{' '}
          {profile?.budget?.currency ?? ''}
        </Text>
        <Text style={styles.muted}>Budget is used only for mock meal/grocery selection in MVP.</Text>
      </AppCard>

      <AppCard style={styles.section} variant="elevated">
        <Text style={styles.sectionTitle}>Package info</Text>
        <Text style={styles.sectionBody}>
          Package: {subscriptionPlan?.packageType === 'family' ? 'Family' : 'Individual'}
        </Text>
        <Text style={styles.sectionBody}>Tier: {planTierLabel || '--'}</Text>
        <Text style={styles.muted}>Premium shows a “Coming later” state (disabled) for this MVP.</Text>
      </AppCard>

      <AppCard style={styles.section} variant="elevated">
        <Text style={styles.sectionTitle}>Logout</Text>
        <Text style={styles.sectionBody}>Clears in-memory mock data and returns you to Welcome.</Text>
        <View style={{ height: spacing.sm }} />
        <AppButton
          variant="secondary"
          onPress={() => {
            logout();
            router.replace('/');
          }}
          accessibilityLabel="Logout"
        >
          Logout
        </AppButton>
      </AppCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create<any>({
  top: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text,
    fontWeight: '950',
    fontSize: 26,
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 13,
    lineHeight: 18,
  },
  section: {
    borderRadius: 22,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: '950',
    fontSize: 16,
    marginBottom: spacing.sm,
  },
  sectionBody: {
    color: colors.mutedText,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '800',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  muted: {
    color: 'rgba(234,243,238,0.6)',
    fontSize: 12,
    lineHeight: 18,
    marginTop: spacing.xs,
  },
});

