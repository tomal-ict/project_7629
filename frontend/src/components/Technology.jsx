import React from 'react';
import { useSite } from '../context/SiteContext';

export default function Technology() {
  const { settings, techDomains, comparisons, advantages } = useSite();

  return (
    <section id="technology" className="section-warm">
      <div className="tech-wrap">
        <div className="section-head center reveal revealed">
          <span className="section-tag">{settings.tech_tag || 'OUR TECHNOLOGY'}</span>
          <h2 className="section-title">{settings.tech_title || 'Built on Our Own AI Model'}</h2>
          <p className="section-desc">{settings.tech_sub || ''}</p>
        </div>

        {techDomains && techDomains.length > 0 && (
          <div className="tech-domains">
            {techDomains.map((domain) => (
              <div key={domain.id} className="tech-card reveal revealed">
                <div className="td-ic">{domain.icon}</div>
                <h4>{domain.title}</h4>
                <p>{domain.description}</p>
              </div>
            ))}
          </div>
        )}

        {comparisons && comparisons.length > 0 && (
          <div className="tech-table-wrap reveal revealed">
            <div className="section-head center" style={{ marginBottom: '28px', marginTop: '20px' }}>
              <span className="section-tag">{settings.tech_cmp_tag || 'WHY ABC AI SYSTEM'}</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
                {settings.tech_cmp_title || 'ABC AI System vs Generic AI'}
              </h2>
            </div>

            <table className="tech-comparison" style={{ margin: '0 auto' }}>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>ABC AI System</th>
                  <th>Generic AI</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((cmp) => (
                  <tr key={cmp.id}>
                    <td>{cmp.feature}</td>
                    <td className="us-cell">{cmp.us_value}</td>
                    <td className="them-cell">{cmp.them_value}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Verdict</td>
                  <td className="us-cell">Deterministic, on-premise & 100% sovereign</td>
                  <td className="them-cell">Probabilistic, external cloud & multi-tenant risk</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {advantages && advantages.length > 0 && (
          <div className="tech-advantages">
            {advantages.map((adv) => (
              <div key={adv.id} className="adv-card reveal revealed">
                <div className="adv-ic">{adv.icon}</div>
                <h4>{adv.title}</h4>
                {adv.subtitle && <span className="adv-sub">{adv.subtitle}</span>}
                <p>{adv.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
