import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppChip } from '@/components/ui/AppChip';
import { AppInput } from '@/components/ui/AppInput';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useNutriLifeState } from '@/app/_layout';
import type { ProgressEntry } from '@/types/progress';

function periodNowYYYYMM() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

export default function ProgressTabScreen() {
  const { progressEntries, addProgressEntry } = useNutriLifeState();
  const [periodView, setPeriodView] = useState<'month' | 'year'>('month');

  const [weightInput, setWeightInput] = useState('');

  const sorted = useMemo(() => [...progressEntries].sort((a, b) => a.period.localeCompare(b.period)), [progressEntries]);
  const current = sorted[sorted.length - 1];
  const first = sorted[0];

  const delta = current && first ? current.weightKg - first.weightKg : 0;

  const chartEntries = useMemo(() => {
    if (periodView === 'year') {
      // For MVP: keep it simple and show the same data as a placeholder.
      return sorted.slice(-4);
    }
    return sorted.slice(-4);
  }, [periodView, sorted]);

  const minW = Math.min(...chartEntries.map((e) => e.weightKg));
  const maxW = Math.max(...chartEntries.map((e) => e.weightKg));

  const range = Math.max(0.001, maxW - minW);

  return (
    <ScreenContainer>
      <View style={styles.top}>
        <Text style={styles.title}>Progress</Text>
        <Text style={styles.subtitle}>Manual entries and a lightweight chart placeholder.</Text>
      </View>

      <AppCard variant="elevated" style={styles.emphasisCard}>
        <Text style={styles.emphasisLabel}>{current ? 'Current weight' : 'No entries yet'}</Text>
        <Text style={styles.emphasisValue}>{current ? `${current.weightKg.toFixed(1)} kg` : '--'}</Text>
        <Text style={[styles.delta, delta < 0 ? styles.deltaGood : styles.deltaNeutral]}>
          {first && current ? `${delta < 0 ? '' : '+'}${delta.toFixed(1)} kg vs start` : ''}
        </Text>
      </AppCard>

      <AppCard style={styles.section} variant="elevated">
        <Text style={styles.sectionTitle}>Manual weight entry</Text>
        <AppInput
          label="Weight (kg)"
          value={weightInput}
          onChangeText={setWeightInput}
          placeholder="e.g. 74.8"
          keyboardType="decimal-pad"
          accessibilityLabel="Weight input"
        />
        <View style={{ height: spacing.sm }} />
        <AppButton
          disabled={Number.isFinite(Number(weightInput)) ? false : true}
          onPress={() => {
            const weightKg = Number(weightInput);
            if (!Number.isFinite(weightKg)) return;

            const period = periodNowYYYYMM();
            const id = `p-${period}`;
            const entry: ProgressEntry = { id, period, weightKg };
            addProgressEntry(entry);
            setWeightInput('');
          }}>
          Add entry
        </AppButton>
      </AppCard>

      <AppCard style={styles.section} variant="elevated">
        <Text style={styles.sectionTitle}>Chart</Text>
        <View style={styles.chipsRow}>
          <AppChip label="Month" selected={periodView === 'month'} onPress={() => setPeriodView('month')} />
          <AppChip label="Year" selected={periodView === 'year'} onPress={() => setPeriodView('year')} />
        </View>

        <View style={styles.chart}>
          {chartEntries.map((e) => {
            const normalized = (e.weightKg - minW) / range; // 0..1
            const height = 60 * normalized + 20; // 20..80
            return (
              <View key={e.id} style={styles.barWrap}>
                <View style={[styles.bar, { height }]} />
                <Text style={styles.barLabel} numberOfLines={1}>
                  {e.period.slice(5)}
                </Text>
              </View>
            );
          })}
        </View>
        <Text style={styles.chartHint}>Simple bar chart placeholder (mock data).</Text>
      </AppCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create<any>({
  top: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text,
    fontWeight: '950',
    fontSize: 26,
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 13,
    lineHeight: 18,
  },
  emphasisCard: {
    borderRadius: 22,
    marginBottom: spacing.md,
  },
  emphasisLabel: {
    color: colors.mutedText,
    fontWeight: '900',
    fontSize: 13,
  },
  emphasisValue: {
    color: colors.text,
    fontWeight: '950',
    fontSize: 34,
    marginTop: 4,
  },
  delta: {
    marginTop: 6,
    fontWeight: '900',
    fontSize: 13,
  },
  deltaGood: {
    color: colors.success,
  },
  deltaNeutral: {
    color: 'rgba(234,243,238,0.7)',
  },
  section: {
    borderRadius: 22,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: '950',
    fontSize: 16,
    marginBottom: spacing.sm,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 140,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.surface,
  },
  barWrap: {
    width: 24,
    alignItems: 'center',
    gap: 8,
  },
  bar: {
    width: 14,
    borderRadius: 999,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  barLabel: {
    color: 'rgba(234,243,238,0.65)',
    fontSize: 11,
    fontWeight: '900',
  },
  chartHint: {
    color: 'rgba(234,243,238,0.65)',
    fontSize: 12,
    marginTop: spacing.sm,
    lineHeight: 16,
  },
});

