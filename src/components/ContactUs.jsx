import React, { useState, useEffect, useRef } from 'react';
import '../Styles/ContactUs.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const LOCAL_MESSAGES_KEY = 'naavic_contact_messages';

function ContactUs() {
  const pageRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const container = pageRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('.reveal-popup');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -35px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const saveLocalFallback = (entry) => {
    try {
      const existing = JSON.parse(localStorage.getItem(LOCAL_MESSAGES_KEY) || '[]');
      const record = {
        _id: `local_${Date.now()}`,
        ...entry,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify([record, ...existing]));
    } catch {
      // Ignore storage quota issues
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSubmitted(false);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message. Please try again.');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        // Save locally so AdminPortal can still read it if backend is offline
        saveLocalFallback(payload);
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page" ref={pageRef}>
      {/* Top Scroll Progress Bar */}
      <div className="contact-scroll-track" aria-hidden="true">
        <div
          className="contact-scroll-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-glow contact-glow-left" aria-hidden="true" />
        <div className="contact-glow contact-glow-right" aria-hidden="true" />

        <div className="contact-container">
          <h1 className="contact-title reveal-popup">
            Let&apos;s Connect and Grow Together
          </h1>
          <p className="contact-intro reveal-popup delay-1">
            Whether you are a learner, parent, educator, institution, technology professional or potential business partner, we welcome opportunities to connect and collaborate.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-main-section">
        <div className="contact-container contact-grid">
          {/* Company Details Card */}
          <div className="contact-info-card reveal-popup">
            <h2 className="company-heading">Naavic Edutech Private Limited</h2>

            <div className="info-block">
              <h3>Registered Office:</h3>
              <p>135/1A,</p>
              <p>KKP Street,</p>
              <p>AS Pet, Namakkal,</p>
              <p>Tamil Nadu – 637001, India.</p>
            </div>

            <div className="info-block">
              <h3>Official Corporate Website:</h3>
              <p>
                <a href="https://www.naavicedutech.com" target="_blank" rel="noreferrer">
                  www.naavicedutech.com
                </a>
              </p>
            </div>

            <div className="info-block">
              <h3>Our Digital Platforms:</h3>
              <ul className="platforms-contact-list">
                <li>
                  Mathbook:{' '}
                  <a href="https://www.mathbook.in" target="_blank" rel="noreferrer">
                    www.mathbook.in
                  </a>
                </li>
                <li>
                  AlphaMaster:{' '}
                  <a href="https://www.alphamaster.in" target="_blank" rel="noreferrer">
                    www.alphamaster.in
                  </a>
                </li>
                <li>
                  Vaagai Study:{' '}
                  <a href="https://www.vaagaistudy.com" target="_blank" rel="noreferrer">
                    www.vaagaistudy.com
                  </a>
                </li>
              </ul>
            </div>

            <div className="info-block">
              <p className="direct-line">
                <strong>Email:</strong>{' '}
                <a href="mailto:naavicedutechprivate@gmail.com">
                  naavicedutechprivate@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="contact-form-card reveal-popup delay-1">
            <h2>Send Us a Message</h2>
            <p className="form-sub">
              Reach out to Naavic Edutech Private Limited for learning queries, partnerships, or support.
            </p>

            {submitted && (
              <div className="form-success-banner" role="status">
                Thank you for connecting with Naavic Edutech Private Limited. Our team will respond shortly.
              </div>
            )}

            {error && (
              <div className="form-error-banner" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="inquiry-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>

              <button
                type="submit"
                className="contact-submit-btn btn-shimmer"
                disabled={loading}
              >
                {loading ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;