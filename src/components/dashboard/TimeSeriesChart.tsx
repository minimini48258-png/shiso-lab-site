'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { type Indicator, LAYER_COLORS } from '@/data/metrics';

interface Props {
  indicator: Indicator;
}

export default function TimeSeriesChart({ indicator }: Props) {
  const color = LAYER_COLORS[indicator.layer].base;
  const data = indicator.history.map(h => ({ year: h.year, value: h.value }));

  const allValues = data.map(d => d.value);
  const minVal = Math.min(...allValues);
  const maxVal = Math.max(...allValues);
  const padding = (maxVal - minVal) * 0.15 || maxVal * 0.1;

  const domainMin = Math.max(0, minVal - padding);
  const domainMax = maxVal + padding;

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: '#6b7280' }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
            domain={[domainMin, domainMax]}
            tick={{ fontSize: 11, fill: '#6b7280' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => {
              if (Math.abs(v) >= 1000) return `${(v / 1000).toFixed(0)}k`;
              if (Math.abs(v) < 1) return v.toFixed(3);
              return v.toFixed(v % 1 === 0 ? 0 : 1);
            }}
            width={48}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(17,24,39,0.9)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '12px',
              padding: '8px 12px',
            }}
            formatter={(value) => [`${value} ${indicator.unit}`, indicator.nameShort]}
            labelFormatter={(label) => `${label}年`}
          />
          {indicator.targetValue !== undefined && (
            <ReferenceLine
              y={indicator.targetValue}
              stroke="#94a3b8"
              strokeDasharray="4 4"
              label={{
                value: `目標: ${indicator.targetValue}`,
                position: 'insideTopRight',
                fontSize: 10,
                fill: '#94a3b8',
              }}
            />
          )}
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            dot={{ fill: color, r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: color, stroke: 'white', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
