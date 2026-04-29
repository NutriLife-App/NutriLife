import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppChip } from '@/components/ui/AppChip';
import { AppInput } from '@/components/ui/AppInput';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useNutriLifeState } from '@/app/_layout';
import type { PhysicalActivityLevel } from '@/types/user';

const ACTIVITY_LEVELS: PhysicalActivityLevel[] = ['low', 'medium', 'high'];

export default function OnboardingBodyStep() {
  const { profile, patchProfile } = useNutriLifeState();

  const [heightCm, setHeightCm] = useState('172');
  const [weightKg, setWeightKg] = useState('76');
  const [activityLevel, setActivityLevel] = useState<PhysicalActivityLevel>('medium');

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
        <Text style={styles.step}>Step 2 / 5</Text>
        <Text style={styles.title}>Body & activity</Text>
        <Text style={styles.subtitle}>We use this to shape portions and macro balance.</Text>
      </View>

      <AppCard style={styles.section}>
        <AppInput
          label="Height (cm)"
          value={heightCm}
          onChangeText={setHeightCm}
          placeholder="170"
          keyboardType="numeric"
          accessibilityLabel="Height input"
        />
      </AppCard>

      <AppCard style={styles.section}>
        <AppInput
          label="Current weight (kg)"
          value={weightKg}
          onChangeText={setWeightKg}
          placeholder="70"
          keyboardType="decimal-pad"
          accessibilityLabel="Weight input"
        />

        <View style={{ height: spacing.md }} />

        <Text style={styles.label}>Physical activity level</Text>
        <View style={styles.chipsRow}>
          {ACTIVITY_LEVELS.map((lvl) => (
            <AppChip
              key={lvl}
              label={lvl[0].toUpperCase() + lvl.slice(1)}
              selected={activityLevel === lvl}
              onPress={() => setActivityLevel(lvl)}
            />
          ))}
        </View>
      </AppCard>

      <View style={styles.footer}>
        <AppButton
          onPress={() => {
            const height = Number(heightCm);
            const weight = Number(weightKg);
            patchProfile({
              heightCm: Number.isFinite(height) ? height : profile.heightCm,
              currentWeightKg: Number.isFinite(weight) ? weight : profile.currentWeightKg,
              activityLevel,
            });
            router.push('/onboarding/lifestyle');
          }}
          disabled={heightCm.trim().length === 0 || weightKg.trim().length === 0}
          accessibilityLabel="Continue to lifestyle"
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
    marginBottom: spacing.xs,
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

