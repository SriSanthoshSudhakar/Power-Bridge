import React from 'react';

const Navbar = ({ role, title }) => (
  <header style={{ height: '70px', background: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px' }}>
    <div style={{ fontSize: '14px', color: '#64748b' }}>System / {title}</div>
    <div style={{ background: '#e2e8f0', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: '800', color: '#00008B' }}>
      {role?.toUpperCase()} ACCESS
    </div>
  </header>
);
export default Navbar;