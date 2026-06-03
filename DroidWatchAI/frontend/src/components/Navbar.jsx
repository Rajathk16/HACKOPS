import React, { useState, useEffect } from 'react';

function Navbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav style={{
      backgroundColor: '#070f1c',
      borderBottom: '1px solid #1a3a5c',
      padding: '0 24px',
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>

      {/* Left — Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '6px',
          background: 'linear-gradient(135deg, #00c8ff22, #00c8ff44)',
          border: '1px solid #00c8ff66',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px'
        }}>🛡️</div>
        <div>
          <div className="font-display" style={{ fontSize: '0.85rem', color: '#00c8ff', letterSpacing: '0.1em', fontWeight: 700 }}>
            DROIDWATCH
          </div>
          <div style={{ fontSize: '0.55rem', color: '#2d5a80', letterSpacing: '0.2em', fontFamily: 'JetBrains Mono' }}>
            THREAT INTELLIGENCE PLATFORM
          </div>
        </div>
      </div>

      {/* Center — Status Indicators */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {[
          { label: 'SANDBOX', color: '#00e676', status: 'ACTIVE' },
          { label: 'MONITOR', color: '#00c8ff', status: 'LIVE' },
          { label: 'AI ENGINE', color: '#ff9a00', status: 'ONLINE' },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div className="pulse" style={{
              width: '6px', height: '6px', borderRadius: '50%',
              backgroundColor: item.color,
            }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#6b9ab8', fontFamily: 'JetBrains Mono' }}>
              {item.label}
            </span>
            <span style={{ fontSize: '0.6rem', color: item.color, fontFamily: 'JetBrains Mono' }}>
              {item.status}
            </span>
          </div>
        ))}
      </div>

      {/* Right — Clock */}
      <div style={{ textAlign: 'right' }}>
        <div className="font-mono" style={{ fontSize: '0.85rem', color: '#e8f4fd', letterSpacing: '0.05em' }}>
          {time.toLocaleTimeString('en-US', { hour12: false })}
        </div>
        <div className="font-mono" style={{ fontSize: '0.6rem', color: '#2d5a80', letterSpacing: '0.1em' }}>
          {time.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
        </div>
      </div>

    </nav>
  );
}

export default Navbar;