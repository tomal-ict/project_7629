import React from 'react';
import { useSite } from '../context/SiteContext';

export default function Footer({ onNavigate }) {
  const { settings, products, moreProducts, services } = useSite();

  const allProductsList = [...(products || []), ...(moreProducts || [])].slice(0, 6);
  const servicesList = (services || []).slice(0, 6);

  return (
    <footer className="site-footer">
      <div className="footer-gradient-bar"></div>
      <div className="footer-top">
        <div className="footer-brand">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="nav-logo"
          >
            <img
              src={settings.site_logo || './images/logo.svg'}
              alt={settings.company_name || 'ABC AI System'}
              style={{ filter: 'brightness(0) invert(1)', opacity: 0.95 }}
            />
          </a>
          <p className="footer-tagline">
            {settings.footer_tagline ||
              'Engineering sovereign, deterministic, and privacy-first artificial intelligence architectures for modern enterprises.'}
          </p>
          <div className="footer-member-chips">
            <a
              href={settings.basis_url || 'https://basis.org.bd'}
              target="_blank"
              rel="noopener noreferrer"
              className="member-chip"
            >
              <span className="chip-ic">🏛</span> BASIS Member
            </a>
            <a
              href={settings.dcci_url || 'https://www.dhakachamber.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="member-chip"
            >
              <span className="chip-ic">🏢</span> DCCI Member
            </a>
          </div>
          <ul className="footer-contact-list">
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{settings.address || ''}</span>
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <a href={`mailto:${settings.email || ''}`}>{settings.email || ''}</a>
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <a href={settings.website || '#'} target="_blank" rel="noopener noreferrer">
                {settings.website || ''}
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Products</h4>
          <div className="footer-links">
            {allProductsList.map((p) => (
              <a key={p.id} href="#products">
                {p.name}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <div className="footer-links">
            {servicesList.map((s) => (
              <a
                key={s.id}
                href={`#services/${s.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('service-detail', s.slug);
                }}
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <div className="footer-links">
            <a href="#about">{settings.footer_about_label || 'About Us'}</a>
            <a href="#leadership">{settings.footer_leadership_label || 'Leadership'}</a>
            <a href="#technology">{settings.footer_technology_label || 'Technology'}</a>
            <a href="#industries">{settings.footer_industries_label || 'Industries'}</a>
            <a href="#companies">{settings.footer_why_label || 'Why Us'}</a>
            <a href="#contact">{settings.footer_contact_label || 'Contact'}</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>{settings.copyright_year || '© 2025 ABC AI System Limited. All Rights Reserved.'}</span>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
            <a
              href="#login"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('admin-login');
              }}
            >
              Admin Panel
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
