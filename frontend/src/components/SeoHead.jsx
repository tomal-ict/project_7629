import { useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { initAnalytics, trackPageView } from '../utils/analytics';

function upsertMeta(attrName, attrValue, content) {
  if (!content) {
    const existing = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (existing && existing.dataset.managedSeo === '1') {
      existing.remove();
    }
    return;
  }

  let tag = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attrName, attrValue);
    tag.dataset.managedSeo = '1';
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let link = document.head.querySelector(`link[rel="${rel}"]`);
  if (!href) {
    if (link && link.dataset.managedSeo === '1') link.remove();
    return;
  }
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    link.dataset.managedSeo = '1';
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function resolveAbsoluteUrl(pathOrUrl, baseOrigin) {
  const val = (pathOrUrl || '').trim();
  if (!val) return '';
  if (/^https?:\/\//i.test(val)) return val;
  const clean = val.replace(/^\.\//, '').replace(/^\/+/, '');
  return `${baseOrigin.replace(/\/+$/, '')}/${clean}`;
}

export default function SeoHead({ currentView, selectedServiceSlug, activeSection = 'home' }) {
  const { settings, allServices } = useSite();

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (currentView === 'admin-dashboard' || currentView === 'admin-login') {
      document.title = currentView === 'admin-login' ? 'Admin Login | ABC AI System' : 'Admin Panel | ABC AI System';
      upsertMeta('name', 'robots', 'noindex, nofollow');
      return;
    }

    const originBase = (settings.seo_canonical_base || '').trim().replace(/\/+$/, '') ||
      (window.location.origin + window.location.pathname.replace(/\/(about|services(\/.*)?|products|technology|industries|leadership|methodology|contact)\/?$/i, '').replace(/\/+$/, ''));

    const siteName = settings.company_name || 'ABC AI System Limited';
    const defaultTitle = settings.seo_site_title || `Architecting Sovereign Enterprise Intelligence — ${siteName}`;
    const defaultDesc = settings.seo_meta_description || 'Pioneering sovereign artificial intelligence for mission-critical enterprise infrastructure — zero hallucinations, absolute on-premise containment, and deterministic operational precision.';
    const defaultKeywords = settings.seo_meta_keywords || 'Sovereign AI, Enterprise LLM, On-Premise AI, Cyber-Robotics, AI Bangladesh, ABC AI System';
    const defaultRobots = settings.seo_robots || 'index, follow';
    const defaultOgImage = resolveAbsoluteUrl(settings.seo_og_image || settings.site_logo || './images/logo.svg', originBase);

    let title = defaultTitle;
    let description = defaultDesc;
    let keywords = defaultKeywords;
    let robots = defaultRobots;
    let ogImage = defaultOgImage;
    let canonical = `${originBase}/`;

    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': settings.seo_schema_org_type || 'Organization',
        name: siteName,
        url: originBase,
        logo: resolveAbsoluteUrl(settings.site_logo || './images/logo.svg', originBase),
        email: settings.email || 'contact@abcaisystemltd.com',
        telephone: settings.phone || '',
        sameAs: [settings.linkedin, settings.basis_url, settings.dcci_url].filter(Boolean),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: originBase,
        description: defaultDesc,
      },
    ];

    if (currentView === 'service-detail' && selectedServiceSlug) {
      const svc = (allServices || []).find((s) => s.slug === selectedServiceSlug);
      canonical = `${originBase}/services/${selectedServiceSlug}`;
      if (svc) {
        const rawTitle = svc.seo_title || svc.title;
        title = rawTitle.includes(siteName) ? rawTitle : `${rawTitle} | ${siteName}`;
        description = svc.seo_description || svc.description || defaultDesc;
        keywords = svc.seo_keywords || defaultKeywords;
        const img = svc.seo_og_image || svc.hero_image || settings.seo_og_image;
        ogImage = resolveAbsoluteUrl(img, originBase) || defaultOgImage;

        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: svc.title,
          description,
          provider: { '@type': 'Organization', name: siteName, url: originBase },
          url: canonical,
        });
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${originBase}/` },
            { '@type': 'ListItem', position: 2, name: 'Services', item: `${originBase}/services` },
            { '@type': 'ListItem', position: 3, name: svc.title, item: canonical },
          ],
        });
      }
    } else {
      const sec = activeSection && activeSection !== 'top' ? activeSection : 'home';
      const pageTitle = settings[`seo_${sec}_title`];
      const pageDesc = settings[`seo_${sec}_description`];
      const pageKeywords = settings[`seo_${sec}_keywords`];
      const pageRobots = settings[`seo_${sec}_robots`];
      const pageOgImage = settings[`seo_${sec}_og_image`];

      if (pageTitle) title = pageTitle;
      else if (sec !== 'home') title = `${sec.charAt(0).toUpperCase() + sec.slice(1)} | ${siteName}`;

      if (pageDesc) description = pageDesc;
      if (pageKeywords) keywords = pageKeywords;
      if (pageRobots) robots = pageRobots;
      if (pageOgImage) ogImage = resolveAbsoluteUrl(pageOgImage, originBase);

      canonical = sec === 'home' ? `${originBase}/` : `${originBase}/${sec}`;
    }

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'keywords', keywords);
    upsertMeta('name', 'author', settings.seo_author || siteName);
    upsertMeta('name', 'robots', robots);
    upsertLink('canonical', canonical);

    upsertMeta('property', 'og:type', settings.seo_og_type || 'website');
    upsertMeta('property', 'og:site_name', siteName);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', ogImage);

    upsertMeta('name', 'twitter:card', settings.seo_twitter_card || 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);
    upsertMeta('name', 'twitter:site', settings.seo_twitter_handle || '');

    upsertMeta('name', 'google-site-verification', settings.google_site_verification || '');
    upsertMeta('name', 'msvalidate.01', settings.bing_site_verification || '');

    let ldEl = document.getElementById('abc-seo-jsonld');
    if (!ldEl) {
      ldEl = document.createElement('script');
      ldEl.type = 'application/ld+json';
      ldEl.id = 'abc-seo-jsonld';
      document.head.appendChild(ldEl);
    }
    ldEl.textContent = JSON.stringify(schemas);

    initAnalytics(settings);
    trackPageView({
      title,
      path: window.location.pathname + window.location.hash,
      location: window.location.href,
    });
  }, [settings, allServices, currentView, selectedServiceSlug, activeSection]);

  return null;
}
