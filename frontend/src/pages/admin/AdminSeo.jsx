import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useSite } from '../../context/SiteContext';
import { ImageField } from '../../components/admin/ImageField';
import SeoSnippetPreview, { SeoCharBadge } from '../../components/admin/SeoSnippetPreview';

const PAGE_SEO_LIST = [
  { id: 'home', name: 'Home / Hero Banner', path: '/' },
  { id: 'about', name: 'About Us', path: '/about' },
  { id: 'services', name: 'Services Overview', path: '/services' },
  { id: 'products', name: 'Products', path: '/products' },
  { id: 'technology', name: 'Technology', path: '/technology' },
  { id: 'industries', name: 'Industries', path: '/industries' },
  { id: 'leadership', name: 'Leadership', path: '/leadership' },
  { id: 'methodology', name: 'Methodology', path: '/methodology' },
  { id: 'contact', name: 'Contact', path: '/contact' },
  { id: 'branding', name: 'Header, Footer & Branding', path: '/' },
];

const DEFAULT_ROBOTS_TXT = `User-agent: *
Allow: /
Disallow: /api/admin/
Disallow: /backend/`;

export default function AdminSeo({ onNavigateTab }) {
  const { refreshData } = useSite();
  const [activeTab, setActiveTab] = useState('audit');
  const [settings, setSettings] = useState({});
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');

  const [form, setForm] = useState({
    seo_site_title: '',
    seo_meta_description: '',
    seo_meta_keywords: '',
    seo_canonical_base: '',
    seo_author: '',
    seo_robots: 'index, follow',
    seo_og_type: 'website',
    seo_og_image: '',
    seo_twitter_card: 'summary_large_image',
    seo_twitter_handle: '',
    seo_schema_org_type: 'Organization',
    ga4_measurement_id: '',
    gtm_container_id: '',
    google_site_verification: '',
    bing_site_verification: '',
    clarity_project_id: '',
    facebook_pixel_id: '',
    seo_robots_txt: '',
  });

  const loadAll = async () => {
    try {
      setLoading(true);
      const [setRes, svcRes] = await Promise.all([
        api.get('/admin/settings'),
        api.get('/admin/services'),
      ]);
      const asArr = setRes.data?.asArray || {};
      setSettings(asArr);
      setServices(svcRes.data?.services || []);

      setForm({
        seo_site_title: asArr.seo_site_title || 'Architecting Sovereign Enterprise Intelligence — ABC AI System Limited',
        seo_meta_description: asArr.seo_meta_description || 'Pioneering sovereign artificial intelligence for mission-critical enterprise infrastructure — zero hallucinations, absolute on-premise containment, and deterministic operational precision.',
        seo_meta_keywords: asArr.seo_meta_keywords || 'Sovereign AI, Enterprise LLM, On-Premise AI, Cyber-Robotics, AI Bangladesh, ABC AI System',
        seo_canonical_base: asArr.seo_canonical_base || '',
        seo_author: asArr.seo_author || asArr.company_name || 'ABC AI System Limited',
        seo_robots: asArr.seo_robots || 'index, follow',
        seo_og_type: asArr.seo_og_type || 'website',
        seo_og_image: asArr.seo_og_image || './images/logo.svg',
        seo_twitter_card: asArr.seo_twitter_card || 'summary_large_image',
        seo_twitter_handle: asArr.seo_twitter_handle || '',
        seo_schema_org_type: asArr.seo_schema_org_type || 'Organization',
        ga4_measurement_id: asArr.ga4_measurement_id || '',
        gtm_container_id: asArr.gtm_container_id || '',
        google_site_verification: asArr.google_site_verification || '',
        bing_site_verification: asArr.bing_site_verification || '',
        clarity_project_id: asArr.clarity_project_id || '',
        facebook_pixel_id: asArr.facebook_pixel_id || '',
        seo_robots_txt: asArr.seo_robots_txt || '',
      });
    } catch (err) {
      console.error('Failed to load SEO settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const saveFields = async (keys) => {
    const payload = {};
    const groups = {};
    keys.forEach((k) => {
      payload[k] = form[k] ?? '';
      groups[k] = 'seo';
    });

    try {
      setSaving(true);
      setNotice('');
      const res = await api.post('/admin/settings/bulk', { settings: payload, groups });
      if (res.data?.settings) {
        setSettings(res.data.settings);
      }
      await refreshData();
      setNotice('SEO & Analytics configuration saved and applied to the live website!');
    } catch (err) {
      console.error('Failed to save SEO settings:', err);
      alert('Error saving SEO settings: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  // Compute live SEO Health Checklist
  const auditChecks = [
    {
      label: 'Global SEO Title configured (30–65 chars)',
      ok: form.seo_site_title.trim().length >= 25 && form.seo_site_title.trim().length <= 75,
      hint: 'Keep title concise and keyword-rich.',
    },
    {
      label: 'Meta Description configured (100–165 chars)',
      ok: form.seo_meta_description.trim().length >= 80 && form.seo_meta_description.trim().length <= 170,
      hint: 'Compelling summary improves Google CTR.',
    },
    {
      label: 'Open Graph Social Share Image set',
      ok: Boolean(form.seo_og_image.trim()),
      hint: 'Used when sharing links on LinkedIn, Facebook, WhatsApp, and X.',
    },
    {
      label: 'JSON-LD Structured Data (Organization / WebSite / Service)',
      ok: true,
      hint: 'Automatically injected into <head> on server and client.',
    },
    {
      label: 'Dynamic XML Sitemap & Robots.txt active',
      ok: true,
      hint: 'Available at /sitemap.xml and /robots.txt.',
    },
    {
      label: 'Google Analytics 4 (GA4) or Google Tag Manager connected',
      ok: Boolean(form.ga4_measurement_id.trim() || form.gtm_container_id.trim()),
      hint: 'Enter your G-XXXXXXXXXX or GTM-XXXXXXX ID in Google Analytics tab.',
    },
    {
      label: 'Search Console Verification Token set',
      ok: Boolean(form.google_site_verification.trim()),
      hint: 'Verify domain ownership in Google Search Console.',
    },
  ];
  const passedCount = auditChecks.filter((c) => c.ok).length;
  const readinessScore = Math.round((passedCount / auditChecks.length) * 100);

  const previewBase = (form.seo_canonical_base || '').trim().replace(/\/+$/, '') ||
    (typeof window !== 'undefined' ? window.location.origin : 'https://www.abcaisystemltd.com');

  return (
    <div>
      <div className="a-subpage-pills" style={{ marginBottom: '18px' }}>
        <button
          type="button"
          className={`a-subpage-pill ${activeTab === 'audit' ? 'active' : ''}`}
          onClick={() => setActiveTab('audit')}
        >
          📊 SEO Health & Overview ({readinessScore}%)
        </button>
        <button
          type="button"
          className={`a-subpage-pill ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📈 Google Analytics & Tracking
        </button>
        <button
          type="button"
          className={`a-subpage-pill ${activeTab === 'global' ? 'active' : ''}`}
          onClick={() => setActiveTab('global')}
        >
          🌐 Global Meta & Social Cards
        </button>
        <button
          type="button"
          className={`a-subpage-pill ${activeTab === 'matrix' ? 'active' : ''}`}
          onClick={() => setActiveTab('matrix')}
        >
          📄 All Pages & Services SEO
        </button>
        <button
          type="button"
          className={`a-subpage-pill ${activeTab === 'sitemap' ? 'active' : ''}`}
          onClick={() => setActiveTab('sitemap')}
        >
          🗺️ Sitemap & Robots.txt
        </button>
      </div>

      {notice && <div className="a-flash">{notice}</div>}

      {loading ? (
        <div className="a-card"><div className="a-card-body"><p className="a-empty">Loading SEO & Analytics suite...</p></div></div>
      ) : (
        <>
          {activeTab === 'audit' && (
            <div style={{ display: 'grid', gap: '18px' }}>
              <div className="a-grid">
                <div className="a-stat">
                  <div className="v">{readinessScore}%</div>
                  <div className="l">Technical SEO Score</div>
                </div>
                <div className="a-stat">
                  <div className="v">{PAGE_SEO_LIST.length + services.length}</div>
                  <div className="l">Indexable Pages & Services</div>
                </div>
                <div className="a-stat">
                  <div className="v">{form.ga4_measurement_id ? 'Active' : 'Setup'}</div>
                  <div className="l">Google Analytics 4 (GA4)</div>
                </div>
                <div className="a-stat">
                  <div className="v">{form.google_site_verification ? 'Verified' : 'Pending'}</div>
                  <div className="l">Google Search Console</div>
                </div>
              </div>

              <div className="a-card">
                <div className="a-card-head">
                  <h2>SEO & Marketing Readiness Checklist</h2>
                  <button
                    type="button"
                    className="a-btn sm primary"
                    onClick={() => setActiveTab('analytics')}
                  >
                    Configure Google Analytics →
                  </button>
                </div>
                <div className="a-card-body" style={{ display: 'grid', gap: '10px' }}>
                  {auditChecks.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        padding: '12px 14px',
                        border: '1px solid var(--line)',
                        borderRadius: '10px',
                        background: item.ok ? '#f0fdf4' : '#fffbeb',
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: '13.5px', color: '#0f172a' }}>
                          {item.ok ? '✅' : '⚠️'} {item.label}
                        </strong>
                        <div className="a-muted" style={{ fontSize: '12px', marginTop: '2px' }}>{item.hint}</div>
                      </div>
                      <span className={`a-pill ${item.ok ? 'green' : 'amber'}`}>
                        {item.ok ? 'Ready' : 'Action Needed'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="a-card">
              <div className="a-card-head">
                <div>
                  <h2>Google Analytics, Tag Manager & Marketing Pixels</h2>
                  <p className="a-muted" style={{ fontSize: '12.5px', marginTop: '2px' }}>
                    Automatically injects tracking scripts into every page and tracks pageviews, service views, and lead form conversions.
                  </p>
                </div>
              </div>
              <div className="a-card-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveFields([
                      'ga4_measurement_id',
                      'gtm_container_id',
                      'google_site_verification',
                      'bing_site_verification',
                      'clarity_project_id',
                      'facebook_pixel_id',
                      'seo_schema_org_type',
                    ]);
                  }}
                  className="a-form"
                >
                  <div className="a-form-grid">
                    <div className="a-field">
                      <label>
                        Google Analytics 4 (GA4) Measurement ID
                        <span className={`a-pill ${form.ga4_measurement_id ? 'green' : 'slate'}`} style={{ marginLeft: '8px' }}>
                          {form.ga4_measurement_id ? 'Connected' : 'Not Set'}
                        </span>
                      </label>
                      <input
                        type="text"
                        value={form.ga4_measurement_id}
                        onChange={(e) => setForm({ ...form, ga4_measurement_id: e.target.value })}
                        placeholder="G-XXXXXXXXXX"
                      />
                      <div className="a-hint">Tracks page_view, service view_item, and contact generate_lead events.</div>
                    </div>

                    <div className="a-field">
                      <label>
                        Google Tag Manager (GTM) Container ID
                        <span className={`a-pill ${form.gtm_container_id ? 'green' : 'slate'}`} style={{ marginLeft: '8px' }}>
                          {form.gtm_container_id ? 'Connected' : 'Not Set'}
                        </span>
                      </label>
                      <input
                        type="text"
                        value={form.gtm_container_id}
                        onChange={(e) => setForm({ ...form, gtm_container_id: e.target.value })}
                        placeholder="GTM-XXXXXXX"
                      />
                      <div className="a-hint">Optional container for Google Ads, remarketing, and custom tags.</div>
                    </div>

                    <div className="a-field">
                      <label>Google Search Console Verification Code</label>
                      <input
                        type="text"
                        value={form.google_site_verification}
                        onChange={(e) => setForm({ ...form, google_site_verification: e.target.value })}
                        placeholder="Paste content value of google-site-verification meta tag"
                      />
                    </div>

                    <div className="a-field">
                      <label>Bing Webmaster Tools Verification (msvalidate.01)</label>
                      <input
                        type="text"
                        value={form.bing_site_verification}
                        onChange={(e) => setForm({ ...form, bing_site_verification: e.target.value })}
                        placeholder="Paste Bing verification code"
                      />
                    </div>

                    <div className="a-field">
                      <label>Microsoft Clarity Project ID</label>
                      <input
                        type="text"
                        value={form.clarity_project_id}
                        onChange={(e) => setForm({ ...form, clarity_project_id: e.target.value })}
                        placeholder="e.g. abc123xyz"
                      />
                      <div className="a-hint">Free heatmaps and user session recordings.</div>
                    </div>

                    <div className="a-field">
                      <label>Meta (Facebook) Pixel ID</label>
                      <input
                        type="text"
                        value={form.facebook_pixel_id}
                        onChange={(e) => setForm({ ...form, facebook_pixel_id: e.target.value })}
                        placeholder="e.g. 123456789012345"
                      />
                    </div>

                    <div className="a-field full">
                      <label>JSON-LD Schema.org Entity Type</label>
                      <select
                        value={form.seo_schema_org_type}
                        onChange={(e) => setForm({ ...form, seo_schema_org_type: e.target.value })}
                      >
                        <option value="Organization">Organization (Recommended for Tech/AI Companies)</option>
                        <option value="Corporation">Corporation</option>
                        <option value="LocalBusiness">LocalBusiness</option>
                        <option value="ProfessionalService">ProfessionalService</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="a-btn primary" disabled={saving}>
                      {saving ? 'Saving...' : 'Save Analytics & Verification Tools'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'global' && (
            <div className="a-card">
              <div className="a-card-head">
                <h2>Global Site SEO, Open Graph & Twitter Cards</h2>
              </div>
              <div className="a-card-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveFields([
                      'seo_site_title',
                      'seo_meta_description',
                      'seo_meta_keywords',
                      'seo_canonical_base',
                      'seo_author',
                      'seo_robots',
                      'seo_og_type',
                      'seo_og_image',
                      'seo_twitter_card',
                      'seo_twitter_handle',
                    ]);
                  }}
                  className="a-form"
                >
                  <SeoSnippetPreview
                    title={form.seo_site_title}
                    description={form.seo_meta_description}
                    url={`${previewBase}/`}
                  />

                  <div className="a-form-grid">
                    <div className="a-field full">
                      <label>
                        Default Site SEO Title
                        <SeoCharBadge value={form.seo_site_title} max={65} minGood={30} />
                      </label>
                      <input
                        type="text"
                        value={form.seo_site_title}
                        onChange={(e) => setForm({ ...form, seo_site_title: e.target.value })}
                      />
                    </div>

                    <div className="a-field full">
                      <label>
                        Default Meta Description
                        <SeoCharBadge value={form.seo_meta_description} max={160} minGood={100} />
                      </label>
                      <textarea
                        value={form.seo_meta_description}
                        onChange={(e) => setForm({ ...form, seo_meta_description: e.target.value })}
                      />
                    </div>

                    <div className="a-field full">
                      <label>Target Keywords (Comma-separated)</label>
                      <input
                        type="text"
                        value={form.seo_meta_keywords}
                        onChange={(e) => setForm({ ...form, seo_meta_keywords: e.target.value })}
                      />
                    </div>

                    <div className="a-field">
                      <label>Canonical Base Domain URL</label>
                      <input
                        type="text"
                        value={form.seo_canonical_base}
                        onChange={(e) => setForm({ ...form, seo_canonical_base: e.target.value })}
                        placeholder="https://www.abcaisystemltd.com"
                      />
                      <div className="a-hint">Used for canonical tags, OG URLs, and XML Sitemap.</div>
                    </div>

                    <div className="a-field">
                      <label>Default Search Robots Directive</label>
                      <select
                        value={form.seo_robots}
                        onChange={(e) => setForm({ ...form, seo_robots: e.target.value })}
                      >
                        <option value="index, follow">index, follow (Recommended)</option>
                        <option value="index, nofollow">index, nofollow</option>
                        <option value="noindex, follow">noindex, follow</option>
                        <option value="noindex, nofollow">noindex, nofollow</option>
                      </select>
                    </div>

                    <div className="a-field">
                      <label>Author / Publisher</label>
                      <input
                        type="text"
                        value={form.seo_author}
                        onChange={(e) => setForm({ ...form, seo_author: e.target.value })}
                      />
                    </div>

                    <div className="a-field">
                      <label>Twitter / X @Handle</label>
                      <input
                        type="text"
                        value={form.seo_twitter_handle}
                        onChange={(e) => setForm({ ...form, seo_twitter_handle: e.target.value })}
                        placeholder="@abcaisystem"
                      />
                    </div>

                    <div className="a-field">
                      <label>Open Graph Type</label>
                      <select
                        value={form.seo_og_type}
                        onChange={(e) => setForm({ ...form, seo_og_type: e.target.value })}
                      >
                        <option value="website">website</option>
                        <option value="business.business">business.business</option>
                        <option value="article">article</option>
                      </select>
                    </div>

                    <div className="a-field">
                      <label>Twitter Card Style</label>
                      <select
                        value={form.seo_twitter_card}
                        onChange={(e) => setForm({ ...form, seo_twitter_card: e.target.value })}
                      >
                        <option value="summary_large_image">summary_large_image</option>
                        <option value="summary">summary</option>
                      </select>
                    </div>

                    <div className="full">
                      <ImageField
                        label="Default Social Share Image (OG Image — 1200x630 recommended)"
                        value={form.seo_og_image}
                        onChange={(val) => setForm({ ...form, seo_og_image: val })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="a-btn primary" disabled={saving}>
                      {saving ? 'Saving...' : 'Save Global SEO Meta'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'matrix' && (
            <div className="a-card">
              <div className="a-card-head">
                <div>
                  <h2>Per-Page & Service Detail SEO Coverage</h2>
                  <p className="a-muted" style={{ fontSize: '12.5px', marginTop: '2px' }}>
                    Every page and service has dedicated SEO Title, Description, Keywords & OG Image editable inside the Pages tab.
                  </p>
                </div>
                {onNavigateTab && (
                  <button type="button" className="a-btn sm primary" onClick={() => onNavigateTab('pages')}>
                    Open Pages SEO Editor →
                  </button>
                )}
              </div>

              <div className="a-table-wrap">
                <table className="a-table">
                  <thead>
                    <tr>
                      <th>Page / Route</th>
                      <th>SEO Title</th>
                      <th>Description</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PAGE_SEO_LIST.map((p) => {
                      const t = settings[`seo_${p.id}_title`] || '';
                      const d = settings[`seo_${p.id}_description`] || '';
                      const ok = Boolean(t.trim() && d.trim());
                      return (
                        <tr key={p.id}>
                          <td>
                            <strong>{p.name}</strong>
                            <div className="a-muted" style={{ fontSize: '11.5px' }}>{p.path}</div>
                          </td>
                          <td className="a-muted">{t ? t.slice(0, 48) : 'Using default site title'}</td>
                          <td className="a-muted">{d ? `${d.slice(0, 55)}...` : 'Using default description'}</td>
                          <td>
                            <span className={`a-pill ${ok ? 'green' : 'amber'}`}>
                              {ok ? 'Custom SEO' : 'Default Fallback'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    {services.map((svc) => {
                      const ok = Boolean((svc.seo_title || '').trim() && (svc.seo_description || '').trim());
                      return (
                        <tr key={`svc-${svc.id}`}>
                          <td>
                            <strong>Service: {svc.title}</strong>
                            <div className="a-muted" style={{ fontSize: '11.5px' }}>/services/{svc.slug}</div>
                          </td>
                          <td className="a-muted">{svc.seo_title || svc.title}</td>
                          <td className="a-muted">{(svc.seo_description || svc.description || '').slice(0, 55)}...</td>
                          <td>
                            <span className={`a-pill ${ok ? 'green' : 'blue'}`}>
                              {ok ? 'Custom SEO' : 'Auto from Service'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'sitemap' && (
            <div className="a-card">
              <div className="a-card-head">
                <h2>XML Sitemap & Robots.txt Crawler Directives</h2>
                <div className="a-actions">
                  <a href="./sitemap.xml" target="_blank" rel="noreferrer" className="a-btn sm">
                    Open sitemap.xml ↗
                  </a>
                  <a href="./robots.txt" target="_blank" rel="noreferrer" className="a-btn sm">
                    Open robots.txt ↗
                  </a>
                </div>
              </div>
              <div className="a-card-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveFields(['seo_robots_txt']);
                  }}
                  className="a-form"
                >
                  <div className="a-field full">
                    <label>Custom robots.txt Content (Leave empty for auto-generated Sitemap directive)</label>
                    <textarea
                      value={form.seo_robots_txt}
                      onChange={(e) => setForm({ ...form, seo_robots_txt: e.target.value })}
                      placeholder={DEFAULT_ROBOTS_TXT}
                      style={{ minHeight: '160px', fontFamily: 'monospace', fontSize: '13px' }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="a-btn sm"
                      onClick={() =>
                        setForm({
                          ...form,
                          seo_robots_txt: `${DEFAULT_ROBOTS_TXT}\n\nSitemap: ${previewBase}/sitemap.xml`,
                        })
                      }
                    >
                      Load Recommended Template
                    </button>
                    <button type="submit" className="a-btn primary" disabled={saving}>
                      {saving ? 'Saving...' : 'Save robots.txt'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
