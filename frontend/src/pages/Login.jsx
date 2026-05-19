import React, { useState } from 'react';
import '../App.css'; 

// Assets
import adminBg from '../assets/admin_bg.jpg';
import publicBg from '../assets/public_bg.jpg';

const Login = ({ onLogin }) => {
  const [isPublicActive, setIsPublicActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 5-second loading delay
    setTimeout(() => {
      onLogin(isPublicActive ? 'public' : 'admin');
    }, 5000);
  };

  return (
    <div className="login-page">
      {/* --- FULL SCREEN DARK BLUE LOADING --- */}
      {isLoading && (
        <div className="loader-fullscreen">
          {/* The white logo block has been removed from here */}
          <div className="circular-loader"></div>
          <p className="loader-text">SECURING CONNECTION...</p>
        </div>
      )}

      <div className={`auth-container ${isPublicActive ? 'right-panel-active' : ''}`}>
        
        {/* --- PUBLIC FORM --- */}
        <div className="form-container public-container">
          <form onSubmit={handleAuth}>
            <div className="form-content">
              <h1>Welcome back</h1>
              <p className="subtitle">Experience the Future</p>
              <div className="input-group">
                <label>Phone Number</label>
                <input type="text" placeholder="Enter Phone Number" required />
              </div>
              <div className="input-group">
                <label>City</label>
                <input type="text" placeholder="Enter City" required />
              </div>
              <div className="input-group">
                <label>Area</label>
                <input type="text" placeholder="Enter Area" required />
              </div>
              <div className="input-group">
                <label>Landmark</label>
                <input type="text" placeholder="Enter Landmark" required />
              </div>
              <button type="submit" className="login-btn">SIGN IN</button>
              <div className="switch-text">
                Not Public ? <span onClick={() => setIsPublicActive(false)}>Admin Login</span>
              </div>
            </div>
          </form>
        </div>

        {/* --- ADMIN FORM --- */}
        <div className="form-container admin-container">
          <form onSubmit={handleAuth}>
            <div className="form-content">
              <h1>Welcome back</h1>
              <p className="subtitle">Experience the Future</p>
              <div className="input-group">
                <label>User Id</label>
                <input type="text" placeholder="Enter User Id" required />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input type="password" placeholder="••••••••" required />
              </div>
              <button type="submit" className="login-btn">SIGN IN</button>
              <div className="switch-text">
                Not Admin ? <span onClick={() => setIsPublicActive(true)}>Public Access</span>
              </div>
            </div>
          </form>
        </div>

        {/* --- SLIDING WINDOW --- */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <img src={adminBg} alt="Admin Background" className="side-image" />
            </div>
            <div className="overlay-panel overlay-right">
              <img src={publicBg} alt="Public Background" className="side-image" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;