import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, Tooltip, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const data = {
  labels: ['00:01', '00:02', '00:03', '00:04', '00:05', '00:06', '00:07', '00:08'],
  datasets: [
    {
      label: 'Network Events',
      data: [3, 7, 4, 9, 6, 13, 8, 16],
      borderColor: '#00c8ff',
      backgroundColor: 'rgba(0,200,255,0.07)',
      borderWidth: 1.5,
      pointRadius: 3,
      pointBackgroundColor: '#00c8ff',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'File Events',
      data: [1, 3, 5, 2, 8, 4, 10, 7],
      borderColor: '#ff9a00',
      backgroundColor: 'rgba(255,154,0,0.05)',
      borderWidth: 1.5,
      pointRadius: 3,
      pointBackgroundColor: '#ff9a00',
      tension: 0.4,
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      labels: {
        color: '#6b9ab8',
        font: { family: 'JetBrains Mono', size: 10 },
        boxWidth: 12,
        padding: 16,
      }
    },
    tooltip: {
      backgroundColor: '#0d1926',
      borderColor: '#1a3a5c',
      borderWidth: 1,
      titleColor: '#00c8ff',
      bodyColor: '#e8f4fd',
      titleFont: { family: 'JetBrains Mono', size: 11 },
      bodyFont: { family: 'JetBrains Mono', size: 11 },
    }
  },
  scales: {
    x: {
      ticks: { color: '#2d5a80', font: { family: 'JetBrains Mono', size: 10 } },
      grid: { color: '#0f2035' },
      border: { color: '#1a3a5c' }
    },
    y: {
      ticks: { color: '#2d5a80', font: { family: 'JetBrains Mono', size: 10 } },
      grid: { color: '#0f2035' },
      border: { color: '#1a3a5c' }
    },
  },
};

function AttackTimeline() {
  return (
    <div className="card" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <div className="card-title">Attack Timeline</div>
          <div className="font-mono" style={{ fontSize: '0.65rem', color: '#2d5a80', marginTop: '2px' }}>
            REAL-TIME EVENT STREAM
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="status-badge" style={{ color: '#ff3d3d', borderColor: '#ff3d3d33', background: '#ff3d3d11' }}>
            LIVE
          </span>
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  );
}

export default AttackTimeline;