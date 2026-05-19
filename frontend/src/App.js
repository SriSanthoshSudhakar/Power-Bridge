import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Added motion for the Fade-In transition
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

// 1. Layout & Auth Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

// 2. Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import LiveMonitoring from './pages/admin/LiveMonitoring';
import HistoricalDashboard from './pages/admin/HistoricalDashboard';
import FaultManagement from './pages/admin/FaultManagement';
import Restoration from './pages/admin/Restoration';
import Infrastructure from './pages/admin/Infrastructure';
import Maintenance from './pages/admin/Maintenance';
import Reports from './pages/admin/Reports';
import Settings from './pages/admin/Settings';

// 3. Public Pages
import PublicHome from './pages/public/Home';
import AreaStatus from './pages/public/AreaStatus';
import FaultInfo from './pages/public/FaultInfo';
import RestorationUpdates from './pages/public/RestorationUpdates';
import Notifications from './pages/public/Notifications';

// Global Styles - Corrected path from ../App.css to ./App.css
import './App.css';

const App = () => {
  // Store user session: { role: 'admin' } or { role: 'public' }
  const [user, setUser] = useState(null);

  const handleLogin = (role) => {
    setUser({ role });
  };

  const handleLogout = () => {
    setUser(null);
  };

  /**
   * Layout Wrapper: Standardizes the UI for both Admin and Public views.
   * Added motion.div for the 1.5s Fade-In transition after the loading screen.
   */
  const Layout = ({ children, title }) => (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}
    >
      <Sidebar role={user?.role} onLogout={handleLogout} />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: '0' }}>
        <Navbar role={user?.role} title={title} />
        
        <main style={{ flex: 1, padding: '40px', overflowY: 'auto', background: '#f8fafc' }}>
          {children}
        </main>
      </div>
    </motion.div>
  );

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Auth Route: If logged in, redirect to respective home page */}
          <Route 
            path="/" 
            element={
              user ? (
                <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/public/home'} replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            } 
          />

          {/* --- 🔐 ADMIN ROUTES --- */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute isAllowed={user?.role === 'admin'}>
                <Layout title="Dashboard"><AdminDashboard /></Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/live" 
            element={
              <ProtectedRoute isAllowed={user?.role === 'admin'}>
                <Layout title="Live Monitoring"><LiveMonitoring /></Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/historical" 
            element={
              <ProtectedRoute isAllowed={user?.role === 'admin'}>
              {/* Set isFullPage to true here */}
                <Layout title="Historical Dashboard" isFullPage={true}>
                  <HistoricalDashboard />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/faults" 
            element={
              <ProtectedRoute isAllowed={user?.role === 'admin'}>
                <Layout title="Fault Management"><FaultManagement /></Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/restoration" 
            element={
              <ProtectedRoute isAllowed={user?.role === 'admin'}>
                <Layout title="Power Restoration"><Restoration /></Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/infrastructure" 
            element={
              <ProtectedRoute isAllowed={user?.role === 'admin'}>
                <Layout title="Infrastructure"><Infrastructure /></Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/maintenance" 
            element={
              <ProtectedRoute isAllowed={user?.role === 'admin'}>
                <Layout title="Maintenance"><Maintenance /></Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/reports" 
            element={
              <ProtectedRoute isAllowed={user?.role === 'admin'}>
                <Layout title="Reports"><Reports /></Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/settings" 
            element={
              <ProtectedRoute isAllowed={user?.role === 'admin'}>
                <Layout title="Settings"><Settings /></Layout>
              </ProtectedRoute>
            } 
          />

          {/* --- 🌐 PUBLIC ROUTES --- */}
          <Route 
            path="/public/home" 
            element={
              <ProtectedRoute isAllowed={user?.role === 'public'}>
                <Layout title="Public Overview"><PublicHome /></Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/public/area-status" 
            element={
              <ProtectedRoute isAllowed={user?.role === 'public'}>
                <Layout title="Area Power Status"><AreaStatus /></Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/public/fault-info" 
            element={
              <ProtectedRoute isAllowed={user?.role === 'public'}>
                <Layout title="Fault Information"><FaultInfo /></Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/public/updates" 
            element={
              <ProtectedRoute isAllowed={user?.role === 'public'}>
                <Layout title="Power Restoration Updates"><RestorationUpdates /></Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/public/notifications" 
            element={
              <ProtectedRoute isAllowed={user?.role === 'public'}>
                <Layout title="Notifications"><Notifications /></Layout>
              </ProtectedRoute>
            } 
          />

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default App;