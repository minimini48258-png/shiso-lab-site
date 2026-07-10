'use client';

import { useState } from 'react';
import { indicators, LAYER_COLORS, getScoreColor, getOverallScore, type Indicator, type Layer } from '@/data/metrics';

interface Props {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

const CX = 300;
const CY = 300;
const RINGS = {
  social: { innerR: 95, outerR: 165 },
  resilience: { innerR: 175, outerR: 230 },
  environmental: { innerR: 240, outerR: 295 },
} as const;

const GAP_DEG = 2.5;

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, innerR: number, outerR: number, startDeg: number, endDeg: number): string {
  const s1 = polarToXY(cx, cy, outerR, startDeg);
  const e1 = polarToXY(cx, cy, outerR, endDeg);
  const s2 = polarToXY(cx, cy, innerR, endDeg);
  const e2 = polarToXY(cx, cy, innerR, startDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M ${s1.x.toFixed(2)} ${s1.y.toFixed(2)}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${e1.x.toFixed(2)} ${e1.y.toFixed(2)}`,
    `L ${s2.x.toFixed(2)} ${s2.y.toFixed(2)}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${e2.x.toFixed(2)} ${e2.y.toFixed(2)}`,
    'Z',
  ].join(' ');
}

function labelPosition(cx: number, cy: number, innerR: number, outerR: number, startDeg: number, endDeg: number) {
  const mid = (startDeg + endDeg) / 2;
  const r = (innerR + outerR) / 2;
  return polarToXY(cx, cy, r, mid);
}

function buildSegments(layer: Layer) {
  const items = indicators.filter(i => i.layer === layer);
  const ring = RINGS[layer];
  const total = items.length;
  const segDeg = 360 / total;

  return items.map((item, idx) => {
    const start = idx * segDeg + GAP_DEG / 2;
    const end = (idx + 1) * segDeg - GAP_DEG / 2;
    const path = arcPath(CX, CY, ring.innerR, ring.outerR, start, end);
    const lp = labelPosition(CX, CY, ring.innerR, ring.outerR, start, end);
    return { item, path, labelPos: lp, startDeg: start, endDeg: end };
  });
}


function getSegmentOpacity(score: number): number {
  if (score >= 75) return 1.0;
  if (score >= 50) return 0.75;
  if (score >= 25) return 0.5;
  return 0.35;
}

export default function DonutRingChart({ selectedId, onSelect }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const overallScore = getOverallScore();

  const layers: Layer[] = ['social', 'resilience', 'environmental'];
  const allSegments = layers.flatMap(layer => buildSegments(layer));

  const handleClick = (id: string) => {
    onSelect(selectedId === id ? null : id);
  };

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 600 600"
        className="w-full max-w-[520px]"
        style={{ filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.10))' }}
      >
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
          </filter>
          <path
            id="envArcPath"
            d={`M ${polarToXY(CX, CY, 308, 200).x} ${polarToXY(CX, CY, 308, 200).y} A 308 308 0 0 1 ${polarToXY(CX, CY, 308, 340).x} ${polarToXY(CX, CY, 308, 340).y}`}
          />
        </defs>

        <text textAnchor="middle" fontSize="11" fill={LAYER_COLORS.environmental.text} fontWeight="600">
          <textPath href="#envArcPath" startOffset="50%">
            環境的基盤（自然との共生）
          </textPath>
        </text>

        {allSegments.map(({ item, path, labelPos }) => {
          const isSelected = selectedId === item.id;
          const isHovered = hoveredId === item.id;
          const baseColor = getScoreColor(item.score, item.layer);
          const opacity = getSegmentOpacity(item.score);

          return (
            <g key={item.id}>
              <path
                d={path}
                fill={baseColor}
                fillOpacity={isSelected ? 1 : isHovered ? Math.min(opacity + 0.15, 1) : opacity}
                stroke={isSelected ? '#1a1a1a' : isHovered ? '#555' : 'white'}
                strokeWidth={isSelected ? 2.5 : isHovered ? 1.5 : 1}
                style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                onClick={() => handleClick(item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              />
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="16"
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {item.icon}
              </text>
            </g>
          );
        })}

        <circle cx={CX} cy={CY} r={85} fill="white" filter="url(#shadow)" />
        <circle cx={CX} cy={CY} r={83} fill="none" stroke="#e5e7eb" strokeWidth="1" />

        <text x={CX} y={CY - 22} textAnchor="middle" fontSize="13" fill="#6b7280" fontWeight="500">
          総合スコア
        </text>
        <text x={CX} y={CY + 16} textAnchor="middle" fontSize="42" fontWeight="700"
          fill={overallScore >= 60 ? '#16a34a' : overallScore >= 40 ? '#d97706' : '#dc2626'}>
          {overallScore}
        </text>
        <text x={CX} y={CY + 38} textAnchor="middle" fontSize="13" fill="#9ca3af">
          / 100
        </text>

        <defs>
          <path id="socialArc" d={`M ${polarToXY(CX, CY, 82, 185).x} ${polarToXY(CX, CY, 82, 185).y} A 82 82 0 0 1 ${polarToXY(CX, CY, 82, 355).x} ${polarToXY(CX, CY, 82, 355).y}`} />
          <path id="resArc" d={`M ${polarToXY(CX, CY, 165, 190).x} ${polarToXY(CX, CY, 165, 190).y} A 165 165 0 0 1 ${polarToXY(CX, CY, 165, 350).x} ${polarToXY(CX, CY, 165, 350).y}`} />
          <path id="envArc" d={`M ${polarToXY(CX, CY, 232, 192).x} ${polarToXY(CX, CY, 232, 192).y} A 232 232 0 0 1 ${polarToXY(CX, CY, 232, 348).x} ${polarToXY(CX, CY, 232, 348).y}`} />
        </defs>
        <text fontSize="9.5" fill={LAYER_COLORS.social.text} fontWeight="600" opacity="0.7">
          <textPath href="#socialArc" startOffset="25%">社会的基盤</textPath>
        </text>
        <text fontSize="9.5" fill={LAYER_COLORS.resilience.text} fontWeight="600" opacity="0.7">
          <textPath href="#resArc" startOffset="25%">地域レジリエンス</textPath>
        </text>
        <text fontSize="9.5" fill={LAYER_COLORS.environmental.text} fontWeight="600" opacity="0.7">
          <textPath href="#envArc" startOffset="22%">環境的基盤</textPath>
        </text>

        {hoveredId && (() => {
          const seg = allSegments.find(s => s.item.id === hoveredId);
          if (!seg) return null;
          const { item, labelPos } = seg;
          const tx = labelPos.x > CX ? labelPos.x - 10 : labelPos.x + 10;
          const ty = labelPos.y > CY ? labelPos.y + 22 : labelPos.y - 22;
          const anchor = labelPos.x > CX ? 'end' : 'start';
          return (
            <g style={{ pointerEvents: 'none' }}>
              <rect
                x={anchor === 'end' ? tx - 110 : tx}
                y={ty - 18}
                width="110"
                height="22"
                rx="4"
                fill="rgba(17,24,39,0.85)"
              />
              <text x={anchor === 'end' ? tx - 55 : tx + 55} y={ty - 3} textAnchor="middle"
                fontSize="11" fill="white" fontWeight="600">
                {item.nameShort}: {item.score}点
              </text>
            </g>
          );
        })()}
      </svg>

      <div className="flex gap-4 mt-2 text-xs text-gray-500 flex-wrap justify-center">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#15803d' }} />
          <span>75以上（良好）</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#4ade80' }} />
          <span>50–74（要改善）</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#86efac' }} />
          <span>25–49（警戒）</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#fca5a5' }} />
          <span>25未満（危機）</span>
        </div>
      </div>
    </div>
  );
}