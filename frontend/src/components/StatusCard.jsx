import React from 'react';

const StatusCard = ({ title, status, desc }) => (
  <div style={{ background: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '15px' }}>
    <h4 style={{ fontSize: '16px', marginBottom: '5px' }}>{title}</h4>
    <p style={{ color: status === 'Success' ? '#22c55e' : '#ef4444', fontWeight: '800' }}>{status}</p>
    {desc && <p style={{ fontSize: '12px', color: '#64748b' }}>{desc}</p>}
  </div>
);
export default StatusCard;