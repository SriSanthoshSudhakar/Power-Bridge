import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const PlotChart = ({ externalData }) => {
  // Use the data passed from the parent (Dashboard.jsx)
  const data = externalData || [];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
      
      {/* 1. Live Voltage Trend */}
      <div style={chartCardStyle}>
        <h3 style={{ marginBottom: '15px', color: '#00008B' }}>Live Voltage Trend (V)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" fontSize={10} />
            <YAxis domain={[150, 260]} fontSize={12} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="voltage" 
              stroke="#00008B" 
              strokeWidth={3} 
              dot={false} 
              isAnimationActive={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 2. Current Consumption Area Chart */}
      <div style={chartCardStyle}>
        <h3 style={{ marginBottom: '15px', color: '#22c55e' }}>Current Consumption (A)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorCurr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" fontSize={10} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="current" 
              stroke="#22c55e" 
              fillOpacity={1} 
              fill="url(#colorCurr)" 
              isAnimationActive={false} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

const chartCardStyle = { 
  background: 'white', 
  padding: '20px', 
  borderRadius: '15px', 
  border: '1px solid #e2e8f0', 
  boxShadow: '0 4px 6px rgba(0,0,0,0.05)' 
};

export default PlotChart;