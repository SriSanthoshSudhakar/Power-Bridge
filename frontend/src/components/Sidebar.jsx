import React from 'react';
import { NavLink } from 'react-router-dom';
// Add BarChart3 to this list
import { 
  LayoutDashboard, Activity, BarChart3, AlertTriangle, RefreshCcw, 
  Database, PenTool, FileText, Settings, LogOut,
  Home, Map, ShieldAlert, Zap, Bell
} from 'lucide-react';
import logoImg from '../assets/logo.png';

const Sidebar = ({ role, onLogout }) => {
  
  const adminMenu = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={22}/> },
    { name: 'Live Monitoring', path: '/admin/live', icon: <Activity size={22}/> },
    { name: 'Historical Dashboard', path: '/admin/historical', icon: <BarChart3 size={22}/> }, 
    { name: 'Fault Management', path: '/admin/faults', icon: <AlertTriangle size={22}/> },
    { name: 'Power Restoration', path: '/admin/restoration', icon: <RefreshCcw size={22}/> },
    { name: 'Infrastructure', path: '/admin/infrastructure', icon: <Database size={22}/> },
    { name: 'Maintenance', path: '/admin/maintenance', icon: <PenTool size={22}/> },
    { name: 'Reports', path: '/admin/reports', icon: <FileText size={22}/> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={22}/> },
  ];

  const publicMenu = [
    { name: 'Public Overview', path: '/public/home', icon: <Home size={22}/> },
    { name: 'Area Power Status', path: '/public/area-status', icon: <Map size={22}/> },
    { name: 'Fault Information', path: '/public/fault-info', icon: <ShieldAlert size={22}/> },
    { name: 'Power Restoration Updates', path: '/public/updates', icon: <Zap size={22}/> },
    { name: 'Notifications', path: '/public/notifications', icon: <Bell size={22}/> },
  ];

  const menuItems = role === 'admin' ? adminMenu : publicMenu;

  return (
    <aside style={{ width: '260px', height: '100vh', background: 'white', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 100 }}>
      <div style={{ padding: '30px', borderBottom: '1px solid #f1f5f9' }}>
        <img src={logoImg} alt="PowerBridge" style={{ width: '100%' }} />
      </div>
      
      <nav style={{ flex: 1, padding: '20px 0', overflowY: 'auto' }}>
        {menuItems.map(item => (
          <NavLink 
            key={item.name} 
            to={item.path} 
            style={({ isActive }) => ({
              display: 'flex', 
              alignItems: 'center', 
              padding: '16px 25px', 
              textDecoration: 'none',
              color: isActive ? 'white' : '#1e293b', 
              background: isActive ? '#00008B' : 'transparent',
              fontSize: '15px', 
              fontWeight: '600', 
              gap: '15px',
              transition: '0.2s'
            })}
          >
            {item.icon} <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '25px' }}>
        <button onClick={onLogout} style={{ width: '100%', padding: '14px', background: '#00008B', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <LogOut size={18}/> Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;