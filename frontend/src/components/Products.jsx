import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import ProductDemo from './ProductDemo';

const mpIcons = {
  'Nexus Cognitive Executive': '🎙️',
  'VaniTrade Terminal': '🗣️',
  'WebTensor Reconciler': '🧾',
  'VisionShield QC': '👁️',
  'LexTrade Compliance': '📜',
  'TerraMind Agronomics': '🌾',
};

export default function Products() {
  const { settings, products, moreProducts } = useSite();
  const [currentSlide, setCurrentSlide] = useState(0);

  const total = products.length;

  useEffect(() => {
    if (total <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % total);
    }, 8000);
    return () => clearInterval(interval);
  }, [total]);

  if (!products || products.length === 0) return null;

  const currentProduct = products[currentSlide] || products[0];
  const features = Array.isArray(currentProduct.features) ? currentProduct.features : [];

  return (
    <section id="products" className="section products-section">
      <div className="products-head">
        <div className="section-head center reveal">
          <span className="section-tag">{settings.products_tag || 'PROPRIETARY PLATFORMS'}</span>
          <h2 className="section-title">{settings.products_title || 'Our Flagship Turnkey Systems'}</h2>
          <p className="section-desc">{settings.products_sub || ''}</p>
        </div>
      </div>

      <div className="product-slider reveal" data-slider="true" data-auto="8000">
        <div className="product-slide active">
          <div className="product-slide-grid">
            <div className="product-copy">
              {currentProduct.tag && <span className="pc-tag">{currentProduct.tag}</span>}
              <h3>{currentProduct.name}</h3>
              {currentProduct.metric && <div className="pc-metric">{currentProduct.metric}</div>}
              <p>{currentProduct.description}</p>

              {features.length > 0 && (
                <ul className="product-features">
                  {features.slice(0, 4).map((feature, idx) => (
                    <li key={idx}>
                      <svg className="pf-ic" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {typeof feature === 'string' ? feature : feature.title || feature.key || JSON.stringify(feature)}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="product-demo">
              <ProductDemo demo={currentProduct.demo} productName={currentProduct.name} />
            </div>
          </div>
        </div>

        <div className="slide-controls">
          <button
            className="slide-btn slide-prev"
            aria-label="Previous product"
            onClick={() => setCurrentSlide((currentSlide - 1 + total) % total)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
          </button>

          <div className="slide-dots">
            {products.map((_, idx) => (
              <button
                key={idx}
                className={`slide-dot ${currentSlide === idx ? 'active' : ''}`}
                aria-label={`Go to product ${idx + 1}`}
                onClick={() => setCurrentSlide(idx)}
              ></button>
            ))}
          </div>

          <span className="product-counter">
            {String(currentSlide + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>

          <button
            className="slide-btn slide-next"
            aria-label="Next product"
            onClick={() => setCurrentSlide((currentSlide + 1) % total)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {moreProducts && moreProducts.length > 0 && (
        <div className="more-products-wrap" style={{ marginTop: '56px' }}>
          <div className="more-products-inner reveal">
            <div className="section-head center" style={{ marginBottom: 0 }}>
              <span className="section-tag">{settings.more_products_tag || 'EXPANDED ECOSYSTEM'}</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(24px, 3vw, 34px)' }}>
                {settings.more_products_title || '6 Specialized Enterprise Solutions'}
              </h2>
            </div>

            <div className="more-products-grid">
              {moreProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className="mp-card reveal"
                  style={{ transitionDelay: `${(idx % 6) * 80}ms` }}
                >
                  <div className="mp-logo">{mpIcons[product.name] || '🧩'}</div>
                  <h4>{product.name}</h4>
                  {product.tag && <span className="mp-tag">{product.tag}</span>}
                  <p>{product.description}</p>
                  <a href="#contact">
                    Learn More
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
