import React from 'react';

function LayerStatus({ report, eventsData }) {
  
  const getEventCount = (layerStr) => {
    if (!eventsData || !eventsData.events) return 0;
    return eventsData.events.filter(e => e.layer === layerStr).length;
  };

  
  const getAttacks = (layerStr) => {
    if (!report || !report.detected_behaviors) return ['Monitoring...'];
    const b = report.detected_behaviors;
    const attacks = [];
    if (layerStr === 'network') {
      if (b.C2_COMMUNICATION?.detected) attacks.push('C2 Callback Detected');
      if (b.NETWORK_SCAN?.detected) attacks.push('Network Scan');
    } else if (layerStr === 'filesystem') {
      if (b.FILE_ENCRYPTION?.detected) attacks.push('File Encryption');
      if (b.HIDDEN_PAYLOAD?.detected) attacks.push('Hidden Payload Dropped');
    } else if (layerStr === 'system') {
      if (b.SMS_INTERCEPTION?.detected) attacks.push('SMS Interception');
      if (b.PRIVILEGE_ESCALATION?.detected) attacks.push('Privilege Escalation');
      if (b.BOOT_PERSISTENCE?.detected) attacks.push('Boot Persistence');
    }
    return attacks.length > 0 ? attacks : ['Monitoring...'];
  };

  const getStatus = (score) => {
    if (score >= 50) return 'UNDER ATTACK';
    if (score > 0) return 'ANOMALY';
    return 'MONITORING';
  };

  const getColor = (score) => {
    if (score >= 50) return '#ff3d3d';
    if (score > 0) return '#ff9a00';
    return '#00e676';
  };

  const getBg = (score) => {
    if (score >= 50) return '#1a080833';
    if (score > 0) return '#1a100033';
    return '#00231533';
  };

  const netScore = report ? report.layer_breakdown.network : 0;
  const fsScore = report ? report.layer_breakdown.filesystem : 0;
  const sysScore = report ? report.layer_breakdown.system : 0;

  const layers = [
    {
      id: 'NET',
      name: 'Network Layer',
      status: getStatus(netScore),
      events: getEventCount('network'),
      attacks: getAttacks('network'),
      color: getColor(netScore),
      bg: getBg(netScore),
    },
    {
      id: 'FS',
      name: 'File System Layer',
      status: getStatus(fsScore),
      events: getEventCount('filesystem'),
      attacks: getAttacks('filesystem'),
      color: getColor(fsScore),
      bg: getBg(fsScore),
    },
    {
      id: 'SYS',
      name: 'System Layer',
      status: getStatus(sysScore),
      events: getEventCount('system'),
      attacks: getAttacks('system'),
      color: getColor(sysScore),
      bg: getBg(sysScore),
    },
  ];

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