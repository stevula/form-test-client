import React from 'react';
import logo from '../assets/strive-logo.png';

export default function Header() {
  return (
    <nav className="navbar navbar-light">
      <img src={logo} alt="Strive Talent logo" />
    </nav>
  );
}
