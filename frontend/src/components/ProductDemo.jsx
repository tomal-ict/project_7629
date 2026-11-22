import React from 'react';

export default function ProductDemo({ demo, productName }) {
  const d = demo || {};
  const kind = d.kind || 'generic';
  const sidebar = Array.isArray(d.sidebar) ? d.sidebar : [];

  return (
    <div className="demo-window">
      <div className="demo-titlebar">
        <span className="d-dot r"></span>
        <span className="d-dot y"></span>
        <span className="d-dot g"></span>
        <span>{d.title || productName}</span>
      </div>

      <div className="demo-body">
        {sidebar.length > 0 && (
          <div className="demo-sidebar">
            {sidebar.map((item, i) => (
              <span key={i} className={i === 0 ? 'on' : ''}>
                {item}
              </span>
            ))}
          </div>
        )}

        <div className="demo-main">
          {kind === 'pulse' ? (
            <>
              {d.chartLabel && <div className="demo-label">{d.chartLabel}</div>}
              <div className="demo-hbars">
                <div className="demo-hbar" style={{ height: '62%' }}></div>
                <div className="demo-hbar" style={{ height: '84%' }}></div>
                <div className="demo-hbar" style={{ height: '48%' }}></div>
                <div className="demo-hbar" style={{ height: '96%' }}></div>
                <div className="demo-hbar" style={{ height: '70%' }}></div>
              </div>
              {Array.isArray(d.topItems) && d.topItems.length > 0 && (
                <>
                  <div className="demo-label" style={{ marginTop: '4px' }}>
                    {d.topLabel || 'Top Items'}
                  </div>
                  <div className="demo-rows">
                    {d.topItems.slice(0, 4).map((item, idx) => (
                      <div key={idx} className="demo-row">
                        <span>{item[0]}</span>
                        <span className="dr-set">{item[1]}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : kind === 'clerk' && Array.isArray(d.files) ? (
            <>
              <div className="demo-label">Documents</div>
              <div className="demo-rows">
                {d.files.slice(0, 4).map((file, idx) => (
                  <div key={idx} className="demo-row">
                    <span className="dr-file">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                      </svg>
                      <span>{file}</span>
                    </span>
                    <span className="dr-set">Extracted</span>
                  </div>
                ))}
              </div>
              {Array.isArray(d.steps) && (
                <div className="demo-chips">
                  {d.steps.map((step, idx) => (
                    <span key={idx} className="demo-chip">
                      {step}
                    </span>
                  ))}
                </div>
              )}
            </>
          ) : kind === 'dotlog' && Array.isArray(d.entries) ? (
            <>
              <div className="demo-label">{d.subtitle || 'Real-time logs'}</div>
              <table className="demo-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {d.entries.slice(0, 4).map((entry, idx) => (
                    <tr key={idx}>
                      <td>{entry[0]}</td>
                      <td>{entry[1]}</td>
                      <td>{entry[2]}</td>
                      <td>
                        <span className="demo-status">{entry[3]}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : kind === 'lightocr' && Array.isArray(d.docs) ? (
            <>
              <div className="demo-label">Processed documents</div>
              <div className="demo-rows">
                {d.docs.slice(0, 4).map((doc, idx) => (
                  <div key={idx} className="demo-row">
                    <span className="dr-file">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                      </svg>
                      <span>{doc}</span>
                    </span>
                    <span className="dr-set">Posted</span>
                  </div>
                ))}
              </div>
            </>
          ) : kind === 'moina' && Array.isArray(d.messages) ? (
            <>
              <div className="demo-voices">
                {d.messages.slice(0, 3).map((msg, idx) => (
                  <div key={idx} className="demo-msg user">
                    {msg}
                  </div>
                ))}
              </div>
              {Array.isArray(d.items) && (
                <div className="demo-bubbles" style={{ marginTop: '6px' }}>
                  {d.items.map((item, idx) => (
                    <div key={idx} className="demo-bubble">
                      <span
                        className="db-dot"
                        style={{
                          background: item[1]?.includes('active')
                            ? '#34d399'
                            : item[1]?.includes('generated')
                            ? '#fbbf24'
                            : '#38bdf8',
                        }}
                      ></span>
                      {item[0]}
                      <span className="db-val">{item[1]}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : kind === 'bms' && Array.isArray(d.protocols) ? (
            <>
              <div className="demo-label">{d.subtitle || 'Open protocols'}</div>
              <div className="demo-chips">
                {d.protocols.map((proto, idx) => (
                  <span key={idx} className="demo-chip">
                    {proto}
                  </span>
                ))}
              </div>
              <div className="demo-tags" style={{ marginTop: '6px' }}>
                <div className="demo-tag">
                  <span>Ethernet backbone</span>
                  <span className="dt-v">Online</span>
                </div>
                <div className="demo-tag">
                  <span>Energy metering</span>
                  <span className="dt-v">Live</span>
                </div>
                <div className="demo-tag">
                  <span>Lighting zones</span>
                  <span className="dt-v">8</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="demo-label">Powered by Proprietary AI</div>
              <div className="demo-rows">
                <div className="demo-row">
                  <span>Model</span>
                  <span className="dr-set">Own · 0% hallucinations</span>
                </div>
                <div className="demo-row">
                  <span>Deployment</span>
                  <span className="dr-set">On-premise</span>
                </div>
                <div className="demo-row">
                  <span>Privacy</span>
                  <span className="dr-set">100% sovereign</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
