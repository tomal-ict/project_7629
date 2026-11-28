import React, { useEffect, useMemo, useState } from 'react';
import api from '../../services/api';
import { useSite } from '../../context/SiteContext';
import Modal from '../../components/Modal';
import { ImageField } from '../../components/admin/ImageField';

const GROUP_META = {
  general: { label: 'General & Brand', icon: '🏢', desc: 'Company identity, logo, address, phone, email, and social URLs.' },
  hero: { label: 'Hero Banner', icon: '🚀', desc: 'Top hero headline, badge, call-to-action buttons, and AI Core labels.' },
  about: { label: 'About Us', icon: '🧠', desc: 'Overview copy, bullet points, vision, mission, and client section headings.' },
  services: { label: 'Services', icon: '🛠️', desc: 'Services section headings and consultation CTA text.' },
  products: { label: 'Products', icon: '📦', desc: 'Flagship & ecosystem product headings.' },
  technology: { label: 'Technology', icon: '⚡', desc: 'Neural architecture, comparison table, and advantage headings.' },
  industries: { label: 'Industries', icon: '🏭', desc: 'Industry sector coverage headings.' },
  leadership: { label: 'Leadership', icon: '👥', desc: 'Advisory board, core team, and founder perspective quotes.' },
  methodology: { label: 'Methodology', icon: '🔬', desc: '7-stage validation lifecycle headings.' },
  contact: { label: 'Contact', icon: '✉️', desc: 'Contact section titles, labels, and inquiry form headings.' },
  footer: { label: 'Footer', icon: '🧩', desc: 'Footer tagline and company navigation link labels.' },
  seo: { label: 'SEO & Analytics', icon: '🔍', desc: 'Meta titles, descriptions, GA4, GTM, verification codes, and OG images.' },
};

