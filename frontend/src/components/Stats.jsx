import React, { useState, useEffect, useRef } from 'react';
import { useSite } from '../context/SiteContext';

function AnimatedCounter({ value }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Extract numeric part and suffix
    const str = String(value || '');
    const match = str.match(/^([<>]?\s*)(\d+(\.\d+)?)(.*)$/);
    if (!match) {
      setDisplay(str);
      return;
    }

    const prefix = match[1] || '';
    const target = parseFloat(match[2]);
    const suffix = match[4] || '';
    const isDecimal = match[2].includes('.');
    const decimals = isDecimal ? match[2].split('.')[1].length : 0;

    const startAnimation = () => {
      if (animatedRef.current) return;
      animatedRef.current = true;
      const duration = 1600;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        // Easing out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = target * ease;
        const formatted = isDecimal ? current.toFixed(decimals) : Math.round(current);
        setDisplay(`${prefix}${formatted}${suffix}`);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setDisplay(str);
        }
      };

      requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      startAnimation();
    }
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

export default function Stats() {
  const { stats } = useSite();

  if (!stats || stats.length === 0) return null;

  return (
    <div className="stats-band">
      {stats.map((stat, i) => (
        <div
          key={stat.id || i}
          className="stat-card reveal"
          style={{ transitionDelay: `${i * 90}ms` }}
        >
          <div className="stat-value">
            <AnimatedCounter value={stat.value} />
          </div>
          <div className="stat-label">{stat.label}</div>
          {stat.sub && <div className="stat-sub">{stat.sub}</div>}
        </div>
      ))}
    </div>
  );
}
