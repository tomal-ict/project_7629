import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SiteProvider } from './context/SiteContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminServices from './pages/admin/AdminServices';
import AdminProducts from './pages/admin/AdminProducts';
import AdminSettings from './pages/admin/AdminSettings';
import AdminMessages from './pages/admin/AdminMessages';
import AdminGenericResource from './pages/admin/AdminGenericResource';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [currentView, setCurrentView] = useState('home');
  const [selectedServiceSlug, setSelectedServiceSlug] = useState(null);
  const [adminTab, setAdminTab] = useState('dashboard');

  // Handle URL hash changes for deep linking (e.g. #admin, #services/slug)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#/, '');

      if (hash.startsWith('services/')) {
        const slug = hash.replace('services/', '');
        setSelectedServiceSlug(slug);
        setCurrentView('service-detail');
      } else if (hash === 'admin' || hash === 'admin/dashboard') {
        setCurrentView('admin-dashboard');
      } else if (hash === 'login' || hash === 'admin/login') {
        setCurrentView('admin-login');
      } else if (!hash || hash.startsWith('#')) {
        if (currentView !== 'admin-dashboard' && currentView !== 'service-detail') {
          setCurrentView('home');
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (view, extra = null) => {
    setCurrentView(view);
    if (view === 'service-detail' && extra) {
      setSelectedServiceSlug(extra);
      window.location.hash = `services/${extra}`;
    } else if (view === 'admin-dashboard') {
      window.location.hash = 'admin';
    } else if (view === 'admin-login') {
      window.location.hash = 'login';
    } else if (view === 'home') {
      window.location.hash = '';
      setSelectedServiceSlug(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user is trying to view admin dashboard but not authenticated, show login
  if (currentView === 'admin-dashboard' && !loading && !isAuthenticated) {
    return (
      <AdminLogin
        onBack={() => navigateTo('home')}
        onLoginSuccess={() => navigateTo('admin-dashboard')}
      />
    );
  }

  // Render Admin View
  if (currentView === 'admin-dashboard' && isAuthenticated) {
    return (
      <AdminLayout
        activeTab={adminTab}
        onTabChange={(tab) => setAdminTab(tab)}
        onExitAdmin={() => navigateTo('home')}
      >
        {adminTab === 'dashboard' && <AdminDashboard onNavigateTab={(t) => setAdminTab(t)} />}
        {adminTab === 'settings' && <AdminSettings />}
        {adminTab === 'services' && <AdminServices />}
        {adminTab === 'products' && <AdminProducts />}
        {adminTab === 'messages' && <AdminMessages />}

        {adminTab === 'team' && (
          <AdminGenericResource
            resourceName="team_members"
            endpoint="/admin/team-members"
            title="Team & Advisory Panel"
            description="Manage core team leaders and technical advisors."
            fields={[
              { name: 'name', label: 'Full Name', required: true },
              { name: 'role', label: 'Title / Designation', required: true },
              {
                name: 'category',
                label: 'Category',
                type: 'select',
                options: [
                  { value: 'core', label: 'Core Team' },
                  { value: 'advisor', label: 'Advisory Panel' },
                ],
                required: true,
              },
              { name: 'bio', label: 'Biography', type: 'textarea' },
              { name: 'tags', label: 'Expertise Tags (one per line)', type: 'array' },
              { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
            ]}
          />
        )}

        {adminTab === 'clients' && (
          <AdminGenericResource
            resourceName="clients"
            endpoint="/admin/clients"
            title="Clients & Running Pilots"
            description="Manage corporate enterprise partners and proof-of-concept deployments."
            fields={[
              { name: 'name', label: 'Organization Name', required: true },
              {
                name: 'group',
                label: 'Client Classification',
                type: 'select',
                options: [
                  { value: 'clients', label: 'Official Client' },
                  { value: 'pilots', label: 'Pilot Running' },
                ],
                required: true,
              },
              { name: 'website', label: 'Website URL' },
              { name: 'description', label: 'Engagement Description', type: 'textarea' },
              { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
            ]}
          />
        )}

        {adminTab === 'industries' && (
          <AdminGenericResource
            resourceName="industries"
            endpoint="/admin/industries"
            title="Industry Sectors"
            description="Manage covered economic sectors (Banking, Manufacturing, Telecom, etc.)."
            fields={[
              { name: 'name', label: 'Sector Name', required: true },
              { name: 'icon', label: 'Emoji / Icon', default: '🏢' },
              { name: 'description', label: 'Description', type: 'textarea' },
              { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
            ]}
          />
        )}

        {adminTab === 'tech-domains' && (
          <AdminGenericResource
            resourceName="tech_domains"
            endpoint="/admin/tech-domains"
            title="Technology Domains"
            description="Proprietary technology domains (Computer Vision, NLP, Edge AI, etc.)."
            fields={[
              { name: 'name', label: 'Technology Domain Name', required: true },
              { name: 'icon', label: 'Icon', default: '⚡' },
              { name: 'description', label: 'Overview Description', type: 'textarea' },
              { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
            ]}
          />
        )}

        {adminTab === 'advantages' && (
          <AdminGenericResource
            resourceName="advantages"
            endpoint="/admin/advantages"
            title="Core Advantages"
            description="Key proprietary advantages highlighted on the public site."
            fields={[
              { name: 'title', label: 'Advantage Title', required: true },
              { name: 'subtitle', label: 'Subtitle Highlight' },
              { name: 'icon', label: 'Icon', default: '🚀' },
              { name: 'description', label: 'Description', type: 'textarea' },
              { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
            ]}
          />
        )}

        {adminTab === 'methodologies' && (
          <AdminGenericResource
            resourceName="methodologies"
            endpoint="/admin/methodologies"
            title="Engineering Methodologies"
            description="7-step structured AI validation process."
            fields={[
              { name: 'phase', label: 'Phase Tag (e.g. PHASE 01)', required: true },
              { name: 'title', label: 'Step Title', required: true },
              { name: 'description', label: 'Description', type: 'textarea' },
              { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
            ]}
          />
        )}

        {adminTab === 'statistics' && (
          <AdminGenericResource
            resourceName="statistics"
            endpoint="/admin/statistics"
            title="Key Site Statistics"
            description="Top metrics displayed across the public hero and stats bar."
            fields={[
              { name: 'label', label: 'Metric Label', required: true },
              { name: 'value', label: 'Metric Value (e.g. 99.8%)', required: true },
              { name: 'suffix', label: 'Suffix (e.g. % or +)' },
              { name: 'icon', label: 'Icon', default: '⚡' },
              { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
            ]}
          />
        )}
      </AdminLayout>
    );
  }

  // Render Admin Login
  if (currentView === 'admin-login') {
    return (
      <AdminLogin
        onBack={() => navigateTo('home')}
        onLoginSuccess={() => navigateTo('admin-dashboard')}
      />
    );
  }

  // Render Public Website
  return (
    <div className="site-wrapper">
      <Navbar onNavigate={navigateTo} currentView={currentView} />

      <div className="flex-1">
        {currentView === 'home' && (
          <Home
            onSelectService={(s) => navigateTo('service-detail', s.slug)}
            onNavigate={navigateTo}
          />
        )}

        {currentView === 'service-detail' && (
          <ServiceDetail
            serviceSlug={selectedServiceSlug}
            onBack={() => navigateTo('home')}
            onSelectService={(s) => navigateTo('service-detail', s.slug)}
          />
        )}
      </div>

      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SiteProvider>
        <AppContent />
      </SiteProvider>
    </AuthProvider>
  );
}
