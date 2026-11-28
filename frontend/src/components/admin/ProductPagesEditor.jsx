import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { ImageField } from './ImageField';

/**
 * Editor for Product items and their images/logos inside the Pages -> Products section.
 */
export default function ProductPagesEditor({ onSaved }) {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState(null);

  const loadProducts = async (selectId = null) => {
    try {
      setLoading(true);
      const res = await api.get('/admin/products');
      const list = res.data?.products || [];
      setProducts(list);
      const target = list.find((p) => p.id === (selectId ?? selectedId)) || list[0];
      if (target) {
        selectProduct(target);
      } else {
        setForm(null);
      }
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const selectProduct = (product) => {
    setSelectedId(product.id);
    setNotice('');
    setForm({
      id: product.id,
      name: product.name || '',
      tag: product.tag || '',
      metric: product.metric || '',
      logo: product.logo || '',
      description: product.description || '',
      featuresText: Array.isArray(product.features) ? product.features.join('\n') : '',
      demoJson: product.demo ? JSON.stringify(product.demo, null, 2) : '',
      is_flagship: !!product.is_flagship,
      is_active: !!product.is_active,
      sort_order: product.sort_order ?? 0,
    });
  };

  const createNew = () => {
    setSelectedId('new');
    setNotice('');
    setForm({
      id: null,
      name: '',
      tag: '',
      metric: '',
      logo: '',
      description: '',
      featuresText: '',
      demoJson: '',
      is_flagship: true,
      is_active: true,
      sort_order: products.length,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form) return;

    let parsedDemo = null;
    if (form.demoJson.trim()) {
      try {
        parsedDemo = JSON.parse(form.demoJson);
      } catch (err) {
        alert('Invalid JSON in Demo Data: ' + err.message);
        return;
      }
    }

    const payload = {
      name: form.name,
      tag: form.tag,
      metric: form.metric,
      logo: form.logo,
      description: form.description,
      features: form.featuresText ? form.featuresText.split('\n').map((s) => s.trim()).filter(Boolean) : [],
      demo: parsedDemo,
      is_flagship: form.is_flagship,
      is_active: form.is_active,
      sort_order: Number(form.sort_order) || 0,
    };

    try {
      setSaving(true);
      let savedId = form.id;
      if (form.id) {
        await api.put(`/admin/products/${form.id}`, payload);
      } else {
        const res = await api.post('/admin/products', payload);
        savedId = res.data?.product?.id || null;
      }
      setNotice('Product updated!');
      await loadProducts(savedId);
      if (onSaved) onSaved();
    } catch (err) {
      console.error('Failed to save product:', err);
      alert('Error saving product: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!form?.id || !window.confirm(`Delete product "${form.name}"?`)) return;
    try {
      await api.delete(`/admin/products/${form.id}`);
      await loadProducts();
      if (onSaved) onSaved();
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  return (
    <div className="a-card" style={{ marginTop: '18px' }}>
      <div className="a-card-head">
        <div>
          <h2>Products & Images ({products.length})</h2>
          <p className="a-muted" style={{ fontSize: '12px', marginTop: '2px' }}>
            Edit each flagship or ecosystem product, its image/logo, features, and visibility.
          </p>
        </div>
        <button type="button" className="a-btn sm primary" onClick={createNew}>
          + New Product
        </button>
      </div>

      <div className="a-card-body">
        {loading ? (
          <p className="a-empty">Loading products...</p>
        ) : (
          <>
            <div className="a-subpage-pills">
              {products.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`a-subpage-pill ${selectedId === p.id ? 'active' : ''}`}
                  onClick={() => selectProduct(p)}
                >
                  <span>{p.is_flagship ? '⭐' : '🧩'}</span>
                  <span>{p.name}</span>
                </button>
              ))}
            </div>

            {form && (
              <form onSubmit={handleSave} className="a-form" style={{ marginTop: '18px' }}>
                {notice && <div className="a-flash">{notice}</div>}

                <div className="a-form-grid">
                  <div className="a-field">
                    <label>Product Name <span className="req">*</span></label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="a-field">
                    <label>Tagline / Category</label>
                    <input
                      type="text"
                      value={form.tag}
                      onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    />
                  </div>
                  <div className="a-field">
                    <label>Metric Highlight</label>
                    <input
                      type="text"
                      value={form.metric}
                      onChange={(e) => setForm({ ...form, metric: e.target.value })}
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

                  <div className="full">
                    <ImageField
                      label="Product Image / Logo"
                      value={form.logo}
                      onChange={(val) => setForm({ ...form, logo: val })}
                      hint="Upload an image to display it on the product card"
                    />
                  </div>

                  <div className="a-field full">
                    <label>Description <span className="req">*</span></label>
                    <textarea
                      required
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  </div>

                  <div className="a-field">
                    <label>Features <span className="a-hint">(One per line)</span></label>
                    <textarea
                      value={form.featuresText}
                      onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
                      style={{ minHeight: '120px' }}
                    />
                  </div>
                  <div className="a-field">
                    <label>Interactive Demo Config (JSON)</label>
                    <textarea
                      value={form.demoJson}
                      onChange={(e) => setForm({ ...form, demoJson: e.target.value })}
                      style={{ minHeight: '120px', fontFamily: 'monospace', fontSize: '12px' }}
                    />
                  </div>

                  <div className="a-field">
                    <label className="a-radio">
                      <input
                        type="checkbox"
                        checked={form.is_flagship}
                        onChange={(e) => setForm({ ...form, is_flagship: e.target.checked })}
                      />
                      Flagship Slider Product
                    </label>
                  </div>
                  <div className="a-field">
                    <label className="a-radio">
                      <input
                        type="checkbox"
                        checked={form.is_active}
                        onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                      />
                      Visible on Website
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', gap: '10px' }}>
                  <div>
                    {form.id && (
                      <button type="button" className="a-btn sm danger" onClick={handleDelete}>
                        Delete Product
                      </button>
                    )}
                  </div>
                  <button type="submit" className="a-btn primary" disabled={saving}>
                    {saving ? 'Saving...' : form.id ? 'Save Product' : 'Create Product'}
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
