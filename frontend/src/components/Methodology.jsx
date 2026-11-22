import React from 'react';
import { useSite } from '../context/SiteContext';

export default function Methodology() {
  const { settings, methodologies } = useSite();

  if (!methodologies || methodologies.length === 0) return null;

  return (
    <section id="methodology" className="section-warm">
      <div className="methodology-wrap">
        <div className="section-head center reveal revealed">
          <span className="section-tag">{settings.method_tag || 'HOW WE WORK'}</span>
          <h2 className="section-title">{settings.method_title || 'Research-Driven Approach'}</h2>
          <p className="section-desc">{settings.method_sub || ''}</p>
        </div>

        <div className="methodology-steps">
          {methodologies.map((method, i) => (
            <div key={method.id || i} className="methodology-card reveal revealed">
              <div className="step-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="step-ic">{method.icon}</div>
              <h4>{method.title}</h4>
              <p>{method.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
