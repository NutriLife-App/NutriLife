import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export default function WelcomeScreen() {
  return (
    <ScreenContainer>
      <View style={styles.hero}>
        <Text style={styles.badge}>NutriLife</Text>
        <Text style={styles.title}>Personal nutrition, built for you</Text>
        <Text style={styles.subtitle}>
          Create meal plans based on your goals, dietary restrictions, budget, and what’s available nearby.
        </Text>
      </View>

      <AppCard style={styles.cardElevated} variant="elevated">
        <Text style={styles.cardTitle}>Start in ~2 minutes</Text>
        <Text style={styles.cardBody}>
          Choose a package, then answer a few onboarding questions to personalize your meal plan.
        </Text>

        <View style={{ height: spacing.md }} />

        <AppButton onPress={() => router.push('/package-selection')} accessibilityLabel="Choose your package">
          Choose your package
        </AppButton>
      </AppCard>

      <Text style={styles.finePrint}>
        MVP mode: all recommendations are mock data only (no backend, no AI generation).
      </Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create<any>({
  hero: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  badge: {
    color: colors.accent,
    fontWeight: '900',
    letterSpacing: 0.2,
    fontSize: 14,
  },
  title: {
    color: colors.text,
    fontWeight: '950',
    fontSize: 28,
    lineHeight: 34,
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
  },
  cardElevated: {
    borderRadius: 22,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 6,
  },
  cardBody: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
  },
  finePrint: {
    marginTop: spacing.sm,
    color: 'rgba(234,243,238,0.55)',
    fontSize: 12,
    lineHeight: 18,
  },
});

