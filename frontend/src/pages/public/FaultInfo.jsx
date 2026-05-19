import React, { useState, useEffect } from 'react';

const FaultInfo = () => {
  const [fault, setFault] = useState(null);

  useEffect(() => {
    fetch('http://localhost/bridge/get_faults.php')
      .then(res => res.json())
      .then(data => {
          // Get the most recent unresolved fault
          const active = data.find(f => f.resolution_status === 'Unresolved');
          setFault(active);
      });
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h1>🔎 Fault Information</h1>
      <div style={containerS}>
        <div style={headerS}>
            <h3>Current Status:</h3>
            <span style={fault ? pillRed : pillGreen}>
                {fault ? "ACTIVE FAULT DETECTED" : "SYSTEM STABLE"}
            </span>
        </div>
        <hr style={hrS} />
        <div style={gridS}>
            <div style={itemS}><b>Fault Type</b><p>{fault ? fault.fault_type : 'None'}</p></div>
            <div style={itemS}><b>Detection Time</b><p>{fault ? fault.detection_time : 'N/A'}</p></div>
            <div style={itemS}><b>Affected Area</b><p>{fault ? fault.affected_area : 'All Areas Normal'}</p></div>
            <div style={itemS}><b>Estimated Repair Time</b><p>{fault ? '2-4 Hours' : 'N/A'}</p></div>
        </div>
      </div>
    </div>
  );
};

const containerS = { background: 'white', padding: '40px', borderRadius: '15px', border: '1px solid #e2e8f0' };
const headerS = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' };
const gridS = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' };
const itemS = { padding: '15px', background: '#f8fafc', borderRadius: '8px' };
const pillRed = { padding: '6px 15px', background: '#fee2e2', color: '#ef4444', borderRadius: '20px', fontWeight: 'bold', fontSize: '12px' };
const pillGreen = { padding: '6px 15px', background: '#dcfce7', color: '#22c55e', borderRadius: '20px', fontWeight: 'bold', fontSize: '12px' };
const hrS = { border: 'none', borderTop: '1px solid #eee', margin: '20px 0' };

export default FaultInfo;