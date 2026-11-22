import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import About from '../components/About';
import Services from '../components/Services';
import Products from '../components/Products';
import Technology from '../components/Technology';
import Industries from '../components/Industries';
import Leadership from '../components/Leadership';
import Methodology from '../components/Methodology';
import Contact from '../components/Contact';

export default function Home({ onSelectService, onNavigate }) {
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Setup high-performance scroll reveal observer with MutationObserver
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'));
      return () => window.removeEventListener('scroll', handleScroll);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    const observeAll = () => {
      const els = document.querySelectorAll('.reveal:not(.revealed)');
      els.forEach((el) => observer.observe(el));
    };

    observeAll();

    // Observe future DOM insertions from async API data loads
    const mo = new MutationObserver(() => {
      observeAll();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <main>
        <Hero onNavigate={onNavigate} />
        <Stats />
        <About />
        <Services onSelectService={onSelectService} />
        <Products />
        <Technology />
        <Industries />
        <Leadership />
        <Methodology />
        <Contact />
      </main>

      <button
        className={`back-to-top ${showBackTop ? 'visible' : ''}`}
        aria-label="Back to top"
        onClick={scrollToTop}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
