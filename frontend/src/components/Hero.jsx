import React, { useEffect } from 'react';
import { useSite } from '../context/SiteContext';

export default function Hero({ onNavigate }) {
  const { settings } = useSite();

  useEffect(() => {
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
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            <span>{settings.hero_badge || 'Autonomous Cognitive Systems · Enterprise LLMs & Cyber-Robotics'}</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-title-word">{settings.hero_title_1 || 'ENGINEERING'}</span>{' '}
            <span className="hero-title-word">{settings.hero_title_2 || 'AUTONOMOUS'}</span>{' '}
            <span className="hero-title-word hero-rainbow">{settings.hero_title_3 || 'LLMS & ROBOTICS'}</span>
          </h1>

          <p className="hero-sub">
            {settings.hero_sub ||
              'Pioneering sovereign enterprise LLMs, neural vision architectures, and autonomous cyber-robotics — eliminating hallucination risks, guaranteeing 100% on-premise containment, and accelerating mission-critical operational precision.'}
          </p>

          <div className="hero-actions">
            <a href="#products" className="btn">
              {settings.hero_cta_primary || 'Explore AI & Robotics'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <a href="#contact" className="btn-outline">
              {settings.hero_cta_secondary || 'Schedule Architecture Demo'}
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
              <canvas className="hero-neural-canvas" id="ai-core-canvas" aria-hidden="true"></canvas>
              <span className="ai-core-label">CYBER·NEURAL CORE</span>
              <span className="ai-core-status">
                <span className="ai-dot"></span> ACTIVE · AIRGAPPED
              </span>
              <span className="ai-metric m1">
                <b className="ai-metric-key">ROBO-SYNAPSES</b>
                <i className="ai-metric-val" data-nodes="true">
                  9,840
                </i>
              </span>
              <span className="ai-metric m2">
                <b className="ai-metric-key">ATTN LOAD</b>
                <i className="ai-metric-val" data-load="true">
                  99.4%
                </i>
              </span>
              <span className="ai-metric m3">
                <b className="ai-metric-key">CONTROL LATENCY</b>
                <i className="ai-metric-val" data-sync="true">
                  11<span>ms</span>
                </i>
              </span>
            </div>

            <span className="hero-float-badge b1">
              <span className="dot" style={{ background: '#06b6d4' }}></span> Zero-Hallucination LLM Inferencing
            </span>
            <span className="hero-float-badge b2">
              <span className="dot" style={{ background: '#2563eb' }}></span> 100% Air-Gapped Enclave
            </span>
            <span className="hero-float-badge b3">
              <span className="dot" style={{ background: '#10b981' }}></span> Autonomous Cyber-Robotics
            </span>
            <span className="hero-float-badge b4">
              <span className="dot" style={{ background: '#8b5cf6' }}></span> Proprietary Transformer Core
            </span>
            <span className="hero-float-badge b5">
              <span className="dot" style={{ background: '#f59e0b' }}></span> 20+ Turnkey Enterprise Deployments
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
