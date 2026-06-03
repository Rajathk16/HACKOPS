import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';

function C2Graph() {
  const cyRef = useRef(null);

  useEffect(() => {
    const cy = cytoscape({
      container: cyRef.current,
      elements: [
        { data: { id: 'device', label: 'DEVICE', type: 'device' } },
        { data: { id: 'c2', label: 'C2 SERVER', type: 'threat' } },
        { data: { id: 'dns', label: 'DNS ABUSE', type: 'warning' } },
        { data: { id: 'ip1', label: 'FOREIGN IP', type: 'threat' } },
        { data: { id: 'ip2', label: 'BEACON', type: 'warning' } },
        { data: { source: 'device', target: 'c2', label: 'EXFIL' } },
        { data: { source: 'device', target: 'dns', label: 'DNS' } },
        { data: { source: 'device', target: 'ip1', label: 'C2 CB' } },
        { data: { source: 'device', target: 'ip2', label: 'PING' } },
      ],
      style: [
        {
          selector: 'node[type="device"]',
          style: {
            'background-color': '#0d1926',
            'border-width': 2,
            'border-color': '#00c8ff',
            'label': 'data(label)',
            'color': '#00c8ff',
            'font-size': '9px',
            'font-family': 'JetBrains Mono',
            'text-valign': 'center',
            'text-halign': 'center',
            'width': '60px',
            'height': '60px',
          }
        },
        {
          selector: 'node[type="threat"]',
          style: {
            'background-color': '#1a0808',
            'border-width': 2,
            'border-color': '#ff3d3d',
            'label': 'data(label)',
            'color': '#ff3d3d',
            'font-size': '8px',
            'font-family': 'JetBrains Mono',
            'text-valign': 'center',
            'text-halign': 'center',
            'width': '50px',
            'height': '50px',
          }
        },
        {
          selector: 'node[type="warning"]',
          style: {
            'background-color': '#1a1000',
            'border-width': 2,
            'border-color': '#ff9a00',
            'label': 'data(label)',
            'color': '#ff9a00',
            'font-size': '8px',
            'font-family': 'JetBrains Mono',
            'text-valign': 'center',
            'text-halign': 'center',
            'width': '50px',
            'height': '50px',
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 1.5,
            'line-color': '#1a3a5c',
            'target-arrow-color': '#ff3d3d',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label': 'data(label)',
            'color': '#2d5a80',
            'font-size': '7px',
            'font-family': 'JetBrains Mono',
            'text-background-color': '#050b14',
            'text-background-opacity': 1,
            'text-background-padding': '2px',
          }
        },
      ],
      layout: { name: 'concentric', minNodeSpacing: 60 },
      userZoomingEnabled: false,
      userPanningEnabled: false,
    });

    return () => cy.destroy();
  }, []);

  return (
    <div className="card" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <div className="card-title">C2 Communication Graph</div>
          <div className="font-mono" style={{ fontSize: '0.65rem', color: '#2d5a80', marginTop: '2px' }}>
            NETWORK TOPOLOGY MAP
          </div>
        </div>
        <span className="status-badge" style={{ color: '#ff3d3d', borderColor: '#ff3d3d33', background: '#ff3d3d11' }}>
          4 CONNECTIONS
        </span>
      </div>
      <div ref={cyRef} style={{
        height: '240px',
        backgroundColor: '#070f1c',
        borderRadius: '6px',
        border: '1px solid #0f2035'
      }} />
    </div>
  );
}

export default C2Graph;