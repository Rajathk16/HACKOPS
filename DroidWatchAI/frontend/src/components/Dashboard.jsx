import React, { useState, useEffect } from 'react';
import AttackTimeline from './AttackTimeline';
import ThreatMeter from './ThreatMeter';
import C2Graph from './C2Graph';
import LayerStatus from './LayerStatus';
import DefensePanel from './DefensePanel';
import AIPanel from './AIPanel';

function Dashboard() {
  const [report, setReport] = useState(null);
  const [eventsData, setEventsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, eventsRes] = await Promise.all([
          fetch('http://localhost:5000/api/threats/demo/summary'),
          fetch('http://localhost:5000/api/threats/demo')
        ]);
        
        const summaryData = await summaryRes.json();
        const eventsData = await eventsRes.json();
        
        setReport(summaryData);
        setEventsData(eventsData);
      } catch (err) {
        console.error("Failed to fetch backend data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#00c8ff' }} className="font-mono">
        <span className="blink" style={{ marginRight: '8px' }}>▌</span> INITIALIZING AI ENGINE...
      </div>
    );
  }

  const eventCount = eventsData ? eventsData.count : 0;
  const threatCount = report && report.mitre_techniques ? report.mitre_techniques.length : 0;

  return (
    <div style={{ padding: '20px', maxWidth: '1600px', margin: '0 auto' }}>

      {}
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
            { label: 'EVENTS', value: eventCount, color: '#ff3d3d' },
            { label: 'THREATS', value: threatCount, color: '#ff9a00' },
            { label: 'BLOCKED', value: '0', color: '#00e676' },
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

      {}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <AttackTimeline eventsData={eventsData} />
        <ThreatMeter report={report} />
      </div>

      {}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <C2Graph eventsData={eventsData} />
        <LayerStatus report={report} eventsData={eventsData} />
      </div>

      {}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <DefensePanel report={report} />
        <AIPanel report={report} />
      </div>

    </div>
  );
}

export default Dashboard;