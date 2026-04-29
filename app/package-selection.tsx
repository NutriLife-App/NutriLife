import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppChip } from '@/components/ui/AppChip';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { mockPackageTypes, mockPlanTiers } from '@/constants/mockData';
import { useNutriLifeState } from '@/app/_layout';
import type { PackageType, PlanTier } from '@/types/subscription';

export default function PackageSelectionScreen() {
  const { subscriptionPlan, selectSubscriptionPlan } = useNutriLifeState();

  const [packageType, setPackageType] = useState<PackageType>(subscriptionPlan?.packageType ?? 'individual');
  const [planTier, setPlanTier] = useState<PlanTier>(subscriptionPlan?.planTier ?? 'free');

  const selectedTier = useMemo(() => mockPlanTiers.find((t) => t.key === planTier), [planTier]);

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.badge}>Package Selection</Text>
        <Text style={styles.title}>Pick what fits your life</Text>
        <Text style={styles.subtitle}>Premium is visible but locked for this MVP.</Text>
      </View>

      <AppCard style={styles.section} variant="elevated">
        <Text style={styles.sectionTitle}>Package type</Text>
        <View style={styles.chipsRow}>
          {mockPackageTypes.map((p) => (
            <AppChip
              key={p.key}
              label={p.label}
              selected={packageType === p.key}
              onPress={() => setPackageType(p.key)}
            />
          ))}
        </View>
      </AppCard>

      <AppCard style={styles.section} variant="elevated">
        <Text style={styles.sectionTitle}>Plan tier</Text>
        <View style={styles.chipsRow}>
          {mockPlanTiers.map((tier) => (
            <View key={tier.key} style={{ gap: spacing.xs }}>
              <AppChip
                label={`${tier.label}${tier.badge ? ` • ${tier.badge}` : ''}`}
                selected={planTier === tier.key}
                disabled={tier.disabled}
                onPress={() => setPlanTier(tier.key)}
              />
              {tier.disabled ? (
                <Text style={styles.disabledHint}>Coming later</Text>
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
          accessibilityLabel="Continue to onboarding"
        >
          Continue
        </AppButton>
        <Text style={styles.summary}>
          Selected: {packageType === 'individual' ? 'Individual' : 'Family'} • {selectedTier?.label}
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
    color: colors.accentWarm,
    fontWeight: '900',
    letterSpacing: 0.2,
    fontSize: 13,
  },
  title: {
    color: colors.text,
    fontWeight: '950',
    fontSize: 26,
    lineHeight: 32,
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
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
    color: 'rgba(234,243,238,0.6)',
    fontSize: 11,
    textAlign: 'center',
    marginTop: -6,
  },
  footer: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  summary: {
    color: colors.mutedText,
    fontSize: 13,
    textAlign: 'center',
  },
});

