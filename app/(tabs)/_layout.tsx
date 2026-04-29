import { MaterialIcons } from '@expo/vector-icons';
import { router, Tabs } from 'expo-router';
import React, { useEffect } from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { useAppConfig } from '@/hooks/use-app-config';
import { useNutriLifeState } from '@/app/_layout';

const TAB_ICON_SIZE = 24;

export default function TabLayout() {
  const { colors } = useAppConfig();
  const { onboardingCompleted } = useNutriLifeState();

  useEffect(() => {
    if (onboardingCompleted) return;
    router.replace('/');
  }, [onboardingCompleted]);

  if (!onboardingCompleted) {
    // While redirecting to entry flow, render nothing.
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border, borderTopWidth: 1 },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: 'rgba(234,243,238,0.55)',
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={TAB_ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          title: 'Meal Plan',
          tabBarIcon: ({ color }) => <MaterialIcons name="calendar-today" size={TAB_ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: 'Recipes',
          tabBarIcon: ({ color }) => <MaterialIcons name="restaurant-menu" size={TAB_ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="groceries"
        options={{
          title: 'Grocery List',
          tabBarIcon: ({ color }) => <MaterialIcons name="shopping-cart" size={TAB_ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color }) => <MaterialIcons name="trending-up" size={TAB_ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={TAB_ICON_SIZE} color={color} />,
        }}
      />
    </Tabs>
  );
}
