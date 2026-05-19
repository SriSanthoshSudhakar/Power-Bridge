import React from 'react';
import { BarChart3 } from 'lucide-react';

const HistoricalDashboard = () => {
  return (
    <div style={{ width: '100%', height: 'calc(100vh - 130px)', display: 'flex', flexDirection: 'column' }}>
      {/* Header Section */}
      <h1 style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '15px', 
        color: '#00008B', 
        fontSize: '24px', 
        fontWeight: '800',
        marginBottom: '15px' 
      }}>
        <BarChart3 size={30} /> Historical Analytics
      </h1>
      
      {/* Iframe Container */}
      <div style={{ 
        flex: 1, 
        width: '100%', 
        background: 'white', 
        borderRadius: '12px', 
        overflow: 'hidden', // Fixes the double scrollbar issue
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}>
        <iframe 
          title="Cognos Historical Dashboard"
          src="https://us3.ca.analytics.ibm.com/bi/?perspective=dashboard&pathRef=.my_folders%2FDashboard&closeWindowOnLastView=true&ui_appbar=false&ui_navbar=false&shareMode=embedded&action=view&mode=dashboard&subView=model0000019dae55860d_00000000&nav_filter=true" 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          gesture="media" 
          allow="encrypted-media" 
          allowFullScreen>
        </iframe>
      </div>
    </div>
  );
};

export default HistoricalDashboard;