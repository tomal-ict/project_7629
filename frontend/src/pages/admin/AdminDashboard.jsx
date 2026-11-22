import React, { useEffect, useState } from 'react';
import api from '../../services/api';

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
        Loading dashboard metrics...
      </div>
    );
  }

  const counts = data?.counts || {};
  const recentMessages = data?.recent_messages || [];

  return (
    <>
      <div className="a-grid">
        <div className="a-stat" style={{ cursor: 'pointer' }} onClick={() => onNavigateTab('services')}>
          <div className="v">{counts.services ?? 0}</div>
          <div className="l">Services</div>
        </div>
        <div className="a-stat" style={{ cursor: 'pointer' }} onClick={() => onNavigateTab('products')}>
          <div className="v">{counts.products ?? 0}</div>
          <div className="l">Products</div>
        </div>
        <div className="a-stat" style={{ cursor: 'pointer' }} onClick={() => onNavigateTab('team')}>
          <div className="v">{counts.team_members ?? 0}</div>
          <div className="l">Team Members</div>
        </div>
        <div className="a-stat" style={{ cursor: 'pointer' }} onClick={() => onNavigateTab('clients')}>
          <div className="v">{counts.clients ?? 0}</div>
          <div className="l">Clients &amp; Pilots</div>
        </div>
        <div className="a-stat" style={{ cursor: 'pointer' }} onClick={() => onNavigateTab('messages')}>
          <div className="v">{counts.unread_messages ?? 0}</div>
          <div className="l">Unread Messages</div>
        </div>
        <div className="a-stat" style={{ cursor: 'pointer' }} onClick={() => onNavigateTab('settings')}>
          <div className="v">{counts.settings ?? 0}</div>
          <div className="l">Site Settings</div>
        </div>
        <div className="a-stat" style={{ cursor: 'pointer' }} onClick={() => onNavigateTab('statistics')}>
          <div className="v">{counts.statistics ?? 0}</div>
          <div className="l">Statistics</div>
        </div>
        <div className="a-stat" style={{ cursor: 'pointer' }} onClick={() => onNavigateTab('industries')}>
          <div className="v">{counts.industries ?? 0}</div>
          <div className="l">Industries</div>
        </div>
      </div>

      <div className="a-card">
        <div className="a-card-head">
          <h2>Recent Messages</h2>
          <button
            type="button"
            className="a-btn sm"
            onClick={() => onNavigateTab('messages')}
          >
            View All
          </button>
        </div>
        <div className="a-card-body">
          {recentMessages.length === 0 ? (
            <p className="a-empty">No messages yet.</p>
          ) : (
            recentMessages.map((msg) => (
              <div key={msg.id} className={`a-msg ${!msg.is_read ? 'unread' : ''}`}>
                <div className="a-msg-head">
                  <span className="who">{msg.name}</span>
                  <span className="mail">{msg.email}</span>
                  {!msg.is_read && <span className="a-pill blue">New</span>}
                  <span className="time">{msg.created_at ? new Date(msg.created_at).toLocaleDateString() : ''}</span>
                </div>
                <p className="a-msg-body">{msg.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
