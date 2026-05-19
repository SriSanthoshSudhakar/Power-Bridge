import React, { useState, useEffect } from 'react';
import KPI_Card from '../../components/KPI_Card';
import PlotChart from '../../components/PlotChart';

const Dashboard = () => {
  const [liveData, setLiveData] = useState([]);
  const [stats, setStats] = useState({
    voltage: 0,
    source: 'Transformer',
    health: '100%',
    faults: 0,
    color: '#00008B'
  });

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('http://localhost/bridge/get_viz_data.php');
      const data = await response.json();
      
      if (data && data.length > 0) {
        setLiveData(data);
        
        // Get the most recent voltage reading
        const latestV = data[data.length - 1].voltage;
        
        // --- 🟢 MULTI-LEVEL LOGIC START ---
        
        if (latestV > 210) {
          // LEVEL 1: CRITICAL RISK
          setStats({
            voltage: latestV,
            source: 'Backup',
            health: '60%',      // Risk set to 60% as requested
            faults: 1,
            color: '#ef4444'    // Critical Red
          });
        } 
        else if (latestV > 195) {
          // LEVEL 2: WARNING RISK
          setStats({
            voltage: latestV,
            source: 'Backup',
            health: '82%',      // Standard Risk
            faults: 1,
            color: '#f59e0b'    // Warning Orange/Amber
          });
        } 
        else {
          // LEVEL 3: STABLE
          setStats({
            voltage: latestV,
            source: 'Transformer',
            health: '100%',     // No Risk
            faults: 0,
            color: '#00008B'    // Professional Navy
          });
        }
        
        // --- 🔴 MULTI-LEVEL LOGIC END ---
      }
    } catch (error) {
      console.error("Dashboard Sync Error:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchDashboardData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '10px' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
        🔐 Admin Dashboard
      </h1>

      {/* 1. Real-time KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        
        <KPI_Card label="System Status" value="Online" color="#22c55e" />
        
        {/* Dynamic Source Card */}
        <KPI_Card 
          label="Source" 
          value={stats.source} 
          color={stats.color} 
        />
        
        {/* Dynamic Faults Card */}
        <KPI_Card 
          label="Active Faults" 
          value={stats.faults} 
          color={stats.faults === 1 ? '#ef4444' : '#00008B'} 
        />
        
        {/* Dynamic Health Card - Now reflects 100%, 82%, or 60% */}
        <KPI_Card 
          label="Health" 
          value={stats.health} 
          color={stats.color} 
        />
      </div>

      {/* 2. Charts (Receiving the live feed) */}
      <PlotChart externalData={liveData} />
    </div>
  );
};

export default Dashboard;