import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useSite } from '../../context/SiteContext';
import Modal from '../../components/Modal';
import ContentToolbar from '../../components/admin/ContentToolbar';
import IconPickerField from '../../components/admin/IconPickerField';
import { ImageField } from '../../components/admin/ImageField';

const isImagePath = (val) => typeof val === 'string' && /^(\.\/|\/|https?:\/\/)/i.test(val.trim());

const getInitials = (name) =>
  (name || '')
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();

export default function AdminGenericResource({
  resourceName,
  endpoint,
  fields,
  title,
  description,
  icon = '📁',
  filterField = null,
}) {
  const { refreshData } = useSite();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');

  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('cards');

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
    setSearch('');
    setActiveFilter('all');
    setNotice('');
    fetchItems();
  }, [endpoint]);

  const openCreate = () => {
    setEditingItem(null);
    const initial = {};
    fields.forEach((f) => {
      initial[f.name] = f.default ?? (f.type === 'number' ? items.length : '');
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

  const handleDelete = async (item) => {
    const label = item.name || item.title || item.label || `#${item.id}`;
    if (!window.confirm(`Delete "${label}"?`)) return;
    try {
      await api.delete(`${endpoint}/${item.id}`);
      setItems((prev) => prev.filter((x) => x.id !== item.id));
      setNotice(`Deleted "${label}".`);
      refreshData();
    } catch (err) {
      console.error(`Failed to delete ${resourceName}:`, err);
      alert('Failed to delete item.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };
    fields.forEach((f) => {
      if (f.type === 'array') {
        payload[f.name] = payload[f.name]
          ? String(payload[f.name]).split('\n').map((l) => l.trim()).filter(Boolean)
          : [];
      }
    });

    try {
      setSaving(true);
      if (editingItem) {
        await api.put(`${endpoint}/${editingItem.id}`, payload);
        setNotice('Changes saved successfully!');
      } else {
        await api.post(endpoint, payload);
        setNotice('New item added successfully!');
      }
      setModalOpen(false);
      await fetchItems();
      refreshData();
    } catch (err) {
      console.error(`Failed to save ${resourceName}:`, err);
      alert('Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const filterFieldDef = filterField ? fields.find((f) => f.name === filterField) : null;
  const filterTabs = filterFieldDef?.options
    ? [
        { value: 'all', label: 'All', count: items.length },
        ...filterFieldDef.options.map((opt) => ({
          value: opt.value,
          label: opt.label,
          count: items.filter((it) => it[filterField] === opt.value).length,
        })),
      ]
    : [];

  const filteredItems = items.filter((item) => {
    if (filterField && activeFilter !== 'all' && item[filterField] !== activeFilter) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return Object.values(item).some((v) => String(v ?? '').toLowerCase().includes(q));
    }
    return true;
  });

  const imageFieldDef = fields.find((f) => f.type === 'image');
  const iconFieldDef = fields.find((f) => f.type === 'icon');
  const displayColumns = fields.filter((f) => f.table !== false && f.type !== 'image').slice(0, 4);
  const singularTitle = title.replace(/s$/, '');

  return (
    <div className="a-dash-stack">
      <ContentToolbar
        icon={icon}
        title={title}
        description={description}
        totalCount={items.length}
        filteredCount={filteredItems.length}
        addLabel={`+ Add ${singularTitle}`}
        onAdd={openCreate}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder={`Search ${title.toLowerCase()}...`}
        filters={filterTabs}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        notice={notice}
      />

      {loading ? (
        <div className="a-card"><p className="a-empty">Loading records...</p></div>
      ) : filteredItems.length === 0 ? (
        <div className="a-card">
          <div className="a-empty">
            No records found.{' '}
            <button type="button" className="a-btn sm primary" onClick={openCreate} style={{ marginLeft: '8px' }}>
              + Add {singularTitle}
            </button>
          </div>
        </div>
      ) : viewMode === 'cards' ? (
        <div className="a-item-grid">
          {filteredItems.map((item, idx) => {
            const primaryText = item.name || item.title || item.label || `#${item.id}`;
            const secondaryText = item.role || item.subtitle || item.value || '';
            const descText = item.bio || item.description || item.sub || '';
            const imgVal = imageFieldDef ? item[imageFieldDef.name] : '';
            const iconVal = iconFieldDef ? item[iconFieldDef.name] : '';
            const badgeVal = filterField ? item[filterField] : '';

            return (
              <div key={item.id} className="a-item-card">
                <div className="a-item-body" style={{ paddingTop: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="a-num-badge">#{String(idx + 1).padStart(2, '0')}</span>
                    <div className="a-actions" style={{ gap: '6px' }}>
                      {badgeVal && (
                        <span className={`a-pill ${badgeVal === 'advisor' || badgeVal === 'pilots' ? 'amber' : 'blue'}`}>
                          {filterFieldDef?.options?.find((o) => o.value === badgeVal)?.label || badgeVal}
                        </span>
                      )}
                      {item.accent && (
                        <span
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: item.accent,
                            border: '2px solid #fff',
                            boxShadow: '0 0 0 1px #cbd5e1',
                          }}
                          title={`Accent: ${item.accent}`}
                        />
                      )}
                    </div>
                  </div>

                  <div className="a-item-head">
                    {imageFieldDef ? (
                      <div className="a-item-thumb-sm">
                        {isImagePath(imgVal) ? (
                          <img src={imgVal} alt={primaryText} />
                        ) : (
                          <span style={{ fontWeight: 800, fontSize: '13px', color: '#2563eb' }}>
                            {getInitials(primaryText)}
                          </span>
                        )}
                      </div>
                    ) : iconVal ? (
                      <span className="a-item-ico">{iconVal}</span>
                    ) : null}

                    <div style={{ minWidth: 0 }}>
                      <h4>{primaryText}</h4>
                      {secondaryText && <div className="a-item-kicker" style={{ marginTop: '2px' }}>{secondaryText}</div>}
                    </div>
                  </div>

                  {descText && <p className="a-item-desc">{descText}</p>}

                  {Array.isArray(item.tags) && item.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '10px' }}>
                      {item.tags.slice(0, 3).map((t, tIdx) => (
                        <span key={tIdx} className="a-pill slate" style={{ fontSize: '10.5px' }}>
                          {typeof t === 'string' ? t : t.title || t.key}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="a-item-foot">
                  <span className="a-muted" style={{ fontSize: '11.5px', fontWeight: 600 }}>
                    Order {item.sort_order ?? 0}
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
            );
          })}
        </div>
      ) : (
        <div className="a-card">
          <div className="a-table-wrap">
            <table className="a-table">
              <thead>
                <tr>
                  <th style={{ width: '56px' }}>#</th>
                  {imageFieldDef && <th style={{ width: '64px' }}>Image</th>}
                  {displayColumns.map((col) => (
                    <th key={col.name}>{col.label}</th>
                  ))}
                  <th style={{ width: '140px' }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, rIdx) => (
                  <tr key={item.id}>
                    <td><span className="a-num-badge">{String(rIdx + 1).padStart(2, '0')}</span></td>
                    {imageFieldDef && (
                      <td>
                        {isImagePath(item[imageFieldDef.name]) ? (
                          <img
                            src={item[imageFieldDef.name]}
                            alt=""
                            style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--line)' }}
                          />
                        ) : (
                          <span className="a-muted">—</span>
                        )}
                      </td>
                    )}
                    {displayColumns.map((col, idx) => (
                      <td key={col.name}>
                        {idx === 0 ? (
                          <strong>{String(item[col.name] ?? '')}</strong>
                        ) : typeof item[col.name] === 'boolean' ? (
                          <span className={`a-pill ${item[col.name] ? 'green' : 'slate'}`}>
                            {item[col.name] ? 'Yes' : 'No'}
                          </span>
                        ) : (
                          <span className="a-muted">{String(item[col.name] ?? '')}</span>
                        )}
                      </td>
                    ))}
                    <td>
                      <div className="a-actions">
                        <button type="button" onClick={() => openEdit(item)} className="a-btn sm primary">
                          Edit
                        </button>
                        <button type="button" onClick={() => handleDelete(item)} className="a-btn sm danger">
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
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? `Edit ${singularTitle}` : `Add New ${singularTitle}`}
        subtitle={description}
      >
        <form onSubmit={handleSubmit} className="a-form">
          <div className="a-form-grid">
            {fields.map((f) => {
              if (f.type === 'image') {
                return (
                  <div key={f.name} className="full">
                    <ImageField
                      label={f.label}
                      value={formData[f.name] ?? ''}
                      onChange={(val) => setFormData({ ...formData, [f.name]: val })}
                      hint={f.hint}
                    />
                  </div>
                );
              }
              if (f.type === 'icon') {
                return (
                  <IconPickerField
                    key={f.name}
                    label={f.label}
                    required={f.required}
                    value={formData[f.name] ?? ''}
                    onChange={(val) => setFormData({ ...formData, [f.name]: val })}
                  />
                );
              }
              if (f.type === 'color') {
                return (
                  <div key={f.name} className="a-field">
                    <label>{f.label}</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="color"
                        value={formData[f.name] || '#0ea5e9'}
                        onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                        style={{ width: '48px', height: '40px', padding: '2px', cursor: 'pointer' }}
                      />
                      <input
                        type="text"
                        value={formData[f.name] || ''}
                        onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                        placeholder="#0ea5e9"
                      />
                    </div>
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
              );
            })}
          </div>

          <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--line)', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" className="a-btn" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="a-btn primary" disabled={saving}>
              {saving ? 'Saving...' : editingItem ? 'Save Changes' : `Create ${singularTitle}`}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
