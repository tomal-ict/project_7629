import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { trackEvent } from '../utils/analytics';

export default function Contact() {
  const { settings, sendContact } = useSite();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage('');
    setErrorMessage('');

    try {
      const res = await sendContact(formData);
      if (res && res.success) {
        trackEvent('generate_lead', { event_category: 'engagement', event_label: 'contact_form' });
        setStatusMessage(res.message || 'Thank you! Your message has been received. We will get back to you shortly.');
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      } else {
        setErrorMessage(res?.message || 'Error sending message. Please try again.');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setErrorMessage(err.response?.data?.message || 'An error occurred. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="contact-wrap">
        <div className="section-head center reveal">
          <span className="section-tag">{settings.contact_badge || 'INITIATE DIALOGUE'}</span>
          <h2 className="section-title">{settings.contact_title || 'Architect Your Sovereign AI Roadmap'}</h2>
          <p className="section-desc">{settings.contact_sub || ''}</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info reveal reveal-left">
            <div className="contact-cards">
              <div className="contact-card">
                <span className="ct-ic">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <h4>{settings.contact_head_label || 'Head Office'}</h4>
                  <p>{settings.address || ''}</p>
                </div>
              </div>

              <div className="contact-card">
                <span className="ct-ic">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <div>
                  <h4>{settings.contact_email_label || 'Email'}</h4>
                  <a href={`mailto:${settings.email || ''}`}>{settings.email || ''}</a>
                </div>
              </div>

              <div className="contact-card">
                <span className="ct-ic">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div>
                  <h4>{settings.contact_phone_label || 'Phone'}</h4>
                  <a href={`tel:${settings.phone_tel || ''}`}>{settings.phone || ''}</a>
                </div>
              </div>
            </div>

            <div className="contact-social-row">
              <div className="contact-social-group">
                <label>{settings.contact_follow_label || 'Follow us'}</label>
                <a className="member-chip" href={settings.linkedin || '#'} target="_blank" rel="noopener noreferrer">
                  <span className="chip-ic">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
                    </svg>
                  </span>
                  {settings.contact_follow_linkedin || 'LinkedIn'}
                </a>
              </div>

              <div className="contact-social-group">
                <label>{settings.contact_member_label || 'Member of'}</label>
                <a className="member-chip" href={settings.basis_url || 'https://basis.org.bd'} target="_blank" rel="noopener noreferrer">
                  <span className="chip-ic">🏛</span> BASIS
                </a>
                <a className="member-chip" href={settings.dcci_url || 'https://www.dhakachamber.com'} target="_blank" rel="noopener noreferrer">
                  <span className="chip-ic">🏢</span> DCCI
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-card reveal reveal-right">
            <h3>{settings.contact_form_title || 'Submit Technical Inquiry'}</h3>

            {statusMessage && (
              <div className="alert-box">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: '-2px', marginRight: '6px' }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
                {statusMessage}
              </div>
            )}

            {errorMessage && (
              <div style={{ color: '#b91c1c', fontSize: '12.5px', fontWeight: 600, margin: '-4px 0 12px' }}>
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 ..."
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company name"
                  />
                </div>
                <div className="form-field full">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn"
                style={{ width: '100%', justifyContent: 'center', cursor: 'pointer', border: 'none' }}
              >
                {submitting ? 'Transmitting Encrypted...' : settings.contact_cta || 'Send Us an Email'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
