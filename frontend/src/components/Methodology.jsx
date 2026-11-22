import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';

const STAGE_ICONS = [
  // 01 Diagnostics
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
    <path d="M11 8v6" />
    <path d="M8 11h6" />
  </svg>,
  // 02 Scope & Mapping
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
    <circle cx="15" cy="15" r="2" />
  </svg>,
  // 03 Algorithmic Architecture
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="m8.6 13.5 6.8 4" />
    <path d="m15.4 6.5-6.8 4" />
  </svg>,
  // 04 Rapid Prototyping
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2v7.31M14 2v7.31M8.5 2h7" />
    <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
    <circle cx="12" cy="15" r="1.5" />
  </svg>,
  // 05 Stress Testing
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>,
  // 06 Production Engineering
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="3" />
    <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="3" />
  </svg>,
  // 07 Deployment & Handover
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>,
];

const PHASE_TAGS = [
  'Phase I · Diagnostics',
  'Phase I · Perimeter',
  'Phase II · Architecture',
  'Phase II · Prototype',
  'Phase II · Validation',
  'Phase III · Hardening',
  'Phase III · Handover',
];

const DELIVERABLES = [
  'Constraint Isolation Matrix',
  'Security & Schema Perimeter',
  'Deterministic Model Blueprint',
  'Live Sandboxed Prototype',
  'Edge-Case Stress Report',
  'Industrial Hardening & SLA',
  'Turnkey Operational Handover',
];

export default function Methodology() {
  const { settings, methodologies } = useSite();
  const [activeStage, setActiveStage] = useState(0);

  if (!methodologies || methodologies.length === 0) return null;

  const row1 = methodologies.slice(0, 4);
  const row2 = methodologies.slice(4, 7);

  const renderCard = (method, idx) => (
    <div
      key={method.id || idx}
      className={`methodology-card reveal ${activeStage === idx ? 'highlighted' : ''}`}
      style={{ transitionDelay: `${(idx % 4) * 80}ms` }}
      onMouseEnter={() => setActiveStage(idx)}
    >
      <div className="method-top-bar">
        <div className="method-phase-pill">
          <span className="phase-dot"></span>
          {PHASE_TAGS[idx] || `Stage ${String(idx + 1).padStart(2, '0')}`}
        </div>
        <span className="method-watermark-num">{String(idx + 1).padStart(2, '0')}</span>
      </div>

      <div className="method-icon-wrap">
        <div className="method-icon-box">
          {STAGE_ICONS[idx] || method.icon}
        </div>
        <div className="method-seq-badge">STEP {idx + 1} OF 7</div>
      </div>

      <h4 className="method-title">{method.title}</h4>
      <p className="method-desc">{method.description}</p>

      <div className="method-deliverable">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>{DELIVERABLES[idx] || 'Verified Engineering Milestone'}</span>
      </div>
    </div>
  );

  return (
    <section id="methodology" className="section-warm">
      <div className="methodology-wrap">
        <div className="section-head center reveal">
          <span className="section-tag">{settings.method_tag || 'ENGINEERING LIFECYCLE'}</span>
          <h2 className="section-title">{settings.method_title || 'Structured 7-Stage Validation Protocol'}</h2>
          <p className="section-desc">
            {settings.method_sub ||
              'A mathematically rigorous, phased deployment framework ensuring deterministic safety and verifiable operational return before production handover.'}
          </p>
        </div>

        {/* High-Tech Stepper Track */}
        <div className="methodology-pipeline-track reveal">
          <div className="pipeline-line">
            <div className="pipeline-progress-glow"></div>
          </div>
          <div className="pipeline-nodes">
            {methodologies.map((method, i) => (
              <div
                key={method.id || i}
                className={`pipeline-node ${activeStage === i ? 'active' : ''}`}
                onClick={() => setActiveStage(i)}
                onMouseEnter={() => setActiveStage(i)}
              >
                <span className="pipeline-node-circle">{String(i + 1).padStart(2, '0')}</span>
                <span className="pipeline-node-label">{method.title.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4 + 3 Connected Flow Grid */}
        <div className="methodology-grid-container">
          <div className="methodology-row methodology-row--top">
            {row1.map((method, i) => renderCard(method, i))}
          </div>
          <div className="methodology-row methodology-row--bottom">
            {row2.map((method, i) => renderCard(method, i + 4))}
          </div>
        </div>
      </div>
    </section>
  );
}
