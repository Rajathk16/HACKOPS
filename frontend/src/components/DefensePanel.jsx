import React, { useState } from 'react';

const actions = [
  { id: 1, label: 'Block IP', icon: '⬡', desc: 'Firewall isolation', color: '#ff3d3d', msg: 'FIREWALL RULE APPLIED — IP 185.220.x.x blocked' },
  { id: 2, label: 'Quarantine File', icon: '◈', desc: 'File isolation', color: '#ff9a00', msg: 'FILE QUARANTINED — /data/.payload moved to sandbox' },
  { id: 3, label: 'Kill Process', icon: '◉', desc: 'Process termination', color: '#ff3d3d', msg: 'PROCESS TERMINATED — PID 2043 killed' },
  { id: 4, label: 'Revoke Permissions', icon: '◫', desc: 'Permission control', color: '#ff9a00', msg: 'PERMISSIONS REVOKED — SMS, Storage access removed' },
  { id: 5, label: 'DNS Sinkhole', icon: '◈', desc: 'DNS redirect', color: '#00c8ff', msg: 'DNS SINKHOLED — malicious.domain → 127.0.0.1' },
  { id: 6, label: 'Harden Subsystem', icon: '⬡', desc: 'System hardening', color: '#00e676', msg: 'SUBSYSTEM HARDENED — Accessibility service disabled' },
];

function DefensePanel() {
  const [log, setLog] = useState([]);

  const handleAction = (action) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLog(prev => [{ time, msg: action.msg, color: action.color }, ...prev].slice(0, 8));
  };

  return (
    <div className="card" style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <div className="card-title">Defense Simulation</div>
        <div className="font-mono" style={{ fontSize: '0.65rem', color: '#2d5a80', marginTop: '2px' }}>
          ADAPTIVE RESPONSE CONTROLS
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
        {actions.map(action => (
          <button
            key={action.id}
            onClick={() => handleAction(action)}
            style={{
              background: '#070f1c',
              border: `1px solid ${action.color}44`,
              borderRadius: '6px',
              padding: '10px 8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'left',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = action.color}
            onMouseLeave={e => e.currentTarget.style.borderColor = `${action.color}44`}
          >
            <div style={{ fontSize: '14px', marginBottom: '4px', color: action.color }}>{action.icon}</div>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#e8f4fd', fontFamily: 'Rajdhani' }}>{action.label}</div>
            <div style={{ fontSize: '0.6rem', color: '#2d5a80', fontFamily: 'JetBrains Mono' }}>{action.desc}</div>
          </button>
        ))}
      </div>

      <div style={{
        background: '#070f1c',
        border: '1px solid #0f2035',
        borderRadius: '6px',
        padding: '12px',
        height: '110px',
        overflowY: 'auto',
      }}>
        <div className="font-mono" style={{ fontSize: '0.6rem', color: '#2d5a80', marginBottom: '8px', letterSpacing: '0.1em' }}>
          DEFENSE LOG
        </div>
        {log.length === 0 ? (
          <div className="font-mono" style={{ fontSize: '0.65rem', color: '#1a3a5c' }}>
            Awaiting defense actions<span className="blink">_</span>
          </div>
        ) : (
          log.map((entry, i) => (
            <div key={i} className="fade-in" style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
              <span className="font-mono" style={{ fontSize: '0.6rem', color: '#2d5a80', whiteSpace: 'nowrap' }}>
                {entry.time}
              </span>
              <span className="font-mono" style={{ fontSize: '0.6rem', color: entry.color }}>
                {entry.msg}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DefensePanel;