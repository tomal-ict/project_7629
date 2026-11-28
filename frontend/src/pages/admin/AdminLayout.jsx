import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSite } from '../../context/SiteContext';

export default function AdminLayout({ activeTab, onTabChange, onExitAdmin, children }) {
  const { user, logout } = useAuth();
  const siteCtx = useSite();
  const settings = siteCtx?.settings || {};

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard Overview';
      case 'pages':
        return 'Manage Website Pages';
      case 'seo':
        return 'SEO & Google Analytics';
      case 'messages':
        return 'Contact Inquiries Inbox';
      case 'services':
        return 'Manage Services';
      case 'products':
        return 'Manage Products';
      case 'team':
        return 'Team Members & Advisors';
      case 'clients':
        return 'Clients & Running Pilots';
      case 'industries':
        return 'Industry Sectors';
      case 'tech-domains':
        return 'Technology Domains';
      case 'advantages':
        return 'The ABC Advantages';
      case 'methodologies':
        return 'Engineering Methodologies';
      case 'statistics':
        return 'Site Statistics';
      case 'settings':
        return 'Site Settings & Content';
      default:
        return 'Admin Panel';
    }
  };

  return (
    <div className="a-layout">
      <aside className="a-sidebar">
        <div className="a-brand">
          <img src={settings.site_logo || './images/logo.svg'} alt={settings.company_name || 'ABC AI System Limited'} />
          <div className="ab-txt">
            ABC AI System<small>ADMIN PANEL</small>
          </div>
        </div>

        <nav className="a-nav">
          <div className="a-label">Overview</div>
          <a
            href="#dashboard"
            onClick={(e) => {
              e.preventDefault();
              onTabChange('dashboard');
            }}
            className={activeTab === 'dashboard' ? 'active' : ''}
          >
            <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="7" height="9" x="3" y="3" rx="1" />
              <rect width="7" height="5" x="14" y="3" rx="1" />
              <rect width="7" height="9" x="14" y="12" rx="1" />
              <rect width="7" height="5" x="3" y="16" rx="1" />
            </svg>
            Dashboard
          </a>

          <a
            href="#pages"
            onClick={(e) => {
              e.preventDefault();
              onTabChange('pages');
            }}
            className={activeTab === 'pages' ? 'active' : ''}
          >
            <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" x2="8" y1="13" y2="13" />
              <line x1="16" x2="8" y1="17" y2="17" />
              <line x1="10" x2="8" y1="9" y2="9" />
            </svg>
            Pages
          </a>

          <div className="a-label">Inbox</div>
          <a
            href="#messages"
            onClick={(e) => {
              e.preventDefault();
              onTabChange('messages');
            }}
            className={activeTab === 'messages' ? 'active' : ''}
          >
            <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Messages
          </a>

          <div className="a-label">Content</div>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              onTabChange('services');
            }}
            className={activeTab === 'services' ? 'active' : ''}
          >
            Services
          </a>
          <a
            href="#products"
            onClick={(e) => {
              e.preventDefault();
              onTabChange('products');
            }}
            className={activeTab === 'products' ? 'active' : ''}
          >
            Products
          </a>
          <a
            href="#team"
            onClick={(e) => {
              e.preventDefault();
              onTabChange('team');
            }}
            className={activeTab === 'team' ? 'active' : ''}
          >
            Team Members
          </a>
          <a
            href="#clients"
            onClick={(e) => {
              e.preventDefault();
              onTabChange('clients');
            }}
            className={activeTab === 'clients' ? 'active' : ''}
          >
            Clients & Pilots
          </a>
          <a
            href="#industries"
            onClick={(e) => {
              e.preventDefault();
              onTabChange('industries');
            }}
            className={activeTab === 'industries' ? 'active' : ''}
          >
            Industries
          </a>
          <a
            href="#tech-domains"
            onClick={(e) => {
              e.preventDefault();
              onTabChange('tech-domains');
            }}
            className={activeTab === 'tech-domains' ? 'active' : ''}
          >
            Tech Domains
          </a>
          <a
            href="#advantages"
            onClick={(e) => {
              e.preventDefault();
              onTabChange('advantages');
            }}
            className={activeTab === 'advantages' ? 'active' : ''}
          >
            Advantages
          </a>
          <a
            href="#methodologies"
            onClick={(e) => {
              e.preventDefault();
              onTabChange('methodologies');
            }}
            className={activeTab === 'methodologies' ? 'active' : ''}
          >
            Methodologies
          </a>
          <a
            href="#statistics"
            onClick={(e) => {
              e.preventDefault();
              onTabChange('statistics');
            }}
            className={activeTab === 'statistics' ? 'active' : ''}
          >
            Statistics
          </a>

          <div className="a-label">System</div>
          <a
            href="#seo"
            onClick={(e) => {
              e.preventDefault();
              onTabChange('seo');
            }}
            className={activeTab === 'seo' ? 'active' : ''}
          >
            <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
              <path d="M11 7v8" />
              <path d="M7 11h8" />
            </svg>
            SEO &amp; Analytics
          </a>
          <a
            href="#settings"
            onClick={(e) => {
              e.preventDefault();
              onTabChange('settings');
            }}
            className={activeTab === 'settings' ? 'active' : ''}
          >
            Site Settings
          </a>

          <div className="a-foot">
            <a
              href="#site"
              onClick={(e) => {
                e.preventDefault();
                onExitAdmin();
              }}
            >
              View Site ↗
            </a>
            <a
              href="#logout"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              style={{ color: '#ef4444' }}
            >
              Sign Out
            </a>
          </div>
        </nav>
      </aside>

      <div className="a-main">
        <header className="a-topbar">
          <h1>{getTitle()}</h1>
          <div className="a-topbar-actions">
            <div className="a-user">
              <div className="a-avatar">A</div>
              <span>{user?.name || 'Administrator'}</span>
            </div>
          </div>
        </header>

        <div className="a-content">{children}</div>
      </div>
    </div>
  );
}
