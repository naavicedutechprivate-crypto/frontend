import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css';
import mathbook from '../assets/mathbook.png';
import alphamaster from '../assets/alphamaster.jpeg';
import logo from '../assets/Logo.png';
import vaagai from '../assets/vaagai.jpeg';

function Home() {
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
    <div className="home-page" ref={pageRef}>
      {/* Top Scroll Progress Indicator */}
      <div className="scroll-progress-track" aria-hidden="true">
        <div
          className="scroll-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section - Left Text & Right Logo Split */}
      <section className="hero-section">
        <div className="hero-glow hero-glow-left" aria-hidden="true" />
        <div className="hero-glow hero-glow-right" aria-hidden="true" />

        <div className="hero-inner">
          {/* Left Side: All Text & CTA Buttons */}
          <div className="hero-content-left">
            <h1 className="hero-title reveal-popup">NAAVIC EDUTECH PRIVATE LIMITED</h1>
            <p className="hero-tagline reveal-popup delay-1">
              Empowering Learning. Enabling Growth. Shaping Futures.
            </p>
            <p className="hero-lead reveal-popup delay-1">
              Building meaningful educational experiences through technology, innovation and continuous learning.
            </p>
            <p className="hero-description reveal-popup delay-2">
              Naavic Edutech Private Limited is an education technology company committed to creating accessible, engaging and technology-driven learning solutions. We develop digital platforms that help learners strengthen their knowledge, improve their skills, prepare for competitive examinations and move confidently towards their educational and career goals.
            </p>
            <p className="hero-description reveal-popup delay-2">
              Through our growing ecosystem of educational products, we aim to make learning more structured, measurable, engaging and accessible.
            </p>
            <p className="hero-motto reveal-popup delay-3">
              Our Products. Our Purpose. Your Progress.
            </p>
            <div className="hero-actions reveal-popup delay-3">
              <a href="#product-ecosystem" className="btn-primary-green btn-shimmer">
                Explore Our Platforms
              </a>
              <Link to="/contact" className="btn-outline-green">
                Connect With Us
              </Link>
            </div>
          </div>

          {/* Right Side: Logo Showcase */}
          <div className="hero-visual-right reveal-popup delay-2">
            <div className="hero-logo-card">
              <img
                src={logo}
                alt="Naavic Logo"
                className="hero-image hero-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Product Ecosystem */}
      <section id="product-ecosystem" className="ecosystem-section">
        <div className="section-container">
          <h2 className="section-heading reveal-popup">
            Three Platforms. One Learning Mission.
          </h2>
          <p className="section-subtitle reveal-popup delay-1">
            Naavic Edutech is building an interconnected ecosystem of educational platforms, each designed with a specific learning purpose.
          </p>

          <div className="ecosystem-grid">
            {/* 1. MATHBOOK APP */}
            <article className="platform-card reveal-popup">
              <div className="card-badge">01</div>
              <h3>1. MATHBOOK APP</h3>
              <div className="platform-image-wrap">
                <img src={mathbook} alt="Mathbook App" className="platform-image" />
              </div>
              <p className="platform-tagline">
                Making Mathematics Engaging, Interactive and Rewarding.
              </p>
              <p className="platform-link-line">
                Website:{' '}
                <a href="https://www.mathbook.in" target="_blank" rel="noreferrer">
                  https://www.mathbook.in
                </a>
              </p>
              <p className="platform-copy">
                Mathbook is our live digital mathematics learning platform, designed to encourage students to develop mathematical knowledge through structured learning, interactive quizzes, regular practice and engaging challenges.
              </p>
              <p className="platform-copy">
                Our platform aims to make mathematics more interesting by combining learning activities, knowledge assessments and reward-based engagement.
              </p>
              <h4 className="sublist-title">Key Features</h4>
              <ul className="feature-list">
                <li>Interactive mathematics learning.</li>
                <li>Daily quizzes and knowledge assessments.</li>
                <li>Structured learning through progressive levels.</li>
                <li>Premium learning opportunities.</li>
                <li>Performance-based challenges and events.</li>
                <li>Rewards and referral-based engagement programmes.</li>
              </ul>
              <p className="platform-copy">
                Mathbook encourages learners to practise consistently, develop confidence and strengthen their mathematical abilities.
              </p>
              <div className="card-footer-link">
                Explore Mathbook:{' '}
                <a href="https://www.mathbook.in" target="_blank" rel="noreferrer">
                  www.mathbook.in
                </a>
              </div>
            </article>

            {/* 2. ALPHAMASTER */}
            <article className="platform-card featured-card reveal-popup delay-1">
              <div className="card-badge">02</div>
              <h3>2. ALPHAMASTER</h3>
              <div className="platform-image-wrap">
                <img src={alphamaster} alt="AlphaMaster" className="platform-image" />
              </div>
              <p className="platform-tagline">
                The Mathbook Grand Championship
              </p>
              <p className="platform-link-line">
                Website:{' '}
                <a href="https://www.alphamaster.in" target="_blank" rel="noreferrer">
                  https://www.alphamaster.in
                </a>
              </p>
              <p className="platform-copy">
                AlphaMaster is the championship programme associated with Mathbook, created to recognise knowledge, consistency, dedication and excellence in mathematics.
              </p>
              <p className="platform-copy">
                It provides eligible Mathbook premium learners with an opportunity to participate in a structured competitive championship after successfully completing the required learning levels.
              </p>
              <p className="platform-copy">
                The championship is designed to provide learners with an exciting competitive experience and recognise outstanding performance.
              </p>
              <h4 className="sublist-title">Our Championship Approach</h4>
              <ul className="feature-list">
                <li>Eligibility through successful completion of 12 Mathbook levels.</li>
                <li>Structured multi-round championship.</li>
                <li>Progressive competitive assessments.</li>
                <li>Recognition of outstanding performers.</li>
                <li>Champion and runner-up awards.</li>
              </ul>
              <p className="platform-copy">
                AlphaMaster aims to make learning achievements more meaningful by providing learners with a platform to demonstrate their knowledge and capabilities.
              </p>
              <div className="card-footer-link">
                Explore AlphaMaster:{' '}
                <a href="https://www.alphamaster.in" target="_blank" rel="noreferrer">
                  www.alphamaster.in
                </a>
              </div>
            </article>

            {/* 3. VAAGAI STUDY */}
            <article className="platform-card reveal-popup delay-2">
              <div className="card-badge">03</div>
              <h3>3. VAAGAI STUDY</h3>
              <div className="platform-image-wrap">
                <img src={vaagai} alt="Vaagai Study" className="platform-image" />
              </div>
              <p className="platform-tagline">
                Your Preparation. Your Progress. Your Success.
              </p>
              <p className="platform-link-line">
                Website:{' '}
                <a href="https://www.vaagaistudy.com" target="_blank" rel="noreferrer">
                  https://www.vaagaistudy.com
                </a>
              </p>
              <p className="platform-copy">
                Vaagai Study is our upcoming web and mobile-based examination preparation platform, designed to support students preparing for competitive examinations, career opportunities and higher-education entrance examinations.
              </p>
              <p className="platform-copy">
                We believe that effective examination preparation requires more than just reading study materials. It requires consistent practice, subject-wise assessment and a clear understanding of individual performance.
              </p>
              <p className="platform-copy">
                Vaagai Study brings these elements together through syllabus-oriented learning resources, daily examination-pattern tests and detailed performance analysis.
              </p>
              <h4 className="sublist-title">Key Features</h4>
              <ul className="feature-list">
                <li>Examination-specific study materials.</li>
                <li>Syllabus-based learning content.</li>
                <li>Daily practice tests designed around examination patterns.</li>
                <li>Subject-wise and topic-wise assessments.</li>
                <li>Individual performance analysis and reports.</li>
                <li>Learning progress monitoring.</li>
                <li>Flexible examination-specific subscription packages.</li>
              </ul>
              <h4 className="sublist-title">Our Initial Focus: TNPSC</h4>
              <p className="platform-copy">
                We are beginning with TNPSC examination preparation, with a long-term vision to expand into other competitive, career-oriented and higher-education entrance examinations across India, including NEET.
              </p>
              <p className="platform-copy">
                Our objective is to help every learner prepare with purpose, practise consistently and improve through meaningful insights.
              </p>
              <div className="card-footer-link">
                Explore Vaagai Study:{' '}
                <a href="https://www.vaagaistudy.com" target="_blank" rel="noreferrer">
                  www.vaagaistudy.com
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="approach-section">
        <div className="section-container">
          <h2 className="section-heading reveal-popup">
            Technology That Makes Learning Meaningful
          </h2>
          <p className="section-subtitle reveal-popup delay-1">
            At Naavic Edutech, we believe that effective learning is a continuous process.
          </p>
          <p className="platform-copy center-copy reveal-popup delay-1">
            Our platforms are designed around a learner-focused approach:
          </p>

          <div className="approach-pipeline reveal-popup delay-2">
            <span className="pipeline-step">Learn</span>
            <span className="pipeline-arrow">→</span>
            <span className="pipeline-step">Practise</span>
            <span className="pipeline-arrow">→</span>
            <span className="pipeline-step">Assess</span>
            <span className="pipeline-arrow">→</span>
            <span className="pipeline-step">Analyse</span>
            <span className="pipeline-arrow">→</span>
            <span className="pipeline-step">Improve</span>
            <span className="pipeline-arrow">→</span>
            <span className="pipeline-step">Achieve</span>
          </div>

          <p className="platform-copy center-copy reveal-popup delay-2">
            We aim to integrate educational content, interactive assessments, progress tracking and performance insights to help learners understand where they stand and how they can improve.
          </p>
          <p className="platform-copy center-copy reveal-popup delay-3">
            We continuously work towards developing digital learning experiences that encourage participation, consistency and measurable progress.
          </p>
        </div>
      </section>

      {/* Our Leadership */}
      <section id="leadership" className="leadership-section">
        <div className="section-container">
          <h2 className="section-heading reveal-popup">
            Driven by Purpose. Guided by Innovation.
          </h2>

          <div className="leader-card reveal-popup delay-1">
            <div className="leader-header">
              <h3>Mr. K. Ragu</h3>
              <p className="leader-role">Founder Director &amp; Chief Executive Officer</p>
            </div>
            <p className="platform-copy">
              Mr. K. Ragu is the Founder Director and Chief Executive Officer of Naavic Edutech Private Limited.
            </p>
            <p className="platform-copy">
              With a vision to create meaningful educational opportunities through technology, he leads the company&apos;s strategic direction, product development initiatives and business growth.
            </p>
            <p className="platform-copy">
              His focus is on building learner-centric digital platforms that combine education, technology, innovation and engagement.
            </p>
            <p className="platform-copy">
              Under his leadership, Naavic Edutech is developing an expanding ecosystem of educational products designed to support learners in mathematics, competitive examinations and future learning opportunities.
            </p>

            <blockquote className="philosophy-box reveal-popup delay-2">
              <span className="philosophy-label">Leadership Philosophy</span>
              <p>
                &ldquo;Technology should not simply deliver information. It should create opportunities for people to learn better, understand their progress and achieve their goals.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Our Growing Vision */}
      <section className="vision-section">
        <div className="section-container">
          <h2 className="section-heading reveal-popup">
            Building an Expanding Education Ecosystem
          </h2>
          <p className="section-subtitle reveal-popup delay-1">
            Our journey begins with focused educational solutions, but our vision extends much further.
          </p>
          <p className="platform-copy reveal-popup delay-1">
            We aim to progressively expand our digital learning ecosystem by:
          </p>
          <ul className="vision-list reveal-popup delay-2">
            <li>Developing more examination-specific learning platforms.</li>
            <li>Expanding our educational services across India.</li>
            <li>Improving personalised learning and performance analytics.</li>
            <li>Introducing innovative digital assessment solutions.</li>
            <li>Creating engaging learning and achievement experiences.</li>
            <li>Exploring new educational technologies to support learners and educators.</li>
          </ul>
          <p className="platform-copy highlight-note reveal-popup delay-3">
            We believe that every learner deserves access to the right resources, meaningful practice and opportunities to grow.
          </p>
        </div>
      </section>

      {/* Why Naavic Edutech? */}
      <section className="why-section">
        <div className="section-container">
          <h2 className="section-heading reveal-popup">
            Learning Solutions With a Purpose
          </h2>

          <div className="why-grid">
            <div className="why-card reveal-popup">
              <h3>Learner-Centred Innovation</h3>
              <p>
                We develop products with the learner&apos;s needs and educational goals at the centre.
              </p>
            </div>
            <div className="why-card reveal-popup delay-1">
              <h3>Purpose-Built Platforms</h3>
              <p>
                Each product is designed to address a specific learning or examination preparation requirement.
              </p>
            </div>
            <div className="why-card reveal-popup delay-2">
              <h3>Structured Learning Experiences</h3>
              <p>
                We combine educational content, practice and assessment to encourage continuous improvement.
              </p>
            </div>
            <div className="why-card reveal-popup delay-2">
              <h3>Technology-Driven Insights</h3>
              <p>
                We aim to make learning progress more understandable through meaningful assessments and performance reports.
              </p>
            </div>
            <div className="why-card reveal-popup delay-3">
              <h3>A Vision for Wider Reach</h3>
              <p>
                Our long-term ambition is to expand our educational ecosystem and support learners across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section id="careers" className="careers-section">
        <div className="section-container careers-box reveal-popup">
          <h2 className="section-heading">Be Part of the Future of Learning</h2>
          <p className="platform-copy">
            At Naavic Edutech, we believe that great educational solutions are built by passionate people who share a common purpose.
          </p>
          <p className="platform-copy">
            We welcome individuals who are enthusiastic about education, technology, creativity, innovation and making a positive impact on learners.
          </p>
          <p className="platform-copy">
            If you are interested in contributing to the future of digital education, we would love to hear from you.
          </p>
          <p className="careers-cta-line">
            Join Our Journey. Build the Future With Us.
          </p>
          <Link to="/contact" className="btn-primary-green btn-shimmer">
            Careers / Join Our Team
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
