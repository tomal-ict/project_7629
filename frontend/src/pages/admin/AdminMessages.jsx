import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/messages');
      if (res.data && res.data.messages) {
        setMessages(res.data.messages);
      }
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id) => {
    try {
      await api.patch(`/admin/messages/${id}/read`);
      setMessages(messages.map((m) => (m.id === id ? { ...m, is_read: true } : m)));
    } catch (err) {
      console.error('Failed to mark read:', err);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/admin/messages/${id}`);
      setMessages(messages.filter((m) => m.id !== id));
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  return (
    <div className="a-card">
      <div className="a-card-head">
        <h2>Contact Messages ({messages.length})</h2>
        <button type="button" onClick={fetchMessages} className="a-btn sm">
          Refresh
        </button>
      </div>

      <div className="a-card-body">
        {loading ? (
          <p className="a-empty">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="a-empty">No messages yet.</p>
        ) : (
          messages.map((item) => (
            <div key={item.id} className={`a-msg ${!item.is_read ? 'unread' : ''}`}>
              <div className="a-msg-head">
                <span className="a-avatar" style={{ width: '34px', height: '34px', fontSize: '13px' }}>
                  {item.name ? item.name.charAt(0).toUpperCase() : '?'}
                </span>
                <div>
                  <span className="who">{item.name}</span>
                  <div>
                    <a className="mail" href={`mailto:${item.email}`}>{item.email}</a>
                  </div>
                </div>
                {!item.is_read && <span className="a-pill blue">New</span>}
                <span className="time">{item.created_at ? new Date(item.created_at).toLocaleString() : ''}</span>

                <div className="a-actions" style={{ marginLeft: 'auto' }}>
                  {!item.is_read && (
                    <button
                      type="button"
                      className="a-btn sm"
                      onClick={() => markAsRead(item.id)}
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    type="button"
                    className="a-btn sm danger"
                    onClick={() => deleteMessage(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="a-msg-body">{item.message}</p>

              <div className="a-msg-meta">
                {item.phone && <>Phone: {item.phone} &middot; </>}
                {item.company && <>Company: {item.company} &middot; </>}
                Status: {item.is_read ? 'Read' : 'Unread'}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
