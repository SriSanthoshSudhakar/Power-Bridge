import React, { useState, useEffect } from 'react';
import KPI_Card from '../../components/KPI_Card';

const Home = () => {
  const [data, setData] = useState({ v: 230, status: 'Stable' });

  useEffect(() => {
    const fetchLive = () => {
      fetch('http://localhost/bridge/get_live_monitoring.php')
        .then(res => res.json())
        .then(res => {
            const v = res.stream[res.stream.length-1].v;
            setData({ v, status: v > 235 ? 'Outage - Backup Active' : 'Available' });
        });
    };
    const itv = setInterval(fetchLive, 1000);
    return () => clearInterval(itv);
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h1>🌐 Public Overview</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <KPI_Card label="Power Status" value={data.status} color={data.v > 235 ? "#ef4444" : "#22c55e"} />
        <KPI_Card label="Voltage Availability" value={`${data.v} V`} />
        <KPI_Card label="Active Fault in Area" value={data.v > 235 ? "Yes" : "No"} />
        <KPI_Card label="Backup Supply Active" value={data.v > 235 ? "Yes" : "No"} />
        <KPI_Card label="Estimated Restoration" value={data.v > 235 ? "2 Hours" : "N/A"} />
        <KPI_Card label="Last Updated Time" value={new Date().toLocaleTimeString()} />
      </div>
    </div>
  );
};

export default Home;