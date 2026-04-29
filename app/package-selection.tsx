import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppChip } from '@/components/ui/AppChip';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { spacing } from '@/constants/spacing';
import { mockPackageTypes, mockPlanTiers } from '@/constants/mockData';
import { useAppConfig } from '@/hooks/use-app-config';
import { useNutriLifeState } from '@/app/_layout';
import type { PackageType, PlanTier } from '@/types/subscription';

export default function PackageSelectionScreen() {
  const { colors, t } = useAppConfig();
  const { subscriptionPlan, selectSubscriptionPlan } = useNutriLifeState();

  const [packageType, setPackageType] = useState<PackageType>(subscriptionPlan?.packageType ?? 'individual');
  const [planTier, setPlanTier] = useState<PlanTier>(subscriptionPlan?.planTier ?? 'free');

  const selectedTier = useMemo(() => mockPlanTiers.find((t) => t.key === planTier), [planTier]);

  const packageTypeLabel = (value: PackageType) =>
    value === 'individual' ? t('package.individual') : t('package.family');
  const planTierLabel = (value: PlanTier) =>
    value === 'free' ? t('package.free') : value === 'basic' ? t('package.basic') : t('package.premium');

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={[styles.badge, { color: colors.accentWarm }]}>{t('package.badge')}</Text>
        <Text style={[styles.title, { color: colors.text }]}>{t('package.title')}</Text>
        <Text style={[styles.subtitle, { color: colors.mutedText }]}>{t('package.subtitle')}</Text>
      </View>

      <AppCard style={styles.section} variant="elevated">
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('package.packageType')}</Text>
        <View style={styles.chipsRow}>
          {mockPackageTypes.map((p) => (
            <AppChip
              key={p.key}
              label={packageTypeLabel(p.key)}
              selected={packageType === p.key}
              onPress={() => setPackageType(p.key)}
            />
          ))}
        </View>
      </AppCard>

      <AppCard style={styles.section} variant="elevated">
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('package.planTier')}</Text>
        <View style={styles.chipsRow}>
          {mockPlanTiers.map((tier) => (
            <View key={tier.key} style={{ gap: spacing.xs }}>
              <AppChip
                label={`${planTierLabel(tier.key)}${tier.badge ? ` • ${t('package.comingLater')}` : ''}`}
                selected={planTier === tier.key}
                disabled={tier.disabled}
                onPress={() => setPlanTier(tier.key)}
              />
              {tier.disabled ? (
                <Text style={[styles.disabledHint, { color: colors.mutedText }]}>{t('package.comingLater')}</Text>
              ) : null}
            </View>
          ))}
        </View>
      </AppCard>

      <View style={styles.footer}>
        <AppButton
          onPress={() => {
            selectSubscriptionPlan({ packageType, planTier });
            router.push('/onboarding/account');
          }}
          accessibilityLabel={t('package.continue')}
        >
          {t('package.continue')}
        </AppButton>
        <Text style={[styles.summary, { color: colors.mutedText }]}>
          {t('package.selected')}: {packageTypeLabel(packageType)} •{' '}
          {selectedTier ? planTierLabel(selectedTier.key) : planTierLabel(planTier)}
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create<any>({
  header: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  badge: {
    fontWeight: '900',
    letterSpacing: 0.2,
    fontSize: 13,
  },
  title: {
    fontWeight: '950',
    fontSize: 26,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: spacing.sm,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  disabledHint: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: -6,
  },
  footer: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  summary: {
    fontSize: 13,
    textAlign: 'center',
  },
});

