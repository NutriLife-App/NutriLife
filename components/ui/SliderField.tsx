import { useMemo, useRef, useState } from 'react';
import { PanResponder, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { colors } from '@/constants/colors';

const THUMB_SIZE = 28;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function roundToStep(value: number, step: number) {
  return Math.round(value / step) * step;
}

export function SliderField({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  disabled,
  style,
  onChange,
  accessibilityLabel,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
  style?: ViewStyle;
  onChange: (value: number) => void;
  accessibilityLabel?: string;
}) {
  const [trackWidth, setTrackWidth] = useState(1);
  const startValueRef = useRef(value);

  const ratio = (value - min) / Math.max(0.0001, max - min);
  const clampedRatio = clamp(ratio, 0, 1);
  const thumbLeft = clampedRatio * trackWidth;

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: () => {
          startValueRef.current = value;
        },
        onPanResponderMove: (_, gesture) => {
          if (disabled) return;
          const range = max - min;
          const deltaRatio = gesture.dx / Math.max(1, trackWidth);
          const next = startValueRef.current + deltaRatio * range;
          const stepped = roundToStep(next, step);
          const clamped = clamp(stepped, min, max);
          onChange(clamped);
        },
      }),
    [disabled, max, min, onChange, step, trackWidth, value],
  );

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>

      <View
        accessibilityRole="adjustable"
        accessibilityLabel={accessibilityLabel ?? label}
        onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
        style={[styles.track, disabled ? styles.trackDisabled : null]}
        {...panResponder.panHandlers}>
        <View style={[styles.fill, { width: thumbLeft }]} />
        <View
          style={[
            styles.thumb,
            {
              left: thumbLeft - THUMB_SIZE / 2,
              opacity: disabled ? 0.55 : 1,
            },
          ]}
        />
      </View>

      <Text style={styles.valueText}>
        {value}
        {unit ? ` ${unit}` : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: '700',
  },
  track: {
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  trackDisabled: {
    opacity: 0.6,
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.accentSoft,
  },
  thumb: {
    position: 'absolute',
    top: 6,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 999,
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.accentWarmSoft,
  },
  valueText: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 14,
  },
});

