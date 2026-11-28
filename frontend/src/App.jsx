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
import AdminPages from './pages/admin/AdminPages';
import AdminSeo from './pages/admin/AdminSeo';
import AdminGenericResource from './pages/admin/AdminGenericResource';
import SeoHead from './components/SeoHead';

const SECTION_SLUGS = ['about', 'services', 'products', 'technology', 'industries', 'leadership', 'methodology', 'contact'];

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [currentView, setCurrentView] = useState('home');
  const [selectedServiceSlug, setSelectedServiceSlug] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [adminTab, setAdminTab] = useState('dashboard');

  // Handle URL hash & clean SEO path routing (e.g. #admin, #services/slug, /services/slug, /about)
  useEffect(() => {
    const syncRoute = () => {
      const hash = window.location.hash.replace(/^#/, '');
      const pathMatch = window.location.pathname.match(/\/(services\/[^/]+|about|services|products|technology|industries|leadership|methodology|contact)\/?$/i);
      const cleanPath = pathMatch ? pathMatch[1].toLowerCase() : '';

      if (hash.startsWith('services/')) {
        const slug = hash.replace('services/', '');
        setSelectedServiceSlug(slug);
        setCurrentView('service-detail');
      } else if (hash === 'admin' || hash === 'admin/dashboard') {
        setCurrentView('admin-dashboard');
      } else if (hash === 'login' || hash === 'admin/login') {
        setCurrentView('admin-login');
      } else if (!hash && cleanPath.startsWith('services/')) {
        const slug = cleanPath.replace('services/', '');
        setSelectedServiceSlug(slug);
        setCurrentView('service-detail');
      } else if (!hash && SECTION_SLUGS.includes(cleanPath)) {
        setCurrentView('home');
        setActiveSection(cleanPath);
        setTimeout(() => {
          const el = document.getElementById(cleanPath);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 180);
      } else if (SECTION_SLUGS.includes(hash)) {
        setCurrentView('home');
        setActiveSection(hash);
      } else if (!hash || hash.startsWith('#')) {
        if (currentView !== 'admin-dashboard' && currentView !== 'service-detail') {
          setCurrentView('home');
          setActiveSection('home');
        }
      }
    };

    syncRoute();
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
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
      <>
        <SeoHead currentView="admin-login" />
        <AdminLogin
          onBack={() => navigateTo('home')}
          onLoginSuccess={() => navigateTo('admin-dashboard')}
        />
      </>
    );
  }

  // Render Admin View
  if (currentView === 'admin-dashboard' && isAuthenticated) {
    return (
      <>
        <SeoHead currentView="admin-dashboard" />
        <AdminLayout
          activeTab={adminTab}
          onTabChange={(tab) => setAdminTab(tab)}
          onExitAdmin={() => navigateTo('home')}
        >
          {adminTab === 'dashboard' && <AdminDashboard onNavigateTab={(t) => setAdminTab(t)} />}
          {adminTab === 'pages' && <AdminPages />}
          {adminTab === 'seo' && <AdminSeo onNavigateTab={(t) => setAdminTab(t)} />}
          {adminTab === 'settings' && <AdminSettings />}
        {adminTab === 'services' && <AdminServices />}
        {adminTab === 'products' && <AdminProducts />}
        {adminTab === 'messages' && <AdminMessages />}

        {adminTab === 'team' && (
          <AdminGenericResource
            icon="👥"
            resourceName="team_members"
            endpoint="/admin/team-members"
            title="Team & Advisory Panel"
            description="Manage core team leaders and technical advisors with photos, roles, and expertise tags."
            filterField="category"
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
                default: 'core',
                required: true,
              },
              { name: 'photo', label: 'Member Photo', type: 'image', table: false },
              { name: 'bio', label: 'Biography', type: 'textarea', full: true },
              { name: 'tags', label: 'Expertise Tags (one per line)', type: 'array', full: true },
              { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
            ]}
          />
        )}

        {adminTab === 'clients' && (
          <AdminGenericResource
            icon="🤝"
            resourceName="clients"
            endpoint="/admin/clients"
            title="Clients & Running Pilots"
            description="Manage corporate enterprise partners and proof-of-concept deployments."
            filterField="group"
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
                default: 'clients',
                required: true,
              },
              { name: 'logo', label: 'Client Logo Image', type: 'image', table: false },
              { name: 'accent', label: 'Accent Color', type: 'color', default: '#0ea5e9' },
              { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
            ]}
          />
        )}

        {adminTab === 'industries' && (
          <AdminGenericResource
            icon="🏭"
            resourceName="industries"
            endpoint="/admin/industries"
            title="Industry Sectors"
            description="Manage covered economic sectors (Banking, Manufacturing, Telecom, etc.)."
            fields={[
              { name: 'name', label: 'Sector Name', required: true },
              { name: 'icon', label: 'Emoji / Icon', type: 'icon', default: '🏢' },
              { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
            ]}
          />
        )}

        {adminTab === 'tech-domains' && (
          <AdminGenericResource
            icon="⚡"
            resourceName="tech_domains"
            endpoint="/admin/tech-domains"
            title="Technology Domains"
            description="Proprietary technology domains (Computer Vision, NLP, Edge AI, etc.)."
            fields={[
              { name: 'title', label: 'Technology Domain Title', required: true },
              { name: 'icon', label: 'Icon', type: 'icon', default: '⚡' },
              { name: 'description', label: 'Overview Description', type: 'textarea', full: true },
              { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
            ]}
          />
        )}

        {adminTab === 'advantages' && (
          <AdminGenericResource
            icon="🚀"
            resourceName="advantages"
            endpoint="/admin/advantages"
            title="Core Advantages"
            description="Key proprietary advantages highlighted on the public site."
            fields={[
              { name: 'title', label: 'Advantage Title', required: true },
              { name: 'subtitle', label: 'Subtitle Highlight' },
              { name: 'icon', label: 'Icon', type: 'icon', default: '🚀' },
              { name: 'description', label: 'Description', type: 'textarea', full: true },
              { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
            ]}
          />
        )}

        {adminTab === 'methodologies' && (
          <AdminGenericResource
            icon="🔬"
            resourceName="methodologies"
            endpoint="/admin/methodologies"
            title="Engineering Methodologies"
            description="7-step structured AI validation process."
            fields={[
              { name: 'title', label: 'Step Title', required: true },
              { name: 'icon', label: 'Icon', type: 'icon', default: '🔬' },
              { name: 'description', label: 'Description', type: 'textarea', full: true },
              { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
            ]}
          />
        )}

        {adminTab === 'statistics' && (
          <AdminGenericResource
            icon="📊"
            resourceName="statistics"
            endpoint="/admin/statistics"
            title="Key Site Statistics"
            description="Top metrics displayed across the public hero and stats bar."
            fields={[
              { name: 'label', label: 'Metric Label', required: true },
              { name: 'value', label: 'Metric Value (e.g. 99.8%)', required: true },
              { name: 'sub', label: 'Sub-caption', full: true },
              { name: 'sort_order', label: 'Sort Order', type: 'number', default: 0 },
            ]}
          />
        )}
        </AdminLayout>
      </>
    );
  }

  // Render Admin Login
  if (currentView === 'admin-login') {
    return (
      <>
        <SeoHead currentView="admin-login" />
        <AdminLogin
          onBack={() => navigateTo('home')}
          onLoginSuccess={() => navigateTo('admin-dashboard')}
        />
      </>
    );
  }

  // Render Public Website
  return (
    <div className="site-wrapper">
      <SeoHead
        currentView={currentView}
        selectedServiceSlug={selectedServiceSlug}
        activeSection={activeSection}
      />
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
