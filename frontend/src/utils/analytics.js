/**
 * Client-side analytics & marketing pixel loader (GA4, GTM, Microsoft Clarity, Meta Pixel).
 */

const loadedScripts = new Set();

function injectScriptOnce(id, src, innerHTML = '') {
  if (typeof document === 'undefined') return;
  if (loadedScripts.has(id) || document.getElementById(id)) return;

  const s = document.createElement('script');
  s.id = id;
  if (src) {
    s.async = true;
    s.src = src;
  }
  if (innerHTML) {
    s.textContent = innerHTML;
  }
  document.head.appendChild(s);
  loadedScripts.add(id);
}

export function initAnalytics(settings = {}) {
  if (typeof window === 'undefined') return;

  const ga4Id = (settings.ga4_measurement_id || '').trim();
  if (ga4Id && /^G-[A-Z0-9]+$/i.test(ga4Id)) {
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
    }
    injectScriptOnce(
      `abc-ga4-src-${ga4Id}`,
      `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`
    );
    if (!loadedScripts.has(`abc-ga4-cfg-${ga4Id}`)) {
      window.gtag('config', ga4Id, { send_page_view: false });
      loadedScripts.add(`abc-ga4-cfg-${ga4Id}`);
    }
  }

  const gtmId = (settings.gtm_container_id || '').trim();
  if (gtmId && /^GTM-[A-Z0-9]+$/i.test(gtmId)) {
    window.dataLayer = window.dataLayer || [];
    injectScriptOnce(
      `abc-gtm-${gtmId}`,
      '',
      `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`
    );
  }

  const clarityId = (settings.clarity_project_id || '').trim();
  if (clarityId && /^[a-z0-9]+$/i.test(clarityId)) {
    injectScriptOnce(
      `abc-clarity-${clarityId}`,
      '',
      `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`
    );
  }

  const pixelId = (settings.facebook_pixel_id || '').trim();
  if (pixelId && /^\d+$/.test(pixelId)) {
    injectScriptOnce(
      `abc-fbq-${pixelId}`,
      '',
      `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');`
    );
  }
}

export function trackPageView({ title, path, location }) {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_title: title,
      page_path: path,
      page_location: location,
    });
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: 'virtual_pageview',
      page_title: title,
      page_path: path,
      page_location: location,
    });
  }

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }
}

export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...params });
  }

  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, params);
  }
}
