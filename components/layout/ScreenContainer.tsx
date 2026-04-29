import { PropsWithChildren, ReactNode } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';

import { spacing } from '@/constants/spacing';
import { useAppConfig } from '@/hooks/use-app-config';

export function ScreenContainer({
  children,
  header,
  contentStyle,
  scroll = true,
}: PropsWithChildren<{
  header?: ReactNode;
  contentStyle?: ViewStyle;
  scroll?: boolean;
}>) {
  const { colors } = useAppConfig();
  const inner = (
    <View style={[styles.inner, contentStyle]}>
      {header}
      {children}
    </View>
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      {scroll ? <ScrollView contentContainerStyle={styles.scroll}>{inner}</ScrollView> : inner}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  inner: {
    flexGrow: 1,
  },
});

