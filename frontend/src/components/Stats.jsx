import React from 'react';
import { useSite } from '../context/SiteContext';

export default function Stats() {
  const { stats } = useSite();

  if (!stats || stats.length === 0) return null;

  return (
    <div className="stats-band">
      {stats.map((stat, i) => (
        <div key={stat.id || i} className="stat-card reveal revealed">
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
          {stat.sub && <div className="stat-sub">{stat.sub}</div>}
        </div>
      ))}
    </div>
  );
}
