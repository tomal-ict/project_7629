import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function ServiceDetail({ serviceSlug, onBack, onSelectService }) {
  const [service, setService] = useState(null);
  const [moreServices, setMoreServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get(`/site/services/${serviceSlug}`);
        if (res.data && res.data.service) {
          setService(res.data.service);
          setMoreServices(res.data.moreServices || []);
        } else {
          setError('Service not found.');
        }
      } catch (err) {
        console.error('Failed to load service detail:', err);
        setError('Error loading service data.');
      } finally {
        setLoading(false);
      }
    };

    if (serviceSlug) {
      fetchService();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [serviceSlug]);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'monospace', color: '#64748b' }}>Loading Service Details...</p>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div style={{ minHeight: '60vh', textAlign: 'center', padding: '96px 28px' }}>
        <h2>Service Unavailable</h2>
        <p style={{ color: '#64748b', margin: '16px 0' }}>{error || 'The requested service was not found.'}</p>
        <button onClick={onBack} className="btn" style={{ margin: '0 auto', border: 'none', cursor: 'pointer' }}>
          Back to Overview
        </button>
      </div>
    );
  }

  const features = Array.isArray(service.features) ? service.features : [];
  const benefits = Array.isArray(service.benefits) ? service.benefits : [];
  const usecases = Array.isArray(service.usecases) ? service.usecases : [];
  const stats = Array.isArray(service.stats) ? service.stats : [];
  const steps = Array.isArray(service.steps) ? service.steps : [];
  const gallery = Array.isArray(service.gallery_images) ? service.gallery_images : [];

  return (
    <main>
      <section
        className="service-hero"
        style={{ backgroundImage: `url('${service.hero_image || './images/brain.svg'}')` }}
      >
        <div className="service-hero-content">
          <div className="service-breadcrumb">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                onBack();
              }}
            >
              Home
            </a>{' '}
            <span style={{ opacity: 0.6 }}>•</span> Services <span style={{ opacity: 0.6 }}>•</span> {service.title}
          </div>
          <span className="sh-badge">
            {service.icon} {service.title}
          </span>
          <h1>{service.title}</h1>
          <p className="sh-sub">{service.subtitle}</p>
          <div className="service-hero-actions">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onBack();
                setTimeout(() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="btn btn-white"
            >
              Get Started
            </a>
            <a
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                onBack();
                setTimeout(() => {
                  const el = document.getElementById('products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="btn-outline"
              style={{ borderColor: '#fff', color: '#fff', background: 'rgba(255,255,255,.08)' }}
            >
              Explore Products
            </a>
          </div>
        </div>
      </section>

      {stats.length > 0 && (
        <div className="service-stats">
          {stats.slice(0, 4).map((stat, idx) => (
            <div key={idx}>
              <div className="sv">{stat.value || ''}</div>
              <div className="sl">{stat.label || ''}</div>
            </div>
          ))}
        </div>
      )}

      {service.intro && (
        <section className="service-section">
          <div className="service-overview">
            <div className="reveal revealed">
              <span className="section-tag">Overview</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: '6px' }}>
                {service.title}
              </h2>
              <p className="section-desc" style={{ maxWidth: 'none', marginTop: '14px' }}>
                {service.intro}
              </p>
              {service.why_us && (
                <p className="section-desc" style={{ maxWidth: 'none', marginTop: '14px', color: '#0891b2', fontWeight: 600 }}>
                  {service.why_us}
                </p>
              )}
            </div>
            {gallery.length > 0 && (
              <div className="service-gallery reveal revealed">
                {gallery.slice(0, 3).map((img, idx) => (
                  <div key={idx}>
                    <img src={img} alt={`${service.title} — ${idx + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {(features.length > 0 || benefits.length > 0 || usecases.length > 0) && (
        <section className="service-section" style={{ paddingTop: 0 }}>
          <div className="service-grid-2">
            {features.length > 0 && (
              <div className="svc-list-card reveal revealed">
                <h4>Features</h4>
                <ul>
                  {features.map((feature, idx) => (
                    <li key={idx}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                      {typeof feature === 'string' ? feature : feature.title || feature.key || JSON.stringify(feature)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {benefits.length > 0 && (
              <div className="svc-list-card reveal revealed">
                <h4>Benefits</h4>
                <ul>
                  {benefits.map((benefit, idx) => (
                    <li key={idx}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                      {typeof benefit === 'string' ? benefit : benefit.title || benefit.key || JSON.stringify(benefit)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {usecases.length > 0 && (
            <div style={{ maxWidth: '1200px', margin: '48px auto 0' }}>
              <div className="section-head" style={{ marginBottom: '24px' }}>
                <span className="section-tag">Use Cases</span>
                <h2 className="section-title" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
                  Where It Works
                </h2>
              </div>
              <div className="service-grid-3">
                {usecases.map((usecase, idx) => (
                  <div key={idx} className="svc-list-card reveal revealed">
                    <ul>
                      <li>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                        {typeof usecase === 'string' ? usecase : usecase.title || usecase.key || JSON.stringify(usecase)}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {steps.length > 0 && (
        <section className="service-section" style={{ paddingTop: 0 }}>
          <div className="section-head reveal revealed">
            <span className="section-tag">Our Approach</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
              From Idea to Impact
            </h2>
          </div>
          <div className="service-steps">
            {steps.map((step, idx) => (
              <div key={idx} className="service-step reveal revealed">
                <div className="ss-num">{String(idx + 1).padStart(2, '0')}</div>
                <h4>{step.title || (typeof step === 'string' ? step : '')}</h4>
                <p>{step.desc || ''}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="service-section" style={{ paddingTop: 0 }}>
        <div className="service-cta reveal revealed">
          <h3>Ready to {service.title}?</h3>
          <p>Let's discuss how our proprietary AI model can be deployed for your business — securely, privately, and fast.</p>
          <div className="cta-actions">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onBack();
                setTimeout(() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="btn btn-white"
            >
              Book a Free Consultation
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <a
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                onBack();
                setTimeout(() => {
                  const el = document.getElementById('products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="btn btn-outline"
            >
              Explore Our Products
            </a>
          </div>
        </div>
      </section>

      {moreServices.length > 0 && (
        <section className="service-section" style={{ paddingTop: 0 }}>
          <div className="section-head reveal revealed">
            <span className="section-tag">More Services</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
              Explore Other Services
            </h2>
          </div>
          <div className="more-services">
            {moreServices.map((s) => (
              <div key={s.id} className="ms-card reveal revealed">
                <div className="ms-ic">{s.icon}</div>
                <h4>{s.title}</h4>
                <p>{s.description}</p>
                <a
                  href={`#services/${s.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectService(s);
                  }}
                >
                  Explore Service
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
