import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import logoAuth from '../../assets/image/logo_auth.png';
import cloudAuth1 from '../../assets/image/cloud auth 1.png';
import cloudAuth2 from '../../assets/image/cloud auth 2.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, password });
      
      if (response.data.error) {
        setErrorMessage(response.data.message);
      } else {
        // Handle successful login
        const { accessToken, user } = response.data;
        localStorage.setItem('accessToken', accessToken);
        //alert(`Welcome back, ${user.fullName}!`);
        window.location.href = '/';
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };



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
          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-logo">
              <img src={logoAuth} alt="Pencit Logo" />
            </div>
            <h3 className="login-heading">Login</h3>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button className="login-button" type="submit">Masuk</button>
            <p className="register-link">Belum punya akun? <a href="/register">Daftar</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;