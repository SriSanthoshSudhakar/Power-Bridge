import React, { useState, useEffect } from 'react';
import { RefreshCcw, Zap, Clock, History } from 'lucide-react';

const PowerRestoration = () => {
  const [logs, setLogs] = useState([]);
  const [summary, setSummary] = useState({ backup: 'N/A', time: '0ms', est: '0h' });

  const fetchRestorationData = async () => {
    try {
      const response = await fetch('http://localhost/bridge/get_restoration.php');
      const data = await response.json();
      
      if (data.length > 0) {
        setLogs(data);
        // Set the top KPI card data based on the latest restoration event
        setSummary({
          backup: data[0].backup_line_used,
          time: data[0].switching_time_ms + 'ms',
          est: data[0].estimated_repair_time
        });
      }
    } catch (error) {
      console.error("Error fetching restoration logs:", error);
    }
  };

  useEffect(() => {
    fetchRestorationData();
    const interval = setInterval(fetchRestorationData, 3000); // Update every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#00008B' }}>
        <RefreshCcw size={32} /> Power Restoration Management
      </h1>

      {/* --- LIVE RESTORATION SUMMARY --- */}
      <div style={kpiRow}>
        <div style={kpiBox}>
          <Zap color="#00008B" size={20} />
          <span>Active Backup Line</span>
          <h3>{summary.backup}</h3>
        </div>
        <div style={kpiBox}>
          <Clock color="#22c55e" size={20} />
          <span>Last Switching Speed</span>
          <h3>{summary.time}</h3>
        </div>
        <div style={kpiBox}>
          <History color="#f59e0b" size={20} />
          <span>Est. Repair Completion</span>
          <h3>{summary.est}</h3>
        </div>
      </div>

      {/* --- SQL TABLE DISPLAY --- */}
      <div style={tableContainer}>
        <h3 style={{ marginBottom: '20px', color: '#1e293b' }}>Switching & Restoration Logs</h3>
        <table style={tableStyle}>
          <thead>
            <tr style={headerRow}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Fault Ref</th>
              <th style={thStyle}>Backup Line</th>
              <th style={thStyle}>Switch Time</th>
              <th style={thStyle}>Start Time</th>
              <th style={thStyle}>Est. Repair</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? logs.map((log) => (
              <tr key={log.restoration_id} style={rowStyle}>
                <td style={tdStyle}>#RES-{log.restoration_id}</td>
                <td style={tdStyle}>#FLT-{log.fault_id}</td>
                <td style={tdStyle}><span style={badgeStyle}>{log.backup_line_used}</span></td>
                <td style={tdStyle}>{log.switching_time_ms} ms</td>
                <td style={tdStyle}>{log.restoration_start}</td>
                <td style={tdStyle}>{log.estimated_repair_time}</td>
              </tr>
            )) : (
              <tr><td colSpan="6" style={{padding: '20px', textAlign: 'center'}}>No restoration events logged.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- STYLES ---
const kpiRow = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' };
const kpiBox = { background: 'white', padding: '25px', borderRadius: '15px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' };
const tableContainer = { background: 'white', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const headerRow = { borderBottom: '2px solid #f1f5f9', textAlign: 'left' };
const thStyle = { padding: '15px', color: '#64748b', fontSize: '14px', fontWeight: '600' };
const rowStyle = { borderBottom: '1px solid #f1f5f9' };
const tdStyle = { padding: '15px', fontSize: '14px', color: '#1e293b' };
const badgeStyle = { background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px' };

export default PowerRestoration;