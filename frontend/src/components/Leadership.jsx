import React from 'react';
import { useSite } from '../context/SiteContext';

export default function Leadership() {
  const { settings, advisors, coreTeam, founderQuotes } = useSite();

  const getInitials = (name) => {
    return (name || '')
      .trim()
      .split(' ')
      .map((w) => w.charAt(0))
      .slice(0, 2)
      .join('');
  };

  return (
    <section id="leadership" className="section-alt">
      <div className="leadership-wrap">
        <div className="section-head center reveal revealed">
          <span className="section-tag">{settings.leadership_tag || 'LEADERSHIP'}</span>
          <h2 className="section-title">{settings.leadership_title || 'The Minds Behind ABC AI System'}</h2>
          <p className="section-desc">{settings.leadership_sub || '6 leaders — Advisors & Core Team'}</p>
        </div>

        <div className="reveal revealed">
          {advisors && advisors.length > 0 && (
            <>
              <h3 className="leadership-group-title">{settings.advisor_title || 'Advisory Panel'}</h3>
              <div className="member-grid-3">
                {advisors.map((member) => (
                  <div key={member.id} className="member-card reveal revealed">
                    <div className="member-photo">
                      <span className="avatar-init">{getInitials(member.name)}</span>
                    </div>
                    <div className="member-body">
                      <h4>{member.name}</h4>
                      <div className="member-role">{member.role}</div>
                      <p className="member-bio">{member.bio}</p>
                      {Array.isArray(member.tags) && member.tags.length > 0 && (
                        <div className="member-tags">
                          {member.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx}>{typeof tag === 'string' ? tag : tag.title || tag.key}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {coreTeam && coreTeam.length > 0 && (
            <>
              <h3 className="leadership-group-title" style={{ marginTop: '48px' }}>
                {settings.core_title || 'Core Team'}
              </h3>
              <div className="member-grid-3">
                {coreTeam.map((member) => (
                  <div key={member.id} className="member-card reveal revealed">
                    <div className="member-photo">
                      <span className="avatar-init">{getInitials(member.name)}</span>
                    </div>
                    <div className="member-body">
                      <h4>{member.name}</h4>
                      <div className="member-role">{member.role}</div>
                      <p className="member-bio">{member.bio}</p>
                      {Array.isArray(member.tags) && member.tags.length > 0 && (
                        <div className="member-tags">
                          {member.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx}>{typeof tag === 'string' ? tag : tag.title || tag.key}</span>
                          ))}
                        </div>
                      )}
                      {Array.isArray(member.links) && member.links.length > 0 && (
                        <div className="member-links">
                          {member.links.map((link, idx) => {
                            let label = link;
                            try {
                              label = new URL(link).hostname || link;
                            } catch {}
                            return (
                              <a key={idx} href={link} target="_blank" rel="noopener noreferrer">
                                {label}
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {founderQuotes && founderQuotes.length > 0 && (
          <div className="founder-box reveal revealed">
            <span className="fb-quote-mark">"</span>
            <div className="section-head" style={{ marginBottom: '18px' }}>
              <span className="section-tag">{settings.founder_title || 'From the Founder'}</span>
            </div>
            <blockquote>
              {founderQuotes.slice(0, 2).map((quote, idx) => (
                <p key={idx}>{quote}</p>
              ))}
            </blockquote>
            <div className="fb-by">
              <span className="fb-avatar">
                {getInitials(settings.founder_quote_by || 'Shakhawat Hossain')}
              </span>
              <div>
                <strong>{settings.founder_quote_by || 'Shakhawat Hossain, Managing Director'}</strong>
                <span>Founder & Managing Director, ABC AI System Limited</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
