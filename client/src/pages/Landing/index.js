import React from 'react'
import './landing.css';

import logo from '../../assets/image/logo_auth.png';
import hero1 from '../../assets/image/landing1.png';
import hero2 from '../../assets/image/landing2.png';
import hero3 from '../../assets/image/landing3.png';


export const Landing = () => {

  return (
    <div className="landing-container">
        <div className='left'>

          <div className='logo-landing'>
          <img src={logo} alt="Pencit Logo" />
          </div>

          <div className='pencit-landing'>
            <p>Pencit</p>
          </div>

          <div className='word'>
            <p className='one'>Bagikan momen tak terlupakan</p>
            <p className='two'>kepada semua teman</p>
          </div>

          <div className='lbutton'>
            <a className='lrbutton' href="/register"><button className="lregister-button">Register</button></a>
            <a className='llbutton' href="/login"><button className='llogin-button'>Login</button></a>
          </div>
        </div>

        <div className="right">
          <div className='hero1'>
            <img src={hero1} alt="display"/>
          </div>

          <div className='hero2'>
            <img src={hero2} alt="display"/>
          </div>

          <div className='hero3'>
            <img src={hero3} alt="display"/>
          </div>

        </div>
        
    </div>

  )
}

export default Landing