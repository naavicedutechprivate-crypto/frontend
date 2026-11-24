import React, { useState, useEffect, useRef } from 'react';
import '../Styles/Career.css';
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
