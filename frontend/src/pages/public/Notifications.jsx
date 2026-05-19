import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ShieldAlert, CheckCircle, Zap, X } from 'lucide-react';

const Notifications = () => {
  const [notifs, setNotifs] = useState([]);
  const [lastVoltage, setLastVoltage] = useState(230);
  const [popup, setPopup] = useState(null); // Controls the live popup

  useEffect(() => {
    const checkCircuitSwitch = async () => {
      try {
        const res = await fetch('http://localhost/bridge/get_live_monitoring.php');
        const data = await res.json();
        const currentV = data.stream[data.stream.length - 1].v;

        // Detect Switch: Transformer to Generator
        if (currentV > 235 && lastVoltage <= 235) {
          const newAlert = {
            id: Date.now(),
            type: 'fault',
            title: 'Circuit Switch Detected',
            message: `⚠️ High Voltage (${currentV}V)! System switched to BACKUP GENERATOR.`,
            time: new Date().toLocaleTimeString()
          };
          triggerNotification(newAlert);
        } 
        // Detect Switch: Generator to Transformer
        else if (currentV <= 235 && lastVoltage > 235) {
          const newAlert = {
            id: Date.now(),
            type: 'success',
            title: 'Power Stabilized',
            message: `✅ Voltage Normalized (${currentV}V). System returned to MAIN TRANSFORMER.`,
            time: new Date().toLocaleTimeString()
          };
          triggerNotification(newAlert);
        }

        setLastVoltage(currentV);
      } catch (e) {
        console.error("Notification Sync Error");
      }
    };

    const interval = setInterval(checkCircuitSwitch, 2000); // Poll every 2 seconds
    return () => clearInterval(interval);
  }, [lastVoltage, notifs]);

  const triggerNotification = (newNotif) => {
    setPopup(newNotif);
    setNotifs([newNotif, ...notifs]);
    // Auto-hide popup after 6 seconds
    setTimeout(() => setPopup(null), 6000);
  };

  const removeNotif = (id) => {
    setNotifs(notifs.filter(n => n.id !== id));
  };

  return (
    <div style={{ padding: '30px', position: 'relative', minHeight: '80vh' }}>
      <h1>🔔 System Notifications</h1>
      <p style={{ color: '#64748b', marginBottom: '30px' }}>Real-time alerts for circuit switches and area status.</p>

      {/* --- THE LIVE POPUP ALERT --- */}
      <AnimatePresence>
        {popup && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            style={popupContainer}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {popup.type === 'fault' ? <ShieldAlert color="#ff4d4f" /> : <CheckCircle color="#52c41a" />}
              <div>
                <b style={{ display: 'block' }}>{popup.title}</b>
                <span style={{ fontSize: '13px' }}>{popup.message}</span>
              </div>
            </div>
            <X size={18} onClick={() => setPopup(null)} style={{ cursor: 'pointer', marginLeft: '20px' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- NOTIFICATION HISTORY LIST --- */}
      <div style={{ marginTop: '50px' }}>
        {notifs.length > 0 ? (
          notifs.map(n => (
            <div key={n.id} style={notifCard}>
              <div style={{...iconCircle, background: n.type === 'fault' ? '#fff1f0' : '#f6ffed'}}>
                {n.type === 'fault' ? <Zap size={20} color="#ff4d4f"/> : <CheckCircle size={20} color="#52c41a"/>}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '15px' }}>{n.title}</h4>
                <p style={{ margin: '5px 0', fontSize: '14px', color: '#475569' }}>{n.message}</p>
                <small style={{ color: '#94a3b8' }}>{n.time}</small>
              </div>
              <button onClick={() => removeNotif(n.id)} style={btnDismiss}>Mark as Read</button>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '100px', color: '#94a3b8' }}>
            <Bell size={48} style={{ marginBottom: '20px', opacity: 0.3 }} />
            <p>No recent activity detected in the circuit.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- STYLES ---
const popupContainer = {
  position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
  width: '500px', background: '#1e293b', color: 'white', padding: '20px 25px',
  borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', zIndex: 9999,
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  borderLeft: '5px solid #00008B'
};

const notifCard = {
  background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '15px',
  display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #e2e8f0',
  boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
};

const iconCircle = {
  width: '45px', height: '45px', borderRadius: '50%', 
  display: 'flex', alignItems: 'center', justifyContent: 'center'
};

const btnDismiss = {
  background: 'none', border: '1.5px solid #00008B', color: '#00008B',
  padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer'
};

export default Notifications;