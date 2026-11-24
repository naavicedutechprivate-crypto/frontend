import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/LegalPages.css';

function TermsAndConditions() {
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
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="legal-page" ref={pageRef}>
      {/* Top Scroll Progress Bar */}
      <div className="legal-scroll-track" aria-hidden="true">
        <div
          className="legal-scroll-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header Banner */}
      <section className="legal-hero">
        <div className="legal-glow legal-glow-left" aria-hidden="true" />
        <div className="legal-glow legal-glow-right" aria-hidden="true" />

        <div className="legal-container">
          <h1 className="legal-title reveal-popup">TERMS AND CONDITIONS</h1>
          <p className="legal-company-name reveal-popup delay-1">
            Naavic Edutech Private Limited
          </p>
          <div className="legal-meta-row reveal-popup delay-2">
            <span>
              <strong>Website:</strong>{' '}
              <a href="https://www.naavicedutech.com" target="_blank" rel="noreferrer">
                www.naavicedutech.com
              </a>
            </span>
            <span>
              <strong>Effective Date:</strong> November 1, 2026
            </span>
            <span>
              <strong>Last Updated:</strong> November 1, 2026
            </span>
          </div>
        </div>
      </section>

      {/* Main Policy Document */}
      <section className="legal-content-section">
        <div className="legal-container">
          <div className="legal-document-card">
            {/* 1. Introduction */}
            <article className="legal-block reveal-popup">
              <h2>1. Introduction</h2>
              <p>
                Welcome to the official corporate website of Naavic Edutech Private Limited (&ldquo;Naavic Edutech&rdquo;, &ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo; or &ldquo;us&rdquo;).
              </p>
              <p>
                Naavic Edutech Private Limited is an education technology company committed to developing innovative digital learning platforms, educational solutions and technology-driven learning experiences.
              </p>
              <p>
                These Terms and Conditions govern your access to and use of our corporate website, www.naavicedutech.com (&ldquo;Website&rdquo;).
              </p>
              <p>
                By accessing or using this Website, you acknowledge that you have read, understood and agreed to these Terms and Conditions. If you do not agree, please discontinue using the Website.
              </p>
            </article>

            {/* 2. About the Company */}
            <article className="legal-block reveal-popup">
              <h2>2. About the Company</h2>
              <p>
                Naavic Edutech Private Limited is a company incorporated under the applicable laws of India.
              </p>
              <div className="legal-address-box">
                <strong>Registered Office:</strong>
                <p>135/1A, KKP Street,</p>
                <p>AS Pet, Namakkal,</p>
                <p>Tamil Nadu – 637001, India.</p>
              </div>
              <p>
                The Company develops and operates educational technology products and platforms, including:
              </p>
              <ul className="legal-list">
                <li>
                  <strong>Mathbook:</strong> A digital mathematics learning and assessment platform.
                </li>
                <li>
                  <strong>AlphaMaster:</strong> A mathematics championship and competitive learning initiative.
                </li>
                <li>
                  <strong>Vaagai Study:</strong> An upcoming examination preparation platform designed to support learners preparing for competitive and higher-education examinations.
                </li>
              </ul>
              <p>
                The Company may introduce additional products, services and initiatives from time to time.
              </p>
            </article>

            {/* 3. Purpose of the Website */}
            <article className="legal-block reveal-popup">
              <h2>3. Purpose of the Website</h2>
              <p>This Website is intended to provide information about:</p>
              <ul className="legal-list">
                <li>The Company and its corporate activities.</li>
                <li>Our products, platforms and services.</li>
                <li>Our vision, mission and educational initiatives.</li>
                <li>Business developments, announcements and opportunities.</li>
                <li>Career and partnership opportunities.</li>
                <li>Contact and support information.</li>
              </ul>
              <p>
                The information provided on this Website is primarily for general informational purposes and does not constitute a binding offer for any product, service, partnership or commercial arrangement.
              </p>
            </article>

            {/* 4. Eligibility and Acceptable Use */}
            <article className="legal-block reveal-popup">
              <h2>4. Eligibility and Acceptable Use</h2>
              <p>
                You agree to use this Website only for lawful purposes and in accordance with these Terms.
              </p>
              <p>You must not:</p>
              <ul className="legal-list">
                <li>Use the Website for any unlawful, fraudulent or misleading activity.</li>
                <li>Attempt to gain unauthorised access to the Website, its servers or related systems.</li>
                <li>Introduce viruses, malicious code or other harmful technology.</li>
                <li>Disrupt, damage or interfere with the Website&apos;s operation or security.</li>
                <li>Copy, reproduce, distribute or commercially exploit Website content without prior written permission.</li>
                <li>Use the Company&apos;s name, logo or intellectual property in a misleading or unauthorised manner.</li>
              </ul>
              <p>
                We reserve the right to restrict or terminate access where misuse or a violation of these Terms is identified.
              </p>
            </article>

            {/* 5. Intellectual Property Rights */}
            <article className="legal-block reveal-popup">
              <h2>5. Intellectual Property Rights</h2>
              <p>
                Unless otherwise stated, all content available on this Website, including but not limited to:
              </p>
              <ul className="legal-list">
                <li>Text, articles and descriptions.</li>
                <li>Logos, trademarks and brand identities.</li>
                <li>Graphics, images and illustrations.</li>
                <li>Website design and layouts.</li>
                <li>Original materials and digital content.</li>
              </ul>
              <p>
                is owned by or licensed to Naavic Edutech Private Limited and is protected under applicable intellectual property laws.
              </p>
              <p>
                No content may be copied, modified, republished, distributed or commercially used without prior written authorisation from the Company, except where permitted by applicable law.
              </p>
              <p>
                All third-party trademarks, product names and logos remain the property of their respective owners.
              </p>
            </article>

            {/* 6. Product and Service Information */}
            <article className="legal-block reveal-popup">
              <h2>6. Product and Service Information</h2>
              <p>
                The Company makes reasonable efforts to ensure that information about its products and services is accurate and current.
              </p>
              <p>However:</p>
              <ul className="legal-list">
                <li>Product features and functionality may change over time.</li>
                <li>Certain products or services may be under development or may not yet be available.</li>
                <li>Product availability may vary depending on launch schedules and operational requirements.</li>
                <li>Descriptions on this Website may not include every feature, condition or limitation.</li>
              </ul>
              <p>
                Detailed terms governing individual products, subscriptions, payments, competitions and other services may be published separately on their respective websites or applications.
              </p>
              <p>
                Where applicable, those product-specific terms will govern the relevant product or service.
              </p>
            </article>

            {/* 7. External Links and Third-Party Websites */}
            <article className="legal-block reveal-popup">
              <h2>7. External Links and Third-Party Websites</h2>
              <p>
                This Website may contain links to external websites, applications or services, including the Company&apos;s product websites.
              </p>
              <p>
                Such links are provided for convenience and informational purposes.
              </p>
              <p>
                Naavic Edutech does not necessarily own, control or operate third-party websites and is not responsible for their content, privacy practices, availability or terms of use.
              </p>
              <p>
                Users are advised to review the applicable terms and privacy policies before using external platforms.
              </p>
            </article>

            {/* 8. Privacy and Personal Information */}
            <article className="legal-block reveal-popup">
              <h2>8. Privacy and Personal Information</h2>
              <p>Your privacy is important to us.</p>
              <p>
                Any personal information collected through this Website will be handled in accordance with our Privacy Policy and applicable Indian data protection and privacy laws.
              </p>
              <p>
                Please refer to our Privacy Policy for details regarding the collection, use, storage, disclosure and protection of personal information.
              </p>
              <p className="legal-link-callout">
                <strong>Privacy Policy:</strong>{' '}
                <Link to="/privacy-policy">www.naavicedutech.com/privacy-policy</Link>
              </p>
            </article>

            {/* 9. Website Availability and Security */}
            <article className="legal-block reveal-popup">
              <h2>9. Website Availability and Security</h2>
              <p>
                We aim to maintain the availability and security of this Website. However, uninterrupted access cannot be guaranteed.
              </p>
              <p>
                The Website may occasionally be unavailable due to maintenance, upgrades, technical issues, network interruptions or circumstances beyond our reasonable control.
              </p>
              <p>
                We reserve the right to modify, suspend or discontinue any part of the Website without prior notice, subject to applicable law.
              </p>
            </article>

            {/* 10. Disclaimer of Warranties */}
            <article className="legal-block reveal-popup">
              <h2>10. Disclaimer of Warranties</h2>
              <p>
                The Website and its content are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis.
              </p>
              <p>
                To the extent permitted by applicable law, the Company makes no express or implied warranties regarding:
              </p>
              <ul className="legal-list">
                <li>The uninterrupted availability of the Website.</li>
                <li>The completeness or accuracy of all information.</li>
                <li>The absence of technical errors or security vulnerabilities.</li>
                <li>The suitability of Website content for a particular purpose.</li>
              </ul>
              <p>
                Nothing in these Terms excludes any warranty or consumer right that cannot lawfully be excluded under applicable law.
              </p>
            </article>

            {/* 11. Limitation of Liability */}
            <article className="legal-block reveal-popup">
              <h2>11. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, Naavic Edutech Private Limited shall not be liable for indirect, incidental, special or consequential losses arising from the use of, or inability to use, this corporate Website.
              </p>
              <p>
                This provision does not exclude or limit liability where such exclusion or limitation is prohibited by law, including liability arising from fraud, wilful misconduct or other non-excludable obligations.
              </p>
            </article>

            {/* 12. Indemnification */}
            <article className="legal-block reveal-popup">
              <h2>12. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Naavic Edutech Private Limited, its directors, employees and authorised representatives against claims, losses, liabilities and reasonable expenses arising from your unlawful use of the Website or your violation of these Terms, to the extent permitted by applicable law.
              </p>
            </article>

            {/* 13. Changes to These Terms */}
            <article className="legal-block reveal-popup">
              <h2>13. Changes to These Terms</h2>
              <p>
                The Company may update or modify these Terms and Conditions from time to time to reflect changes in its operations, products, legal requirements or website functionality.
              </p>
              <p>
                Updated versions will be published on this page with a revised &ldquo;Last Updated&rdquo; date.
              </p>
              <p>
                Your continued use of the Website after publication of changes constitutes acceptance of the revised Terms, to the extent permitted by applicable law.
              </p>
            </article>

            {/* 14. Governing Law and Jurisdiction */}
            <article className="legal-block reveal-popup">
              <h2>14. Governing Law and Jurisdiction</h2>
              <p>
                These Terms and Conditions shall be governed by and interpreted in accordance with the laws of India.
              </p>
              <p>
                Subject to applicable law, courts of competent jurisdiction in Namakkal, Tamil Nadu, India, shall have jurisdiction over disputes arising from or relating to these Terms and Conditions.
              </p>
            </article>

            {/* 15. Contact Information */}
            <article className="legal-block reveal-popup">
              <h2>15. Contact Information</h2>
              <p>
                For questions, clarifications or concerns regarding these Terms and Conditions, please contact:
              </p>
              <div className="legal-address-box">
                <strong>Naavic Edutech Private Limited</strong>
                <p>135/1A, KKP Street, AS Pet,</p>
                <p>Namakkal, Tamil Nadu – 637001, India.</p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:naavicedutech@gmail.com">naavicedutech@gmail.com</a>
                </p>
                <p>
                  <strong>Phone:</strong>{' '}
                  <a href="tel:+917305034604">+91 73050 34604</a>
                </p>
                <p>
                  <strong>Website:</strong>{' '}
                  <a href="https://www.naavicedutech.com" target="_blank" rel="noreferrer">
                    www.naavicedutech.com
                  </a>
                </p>
              </div>
            </article>

            <div className="legal-doc-footer">
              © Naavic Edutech Private Limited. All Rights Reserved.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TermsAndConditions;