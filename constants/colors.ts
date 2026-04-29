export const lightColors = {
  background: '#F7FAF7',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  cardElevated: '#F4F8F5',
  border: 'rgba(22, 36, 30, 0.12)',

  text: '#15221A',
  mutedText: 'rgba(21,34,26,0.68)',

  accent: '#3BB98D',
  accentWarm: '#B68B57',
  accentSoft: 'rgba(59,185,141,0.16)',
  accentWarmSoft: 'rgba(182,139,87,0.14)',

  danger: '#D85858',
  success: '#2EA87C',
} as const;

export const darkColors = {
  background: '#070B09',
  surface: '#0E1511',
  card: '#0F1713',
  cardElevated: '#121C17',
  border: 'rgba(255,255,255,0.08)',

  text: '#EAF3EE',
  mutedText: 'rgba(234,243,238,0.74)',

  accent: '#66E1B7',
  accentWarm: '#E7D9C4',
  accentSoft: 'rgba(102,225,183,0.18)',
  accentWarmSoft: 'rgba(231,217,196,0.14)',

  danger: '#FF6B6B',
  success: '#4DE3A7',
} as const;

export type ThemeColors = {
  background: string;
  surface: string;
  card: string;
  cardElevated: string;
  border: string;
  text: string;
  mutedText: string;
  accent: string;
  accentWarm: string;
  accentSoft: string;
  accentWarmSoft: string;
  danger: string;
  success: string;
};

// Backward-compatible alias while migrating.
export const colors = darkColors;


