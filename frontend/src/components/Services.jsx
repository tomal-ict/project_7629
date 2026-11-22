import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';

export default function Services({ onSelectService }) {
  const { settings, services } = useSite();
  const [activeTab, setActiveTab] = useState(0);

  if (!services || services.length === 0) return null;

  const currentService = services[activeTab] || services[0];
  const features = Array.isArray(currentService.features) ? currentService.features : [];

  return (
    <section id="services" className="section-alt">
      <div className="services-wrap">
        <div className="section-head center reveal revealed">
          <span className="section-tag">{settings.services_tag || 'SERVICES'}</span>
          <h2 className="section-title">{settings.services_title || 'What We Do For You'}</h2>
          <p className="section-desc">{settings.services_sub || ''}</p>
        </div>

        <div className="services-panel reveal revealed" data-services-panel="true">
          <div className="services-tabs">
            {services.map((service, index) => (
              <button
                key={service.id || index}
                type="button"
                onClick={() => setActiveTab(index)}
                className={`service-tab ${activeTab === index ? 'active' : ''}`}
              >
                <span className="st-num">{String(index + 1).padStart(2, '0')}</span>
                <span className="st-ic">{service.icon}</span>
                <span className="st-title">{service.title}</span>
              </button>
            ))}
          </div>

          <div className="service-content">
            <div className="service-content-pane" style={{ display: 'block' }}>
              <div className="service-content-inner">
                {currentService.subtitle && (
                  <div className="service-content-kicker">{currentService.subtitle}</div>
                )}
                <h3>{currentService.title}</h3>
                <p className="sc-desc">{currentService.description}</p>

                <div className="what-you-get-title">What You Get</div>
                <ul className="wyg-list">
                  {features.slice(0, 4).map((feature, idx) => (
                    <li key={idx}>
                      <span className="ck">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      {typeof feature === 'string' ? feature : feature.title || feature.key || JSON.stringify(feature)}
                    </li>
                  ))}
                </ul>

                <div className="services-more">
                  <button
                    onClick={() => onSelectService(currentService)}
                    className="btn"
                    style={{ border: 'none', cursor: 'pointer' }}
                  >
                    Learn More
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                  <a href="#contact" className="go-link">
                    {settings.services_cta || 'Get a Free Consultation'}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
