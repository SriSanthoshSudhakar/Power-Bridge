import React from 'react';
const Infrastructure = () => (
  <div>
    <h1>🏗️ Infrastructure</h1>
    <div style={{marginBottom: '20px', fontWeight: 'bold'}}>
      <span style={{color: '#00008B', borderBottom: '2px solid #00008B', paddingBottom: '5px', cursor: 'pointer'}}>Sensors</span>
      <span style={{marginLeft: '30px', color: '#64748b', cursor: 'pointer'}}>Power Lines</span>
    </div>
    <table className="pro-table">
      <thead><tr><th>Sensor ID</th><th>Type</th><th>Model</th><th>Line ID</th><th>Status</th></tr></thead>
      <tbody><tr><td>SN-441</td><td>Voltage Sensor</td><td>VS-PRO-X</td><td>MAIN-01</td><td><span className="pill green">Online</span></td></tr></tbody>
    </table>
  </div>
);
export default Infrastructure;