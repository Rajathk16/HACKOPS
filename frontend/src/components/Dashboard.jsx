import React from 'react';
import AttackTimeline from './AttackTimeline';
import ThreatMeter from './ThreatMeter';
import C2Graph from './C2Graph';
import LayerStatus from './LayerStatus';
import DefensePanel from './DefensePanel';
import AIPanel from './AIPanel';

function Dashboard() {
  return (
    <div style={{ padding: '20px', maxWidth: '1600px', margin: '0 auto' }}>

      {/* Top bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '20px',
        paddingBottom: '16px', borderBottom: '1px solid #1a3a5c'
      }}>
        <div>
          <div style={{ fontSize: '0.65rem', color: '#2d5a80', letterSpacing: '0.2em', fontFamily: 'JetBrains Mono', marginBottom: '4px' }}>
            ACTIVE SESSION
          </div>
          <div className="font-mono" style={{ fontSize: '0.8rem', color: '#00c8ff' }}>
            APK: <span style={{ color: '#e8f4fd' }}>com.malware.sample.apk</span>
            <span className="blink" style={{ color: '#00c8ff', marginLeft: '4px' }}>▌</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {[
            { label: 'EVENTS', value: '247', color: '#ff3d3d' },
            { label: 'THREATS', value: '12', color: '#ff9a00' },
            { label: 'BLOCKED', value: '8', color: '#00e676' },
          ].map(stat => (
            <div key={stat.label} style={{
              padding: '8px 16px',
              background: '#0d1926',
              border: '1px solid #1a3a5c',
              borderRadius: '6px',
              textAlign: 'center',
              minWidth: '80px'
            }}>
              <div className="font-mono" style={{ fontSize: '1.2rem', color: stat.color, fontWeight: 700 }}>{stat.value}</div>
              <div style={{ fontSize: '0.6rem', color: '#2d5a80', letterSpacing: '0.15em' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <AttackTimeline />
        <ThreatMeter />
      </div>

      {/* Grid Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <C2Graph />
        <LayerStatus />
      </div>

      {/* Grid Row 3 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <DefensePanel />
        <AIPanel />
      </div>

    </div>
  );
}

export default Dashboard;