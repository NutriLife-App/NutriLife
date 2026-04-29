import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppCard } from '@/components/ui/AppCard';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { mockGroceryCategories } from '@/constants/mockData';
import { useNutriLifeState } from '@/app/_layout';
import type { GroceryItem } from '@/types/grocery';

function formatMoney(amount: number) {
  return `$${amount.toFixed(2)}`;
}

export default function GroceriesTabScreen() {
  const { groceryItems, setGroceryPurchased } = useNutriLifeState();

  const itemsByCategory = useMemo(() => {
    return mockGroceryCategories.map((cat) => ({
      key: cat.key,
      label: cat.label,
      items: groceryItems.filter((it) => it.categoryKey === cat.key),
    }));
  }, [groceryItems]);

  const totalEstimatedCost = useMemo(
    () => groceryItems.reduce((acc, it) => acc + (Number.isFinite(it.estimatedPrice) ? it.estimatedPrice : 0), 0),
    [groceryItems],
  );

  return (
    <ScreenContainer>
      <View style={styles.top}>
        <Text style={styles.title}>Grocery list</Text>
        <Text style={styles.subtitle}>Mock items grouped by category (local availability placeholder).</Text>
      </View>

      <AppCard variant="elevated" style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Estimated total</Text>
        <Text style={styles.summaryValue}>{formatMoney(totalEstimatedCost)}</Text>
        <Text style={styles.summaryHint}>Tip: check items as you shop.</Text>
      </AppCard>

      {itemsByCategory.map((cat) => (
        <AppCard key={cat.key} style={styles.section} variant="elevated">
          <Text style={styles.sectionTitle}>{cat.label}</Text>
          <View style={styles.items}>
            {cat.items.map((it) => (
              <GroceryRow
                key={it.id}
                item={it}
                onToggle={() => setGroceryPurchased(it.id, !it.purchased)}
              />
            ))}
          </View>
        </AppCard>
      ))}
    </ScreenContainer>
  );
}

function GroceryRow({ item, onToggle }: { item: GroceryItem; onToggle: () => void }) {
  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => [styles.row, pressed ? { opacity: 0.9 } : null]}>
      <View style={[styles.checkbox, item.purchased ? styles.checkboxChecked : null]}>
        {item.purchased ? <Text style={styles.checkboxTick}>✓</Text> : null}
      </View>

      <View style={{ flex: 1, gap: 4 }}>
        <Text style={[styles.name, item.purchased ? styles.nameMuted : null]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.meta}>
          {formatMoney(item.estimatedPrice)} • {item.cheapestOfferLabel}
        </Text>
      </View>
    </Pressable>
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
  summaryCard: {
    borderRadius: 22,
    marginBottom: spacing.lg,
  },
  summaryTitle: {
    color: colors.mutedText,
    fontWeight: '900',
    fontSize: 13,
  },
  summaryValue: {
    color: colors.text,
    fontWeight: '950',
    fontSize: 28,
    marginTop: 6,
  },
  summaryHint: {
    color: 'rgba(234,243,238,0.6)',
    marginTop: 4,
    fontSize: 12,
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
  items: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: spacing.sm,
    backgroundColor: colors.surface,
    minHeight: 56,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  checkboxChecked: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  checkboxTick: {
    color: colors.accent,
    fontWeight: '950',
    fontSize: 15,
    marginTop: -1,
  },
  name: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 14,
  },
  nameMuted: {
    color: 'rgba(234,243,238,0.6)',
    textDecorationLine: 'line-through',
  },
  meta: {
    color: colors.mutedText,
    fontWeight: '800',
    fontSize: 12,
    lineHeight: 16,
  },
});

