import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Styles/NotFound.css';

function NotFound() {
  const location = useLocation();

  return (
    <div className="notfound-page">
      <div className="notfound-glow notfound-glow-left" aria-hidden="true" />
      <div className="notfound-glow notfound-glow-right" aria-hidden="true" />

      <div className="notfound-card">
        <div className="notfound-code">404</div>
        <h1 className="notfound-title">Page Not Found</h1>
        <p className="notfound-message">
          The page <code>{location.pathname}</code> does not exist or may have been moved on{' '}
          <strong>Naavic Edutech Private Limited</strong>.
        </p>

        <div className="notfound-actions">
          <Link to="/" className="notfound-btn-primary">
            Back to Home
          </Link>
          <Link to="/contact" className="notfound-btn-outline">
            Contact Support
          </Link>
        </div>

        <div className="notfound-quick-links">
          <span>Quick Links:</span>
          <Link to="/about">About Us</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;