import React, { useState, useEffect } from 'react';
import { Plus, X, PenTool } from 'lucide-react';

const Maintenance = () => {
  const [logs, setLogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    m_id: '',
    description: '',
    technician: '',
    date: '',
    status: 'Scheduled'
  });

  // 1. Load data when page opens
  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch('http://localhost/bridge/get_maintenance.php');
      const data = await res.json();
      setLogs(data);
    } catch (e) {
      console.error("Error fetching logs:", e);
    }
  };

  // 2. Save data to MySQL
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost/bridge/add_maintenance.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      
      if (result.status === "success") {
        setShowForm(false); // Close form
        setFormData({ m_id: '', description: '', technician: '', date: '', status: 'Scheduled' }); // Reset
        fetchLogs(); // Refresh the table automatically
      } else {
        alert("Error saving log");
      }
    } catch (e) {
      console.error("Save error:", e);
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#1e293b' }}>
          <PenTool size={35} color="#00008B" /> Maintenance Logs
        </h1>
        <button onClick={() => setShowForm(true)} style={btnPrimary}>+ Add Log</button>
      </div>

      {/* MODAL FORM */}
      {showForm && (
        <div style={overlay}>
          <div style={modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2>New Maintenance Entry</h2>
              <X onClick={() => setShowForm(false)} style={{ cursor: 'pointer' }} />
            </div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={inputGroup}>
                <label>M-ID</label>
                <input type="text" value={formData.m_id} onChange={(e) => setFormData({ ...formData, m_id: e.target.value })} required style={inputStyle} placeholder="e.g. M-101" />
              </div>
              <div style={inputGroup}>
                <label>Description</label>
                <input type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required style={inputStyle} placeholder="Problem description" />
              </div>
              <div style={inputGroup}>
                <label>Technician</label>
                <input type="text" value={formData.technician} onChange={(e) => setFormData({ ...formData, technician: e.target.value })} required style={inputStyle} placeholder="Name" />
              </div>
              <div style={inputGroup}>
                <label>Date</label>
                <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required style={inputStyle} />
              </div>
              <div style={inputGroup}>
                <label>Status</label>
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} style={inputStyle}>
                  <option>Scheduled</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
              <button type="submit" style={btnSave}>Save Log</button>
            </form>
          </div>
        </div>
      )}

      {/* LOGS TABLE */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8fafc' }}>
            <tr>
              <th style={thStyle}>M-ID</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Technician</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? logs.map((log, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={tdStyle}>{log.m_id}</td>
                <td style={tdStyle}>{log.description}</td>
                <td style={tdStyle}>{log.technician}</td>
                <td style={tdStyle}>{log.date}</td>
                <td style={tdStyle}>
                  <span style={log.status === 'Completed' ? statusGreen : statusOrange}>
                    {log.status}
                  </span>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>No logs found. Click + Add Log to begin.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- STYLES ---
const btnPrimary = { background: '#00008B', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' };
const btnSave = { background: '#00008B', color: 'white', border: 'none', padding: '15px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' };
const overlay = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modal = { background: 'white', padding: '40px', borderRadius: '16px', width: '450px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' };
const inputGroup = { display: 'flex', flexDirection: 'column', gap: '5px' };
const inputStyle = { padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' };
const thStyle = { padding: '15px', textAlign: 'left', color: '#64748b', fontSize: '13px', fontWeight: 'bold', borderBottom: '1px solid #e2e8f0' };
const tdStyle = { padding: '15px', fontSize: '14px', color: '#1e293b' };
const statusGreen = { background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' };
const statusOrange = { background: '#fff7ed', color: '#c2410c', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' };

export default Maintenance;