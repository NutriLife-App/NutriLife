import { router } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppChip } from '@/components/ui/AppChip';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useNutriLifeState } from '@/app/_layout';
import type { NutritionGoal } from '@/types/user';

const GOALS: { key: NutritionGoal; label: string }[] = [
  { key: 'lose', label: 'Lose weight' },
  { key: 'maintain', label: 'Maintain balance' },
  { key: 'gain', label: 'Gain muscle mass' },
];

export default function OnboardingLifestyleStep() {
  const { profile, patchProfile } = useNutriLifeState();
  const [nutritionGoal, setNutritionGoal] = useState<NutritionGoal>('maintain');

  useEffect(() => {
    if (!profile) return;
    setNutritionGoal(profile.nutritionGoal);
  }, [profile]);

  const subtitle = useMemo(() => GOALS.find((g) => g.key === nutritionGoal)?.label ?? '', [nutritionGoal]);

  if (!profile) {
    router.replace('/onboarding/account');
    return null;
  }

  return (
    <ScreenContainer>
      <View style={styles.top}>
        <Text style={styles.step}>Step 3 / 5</Text>
        <Text style={styles.title}>Your nutrition goal</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <AppCard style={styles.section}>
        <Text style={styles.label}>Choose one</Text>
        <View style={styles.chipsRow}>
          {GOALS.map((g) => (
            <AppChip key={g.key} label={g.label} selected={nutritionGoal === g.key} onPress={() => setNutritionGoal(g.key)} />
          ))}
        </View>
      </AppCard>

      <View style={styles.footer}>
        <AppButton
          onPress={() => {
            patchProfile({ nutritionGoal });
            router.push('/onboarding/restrictions');
          }}
          accessibilityLabel="Continue to dietary restrictions"
        >
          Continue
        </AppButton>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create<any>({
  top: {
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  step: {
    color: colors.accentWarm,
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 0.2,
  },
  title: {
    color: colors.text,
    fontWeight: '950',
    fontSize: 22,
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 13,
  },
  section: {
    marginBottom: spacing.md,
  },
  label: {
    color: colors.mutedText,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  footer: {
    marginTop: spacing.lg,
  },
});

