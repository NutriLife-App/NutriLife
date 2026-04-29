import type { ReactNode } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

import { colors } from '@/constants/colors';

export function SectionTitle({ title, style, right }: { title: string; style?: TextStyle; right?: ReactNode }) {
  return (
    <Text style={[styles.title, style]}>
      {title}
      {right}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
});

