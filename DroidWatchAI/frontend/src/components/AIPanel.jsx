import React, { useState } from 'react';

function AIPanel({ report }) {
  const [expanded, setExpanded] = useState(false);

  
  const classification = report ? report.malware_type : 'UNKNOWN';
  const confidence = report && report.confidence ? (report.confidence * 100).toFixed(1) + '%' : 'N/A';
  const riskScore = report ? report.total_score : 0;
  
  const findings = [
    { label: 'Classification', value: classification.toUpperCase(), color: '#ff3d3d' },
    { label: 'Confidence', value: confidence, color: '#ff9a00' },
    { label: 'Family', value: 'Auto-Detected', color: '#ff9a00' },
    { label: 'Risk Score', value: `${riskScore} / 100`, color: '#ff3d3d' },
  ];

  const recommendations = report && report.mitigations ? report.mitigations : [];
  const aiSummary = report ? report.ai_summary : "Waiting for analysis...";

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

      {}
      <div style={{
        background: '#070f1c',
        border: '1px solid #1a3a5c',
        borderLeft: '3px solid #00c8ff',
        borderRadius: '6px',
        padding: '12px',
        marginBottom: '14px',
      }}>
        <div className="font-mono" style={{ fontSize: '0.68rem', color: '#6b9ab8', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
          {aiSummary}
        </div>
      </div>

      {}
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

      {}
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