import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Modal from '../../components/Modal';

export default function AdminGenericResource({ resourceName, endpoint, fields, title, description }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await api.get(endpoint);
      if (res.data && res.data[resourceName]) {
        setItems(res.data[resourceName]);
      }
    } catch (err) {
      console.error(`Failed to load ${resourceName}:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [endpoint]);

  const openCreate = () => {
    setEditingItem(null);
    const initial = {};
    fields.forEach((f) => {
      initial[f.name] = f.default ?? '';
    });
    setFormData(initial);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    const populated = {};
    fields.forEach((f) => {
      if (f.type === 'array') {
        populated[f.name] = Array.isArray(item[f.name])
          ? item[f.name].map((x) => (typeof x === 'string' ? x : x.title || x.key || JSON.stringify(x))).join('\n')
          : '';
      } else {
        populated[f.name] = item[f.name] ?? '';
      }
    });
    setFormData(populated);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete this item?`)) return;
    try {
      await api.delete(`${endpoint}/${id}`);
      setItems(items.filter((x) => x.id !== id));
    } catch (err) {
      console.error(`Failed to delete ${resourceName}:`, err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };
    fields.forEach((f) => {
      if (f.type === 'array') {
        payload[f.name] = payload[f.name]
          ? payload[f.name].split('\n').map((l) => l.trim()).filter(Boolean)
          : [];
      }
    });

    try {
      if (editingItem) {
        await api.put(`${endpoint}/${editingItem.id}`, payload);
      } else {
        await api.post(endpoint, payload);
      }
      setModalOpen(false);
      fetchItems();
    } catch (err) {
      console.error(`Failed to save ${resourceName}:`, err);
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  const displayColumns = fields.filter((f) => f.table !== false).slice(0, 4);

  return (
    <div className="a-card">
      <div className="a-card-head">
        <h2>{title} ({items.length})</h2>
        <button type="button" onClick={openCreate} className="a-btn primary">
          + New {title.replace(/s$/, '')}
        </button>
      </div>

      <div className="a-table-wrap">
        <table className="a-table">
          <thead>
            <tr>
              {displayColumns.map((col) => (
                <th key={col.name}>{col.label}</th>
              ))}
              <th style={{ width: '120px' }}></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={displayColumns.length + 1} className="a-empty">Loading records...</td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={displayColumns.length + 1} className="a-empty">No records yet.</td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  {displayColumns.map((col, idx) => (
                    <td key={col.name}>
                      {idx === 0 ? (
                        <strong>{String(item[col.name] ?? '')}</strong>
                      ) : typeof item[col.name] === 'boolean' ? (
                        item[col.name] ? (
                          <span className="a-pill green">Yes</span>
                        ) : (
                          <span className="a-pill slate">No</span>
                        )
                      ) : (
                        <span className="a-muted">{String(item[col.name] ?? '')}</span>
                      )}
                    </td>
                  ))}
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
        title={editingItem ? `Edit ${title.replace(/s$/, '')}` : `New ${title.replace(/s$/, '')}`}
      >
        <form onSubmit={handleSubmit} className="a-form">
          <div className="a-form-grid">
            {fields.map((f) => (
              <div key={f.name} className={`a-field ${f.full ? 'full' : ''}`}>
                <label>
                  {f.label} {f.required && <span className="req">*</span>}
                  {f.hint && <span className="a-hint"> ({f.hint})</span>}
                </label>

                {f.type === 'textarea' || f.type === 'array' ? (
                  <textarea
                    required={f.required}
                    value={formData[f.name] ?? ''}
                    onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                  />
                ) : f.type === 'boolean' ? (
                  <label className="a-radio">
                    <input
                      type="checkbox"
                      checked={!!formData[f.name]}
                      onChange={(e) => setFormData({ ...formData, [f.name]: e.target.checked })}
                    />
                    Enabled
                  </label>
                ) : (
                  <input
                    type={f.type || 'text'}
                    required={f.required}
                    value={formData[f.name] ?? ''}
                    onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                  />
                )}
              </div>
            ))}
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
              {editingItem ? 'Save Changes' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
