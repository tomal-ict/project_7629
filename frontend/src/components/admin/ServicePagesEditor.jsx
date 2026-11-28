import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { GalleryImagesField, ImageField } from './ImageField';
import SeoSnippetPreview, { SeoCharBadge } from './SeoSnippetPreview';

const toLines = (arr) =>
  Array.isArray(arr)
    ? arr.map((x) => (typeof x === 'string' ? x : x.title || x.key || JSON.stringify(x))).join('\n')
    : '';

const fromLines = (str) =>
  str
    ? str.split('\n').map((l) => l.trim()).filter(Boolean)
    : [];

/**
 * Editor for individual Service detail pages (content, hero banner image, gallery images, features, benefits, use cases).
 */
export default function ServicePagesEditor({ onSaved }) {
  const [services, setServices] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState(null);

  const loadServices = async (selectId = null) => {
    try {
      setLoading(true);
      const res = await api.get('/admin/services');
      const list = res.data?.services || [];
      setServices(list);
      const target = list.find((s) => s.id === (selectId ?? selectedId)) || list[0];
      if (target) {
        selectService(target);
      } else {
        setForm(null);
      }
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const selectService = (svc) => {
    setSelectedId(svc.id);
    setNotice('');
    setForm({
      id: svc.id,
      title: svc.title || '',
      slug: svc.slug || '',
      subtitle: svc.subtitle || '',
      icon: svc.icon || '🤖',
      intro: svc.intro || '',
      description: svc.description || '',
      why_us: svc.why_us || '',
      seo_title: svc.seo_title || '',
      seo_description: svc.seo_description || '',
      seo_keywords: svc.seo_keywords || '',
      seo_og_image: svc.seo_og_image || '',
      hero_image: svc.hero_image || '',
      gallery_images: Array.isArray(svc.gallery_images) ? svc.gallery_images : [],
      featuresText: toLines(svc.features),
      benefitsText: toLines(svc.benefits),
      usecasesText: toLines(svc.usecases),
      statsJson: Array.isArray(svc.stats) ? JSON.stringify(svc.stats, null, 2) : '[]',
      stepsJson: Array.isArray(svc.steps) ? JSON.stringify(svc.steps, null, 2) : '[]',
      featured_on_home: !!svc.featured_on_home,
      sort_order: svc.sort_order ?? 0,
    });
  };

  const createNewService = () => {
    setSelectedId('new');
    setNotice('');
    setForm({
      id: null,
      title: '',
      slug: '',
      subtitle: '',
      icon: '🧩',
      intro: '',
      description: '',
      why_us: '',
      seo_title: '',
      seo_description: '',
      seo_keywords: '',
      seo_og_image: '',
      hero_image: '',
      gallery_images: [],
      featuresText: '',
      benefitsText: '',
      usecasesText: '',
      statsJson: '[]',
      stepsJson: '[]',
      featured_on_home: true,
      sort_order: services.length,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form) return;

    let statsParsed = [];
    let stepsParsed = [];
    try {
      statsParsed = form.statsJson.trim() ? JSON.parse(form.statsJson) : [];
      stepsParsed = form.stepsJson.trim() ? JSON.parse(form.stepsJson) : [];
    } catch (err) {
      alert('Invalid JSON in Stats or Steps: ' + err.message);
      return;
    }

    const payload = {
      title: form.title,
      slug: form.slug,
      subtitle: form.subtitle,
      icon: form.icon,
      intro: form.intro,
      description: form.description,
      why_us: form.why_us,
      seo_title: form.seo_title,
      seo_description: form.seo_description,
      seo_keywords: form.seo_keywords,
      seo_og_image: form.seo_og_image,
      hero_image: form.hero_image,
      gallery_images: (form.gallery_images || []).map((u) => u.trim()).filter(Boolean),
      features: fromLines(form.featuresText),
      benefits: fromLines(form.benefitsText),
      usecases: fromLines(form.usecasesText),
      stats: statsParsed,
      steps: stepsParsed,
      featured_on_home: form.featured_on_home,
      sort_order: Number(form.sort_order) || 0,
    };

    try {
      setSaving(true);
      let savedId = form.id;
      if (form.id) {
        await api.put(`/admin/services/${form.id}`, payload);
      } else {
        const res = await api.post('/admin/services', payload);
        savedId = res.data?.service?.id || null;
      }
      setNotice('Service page updated!');
      await loadServices(savedId);
      if (onSaved) onSaved();
    } catch (err) {
      console.error('Failed to save service page:', err);
      alert('Error saving service: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!form?.id || !window.confirm(`Delete service page "${form.title}"?`)) return;
    try {
      await api.delete(`/admin/services/${form.id}`);
      await loadServices();
      if (onSaved) onSaved();
    } catch (err) {
      console.error('Failed to delete service:', err);
      alert('Error deleting service.');
    }
  };

  return (
    <div className="a-card" style={{ marginTop: '18px' }}>
      <div className="a-card-head">
        <div>
          <h2>Service Detail Pages ({services.length})</h2>
          <p className="a-muted" style={{ fontSize: '12px', marginTop: '2px' }}>
            Select any service sub-page to edit its hero banner image, gallery images, copy, and features.
          </p>
        </div>
        <button type="button" className="a-btn sm primary" onClick={createNewService}>
          + New Service Page
        </button>
      </div>

      <div className="a-card-body">
        {loading ? (
          <p className="a-empty">Loading service pages...</p>
        ) : (
          <>
            <div className="a-subpage-pills">
              {services.map((svc) => (
                <button
                  key={svc.id}
                  type="button"
                  className={`a-subpage-pill ${selectedId === svc.id ? 'active' : ''}`}
                  onClick={() => selectService(svc)}
                >
                  <span>{svc.icon || '🧩'}</span>
                  <span>{svc.title}</span>
                </button>
              ))}
            </div>

            {form && (
              <form onSubmit={handleSave} className="a-form" style={{ marginTop: '18px' }}>
                {notice && <div className="a-flash">{notice}</div>}

                <div className="a-form-grid">
                  <div className="a-field">
                    <label>Page Title <span className="req">*</span></label>
                    <input
                      type="text"
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                  </div>
                  <div className="a-field">
                    <label>URL Slug</label>
                    <input
                      type="text"
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    />
                  </div>
                  <div className="a-field">
                    <label>Icon (Emoji)</label>
                    <input
                      type="text"
                      value={form.icon}
                      onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    />
                  </div>
                  <div className="a-field">
                    <label>Sort Order</label>
                    <input
                      type="number"
                      value={form.sort_order}
                      onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value, 10) || 0 })}
                    />
                  </div>

                  <div className="a-field full">
                    <label>Subtitle</label>
                    <input
                      type="text"
                      value={form.subtitle}
                      onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                    />
                  </div>

                  <div className="full">
                    <ImageField
                      label="Service Hero Banner Image"
                      value={form.hero_image}
                      onChange={(val) => setForm({ ...form, hero_image: val })}
                      hint="Displayed as the hero background of this service page"
                    />
                  </div>

                  <GalleryImagesField
                    label="Service Overview Gallery Images"
                    images={form.gallery_images}
                    onChange={(imgs) => setForm({ ...form, gallery_images: imgs })}
                  />

                  <div className="a-field full">
                    <label>Short Description (Homepage Tab & Cards)</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  </div>

                  <div className="a-field full">
                    <label>Overview Intro</label>
                    <textarea
                      value={form.intro}
                      onChange={(e) => setForm({ ...form, intro: e.target.value })}
                    />
                  </div>

                  <div className="a-field full">
                    <label>Why Us Highlight</label>
                    <textarea
                      value={form.why_us}
                      onChange={(e) => setForm({ ...form, why_us: e.target.value })}
                    />
                  </div>

                  <div className="a-field">
                    <label>Features <span className="a-hint">(One per line)</span></label>
                    <textarea
                      value={form.featuresText}
                      onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
                      style={{ minHeight: '110px' }}
                    />
                  </div>
                  <div className="a-field">
                    <label>Benefits <span className="a-hint">(One per line)</span></label>
                    <textarea
                      value={form.benefitsText}
                      onChange={(e) => setForm({ ...form, benefitsText: e.target.value })}
                      style={{ minHeight: '110px' }}
                    />
                  </div>
                  <div className="a-field full">
                    <label>Use Cases <span className="a-hint">(One per line)</span></label>
                    <textarea
                      value={form.usecasesText}
                      onChange={(e) => setForm({ ...form, usecasesText: e.target.value })}
                      style={{ minHeight: '90px' }}
                    />
                  </div>

                  <div className="a-field">
                    <label>Service Stats (JSON)</label>
                    <textarea
                      value={form.statsJson}
                      onChange={(e) => setForm({ ...form, statsJson: e.target.value })}
                      style={{ minHeight: '110px', fontFamily: 'monospace', fontSize: '12px' }}
                    />
                  </div>
                  <div className="a-field">
                    <label>Process Steps (JSON)</label>
                    <textarea
                      value={form.stepsJson}
                      onChange={(e) => setForm({ ...form, stepsJson: e.target.value })}
                      style={{ minHeight: '110px', fontFamily: 'monospace', fontSize: '12px' }}
                    />
                  </div>

                  <div className="a-field full">
                    <label className="a-radio">
                      <input
                        type="checkbox"
                        checked={form.featured_on_home}
                        onChange={(e) => setForm({ ...form, featured_on_home: e.target.checked })}
                      />
                      Show on Homepage Services Tabs
                    </label>
                  </div>

                  <div className="full" style={{ paddingTop: '14px', borderTop: '1px solid var(--line)' }}>
                    <h3 style={{ fontSize: '13.5px', fontWeight: 800, marginBottom: '10px', color: '#0f172a' }}>
                      🔍 Service Page SEO & Social Meta
                    </h3>
                    <SeoSnippetPreview
                      title={form.seo_title || form.title}
                      description={form.seo_description || form.description}
                      url={`https://www.abcaisystemltd.com/services/${form.slug || 'service'}`}
                    />
                  </div>
                  <div className="a-field full">
                    <label>
                      SEO Meta Title
                      <SeoCharBadge value={form.seo_title} max={65} minGood={30} />
                    </label>
                    <input
                      type="text"
                      value={form.seo_title}
                      onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
                      placeholder={form.title}
                    />
                  </div>
                  <div className="a-field full">
                    <label>
                      SEO Meta Description
                      <SeoCharBadge value={form.seo_description} max={160} minGood={100} />
                    </label>
                    <textarea
                      value={form.seo_description}
                      onChange={(e) => setForm({ ...form, seo_description: e.target.value })}
                      placeholder={form.description}
                      style={{ minHeight: '76px' }}
                    />
                  </div>
                  <div className="a-field full">
                    <label>SEO Keywords (Comma-separated)</label>
                    <input
                      type="text"
                      value={form.seo_keywords}
                      onChange={(e) => setForm({ ...form, seo_keywords: e.target.value })}
                    />
                  </div>
                  <div className="full">
                    <ImageField
                      label="Service Social Share Image (OG Image)"
                      value={form.seo_og_image}
                      onChange={(val) => setForm({ ...form, seo_og_image: val })}
                      hint="Optional — defaults to Service Hero Banner Image"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', flexWrap: 'wrap', gap: '10px' }}>
                  <div className="a-actions">
                    {form.slug && (
                      <a
                        href={`#/services/${form.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="a-btn sm"
                      >
                        Preview Page ↗
                      </a>
                    )}
                    {form.id && (
                      <button type="button" className="a-btn sm danger" onClick={handleDelete}>
                        Delete Service
                      </button>
                    )}
                  </div>
                  <button type="submit" className="a-btn primary" disabled={saving}>
                    {saving ? 'Saving...' : form.id ? 'Save Service Page' : 'Create Service Page'}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
