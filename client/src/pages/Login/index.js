import React from 'react';
import './login.css';
import logoAuth from '../../assets/image/logo_auth.png';
import cloudAuth1 from '../../assets/image/cloud auth 1.png';
import cloudAuth2 from '../../assets/image/cloud auth 2.png';

const Login = () => {
  return (
    <div className="login-container">
      <img src={cloudAuth1} alt="Cloud 1" className="cloud cloud-1" />
      <img src={cloudAuth2} alt="Cloud 2" className="cloud cloud-2" />
      
      <div className="login-content">
        <div className="welcome-text">
          <h1>Selamat Datang Kembali di</h1>
          <h2 className="pencit-title">Pencit</h2>
        </div>
        
        <div className="login-card">
          <div className="login-form">
            <div className="login-logo">
              <img src={logoAuth} alt="Pencit Logo" />
            </div>
            <h3 className="login-heading">Login</h3>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className="login-button">Masuk</button>
            <p className="register-link">Belum punya akun? <a href="/register">Daftar</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;