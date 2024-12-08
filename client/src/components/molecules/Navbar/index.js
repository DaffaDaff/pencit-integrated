import React from 'react'
import './navbar.css';
import logo from '../../../assets/image/logo_auth.png';
import { House, Image, UserCircle, SignOut } from 'phosphor-react';


const Navbar = () => {
  return (
    <div className='navbar'>

        <div className='logo-nav'>
            <img className="logo-pencit-nav" src={logo} alt="Pencit Logo" />
            <p className="pencit-nav">Pencit</p>
        </div>

        <div className='menu'>
            <ul>
                <li>
                    <a href="/">
                        <House className="house-icon" size={40} weight="fill"/>Home
                    </a>
                </li>
                <li>
                    <a href="/create">
                        <Image className='image-icon' size={40} weight="fill" /> Create
                    </a>
                </li>
                <li>
                    <a href="/profile">
                        <UserCircle className="user-icon" size={40} weight="fill" />Profile
                    </a>
                </li>
                <li>
                    <a className="logout-nav" href="/pencit">
                        <SignOut className="logout-icon" size={40} weight="fill" />Keluar
                    </a>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar