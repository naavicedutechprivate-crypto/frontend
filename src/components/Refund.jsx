import React, { useEffect, useRef, useState } from 'react';
import '../Styles/LegalPages.css';

function CancellationAndRefundPolicy() {
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
          <h1 className="legal-title reveal-popup">CANCELLATION AND REFUND POLICY</h1>
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
                This Cancellation and Refund Policy applies to the official corporate website of Naavic Edutech Private Limited (&ldquo;Naavic Edutech&rdquo;, &ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo; or &ldquo;us&rdquo;), accessible at www.naavicedutech.com.
              </p>
              <p>
                The purpose of this policy is to clarify the Company&apos;s position regarding payments, cancellations and refunds associated with the use of this corporate Website.
              </p>
            </article>

            {/* 2. No Payment Collection on the Corporate Website */}
            <article className="legal-block reveal-popup">
              <h2>2. No Payment Collection on the Corporate Website</h2>
              <p>
                The www.naavicedutech.com website is an informational and corporate website intended to provide details about the Company, its products, services, business activities and initiatives.
              </p>
              <p>
                Naavic Edutech does not collect payments, process subscription purchases or sell products or services directly through this corporate Website.
              </p>
              <p>
                Accordingly, no payment transactions or subscription purchases are currently facilitated through this Website.
              </p>
            </article>

            {/* 3. Cancellation Policy */}
            <article className="legal-block reveal-popup">
              <h2>3. Cancellation Policy</h2>
              <p>
                Since this corporate Website does not offer paid subscriptions, purchases or payment-based services, there are no payment orders or subscriptions on this Website that require cancellation.
              </p>
              <p>
                Visitors may discontinue browsing or using the Website at any time without any cancellation charges or obligations.
              </p>
              <p>
                Any separate enquiry, communication or business request submitted through the Website may be withdrawn by contacting the Company.
              </p>
            </article>

            {/* 4. Refund Policy */}
            <article className="legal-block reveal-popup">
              <h2>4. Refund Policy</h2>
              <p>
                As no payments are collected through www.naavicedutech.com, there are no refunds applicable to transactions on this corporate Website.
              </p>
              <p>
                If you have made a payment in connection with any of our individual products or services, the applicable cancellation and refund policy of that particular product or platform will govern the transaction.
              </p>
            </article>

            {/* 5. Separate Policies for Company Products */}
            <article className="legal-block reveal-popup">
              <h2>5. Separate Policies for Company Products</h2>
              <p>
                Naavic Edutech operates and develops different educational products and platforms, which may offer paid services, subscriptions or other commercial features. These include:
              </p>
              <ul className="legal-list">
                <li>
                  <strong>Mathbook:</strong>{' '}
                  <a href="https://www.mathbook.in" target="_blank" rel="noreferrer">
                    www.mathbook.in
                  </a>
                </li>
                <li>
                  <strong>AlphaMaster:</strong>{' '}
                  <a href="https://www.alphamaster.in" target="_blank" rel="noreferrer">
                    www.alphamaster.in
                  </a>
                </li>
                <li>
                  <strong>Vaagai Study:</strong>{' '}
                  <a href="https://www.vaagaistudy.com" target="_blank" rel="noreferrer">
                    www.vaagaistudy.com
                  </a>
                </li>
              </ul>
              <p>
                Any payment, subscription, cancellation or refund associated with these platforms will be governed by the respective platform&apos;s applicable terms and conditions and cancellation and refund policy.
              </p>
              <p>
                Users are advised to review the relevant policy before making a payment or purchasing a subscription.
              </p>
            </article>

            {/* 6. Payment-Related Enquiries */}
            <article className="legal-block reveal-popup">
              <h2>6. Payment-Related Enquiries</h2>
              <p>
                If you have a payment-related concern involving one of our products or platforms, please contact the relevant platform&apos;s support team.
              </p>
              <p>
                For general corporate enquiries regarding this policy, you may contact:
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

            {/* 7. Policy Updates */}
            <article className="legal-block reveal-popup">
              <h2>7. Policy Updates</h2>
              <p>
                Naavic Edutech reserves the right to revise or update this policy from time to time to reflect changes in its business operations, products or applicable legal requirements.
              </p>
              <p>
                Any revised version will be published on this page with the updated date.
              </p>
            </article>

            {/* 8. Governing Law */}
            <article className="legal-block reveal-popup">
              <h2>8. Governing Law</h2>
              <p>
                This policy shall be governed by and interpreted in accordance with the applicable laws of India.
              </p>
              <p>
                Subject to applicable law, courts of competent jurisdiction in Namakkal, Tamil Nadu, India, shall have jurisdiction over disputes arising in connection with this policy.
              </p>
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

export default CancellationAndRefundPolicy;