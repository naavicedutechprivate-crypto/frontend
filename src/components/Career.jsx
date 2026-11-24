import React, { useState, useEffect, useRef } from 'react';
import '../Styles/Career.css';import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../Styles/Career.css';
import mathbook from '../assets/mathbook.png';
import alphamaster from '../assets/alphamaster.jpeg';
import vaagai from '../assets/vaagai.jpeg';

const RAW_API_URL =
  import.meta.env.VITE_API_URL || 'https://backend-v1ip.onrender.com';
const API_BASE_URL = String(RAW_API_URL).replace(/\/+$/, '');
const LOCAL_GALLERY_KEY = 'naavic_career_gallery';
const LOCAL_JOBS_KEY = 'naavic_career_jobs';

const INITIAL_PORTALS = [
  {
    id: 'naavic-ho',
    name: 'Naavic Edutech Head Office',
    tagline: 'Corporate Strategy, Operations, Brand & Ecosystem Growth',
    websiteLabel: 'www.naavicedutech.com',
    websiteUrl: 'https://www.naavicedutech.com',
    description:
      'Drive company-wide operations, partnerships, academic quality, digital outreach, and cross-platform growth from Namakkal and remote teams.',
    defaultJobs: [
      {
        id: 'ho-1',
        title: 'Academic & Curriculum Coordinator',
        type: 'Full-Time',
        location: 'Namakkal (On-Site)',
      },
      {
        id: 'ho-2',
        title: 'Digital Marketing & Growth Executive',
        type: 'Full-Time',
        location: 'Remote / Hybrid',
      },
      {
        id: 'ho-3',
        title: 'Institutional Partnerships Associate',
        type: 'Full-Time / Part-Time',
        location: 'Namakkal / Hybrid',
      },
    ],
  },
  {
    id: 'mathbook',
    name: 'Mathbook',
    tagline: 'Making Mathematics Engaging, Interactive and Rewarding',
    websiteLabel: 'www.mathbook.in',
    websiteUrl: 'https://www.mathbook.in',
    description:
      'Join the team building interactive mathematics learning levels, daily quizzes, practice challenges, and student engagement experiences.',
    defaultJobs: [
      {
        id: 'mb-1',
        title: 'Mathematics Content & Problem Designer',
        type: 'Full-Time / Part-Time',
        location: 'Remote / Hybrid',
      },
      {
        id: 'mb-2',
        title: 'Student Engagement & Quiz Operations Lead',
        type: 'Full-Time',
        location: 'Namakkal (On-Site)',
      },
      {
        id: 'mb-3',
        title: 'Frontend / App UI Contributor (React)',
        type: 'Internship / Part-Time',
        location: 'Remote',
      },
    ],
  },
  {
    id: 'alphamaster',
    name: 'AlphaMaster',
    tagline: 'The Mathbook Grand Championship',
    websiteLabel: 'www.alphamaster.in',
    websiteUrl: 'https://www.alphamaster.in',
    description:
      'Help plan, coordinate, and scale structured multi-round mathematics championship assessments, participant support, and event operations.',
    defaultJobs: [
      {
        id: 'am-1',
        title: 'Championship Operations & Assessment Coordinator',
        type: 'Full-Time',
        location: 'Hybrid',
      },
      {
        id: 'am-2',
        title: 'Question Paper & Evaluation Reviewer (Maths)',
        type: 'Part-Time / Contract',
        location: 'Remote',
      },
      {
        id: 'am-3',
        title: 'School & Student Outreach Coordinator',
        type: 'Full-Time',
        location: 'Namakkal / Tamil Nadu',
      },
    ],
  },
  {
    id: 'vaagai-study',
    name: 'Vaagai Study',
    tagline: 'Your Preparation. Your Progress. Your Success.',
    websiteLabel: 'www.vaagaistudy.com',
    websiteUrl: 'https://www.vaagaistudy.com',
    description:
      'Support competitive examination aspirants (starting with TNPSC and expanding into broader exams) with structured study notes, test series, and analytics.',
    defaultJobs: [
      {
        id: 'vs-1',
        title: 'TNPSC / Competitive Exam Subject Mentor',
        type: 'Full-Time / Part-Time',
        location: 'Remote / Hybrid',
      },
      {
        id: 'vs-2',
        title: 'Test Series & Syllabus Content Specialist',
        type: 'Full-Time',
        location: 'Remote',
      },
      {
        id: 'vs-3',
        title: 'Learner Support & Progress Mentor',
        type: 'Full-Time',
        location: 'Namakkal / Remote',
      },
    ],
  },
];

