import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Modal from '../../components/Modal';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    subtitle: '',
    icon: '🤖',
    intro: '',
    description: '',
    features: '',
    why_us: '',
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
    setFormData({
      title: '',
      slug: '',
      subtitle: '',
      icon: '🤖',
      intro: '',
      description: '',
      features: '',
      why_us: '',
      featured_on_home: true,
      sort_order: services.length,
    });
    setModalOpen(true);
  };

  const openEdit = (service) => {
    setEditingService(service);
    const featuresStr = Array.isArray(service.features)
      ? service.features.map((f) => (typeof f === 'string' ? f : f.title || f.key || JSON.stringify(f))).join('\n')
      : '';

    setFormData({
      title: service.title || '',
      slug: service.slug || '',
      subtitle: service.subtitle || '',
      icon: service.icon || '🤖',
      intro: service.intro || '',
      description: service.description || '',
      features: featuresStr,
      why_us: service.why_us || '',
      featured_on_home: !!service.featured_on_home,
      sort_order: service.sort_order || 0,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await api.delete(`/admin/services/${id}`);
      setServices(services.filter((s) => s.id !== id));
    } catch (err) {
      console.error('Failed to delete service:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      features: formData.features
        ? formData.features.split('\n').map((l) => l.trim()).filter(Boolean)
        : [],
    };

    try {
      if (editingService) {
        await api.patch(`/admin/services/${editingService.id}`, payload);
      } else {
        await api.post('/admin/services', payload);
      }
      setModalOpen(false);
      fetchServices();
    } catch (err) {
      console.error('Failed to save service:', err);
      alert('Error saving service: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="a-card">
      <div className="a-card-head">
        <h2>Services ({services.length})</h2>
        <button type="button" onClick={openCreate} className="a-btn primary">
          + New Service
        </button>
      </div>

      <div className="a-table-wrap">
        <table className="a-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Featured</th>
              <th>Order</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="a-empty">Loading services...</td>
              </tr>
            ) : services.length === 0 ? (
              <tr>
                <td colSpan="6" className="a-empty">No services yet.</td>
              </tr>
            ) : (
              services.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontSize: '20px' }}>{item.icon}</td>
                  <td>
                    <strong>{item.title}</strong>
                    <div className="a-muted" style={{ fontSize: '11.5px' }}>
                      /services/{item.slug}
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
                      <a
                        href={`#/services/${item.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="a-btn sm"
                      >
                        View
                      </a>
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
        title={editingService ? 'Edit Service' : 'New Service'}
      >
        <form onSubmit={handleSubmit} className="a-form">
          <div className="a-form-grid">
            <div className="a-field">
              <label>Title <span className="req">*</span></label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="a-field">
              <label>Slug <span className="req">*</span></label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>
            <div className="a-field">
              <label>Icon (Emoji or text)</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
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
            <div className="a-field full">
              <label>Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              />
            </div>
            <div className="a-field full">
              <label>Intro Overview</label>
              <textarea
                value={formData.intro}
                onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
              />
            </div>
            <div className="a-field full">
              <label>Detailed Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="a-field full">
              <label>Features <span className="a-hint">(One per line)</span></label>
              <textarea
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                style={{ minHeight: '120px' }}
              />
            </div>
            <div className="a-field full">
              <label className="a-radio">
                <input
                  type="checkbox"
                  checked={formData.featured_on_home}
                  onChange={(e) => setFormData({ ...formData, featured_on_home: e.target.checked })}
                />
                Show on Homepage Tabs
              </label>
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
              {editingService ? 'Update Service' : 'Create Service'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
