import { useNutriLifeState } from '@/app/_layout';

export function useAppConfig() {
  const { locale, t, themeColors, isDarkMode } = useNutriLifeState();
  return { locale, t, colors: themeColors, isDarkMode };
}

