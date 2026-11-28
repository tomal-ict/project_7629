import React, { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, subtitle = '', size = 'md', children }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxW = size === 'lg' ? '860px' : '680px';

  return (
    <div
      className="a-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="a-modal-dialog" style={{ maxWidth: maxW }}>
        <div className="a-modal-head">
          <div>
            <h3>{title}</h3>
            {subtitle && <p className="a-muted" style={{ fontSize: '12px', marginTop: '2px' }}>{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="a-btn sm"
            aria-label="Close modal"
            style={{ padding: '4px 10px', fontSize: '13px' }}
          >
            ✕
          </button>
        </div>

        <div className="a-modal-body">{children}</div>
      </div>
    </div>
  );
}
