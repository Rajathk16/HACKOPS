import React from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div style={{ backgroundColor: 'var(--bg-base)', minHeight: '100vh' }}>
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;