import React, { useEffect, useRef, useState } from 'react';
import '../Styles/LegalPages.css';

function Disclaimer() {
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
          <h1 className="legal-title reveal-popup">DISCLAIMER</h1>
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
            {/* 1. General Information */}
            <article className="legal-block reveal-popup">
              <h2>1. General Information</h2>
              <p>
                The information provided on www.naavicedutech.com (&ldquo;Website&rdquo;) is published by Naavic Edutech Private Limited (&ldquo;Naavic Edutech&rdquo;, &ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo; or &ldquo;us&rdquo;) for general informational and corporate communication purposes.
              </p>
              <p>
                While we make reasonable efforts to ensure that the information available on this Website is accurate and up to date, we do not guarantee that all information is complete, accurate, current or free from errors.
              </p>
              <p>
                Visitors are advised to independently verify information before relying on it for any decision.
              </p>
            </article>

            {/* 2. Educational Information Disclaimer */}
            <article className="legal-block reveal-popup">
              <h2>2. Educational Information Disclaimer</h2>
              <p>
                Naavic Edutech develops educational technology platforms and learning initiatives, including Mathbook, AlphaMaster and Vaagai Study.
              </p>
              <p>
                Information about educational products, learning resources, examinations, assessments and competitive activities published on this Website is intended for general informational purposes.
              </p>
              <p>
                The Company does not guarantee any particular academic result, examination score, rank, admission, employment opportunity or career outcome through the use of its products or services.
              </p>
              <p>
                Individual learning outcomes may vary depending on several factors, including the learner&apos;s preparation, effort, understanding and performance.
              </p>
            </article>

            {/* 3. Product and Service Information */}
            <article className="legal-block reveal-popup">
              <h2>3. Product and Service Information</h2>
              <p>
                Descriptions of Mathbook, AlphaMaster, Vaagai Study and other Company initiatives may include information about current features, planned developments or upcoming services.
              </p>
              <p>
                Product features, availability, eligibility requirements, pricing, subscription options and service conditions may change from time to time.
              </p>
              <p>
                Certain products or features may be under development and may not yet be publicly available.
              </p>
              <p>
                The applicable product-specific terms and policies will govern the use of individual platforms and services.
              </p>
            </article>

            {/* 4. No Professional or Institutional Advice */}
            <article className="legal-block reveal-popup">
              <h2>4. No Professional or Institutional Advice</h2>
              <p>
                The information provided on this Website should not be considered a substitute for professional, legal, financial, educational or other specialised advice.
              </p>
              <p>
                Visitors should consult appropriate qualified professionals or relevant institutions before making decisions that require specialised guidance.
              </p>
            </article>

            {/* 5. External Links and Third-Party Content */}
            <article className="legal-block reveal-popup">
              <h2>5. External Links and Third-Party Content</h2>
              <p>
                This Website may contain links to external websites, third-party services or platforms operated by other organisations.
              </p>
              <p>
                Such links are provided for convenience and informational purposes.
              </p>
              <p>
                Naavic Edutech does not necessarily own, control or operate these external websites and does not guarantee the accuracy, reliability, security or availability of their content or services.
              </p>
              <p>
                Accessing external websites is at the visitor&apos;s own discretion and subject to the applicable third-party terms and privacy policies.
              </p>
            </article>

            {/* 6. Website Availability and Technical Limitations */}
            <article className="legal-block reveal-popup">
              <h2>6. Website Availability and Technical Limitations</h2>
              <p>
                We make reasonable efforts to maintain the accessibility and functionality of this Website.
              </p>
              <p>
                However, we do not guarantee uninterrupted or error-free access.
              </p>
              <p>
                The Website may occasionally experience interruptions due to maintenance, technical failures, internet connectivity issues, security incidents or circumstances beyond our reasonable control.
              </p>
              <p>
                We shall not be responsible for disruptions to the extent that liability is lawfully excluded under applicable law.
              </p>
            </article>

            {/* 7. Intellectual Property */}
            <article className="legal-block reveal-popup">
              <h2>7. Intellectual Property</h2>
              <p>
                Unless otherwise stated, the content, text, graphics, logos, designs, trademarks and other materials displayed on this Website are owned by or licensed to Naavic Edutech Private Limited.
              </p>
              <p>
                Unauthorised reproduction, distribution, modification or commercial use of such materials is prohibited, except as permitted under applicable law or with prior written permission from the Company.
              </p>
              <p>
                Third-party trademarks and brand names remain the property of their respective owners.
              </p>
            </article>

            {/* 8. Limitation of Liability */}
            <article className="legal-block reveal-popup">
              <h2>8. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, Naavic Edutech Private Limited shall not be liable for indirect, incidental, special or consequential losses arising from the use of, reliance upon or inability to access this Website or its content.
              </p>
              <p>
                Nothing in this Disclaimer shall exclude or limit any liability that cannot legally be excluded or limited under applicable law.
              </p>
            </article>

            {/* 9. Changes to This Disclaimer */}
            <article className="legal-block reveal-popup">
              <h2>9. Changes to This Disclaimer</h2>
              <p>
                Naavic Edutech reserves the right to modify or update this Disclaimer at any time to reflect changes in its business activities, Website content, products, services or applicable legal requirements.
              </p>
              <p>
                Any updated version will be published on this page with a revised &ldquo;Last Updated&rdquo; date.
              </p>
              <p>
                Visitors are encouraged to review this page periodically.
              </p>
            </article>

            {/* 10. Governing Law and Jurisdiction */}
            <article className="legal-block reveal-popup">
              <h2>10. Governing Law and Jurisdiction</h2>
              <p>
                This Disclaimer shall be governed by and interpreted in accordance with the laws of India.
              </p>
              <p>
                Subject to applicable law, courts of competent jurisdiction in Namakkal, Tamil Nadu, India, shall have jurisdiction over disputes arising from or relating to this Disclaimer.
              </p>
            </article>

            {/* 11. Contact Information */}
            <article className="legal-block reveal-popup">
              <h2>11. Contact Information</h2>
              <p>
                For questions or clarifications regarding this Disclaimer, please contact:
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

export default Disclaimer;