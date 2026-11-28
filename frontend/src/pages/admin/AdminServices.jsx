import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useSite } from '../../context/SiteContext';
import Modal from '../../components/Modal';
import ContentToolbar from '../../components/admin/ContentToolbar';
import IconPickerField from '../../components/admin/IconPickerField';
import { GalleryImagesField, ImageField } from '../../components/admin/ImageField';
import SeoSnippetPreview, { SeoCharBadge } from '../../components/admin/SeoSnippetPreview';

const slugify = (val) =>
  String(val || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const toLines = (arr) =>
  Array.isArray(arr)
    ? arr.map((f) => (typeof f === 'string' ? f : f.title || f.key || JSON.stringify(f))).join('\n')
    : '';

const fromLines = (str) =>
  str ? str.split('\n').map((l) => l.trim()).filter(Boolean) : [];

const isImagePath = (val) => typeof val === 'string' && /^(\.\/|\/|https?:\/\/)/i.test(val.trim());

export default function AdminServices() {
  const { refreshData } = useSite();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('basic');
  const [editingService, setEditingService] = useState(null);
  const [slugLocked, setSlugLocked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('cards');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    subtitle: '',
    icon: '🤖',
    intro: '',
    description: '',
    features: '',
    benefits: '',
    usecases: '',
    why_us: '',
    hero_image: '',
    gallery_images: [],
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    seo_og_image: '',
    featured_on_home: true,
    sort_order: 0,
  });

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/services');
      if (res.data && res.data.services) {
        setServices(res.data.services);
      }
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreate = () => {
    setEditingService(null);
    setSlugLocked(false);
    setModalTab('basic');
    setFormData({
      title: '',
      slug: '',
      subtitle: '',
      icon: '🚀',
      intro: '',
      description: '',
      features: '',
      benefits: '',
      usecases: '',
      why_us: '',
      hero_image: '',
      gallery_images: [],
      seo_title: '',
      seo_description: '',
      seo_keywords: '',
      seo_og_image: '',
      featured_on_home: true,
      sort_order: services.length,
    });
    setModalOpen(true);
  };

  const openEdit = (service) => {
    setEditingService(service);
    setSlugLocked(true);
    setModalTab('basic');
    setFormData({
      title: service.title || '',
      slug: service.slug || '',
      subtitle: service.subtitle || '',
      icon: service.icon || '🤖',
      intro: service.intro || '',
      description: service.description || '',
      features: toLines(service.features),
      benefits: toLines(service.benefits),
      usecases: toLines(service.usecases),
      why_us: service.why_us || '',
      hero_image: service.hero_image || '',
      gallery_images: Array.isArray(service.gallery_images) ? service.gallery_images : [],
      seo_title: service.seo_title || '',
      seo_description: service.seo_description || '',
      seo_keywords: service.seo_keywords || '',
      seo_og_image: service.seo_og_image || '',
      featured_on_home: !!service.featured_on_home,
      sort_order: service.sort_order || 0,
    });
    setModalOpen(true);
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete service "${item.title}"?`)) return;
    try {
      await api.delete(`/admin/services/${item.id}`);
      setServices((prev) => prev.filter((s) => s.id !== item.id));
      setNotice(`Deleted "${item.title}".`);
      refreshData();
    } catch (err) {
      console.error('Failed to delete service:', err);
      alert('Error deleting service.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      slug: formData.slug || slugify(formData.title),
      subtitle: formData.subtitle,
      icon: formData.icon,
      intro: formData.intro,
      description: formData.description,
      features: fromLines(formData.features),
      benefits: fromLines(formData.benefits),
      usecases: fromLines(formData.usecases),
      why_us: formData.why_us,
      hero_image: formData.hero_image,
      gallery_images: (formData.gallery_images || []).map((u) => u.trim()).filter(Boolean),
      seo_title: formData.seo_title,
      seo_description: formData.seo_description,
      seo_keywords: formData.seo_keywords,
      seo_og_image: formData.seo_og_image,
      featured_on_home: formData.featured_on_home,
      sort_order: Number(formData.sort_order) || 0,
    };

    try {
      setSaving(true);
      if (editingService) {
        await api.put(`/admin/services/${editingService.id}`, payload);
        setNotice(`Updated "${formData.title}" successfully!`);
      } else {
        await api.post('/admin/services', payload);
        setNotice(`Created "${formData.title}" successfully!`);
      }
      setModalOpen(false);
      await fetchServices();
      refreshData();
    } catch (err) {
      console.error('Failed to save service:', err);
      alert('Error saving service: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const featuredCount = services.filter((s) => !!s.featured_on_home).length;
  const hiddenCount = services.length - featuredCount;

  const filtered = services.filter((s) => {
    if (filter === 'featured' && !s.featured_on_home) return false;
    if (filter === 'hidden' && s.featured_on_home) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        (s.title || '').toLowerCase().includes(q) ||
        (s.subtitle || '').toLowerCase().includes(q) ||
        (s.slug || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="a-dash-stack">
      <ContentToolbar
        icon="🛠️"
        title="Services & Capabilities"
        description="Add, reorder, or customize enterprise service tabs and dedicated service detail pages."
        totalCount={services.length}
        filteredCount={filtered.length}
        addLabel="+ Add New Service"
        onAdd={openCreate}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search services by title, subtitle, or slug..."
        filters={[
          { value: 'all', label: 'All Services', count: services.length },
          { value: 'featured', label: 'Featured on Home', count: featuredCount },
          { value: 'hidden', label: 'Hidden', count: hiddenCount },
        ]}
        activeFilter={filter}
        onFilterChange={setFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        notice={notice}
      />

      {loading ? (
        <div className="a-card"><p className="a-empty">Loading services...</p></div>
      ) : filtered.length === 0 ? (
        <div className="a-card">
          <div className="a-empty">
            No matching services found.{' '}
            <button type="button" className="a-btn sm primary" onClick={openCreate} style={{ marginLeft: '8px' }}>
              + Add Service
            </button>
          </div>
        </div>
      ) : viewMode === 'cards' ? (
        <div className="a-item-grid">
          {filtered.map((item, idx) => (
            <div key={item.id} className="a-item-card">
              <div className="a-item-cover">
                {isImagePath(item.hero_image) ? (
                  <img src={item.hero_image} alt={item.title} />
                ) : (
                  <div className="a-item-cover-placeholder">{item.icon || '🛠️'}</div>
                )}
                <span className="a-num-badge a-item-num">#{String(idx + 1).padStart(2, '0')}</span>
                <span className={`a-pill ${item.featured_on_home ? 'green' : 'slate'} a-item-status`}>
                  {item.featured_on_home ? 'On Home' : 'Hidden'}
                </span>
              </div>

              <div className="a-item-body">
                <div className="a-item-head">
                  <span className="a-item-ico">{item.icon || '🤖'}</span>
                  <div style={{ minWidth: 0 }}>
                    <h4>{item.title}</h4>
                    <div className="a-muted" style={{ fontSize: '11.5px' }}>/services/{item.slug}</div>
                  </div>
                </div>
                {item.subtitle && <div className="a-item-kicker">{item.subtitle}</div>}
                <p className="a-item-desc">{item.description}</p>
              </div>

              <div className="a-item-foot">
                <span className="a-muted" style={{ fontSize: '11.5px', fontWeight: 600 }}>
                  {Array.isArray(item.features) ? item.features.length : 0} features · Order {item.sort_order}
                </span>
                <div className="a-actions">
                  <a href={`#/services/${item.slug}`} target="_blank" rel="noreferrer" className="a-btn sm">
                    View
                  </a>
                  <button type="button" onClick={() => openEdit(item)} className="a-btn sm primary">
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(item)} className="a-btn sm danger">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="a-card">
          <div className="a-table-wrap">
            <table className="a-table">
              <thead>
                <tr>
                  <th style={{ width: '56px' }}>#</th>
                  <th>Service</th>
                  <th>Subtitle</th>
                  <th>Status</th>
                  <th>Order</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, idx) => (
                  <tr key={item.id}>
                    <td><span className="a-num-badge">{String(idx + 1).padStart(2, '0')}</span></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '20px' }}>{item.icon}</span>
                        <div>
                          <strong>{item.title}</strong>
                          <div className="a-muted" style={{ fontSize: '11.5px' }}>/services/{item.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="a-muted">{item.subtitle}</td>
                    <td>
                      {item.featured_on_home ? (
                        <span className="a-pill green">On Home</span>
                      ) : (
                        <span className="a-pill slate">Hidden</span>
                      )}
                    </td>
                    <td className="a-muted">{item.sort_order}</td>
                    <td>
                      <div className="a-actions">
                        <a href={`#/services/${item.slug}`} target="_blank" rel="noreferrer" className="a-btn sm">View</a>
                        <button type="button" onClick={() => openEdit(item)} className="a-btn sm primary">Edit</button>
                        <button type="button" onClick={() => handleDelete(item)} className="a-btn sm danger">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingService ? `Edit Service: ${editingService.title}` : 'Create New Service'}
        subtitle="Configure homepage tab copy, detail page gallery images, features, and SEO."
        size="lg"
      >
        <div className="a-subpage-pills" style={{ marginBottom: '18px' }}>
          {[
            { id: 'basic', label: '1. Basic Info & Copy' },
            { id: 'lists', label: '2. Features, Benefits & Use Cases' },
            { id: 'images', label: '3. Hero & Gallery Images' },
            { id: 'seo', label: '4. SEO Meta' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              className={`a-subpage-pill ${modalTab === t.id ? 'active' : ''}`}
              onClick={() => setModalTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="a-form">
          {modalTab === 'basic' && (
            <div className="a-form-grid">
              <div className="a-field">
                <label>Service Title <span className="req">*</span></label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => {
                    const nextTitle = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      title: nextTitle,
                      slug: !slugLocked ? slugify(nextTitle) : prev.slug,
                    }));
                  }}
                  placeholder="e.g. Custom Enterprise AI"
                />
              </div>
              <div className="a-field">
                <label>URL Slug <span className="req">*</span></label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => {
                    setSlugLocked(true);
                    setFormData({ ...formData, slug: e.target.value });
                  }}
                  placeholder="custom-enterprise-ai"
                />
              </div>

              <IconPickerField
                label="Service Icon"
                value={formData.icon}
                onChange={(val) => setFormData({ ...formData, icon: val })}
              />

              <div className="a-field">
                <label>Sort Order</label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value, 10) || 0 })}
                />
                <label className="a-radio" style={{ marginTop: '14px' }}>
                  <input
                    type="checkbox"
                    checked={formData.featured_on_home}
                    onChange={(e) => setFormData({ ...formData, featured_on_home: e.target.checked })}
                  />
                  Show on Homepage Services Tabs
                </label>
              </div>

              <div className="a-field full">
                <label>Subtitle / Tagline</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Immediate Production Readiness Within Days"
                />
              </div>

              <div className="a-field full">
                <label>Short Card &amp; Tab Description <span className="req">*</span></label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="a-field full">
                <label>Service Detail Page Intro</label>
                <textarea
                  value={formData.intro}
                  onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
                />
              </div>

              <div className="a-field full">
                <label>Why Choose Us Highlight</label>
                <textarea
                  value={formData.why_us}
                  onChange={(e) => setFormData({ ...formData, why_us: e.target.value })}
                />
              </div>
            </div>
          )}

          {modalTab === 'lists' && (
            <div className="a-form-grid">
              <div className="a-field">
                <label>Features <span className="a-hint">(One per line)</span></label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  style={{ minHeight: '150px' }}
                  placeholder="Battle-tested codebase&#10;Air-gapped deployment"
                />
              </div>
              <div className="a-field">
                <label>Benefits <span className="a-hint">(One per line)</span></label>
                <textarea
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  style={{ minHeight: '150px' }}
                  placeholder="Zero 3rd-party API reliance&#10;Deterministic precision"
                />
              </div>
              <div className="a-field full">
                <label>Use Cases <span className="a-hint">(One per line)</span></label>
                <textarea
                  value={formData.usecases}
                  onChange={(e) => setFormData({ ...formData, usecases: e.target.value })}
                  style={{ minHeight: '120px' }}
                />
              </div>
            </div>
          )}

          {modalTab === 'images' && (
            <div className="a-form-grid">
              <div className="full">
                <ImageField
                  label="Service Hero Banner Image"
                  value={formData.hero_image}
                  onChange={(val) => setFormData({ ...formData, hero_image: val })}
                  hint="Background image for the service detail hero"
                />
              </div>
              <GalleryImagesField
                label="Service Gallery Images"
                images={formData.gallery_images}
                onChange={(imgs) => setFormData({ ...formData, gallery_images: imgs })}
              />
            </div>
          )}

          {modalTab === 'seo' && (
            <div className="a-form-grid">
              <div className="full">
                <SeoSnippetPreview
                  title={formData.seo_title || formData.title}
                  description={formData.seo_description || formData.description}
                  url={`https://www.abcaisystemltd.com/services/${formData.slug || 'service'}`}
                />
              </div>
              <div className="a-field full">
                <label>
                  SEO Meta Title
                  <SeoCharBadge value={formData.seo_title} max={65} minGood={30} />
                </label>
                <input
                  type="text"
                  value={formData.seo_title}
                  onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                  placeholder={formData.title}
                />
              </div>
              <div className="a-field full">
                <label>
                  SEO Meta Description
                  <SeoCharBadge value={formData.seo_description} max={160} minGood={100} />
                </label>
                <textarea
                  value={formData.seo_description}
                  onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                  placeholder={formData.description}
                />
              </div>
              <div className="a-field full">
                <label>SEO Keywords</label>
                <input
                  type="text"
                  value={formData.seo_keywords}
                  onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value })}
                />
              </div>
              <div className="full">
                <ImageField
                  label="Social Share Image (OG Image)"
                  value={formData.seo_og_image}
                  onChange={(val) => setFormData({ ...formData, seo_og_image: val })}
                />
              </div>
            </div>
          )}

          <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid var(--line)', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" className="a-btn" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="a-btn primary" disabled={saving}>
              {saving ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
