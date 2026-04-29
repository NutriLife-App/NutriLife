import { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { spacing } from '@/constants/spacing';
import { useAppConfig } from '@/hooks/use-app-config';

export function AppCard({
  children,
  style,
  variant = 'default',
}: PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'elevated';
}>) {
  const { colors } = useAppConfig();
  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: variant === 'elevated' ? colors.cardElevated : colors.card,
          borderColor: colors.border,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 18,
    borderWidth: 1,
    padding: spacing.md,
  },
});

