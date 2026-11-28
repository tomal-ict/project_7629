import React, { useRef, useState } from 'react';
import api from '../../services/api';

/**
 * Reusable admin image field with live preview, URL/path input, and direct image upload.
 */
export function ImageField({
  label,
  value = '',
  onChange,
  placeholder = './images/... or https://...',
  hint = '',
  defaultPreview = '',
}) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const rawPreview = (value || '').trim() || defaultPreview;
  const previewSrc = /^(\.\/|\/|https?:\/\/|data:)/i.test(rawPreview) ? rawPreview : '';

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await api.post('/admin/upload', fd);
      if (res.data && res.data.url) {
        onChange(res.data.url);
      } else {
        setError('Upload succeeded without URL.');
      }
    } catch (err) {
      console.error('Image upload failed:', err);
      setError(err.response?.data?.message || err.message || 'Upload failed.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="a-field">
      {label && (
        <label>
          {label}
          {hint && <span className="a-hint" style={{ fontWeight: 500, marginLeft: '6px' }}>({hint})</span>}
        </label>
      )}

      <div className="a-img-picker">
        <div className="a-img-thumb">
          {previewSrc ? (
            <img src={previewSrc} alt={label || 'Preview'} />
          ) : (
            <span className="a-muted" style={{ fontSize: '11px' }}>No Image</span>
          )}
        </div>

        <div className="a-img-controls">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
          <div className="a-actions" style={{ marginTop: '8px' }}>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              className="a-btn sm primary"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
            >
              {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
            {value && (
              <button
                type="button"
                className="a-btn sm danger"
                onClick={() => onChange('')}
              >
                Clear
              </button>
            )}
          </div>
          {error && <div className="a-err">{error}</div>}
        </div>
      </div>
    </div>
  );
}

/**
 * Multi-image gallery editor with per-item preview, URL input, upload, and remove/add controls.
 */
export function GalleryImagesField({ label = 'Gallery Images', images = [], onChange }) {
  const list = Array.isArray(images) ? images : [];

  const updateAt = (index, url) => {
    const next = [...list];
    next[index] = url;
    onChange(next);
  };

  const removeAt = (index) => {
    onChange(list.filter((_, idx) => idx !== index));
  };

  const addItem = () => {
    onChange([...list, '']);
  };

  return (
    <div className="a-field full">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <label style={{ margin: 0 }}>{label} ({list.length})</label>
        <button type="button" className="a-btn sm" onClick={addItem}>
          + Add Gallery Image
        </button>
      </div>

      {list.length === 0 ? (
        <div className="a-muted" style={{ fontSize: '12.5px', padding: '12px', border: '1px dashed var(--line)', borderRadius: '10px' }}>
          No gallery images yet. Click "+ Add Gallery Image" to add one.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '12px' }}>
          {list.map((imgUrl, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '10px', border: '1px solid var(--line)', borderRadius: '10px', background: '#f8fafc' }}>
              <div style={{ flex: 1 }}>
                <ImageField
                  label={`Gallery Image #${idx + 1}`}
                  value={imgUrl}
                  onChange={(val) => updateAt(idx, val)}
                />
              </div>
              <button
                type="button"
                className="a-btn sm danger"
                onClick={() => removeAt(idx)}
                style={{ marginTop: '24px' }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
