import React from 'react';

export function SeoCharBadge({ value = '', max = 60, minGood = 30 }) {
  const len = (value || '').trim().length;
  const cls = len === 0 ? 'slate' : len > max ? 'amber' : len >= minGood ? 'green' : 'blue';
  return (
    <span className={`a-pill ${cls}`} style={{ marginLeft: '8px', fontSize: '10.5px' }}>
      {len} / {max} chars
    </span>
  );
}

/**
 * Live Google Search result snippet preview for any page or service.
 */
export default function SeoSnippetPreview({ title, description, url }) {
  const displayTitle = (title || '').trim() || 'Architecting Sovereign Enterprise Intelligence — ABC AI System Limited';
  const displayDesc = (description || '').trim() || 'Add a meta description (120–160 chars) to improve search click-through rate.';
  const displayUrl = (url || '').trim() || 'https://www.abcaisystemltd.com/';

  return (
    <div className="a-seo-preview">
      <div className="a-seo-preview-label">Google Search Snippet Preview</div>
      <div className="a-seo-preview-url">{displayUrl}</div>
      <div className="a-seo-preview-title">{displayTitle.slice(0, 70)}</div>
      <div className="a-seo-preview-desc">{displayDesc.slice(0, 165)}</div>
    </div>
  );
}
