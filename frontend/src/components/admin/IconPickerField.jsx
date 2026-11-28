import React from 'react';

const QUICK_ICONS = ['🚀', '🤖', '🧠', '⚡', '🛡️', '📊', '🔬', '🎓', '🗂️', '🥽', '🏭', '🏦', '🏥', '🚚', '🌾', '💡', '🔒', '🌐'];

export default function IconPickerField({ label = 'Icon (Emoji)', value = '', onChange, required = false }) {
  return (
    <div className="a-field">
      <label>
        {label} {required && <span className="req">*</span>}
      </label>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <div className="a-icon-preview">{value || '✨'}</div>
        <input
          type="text"
          required={required}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="🤖"
        />
      </div>
      <div className="a-emoji-row">
        {QUICK_ICONS.map((em) => (
          <button
            key={em}
            type="button"
            className={`a-emoji-btn ${value === em ? 'active' : ''}`}
            onClick={() => onChange(em)}
          >
            {em}
          </button>
        ))}
      </div>
    </div>
  );
}
