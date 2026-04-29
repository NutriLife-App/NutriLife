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
import type { DietaryRestriction } from '@/types/user';

const RESTRICTIONS: { key: DietaryRestriction; label: string }[] = [
  { key: 'lactose', label: 'Lactose intolerance' },
  { key: 'gluten', label: 'Gluten intolerance / celiac' },
  { key: 'allergens', label: 'Allergens' },
  { key: 'vegetarian', label: 'Vegetarian' },
];

export default function OnboardingRestrictionsStep() {
  const { colors, t } = useAppConfig();
  const { profile, patchProfile } = useNutriLifeState();

  const [dietaryRestrictions, setDietaryRestrictions] = useState<DietaryRestriction[]>([]);
  const [geolocation, setGeolocation] = useState(t('onboarding.restrictions.geoPlaceholder'));

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
        <Text style={[styles.step, { color: colors.accentWarm }]}>{t('onboarding.restrictions.step')}</Text>
        <Text style={[styles.title, { color: colors.text }]}>{t('onboarding.restrictions.title')}</Text>
        <Text style={[styles.subtitle, { color: colors.mutedText }]}>{t('onboarding.restrictions.subtitle')}</Text>
      </View>

      <AppCard style={styles.section}>
        <Text style={[styles.label, { color: colors.mutedText }]}>{t('onboarding.restrictions.label')}</Text>
        <View style={styles.chipsRow}>
          {RESTRICTIONS.map((r) => (
            <AppChip
              key={r.key}
              label={
                r.key === 'lactose'
                  ? t('restriction.lactose')
                  : r.key === 'gluten'
                    ? t('restriction.gluten')
                    : r.key === 'allergens'
                      ? t('restriction.allergens')
                      : t('restriction.vegetarian')
              }
              selected={dietaryRestrictions.includes(r.key)}
              onPress={() => toggleRestriction(r.key)}
            />
          ))}
        </View>
      </AppCard>

      <AppCard style={styles.section}>
        <AppInput
          label={t('onboarding.restrictions.geo')}
          value={geolocation}
          onChangeText={setGeolocation}
          placeholder={t('onboarding.restrictions.geoPlaceholder')}
          accessibilityLabel={t('onboarding.restrictions.geo')}
          rightHint={t('local.availability.mock')}
        />
        <Text style={[styles.geoHint, { color: colors.mutedText }]}>{t('onboarding.restrictions.geoHint')}</Text>
      </AppCard>

      <View style={styles.footer}>
        <AppButton variant="ghost" onPress={() => router.back()} accessibilityLabel={t('common.back')}>
          {t('common.back')}
        </AppButton>
        <AppButton
          onPress={() => {
            patchProfile({ dietaryRestrictions, geolocation });
            router.push('/onboarding/budget');
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
  geoHint: {
    marginTop: spacing.sm,
    fontSize: 12,
    lineHeight: 18,
  },
  footer: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
});

