import React, { useEffect, useRef, useState } from 'react';
import '../Styles/About.css';

function About() {
  const pageRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  return (
    <div className="about-page" ref={pageRef}>
      {/* Top Scroll Progress Bar */}
      <div className="about-scroll-track" aria-hidden="true">
        <div
          className="about-scroll-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-glow about-glow-left" aria-hidden="true" />
        <div className="about-glow about-glow-right" aria-hidden="true" />

        <div className="about-container">
          <h1 className="about-title reveal-popup">
            Transforming Education Through Technology
          </h1>
          <p className="about-paragraph reveal-popup delay-1">
            Naavic Edutech Private Limited is an education technology company focused on developing innovative digital learning platforms and educational solutions.
          </p>
          <p className="about-paragraph reveal-popup delay-2">
            We believe that technology can make education more accessible, personalised and effective. Our approach combines educational content, interactive assessments, structured learning experiences and performance analytics to support learners at different stages of their educational journey.
          </p>
          <p className="about-paragraph reveal-popup delay-2">
            Our growing product ecosystem includes Mathbook, AlphaMaster and Vaagai Study, each designed to address a distinct learning and examination preparation requirement.
          </p>
          <p className="about-paragraph reveal-popup delay-3">
            We are continuously exploring new opportunities to expand our educational services and build solutions that create meaningful value for learners across India.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="about-vm-section">
        <div className="about-container vm-grid">
          <div className="vm-card reveal-popup">
            <div className="vm-icon">◈</div>
            <h2>Our Vision</h2>
            <p>
              To become a trusted education technology company that transforms the way people learn, practise, assess their knowledge and prepare for future opportunities.
            </p>
          </div>

          <div className="vm-card reveal-popup delay-1">
            <div className="vm-icon">❖</div>
            <h2>Our Mission</h2>
            <p>
              To develop accessible, innovative and learner-focused digital education platforms that combine quality content, technology and meaningful performance insights to improve learning outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="about-values-section">
        <div className="about-container">
          <h2 className="about-subtitle reveal-popup">
            What Guides Every Decision We Make
          </h2>

          <div className="values-grid">
            <div className="value-card reveal-popup">
              <h3>Innovation</h3>
              <p>
                We continuously explore better ways to deliver educational experiences through technology.
              </p>
            </div>

            <div className="value-card reveal-popup delay-1">
              <h3>Learner First</h3>
              <p>
                We place learners&apos; needs, progress and development at the centre of our solutions.
              </p>
            </div>

            <div className="value-card reveal-popup delay-2">
              <h3>Quality</h3>
              <p>
                We strive to deliver relevant, structured and valuable educational content and services.
              </p>
            </div>

            <div className="value-card reveal-popup">
              <h3>Integrity</h3>
              <p>
                We believe in transparency, responsibility and trust in everything we do.
              </p>
            </div>

            <div className="value-card reveal-popup delay-1">
              <h3>Continuous Improvement</h3>
              <p>
                We learn, adapt and evolve our products based on user needs and emerging opportunities.
              </p>
            </div>

            <div className="value-card reveal-popup delay-2">
              <h3>Accessibility</h3>
              <p>
                We aim to make meaningful learning opportunities available to a wider community of learners.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;