const DEFAULT_GALLERY = [
  {
    id: 'gal-ho',
    title: 'Naavic Edutech Ecosystem',
    caption: 'Unified mission across corporate operations and digital learning.',
    image: logo,
  },
  {
    id: 'gal-mathbook',
    title: 'Mathbook Learning Platform',
    caption: 'Interactive mathematics practice, levels, and daily quizzes.',
    image: mathbook,
  },
  {
    id: 'gal-alphamaster',
    title: 'AlphaMaster Championship',
    caption: 'Structured competitive mathematics rounds and learner recognition.',
    image: alphamaster,
  },
  {
    id: 'gal-vaagai',
    title: 'Vaagai Study Preparation',
    caption: 'Exam-focused study resources, practice tests, and progress insights.',
    image: vaagai,
  },
];

const readLocalJobs = () => {
  try {
    const raw = localStorage.getItem(LOCAL_JOBS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeLocalJobs = (items) => {
  try {
    localStorage.setItem(LOCAL_JOBS_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage quota errors
  }
};

function Career() {
  const pageRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedPortalId, setSelectedPortalId] = useState('all');
  const [backendJobs, setBackendJobs] = useState(() => readLocalJobs());
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [customGallery, setCustomGallery] = useState([]);

  // Application Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [applyContext, setApplyContext] = useState({
    portalId: '',
    portalName: '',
    jobTitle: '',
  });
  const [applicant, setApplicant] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolioOrNote: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const loadCustomGallery = useCallback(() => {
    try {
      const saved = localStorage.getItem(LOCAL_GALLERY_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCustomGallery(parsed);
        }
      }
    } catch {
      setCustomGallery([]);
    }
  }, []);

  const fetchBackendJobs = useCallback(async () => {
    setLoadingJobs(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const res = await fetch(`${API_BASE_URL}/api/jobs`, {
        signal: controller.signal,
      });
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data)) {
        setBackendJobs(data);
        writeLocalJobs(data);
      }
    } catch {
      const cached = readLocalJobs();
      if (cached.length > 0) {
        setBackendJobs(cached);
      }
    } finally {
      clearTimeout(timeoutId);
      setLoadingJobs(false);
    }
  }, []);

  useEffect(() => {
    fetchBackendJobs();
    loadCustomGallery();
  }, [fetchBackendJobs, loadCustomGallery]);

  // Scroll Progress Bar
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

  // Scroll Reveal Animations
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
  }, [selectedPortalId, backendJobs.length, customGallery.length]);

  // Close modal with Escape key
  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeApplyModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalOpen]);

  const portalsWithJobs = INITIAL_PORTALS.map((portal) => {
    const addedForPortal = backendJobs
      .filter((job) => job.portalId === portal.id)
      .map((job) => ({
        id: job._id || job.id,
        title: job.title,
        type: job.type || 'Full-Time',
        location: job.location || 'Remote / Hybrid',
      }));

    return {
      ...portal,
      jobs: [...addedForPortal, ...portal.defaultJobs],
    };
  });

  const visiblePortals =
    selectedPortalId === 'all'
      ? portalsWithJobs
      : portalsWithJobs.filter((p) => p.id === selectedPortalId);

  const galleryItems = [...customGallery, ...DEFAULT_GALLERY];

  const openApplyModal = (portal, jobTitle = 'General Application') => {
    setApplyContext({
      portalId: portal.id,
      portalName: portal.name,
      jobTitle,
    });
    setApplicant({
      fullName: '',
      email: '',
      phone: '',
      portfolioOrNote: '',
    });
    setSubmitError('');
    setSubmitSuccess('');
    setModalOpen(true);
  };

  const closeApplyModal = () => {
    setModalOpen(false);
    setSubmitError('');
    setSubmitSuccess('');
  };

  const handleApplicantChange = (e) => {
    const { name, value } = e.target;
    setApplicant((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError('');
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      portalId: applyContext.portalId,
      portalName: applyContext.portalName,
      jobTitle: applyContext.jobTitle,
      fullName: applicant.fullName.trim(),
      email: applicant.email.trim(),
      phone: applicant.phone.trim(),
      portfolioOrNote: applicant.portfolioOrNote.trim(),
    };

    if (!payload.fullName || !payload.email || !payload.phone) {
      setSubmitError('Please fill in your full name, email address, and phone number.');
      return;
    }

    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess('');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch(`${API_BASE_URL}/api/careers/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error || 'Could not submit application. Please try again.'
        );
      }

      setSubmitSuccess(
        `Application submitted for ${applyContext.jobTitle} (${applyContext.portalName}). Our team will review and reach out soon.`
      );
      setApplicant({
        fullName: '',
        email: '',
        phone: '',
        portfolioOrNote: '',
      });
    } catch (err) {
      const isNetworkOrTimeout =
        err.name === 'AbortError' || err.message === 'Failed to fetch';
      setSubmitError(
        isNetworkOrTimeout
          ? 'Server is waking up or unreachable right now. Please wait a few seconds and try again.'
          : err.message || 'Unable to submit application right now.'
      );
    } finally {
      clearTimeout(timeoutId);
      setSubmitting(false);
    }
  };

  return (
    <div className="career-page" ref={pageRef}>
      {/* Top Scroll Progress Bar */}
      <div className="career-scroll-track" aria-hidden="true">
        <div
          className="career-scroll-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="career-hero">
        <div className="career-glow career-glow-left" aria-hidden="true" />
        <div className="career-glow career-glow-right" aria-hidden="true" />

        <div className="career-container career-hero-grid">
          <div className="career-hero-copy">
            <span className="career-eyebrow reveal-popup">
              CAREERS AT NAAVIC EDUTECH PRIVATE LIMITED
            </span>
            <h1 className="career-title reveal-popup delay-1">
              Build Meaningful Learning Experiences With Us
            </h1>
            <p className="career-subtitle reveal-popup delay-1">
              Explore opportunities across{' '}
              <strong>Naavic Edutech Head Office</strong>,{' '}
              <strong>Mathbook</strong>, <strong>AlphaMaster</strong>, and{' '}
              <strong>Vaagai Study</strong>. Select a portal below to view openings
              and apply directly.
            </p>
            <div className="career-hero-actions reveal-popup delay-2">
              <a href="#portal-careers" className="career-btn-primary btn-shimmer">
                Explore 4 Career Portals
              </a>
              <Link to="/contact" className="career-btn-secondary">
                Contact Our Team
              </Link>
            </div>
          </div>

          <div className="career-hero-card reveal-popup delay-2">
            <img
              src={logo}
              alt="Naavic Edutech Private Limited Logo"
              className="career-hero-logo"
            />
            <p className="career-hero-card-title">
              Naavic Edutech Private Limited
            </p>
            <p className="career-hero-card-sub">
              4 Dedicated Portals • 1 Unified Mission
            </p>
          </div>
        </div>
      </section>

      {/* 4 Portals Selector & Job Listings */}
      <section id="portal-careers" className="career-portals-section">
        <div className="career-container">
          <div className="section-head-center">
            <h2 className="career-section-heading reveal-popup">
              Career Portals &amp; Open Roles
            </h2>
            <p className="career-section-sub reveal-popup delay-1">
              {loadingJobs
                ? 'Syncing latest openings from server...'
                : 'Choose a specific platform or view all four portals together.'}
            </p>
          </div>

          {/* Portal Filter Tabs */}
          <div
            className="portal-filter-bar reveal-popup delay-1"
            role="tablist"
            aria-label="Career Portals"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedPortalId === 'all'}
              className={`portal-tab-btn ${
                selectedPortalId === 'all' ? 'active' : ''
              }`}
              onClick={() => setSelectedPortalId('all')}
            >
              All 4 Portals ({portalsWithJobs.length})
            </button>

            {portalsWithJobs.map((portal) => (
              <button
                key={portal.id}
                type="button"
                role="tab"
                aria-selected={selectedPortalId === portal.id}
                className={`portal-tab-btn ${
                  selectedPortalId === portal.id ? 'active' : ''
                }`}
                onClick={() => setSelectedPortalId(portal.id)}
              >
                {portal.name}
              </button>
            ))}
          </div>

          {/* Portal Cards Grid */}
          <div className="career-portals-grid">
            {visiblePortals.map((portal, idx) => (
              <article
                key={portal.id}
                className={`career-portal-card reveal-popup ${
                  idx % 2 === 1 ? 'delay-1' : ''
                }`}
              >
                <div className="portal-card-top">
                  <div>
                    <span className="portal-badge">
                      PORTAL 0{INITIAL_PORTALS.findIndex((p) => p.id === portal.id) + 1}
                    </span>
                    <h3 className="portal-card-name">{portal.name}</h3>
                    <p className="portal-card-tagline">{portal.tagline}</p>
                  </div>
                  <a
                    href={portal.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="portal-ext-link"
                  >
                    {portal.websiteLabel} ↗
                  </a>
                </div>

                <p className="portal-card-desc">{portal.description}</p>

                <div className="portal-jobs-list">
                  {portal.jobs.map((job) => (
                    <div key={job.id} className="job-row-item">
                      <div className="job-row-info">
                        <h4 className="job-row-title">{job.title}</h4>
                        <div className="job-row-meta">
                          <span>{job.type}</span>
                          <span>•</span>
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="job-apply-btn"
                        onClick={() => openApplyModal(portal, job.title)}
                      >
                        Apply Now
                      </button>
                    </div>
                  ))}
                </div>

                <div className="portal-card-footer">
                  <button
                    type="button"
                    className="portal-general-apply-btn"
                    onClick={() =>
                      openApplyModal(
                        portal,
                        `Open / General Role — ${portal.name}`
                      )
                    }
                  >
                    Apply for {portal.name}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Career Gallery Section */}
      <section className="career-gallery-section">
        <div className="career-container">
          <div className="section-head-center">
            <h2 className="career-section-heading reveal-popup">
              Life &amp; Ecosystem Gallery
            </h2>
            <p className="career-section-sub reveal-popup delay-1">
              Highlights across Naavic Edutech Private Limited and our learning initiatives.
            </p>
          </div>

          <div className="career-gallery-grid">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className={`career-gallery-card reveal-popup ${
                  index % 2 === 1 ? 'delay-1' : ''
                }`}
              >
                <div className="career-gallery-img-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="career-gallery-img"
                  />
                </div>
                <div className="career-gallery-body">
                  <h3>{item.title}</h3>
                  <p>{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      {modalOpen && (
        <div
          className="career-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="career-modal-title"
          onClick={closeApplyModal}
        >
          <div
            className="career-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="career-modal-close"
              onClick={closeApplyModal}
              aria-label="Close application form"
            >
              ×
            </button>

            <span className="career-modal-pill">{applyContext.portalName}</span>
            <h3 id="career-modal-title" className="career-modal-heading">
              {applyContext.jobTitle}
            </h3>
            <p className="career-modal-sub">
              Submit your details below to apply with Naavic Edutech Private Limited.
            </p>

            {submitSuccess && (
              <div className="career-alert success" role="status">
                {submitSuccess}
              </div>
            )}

            {submitError && (
              <div className="career-alert error" role="alert">
                {submitError}
              </div>
            )}

            <form onSubmit={handleApplicationSubmit} className="career-apply-form">
              <div className="career-form-group">
                <label htmlFor="app-fullname">Full Name</label>
                <input
                  id="app-fullname"
                  name="fullName"
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={applicant.fullName}
                  onChange={handleApplicantChange}
                  disabled={submitting}
                />
              </div>

              <div className="career-form-group">
                <label htmlFor="app-email">Email Address</label>
                <input
                  id="app-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={applicant.email}
                  onChange={handleApplicantChange}
                  disabled={submitting}
                />
              </div>

              <div className="career-form-group">
                <label htmlFor="app-phone">Phone Number</label>
                <input
                  id="app-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91"
                  value={applicant.phone}
                  onChange={handleApplicantChange}
                  disabled={submitting}
                />
              </div>

              <div className="career-form-group">
                <label htmlFor="app-note">
                  Portfolio / LinkedIn / Experience Note
                </label>
                <textarea
                  id="app-note"
                  name="portfolioOrNote"
                  rows="3"
                  placeholder="Share relevant experience, subjects, links, or availability"
                  value={applicant.portfolioOrNote}
                  onChange={handleApplicantChange}
                  disabled={submitting}
                />
              </div>

              <button
                type="submit"
                className="career-btn-primary full-width btn-shimmer"
                disabled={submitting}
              >
                {submitting ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Career;
import logo from '../assets/logo.png';
import mathbook from '../assets/mathbook.png';
import alphamaster from '../assets/alphamaster.jpeg';
import vaagai from '../assets/vaagai.jpeg';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://backend-v1ip.onrender.com';
const LOCAL_GALLERY_KEY = 'naavic_career_gallery';
const LOCAL_JOBS_KEY = 'naavic_career_jobs';

const basePortals = [
  {
    id: 'naavic-ho',
    portalName: 'Naavic Edutech Head Office',
    subtitle: 'Corporate & Operations Roles',
    jobs: [],
  },
  {
    id: 'mathbook',
    portalName: 'Mathbook',
    subtitle: 'Mathematics Learning Platform',
    jobs: [],
  },
  {
    id: 'alphamaster',
    portalName: 'AlphaMaster',
    subtitle: 'Mathbook Grand Championship',
    jobs: [],
  },
  {
    id: 'vaagai-study',
    portalName: 'Vaagai Study',
    subtitle: 'Competitive Exam Preparation',
    jobs: [],
  },
];

const defaultGalleryItems = [
  {
    id: 'gal-1',
    title: 'Naavic Edutech Culture',
    caption: 'Collaborative learning and innovation across our growing team.',
    image: logo,
  },
  {
    id: 'gal-2',
    title: 'Mathbook Learning Hub',
    caption: 'Interactive mathematics practice and daily challenges.',
    image: mathbook,
  },
  {
    id: 'gal-3',
    title: 'AlphaMaster Championship',
    caption: 'Recognizing consistency, problem-solving, and excellence.',
    image: alphamaster,
  },
  {
    id: 'gal-4',
    title: 'Vaagai Study Ecosystem',
    caption: 'Structured test preparation and performance insights.',
    image: vaagai,
  },
];

function Career() {
  const pageRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [portals, setPortals] = useState(basePortals);
  const [galleryItems, setGalleryItems] = useState(defaultGalleryItems);

  const [selectedJob, setSelectedJob] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activePhoto, setActivePhoto] = useState(null);

  const [applicant, setApplicant] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolioOrNote: '',
  });

  // Load Jobs & Custom Gallery created in AdminPortal
  useEffect(() => {
    const mergeJobsIntoPortals = (jobList) => {
      setPortals(
        basePortals.map((portal) => {
          const dynamicJobs = jobList
            .filter((j) => j.portalId === portal.id)
            .map((j) => ({
              id: j._id || j.id,
              title: j.title,
              type: j.type || 'Full-Time',
              location: j.location || 'Remote / Hybrid',
            }));
          return {
            ...portal,
            jobs: [...portal.jobs, ...dynamicJobs],
          };
        })
      );
    };

    const loadDynamicContent = async () => {
      try {
        const customGallery = JSON.parse(
          localStorage.getItem(LOCAL_GALLERY_KEY) || '[]'
        );
        if (Array.isArray(customGallery) && customGallery.length > 0) {
          setGalleryItems([...customGallery, ...defaultGalleryItems]);
        }
      } catch {
        // Ignore storage read issues
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/jobs`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            mergeJobsIntoPortals(data);
            return;
          }
        }
      } catch {
        // Fallback to local jobs if server is offline
      }

      try {
        const localJobs = JSON.parse(localStorage.getItem(LOCAL_JOBS_KEY) || '[]');
        if (Array.isArray(localJobs) && localJobs.length > 0) {
          mergeJobsIntoPortals(localJobs);
        }
      } catch {
        // Ignore storage read issues
      }
    };

    loadDynamicContent();
  }, []);

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
  }, [galleryItems]);

  const openApplyModal = (portalName, job) => {
    setSelectedJob({ portalName, ...job });
    setSubmitted(false);
    setError('');
  };

  const closeApplyModal = () => {
    if (loading) return;
    setSelectedJob(null);
    setSubmitted(false);
    setSubmittedName('');
    setError('');
    setApplicant({
      fullName: '',
      email: '',
      phone: '',
      portfolioOrNote: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicant((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!selectedJob) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/careers/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          portalName: selectedJob.portalName,
          jobTitle: selectedJob.title,
          fullName: applicant.fullName,
          email: applicant.email,
          phone: applicant.phone,
          portfolioOrNote: applicant.portfolioOrNote,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application. Please try again.');
      }

      setSubmittedName(applicant.fullName);
      setSubmitted(true);
      setApplicant({
        fullName: '',
        email: '',
        phone: '',
        portfolioOrNote: '',
      });
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Unable to connect to the server. Please verify the backend is running.'
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="career-page" ref={pageRef}>
      {/* Top Scroll Progress Bar */}
      <div className="career-scroll-track" aria-hidden="true">
        <div
          className="career-scroll-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Header */}
      <section className="career-hero">
        <div className="career-glow career-glow-left" aria-hidden="true" />
        <div className="career-glow career-glow-right" aria-hidden="true" />

        <div className="career-container">
          <h1 className="career-title reveal-popup">Career Opportunities</h1>
          <p className="career-subtitle reveal-popup delay-1">
            Explore our current job openings and join our team!
          </p>
        </div>
      </section>

      {/* 4 Horizontal Portal Sections */}
      <section className="career-portals-section">
        <div className="career-container-wide">
          <div className="four-column-grid">
            {portals.map((portal, index) => (
              <div
                key={portal.id}
                className={`portal-column reveal-popup delay-${Math.min(index, 3)}`}
              >
                <div className="portal-column-header">
                  <h2>{portal.portalName}</h2>
                  <p>{portal.subtitle}</p>
                </div>

                <div className="job-listings">
                  {portal.jobs.length > 0 ? (
                    portal.jobs.map((job) => (
                      <article key={job.id} className="job-card">
                        <div className="job-meta">
                          <span>{job.type}</span>
                          <span>{job.location}</span>
                        </div>
                        <h3 className="job-title">{job.title}</h3>
                        <button
                          type="button"
                          className="apply-now-btn btn-shimmer"
                          onClick={() => openApplyModal(portal.portalName, job)}
                        >
                          Apply Now
                        </button>
                      </article>
                    ))
                  ) : (
                    <div className="no-openings-box">
                      <p>New openings for {portal.portalName} will be updated here soon.</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Gallery Section */}
      <section className="career-gallery-section">
        <div className="career-container-wide">
          <div className="gallery-header-box">
            <h2 className="gallery-heading reveal-popup">Life &amp; Work Gallery</h2>
            <p className="gallery-subtext reveal-popup delay-1">
              Moments, milestones, and platforms shaping our learning ecosystem.
            </p>
          </div>

          <div className="career-gallery-grid">
            {galleryItems.map((item, idx) => (
              <figure
                key={item.id}
                className={`gallery-card reveal-popup delay-${Math.min(idx, 3)}`}
                onClick={() => setActivePhoto(item)}
              >
                <div className="gallery-img-frame">
                  <img src={item.image} alt={item.title} className="gallery-img" />
                </div>
                <figcaption className="gallery-caption-box">
                  <h3>{item.title}</h3>
                  <p>{item.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Now Modal */}
      {selectedJob && (
        <div
          className="apply-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-modal-title"
          onClick={closeApplyModal}
        >
          <div
            className="apply-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-btn"
              aria-label="Close application form"
              onClick={closeApplyModal}
              disabled={loading}
            >
              ×
            </button>

            <p className="modal-portal-tag">{selectedJob.portalName}</p>
            <h2 id="apply-modal-title" className="modal-job-title">
              {selectedJob.title}
            </h2>
            <p className="modal-subtext">
              Submit your details below to apply for this role at Naavic Edutech Private Limited.
            </p>

            {error && (
              <div className="form-error-banner" role="alert">
                {error}
              </div>
            )}

            {submitted ? (
              <div className="modal-success-box" role="status">
                <h3>Application Submitted</h3>
                <p>
                  Thank you, <strong>{submittedName || 'Applicant'}</strong>. Your application for{' '}
                  <strong>{selectedJob.title}</strong> ({selectedJob.portalName}) has been recorded.
                </p>
                <button
                  type="button"
                  className="apply-now-btn"
                  onClick={closeApplyModal}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="apply-form">
                <div className="form-field">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    disabled={loading}
                    placeholder="Enter your full name"
                    value={applicant.fullName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={loading}
                    placeholder="Enter your email address"
                    value={applicant.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    disabled={loading}
                    placeholder="+91"
                    value={applicant.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="portfolioOrNote">Experience / Resume Link or Note</label>
                  <textarea
                    id="portfolioOrNote"
                    name="portfolioOrNote"
                    rows="3"
                    disabled={loading}
                    placeholder="Share a brief note about your experience or profile link"
                    value={applicant.portfolioOrNote}
                    onChange={handleInputChange}
                  />
                </div>

                <button
                  type="submit"
                  className="apply-now-btn btn-shimmer"
                  disabled={loading}
                >
                  {loading ? 'Submitting Application...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Gallery Lightbox Modal */}
      {activePhoto && (
        <div
          className="apply-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-modal-title"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="gallery-lightbox-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-btn"
              aria-label="Close image preview"
              onClick={() => setActivePhoto(null)}
            >
              ×
            </button>

            <div className="lightbox-img-wrap">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="lightbox-img"
              />
            </div>

            <div className="lightbox-meta">
              <h3 id="gallery-modal-title">{activePhoto.title}</h3>
              <p>{activePhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Career;
