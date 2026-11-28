import React from 'react';

/**
 * Shared polished header, search, filter pills, and view-mode toolbar for all Content modules.
 */
export default function ContentToolbar({
  icon = '📁',
  title,
  description,
  totalCount = 0,
  filteredCount = 0,
  addLabel = '+ Add New',
  onAdd,
  search = '',
  onSearchChange,
  searchPlaceholder = 'Search items...',
  filters = [],
  activeFilter = 'all',
  onFilterChange,
  viewMode = 'cards',
  onViewModeChange,
  notice = '',
}) {
  return (
    <>
      <div className="a-content-hero">
        <div className="a-content-hero-left">
          <div className="a-content-hero-ico">{icon}</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h2>{title}</h2>
              <span className="a-pill blue">{totalCount} Total</span>
            </div>
            {description && <p className="a-muted" style={{ fontSize: '13px', marginTop: '3px' }}>{description}</p>}
          </div>
        </div>

        <button type="button" onClick={onAdd} className="a-btn primary">
          {addLabel}
        </button>
      </div>

      {notice && <div className="a-flash">{notice}</div>}

      <div className="a-toolbar">
        <div className="a-search-box">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="a-search-clear"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {filters.length > 0 && (
          <div className="a-filter-pills">
            {filters.map((flt) => (
              <button
                key={flt.value}
                type="button"
                className={`a-subpage-pill ${activeFilter === flt.value ? 'active' : ''}`}
                onClick={() => onFilterChange(flt.value)}
              >
                {flt.label}
                {typeof flt.count === 'number' && (
                  <span style={{ opacity: 0.78, fontSize: '11px' }}>({flt.count})</span>
                )}
              </button>
            ))}
          </div>
        )}

        <div className="a-toolbar-right">
          <span className="a-muted" style={{ fontSize: '12px', fontWeight: 600 }}>
            Showing {filteredCount} of {totalCount}
          </span>
          {onViewModeChange && (
            <div className="a-view-switch">
              <button
                type="button"
                className={`a-view-btn ${viewMode === 'cards' ? 'active' : ''}`}
                onClick={() => onViewModeChange('cards')}
                title="Cards Grid View"
              >
                ⊞ Cards
              </button>
              <button
                type="button"
                className={`a-view-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => onViewModeChange('table')}
                title="Table View"
              >
                ☰ Table
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
