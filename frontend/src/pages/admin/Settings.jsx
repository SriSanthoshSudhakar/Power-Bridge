import React, { useState } from 'react';

const Settings = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.body.style.backgroundColor = "#1a1a1a";
      document.body.style.color = "#ffffff";
    } else {
      document.body.style.backgroundColor = "#f8fafc";
      document.body.style.color = "#1e293b";
    }
  };

  const btnS = { 
    padding:'12px 25px', 
    background: isDark ? '#555' : '#00008B', 
    color:'white', 
    border:'none', 
    borderRadius:'8px', 
    cursor:'pointer', 
    fontWeight:'bold' 
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1>⚙️ Settings</h1>
      <div style={{ background: isDark ? '#333' : 'white', padding: '30px', borderRadius: '15px', display:'flex', justifyContent:'space-between', alignItems:'center', border: '1px solid #eee' }}>
        <span>System Theme (Light / Dark)</span>
        <button onClick={toggleTheme} style={btnS}>
          {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default Settings; // FIX: Added default export