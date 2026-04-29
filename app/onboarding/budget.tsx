import { router } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppChip } from '@/components/ui/AppChip';
import { AppInput } from '@/components/ui/AppInput';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { SliderField } from '@/components/ui/SliderField';
import { spacing } from '@/constants/spacing';
import { useAppConfig } from '@/hooks/use-app-config';
import { useNutriLifeState } from '@/app/_layout';
import type { UserBudget } from '@/types/user';

export default function OnboardingBudgetStep() {
  const { colors, t } = useAppConfig();
  const { profile, patchProfile, finishOnboarding, subscriptionPlan } = useNutriLifeState();

  const initial: UserBudget =
    profile?.budget ?? {
      cadence: 'daily',
      amount: 35,
      currency: 'USD',
    };

  const [cadence, setCadence] = useState<UserBudget['cadence']>(initial.cadence);
  const [amount, setAmount] = useState<number>(initial.amount);
  const [budgetError, setBudgetError] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) return;
    setCadence(profile.budget.cadence);
    setAmount(profile.budget.amount);
  }, [profile]);

  const cadenceLabel = useMemo(
    () => (cadence === 'daily' ? t('onboarding.budget.daily') : t('onboarding.budget.weekly')),
    [cadence, t],
  );

  if (!profile || !subscriptionPlan) {
    router.replace('/onboarding/account');
    return null;
  }

  return (
    <ScreenContainer>
      <View style={styles.top}>
        <Text style={[styles.step, { color: colors.accentWarm }]}>{t('onboarding.budget.step')}</Text>
        <Text style={[styles.title, { color: colors.text }]}>{t('onboarding.budget.title')}</Text>
        <Text style={[styles.subtitle, { color: colors.mutedText }]}>{t('onboarding.budget.subtitle')}</Text>
      </View>

      <AppCard style={styles.section}>
        <Text style={[styles.label, { color: colors.mutedText }]}>{t('onboarding.budget.cadence')}</Text>
        <View style={styles.chipsRow}>
          <AppChip label={t('onboarding.budget.daily')} selected={cadence === 'daily'} onPress={() => setCadence('daily')} />
          <AppChip label={t('onboarding.budget.weekly')} selected={cadence === 'weekly'} onPress={() => setCadence('weekly')} />
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
          label={t('onboarding.budget.amount')}
          value={String(amount)}
          onChangeText={(txt) => {
            const parsed = Number(txt);
            if (!Number.isFinite(parsed)) return;
            setAmount(parsed);
            if (budgetError) setBudgetError(null);
          }}
          keyboardType="decimal-pad"
          placeholder="35"
          accessibilityLabel={t('onboarding.budget.amount')}
        />
        {budgetError ? <Text style={[styles.errorText, { color: colors.danger }]}>{budgetError}</Text> : null}
      </AppCard>

      <View style={styles.footer}>
        <AppButton variant="ghost" onPress={() => router.back()} accessibilityLabel={t('common.back')}>
          {t('common.back')}
        </AppButton>
        <AppButton
          onPress={() => {
            if (!Number.isFinite(amount) || amount <= 0) {
              setBudgetError(t('onboarding.budget.errorAmount'));
              return;
            }
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
          accessibilityLabel={t('common.finish')}
        >
          {t('common.finish')}
        </AppButton>
        <Text style={[styles.hint, { color: colors.mutedText }]}>{t('onboarding.budget.hint')}</Text>
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
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 0.2,
  },
  title: {
    fontWeight: '950',
    fontSize: 22,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  section: {
    marginBottom: spacing.md,
  },
  label: {
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
    fontSize: 12,
    lineHeight: 18,
  },
  errorText: {
    marginTop: spacing.xs,
    fontSize: 12,
    fontWeight: '700',
  },
});

