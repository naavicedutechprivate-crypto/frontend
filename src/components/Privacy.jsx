import React, { useEffect, useRef, useState } from 'react';
import '../Styles/LegalPages.css';

function PrivacyPolicy() {
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
          <h1 className="legal-title reveal-popup">PRIVACY POLICY</h1>
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
                Naavic Edutech Private Limited (&ldquo;Naavic Edutech&rdquo;, &ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo; or &ldquo;us&rdquo;) respects the privacy of individuals who visit our website, communicate with us or interact with our corporate services.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, store, disclose and protect personal information when you access or use our corporate website, www.naavicedutech.com (&ldquo;Website&rdquo;).
              </p>
              <p>
                By accessing or using this Website, you acknowledge that you have read this Privacy Policy.
              </p>
            </article>

            {/* 2. About the Company */}
            <article className="legal-block reveal-popup">
              <h2>2. About the Company</h2>
              <div className="legal-address-box">
                <strong>Naavic Edutech Private Limited</strong>
                <p>
                  <strong>Registered Office:</strong>
                </p>
                <p>135/1A, KKP Street,</p>
                <p>AS Pet, Namakkal,</p>
                <p>Tamil Nadu – 637001, India.</p>
              </div>
              <p>
                Naavic Edutech develops and operates education technology products and platforms, including:
              </p>
              <ul className="legal-list">
                <li>
                  <strong>Mathbook:</strong> A digital mathematics learning and assessment platform.
                </li>
                <li>
                  <strong>AlphaMaster:</strong> A mathematics championship and competitive learning initiative.
                </li>
                <li>
                  <strong>Vaagai Study:</strong> An examination preparation platform being developed to support learners preparing for competitive and higher-education examinations.
                </li>
              </ul>
              <p>
                Each product or platform may have its own privacy policy and additional terms governing the personal information collected through that service.
              </p>
            </article>

            {/* 3. Information We May Collect */}
            <article className="legal-block reveal-popup">
              <h2>3. Information We May Collect</h2>
              <p>
                Depending on how you interact with our Website, we may collect the following categories of information.
              </p>

              <h3>3.1 Personal Information</h3>
              <p>Information voluntarily provided by you, including:</p>
              <ul className="legal-list">
                <li>Full name.</li>
                <li>Email address.</li>
                <li>Mobile or telephone number.</li>
                <li>Organisation or company name.</li>
                <li>Designation or professional details.</li>
                <li>Information included in your enquiries, feedback or communications.</li>
              </ul>

              <h3>3.2 Career and Recruitment Information</h3>
              <p>
                If you apply for an employment opportunity or submit a career enquiry, we may collect:
              </p>
              <ul className="legal-list">
                <li>Educational qualifications.</li>
                <li>Employment history.</li>
                <li>Resume or curriculum vitae.</li>
                <li>Skills and professional experience.</li>
                <li>Contact information and other details voluntarily provided in your application.</li>
              </ul>

              <h3>3.3 Technical and Usage Information</h3>
              <p>
                When you visit our Website, certain technical information may be collected automatically, including:
              </p>
              <ul className="legal-list">
                <li>IP address.</li>
                <li>Browser type and version.</li>
                <li>Device and operating system information.</li>
                <li>Pages visited and time spent on the Website.</li>
                <li>Date and time of access.</li>
                <li>Referral website or source.</li>
                <li>Website interaction and diagnostic information.</li>
              </ul>

              <h3>3.4 Cookies and Similar Technologies</h3>
              <p>
                Our Website may use cookies or similar technologies to improve functionality, understand website usage, maintain security and enhance user experience.
              </p>
              <p>
                You may manage or disable cookies through your browser settings. Certain Website features may not function properly if essential cookies are disabled.
              </p>
              <p>
                Where required by applicable law, we will obtain appropriate consent before using non-essential cookies or similar tracking technologies.
              </p>
            </article>

            {/* 4. How We Use Your Information */}
            <article className="legal-block reveal-popup">
              <h2>4. How We Use Your Information</h2>
              <p>
                We may use the information collected for the following purposes:
              </p>
              <ul className="legal-list">
                <li>To operate, maintain and improve our corporate Website.</li>
                <li>To respond to enquiries, requests and feedback.</li>
                <li>To communicate company announcements and relevant updates.</li>
                <li>To evaluate career applications and recruitment enquiries.</li>
                <li>To explore business partnerships and professional collaborations.</li>
                <li>To maintain Website security and prevent misuse.</li>
                <li>To analyse Website performance and improve user experience.</li>
                <li>To comply with applicable legal and regulatory obligations.</li>
                <li>To protect the rights, property and legitimate interests of the Company.</li>
              </ul>
              <p>
                We will use personal information only for appropriate and lawful purposes.
              </p>
            </article>

            {/* 5. Consent and Lawful Processing */}
            <article className="legal-block reveal-popup">
              <h2>5. Consent and Lawful Processing</h2>
              <p>
                We aim to collect and process personal information in a fair, transparent and lawful manner.
              </p>
              <p>
                Where consent is required under applicable law, we will seek consent through an appropriate method and explain the purpose for which the information is collected.
              </p>
              <p>
                Where applicable, individuals may withdraw their consent by contacting us. Withdrawal of consent will not affect processing already lawfully carried out before the withdrawal.
              </p>
              <p>
                We may retain or process certain information where required or permitted by applicable law.
              </p>
            </article>

            {/* 6. Sharing and Disclosure of Information */}
            <article className="legal-block reveal-popup">
              <h2>6. Sharing and Disclosure of Information</h2>
              <p>We do not sell personal information to third parties.</p>
              <p>
                However, we may share information in limited circumstances, including:
              </p>

              <h3>6.1 Service Providers</h3>
              <p>We may engage trusted third-party service providers for:</p>
              <ul className="legal-list">
                <li>Website hosting and maintenance.</li>
                <li>Website analytics.</li>
                <li>Communication and email services.</li>
                <li>Cybersecurity and technical support.</li>
                <li>Other services necessary for operating our Website.</li>
              </ul>
              <p>
                Such providers may access information only to the extent necessary to perform their assigned services, subject to appropriate contractual and security safeguards.
              </p>

              <h3>6.2 Legal and Regulatory Requirements</h3>
              <p>
                We may disclose information when required by law, court order, regulatory authority or lawful government request.
              </p>

              <h3>6.3 Business Transactions</h3>
              <p>
                In connection with a merger, acquisition, restructuring, transfer or sale of business assets, relevant information may be transferred subject to applicable legal requirements and appropriate safeguards.
              </p>
            </article>

            {/* 7. Links to Our Products and External Websites */}
            <article className="legal-block reveal-popup">
              <h2>7. Links to Our Products and External Websites</h2>
              <p>
                Our corporate Website may contain links to our products and other external websites, including:
              </p>
              <ul className="legal-list">
                <li>
                  <a href="https://www.mathbook.in" target="_blank" rel="noreferrer">
                    www.mathbook.in
                  </a>
                </li>
                <li>
                  <a href="https://www.alphamaster.in" target="_blank" rel="noreferrer">
                    www.alphamaster.in
                  </a>
                </li>
                <li>
                  <a href="https://www.vaagaistudy.com" target="_blank" rel="noreferrer">
                    www.vaagaistudy.com
                  </a>
                </li>
              </ul>
              <p>
                When you visit or use these platforms, your information may be collected and processed under the privacy policies applicable to those platforms.
              </p>
              <p>
                This Privacy Policy applies specifically to the corporate Website, www.naavicedutech.com, unless expressly stated otherwise.
              </p>
              <p>
                We are not responsible for the privacy practices of independent third-party websites. Users should review their respective privacy policies before sharing personal information.
              </p>
            </article>

            {/* 8. Children's Privacy */}
            <article className="legal-block reveal-popup">
              <h2>8. Children&apos;s Privacy</h2>
              <p>
                Our educational products and services may be used by students and younger learners.
              </p>
              <p>
                However, this corporate Website is not intended to collect children&apos;s personal information unnecessarily.
              </p>
              <p>
                Where personal information relating to a child is processed through our Website or associated services, we will implement appropriate safeguards and obtain verifiable parental or lawful guardian consent wherever required by applicable law.
              </p>
              <p>
                We do not knowingly use this corporate Website to solicit personal information directly from children for unrelated commercial purposes.
              </p>
              <p>
                Parents or lawful guardians who believe that a child has provided personal information to us may contact us to request appropriate action.
              </p>
            </article>

            {/* 9. Data Storage and Retention */}
            <article className="legal-block reveal-popup">
              <h2>9. Data Storage and Retention</h2>
              <p>
                We retain personal information only for as long as reasonably necessary to fulfil the purposes for which it was collected, comply with applicable legal obligations, resolve disputes and protect our legitimate business interests.
              </p>
              <p>Retention periods may vary depending on:</p>
              <ul className="legal-list">
                <li>The nature and purpose of the information.</li>
                <li>The nature of the communication or enquiry.</li>
                <li>Applicable statutory and regulatory requirements.</li>
                <li>The need to maintain business or legal records.</li>
              </ul>
              <p>
                When information is no longer required, we will take appropriate steps to delete or anonymise it, subject to applicable law.
              </p>
            </article>

            {/* 10. Data Security */}
            <article className="legal-block reveal-popup">
              <h2>10. Data Security</h2>
              <p>
                We take reasonable technical and organisational measures to protect personal information against unauthorised access, disclosure, alteration, loss or misuse.
              </p>
              <p>
                Depending on the nature of the information and the risks involved, these measures may include:
              </p>
              <ul className="legal-list">
                <li>Access restrictions and authorisation controls.</li>
                <li>Secure hosting and data transmission practices.</li>
                <li>System monitoring and security assessments.</li>
                <li>Appropriate internal procedures.</li>
                <li>Engagement of service providers with relevant security safeguards.</li>
              </ul>
              <p>
                Although we strive to protect information, no internet-based system or electronic storage method can be guaranteed to be completely secure.
              </p>
            </article>

            {/* 11. Your Privacy Rights */}
            <article className="legal-block reveal-popup">
              <h2>11. Your Privacy Rights</h2>
              <p>Subject to applicable law, you may have the right to:</p>
              <ul className="legal-list">
                <li>Request information about personal data processed by us.</li>
                <li>Request correction or updating of inaccurate information.</li>
                <li>Request erasure of personal information where legally permissible.</li>
                <li>Withdraw consent where processing is based on consent.</li>
                <li>Raise concerns or submit a privacy-related grievance.</li>
                <li>Nominate another individual where such a right is available under applicable law.</li>
              </ul>
              <p>
                To exercise any applicable privacy rights, please contact us using the details provided in Section 15.
              </p>
              <p>
                We may need to verify your identity before processing a request.
              </p>
            </article>

            {/* 12. Third-Party Services and Analytics */}
            <article className="legal-block reveal-popup">
              <h2>12. Third-Party Services and Analytics</h2>
              <p>
                We may use third-party technologies or analytics services to understand Website performance, identify technical issues and improve user experience.
              </p>
              <p>
                These services may collect certain technical or usage information in accordance with their own privacy policies and applicable law.
              </p>
              <p>
                We encourage users to review the privacy policies of relevant third-party service providers.
              </p>
            </article>

            {/* 13. International Data Transfers */}
            <article className="legal-block reveal-popup">
              <h2>13. International Data Transfers</h2>
              <p>
                Where our service providers or technical infrastructure involve processing or storing personal information outside India, such processing and transfers will be undertaken subject to applicable Indian laws and any relevant restrictions or requirements notified by the Government of India.
              </p>
            </article>

            {/* 14. Changes to This Privacy Policy */}
            <article className="legal-block reveal-popup">
              <h2>14. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy periodically to reflect changes in our business operations, Website functionality, technology or applicable legal requirements.
              </p>
              <p>
                Any revised version will be published on this page with an updated &ldquo;Last Updated&rdquo; date.
              </p>
              <p>
                We encourage visitors to review this page periodically.
              </p>
            </article>

            {/* 15. Contact and Privacy Grievances */}
            <article className="legal-block reveal-popup">
              <h2>15. Contact and Privacy Grievances</h2>
              <p>
                For questions, privacy-related requests, complaints or concerns regarding this Privacy Policy, please contact:
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
                <p style={{ marginTop: '10px' }}>
                  <strong>Privacy Grievance Contact:</strong> Mr. K Ragu - CEO
                </p>
              </div>
              <p>
                We will review and respond to privacy-related requests within the time limits prescribed by applicable law.
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

export default PrivacyPolicy;