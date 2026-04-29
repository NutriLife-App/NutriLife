import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppChip } from '@/components/ui/AppChip';
import { AppInput } from '@/components/ui/AppInput';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { spacing } from '@/constants/spacing';
import { useAppConfig } from '@/hooks/use-app-config';
import { useNutriLifeState } from '@/app/_layout';
import type { PhysicalActivityLevel } from '@/types/user';

const ACTIVITY_LEVELS: PhysicalActivityLevel[] = ['low', 'medium', 'high'];

export default function OnboardingBodyStep() {
  const { colors, t } = useAppConfig();
  const { profile, patchProfile } = useNutriLifeState();

  const [heightCm, setHeightCm] = useState('172');
  const [weightKg, setWeightKg] = useState('76');
  const [activityLevel, setActivityLevel] = useState<PhysicalActivityLevel | null>(null);
  const [heightError, setHeightError] = useState<string | null>(null);
  const [weightError, setWeightError] = useState<string | null>(null);
  const [activityError, setActivityError] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) return;
    setHeightCm(String(profile.heightCm));
    setWeightKg(String(profile.currentWeightKg));
    setActivityLevel(profile.activityLevel);
  }, [profile]);

  if (!profile) {
    router.replace('/onboarding/account');
    return null;
  }

  return (
    <ScreenContainer>
      <View style={styles.top}>
        <Text style={[styles.step, { color: colors.accentWarm }]}>{t('onboarding.body.step')}</Text>
        <Text style={[styles.title, { color: colors.text }]}>{t('onboarding.body.title')}</Text>
        <Text style={[styles.subtitle, { color: colors.mutedText }]}>{t('onboarding.body.subtitle')}</Text>
      </View>

      <AppCard style={styles.section}>
        <AppInput
          label={t('onboarding.body.height')}
          value={heightCm}
          onChangeText={(val) => {
            setHeightCm(val);
            if (heightError) setHeightError(null);
          }}
          placeholder="170"
          keyboardType="numeric"
          accessibilityLabel={t('onboarding.body.height')}
        />
        {heightError ? <Text style={[styles.errorText, { color: colors.danger }]}>{heightError}</Text> : null}
      </AppCard>

      <AppCard style={styles.section}>
        <AppInput
          label={t('onboarding.body.weight')}
          value={weightKg}
          onChangeText={(val) => {
            setWeightKg(val);
            if (weightError) setWeightError(null);
          }}
          placeholder="70"
          keyboardType="decimal-pad"
          accessibilityLabel={t('onboarding.body.weight')}
        />
        {weightError ? <Text style={[styles.errorText, { color: colors.danger }]}>{weightError}</Text> : null}

        <View style={{ height: spacing.md }} />

        <Text style={[styles.label, { color: colors.mutedText }]}>{t('onboarding.body.activity')}</Text>
        <View style={styles.chipsRow}>
          {ACTIVITY_LEVELS.map((lvl) => (
            <AppChip
              key={lvl}
              label={lvl === 'low' ? t('activity.low') : lvl === 'medium' ? t('activity.medium') : t('activity.high')}
              selected={activityLevel === lvl}
              onPress={() => {
                setActivityLevel(lvl);
                if (activityError) setActivityError(null);
              }}
            />
          ))}
        </View>
        {activityError ? <Text style={[styles.errorText, { color: colors.danger }]}>{activityError}</Text> : null}
      </AppCard>

      <View style={styles.footer}>
        <AppButton variant="ghost" onPress={() => router.back()} accessibilityLabel={t('common.back')}>
          {t('common.back')}
        </AppButton>
        <AppButton
          onPress={() => {
            const height = Number(heightCm);
            const weight = Number(weightKg);
            const nextHeightError = !Number.isFinite(height) || height <= 0 ? t('onboarding.body.errorHeight') : null;
            const nextWeightError = !Number.isFinite(weight) || weight <= 0 ? t('onboarding.body.errorWeight') : null;
            const nextActivityError = !activityLevel ? t('onboarding.body.errorActivity') : null;

            setHeightError(nextHeightError);
            setWeightError(nextWeightError);
            setActivityError(nextActivityError);

            if (nextHeightError || nextWeightError || nextActivityError) return;

            patchProfile({
              heightCm: height,
              currentWeightKg: weight,
              activityLevel: activityLevel!,
            });
            router.push('/onboarding/lifestyle');
          }}
          disabled={heightCm.trim().length === 0 || weightKg.trim().length === 0}
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
    marginBottom: spacing.xs,
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

