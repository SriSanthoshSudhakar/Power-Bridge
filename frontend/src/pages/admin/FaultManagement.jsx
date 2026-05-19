import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

const FaultManagement = () => {
  const [faults, setFaults] = useState([]);

  useEffect(() => {
    const fetchFaults = () => {
      fetch('http://localhost/bridge/get_faults.php')
        .then(res => res.json())
        .then(data => setFaults(data));
    };
    fetchFaults();
    const interval = setInterval(fetchFaults, 2000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#00008B' }}>
        <AlertTriangle color="#ef4444" /> Fault Event Records
      </h1>

      <table className="pro-table" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ background: '#f8fafc', borderBottom: '1px solid #eee' }}>
            <th style={thStyle}>Fault ID</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Severity</th>
            <th style={thStyle}>Detected Time</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {faults.map((f) => (
            <tr key={f.fault_id} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={tdStyle}>#F-{f.fault_id}</td>
              <td style={tdStyle}>{f.fault_type}</td>
              <td style={{...tdStyle, color: f.severity === 'Critical' ? '#ef4444' : '#f59e0b', fontWeight: 'bold'}}>{f.severity}</td>
              <td style={tdStyle}>{f.detection_time}</td>
              <td style={tdStyle}><span style={badge(f.resolution_status)}>{f.resolution_status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = { padding: '15px', textAlign: 'left', fontSize: '14px', color: '#64748b' };
const tdStyle = { padding: '15px', fontSize: '14px' };
const badge = (s) => ({ background: s === 'Resolved' ? '#dcfce7' : '#fee2e2', color: s === 'Resolved' ? '#166534' : '#991b1b', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold'});

export default FaultManagement;