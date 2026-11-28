import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useSite } from '../../context/SiteContext';
import Modal from '../../components/Modal';
import ContentToolbar from '../../components/admin/ContentToolbar';
import { ImageField } from '../../components/admin/ImageField';

const isImagePath = (val) => typeof val === 'string' && /^(\.\/|\/|https?:\/\/)/i.test(val.trim());

const DEMO_PRESETS = {
  synthex: {
    kind: 'synthex',
    queries: ['Show top 5 product lines by margin', 'Quarterly revenue drivers'],
    sidebar: ['Neural Mesh', 'Dynamic Audits', 'Connectors'],
    databases: 3,
    steps: ['Semantic Interpretation', 'Database Scan', 'Synthesize Intelligence'],
    chartLabel: 'Gross Margins by Sector',
    topLabel: 'Top Performing Assets',
    topItems: [['Division A', '$38.4k'], ['Division B', '$31.2k'], ['Division C', '$24.8k']],
  },
  clerk: {
    kind: 'clerk',
    sidebar: ['Document Ingest', 'Extracted Entities', 'Reports'],
    files: ['Invoice_Q4.pdf', 'Manifest.pdf'],
    steps: ['Parse Structure', 'Verify Totals', 'Sync to ERP'],
  },
  visiongate: {
    kind: 'visiongate',
    title: 'Autonomous Optical Verification',
    subtitle: 'Camera-agnostic · Real-time telemetry',
    entries: [['EMP-104', 'Tanvir Ahmed', '08:58:14 AM', 'present']],
  },
};

