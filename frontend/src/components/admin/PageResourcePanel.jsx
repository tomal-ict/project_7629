import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Modal from '../Modal';
import { ImageField } from './ImageField';

const isImagePath = (val) => typeof val === 'string' && /^(\.\/|\/|https?:\/\/)/i.test(val.trim());

/**
 * Reusable inline CRUD panel for managing items belonging to a specific website page.
 */
export default function PageResourcePanel({
  title,
  description,
  endpoint,
  resourceKey,
  fields,
  onChanged,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get(endpoint);
      if (res.data && res.data[resourceKey]) {
        setItems(res.data[resourceKey]);
      }
    } catch (err) {
      console.error(`Failed to load ${resourceKey}:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [endpoint]);

  const openCreate = () => {
    setEditing(null);
    const init = {};
    fields.forEach((f) => {
      init[f.name] = f.default ?? (f.type === 'number' ? items.length : '');
    });
    setFormData(init);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    const next = {};
    fields.forEach((f) => {
      if (f.type === 'array') {
        next[f.name] = Array.isArray(item[f.name])
          ? item[f.name].map((v) => (typeof v === 'string' ? v : v.title || v.key || JSON.stringify(v))).join('\n')
          : '';
      } else {
        next[f.name] = item[f.name] ?? '';
      }
    });
    setFormData(next);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await api.delete(`${endpoint}/${id}`);
      await load();
      if (onChanged) onChanged();
    } catch (err) {
      console.error(`Failed to delete ${resourceKey}:`, err);
      alert('Failed to delete item.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };
    fields.forEach((f) => {
      if (f.type === 'array') {
        payload[f.name] = payload[f.name]
          ? String(payload[f.name]).split('\n').map((s) => s.trim()).filter(Boolean)
          : [];
      }
    });

    try {
      setSaving(true);
      if (editing) {
        await api.put(`${endpoint}/${editing.id}`, payload);
      } else {
        await api.post(endpoint, payload);
      }
      setModalOpen(false);
      await load();
      if (onChanged) onChanged();
    } catch (err) {
      console.error(`Failed to save ${resourceKey}:`, err);
      alert('Error saving: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const previewCols = fields.filter((f) => f.table !== false && f.type !== 'image').slice(0, 2);
  const imageFieldDef = fields.find((f) => f.type === 'image');

  return (
    <div className="a-card" style={{ marginTop: '18px' }}>
      <div className="a-card-head">
        <div>
          <h2>{title} ({items.length})</h2>
          {description && <p className="a-muted" style={{ fontSize: '12px', marginTop: '2px' }}>{description}</p>}
        </div>
        <button type="button" className="a-btn primary sm" onClick={openCreate}>
          + Add Item
        </button>
      </div>

      <div className="a-table-wrap">
        <table className="a-table">
          <thead>
            <tr>
              {imageFieldDef && <th style={{ width: '56px' }}>Photo</th>}
              {previewCols.map((c) => (
                <th key={c.name}>{c.label}</th>
              ))}
              <th style={{ width: '130px' }}></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={previewCols.length + (imageFieldDef ? 2 : 1)} className="a-empty">Loading...</td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={previewCols.length + (imageFieldDef ? 2 : 1)} className="a-empty">No items yet.</td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  {imageFieldDef && (
                    <td>
                      {isImagePath(item[imageFieldDef.name]) ? (
                        <img
                          src={item[imageFieldDef.name]}
                          alt=""
                          style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--line)' }}
                        />
                      ) : (
                        <span className="a-muted" style={{ fontSize: '11px' }}>—</span>
                      )}
                    </td>
                  )}
                  {previewCols.map((c, idx) => (
                    <td key={c.name}>
                      {idx === 0 ? <strong>{String(item[c.name] ?? '')}</strong> : <span className="a-muted">{String(item[c.name] ?? '')}</span>}
                    </td>
                  ))}
                  <td>
                    <div className="a-actions">
                      <button type="button" className="a-btn sm" onClick={() => openEdit(item)}>Edit</button>
                      <button type="button" className="a-btn sm danger" onClick={() => handleDelete(item.id)}>Delete</button>
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
        title={editing ? `Edit ${title}` : `Add ${title}`}
      >
        <form onSubmit={handleSubmit} className="a-form">
          <div className="a-form-grid">
            {fields.map((f) => {
              if (f.type === 'image') {
                return (
                  <div key={f.name} className="full">
                    <ImageField
                      label={f.label}
                      value={formData[f.name] || ''}
                      onChange={(val) => setFormData({ ...formData, [f.name]: val })}
                      hint={f.hint}
                    />
                  </div>
                );
              }

              return (
                <div key={f.name} className={`a-field ${f.full ? 'full' : ''}`}>
                  <label>
                    {f.label} {f.required && <span className="req">*</span>}
                    {f.hint && <span className="a-hint"> ({f.hint})</span>}
                  </label>
                  {f.type === 'select' ? (
                    <select
                      required={f.required}
                      value={formData[f.name] ?? ''}
                      onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                    >
                      {(f.options || []).map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : f.type === 'textarea' || f.type === 'array' ? (
                    <textarea
                      required={f.required}
                      value={formData[f.name] ?? ''}
                      onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                    />
                  ) : (
                    <input
                      type={f.type || 'text'}
                      required={f.required}
                      value={formData[f.name] ?? ''}
                      onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '16px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" className="a-btn" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="a-btn primary" disabled={saving}>
              {saving ? 'Saving...' : editing ? 'Save Changes' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
