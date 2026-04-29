import { router } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppChip } from '@/components/ui/AppChip';
import { AppInput } from '@/components/ui/AppInput';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { SliderField } from '@/components/ui/SliderField';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useNutriLifeState } from '@/app/_layout';
import type { UserBudget } from '@/types/user';

export default function OnboardingBudgetStep() {
  const { profile, patchProfile, finishOnboarding, subscriptionPlan } = useNutriLifeState();

  const initial: UserBudget =
    profile?.budget ?? {
      cadence: 'daily',
      amount: 35,
      currency: 'USD',
    };

  const [cadence, setCadence] = useState<UserBudget['cadence']>(initial.cadence);
  const [amount, setAmount] = useState<number>(initial.amount);

  useEffect(() => {
    if (!profile) return;
    setCadence(profile.budget.cadence);
    setAmount(profile.budget.amount);
  }, [profile]);

  const cadenceLabel = useMemo(() => (cadence === 'daily' ? 'Daily' : 'Weekly'), [cadence]);

  if (!profile || !subscriptionPlan) {
    router.replace('/onboarding/account');
    return null;
  }

  return (
    <ScreenContainer>
      <View style={styles.top}>
        <Text style={styles.step}>Step 5 / 5</Text>
        <Text style={styles.title}>Food budget</Text>
        <Text style={styles.subtitle}>So we pick meals that feel doable in real life.</Text>
      </View>

      <AppCard style={styles.section}>
        <Text style={styles.label}>Budget cadence</Text>
        <View style={styles.chipsRow}>
          <AppChip label="Daily" selected={cadence === 'daily'} onPress={() => setCadence('daily')} />
          <AppChip label="Weekly" selected={cadence === 'weekly'} onPress={() => setCadence('weekly')} />
        </View>
      </AppCard>

      <AppCard style={styles.section} variant="elevated">
        <SliderField
          label={`${cadenceLabel} amount`}
          value={amount}
          min={10}
          max={120}
          step={1}
          unit={profile.budget.currency}
          onChange={setAmount}
          accessibilityLabel="Food budget slider"
        />
        <View style={{ height: spacing.sm }} />
        <AppInput
          label="Amount"
          value={String(amount)}
          onChangeText={(txt) => {
            const parsed = Number(txt);
            if (!Number.isFinite(parsed)) return;
            setAmount(parsed);
          }}
          keyboardType="decimal-pad"
          placeholder="35"
          accessibilityLabel="Food budget amount input"
        />
      </AppCard>

      <View style={styles.footer}>
        <AppButton
          onPress={() => {
            patchProfile({
              budget: {
                cadence,
                amount,
                currency: profile.budget.currency,
              },
            });

            // State updates are async; small delay keeps mealPlan generation consistent.
            setTimeout(() => {
              finishOnboarding();
              router.replace('/home');
            }, 0);
          }}
          disabled={amount <= 0}
          accessibilityLabel="Finish onboarding"
        >
          Finish
        </AppButton>
        <Text style={styles.hint}>You can update these settings later.</Text>
      </View>
    </ScreenContainer>
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
    lineHeight: 18,
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
    gap: spacing.sm,
  },
  hint: {
    color: 'rgba(234,243,238,0.6)',
    fontSize: 12,
    lineHeight: 18,
  },
});