export default function AdminProducts() {
  const { refreshData } = useSite();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('basic');
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('cards');

  const [formData, setFormData] = useState({
    name: '',
    tag: '',
    metric: '',
    logo: '',
    description: '',
    features: '',
    demo: '',
    is_flagship: true,
    is_active: true,
    sort_order: 0,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/products');
      if (res.data && res.data.products) {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreate = () => {
    setEditingProduct(null);
    setModalTab('basic');
    setFormData({
      name: '',
      tag: '',
      metric: '',
      logo: '',
      description: '',
      features: '',
      demo: '',
      is_flagship: true,
      is_active: true,
      sort_order: products.length,
    });
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setModalTab('basic');
    const featuresStr = Array.isArray(product.features) ? product.features.join('\n') : '';
    const demoStr = product.demo ? JSON.stringify(product.demo, null, 2) : '';

    setFormData({
      name: product.name || '',
      tag: product.tag || '',
      metric: product.metric || '',
      logo: product.logo || '',
      description: product.description || '',
      features: featuresStr,
      demo: demoStr,
      is_flagship: !!product.is_flagship,
      is_active: !!product.is_active,
      sort_order: product.sort_order || 0,
    });
    setModalOpen(true);
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete product "${item.name}"?`)) return;
    try {
      await api.delete(`/admin/products/${item.id}`);
      setProducts((prev) => prev.filter((p) => p.id !== item.id));
      setNotice(`Deleted "${item.name}".`);
      refreshData();
    } catch (err) {
      console.error('Failed to delete product:', err);
      alert('Error deleting product.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let parsedDemo = null;
    if (formData.demo && formData.demo.trim()) {
      try {
        parsedDemo = JSON.parse(formData.demo);
      } catch (err) {
        alert('Invalid JSON in Demo Data field: ' + err.message);
        return;
      }
    }

    const payload = {
      ...formData,
      demo: parsedDemo,
      features: formData.features
        ? formData.features.split('\n').map((l) => l.trim()).filter(Boolean)
        : [],
    };

    try {
      setSaving(true);
      if (editingProduct) {
        await api.put(`/admin/products/${editingProduct.id}`, payload);
        setNotice(`Updated "${formData.name}" successfully!`);
      } else {
        await api.post('/admin/products', payload);
        setNotice(`Created "${formData.name}" successfully!`);
      }
      setModalOpen(false);
      await fetchProducts();
      refreshData();
    } catch (err) {
      console.error('Failed to save product:', err);
      alert('Error saving product: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const flagshipCount = products.filter((p) => !!p.is_flagship).length;
  const ecosystemCount = products.length - flagshipCount;

  const filtered = products.filter((p) => {
    if (filter === 'flagship' && !p.is_flagship) return false;
    if (filter === 'ecosystem' && p.is_flagship) return false;
    if (filter === 'hidden' && p.is_active) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        (p.name || '').toLowerCase().includes(q) ||
        (p.tag || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="a-dash-stack">
      <ContentToolbar
        icon="📦"
        title="Products & Turnkey Systems"
        description="Manage flagship slider platforms and specialized ecosystem products with logos & interactive demos."
        totalCount={products.length}
        filteredCount={filtered.length}
        addLabel="+ Add New Product"
        onAdd={openCreate}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search products by name, tag, or description..."
        filters={[
          { value: 'all', label: 'All Products', count: products.length },
          { value: 'flagship', label: 'Flagship', count: flagshipCount },
          { value: 'ecosystem', label: 'Ecosystem', count: ecosystemCount },
        ]}
        activeFilter={filter}
        onFilterChange={setFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        notice={notice}
      />

      {loading ? (
        <div className="a-card"><p className="a-empty">Loading products...</p></div>
      ) : filtered.length === 0 ? (
        <div className="a-card">
          <div className="a-empty">
            No matching products found.{' '}
            <button type="button" className="a-btn sm primary" onClick={openCreate} style={{ marginLeft: '8px' }}>
              + Add Product
            </button>
          </div>
        </div>
      ) : viewMode === 'cards' ? (
        <div className="a-item-grid">
          {filtered.map((item, idx) => (
            <div key={item.id} className="a-item-card">
              <div className="a-item-body" style={{ paddingTop: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="a-num-badge">#{String(idx + 1).padStart(2, '0')}</span>
                  <div className="a-actions" style={{ gap: '6px' }}>
                    <span className={`a-pill ${item.is_flagship ? 'blue' : 'slate'}`}>
                      {item.is_flagship ? 'Flagship' : 'Ecosystem'}
                    </span>
                    <span className={`a-pill ${item.is_active ? 'green' : 'red'}`}>
                      {item.is_active ? 'Active' : 'Hidden'}
                    </span>
                  </div>
                </div>

                <div className="a-item-head">
                  <div className="a-item-thumb-sm">
                    {isImagePath(item.logo) ? (
                      <img src={item.logo} alt={item.name} />
                    ) : (
                      <span>{item.is_flagship ? '⭐' : '🧩'}</span>
                    )}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h4>{item.name}</h4>
                    {item.tag && <div className="a-muted" style={{ fontSize: '12px' }}>{item.tag}</div>}
                  </div>
                </div>

                {item.metric && <div className="a-item-kicker">{item.metric}</div>}
                <p className="a-item-desc">{item.description}</p>
              </div>

              <div className="a-item-foot">
                <span className="a-muted" style={{ fontSize: '11.5px', fontWeight: 600 }}>
                  {Array.isArray(item.features) ? item.features.length : 0} features · Order {item.sort_order}
                </span>
                <div className="a-actions">
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
                  <th>Product</th>
                  <th>Tag</th>
                  <th>Type</th>
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
                        {isImagePath(item.logo) ? (
                          <img src={item.logo} alt="" style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'contain', border: '1px solid var(--line)' }} />
                        ) : (
                          <span>{item.is_flagship ? '⭐' : '🧩'}</span>
                        )}
                        <strong>{item.name}</strong>
                      </div>
                    </td>
                    <td className="a-muted">{item.tag}</td>
                    <td>
                      <span className={`a-pill ${item.is_flagship ? 'blue' : 'slate'}`}>
                        {item.is_flagship ? 'Flagship' : 'Ecosystem'}
                      </span>
                    </td>
                    <td>
                      <span className={`a-pill ${item.is_active ? 'green' : 'red'}`}>
                        {item.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="a-muted">{item.sort_order}</td>
                    <td>
                      <div className="a-actions">
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
        title={editingProduct ? `Edit Product: ${editingProduct.name}` : 'Create New Product'}
        subtitle="Configure product overview, features, logo image, and interactive demo widget."
        size="lg"
      >
        <div className="a-subpage-pills" style={{ marginBottom: '18px' }}>
          {[
            { id: 'basic', label: '1. Product Info' },
            { id: 'media', label: '2. Logo Image & Features' },
            { id: 'demo', label: '3. Interactive Demo JSON' },
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
                <label>Product Name <span className="req">*</span></label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Synthex DataMesh"
                />
              </div>
              <div className="a-field">
                <label>Category Tag</label>
                <input
                  type="text"
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  placeholder="Conversational Enterprise BI"
                />
              </div>
              <div className="a-field">
                <label>Performance Metric Highlight</label>
                <input
                  type="text"
                  value={formData.metric}
                  onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                  placeholder="< 0.4s Query Response"
                />
              </div>
              <div className="a-field">
                <label>Sort Order</label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value, 10) || 0 })}
                />
              </div>
              <div className="a-field full">
                <label>Description <span className="req">*</span></label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ minHeight: '110px' }}
                />
              </div>
              <div className="a-field">
                <label className="a-radio">
                  <input
                    type="checkbox"
                    checked={formData.is_flagship}
                    onChange={(e) => setFormData({ ...formData, is_flagship: e.target.checked })}
                  />
                  Flagship product (homepage slider)
                </label>
              </div>
              <div className="a-field">
                <label className="a-radio">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  />
                  Visible on website
                </label>
              </div>
            </div>
          )}

          {modalTab === 'media' && (
            <div className="a-form-grid">
              <div className="full">
                <ImageField
                  label="Product Image / Logo"
                  value={formData.logo}
                  onChange={(val) => setFormData({ ...formData, logo: val })}
                  placeholder="./images/uploads/... or pulse-logo.png"
                />
              </div>
              <div className="a-field full">
                <label>Key Features <span className="a-hint">(One per line)</span></label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  style={{ minHeight: '160px' }}
                />
              </div>
            </div>
          )}

          {modalTab === 'demo' && (
            <div className="a-form-grid">
              <div className="full">
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '8px' }}>
                  Quick Demo Templates
                </label>
                <div className="a-actions">
                  <button
                    type="button"
                    className="a-btn sm"
                    onClick={() => setFormData({ ...formData, demo: JSON.stringify(DEMO_PRESETS.synthex, null, 2) })}
                  >
                    Synthex Analytics Preset
                  </button>
                  <button
                    type="button"
                    className="a-btn sm"
                    onClick={() => setFormData({ ...formData, demo: JSON.stringify(DEMO_PRESETS.clerk, null, 2) })}
                  >
                    DocuCognition Preset
                  </button>
                  <button
                    type="button"
                    className="a-btn sm"
                    onClick={() => setFormData({ ...formData, demo: JSON.stringify(DEMO_PRESETS.visiongate, null, 2) })}
                  >
                    VisionGate Preset
                  </button>
                  <button
                    type="button"
                    className="a-btn sm danger"
                    onClick={() => setFormData({ ...formData, demo: '' })}
                  >
                    Clear Demo
                  </button>
                </div>
              </div>
              <div className="a-field full">
                <label>Demo Data (JSON)</label>
                <textarea
                  value={formData.demo}
                  onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                  style={{ minHeight: '220px', fontFamily: 'monospace', fontSize: '12px' }}
                />
              </div>
            </div>
          )}

          <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid var(--line)', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" className="a-btn" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="a-btn primary" disabled={saving}>
              {saving ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
