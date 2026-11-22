import React from 'react';
import { useSite } from '../context/SiteContext';

export default function About() {
  const { settings, coreValues, clients, pilots } = useSite();

  const getInitials = (name) => {
    return (name || '')
      .trim()
      .split(' ')
      .map((w) => w.charAt(0))
      .slice(0, 2)
      .join('');
  };

  return (
    <section id="about" className="section">
      <div className="about-row">
        <div className="about-copy reveal revealed">
          <span className="section-tag">{settings.about_tag || 'WHO WE ARE'}</span>
          <h2 className="section-title" style={{ marginBottom: '6px' }}>
            {settings.about_title || 'Engineering High-Trust AI Architectures for Critical Enterprise Workflows'}
          </h2>

          <p className="section-desc" style={{ marginTop: '14px' }}>
            {settings.about_body || 'ABC AI System Limited is a pioneering artificial intelligence engineering firm headquartered in Dhaka, Bangladesh. Built on the conviction that enterprise AI must be verifiably safe, predictable, and self-hosted — we design native cognitive systems and turnkey industrial AI platforms that function strictly inside organizational security perimeters, without external third-party dependencies.'}
          </p>

          <ul className="about-bullets">
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" />
              </svg>
              <span>{settings.about_point_1 || 'Enterprise cognitive architectures built on our native sovereign framework — zero external black-box models.'}</span>
            </li>
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" />
              </svg>
              <span>{settings.about_point_2 || 'Verifiably deterministic outputs and strict on-premise containment — your data never exits your security perimeter.'}</span>
            </li>
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" />
              </svg>
              <span>{settings.about_point_3 || 'Full-spectrum engineering lifecycle: turnkey modules, bespoke deep-tech models, applied research, and compliance audits.'}</span>
            </li>
          </ul>
        </div>

        <div className="about-visual reveal revealed">
          <div className="about-visual-img">
            <img
              src="./images/brain.svg"
              alt={settings.about_image_caption || 'Proprietary AI Model'}
              style={{ objectFit: 'contain', padding: '22px', background: 'linear-gradient(135deg,#eff6ff,#ecfeff)' }}
            />
          </div>
          <div className="about-overlay">
            <span className="ai-badge">🧠</span>
            <div>
              <strong>{settings.about_image_caption || 'Sovereign Neural Infrastructure'}</strong>
              <span>{settings.about_image_sub || 'Engineered in Bangladesh · Powering Global Enterprises'}</span>
            </div>
          </div>
          <div className="about-float-card fc1">
            <span className="fc-ic">🔒</span>
            <div>
              100% On-Premise<small>Zero third-party egress</small>
            </div>
          </div>
          <div className="about-float-card fc2">
            <span className="fc-ic">🎯</span>
            <div>
              0.0% Hallucinations<small>Deterministic accuracy</small>
            </div>
          </div>
        </div>
      </div>

      <div className="vm-grid">
        <div className="vm-card card reveal revealed">
          <div className="vm-ic">🔭</div>
          <h3>{settings.vision_title || 'OUR VISION'}</h3>
          <p>{settings.vision_text || ''}</p>
        </div>
        <div className="vm-card card reveal revealed">
          <div className="vm-ic">🚀</div>
          <h3>{settings.mission_title || 'OUR MISSION'}</h3>
          <p>{settings.mission_text || ''}</p>
        </div>
      </div>

      {coreValues && coreValues.length > 0 && (
        <div style={{ marginTop: '76px' }}>
          <div className="section-head center reveal revealed">
            <span className="section-tag">{settings.values_tag || 'WHAT DEFINES US'}</span>
            <h2 className="section-title">{settings.values_title || 'Core Values'}</h2>
          </div>
          <div className="values-grid">
            {coreValues.map((val) => (
              <div key={val.id} className="value-card reveal revealed">
                <div className="value-ic">{val.icon}</div>
                <h3>{val.title}</h3>
                <p>{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {((clients && clients.length > 0) || (pilots && pilots.length > 0)) && (
        <div className="client-showcase" style={{ marginTop: '84px' }}>
          <div className="section-head center reveal revealed">
            <span className="section-tag">{settings.clients_tag || 'TRUSTED BY'}</span>
            <h2 className="section-title">{settings.clients_title || 'Our Clients'}</h2>
          </div>

          {clients && clients.length > 0 && (
            <div className="client-logo-group reveal revealed">
              <div className="client-logo-row-title">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Clients
              </div>
              <div className="client-logo-row client-logo-row--clients">
                {clients.map((client) => (
                  <div key={client.id} className="client-logo-card" style={{ '--logo-accent': client.accent || '#0ea5e9' }}>
                    <span className="client-logo-accent"></span>
                    <div className="client-logo-image-wrap">
                      <span className="cl-init">{getInitials(client.name)}</span>
                    </div>
                    <span className="client-logo-divider"></span>
                    <span>{client.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {pilots && pilots.length > 0 && (
            <div className="client-logo-group client-logo-group--pilot reveal revealed">
              <div className="client-logo-row-title client-logo-row-title--pilot">
                <span className="pilot-status-dot"></span>
                {settings.pilots_title || 'Pilot Running'}
              </div>
              <div className="client-logo-row client-logo-row--pilots">
                {pilots.map((client) => (
                  <div key={client.id} className="client-logo-card" style={{ '--logo-accent': client.accent || '#0ea5e9' }}>
                    <span className="client-logo-accent"></span>
                    <div className="client-logo-image-wrap">
                      <span className="cl-init">{getInitials(client.name)}</span>
                    </div>
                    <span className="client-logo-divider"></span>
                    <span>{client.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
