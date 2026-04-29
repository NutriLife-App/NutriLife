import { router } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { spacing } from '@/constants/spacing';
import { useAppConfig } from '@/hooks/use-app-config';

export default function WelcomeScreen() {
  const { colors, t } = useAppConfig();

  return (
    <ScreenContainer>
      <View style={styles.hero}>
        <Text style={[styles.badge, { color: colors.accent }]}>{t('welcome.badge')}</Text>
        <Text style={[styles.title, { color: colors.text }]}>{t('welcome.title')}</Text>
        <Text style={[styles.subtitle, { color: colors.mutedText }]}>{t('welcome.subtitle')}</Text>
      </View>

      <AppCard style={styles.cardElevated} variant="elevated">
        <Text style={[styles.cardTitle, { color: colors.text }]}>{t('welcome.cardTitle')}</Text>
        <Text style={[styles.cardBody, { color: colors.mutedText }]}>{t('welcome.cardBody')}</Text>

        <View style={{ height: spacing.md }} />

        <AppButton onPress={() => router.push('/package-selection')} accessibilityLabel={t('welcome.ctaStart')}>
          {t('welcome.ctaStart')}
        </AppButton>

        <View style={{ height: spacing.sm }} />
        <AppButton
          variant="ghost"
          onPress={() => Alert.alert('NutriLife', t('common.signInPlaceholder'))}
          accessibilityLabel={t('welcome.ctaSignIn')}>
          {t('welcome.ctaSignIn')}
        </AppButton>
      </AppCard>

      <Text style={[styles.finePrint, { color: colors.mutedText }]}>{t('welcome.finePrint')}</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create<any>({
  hero: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  badge: {
    fontWeight: '900',
    letterSpacing: 0.2,
    fontSize: 14,
  },
  title: {
    fontWeight: '950',
    fontSize: 28,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  cardElevated: {
    borderRadius: 22,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 6,
  },
  cardBody: {
    fontSize: 14,
    lineHeight: 20,
  },
  finePrint: {
    marginTop: spacing.sm,
    fontSize: 12,
    lineHeight: 18,
  },
});

