import React, { useState } from 'react';

const findings = [
  { label: 'Classification', value: 'SPYWARE / RAT', color: '#ff3d3d' },
  { label: 'Confidence', value: '94.2%', color: '#ff9a00' },
  { label: 'Family', value: 'AndroRAT Variant', color: '#ff9a00' },
  { label: 'Risk Score', value: '78 / 100', color: '#ff3d3d' },
];

const recommendations = [
  'Isolate device from all network interfaces immediately',
  'Revoke SMS and storage permissions from the APK',
  'Blacklist C2 server IPs at the firewall level',
  'Quarantine payload files found in /data directory',
  'Enable full packet capture for forensic analysis',
];

function AIPanel() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <div className="card-title">AI Threat Analysis</div>
          <div className="font-mono" style={{ fontSize: '0.65rem', color: '#2d5a80', marginTop: '2px' }}>
            BEHAVIORAL INTELLIGENCE ENGINE
          </div>
        </div>
        <span className="status-badge" style={{ color: '#00e676', borderColor: '#00e67633', background: '#00e67611' }}>
          AI READY
        </span>
      </div>

      {/* Summary Text */}
      <div style={{
        background: '#070f1c',
        border: '1px solid #1a3a5c',
        borderLeft: '3px solid #00c8ff',
        borderRadius: '6px',
        padding: '12px',
        marginBottom: '14px',
      }}>
        <div className="font-mono" style={{ fontSize: '0.68rem', color: '#6b9ab8', lineHeight: '1.7' }}>
          "The APK exhibits multi-layer attack behavior including{' '}
          <span style={{ color: '#ff3d3d' }}>C2 callbacks</span>,{' '}
          <span style={{ color: '#ff9a00' }}>covert file persistence</span>, and{' '}
          <span style={{ color: '#ff3d3d' }}>SMS interception</span>. Communication patterns
          indicate remote access trojan behavior with encrypted exfiltration channels.
          Immediate containment is advised."
        </div>
      </div>

      {/* Detection Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
        {findings.map(f => (
          <div key={f.label} style={{
            background: '#070f1c',
            border: '1px solid #0f2035',
            borderRadius: '6px',
            padding: '8px 12px',
          }}>
            <div style={{ fontSize: '0.6rem', color: '#2d5a80', letterSpacing: '0.1em', fontFamily: 'JetBrains Mono' }}>
              {f.label}
            </div>
            <div className="font-mono" style={{ fontSize: '0.8rem', color: f.color, fontWeight: 700, marginTop: '2px' }}>
              {f.value}
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', padding: 0
          }}
        >
          <span style={{ fontSize: '0.6rem', color: '#00c8ff', fontFamily: 'JetBrains Mono', letterSpacing: '0.1em' }}>
            {expanded ? '▾' : '▸'} RECOMMENDED ACTIONS ({recommendations.length})
          </span>
        </button>

        {expanded && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {recommendations.map((r, i) => (
              <div key={i} className="fade-in" style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <span className="font-mono" style={{ fontSize: '0.6rem', color: '#00c8ff', marginTop: '2px' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#6b9ab8', fontFamily: 'Rajdhani' }}>{r}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AIPanel;