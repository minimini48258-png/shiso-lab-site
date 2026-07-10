'use client';

import { indicators, LAYER_COLORS, LAYER_LABELS, getTrendLabel, getTrendColor, getTrendArrow } from '@/data/metrics';
import TimeSeriesChart from './TimeSeriesChart';

interface Props {
  selectedId: string | null;
  onClose: () => void;
}

export default function MetricPanel({ selectedId, onClose }: Props) {
  const indicator = indicators.find(i => i.id === selectedId);

  if (!indicator) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-400 text-sm gap-3 p-6">
        <span className="text-4xl">👆</span>
        <p className="text-center">チャートのセグメントをクリックすると<br />各指標の詳細が表示されます</p>
      </div>
    );
  }

  const colors = LAYER_COLORS[indicator.layer];
  const trendColor = getTrendColor(indicator.trend);

  const scoreLabel =
    indicator.score >= 75 ? '良好' :
    indicator.score >= 50 ? '要改善' :
    indicator.score >= 25 ? '警戒' : '危機';

  const scoreBg =
    indicator.score >= 75 ? '#dcfce7' :
    indicator.score >= 50 ? '#fef9c3' :
    indicator.score >= 25 ? '#ffedd5' : '#fee2e2';

  const scoreTextColor =
    indicator.score >= 75 ? '#15803d' :
    indicator.score >= 50 ? '#854d0e' :
    indicator.score >= 25 ? '#9a3412' : '#991b1b';

  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-3xl">{indicator.icon}</span>
          <div>
            <div className="text-xs font-medium px-2 py-0.5 rounded-full inline-block mb-1"
              style={{ background: colors.light, color: colors.text }}>
              {LAYER_LABELS[indicator.layer]}
            </div>
            <h2 className="text-lg font-bold text-gray-800">{indicator.name}</h2>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl leading-none p-1"
          aria-label="閉じる"
        >
          ×
        </button>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 rounded-xl p-3 text-center" style={{ background: scoreBg }}>
          <div className="text-3xl font-bold" style={{ color: scoreTextColor }}>{indicator.score}</div>
          <div className="text-xs font-semibold mt-0.5" style={{ color: scoreTextColor }}>{scoreLabel}</div>
        </div>
        <div className="flex-1 rounded-xl p-3 text-center bg-gray-50">
          <div className="text-2xl font-bold" style={{ color: trendColor }}>
            {getTrendArrow(indicator.trend)}
          </div>
          <div className="text-xs font-semibold mt-0.5 text-gray-500">{getTrendLabel(indicator.trend)}</div>
        </div>
        <div className="flex-1 rounded-xl p-3 text-center bg-gray-50">
          <div className="text-base font-bold text-gray-700 leading-tight">
            {indicator.currentValue.toLocaleString()}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">{indicator.unit}</div>
          <div className="text-xs text-gray-400">({indicator.currentYear}年)</div>
        </div>
      </div>

      {indicator.targetValue !== undefined && (
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
          <span className="text-gray-400">🎯 目標値:</span>
          <span className="font-semibold text-gray-700">
            {indicator.targetValue.toLocaleString()} {indicator.unit}
          </span>
        </div>
      )}

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">推移</h3>
        <TimeSeriesChart indicator={indicator} />
      </div>

      <div className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-3">
        {indicator.description}
      </div>

      <div className="text-xs text-gray-400 mt-auto">
        📊 出典: {indicator.source}
      </div>
    </div>
  );
}
