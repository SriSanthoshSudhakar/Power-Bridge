import React, { useState, useEffect } from 'react';

const RestorationUpdates = () => {
  const [status, setStatus] = useState({ isRestored: true, backupActive: false });

  useEffect(() => {
    const check = () => {
      fetch('http://localhost/bridge/get_live_monitoring.php')
        .then(res => res.json())
        .then(data => {
            const v = data.stream[data.stream.length-1].v;
            setStatus({ isRestored: v < 235, backupActive: v > 235 });
        });
    };
    const itv = setInterval(check, 1000);
    return () => clearInterval(itv);
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h1>⚡ Power Restoration Status</h1>
      <div style={cardS}>
        <h2 style={{color: status.isRestored ? '#22c55e' : '#ef4444'}}>
            {status.isRestored ? "POWER RESTORED" : "OUTAGE DETECTED"}
        </h2>
        <hr style={{margin:'20px 0', border:'none', borderTop:'1px solid #eee'}}/>
        <p><strong>Backup Line Activated:</strong> {status.backupActive ? "YES (Generator Active)" : "NO (Transformer Active)"}</p>
        <p><strong>System Status:</strong> {status.isRestored ? "Stable grid flow detected." : "Rerouting in progress..."}</p>
      </div>
    </div>
  );
};
const cardS = { background:'white', padding:'40px', borderRadius:'15px', boxShadow:'0 4px 10px rgba(0,0,0,0.05)', textAlign:'center' };

export default RestorationUpdates;