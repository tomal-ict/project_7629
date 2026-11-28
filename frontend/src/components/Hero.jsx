import React, { useEffect } from 'react';
import { useSite } from '../context/SiteContext';

export default function Hero({ onNavigate }) {
  const { settings } = useSite();

  const hasCustomHeroImage = Boolean(settings.hero_image && settings.hero_image.trim());

  useEffect(() => {
    if (hasCustomHeroImage) return;

    // If the animation engine is already loaded on window, run it immediately
    if (typeof window.initHeroNeuralAnimation === 'function') {
      window.initHeroNeuralAnimation();
    } else {
      const scriptId = 'hero-neural-script';
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();

      const s = document.createElement('script');
      s.id = scriptId;
      s.src = './js/hero-neural.js?v=' + Date.now();
      s.onload = () => {
        if (typeof window.initHeroNeuralAnimation === 'function') {
          window.initHeroNeuralAnimation();
        }
      };
      document.body.appendChild(s);
    }
  }, [hasCustomHeroImage]);

  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            <span>{settings.hero_badge || 'Pioneering Sovereign Enterprise Intelligence Built in Bangladesh'}</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-title-word">{settings.hero_title_1 || 'DECENTRALIZING'}</span>{' '}
            <span className="hero-title-word">{settings.hero_title_2 || 'AUTONOMOUS'}</span>{' '}
            <span className="hero-title-word hero-rainbow">{settings.hero_title_3 || 'INTELLIGENCE'}</span>
          </h1>

          <p className="hero-sub">
            {settings.hero_sub ||
              'Equipping modern enterprises with native, self-contained AI systems — guaranteeing zero algorithmic hallucinations, strict on-premise data containment, and fully deterministic operational precision.'}
          </p>

          <div className="hero-actions">
            <a href="#products" className="btn">
              {settings.hero_cta_primary || 'Explore AI Systems'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <a href="#contact" className="btn-outline">
              {settings.hero_cta_secondary || 'Schedule Technical Demo'}
            </a>
          </div>
        </div>

        <div className="hero-brain-wrap">
          <div className="hero-brain">
            <span className="hero-ring r1"></span>
            <span className="hero-ring r2"></span>
            <span className="hero-ring r3"></span>
            <span className="hero-scan"></span>
            <span className="hero-orb o1"></span>
            <span className="hero-orb o2"></span>
            <span className="hero-orb o3"></span>
            <span className="hero-orb o4"></span>

            <div className="hero-brain-core">
              {hasCustomHeroImage ? (
                <img
                  src={settings.hero_image}
                  alt={settings.hero_core_label || 'Hero Banner Visual'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '28px',
                    boxShadow: '0 24px 48px rgba(15, 23, 42, 0.14)',
                  }}
                />
              ) : (
                <canvas className="hero-neural-canvas" id="ai-core-canvas" aria-hidden="true"></canvas>
              )}
              <span className="ai-core-label">{settings.hero_core_label || 'AI\u00A0CORE'}</span>
              <span className="ai-core-status">
                <span className="ai-dot"></span> {settings.hero_core_status || 'ONLINE'}
              </span>
              <span className="ai-metric m1">
                <b className="ai-metric-key">NODES</b>
                <i className="ai-metric-val" data-nodes="true">
                  8,980
                </i>
              </span>
              <span className="ai-metric m2">
                <b className="ai-metric-key">LOAD</b>
                <i className="ai-metric-val" data-load="true">
                  95%
                </i>
              </span>
              <span className="ai-metric m3">
                <b className="ai-metric-key">SYNC</b>
                <i className="ai-metric-val" data-sync="true">
                  32<span>ms</span>
                </i>
              </span>
            </div>

            <span className="hero-float-badge b1">
              <span className="dot"></span> {settings.hero_float_1 || '0.0% Hallucinations'}
            </span>
            <span className="hero-float-badge b2">
              <span className="dot"></span> {settings.hero_float_2 || '100% On-Premise'}
            </span>
            <span className="hero-float-badge b3">
              <span className="dot"></span> {settings.hero_float_3 || 'Sovereign Deep Tech'}
            </span>
            <span className="hero-float-badge b4">
              <span className="dot"></span> {settings.hero_float_4 || 'Native Neural Engine'}
            </span>
            <span className="hero-float-badge b5">
              <span className="dot"></span> {settings.hero_float_5 || '15+ Enterprise Ready'}
            </span>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        Scroll
        <span className="hero-scroll-arrow"></span>
      </div>
    </section>
  );
}
