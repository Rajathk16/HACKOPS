import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

function ThreatMeter() {
  const level = 78;

  const data = {
    datasets: [{
      data: [level, 100 - level],
      backgroundColor: ['#ff3d3d', '#0f2035'],
      borderWidth: 0,
      circumference: 240,
      rotation: 240,
    }],
  };

  const options = {
    cutout: '78%',
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  };

  const getLabel = (v) => v >= 75 ? 'CRITICAL' : v >= 50 ? 'HIGH' : v >= 25 ? 'MEDIUM' : 'LOW';
  const getColor = (v) => v >= 75 ? '#ff3d3d' : v >= 50 ? '#ff9a00' : v >= 25 ? '#ffd600' : '#00e676';

  return (
    <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '16px' }}>
        <div className="card-title">Threat Severity</div>
        <div className="font-mono" style={{ fontSize: '0.65rem', color: '#2d5a80', marginTop: '2px' }}>
          RISK ASSESSMENT ENGINE
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '180px', height: '180px' }}>
          <Doughnut data={data} options={options} />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <div className="font-display" style={{ fontSize: '2rem', fontWeight: 900, color: getColor(level) }}>
              {level}
            </div>
            <div className="font-mono" style={{ fontSize: '0.6rem', color: getColor(level), letterSpacing: '0.15em' }}>
              {getLabel(level)}
            </div>
          </div>
        </div>

        <div style={{ width: '100%', marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { label: 'Network Exposure', value: 85, color: '#ff3d3d' },
            { label: 'Data Risk', value: 62, color: '#ff9a00' },
            { label: 'System Integrity', value: 40, color: '#ffd600' },
          ].map(item => (
            <div key={item.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.7rem', color: '#6b9ab8', fontFamily: 'Rajdhani' }}>{item.label}</span>
                <span className="font-mono" style={{ fontSize: '0.65rem', color: item.color }}>{item.value}%</span>
              </div>
              <div style={{ height: '3px', background: '#0f2035', borderRadius: '2px' }}>
                <div style={{ height: '100%', width: `${item.value}%`, background: item.color, borderRadius: '2px', transition: 'width 1s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThreatMeter;