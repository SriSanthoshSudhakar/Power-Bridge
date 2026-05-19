import React, { useState } from 'react';

const AreaStatus = () => {
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');

  const tnData = {
    "Chennai": ["Adyar", "Anna Nagar", "T-Nagar", "Velachery"],
    "Madurai": ["Anna Nagar", "K.Pudur", "Sellur"],
    "Coimbatore": ["Gandhipuram", "Peelamedu", "RS Puram"],
    "Trichy": ["Srirangam", "Thillai Nagar", "K.K Nagar"]
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1>📍 Area Power Status</h1>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <select onChange={(e) => setCity(e.target.value)} style={selS}>
          <option value="">Select City (Tamil Nadu)</option>
          {Object.keys(tnData).map(c => <option key={c}>{c}</option>)}
        </select>
        <select onChange={(e) => setArea(e.target.value)} style={selS} disabled={!city}>
          <option value="">Select Area</option>
          {city && tnData[city].map(a => <option key={a}>{a}</option>)}
        </select>
      </div>

      <div style={mapBox}>
        {city && area ? (
          <iframe 
            width="100%" height="100%" border="0"
            src={`https://www.google.com/maps?q=${area},${city},TamilNadu&output=embed`}
          ></iframe>
        ) : (
          <p style={{color:'#999'}}>Please select City and Area to view the live grid map.</p>
        )}
      </div>
    </div>
  );
};
const selS = { padding:'12px', width:'250px', borderRadius:'8px', border:'1px solid #ddd' };
const mapBox = { width:'100%', height:'500px', background:'#eee', borderRadius:'15px', overflow:'hidden', display:'flex', justifyContent:'center', alignItems:'center' };

export default AreaStatus;