import { router } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppChip } from '@/components/ui/AppChip';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { spacing } from '@/constants/spacing';
import { useAppConfig } from '@/hooks/use-app-config';
import { useNutriLifeState } from '@/app/_layout';
import type { NutritionGoal } from '@/types/user';

const GOALS: { key: NutritionGoal }[] = [{ key: 'lose' }, { key: 'maintain' }, { key: 'gain' }];

export default function OnboardingLifestyleStep() {
  const { colors, t } = useAppConfig();
  const { profile, patchProfile } = useNutriLifeState();
  const [nutritionGoal, setNutritionGoal] = useState<NutritionGoal | null>(null);
  const [goalError, setGoalError] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) return;
    setNutritionGoal(profile.nutritionGoal);
  }, [profile]);

  const subtitle = useMemo(() => {
    if (!nutritionGoal) return '';
    return nutritionGoal === 'lose' ? t('goal.lose') : nutritionGoal === 'maintain' ? t('goal.maintain') : t('goal.gain');
  }, [nutritionGoal, t]);

  if (!profile) {
    router.replace('/onboarding/account');
    return null;
  }

  return (
    <ScreenContainer>
      <View style={styles.top}>
        <Text style={[styles.step, { color: colors.accentWarm }]}>{t('onboarding.lifestyle.step')}</Text>
        <Text style={[styles.title, { color: colors.text }]}>{t('onboarding.lifestyle.title')}</Text>
        <Text style={[styles.subtitle, { color: colors.mutedText }]}>{subtitle}</Text>
      </View>

      <AppCard style={styles.section}>
        <Text style={[styles.label, { color: colors.mutedText }]}>{t('onboarding.lifestyle.choose')}</Text>
        <View style={styles.chipsRow}>
          {GOALS.map((g) => (
            <AppChip
              key={g.key}
              label={g.key === 'lose' ? t('goal.lose') : g.key === 'maintain' ? t('goal.maintain') : t('goal.gain')}
              selected={nutritionGoal === g.key}
              onPress={() => {
                setNutritionGoal(g.key);
                if (goalError) setGoalError(null);
              }}
            />
          ))}
        </View>
        {goalError ? <Text style={[styles.errorText, { color: colors.danger }]}>{goalError}</Text> : null}
      </AppCard>

      <View style={styles.footer}>
        <AppButton variant="ghost" onPress={() => router.back()} accessibilityLabel={t('common.back')}>
          {t('common.back')}
        </AppButton>
        <AppButton
          onPress={() => {
            if (!nutritionGoal) {
              setGoalError(t('onboarding.lifestyle.errorGoal'));
              return;
            }
            patchProfile({ nutritionGoal });
            router.push('/onboarding/restrictions');
          }}
          accessibilityLabel={t('common.continue')}
        >
          {t('common.continue')}
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
  errorText: {
    marginTop: spacing.xs,
    fontSize: 12,
    fontWeight: '700',
  },
});

