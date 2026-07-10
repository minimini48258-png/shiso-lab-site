'use client';

import { indicators, LAYER_COLORS, LAYER_LABELS, getLayerScore, getTrendArrow, getTrendColor, type Layer } from '@/data/metrics';

const LAYERS: Layer[] = ['environmental', 'social', 'resilience'];

export default function ScoreOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
      {LAYERS.map(layer => {
        const score = getLayerScore(layer);
        const colors = LAYER_COLORS[layer];
        const layerIndicators = indicators.filter(i => i.layer === layer);

        return (
          <div
            key={layer}
            className="rounded-2xl p-4 border"
            style={{ background: colors.faint, borderColor: colors.light }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold" style={{ color: colors.text }}>
                {LAYER_LABELS[layer]}
              </span>
              <span className="text-2xl font-bold" style={{ color: colors.base }}>
                {score}
              </span>
            </div>

            <div className="w-full bg-white rounded-full h-2 mb-3 overflow-hidden">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${score}%`,
                  background: `linear-gradient(90deg, ${colors.medium}, ${colors.base})`,
                }}
              />
            </div>

            <div className="space-y-1">
              {layerIndicators.map(ind => (
                <div key={ind.id} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 truncate flex-1 mr-2">
                    {ind.icon} {ind.nameShort}
                  </span>
                  <span className="font-medium" style={{ color: colors.base }}>{ind.score}</span>
                  <span className="ml-1 font-bold" style={{ color: getTrendColor(ind.trend) }}>
                    {getTrendArrow(ind.trend)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
