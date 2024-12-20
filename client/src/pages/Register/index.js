import React, { useState } from 'react';
import './register.css';
import logoAuth from '../../assets/image/logo_auth.png';
import cloudAuth1 from '../../assets/image/cloud auth 1.png';
import cloudAuth2 from '../../assets/image/cloud auth 2.png';

const Register = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/create-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        window.location.href = '/login';
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      console.error('Error: ', error.message);
      setError(error.message || 'Unexpected Error');
    }
  };


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
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="fullName" 
                placeholder="Full Name" 
                value={formData.fullName} 
                onChange={handleChange} 
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={formData.email} 
                onChange={handleChange} 
              />
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={formData.password} 
                onChange={handleChange} 
              />
              <button type="submit" className="register-button">Buat Akun</button>
            </form>
            <p className="login-link">Sudah punya akun? <a href="/login">Login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;