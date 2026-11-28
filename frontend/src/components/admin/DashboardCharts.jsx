import React, { useState } from 'react';

/**
 * Interactive SVG Donut / Pie Chart with numbered legend and hover inspection.
 */
export function PieDonutChart({ items = [], centerLabel = 'Total Items', size = 210 }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const validItems = items.filter((item) => Number(item.value) > 0);
  const total = validItems.reduce((acc, item) => acc + Number(item.value), 0);

  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.36;
  const strokeWidth = size * 0.14;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;
  const slices = validItems.map((item, idx) => {
    const val = Number(item.value);
    const pct = total > 0 ? val / total : 0;
    const dash = pct * circumference;
    const offset = -cumulative * circumference;
    cumulative += pct;
    return {
      ...item,
      idx,
      val,
      pctRounded: Math.round(pct * 100),
      dash,
      offset,
    };
  });

  const activeSlice = hoveredIdx !== null ? slices.find((s) => s.idx === hoveredIdx) : null;

  return (
    <div className="a-chart-donut-wrap">
      <div className="a-chart-donut-svg-box">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={centerLabel}>
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />
          <g transform={`rotate(-90 ${cx} ${cy})`}>
            {slices.map((s) => {
              const isHot = hoveredIdx === s.idx;
              return (
                <circle
                  key={s.label}
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={isHot ? strokeWidth + 5 : strokeWidth}
                  strokeDasharray={`${s.dash} ${circumference}`}
                  strokeDashoffset={s.offset}
                  style={{
                    cursor: 'pointer',
                    transition: 'stroke-width 0.18s ease, opacity 0.18s ease',
                    opacity: hoveredIdx !== null && !isHot ? 0.55 : 1,
                  }}
                  onMouseEnter={() => setHoveredIdx(s.idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              );
            })}
          </g>
        </svg>

        <div className="a-chart-donut-center">
          <strong className="a-chart-center-num">
            {activeSlice ? activeSlice.val : total}
          </strong>
          <span className="a-chart-center-lbl">
            {activeSlice ? `${activeSlice.label} (${activeSlice.pctRounded}%)` : centerLabel}
          </span>
        </div>
      </div>

      <div className="a-chart-legend">
        {items.map((item, idx) => {
          const val = Number(item.value) || 0;
          const pct = total > 0 ? Math.round((val / total) * 100) : 0;
          const isHot = hoveredIdx === idx;
          return (
            <div
              key={item.label}
              className={`a-legend-row ${isHot ? 'active' : ''}`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={item.onClick}
              style={{ cursor: item.onClick ? 'pointer' : 'default' }}
            >
              <span className="a-legend-num">{String(idx + 1).padStart(2, '0')}</span>
              <span className="a-legend-dot" style={{ background: item.color }} />
              <span className="a-legend-name">{item.label}</span>
              <span className="a-legend-val">
                <b>{val}</b> <small>({pct}%)</small>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Numbered Horizontal Bar Graph with exact counts and percentage fills.
 */
export function BarGraphChart({ items = [] }) {
  const maxVal = Math.max(1, ...items.map((i) => Number(i.value) || 0));

  return (
    <div className="a-bar-graph">
      {items.map((item, idx) => {
        const val = Number(item.value) || 0;
        const pct = Math.round((val / maxVal) * 100);
        return (
          <div
            key={item.label}
            className="a-bar-row"
            onClick={item.onClick}
            style={{ cursor: item.onClick ? 'pointer' : 'default' }}
          >
            <div className="a-bar-head">
              <span className="a-bar-label">
                <span className="a-num-badge">{String(idx + 1).padStart(2, '0')}</span>
                <span>{item.label}</span>
              </span>
              <span className="a-bar-count">{val}</span>
            </div>
            <div className="a-bar-track">
              <div
                className="a-bar-fill"
                style={{
                  width: `${Math.max(val > 0 ? 6 : 0, pct)}%`,
                  background: item.color || 'linear-gradient(90deg, #2563eb, #06b6d4)',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Responsive SVG Area + Line Trend Graph for monthly inquiries / activity.
 */
export function AreaTrendChart({ data = [], height = 190 }) {
  const [hoverIdx, setHoverIdx] = useState(null);
  const width = 520;
  const padL = 34;
  const padR = 18;
  const padT = 24;
  const padB = 34;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  const points = data.length > 0 ? data : [{ short: 'Now', label: 'Current', total: 0, unread: 0 }];
  const maxY = Math.max(4, ...points.map((d) => Number(d.total) || 0));

  const coords = points.map((d, i) => {
    const x = points.length === 1 ? padL + chartW / 2 : padL + (i / (points.length - 1)) * chartW;
    const y = padT + chartH - ((Number(d.total) || 0) / maxY) * chartH;
    return { ...d, x, y };
  });

  const linePath = coords
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  const areaPath = coords.length
    ? `${linePath} L ${coords[coords.length - 1].x.toFixed(1)} ${(padT + chartH).toFixed(1)} L ${coords[0].x.toFixed(1)} ${(padT + chartH).toFixed(1)} Z`
    : '';

  const gridTicks = [0, 0.5, 1];

  return (
    <div className="a-trend-wrap">
      <svg viewBox={`0 0 ${width} ${height}`} className="a-trend-svg" role="img" aria-label="Inquiries Trend Graph">
        <defs>
          <linearGradient id="abcAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {gridTicks.map((t) => {
          const gy = padT + chartH - t * chartH;
          const tickVal = Math.round(t * maxY);
          return (
            <g key={t}>
              <line x1={padL} y1={gy} x2={width - padR} y2={gy} stroke="#e2e8f0" strokeDasharray="4 4" />
              <text x={padL - 8} y={gy + 4} textAnchor="end" fontSize="10" fill="#94a3b8" fontWeight="600">
                {tickVal}
              </text>
            </g>
          );
        })}

        {areaPath && <path d={areaPath} fill="url(#abcAreaGrad)" />}
        {linePath && (
          <path
            d={linePath}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {coords.map((p, i) => {
          const isHot = hoverIdx === i;
          return (
            <g
              key={p.label}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={p.x} cy={p.y} r={isHot ? 6.5 : 4.5} fill="#fff" stroke="#2563eb" strokeWidth="2.5" />
              <text
                x={p.x}
                y={p.y - 10}
                textAnchor="middle"
                fontSize="10.5"
                fontWeight="700"
                fill={isHot ? '#1d4ed8' : '#334155'}
              >
                {p.total}
              </text>
              <text
                x={p.x}
                y={height - 10}
                textAnchor="middle"
                fontSize="10.5"
                fontWeight="600"
                fill="#64748b"
              >
                {p.short}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
