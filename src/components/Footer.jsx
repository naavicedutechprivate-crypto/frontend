import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <h2 className="footer-company">Naavic Edutech Private Limited</h2>
            <p className="footer-tagline">
              Empowering Learning. Enabling Growth. Shaping Futures.
            </p>
            <p className="footer-desc">
              Building meaningful educational experiences through technology, innovation and continuous learning.
            </p>
          </div>

          {/* Our Platforms */}
          <div className="footer-links-col">
            <h3>Our Platforms</h3>
            <ul>
              <li>
                <a href="https://www.mathbook.in" target="_blank" rel="noreferrer">
                  Mathbook
                </a>
              </li>
              <li>
                <a href="https://www.alphamaster.in" target="_blank" rel="noreferrer">
                  AlphaMaster
                </a>
              </li>
              <li>
                <a href="https://www.vaagaistudy.com" target="_blank" rel="noreferrer">
                  Vaagai Study
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-links-col">
            <h3>Company</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><a href="/#leadership">Leadership</a></li>
              <li><a href="/#careers">Careers</a></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-links-col">
            <h3>Legal</h3>
            <ul>
              <li><Link to="/terms">Terms &amp; Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/disclaimer">Disclaimer</Link></li>
              <li><Link to="/refund">Cancellation &amp; Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 Naavic Edutech Private Limited. All Rights Reserved.
          </p>
          <p className="footer-office">
            Registered Office: 135/1A, KKP Street, AS Pet, Namakkal, Tamil Nadu – 637001, India.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;