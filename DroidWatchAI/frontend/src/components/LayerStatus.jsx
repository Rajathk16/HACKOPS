import React from 'react';

const layers = [
  {
    id: 'NET',
    name: 'Network Layer',
    status: 'UNDER ATTACK',
    events: 14,
    attacks: ['C2 Callback Detected', 'DNS Abuse', 'Suspicious IP: 185.220.x.x'],
    color: '#ff3d3d',
    bg: '#1a080833',
  },
  {
    id: 'FS',
    name: 'File System Layer',
    status: 'UNDER ATTACK',
    events: 8,
    attacks: ['Hidden File: /data/.payload', 'Persistence Script Dropped'],
    color: '#ff9a00',
    bg: '#1a100033',
  },
  {
    id: 'SYS',
    name: 'System Layer',
    status: 'MONITORING',
    events: 3,
    attacks: ['SMS Permission Accessed'],
    color: '#00e676',
    bg: '#00231533',
  },
];

function LayerStatus() {
  return (
    <div className="card" style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <div className="card-title">Attack Layer Map</div>
        <div className="font-mono" style={{ fontSize: '0.65rem', color: '#2d5a80', marginTop: '2px' }}>
          3-LAYER SECURITY MODEL
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {layers.map(layer => (
          <div key={layer.id} style={{
            background: layer.bg,
            border: `1px solid ${layer.color}33`,
            borderLeft: `3px solid ${layer.color}`,
            borderRadius: '6px',
            padding: '12px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="font-mono" style={{ fontSize: '0.65rem', color: layer.color, background: `${layer.color}22`, padding: '2px 6px', borderRadius: '3px' }}>
                  {layer.id}
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e8f4fd' }}>{layer.name}</span>
              </div>
              <span className="status-badge" style={{ color: layer.color, borderColor: `${layer.color}33`, background: `${layer.color}11` }}>
                {layer.status}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {layer.attacks.map(a => (
                <div key={a} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: layer.color, fontSize: '0.6rem' }}>▸</span>
                  <span className="font-mono" style={{ fontSize: '0.65rem', color: '#6b9ab8' }}>{a}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'flex-end' }}>
              <span className="font-mono" style={{ fontSize: '0.6rem', color: '#2d5a80' }}>
                {layer.events} EVENTS LOGGED
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LayerStatus;