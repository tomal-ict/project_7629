import React from 'react';
import { useSite } from '../context/SiteContext';

export default function Industries() {
  const { settings, industries } = useSite();

  if (!industries || industries.length === 0) return null;

  return (
    <section id="industries" className="section">
      <div className="industries-wrap">
        <div className="section-head center reveal">
          <span className="section-tag">{settings.industries_tag || 'SECTOR COVERAGE'}</span>
          <h2 className="section-title">{settings.industries_title || 'Transforming Mission-Critical Industry Verticals'}</h2>
          <p className="section-desc">{settings.industries_sub || ''}</p>
        </div>

        <div className="industries-grid">
          {industries.map((industry, idx) => (
            <div
              key={industry.id}
              className="industry-card reveal"
              style={{ transitionDelay: `${(idx % 5) * 70}ms` }}
            >
              <div className="ind-ic">{industry.icon}</div>
              <h4>{industry.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
