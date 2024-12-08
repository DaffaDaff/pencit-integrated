import React from 'react';
import './register.css';
import logoAuth from '../../assets/image/logo_auth.png';
import cloudAuth1 from '../../assets/image/cloud auth 1.png';
import cloudAuth2 from '../../assets/image/cloud auth 2.png';

const Register = () => {
  return (
    <div className="register-container">
      <img src={cloudAuth1} alt="Cloud 1" className="cloud cloud-1" />
      <img src={cloudAuth2} alt="Cloud 2" className="cloud cloud-2" />
      
      <div className="register-content">
        <div className="welcome-text">
          <h1>Halo, Selamat Datang di</h1>
          <h2 className="pencit-title">Pencit</h2>
        </div>
        
        <div className="register-card">
          <div className="register-form">
            <div className="register-logo">
              <img src={logoAuth} alt="Pencit Logo" />
            </div>
            <h3 className="register-heading">Register</h3>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className="register-button">Buat Akun</button>
            <p className="login-link">Sudah punya akun? <a href="/login">Login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;