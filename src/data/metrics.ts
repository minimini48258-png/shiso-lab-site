export type { Layer, Trend, HistoricalPoint, Indicator, Region } from './types';
import type { Layer, Trend } from './types';
import { sakuhoRegion } from './regions/sakuho';

export { sakuhoRegion as currentRegion };

export const indicators = sakuhoRegion.indicators;

export const LAYER_LABELS: Record<Layer, string> = {
  environmental: '環境的基盤',
  social: '社会的基盤',
  resilience: '地域レジリエンス',
};

export const LAYER_COLORS: Record<Layer, { base: string; dark: string; medium: string; light: string; faint: string; text: string }> = {
  environmental: {
    base: '#16a34a',
    dark: '#15803d',
    medium: '#4ade80',
    light: '#bbf7d0',
    faint: '#f0fdf4',
    text: '#14532d',
  },
  social: {
    base: '#db2777',
    dark: '#be185d',
    medium: '#f472b6',
    light: '#fce7f3',
    faint: '#fdf2f8',
    text: '#831843',
  },
  resilience: {
    base: '#2563eb',
    dark: '#1d4ed8',
    medium: '#60a5fa',
    light: '#dbeafe',
    faint: '#eff6ff',
    text: '#1e3a8a',
  },
};

export function getLayerScore(layer: Layer): number {
  const layerIndicators = indicators.filter(i => i.layer === layer);
  return Math.round(layerIndicators.reduce((sum, i) => sum + i.score, 0) / layerIndicators.length);
}

export function getOverallScore(): number {
  return Math.round(indicators.reduce((sum, i) => sum + i.score, 0) / indicators.length);
}

export function getScoreColor(score: number, layer: Layer): string {
  const colors = LAYER_COLORS[layer];
  if (score >= 75) return colors.dark;
  if (score >= 50) return colors.base;
  if (score >= 25) return colors.medium;
  return '#fca5a5';
}

export function getTrendLabel(trend: Trend): string {
  return { improving: '改善中', declining: '悪化中', stable: '横ばい' }[trend];
}

export function getTrendColor(trend: Trend): string {
  return { improving: '#16a34a', declining: '#dc2626', stable: '#ca8a04' }[trend];
}

export function getTrendArrow(trend: Trend): string {
  return { improving: '↑', declining: '↓', stable: '→' }[trend];
}
