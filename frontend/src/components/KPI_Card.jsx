import React from 'react';

const KPI_Card = ({ label, value, color }) => (
  <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
    <span style={{ display: 'block', fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>{label}</span>
    <strong style={{ fontSize: '28px', color: color || '#00008B' }}>{value}</strong>
  </div>
);
export default KPI_Card;