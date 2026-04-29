import { router } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppChip } from '@/components/ui/AppChip';
import { AppInput } from '@/components/ui/AppInput';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { spacing } from '@/constants/spacing';
import { mockPlanTiers } from '@/constants/mockData';
import { useAppConfig } from '@/hooks/use-app-config';
import { useNutriLifeState } from '@/app/_layout';
import type { Gender } from '@/types/user';

const GENDERS: Gender[] = ['female', 'male', 'other'];

export default function OnboardingAccountStep() {
  const { colors, t } = useAppConfig();
  const { subscriptionPlan, profile, initProfileDraftFromSubscription, patchProfile } = useNutriLifeState();

  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('1995-06-12');
  const [gender, setGender] = useState<Gender>('other');
  const [emailError, setEmailError] = useState<string | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (!subscriptionPlan) return;
    initProfileDraftFromSubscription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionPlan?.packageType]);

  useEffect(() => {
    if (!profile) return;
    setEmail(profile.email);
    setDateOfBirth(profile.dateOfBirth);
    setGender(profile.gender);
  }, [profile]);

  const planTierLabel = useMemo(() => {
    if (!subscriptionPlan) return '';
    const tierKey = mockPlanTiers.find((it) => it.key === subscriptionPlan.planTier)?.key ?? subscriptionPlan.planTier;
    return tierKey === 'free' ? t('package.free') : tierKey === 'basic' ? t('package.basic') : t('package.premium');
  }, [subscriptionPlan, t]);

  if (!subscriptionPlan) {
    router.replace('/package-selection');
    return null;
  }

  if (!profile) {
    return (
      <ScreenContainer>
        <Text style={[styles.loading, { color: colors.mutedText }]}>{t('common.preparingProfile')}</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.top}>
        <Text style={[styles.step, { color: colors.accentWarm }]}>{t('onboarding.account.step')}</Text>
        <Text style={[styles.title, { color: colors.text }]}>{t('onboarding.account.title')}</Text>
        <Text style={[styles.subtitle, { color: colors.mutedText }]}>
          {(subscriptionPlan.packageType === 'individual' ? t('package.individual') : t('package.family'))} • {planTierLabel}
        </Text>
      </View>

      <AppCard style={styles.section}>
        <AppInput
          label={t('onboarding.account.email')}
          value={email}
          onChangeText={(val) => {
            setEmail(val);
            if (emailError) setEmailError(null);
          }}
          placeholder="you@example.com"
          keyboardType="email-address"
          accessibilityLabel={t('onboarding.account.email')}
        />
        {emailError ? <Text style={[styles.errorText, { color: colors.danger }]}>{emailError}</Text> : null}
      </AppCard>

      <AppCard style={styles.section}>
        <AppInput
          label={t('onboarding.account.dob')}
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          placeholder="YYYY-MM-DD"
          accessibilityLabel={t('onboarding.account.dob')}
        />
        <View style={{ height: spacing.md }} />
        <Text style={[styles.label, { color: colors.mutedText }]}>{t('onboarding.account.gender')}</Text>
        <View style={styles.chipsRow}>
          {GENDERS.map((g) => (
            <AppChip
              key={g}
              label={g === 'female' ? t('gender.female') : g === 'male' ? t('gender.male') : t('gender.other')}
              selected={gender === g}
              onPress={() => setGender(g)}
            />
          ))}
        </View>
      </AppCard>

      <View style={styles.footer}>
        <AppButton
          onPress={() => {
            if (!emailRegex.test(email.trim())) {
              setEmailError(t('onboarding.account.errorEmail'));
              return;
            }
            patchProfile({ email, dateOfBirth, gender });
            router.push('/onboarding/body');
          }}
          disabled={email.trim().length === 0}
          accessibilityLabel={t('common.continue')}
        >
          {t('common.continue')}
        </AppButton>
        <Text style={[styles.hint, { color: colors.mutedText }]}>{t('onboarding.account.hint')}</Text>
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
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  loading: {
    fontSize: 14,
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

