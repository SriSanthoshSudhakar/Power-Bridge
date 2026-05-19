import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Zap, Activity, Database, ShieldCheck, Cpu } from 'lucide-react';

const LiveMonitoring = () => {
  const [dataStream, setDataStream] = useState([]);
  const [status, setStatus] = useState({ v: 0, c: 0, source: 'MAIN TRANSFORMER', health: '100%' });

  const fetchRapidData = async () => {
    try {
      const response = await fetch('http://localhost/bridge/get_live_monitoring.php');
      const json = await response.json();
      
      if (json.stream && json.stream.length > 0) {
        setDataStream(json.stream);

        const currentVoltage = json.latest_v;
        const isArcDetected = json.latest_arc === 1;

        let calculatedSource = 'MAIN TRANSFORMER';
        let healthLabel = 'STABLE (100%)';

        // --- 🟢 MULTI-LEVEL RISK LOGIC ---
        
        if (currentVoltage > 210) {
            // LEVEL 1: CRITICAL RISK
            calculatedSource = 'BACKUP LINE';
            healthLabel = 'RISK (60%)';
        } 
        else if (currentVoltage > 195 || isArcDetected) {
            // LEVEL 2: WARNING RISK
            calculatedSource = 'BACKUP LINE';
            healthLabel = 'RISK (82%)';
        }
        // Otherwise, stays as MAIN TRANSFORMER and STABLE (100%)
        
        // --- 🔴 END LOGIC ---

        setStatus({
          v: currentVoltage,
          c: json.latest_c,
          source: calculatedSource,
          health: healthLabel
        });
      }
    } catch (error) {
      console.error("Hardware Data Link Interrupted");
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchRapidData, 500); 
    return () => clearInterval(interval);
  }, []);

  // Determine colors based on active source
  const isBackupActive = status.source === 'BACKUP LINE';
  const themeColor = isBackupActive ? '#ef4444' : '#00008B';
  const bgColor = isBackupActive ? '#fff1f0' : 'white';

  return (
    <div style={pageWrapper}>
      <header style={headerArea}>
        <h1 style={titleStyle}><Cpu size={32} color="#00008B" /> Infrastructure System Trace</h1>
        <div style={liveBadge}>● DATA FEED ACTIVE</div>
      </header>

      <div style={kpiGrid}>
        {/* Voltage Card */}
        <div style={kpiCard}>
          <Zap color="#00008B" size={24} />
          <div><p style={kpiLabel}>Voltage</p><h2 style={kpiVal}>{status.v.toFixed(1)} V</h2></div>
        </div>

        {/* Amperage Card */}
        <div style={kpiCard}>
          <Activity color="#22c55e" size={24} />
          <div><p style={kpiLabel}>Amperage</p><h2 style={{...kpiVal, color: '#22c55e'}}>{status.c.toFixed(2)} A</h2></div>
        </div>

        {/* DYNAMIC SOURCE CARD */}
        <div style={{
          ...kpiCard, 
          borderLeft: `6px solid ${themeColor}`,
          backgroundColor: bgColor,
          boxShadow: isBackupActive ? '0 0 15px rgba(239, 68, 68, 0.2)' : '0 2px 4px rgba(0,0,0,0.05)',
          transition: 'all 0.3s ease'
        }}>
          <Database color={themeColor} size={24} />
          <div>
            <p style={kpiLabel}>Current Source</p>
            <h2 style={{...kpiVal, color: themeColor}}>
              {status.source}
            </h2>
          </div>
        </div>

        {/* Integrity Card (Reflects 100%, 82%, or 60%) */}
        <div style={kpiCard}>
          <ShieldCheck color={isBackupActive ? "#ef4444" : "#0ea5e9"} size={24} />
          <div>
            <p style={kpiLabel}>Integrity</p>
            <h2 style={{...kpiVal, color: isBackupActive ? "#ef4444" : "#0ea5e9"}}>
                {status.health}
            </h2>
          </div>
        </div>
      </div>

      <div style={chartContainer}>
        <ResponsiveContainer width="100%" height={450}>
          <LineChart data={dataStream}>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="time" hide={true} />
            <YAxis domain={[0, 260]} axisLine={false} tickLine={false} fontSize={12} tick={{fill: '#64748b'}} />
            <Tooltip />
            <Line 
              type="linear" 
              dataKey="v" 
              stroke={themeColor} 
              strokeWidth={4} 
              dot={false}
              isAnimationActive={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Styling remains the same
const pageWrapper = { padding: '30px', background: '#f8fafc', minHeight: '100vh' };
const headerArea = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' };
const titleStyle = { display: 'flex', alignItems: 'center', gap: '15px', color: '#1e293b', fontSize: '26px', fontWeight: '900' };
const liveBadge = { background: '#00008B', color: 'white', padding: '8px 16px', borderRadius: '4px', fontSize: '11px', fontWeight: '800' };
const kpiGrid = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px', marginBottom: '35px' };
const kpiCard = { background: 'white', padding: '25px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #e2e8f0' };
const kpiLabel = { fontSize: '11px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', marginBottom: '5px' };
const kpiVal = { fontSize: '22px', fontWeight: '900', margin: 0, color: '#1e293b' };
const chartContainer = { background: 'white', padding: '40px', borderRadius: '4px', border: '1px solid #e2e8f0', boxShadow: '0 10px 20px rgba(0,0,0,0.03)' };

export default LiveMonitoring;