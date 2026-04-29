import { PropsWithChildren } from 'react';
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

import { spacing } from '@/constants/spacing';
import { useAppConfig } from '@/hooks/use-app-config';

export function AppButton({
  children,
  onPress,
  disabled,
  variant = 'primary',
  style,
  textStyle,
  accessibilityLabel,
}: PropsWithChildren<{
  onPress?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
}>) {
  const { colors } = useAppConfig();
  const isDisabled = !!disabled;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={!isDisabled ? onPress : undefined}
      style={({ pressed }) => [
        styles.base,
        {
          borderColor: colors.border,
        },
        variant === 'primary' ? { backgroundColor: colors.accentSoft, borderColor: colors.accent } : null,
        variant === 'secondary' ? { backgroundColor: colors.cardElevated } : null,
        variant === 'ghost' ? styles.ghost : null,
        isDisabled ? styles.disabled : null,
        pressed && !isDisabled ? styles.pressed : null,
        style,
      ]}>
      <Text style={[styles.text, { color: colors.text }, textStyle]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  text: {
    fontWeight: '700',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
});