const formatKeyLabel = (key) =>
  String(key || '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

const isImageSetting = (key) =>
  /(^|_)(image|logo|og_image|photo)$/i.test(String(key || ''));

const isLongSetting = (key, val) => {
  const s = String(val || '');
  return (
    s.length > 85 ||
    s.includes('\n') ||
    /(body|sub|text|quotes|description|tagline|robots_txt|address)$/i.test(String(key || ''))
  );
};

export default function AdminSettings() {
  const { refreshData } = useSite();
  const [settingsList, setSettingsList] = useState([]);
  const [draftValues, setDraftValues] = useState({});
  const [activeGroup, setActiveGroup] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [newForm, setNewForm] = useState({ group: 'general', key: '', value: '' });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/settings');
      const list = res.data?.settings || [];
      setSettingsList(list);
      const initial = {};
      list.forEach((s) => {
        initial[s.key] = s.value ?? '';
      });
      setDraftValues(initial);
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const groupCounts = useMemo(() => {
    const map = {};
    settingsList.forEach((s) => {
      const g = s.group || 'general';
      map[g] = (map[g] || 0) + 1;
    });
    return map;
  }, [settingsList]);

  const orderedGroups = useMemo(() => {
    const known = Object.keys(GROUP_META).filter((g) => groupCounts[g]);
    const extra = Object.keys(groupCounts).filter((g) => !GROUP_META[g]);
    return [...known, ...extra];
  }, [groupCounts]);

  const dirtyKeys = useMemo(() => {
    return settingsList
      .filter((s) => (draftValues[s.key] ?? '') !== (s.value ?? ''))
      .map((s) => s.key);
  }, [settingsList, draftValues]);

  const filteredSettings = useMemo(() => {
    const q = search.trim().toLowerCase();
    return settingsList.filter((s) => {
      if (!q && activeGroup !== 'all' && (s.group || 'general') !== activeGroup) {
        return false;
      }
      if (q) {
        return (
          (s.key || '').toLowerCase().includes(q) ||
          (s.group || '').toLowerCase().includes(q) ||
          String(draftValues[s.key] ?? '').toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [settingsList, activeGroup, search, draftValues]);

  const groupedVisible = useMemo(() => {
    const out = {};
    filteredSettings.forEach((s) => {
      const g = s.group || 'general';
      if (!out[g]) out[g] = [];
      out[g].push(s);
    });
    return out;
  }, [filteredSettings]);

  const handleSaveAllChanges = async () => {
    if (dirtyKeys.length === 0) return;

    const payload = {};
    const groups = {};
    dirtyKeys.forEach((key) => {
      const row = settingsList.find((s) => s.key === key);
      payload[key] = draftValues[key] ?? '';
      groups[key] = row?.group || 'general';
    });

    try {
      setSaving(true);
      setNotice('');
      await api.post('/admin/settings/bulk', { settings: payload, groups });
      await fetchSettings();
      await refreshData();
      setNotice(`Saved ${dirtyKeys.length} setting${dirtyKeys.length > 1 ? 's' : ''} to live website!`);
    } catch (err) {
      console.error('Failed to save settings:', err);
      alert('Error saving settings: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleResetChanges = () => {
    const reset = {};
    settingsList.forEach((s) => {
      reset[s.key] = s.value ?? '';
    });
    setDraftValues(reset);
    setNotice('');
  };

  const handleCreateSetting = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.post('/admin/settings', newForm);
      setModalOpen(false);
      setNewForm({ group: activeGroup === 'all' ? 'general' : activeGroup, key: '', value: '' });
      await fetchSettings();
      await refreshData();
      setNotice(`Created setting "${newForm.key}".`);
    } catch (err) {
      console.error('Failed to create setting:', err);
      alert('Error creating setting: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSetting = async (setting) => {
    if (!window.confirm(`Delete setting "${setting.key}"?`)) return;
    try {
      await api.delete(`/admin/settings/${setting.id}`);
      await fetchSettings();
      await refreshData();
      setNotice(`Deleted setting "${setting.key}".`);
    } catch (err) {
      console.error('Failed to delete setting:', err);
      alert('Failed to delete setting.');
    }
  };

  return (
    <div className="a-dash-stack">
      {/* Header Banner */}
      <div className="a-content-hero">
        <div className="a-content-hero-left">
          <div className="a-content-hero-ico">⚙️</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h2>Site Settings &amp; System Control</h2>
              <span className="a-pill blue">{settingsList.length} Settings</span>
              <span className="a-pill slate">{orderedGroups.length} Groups</span>
              {dirtyKeys.length > 0 && (
                <span className="a-pill amber">{dirtyKeys.length} Unsaved</span>
              )}
            </div>
            <p className="a-muted" style={{ fontSize: '13px', marginTop: '3px' }}>
              Edit any site-wide setting inline across all sections, upload brand images, and publish changes in one click.
            </p>
          </div>
        </div>

        <div className="a-actions">
          {dirtyKeys.length > 0 && (
            <>
              <button type="button" className="a-btn sm" onClick={handleResetChanges} disabled={saving}>
                Discard
              </button>
              <button type="button" className="a-btn primary" onClick={handleSaveAllChanges} disabled={saving}>
                {saving ? 'Saving...' : `Save Changes (${dirtyKeys.length})`}
              </button>
            </>
          )}
          <button
            type="button"
            className={`a-btn ${dirtyKeys.length === 0 ? 'primary' : ''}`}
            onClick={() => {
              setNewForm({ group: activeGroup === 'all' ? 'general' : activeGroup, key: '', value: '' });
              setModalOpen(true);
            }}
          >
            + New Setting
          </button>
        </div>
      </div>

      {notice && <div className="a-flash">{notice}</div>}

      {/* Search + Group Pills */}
      <div className="a-toolbar" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div className="a-search-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search settings by key, group, or value (e.g. phone, email, hero, logo)..."
            />
            {search && (
              <button type="button" className="a-search-clear" onClick={() => setSearch('')} aria-label="Clear search">
                ✕
              </button>
            )}
          </div>
          <span className="a-muted" style={{ fontSize: '12px', fontWeight: 600 }}>
            Showing {filteredSettings.length} of {settingsList.length} keys
          </span>
        </div>

        {!search && (
          <div className="a-filter-pills">
            <button
              type="button"
              className={`a-subpage-pill ${activeGroup === 'all' ? 'active' : ''}`}
              onClick={() => setActiveGroup('all')}
            >
              All Groups ({settingsList.length})
            </button>
            {orderedGroups.map((g) => {
              const meta = GROUP_META[g] || { label: formatKeyLabel(g), icon: '⚙️' };
              return (
                <button
                  key={g}
                  type="button"
                  className={`a-subpage-pill ${activeGroup === g ? 'active' : ''}`}
                  onClick={() => setActiveGroup(g)}
                >
                  <span>{meta.icon}</span>
                  <span>{meta.label}</span>
                  <span style={{ opacity: 0.78, fontSize: '11px' }}>({groupCounts[g]})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Inline Group Editor Cards */}
      {loading ? (
        <div className="a-card"><p className="a-empty">Loading site settings...</p></div>
      ) : Object.keys(groupedVisible).length === 0 ? (
        <div className="a-card"><p className="a-empty">No settings match "{search}".</p></div>
      ) : (
        Object.keys(groupedVisible).map((groupKey) => {
          const meta = GROUP_META[groupKey] || { label: formatKeyLabel(groupKey), icon: '⚙️', desc: '' };
          const rows = groupedVisible[groupKey];
          return (
            <div key={groupKey} className="a-card">
              <div className="a-card-head">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '18px' }}>{meta.icon}</span>
                  <div>
                    <h2 style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      {meta.label}
                      <span className="a-pill slate">{rows.length}</span>
                    </h2>
                    {meta.desc && <p className="a-muted" style={{ fontSize: '12px', marginTop: '2px' }}>{meta.desc}</p>}
                  </div>
                </div>
                {dirtyKeys.some((k) => rows.some((r) => r.key === k)) && (
                  <button
                    type="button"
                    className="a-btn sm primary"
                    onClick={handleSaveAllChanges}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                )}
              </div>

              <div className="a-card-body">
                <div className="a-form-grid">
                  {rows.map((setting, idx) => {
                    const val = draftValues[setting.key] ?? '';
                    const isDirty = val !== (setting.value ?? '');
                    const isImg = isImageSetting(setting.key);
                    const isLong = !isImg && isLongSetting(setting.key, val);

                    if (isImg) {
                      return (
                        <div key={setting.id} className="full a-setting-box">
                          <div className="a-setting-row-head">
                            <span className="a-num-badge">{String(idx + 1).padStart(2, '0')}</span>
                            <strong>{formatKeyLabel(setting.key)}</strong>
                            <code className="a-code-tag">{setting.key}</code>
                            {isDirty && <span className="a-pill amber">Modified</span>}
                            <button
                              type="button"
                              className="a-btn sm danger"
                              style={{ marginLeft: 'auto' }}
                              onClick={() => handleDeleteSetting(setting)}
                            >
                              Delete
                            </button>
                          </div>
                          <ImageField
                            value={val}
                            onChange={(nextVal) => setDraftValues({ ...draftValues, [setting.key]: nextVal })}
                          />
                        </div>
                      );
                    }

                    return (
                      <div
                        key={setting.id}
                        className={`a-field a-setting-box ${isLong ? 'full' : ''}`}
                        style={isDirty ? { borderColor: '#f59e0b', background: '#fffbeb' } : undefined}
                      >
                        <div className="a-setting-row-head">
                          <span className="a-num-badge">{String(idx + 1).padStart(2, '0')}</span>
                          <label style={{ margin: 0 }}>{formatKeyLabel(setting.key)}</label>
                          <code className="a-code-tag">{setting.key}</code>
                          {isDirty && <span className="a-pill amber">Modified</span>}
                          <button
                            type="button"
                            className="a-btn sm danger"
                            style={{ marginLeft: 'auto', padding: '2px 8px' }}
                            onClick={() => handleDeleteSetting(setting)}
                            title="Delete setting"
                          >
                            ✕
                          </button>
                        </div>

                        {isLong ? (
                          <textarea
                            value={val}
                            onChange={(e) => setDraftValues({ ...draftValues, [setting.key]: e.target.value })}
                            style={{ minHeight: '84px', marginTop: '8px' }}
                          />
                        ) : (
                          <input
                            type="text"
                            value={val}
                            onChange={(e) => setDraftValues({ ...draftValues, [setting.key]: e.target.value })}
                            style={{ marginTop: '8px' }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* Floating Save Bar when changes are pending */}
      {dirtyKeys.length > 0 && (
        <div className="a-sticky-savebar">
          <span>
            <strong>{dirtyKeys.length}</strong> unsaved setting change{dirtyKeys.length > 1 ? 's' : ''}
          </span>
          <div className="a-actions">
            <button type="button" className="a-btn sm" onClick={handleResetChanges} disabled={saving}>
              Discard
            </button>
            <button type="button" className="a-btn primary" onClick={handleSaveAllChanges} disabled={saving}>
              {saving ? 'Saving...' : 'Save All Changes'}
            </button>
          </div>
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create New Setting"
        subtitle="Add a custom configuration key to any settings group."
      >
        <form onSubmit={handleCreateSetting} className="a-form">
          <div className="a-form-grid">
            <div className="a-field">
              <label>Group <span className="req">*</span></label>
              <select
                value={newForm.group}
                onChange={(e) => setNewForm({ ...newForm, group: e.target.value })}
              >
                {Object.keys(GROUP_META).map((g) => (
                  <option key={g} value={g}>
                    {GROUP_META[g].label} ({g})
                  </option>
                ))}
              </select>
            </div>
            <div className="a-field">
              <label>Setting Key <span className="req">*</span></label>
              <input
                type="text"
                required
                value={newForm.key}
                onChange={(e) => setNewForm({ ...newForm, key: e.target.value.trim().toLowerCase().replace(/\s+/g, '_') })}
                placeholder="e.g. support_whatsapp"
              />
            </div>
            <div className="a-field full">
              <label>Value</label>
              <textarea
                value={newForm.value}
                onChange={(e) => setNewForm({ ...newForm, value: e.target.value })}
                style={{ minHeight: '100px' }}
              />
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" className="a-btn" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="a-btn primary" disabled={saving}>
              {saving ? 'Creating...' : 'Create Setting'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
