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
import type { DietaryRestriction } from '@/types/user';

const RESTRICTIONS: { key: DietaryRestriction; label: string }[] = [
  { key: 'lactose', label: 'Lactose intolerance' },
  { key: 'gluten', label: 'Gluten intolerance / celiac' },
  { key: 'allergens', label: 'Allergens' },
  { key: 'vegetarian', label: 'Vegetarian' },
];

export default function OnboardingRestrictionsStep() {
  const { profile, patchProfile } = useNutriLifeState();

  const [dietaryRestrictions, setDietaryRestrictions] = useState<DietaryRestriction[]>([]);
  const [geolocation, setGeolocation] = useState('City center (placeholder)');

  useEffect(() => {
    if (!profile) return;
    setDietaryRestrictions(profile.dietaryRestrictions);
    setGeolocation(profile.geolocation);
  }, [profile]);

  if (!profile) {
    router.replace('/onboarding/account');
    return null;
  }

  const toggleRestriction = (key: DietaryRestriction) => {
    setDietaryRestrictions((prev) => (prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]));
  };

  return (
    <ScreenContainer>
      <View style={styles.top}>
        <Text style={styles.step}>Step 4 / 5</Text>
        <Text style={styles.title}>Dietary restrictions</Text>
        <Text style={styles.subtitle}>Choose what to avoid; we’ll steer recipes accordingly (mock).</Text>
      </View>

      <AppCard style={styles.section}>
        <Text style={styles.label}>Restrictions</Text>
        <View style={styles.chipsRow}>
          {RESTRICTIONS.map((r) => (
            <AppChip
              key={r.key}
              label={r.label}
              selected={dietaryRestrictions.includes(r.key)}
              onPress={() => toggleRestriction(r.key)}
            />
          ))}
        </View>
      </AppCard>

      <AppCard style={styles.section}>
        <AppInput
          label="Geolocation"
          value={geolocation}
          onChangeText={setGeolocation}
          placeholder="City, Country (placeholder)"
          accessibilityLabel="Geolocation input"
          rightHint="Local availability mock"
        />
        <Text style={styles.geoHint}>This is a placeholder only; no GPS or API calls are used in MVP mode.</Text>
      </AppCard>

      <View style={styles.footer}>
        <AppButton
          onPress={() => {
            patchProfile({ dietaryRestrictions, geolocation });
            router.push('/onboarding/budget');
          }}
          accessibilityLabel="Continue to budget"
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
  geoHint: {
    marginTop: spacing.sm,
    color: 'rgba(234,243,238,0.6)',
    fontSize: 12,
    lineHeight: 18,
  },
  footer: {
    marginTop: spacing.lg,
  },
});

