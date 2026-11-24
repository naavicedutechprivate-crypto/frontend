import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../Styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      {/* Left Side: Logo */}
      <div className="nav-left">
        <NavLink to="/" end aria-label="Naavic Edutech Home">
          <img src={logo} alt="Naavic Logo" className="logo" />
        </NavLink>
      </div>

      {/* Center: Company Name */}
      <div className="nav-center">
        <h1 className="company-name">
          NAAVIC EDUTECH PRIVATE LIMITED
        </h1>
      </div>

      {/* Right Side: Navigation List */}
      <div className="nav-right">
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/careers"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Careers
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
