import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onNavigate, currentView }) {
  const { settings } = useSite();
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (hash) => {
    setMobileOpen(false);
    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="nav-logo"
        >
          <img src="./images/logo.svg" alt={settings.company_name || 'ABC AI System'} />
        </a>
        <span className="nav-divider"></span>
        <nav className={`nav-links-wrapper ${mobileOpen ? 'open' : ''}`}>
          <a href="#about" onClick={() => handleNavClick('#about')}>
            About
          </a>
          <a href="#products" onClick={() => handleNavClick('#products')}>
            Products
          </a>
          <a href="#services" onClick={() => handleNavClick('#services')}>
            Services
          </a>
          <a href="#technology" onClick={() => handleNavClick('#technology')}>
            Technology
          </a>
          <a href="#leadership" onClick={() => handleNavClick('#leadership')}>
            Leadership
          </a>
          <a href="#contact" onClick={() => handleNavClick('#contact')}>
            Contact
          </a>

          {isAuthenticated ? (
            <a
              href="#admin"
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                onNavigate('admin-dashboard');
              }}
              style={{ color: '#2563eb', fontWeight: 700 }}
            >
              Admin Panel
            </a>
          ) : (
            <a
              href="#login"
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                onNavigate('admin-login');
              }}
              style={{ opacity: 0.7 }}
            >
              Login
            </a>
          )}
        </nav>

        <a href={`tel:${settings.phone_tel || '+8801799920150'}`} className="nav-cta">
          <span className="btn">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Call Us
          </span>
        </a>

        <button
          className="nav-hamburger"
          aria-label="Open menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
