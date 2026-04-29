import { router } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppChip } from '@/components/ui/AppChip';
import { AppInput } from '@/components/ui/AppInput';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { mockPlanTiers } from '@/constants/mockData';
import { useNutriLifeState } from '@/app/_layout';
import type { Gender } from '@/types/user';

const GENDERS: Gender[] = ['female', 'male', 'other'];

export default function OnboardingAccountStep() {
  const { subscriptionPlan, profile, initProfileDraftFromSubscription, patchProfile } = useNutriLifeState();

  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('1995-06-12');
  const [gender, setGender] = useState<Gender>('other');

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
    return mockPlanTiers.find((t) => t.key === subscriptionPlan.planTier)?.label ?? subscriptionPlan.planTier;
  }, [subscriptionPlan]);

  if (!subscriptionPlan) {
    router.replace('/package-selection');
    return null;
  }

  if (!profile) {
    return (
      <ScreenContainer>
        <Text style={styles.loading}>Preparing your profile…</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.top}>
        <Text style={styles.step}>Step 1 / 5</Text>
        <Text style={styles.title}>Account basics</Text>
        <Text style={styles.subtitle}>
          {subscriptionPlan.packageType === 'individual' ? 'Individual' : 'Family'} • {planTierLabel}
        </Text>
      </View>

      <AppCard style={styles.section}>
        <AppInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          accessibilityLabel="Email input"
        />
      </AppCard>

      <AppCard style={styles.section}>
        <AppInput
          label="Date of birth"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          placeholder="YYYY-MM-DD"
          accessibilityLabel="Date of birth input"
        />
        <View style={{ height: spacing.md }} />
        <Text style={styles.label}>Gender</Text>
        <View style={styles.chipsRow}>
          {GENDERS.map((g) => (
            <AppChip key={g} label={g[0].toUpperCase() + g.slice(1)} selected={gender === g} onPress={() => setGender(g)} />
          ))}
        </View>
      </AppCard>

      <View style={styles.footer}>
        <AppButton
          onPress={() => {
            patchProfile({ email, dateOfBirth, gender });
            router.push('/onboarding/body');
          }}
          disabled={email.trim().length < 3}
          accessibilityLabel="Continue onboarding"
        >
          Continue
        </AppButton>
        <Text style={styles.hint}>This is used only to personalize your nutrition.</Text>
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
    color: colors.mutedText,
  },
  hint: {
    color: 'rgba(234,243,238,0.6)',
    fontSize: 12,
    lineHeight: 18,
  },
});

