import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { AreaTrendChart, BarGraphChart, PieDonutChart } from '../../components/admin/DashboardCharts';

export default function AdminDashboard({ onNavigateTab }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/dashboard');
      if (res.data) {
        setData(res.data);
      }
    } catch (err) {
      console.error('Failed to load dashboard metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
        Loading dashboard analytics...
      </div>
    );
  }

  const c = data?.counts || {};
  const trend = data?.inquiries_trend || [];
  const seo = data?.seo_summary || {};
  const recentMessages = data?.recent_messages || [];

  const kpiCards = [
    {
      num: '01',
      label: 'Services',
      value: c.services ?? 0,
      sub: `${c.featured_services ?? 0} Featured on Home`,
      icon: '🛠️',
      accent: '#2563eb',
      tab: 'services',
    },
    {
      num: '02',
      label: 'Products',
      value: c.products ?? 0,
      sub: `${c.flagship_products ?? 0} Flagship · ${c.ecosystem_products ?? 0} Ecosystem`,
      icon: '📦',
      accent: '#0891b2',
      tab: 'products',
    },
    {
      num: '03',
      label: 'Team & Advisors',
      value: c.team_members ?? 0,
      sub: `${c.advisors ?? 0} Advisors · ${c.core_team ?? 0} Core`,
      icon: '👥',
      accent: '#7c3aed',
      tab: 'team',
    },
    {
      num: '04',
      label: 'Clients & Pilots',
      value: c.clients ?? 0,
      sub: `${c.official_clients ?? 0} Official · ${c.pilot_clients ?? 0} Pilots`,
      icon: '🤝',
      accent: '#059669',
      tab: 'clients',
    },
    {
      num: '05',
      label: 'Inquiries',
      value: c.messages ?? 0,
      sub: `${c.unread_messages ?? 0} Unread · ${c.read_messages ?? 0} Read`,
      icon: '✉️',
      accent: '#ea580c',
      tab: 'messages',
    },
    {
      num: '06',
      label: 'Industries',
      value: c.industries ?? 0,
      sub: `${c.tech_domains ?? 0} Tech Domains`,
      icon: '🏭',
      accent: '#0284c7',
      tab: 'industries',
    },
    {
      num: '07',
      label: 'Website Pages',
      value: c.total_indexable ?? 10,
      sub: `${c.total_pages ?? 10} Sections + ${c.services ?? 0} Services`,
      icon: '📄',
      accent: '#4f46e5',
      tab: 'pages',
    },
    {
      num: '08',
      label: 'Site Settings',
      value: c.settings ?? 0,
      sub: `${c.statistics ?? 0} Hero KPIs · ${c.methodologies ?? 0} Stages`,
      icon: '⚙️',
      accent: '#475569',
      tab: 'settings',
    },
  ];

  const contentPieItems = [
    { label: 'Services', value: c.services ?? 0, color: '#2563eb', onClick: () => onNavigateTab('services') },
    { label: 'Products', value: c.products ?? 0, color: '#06b6d4', onClick: () => onNavigateTab('products') },
    { label: 'Industries', value: c.industries ?? 0, color: '#10b981', onClick: () => onNavigateTab('industries') },
    { label: 'Clients & Pilots', value: c.clients ?? 0, color: '#8b5cf6', onClick: () => onNavigateTab('clients') },
    { label: 'Team & Advisors', value: c.team_members ?? 0, color: '#f59e0b', onClick: () => onNavigateTab('team') },
    { label: 'Tech Domains', value: c.tech_domains ?? 0, color: '#ec4899', onClick: () => onNavigateTab('tech-domains') },
    { label: 'Methodologies', value: c.methodologies ?? 0, color: '#6366f1', onClick: () => onNavigateTab('methodologies') },
  ];

  const moduleBarItems = [
    { label: 'Site Settings Keys', value: c.settings ?? 0, color: 'linear-gradient(90deg, #2563eb, #06b6d4)', onClick: () => onNavigateTab('settings') },
    { label: 'Services', value: c.services ?? 0, color: 'linear-gradient(90deg, #1d4ed8, #3b82f6)', onClick: () => onNavigateTab('services') },
    { label: 'Products', value: c.products ?? 0, color: 'linear-gradient(90deg, #0891b2, #22d3ee)', onClick: () => onNavigateTab('products') },
    { label: 'Industries', value: c.industries ?? 0, color: 'linear-gradient(90deg, #059669, #34d399)', onClick: () => onNavigateTab('industries') },
    { label: 'Clients & Pilots', value: c.clients ?? 0, color: 'linear-gradient(90deg, #7c3aed, #a78bfa)', onClick: () => onNavigateTab('clients') },
    { label: 'Methodologies', value: c.methodologies ?? 0, color: 'linear-gradient(90deg, #4f46e5, #818cf8)', onClick: () => onNavigateTab('methodologies') },
    { label: 'Comparisons & Values', value: (c.comparisons ?? 0) + (c.core_values ?? 0), color: 'linear-gradient(90deg, #d97706, #fbbf24)', onClick: () => onNavigateTab('pages') },
    { label: 'Team & Advisors', value: c.team_members ?? 0, color: 'linear-gradient(90deg, #db2777, #f472b6)', onClick: () => onNavigateTab('team') },
  ];

  const portfolioSplitItems = [
    { label: 'Flagship Products', value: c.flagship_products ?? 0, color: '#2563eb' },
    { label: 'Ecosystem Products', value: c.ecosystem_products ?? 0, color: '#06b6d4' },
    { label: 'Official Clients', value: c.official_clients ?? 0, color: '#10b981' },
    { label: 'Running Pilots', value: c.pilot_clients ?? 0, color: '#f59e0b' },
    { label: 'Advisors & Core', value: c.team_members ?? 0, color: '#8b5cf6' },
  ];

  const seoScore = seo.score ?? 0;

  return (
    <div className="a-dash-stack">
      {/* Top Hero Summary Banner */}
      <div className="a-dash-banner">
        <div>
          <span className="a-dash-kicker">EXECUTIVE COMMAND CENTER</span>
          <h2 className="a-dash-title">ABC AI System — Live Content, Inquiries &amp; SEO Overview</h2>
          <p className="a-dash-sub">
            Monitor all {c.total_indexable ?? 10} website pages, product/service inventories, client inquiries, and Google Analytics readiness at a glance.
          </p>
        </div>
        <div className="a-dash-banner-actions">
          <button type="button" className="a-btn sm" onClick={fetchDashboard}>
            ↻ Refresh
          </button>
          <button type="button" className="a-btn sm primary" onClick={() => onNavigateTab('pages')}>
            📄 Manage Pages
          </button>
          <button type="button" className="a-btn sm" onClick={() => onNavigateTab('seo')}>
            📈 SEO &amp; Analytics
          </button>
        </div>
      </div>

      {/* 8 Numbered KPI Cards */}
      <div className="a-grid">
        {kpiCards.map((k) => (
          <div
            key={k.num}
            className="a-stat a-stat-rich"
            onClick={() => onNavigateTab(k.tab)}
            style={{ '--stat-accent': k.accent }}
          >
            <div className="a-stat-top">
              <span className="a-num-badge">{k.num}</span>
              <span className="a-stat-ico">{k.icon}</span>
            </div>
            <div className="v">{k.value}</div>
            <div className="l">{k.label}</div>
            <div className="a-stat-sub">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Row 1: Pie/Donut Chart + Numbered Bar Graph */}
      <div className="a-dash-2col">
        <div className="a-card">
          <div className="a-card-head">
            <div>
              <h2>01. Content Distribution (Pie Chart)</h2>
              <p className="a-muted" style={{ fontSize: '12px', marginTop: '2px' }}>
                Hover any slice or row to inspect share &amp; count
              </p>
            </div>
            <span className="a-pill blue">Live DB</span>
          </div>
          <div className="a-card-body">
            <PieDonutChart items={contentPieItems} centerLabel="Total Records" />
          </div>
        </div>

        <div className="a-card">
          <div className="a-card-head">
            <div>
              <h2>02. Module Inventory Graph (Bar Chart)</h2>
              <p className="a-muted" style={{ fontSize: '12px', marginTop: '2px' }}>
                Numbered breakdown across all active website modules
              </p>
            </div>
            <button type="button" className="a-btn sm" onClick={() => onNavigateTab('pages')}>
              Edit Pages →
            </button>
          </div>
          <div className="a-card-body">
            <BarGraphChart items={moduleBarItems} />
          </div>
        </div>
      </div>

      {/* Row 2: 6-Month Inquiry Trend Graph + Portfolio Mix & SEO Readiness */}
      <div className="a-dash-2col">
        <div className="a-card">
          <div className="a-card-head">
            <div>
              <h2>03. Inquiry Volume Trend (6-Month Graph)</h2>
              <p className="a-muted" style={{ fontSize: '12px', marginTop: '2px' }}>
                Total: <b>{c.messages ?? 0}</b> · Unread: <b>{c.unread_messages ?? 0}</b> · Read: <b>{c.read_messages ?? 0}</b>
              </p>
            </div>
            <button type="button" className="a-btn sm" onClick={() => onNavigateTab('messages')}>
              Open Inbox →
            </button>
          </div>
          <div className="a-card-body">
            <AreaTrendChart data={trend} />
          </div>
        </div>

        <div className="a-card">
          <div className="a-card-head">
            <div>
              <h2>04. Portfolio Mix &amp; SEO Score</h2>
              <p className="a-muted" style={{ fontSize: '12px', marginTop: '2px' }}>
                Products, clients, team split &amp; search ranking health
              </p>
            </div>
            <span className={`a-pill ${seoScore >= 80 ? 'green' : 'amber'}`}>
              SEO {seoScore}%
            </span>
          </div>
          <div className="a-card-body" style={{ display: 'grid', gap: '16px' }}>
            <div className="a-seo-meter-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
                <span>Technical SEO &amp; Analytics Readiness</span>
                <span>{seoScore}%</span>
              </div>
              <div className="a-bar-track" style={{ height: '10px' }}>
                <div
                  className="a-bar-fill"
                  style={{
                    width: `${seoScore}%`,
                    background: seoScore >= 80 ? 'linear-gradient(90deg, #059669, #10b981)' : 'linear-gradient(90deg, #2563eb, #06b6d4)',
                  }}
                />
              </div>
              <div className="a-seo-status-pills">
                <span className={`a-pill ${seo.ga4_connected ? 'green' : 'slate'}`}>
                  GA4: {seo.ga4_connected ? 'Connected' : 'Not Set'}
                </span>
                <span className={`a-pill ${seo.gtm_connected ? 'green' : 'slate'}`}>
                  GTM: {seo.gtm_connected ? 'Connected' : 'Not Set'}
                </span>
                <span className={`a-pill ${seo.gsc_connected ? 'green' : 'slate'}`}>
                  Search Console: {seo.gsc_connected ? 'Verified' : 'Pending'}
                </span>
                <span className="a-pill blue">
                  Sitemap: Active ({c.total_indexable ?? 10} URLs)
                </span>
              </div>
            </div>

            <PieDonutChart items={portfolioSplitItems} centerLabel="Portfolio Mix" size={165} />
          </div>
        </div>
      </div>

      {/* Row 3: Numbered Recent Inquiries */}
      <div className="a-card">
        <div className="a-card-head">
          <div>
            <h2>05. Recent Contact Inquiries ({recentMessages.length})</h2>
            <p className="a-muted" style={{ fontSize: '12px', marginTop: '2px' }}>
              Latest messages submitted from the website contact form
            </p>
          </div>
          <button
            type="button"
            className="a-btn sm primary"
            onClick={() => onNavigateTab('messages')}
          >
            View All ({c.messages ?? 0})
          </button>
        </div>
        <div className="a-card-body">
          {recentMessages.length === 0 ? (
            <p className="a-empty">No messages yet.</p>
          ) : (
            recentMessages.map((msg, idx) => (
              <div key={msg.id} className={`a-msg ${!msg.is_read ? 'unread' : ''}`}>
                <div className="a-msg-head">
                  <span className="a-num-badge">#{idx + 1}</span>
                  <span className="who">{msg.name}</span>
                  <span className="mail">{msg.email}</span>
                  {!msg.is_read ? (
                    <span className="a-pill blue">New</span>
                  ) : (
                    <span className="a-pill slate">Read</span>
                  )}
                  <span className="time">{msg.created_at ? new Date(msg.created_at).toLocaleDateString() : ''}</span>
                </div>
                <p className="a-msg-body">{msg.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
