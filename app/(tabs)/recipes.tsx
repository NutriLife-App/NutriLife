import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppCard } from '@/components/ui/AppCard';
import { AppChip } from '@/components/ui/AppChip';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { mockRecipes } from '@/constants/mockData';
import type { Recipe } from '@/types/recipe';

const PHOTO_PLACEHOLDER_TEXT = 'Photo';

export default function RecipesTabScreen() {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(mockRecipes[0]?.id ?? '');

  const selectedRecipe = useMemo<Recipe | undefined>(
    () => mockRecipes.find((r) => r.id === selectedRecipeId),
    [selectedRecipeId],
  );

  return (
    <ScreenContainer>
      <View style={styles.top}>
        <Text style={styles.title}>Recipes</Text>
        <Text style={styles.subtitle}>Mock recipes tuned to your goal & restrictions.</Text>
      </View>

      <Text style={styles.sectionLabel}>Recipe list</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listRow}>
        {mockRecipes.map((r) => (
          <Pressable
            key={r.id}
            onPress={() => setSelectedRecipeId(r.id)}
            style={({ pressed }) => [
              styles.recipePill,
              selectedRecipeId === r.id ? styles.recipePillSelected : null,
              pressed ? { opacity: 0.85 } : null,
            ]}>
            <Text style={styles.recipePillTitle} numberOfLines={2}>
              {r.title}
            </Text>
            <Text style={styles.recipePillMeta}>{r.tags[0] ?? 'Recipe'}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={styles.sectionLabel}>Details</Text>
      {selectedRecipe ? (
        <AppCard variant="elevated" style={styles.detailsCard}>
          <View style={styles.detailsHeader}>
            <View style={styles.photo} accessibilityLabel="Recipe photo placeholder">
              <Text style={styles.photoText}>{PHOTO_PLACEHOLDER_TEXT}</Text>
            </View>

            <View style={{ flex: 1, gap: spacing.xs }}>
              <Text style={styles.detailsTitle}>{selectedRecipe.title}</Text>
              <View style={styles.tagsRow}>
                {selectedRecipe.tags.map((t) => (
                  <AppChip key={t} label={t} selected={false} />
                ))}
              </View>
            </View>
          </View>

          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>Ingredients</Text>
            {selectedRecipe.ingredients.map((ing) => (
              <Text key={ing} style={styles.bullet}>
                • {ing}
              </Text>
            ))}
          </View>

          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>Nutrition</Text>
            <NutritionGrid nutrition={selectedRecipe.nutrition} />
          </View>

          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>Instructions</Text>
            {selectedRecipe.instructions?.length ? (
              selectedRecipe.instructions.map((step) => (
                <Text key={step} style={styles.instruction}>
                  {step}
                </Text>
              ))
            ) : (
              <Text style={styles.muted}>Instructions coming later (mock).</Text>
            )}
          </View>
        </AppCard>
      ) : (
        <AppCard style={styles.detailsCard}>
          <Text style={styles.muted}>Select a recipe to view details.</Text>
        </AppCard>
      )}
    </ScreenContainer>
  );
}

function NutritionGrid({ nutrition }: { nutrition: Recipe['nutrition'] }) {
  return (
    <View style={styles.nutritionGrid}>
      <Metric label="Calories" value={`${nutrition.calories}`} unit="kcal" />
      <Metric label="Protein" value={`${nutrition.protein}`} unit="g" />
      <Metric label="Fat" value={`${nutrition.fat}`} unit="g" />
      <Metric label="Carbs" value={`${nutrition.carbs}`} unit="g" />
      <Metric label="Fiber" value={`${nutrition.fiber}`} unit="g" />
    </View>
  );
}

function Metric({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>
        {value} {unit}
      </Text>
    </View>
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
    marginBottom: 2,
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 13,
    lineHeight: 18,
  },
  sectionLabel: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    color: colors.mutedText,
    fontWeight: '900',
    fontSize: 13,
  },
  listRow: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  recipePill: {
    width: 220,
    borderRadius: 18,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    gap: spacing.xs,
  },
  recipePillSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  recipePillTitle: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 14,
  },
  recipePillMeta: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: '800',
  },
  detailsCard: {
    borderRadius: 22,
  },
  detailsHeader: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  photo: {
    width: 110,
    height: 110,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoText: {
    color: 'rgba(234,243,238,0.6)',
    fontWeight: '900',
  },
  detailsTitle: {
    color: colors.text,
    fontWeight: '950',
    fontSize: 18,
    marginBottom: spacing.xs,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  subsection: {
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  subsectionTitle: {
    color: colors.mutedText,
    fontWeight: '900',
    fontSize: 13,
    marginBottom: spacing.xs,
  },
  bullet: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 19,
  },
  instruction: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 2,
  },
  muted: {
    color: 'rgba(234,243,238,0.6)',
    fontSize: 13,
    lineHeight: 18,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metric: {
    minWidth: 140,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.sm,
    gap: 4,
  },
  metricLabel: {
    color: colors.mutedText,
    fontWeight: '800',
    fontSize: 12,
  },
  metricValue: {
    color: colors.text,
    fontWeight: '950',
    fontSize: 14,
  },
});

