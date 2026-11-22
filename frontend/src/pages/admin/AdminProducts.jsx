import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Modal from '../../components/Modal';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
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

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/admin/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Failed to delete product:', err);
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
      if (editingProduct) {
        await api.patch(`/admin/products/${editingProduct.id}`, payload);
      } else {
        await api.post('/admin/products', payload);
      }
      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error('Failed to save product:', err);
      alert('Error saving product: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="a-card">
      <div className="a-card-head">
        <h2>Products ({products.length})</h2>
        <button type="button" onClick={openCreate} className="a-btn primary">
          + New Product
        </button>
      </div>

      <div className="a-table-wrap">
        <table className="a-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Tag</th>
              <th>Type</th>
              <th>Status</th>
              <th>Order</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="a-empty">Loading products...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="6" className="a-empty">No products yet.</td>
              </tr>
            ) : (
              products.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.name}</strong></td>
                  <td className="a-muted">{item.tag}</td>
                  <td>
                    {item.is_flagship ? (
                      <span className="a-pill blue">Flagship</span>
                    ) : (
                      <span className="a-pill slate">More</span>
                    )}
                  </td>
                  <td>
                    {item.is_active ? (
                      <span className="a-pill green">Active</span>
                    ) : (
                      <span className="a-pill red">Hidden</span>
                    )}
                  </td>
                  <td className="a-muted">{item.sort_order}</td>
                  <td>
                    <div className="a-actions">
                      <button
                        type="button"
                        onClick={() => openEdit(item)}
                        className="a-btn sm"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="a-btn sm danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProduct ? 'Edit Product' : 'New Product'}
      >
        <form onSubmit={handleSubmit} className="a-form">
          <div className="a-form-grid">
            <div className="a-field">
              <label>Name <span className="req">*</span></label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="a-field">
              <label>Tag</label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="Analytics"
              />
            </div>
            <div className="a-field">
              <label>Metric</label>
              <input
                type="text"
                value={formData.metric}
                onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                placeholder="< 1 sec Query Response"
              />
            </div>
            <div className="a-field">
              <label>Logo Filename</label>
              <input
                type="text"
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                placeholder="pulse-logo.png"
              />
            </div>
            <div className="a-field">
              <label>Sort Order</label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="a-field">
              <label>Flagship</label>
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
              <label>Active</label>
              <label className="a-radio">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                Visible on website
              </label>
            </div>
            <div className="a-field full">
              <label>Description <span className="req">*</span></label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="a-field">
              <label>Features <span className="a-hint">One per line</span></label>
              <textarea
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                style={{ minHeight: '140px' }}
              />
            </div>
            <div className="a-field">
              <label>Demo Data (JSON)</label>
              <textarea
                value={formData.demo}
                onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                style={{ minHeight: '140px', fontFamily: 'monospace', fontSize: '12px' }}
              />
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="a-btn"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="a-btn primary"
            >
              {editingProduct ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
