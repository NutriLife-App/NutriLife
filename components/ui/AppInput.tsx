import { useId, useMemo } from 'react';
import { KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export function AppInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  secureTextEntry,
  disabled,
  style,
  inputStyle,
  rightHint,
  accessibilityLabel,
}: {
  label?: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  rightHint?: string;
  accessibilityLabel?: string;
}) {
  const reactId = useId();

  const containerStyles = useMemo(() => [styles.container, disabled ? styles.disabled : null, style], [disabled, style]);

  return (
    <View style={containerStyles}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.row}>
        <TextInput
          accessibilityLabel={accessibilityLabel ?? reactId}
          placeholder={placeholder}
          placeholderTextColor={colors.mutedText}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          editable={!disabled}
          style={[styles.input, inputStyle]}
        />
        {rightHint ? <Text style={styles.hint}>{rightHint}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  label: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    minHeight: 48,
    backgroundColor: colors.surface,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.text,
    paddingVertical: 0,
    fontSize: 16,
  },
  hint: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.6,
  },
});

