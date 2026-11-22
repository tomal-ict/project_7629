import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin({ onBack, onLoginSuccess }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@abcaisystemltd.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await login(email, password);
      if (res.success) {
        onLoginSuccess();
      } else {
        setError(res.message || 'Authentication failed. Please check credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login attempt failed. Rate limit may apply.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f1f5f9',
      padding: '24px 16px',
      fontFamily: 'inherit'
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img
            src="./images/logo.svg"
            alt="ABC AI System Limited"
            style={{ height: '42px', margin: '0 auto 12px', display: 'block' }}
          />
          <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
            ABC AI System Limited
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Administrator Access Portal
          </p>
        </div>

        <div className="a-card" style={{ padding: '28px', borderRadius: '16px', boxShadow: '0 4px 16px rgba(15,23,42,0.06)' }}>
          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '13px',
              fontWeight: 600,
              marginBottom: '16px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="a-form">
            <div className="a-field">
              <label>Email Address <span className="req">*</span></label>
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@abcaisystemltd.com"
              />
            </div>

            <div className="a-field">
              <label>Password <span className="req">*</span></label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '10px 12px',
              fontSize: '11.5px',
              color: '#64748b',
              lineHeight: 1.5
            }}>
              <strong style={{ color: '#334155' }}>Default Demo Credentials:</strong><br />
              Email: <code>admin@abcaisystemltd.com</code><br />
              Password: <code>admin123</code>
            </div>

            <div style={{ marginTop: '8px' }}>
              <button
                type="submit"
                disabled={loading}
                className="a-btn primary"
                style={{ width: '100%', justifyContent: 'center', padding: '11px', fontSize: '14px' }}
              >
                {loading ? 'Authenticating via Secure API...' : 'Log in to Admin Panel'}
              </button>
            </div>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            type="button"
            onClick={onBack}
            className="a-btn sm"
            style={{ color: '#64748b' }}
          >
            ← Back to Website
          </button>
        </div>
      </div>
    </div>
  );
}
