import type { ReactNode } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

import { useAppConfig } from '@/hooks/use-app-config';

export function SectionTitle({ title, style, right }: { title: string; style?: TextStyle; right?: ReactNode }) {
  const { colors } = useAppConfig();
  return (
    <Text style={[styles.title, { color: colors.text }, style]}>
      {title}
      {right}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
});

