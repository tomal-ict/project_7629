import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useSite } from '../../context/SiteContext';
import { ImageField } from '../../components/admin/ImageField';
import PageResourcePanel from '../../components/admin/PageResourcePanel';
import ServicePagesEditor from '../../components/admin/ServicePagesEditor';
import ProductPagesEditor from '../../components/admin/ProductPagesEditor';
import SeoSnippetPreview, { SeoCharBadge } from '../../components/admin/SeoSnippetPreview';

const PAGE_DEFS = [
  {
    id: 'home',
    name: 'Home / Hero Banner',
    icon: '🏠',
    hash: '#top',
    description: 'Main landing banner headline, call-to-action buttons, AI Core labels, banner visual, and key hero statistics.',
    fields: [
      { key: 'hero_badge', label: 'Top Badge Text', group: 'hero', full: true },
      { key: 'hero_title_1', label: 'Headline Word 1', group: 'hero' },
      { key: 'hero_title_2', label: 'Headline Word 2', group: 'hero' },
      { key: 'hero_title_3', label: 'Headline Word 3 (Gradient)', group: 'hero', full: true },
      { key: 'hero_sub', label: 'Hero Subtitle / Description', group: 'hero', type: 'textarea', full: true },
      { key: 'hero_cta_primary', label: 'Primary Button Label', group: 'hero' },
      { key: 'hero_cta_secondary', label: 'Secondary Button Label', group: 'hero' },
      { key: 'hero_core_label', label: 'Core Badge Title', group: 'hero', placeholder: 'AI CORE' },
      { key: 'hero_core_status', label: 'Core Status Label', group: 'hero', placeholder: 'ONLINE' },
      { key: 'hero_float_1', label: 'Floating Pill 1', group: 'hero' },
      { key: 'hero_float_2', label: 'Floating Pill 2', group: 'hero' },
      { key: 'hero_float_3', label: 'Floating Pill 3', group: 'hero' },
      { key: 'hero_float_4', label: 'Floating Pill 4', group: 'hero' },
      { key: 'hero_float_5', label: 'Floating Pill 5', group: 'hero', full: true },
      {
        key: 'hero_image',
        label: 'Custom Hero Banner Image',
        group: 'hero',
        type: 'image',
        hint: 'Optional — leave empty to keep the live 3D Neural Core animation',
        full: true,
      },
    ],
    resources: [
      {
        title: 'Hero Statistics Bar',
        description: '4 KPI metrics shown directly below the hero banner.',
        endpoint: '/admin/statistics',
        resourceKey: 'statistics',
        fields: [
          { name: 'label', label: 'Metric Label', required: true },
          { name: 'value', label: 'Metric Value (e.g. 20+, 100%)', required: true },
          { name: 'sub', label: 'Sub-caption', full: true },
          { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
        ],
      },
    ],
  },
  {
    id: 'about',
    name: 'About Us',
    icon: '🧠',
    hash: '#about',
    description: 'Company overview, visual image, vision & mission cards, core guiding principles, and enterprise clients.',
    fields: [
      { key: 'about_tag', label: 'Section Tag', group: 'about' },
      { key: 'about_title', label: 'Section Title', group: 'about', full: true },
      { key: 'about_body', label: 'About Description', group: 'about', type: 'textarea', full: true },
      { key: 'about_point_1', label: 'Bullet Point 1', group: 'about', full: true },
      { key: 'about_point_2', label: 'Bullet Point 2', group: 'about', full: true },
      { key: 'about_point_3', label: 'Bullet Point 3', group: 'about', full: true },
      {
        key: 'about_image',
        label: 'About Visual Image',
        group: 'about',
        type: 'image',
        defaultPreview: './images/brain.svg',
        hint: 'Displayed in the About section right-hand card',
        full: true,
      },
      { key: 'about_image_caption', label: 'Image Overlay Title', group: 'about' },
      { key: 'about_image_sub', label: 'Image Overlay Subtitle', group: 'about' },
      { key: 'vision_title', label: 'Vision Card Title', group: 'about' },
      { key: 'mission_title', label: 'Mission Card Title', group: 'about' },
      { key: 'vision_text', label: 'Vision Statement', group: 'about', type: 'textarea', full: true },
      { key: 'mission_text', label: 'Mission Statement', group: 'about', type: 'textarea', full: true },
      { key: 'values_tag', label: 'Core Principles Tag', group: 'about' },
      { key: 'values_title', label: 'Core Principles Title', group: 'about' },
      { key: 'clients_tag', label: 'Clients Tag', group: 'about' },
      { key: 'clients_title', label: 'Clients Title', group: 'about' },
      { key: 'pilots_title', label: 'Pilots Row Title', group: 'about', full: true },
    ],
    resources: [
      {
        title: 'Core Principles / Values',
        description: 'Cards shown under Guiding Principles.',
        endpoint: '/admin/core-values',
        resourceKey: 'core_values',
        fields: [
          { name: 'title', label: 'Principle Title', required: true },
          { name: 'icon', label: 'Emoji / Icon', default: '💡' },
          { name: 'description', label: 'Description', type: 'textarea', required: true, full: true },
          { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
        ],
      },
      {
        title: 'Enterprise Clients & Pilots',
        description: 'Partner logos and names displayed in the About showcase.',
        endpoint: '/admin/clients',
        resourceKey: 'clients',
        fields: [
          { name: 'name', label: 'Organization Name', required: true },
          {
            name: 'group',
            label: 'Group',
            type: 'select',
            options: [
              { value: 'clients', label: 'Official Client' },
              { value: 'pilots', label: 'Running Pilot' },
            ],
            default: 'clients',
            required: true,
          },
          { name: 'logo', label: 'Client Logo Image', type: 'image', hint: 'Optional — shows initials if empty' },
          { name: 'accent', label: 'Accent Color Hex', default: '#0ea5e9' },
          { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
        ],
      },
    ],
  },
  {
    id: 'services',
    name: 'Services & Detail Pages',
    icon: '🛠️',
    hash: '#services',
    description: 'Services section headings plus full editing (content, hero image, gallery images) for every Service detail page.',
    fields: [
      { key: 'services_tag', label: 'Section Tag', group: 'services' },
      { key: 'services_title', label: 'Section Title', group: 'services' },
      { key: 'services_sub', label: 'Section Subtitle', group: 'services', type: 'textarea', full: true },
      { key: 'services_cta', label: 'Consultation Link Label', group: 'services', full: true },
    ],
    customComponent: 'services',
  },
  {
    id: 'products',
    name: 'Products',
    icon: '📦',
    hash: '#products',
    description: 'Flagship turnkey systems slider, ecosystem section headings, and individual product details & images.',
    fields: [
      { key: 'products_tag', label: 'Flagship Tag', group: 'products' },
      { key: 'products_title', label: 'Flagship Title', group: 'products' },
      { key: 'products_sub', label: 'Flagship Subtitle', group: 'products', type: 'textarea', full: true },
      { key: 'more_products_tag', label: 'Ecosystem Tag', group: 'products' },
      { key: 'more_products_title', label: 'Ecosystem Title', group: 'products' },
    ],
    customComponent: 'products',
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: '⚡',
    hash: '#technology',
    description: 'Neural architecture copy, technology domains, comparison table, and strategic advantages.',
    fields: [
      { key: 'tech_tag', label: 'Section Tag', group: 'technology' },
      { key: 'tech_title', label: 'Section Title', group: 'technology' },
      { key: 'tech_sub', label: 'Section Subtitle', group: 'technology', type: 'textarea', full: true },
      { key: 'tech_cmp_tag', label: 'Comparison Tag', group: 'technology' },
      { key: 'tech_cmp_title', label: 'Comparison Title', group: 'technology' },
      { key: 'tech_adv_tag', label: 'Advantages Tag', group: 'technology' },
      { key: 'tech_adv_title', label: 'Advantages Title', group: 'technology' },
    ],
    resources: [
      {
        title: 'Technology Domains',
        description: 'Core engineering capability cards.',
        endpoint: '/admin/tech-domains',
        resourceKey: 'tech_domains',
        fields: [
          { name: 'title', label: 'Domain Title', required: true },
          { name: 'icon', label: 'Icon', default: '🤖' },
          { name: 'description', label: 'Description', type: 'textarea', full: true },
          { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
        ],
      },
      {
        title: 'Comparison Rows (ABC AI vs Generic AI)',
        description: 'Feature-by-feature comparison table rows.',
        endpoint: '/admin/comparisons',
        resourceKey: 'comparisons',
        fields: [
          { name: 'feature', label: 'Feature Name', required: true, full: true },
          { name: 'us_value', label: 'ABC AI System Value', required: true },
          { name: 'them_value', label: 'Generic AI Value', required: true },
          { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
        ],
      },
      {
        title: 'Strategic Advantages',
        description: 'Advantage cards under the comparison table.',
        endpoint: '/admin/advantages',
        resourceKey: 'advantages',
        fields: [
          { name: 'title', label: 'Advantage Title', required: true },
          { name: 'subtitle', label: 'Subtitle' },
          { name: 'icon', label: 'Icon', default: '🚀' },
          { name: 'description', label: 'Description', type: 'textarea', full: true },
          { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
        ],
      },
    ],
  },
  {
    id: 'industries',
    name: 'Industries',
    icon: '🏭',
    hash: '#industries',
    description: 'Sector coverage headings and industry cards.',
    fields: [
      { key: 'industries_tag', label: 'Section Tag', group: 'industries' },
      { key: 'industries_title', label: 'Section Title', group: 'industries' },
      { key: 'industries_sub', label: 'Section Subtitle', group: 'industries', type: 'textarea', full: true },
    ],
    resources: [
      {
        title: 'Industry Verticals',
        description: 'Industry sector cards displayed in the grid.',
        endpoint: '/admin/industries',
        resourceKey: 'industries',
        fields: [
          { name: 'name', label: 'Sector Name', required: true },
          { name: 'icon', label: 'Emoji / Icon', default: '🏢' },
          { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
        ],
      },
    ],
  },
  {
    id: 'leadership',
    name: 'Leadership',
    icon: '👥',
    hash: '#leadership',
    description: 'Leadership headings, founder quote & photo, plus Advisory Board and Core Team member photos & bios.',
    fields: [
      { key: 'leadership_tag', label: 'Section Tag', group: 'leadership' },
      { key: 'leadership_title', label: 'Section Title', group: 'leadership' },
      { key: 'leadership_sub', label: 'Section Subtitle', group: 'leadership', full: true },
      { key: 'advisor_title', label: 'Advisory Board Heading', group: 'leadership' },
      { key: 'core_title', label: 'Core Team Heading', group: 'leadership' },
      { key: 'founder_title', label: 'Founder Section Tag', group: 'leadership' },
      { key: 'founder_quote_by', label: 'Founder Name & Title', group: 'general' },
      {
        key: 'founder_image',
        label: 'Founder Photo',
        group: 'leadership',
        type: 'image',
        hint: 'Optional — displays initials avatar when empty',
        full: true,
      },
      {
        key: 'founder_quotes',
        label: 'Founder Quotes (One paragraph per line)',
        group: 'leadership',
        type: 'json_lines',
        full: true,
      },
    ],
    resources: [
      {
        title: 'Advisors & Core Team Members',
        description: 'Upload member photos and edit bios, roles, and tags.',
        endpoint: '/admin/team-members',
        resourceKey: 'team_members',
        fields: [
          { name: 'name', label: 'Full Name', required: true },
          { name: 'role', label: 'Title / Designation', required: true },
          {
            name: 'category',
            label: 'Board / Group',
            type: 'select',
            options: [
              { value: 'core', label: 'Core Team' },
              { value: 'advisor', label: 'Advisory Board' },
            ],
            default: 'core',
            required: true,
          },
          { name: 'photo', label: 'Member Photo', type: 'image', hint: 'Optional — displays initials if empty' },
          { name: 'bio', label: 'Biography', type: 'textarea', full: true },
          { name: 'tags', label: 'Expertise Tags (One per line)', type: 'array', full: true },
          { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
        ],
      },
    ],
  },
  {
    id: 'methodology',
    name: 'Methodology',
    icon: '🔬',
    hash: '#methodology',
    description: 'Engineering lifecycle headings and 7-stage validation process steps.',
    fields: [
      { key: 'method_tag', label: 'Section Tag', group: 'methodology' },
      { key: 'method_title', label: 'Section Title', group: 'methodology' },
      { key: 'method_sub', label: 'Section Subtitle', group: 'methodology', type: 'textarea', full: true },
    ],
    resources: [
      {
        title: 'Validation Process Steps',
        description: 'Stages shown in the methodology pipeline.',
        endpoint: '/admin/methodologies',
        resourceKey: 'methodologies',
        fields: [
          { name: 'title', label: 'Stage Title', required: true },
          { name: 'icon', label: 'Icon', default: '🔬' },
          { name: 'description', label: 'Description', type: 'textarea', full: true },
          { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
        ],
      },
    ],
  },
  {
    id: 'contact',
    name: 'Contact',
    icon: '✉️',
    hash: '#contact',
    description: 'Contact section copy, form title, office address, email, phone, and social/association links.',
    fields: [
      { key: 'contact_badge', label: 'Section Tag', group: 'contact' },
      { key: 'contact_title', label: 'Section Title', group: 'contact' },
      { key: 'contact_sub', label: 'Section Subtitle', group: 'contact', type: 'textarea', full: true },
      { key: 'contact_form_title', label: 'Form Card Title', group: 'contact' },
      { key: 'contact_cta', label: 'Submit Button Label', group: 'contact' },
      { key: 'contact_head_label', label: 'Address Label', group: 'contact' },
      { key: 'address', label: 'Corporate Address', group: 'general', full: true },
      { key: 'contact_email_label', label: 'Email Card Label', group: 'contact' },
      { key: 'email', label: 'Primary Email', group: 'general' },
      { key: 'email_info', label: 'Secondary Email', group: 'general' },
      { key: 'contact_phone_label', label: 'Phone Card Label', group: 'contact' },
      { key: 'phone', label: 'Display Phone', group: 'general' },
      { key: 'phone_tel', label: 'Clickable Tel Number', group: 'general' },
      { key: 'contact_follow_label', label: 'Social Label', group: 'contact' },
      { key: 'contact_follow_linkedin', label: 'LinkedIn Button Text', group: 'contact' },
      { key: 'linkedin', label: 'LinkedIn URL', group: 'general', full: true },
      { key: 'contact_member_label', label: 'Membership Label', group: 'contact' },
      { key: 'basis_url', label: 'BASIS URL', group: 'general' },
      { key: 'dcci_url', label: 'DCCI URL', group: 'general' },
    ],
  },
  {
    id: 'branding',
    name: 'Header, Footer & Logo',
    icon: '🎨',
    hash: '#top',
    description: 'Global site logo, company name, website URL, copyright notice, and footer navigation labels.',
    fields: [
      {
        key: 'site_logo',
        label: 'Site Logo (Navbar, Footer & Admin)',
        group: 'general',
        type: 'image',
        defaultPreview: './images/logo.svg',
        hint: 'Defaults to ./images/logo.svg when empty',
        full: true,
      },
      { key: 'company_name', label: 'Company Name', group: 'general' },
      { key: 'company_tagline', label: 'Company Tagline', group: 'general' },
      { key: 'website', label: 'Website URL', group: 'general' },
      { key: 'copyright_year', label: 'Copyright Line', group: 'general' },
      { key: 'footer_tagline', label: 'Footer Brand Summary', group: 'footer', type: 'textarea', full: true },
      { key: 'footer_about_label', label: 'Footer About Link', group: 'footer' },
      { key: 'footer_leadership_label', label: 'Footer Leadership Link', group: 'footer' },
      { key: 'footer_technology_label', label: 'Footer Technology Link', group: 'footer' },
      { key: 'footer_industries_label', label: 'Footer Industries Link', group: 'footer' },
      { key: 'footer_why_label', label: 'Footer Why Us Link', group: 'footer' },
      { key: 'footer_contact_label', label: 'Footer Contact Link', group: 'footer' },
    ],
  },
];

const parseSettingValue = (field, raw) => {
  if (field.type === 'json_lines') {
    if (Array.isArray(raw)) return raw.join('\n\n');
    try {
      const parsed = JSON.parse(raw || '[]');
      return Array.isArray(parsed) ? parsed.join('\n\n') : String(raw || '');
    } catch {
      return String(raw || '');
    }
  }
  return raw ?? '';
};

const serializeSettingValue = (field, val) => {
  if (field.type === 'json_lines') {
    return String(val || '')
      .split(/\n+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return val ?? '';
};

const getPageSeoFields = (pageId) => [
  { key: `seo_${pageId}_title`, label: 'SEO Meta Title', group: 'seo', full: true, seoType: 'title' },
  { key: `seo_${pageId}_description`, label: 'SEO Meta Description', group: 'seo', type: 'textarea', full: true, seoType: 'description' },
  { key: `seo_${pageId}_keywords`, label: 'SEO Focus Keywords (Comma-separated)', group: 'seo', full: true },
  { key: `seo_${pageId}_robots`, label: 'Robots Directive', group: 'seo', type: 'robots' },
  { key: `seo_${pageId}_og_image`, label: 'Social Share Image (OG Image)', group: 'seo', type: 'image', full: true, hint: 'Optional — falls back to global OG image' },
];

export default function AdminPages() {
  const { refreshData } = useSite();
  const [activePageId, setActivePageId] = useState('home');
  const [allSettings, setAllSettings] = useState({});
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState('');

  const activePage = PAGE_DEFS.find((p) => p.id === activePageId) || PAGE_DEFS[0];
  const activeSeoFields = getPageSeoFields(activePage.id);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/settings');
      if (res.data && res.data.asArray) {
        setAllSettings(res.data.asArray);
      }
    } catch (err) {
      console.error('Failed to load page settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    const next = {};
    [...activePage.fields, ...activeSeoFields].forEach((f) => {
      next[f.key] = parseSettingValue(f, allSettings[f.key]);
    });
    setFormValues(next);
    setSavedNotice('');
  }, [activePageId, allSettings]);

  const handleSavePage = async (e) => {
    e.preventDefault();
    const settingsPayload = {};
    const groupsPayload = {};

    [...activePage.fields, ...activeSeoFields].forEach((f) => {
      settingsPayload[f.key] = serializeSettingValue(f, formValues[f.key]);
      groupsPayload[f.key] = f.group || 'general';
    });

    try {
      setSaving(true);
      const res = await api.post('/admin/settings/bulk', {
        settings: settingsPayload,
        groups: groupsPayload,
      });
      if (res.data && res.data.settings) {
        setAllSettings(res.data.settings);
      } else {
        await loadSettings();
      }
      await refreshData();
      setSavedNotice(`${activePage.name} content & images saved to live website!`);
    } catch (err) {
      console.error('Failed to save page content:', err);
      alert('Error saving page: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="a-pages-shell">
      <aside className="a-pages-sidebar">
        <div className="a-card">
          <div className="a-card-head">
            <h2>All Pages ({PAGE_DEFS.length})</h2>
          </div>
          <div className="a-pages-list">
            {PAGE_DEFS.map((page) => (
              <button
                key={page.id}
                type="button"
                className={`a-page-item ${activePageId === page.id ? 'active' : ''}`}
                onClick={() => setActivePageId(page.id)}
              >
                <span className="a-page-ico">{page.icon}</span>
                <span className="a-page-meta">
                  <strong>{page.name}</strong>
                  <small>{page.fields.length} fields</small>
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div className="a-pages-editor">
        <div className="a-card">
          <div className="a-card-head">
            <div>
              <h2>
                {activePage.icon} {activePage.name}
              </h2>
              <p className="a-muted" style={{ fontSize: '12.5px', marginTop: '3px' }}>
                {activePage.description}
              </p>
            </div>
            <div className="a-actions">
              <a
                href={activePage.hash}
                target="_blank"
                rel="noreferrer"
                className="a-btn sm"
              >
                Preview Section ↗
              </a>
            </div>
          </div>

          <div className="a-card-body">
            {savedNotice && <div className="a-flash">{savedNotice}</div>}

            {loading ? (
              <p className="a-empty">Loading page fields...</p>
            ) : (
              <form onSubmit={handleSavePage} className="a-form">
                <div className="a-form-grid">
                  {activePage.fields.map((f) => {
                    if (f.type === 'image') {
                      return (
                        <div key={f.key} className={f.full ? 'full' : ''}>
                          <ImageField
                            label={f.label}
                            value={formValues[f.key] || ''}
                            onChange={(val) => setFormValues({ ...formValues, [f.key]: val })}
                            defaultPreview={f.defaultPreview || ''}
                            hint={f.hint}
                          />
                        </div>
                      );
                    }

                    return (
                      <div key={f.key} className={`a-field ${f.full ? 'full' : ''}`}>
                        <label>
                          {f.label}
                          <span className="a-hint" style={{ fontWeight: 500, marginLeft: '6px' }}>({f.key})</span>
                        </label>
                        {f.type === 'textarea' || f.type === 'json_lines' ? (
                          <textarea
                            value={formValues[f.key] || ''}
                            onChange={(e) => setFormValues({ ...formValues, [f.key]: e.target.value })}
                            style={{ minHeight: f.type === 'json_lines' ? '140px' : '90px' }}
                            placeholder={f.placeholder || ''}
                          />
                        ) : (
                          <input
                            type="text"
                            value={formValues[f.key] || ''}
                            onChange={(e) => setFormValues({ ...formValues, [f.key]: e.target.value })}
                            placeholder={f.placeholder || ''}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '22px', paddingTop: '18px', borderTop: '1px solid var(--line)' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '12px', color: '#0f172a' }}>
                    🔍 Page SEO & Search Ranking Meta
                  </h3>

                  <SeoSnippetPreview
                    title={formValues[`seo_${activePage.id}_title`] || allSettings.seo_site_title}
                    description={formValues[`seo_${activePage.id}_description`] || allSettings.seo_meta_description}
                    url={`${(allSettings.seo_canonical_base || 'https://www.abcaisystemltd.com').replace(/\/+$/, '')}/${activePage.id === 'home' || activePage.id === 'branding' ? '' : activePage.id}`}
                  />

                  <div className="a-form-grid" style={{ marginTop: '14px' }}>
                    {activeSeoFields.map((sf) => {
                      if (sf.type === 'image') {
                        return (
                          <div key={sf.key} className="full">
                            <ImageField
                              label={sf.label}
                              value={formValues[sf.key] || ''}
                              onChange={(val) => setFormValues({ ...formValues, [sf.key]: val })}
                              hint={sf.hint}
                            />
                          </div>
                        );
                      }
                      if (sf.type === 'robots') {
                        return (
                          <div key={sf.key} className="a-field">
                            <label>{sf.label}</label>
                            <select
                              value={formValues[sf.key] || 'index, follow'}
                              onChange={(e) => setFormValues({ ...formValues, [sf.key]: e.target.value })}
                            >
                              <option value="index, follow">index, follow</option>
                              <option value="index, nofollow">index, nofollow</option>
                              <option value="noindex, follow">noindex, follow</option>
                              <option value="noindex, nofollow">noindex, nofollow</option>
                            </select>
                          </div>
                        );
                      }
                      return (
                        <div key={sf.key} className={`a-field ${sf.full ? 'full' : ''}`}>
                          <label>
                            {sf.label}
                            {sf.seoType === 'title' && <SeoCharBadge value={formValues[sf.key] || ''} max={65} minGood={30} />}
                            {sf.seoType === 'description' && <SeoCharBadge value={formValues[sf.key] || ''} max={160} minGood={100} />}
                          </label>
                          {sf.type === 'textarea' ? (
                            <textarea
                              value={formValues[sf.key] || ''}
                              onChange={(e) => setFormValues({ ...formValues, [sf.key]: e.target.value })}
                              style={{ minHeight: '76px' }}
                            />
                          ) : (
                            <input
                              type="text"
                              value={formValues[sf.key] || ''}
                              onChange={(e) => setFormValues({ ...formValues, [sf.key]: e.target.value })}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <button type="submit" className="a-btn primary" disabled={saving}>
                    {saving ? 'Saving Page...' : `Save ${activePage.name} & SEO`}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {activePage.customComponent === 'services' && (
          <ServicePagesEditor onSaved={refreshData} />
        )}

        {activePage.customComponent === 'products' && (
          <ProductPagesEditor onSaved={refreshData} />
        )}

        {Array.isArray(activePage.resources) &&
          activePage.resources.map((resCfg) => (
            <PageResourcePanel
              key={resCfg.endpoint}
              title={resCfg.title}
              description={resCfg.description}
              endpoint={resCfg.endpoint}
              resourceKey={resCfg.resourceKey}
              fields={resCfg.fields}
              onChanged={refreshData}
            />
          ))}
      </div>
    </div>
  );
}
