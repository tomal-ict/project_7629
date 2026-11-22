import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useSite } from '../../context/SiteContext';
import Modal from '../../components/Modal';

export default function AdminSettings() {
  const { refreshData } = useSite();
  const [grouped, setGrouped] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSetting, setEditingSetting] = useState(null);
  const [formData, setFormData] = useState({
    group: 'general',
    key: '',
    value: '',
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/settings');
      if (res.data && res.data.grouped) {
        setGrouped(res.data.grouped);
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const openCreate = () => {
    setEditingSetting(null);
    setFormData({ group: 'general', key: '', value: '' });
    setModalOpen(true);
  };

  const openEdit = (setting) => {
    setEditingSetting(setting);
    setFormData({
      group: setting.group || 'general',
      key: setting.key || '',
      value: setting.value || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this setting?')) return;
    try {
      await api.delete(`/admin/settings/${id}`);
      fetchSettings();
      refreshData();
    } catch (err) {
      console.error('Failed to delete setting:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSetting) {
        await api.patch(`/admin/settings/${editingSetting.id}`, formData);
      } else {
        await api.post('/admin/settings', formData);
      }
      setModalOpen(false);
      fetchSettings();
      refreshData();
    } catch (err) {
      console.error('Failed to save setting:', err);
      alert('Error saving setting: ' + (err.response?.data?.message || err.message));
    }
  };

  const groups = Object.keys(grouped);

  return (
    <div className="a-card">
      <div className="a-card-head">
        <h2>Site Settings</h2>
        <button type="button" onClick={openCreate} className="a-btn primary">
          + New Setting
        </button>
      </div>

      <div className="a-card-body" style={{ display: 'grid', gap: '24px' }}>
        {loading ? (
          <p className="a-empty">Loading site settings...</p>
        ) : groups.length === 0 ? (
          <p className="a-empty">No settings yet.</p>
        ) : (
          groups.map((group) => (
            <div key={group}>
              <h3 style={{
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#0891b2',
                marginBottom: '10px',
              }}>
                {group}
              </h3>
              <div className="a-table-wrap" style={{ border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden' }}>
                <table className="a-table">
                  <tbody>
                    {grouped[group].map((setting) => (
                      <tr key={setting.id}>
                        <td style={{ width: '32%' }} className="a-muted">
                          <strong style={{ color: '#334155' }}>{setting.key}</strong>
                        </td>
                        <td style={{ wordBreak: 'break-word' }}>
                          {setting.value && setting.value.length > 100
                            ? setting.value.substring(0, 100) + '...'
                            : setting.value}
                        </td>
                        <td style={{ whiteSpace: 'nowrap', width: '150px' }}>
                          <div className="a-actions">
                            <button
                              type="button"
                              onClick={() => openEdit(setting)}
                              className="a-btn sm"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(setting.id)}
                              className="a-btn sm danger"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingSetting ? 'Edit Setting' : 'New Setting'}
      >
        <form onSubmit={handleSubmit} className="a-form">
          <div className="a-form-grid">
            <div className="a-field">
              <label>Group</label>
              <input
                type="text"
                required
                value={formData.group}
                onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                placeholder="general, hero, contact, etc."
              />
            </div>
            <div className="a-field">
              <label>Key <span className="req">*</span></label>
              <input
                type="text"
                required
                value={formData.key}
                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                placeholder="site_name"
              />
            </div>
            <div className="a-field full">
              <label>Value</label>
              <textarea
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                style={{ minHeight: '100px' }}
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
              {editingSetting ? 'Update Setting' : 'Create Setting'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
