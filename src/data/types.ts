export type Layer = 'environmental' | 'social' | 'resilience';
export type Trend = 'improving' | 'declining' | 'stable';

export interface HistoricalPoint {
  year: number;
  value: number;
}

export interface Indicator {
  id: string;
  name: string;
  nameShort: string;
  layer: Layer;
  score: number;
  trend: Trend;
  unit: string;
  currentValue: number;
  currentYear: number;
  targetValue?: number;
  history: HistoricalPoint[];
  source: string;
  description: string;
  icon: string;
  scoreDirection: 'higher_better' | 'lower_better';
}

export interface Region {
  id: string;
  name: string;
  prefecture: string;
  description: string;
  dataYear: string;
  indicators: Indicator[];
}
