import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.png';
import '../Styles/AdminPortal.css';

const RAW_API_URL =
  import.meta.env.VITE_API_URL || 'https://backend-v1ip.onrender.com';
const API_BASE_URL = String(RAW_API_URL).replace(/\/+$/, '');
const LOCAL_MESSAGES_KEY = 'naavic_contact_messages';
const LOCAL_GALLERY_KEY = 'naavic_career_gallery';
const LOCAL_JOBS_KEY = 'naavic_career_jobs';

const PORTAL_OPTIONS = [
  { id: 'naavic-ho', label: 'Naavic Edutech Head Office' },
  { id: 'mathbook', label: 'Mathbook' },
  { id: 'alphamaster', label: 'AlphaMaster' },
  { id: 'vaagai-study', label: 'Vaagai Study' },
];

const JOB_TYPE_OPTIONS = [
  'Full-Time',
  'Part-Time',
  'Full-Time / Part-Time',
  'Partnership / Growth',
  'Internship',
  'Contract',
];

const JOB_LOCATION_OPTIONS = [
  'Remote / Hybrid',
  'Namakkal (On-Site)',
  'Remote',
  'Hybrid',
  'Flexible / Remote',
];

const STATUS_OPTIONS = ['New', 'Reviewed', 'Shortlisted', 'Rejected'];

const readLocalList = (key) => {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeLocalList = (key, items) => {
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // Ignore storage quota errors
  }
};

const mergeContactMessages = (apiList = [], localList = []) => {
  const seenIds = new Set();
  const merged = [];

  for (const item of apiList) {
    if (!item) continue;
    const id = String(item._id || '');
    if (id) seenIds.add(id);
    merged.push({ ...item, _isLocalOnly: false });
  }

  for (const localItem of localList) {
    if (!localItem) continue;
    const id = String(localItem._id || '');
    if (id && seenIds.has(id)) continue;
    if (id) seenIds.add(id);
    merged.push({ ...localItem, _isLocalOnly: true });
  }

  merged.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  return merged;
};

function AdminPortal() {
  const [activeSection, setActiveSection] = useState('jobs');

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [gallery, setGallery] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busyId, setBusyId] = useState('');
  const [creatingJob, setCreatingJob] = useState(false);
  const [creatingGallery, setCreatingGallery] = useState(false);

  // Add Job State (with Dropdown Selections)
  const [newJob, setNewJob] = useState({
    portalId: 'mathbook',
    title: '',
    type: 'Full-Time',
    location: 'Remote / Hybrid',
  });

  // Add Gallery State (Upload File OR Image URL Selection)
  const [gallerySourceMode, setGallerySourceMode] = useState('upload');
  const [newGallery, setNewGallery] = useState({
    title: '',
    caption: '',
    image: '',
  });

  // View Modal State
  const [viewRecord, setViewRecord] = useState(null);

  // Edit Modal State
  const [editRecord, setEditRecord] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);

  const showNotice = useCallback((msg) => {
    setNotice(msg);
    setTimeout(() => {
      setNotice((prev) => (prev === msg ? '' : prev));
    }, 3500);
  }, []);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError('');
    const localMsgs = readLocalList(LOCAL_MESSAGES_KEY);
    const localGal = readLocalList(LOCAL_GALLERY_KEY);
    const localJobs = readLocalList(LOCAL_JOBS_KEY);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const [jobsRes, appsRes, contactRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/jobs`, { signal: controller.signal }),
        fetch(`${API_BASE_URL}/api/careers/applications`, { signal: controller.signal }),
        fetch(`${API_BASE_URL}/api/contact`, { signal: controller.signal }),
      ]);

      if (!jobsRes.ok || !appsRes.ok || !contactRes.ok) {
        throw new Error('Failed to load admin data from server.');
      }

      const [jobsData, appsData, contactData] = await Promise.all([
        jobsRes.json(),
        appsRes.json(),
        contactRes.json(),
      ]);

      const validJobs = Array.isArray(jobsData) ? jobsData : localJobs;
      setJobs(validJobs);
      writeLocalList(LOCAL_JOBS_KEY, validJobs);

      setApplications(Array.isArray(appsData) ? appsData : []);
      setMessages(
        mergeContactMessages(Array.isArray(contactData) ? contactData : [], localMsgs)
      );
      setGallery(localGal);
    } catch (err) {
      setJobs(localJobs);
      setMessages(mergeContactMessages([], localMsgs));
      setGallery(localGal);
      const isNetworkOrTimeout =
        err.name === 'AbortError' || err.message === 'Failed to fetch';
      setError(
        isNetworkOrTimeout
          ? 'Backend server is waking up or offline. Showing saved local records.'
          : err.message
      );
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (viewRecord) setViewRecord(null);
        if (editRecord && !savingEdit) setEditRecord(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewRecord, editRecord, savingEdit]);

  const getPortalLabel = (portalId) => {
    const found = PORTAL_OPTIONS.find((p) => p.id === portalId);
    return found ? found.label : portalId || 'Portal';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return Number.isNaN(d.getTime())
      ? '—'
      : d.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
  };

  // --- IMAGE FILE TO BASE64 FOR GALLERY ---
  const handleGalleryFileSelect = (e, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || '');
      if (isEdit) {
        setEditRecord((prev) => ({
          ...prev,
          data: { ...prev.data, image: dataUrl },
        }));
      } else {
        setNewGallery((prev) => ({ ...prev, image: dataUrl }));
      }
    };
    reader.readAsDataURL(file);
  };

  // --- CREATE JOB ---
  const handleAddJob = async (e) => {
    e.preventDefault();
    if (!newJob.title.trim()) return;
    setCreatingJob(true);
    setError('');

    const payload = {
      portalId: newJob.portalId,
      title: newJob.title.trim(),
      type: newJob.type,
      location: newJob.location,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const created = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(created.error || 'Could not add job.');
      }

      const jobItem = created.data || created;
      const nextJobs = [jobItem, ...jobs];
      setJobs(nextJobs);
      writeLocalList(LOCAL_JOBS_KEY, nextJobs);
      setNewJob((prev) => ({ ...prev, title: '' }));
      showNotice(`Added "${jobItem.title}" to ${getPortalLabel(jobItem.portalId)}.`);
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        const localJobItem = {
          _id: `local_job_${Date.now()}`,
          ...payload,
          createdAt: new Date().toISOString(),
        };
        const nextJobs = [localJobItem, ...jobs];
        setJobs(nextJobs);
        writeLocalList(LOCAL_JOBS_KEY, nextJobs);
        setNewJob((prev) => ({ ...prev, title: '' }));
        showNotice(`Saved "${localJobItem.title}" locally for Career page.`);
      } else {
        setError(err.message);
      }
    } finally {
      setCreatingJob(false);
    }
  };

  // --- CREATE GALLERY CARD ---
  const handleAddGallery = (e) => {
    e.preventDefault();
    if (!newGallery.title.trim() || !newGallery.image.trim()) {
      setError('Please enter a gallery title and select or paste an image.');
      return;
    }

    setCreatingGallery(true);
    setError('');

    const item = {
      id: `gal_custom_${Date.now()}`,
      title: newGallery.title.trim(),
      caption:
        newGallery.caption.trim() ||
        'Moments and milestones from Naavic Edutech Private Limited.',
      image: newGallery.image.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedGallery = [item, ...gallery];
    setGallery(updatedGallery);
    writeLocalList(LOCAL_GALLERY_KEY, updatedGallery);
    setNewGallery({ title: '', caption: '', image: '' });
    setCreatingGallery(false);
    showNotice(`Added "${item.title}" to Career Gallery.`);
  };

  // --- OPEN EDIT MODAL ---
  const openEdit = (type, item) => {
    setError('');
    setEditRecord({
      type,
      data: { ...item },
    });
  };

  // --- SAVE EDIT ---
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editRecord) return;

    setSavingEdit(true);
    setError('');
    const { type, data } = editRecord;

    try {
      if (type === 'job') {
        if (String(data._id).startsWith('local_job_')) {
          const updatedJobs = jobs.map((j) => (j._id === data._id ? data : j));
          setJobs(updatedJobs);
          writeLocalList(LOCAL_JOBS_KEY, updatedJobs);
        } else {
          const res = await fetch(`${API_BASE_URL}/api/jobs/${data._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              portalId: data.portalId,
              title: data.title,
              type: data.type,
              location: data.location,
            }),
          });
          const updated = await res.json().catch(() => ({}));
          if (!res.ok) {
            throw new Error(updated.error || 'Failed to update job opening.');
          }
          const finalJob = updated.data || updated;
          const updatedJobs = jobs.map((j) => (j._id === data._id ? finalJob : j));
          setJobs(updatedJobs);
          writeLocalList(LOCAL_JOBS_KEY, updatedJobs);
        }
        showNotice('Job opening updated.');
      }

      if (type === 'gallery') {
        const updatedGallery = gallery.map((g) => (g.id === data.id ? data : g));
        setGallery(updatedGallery);
        writeLocalList(LOCAL_GALLERY_KEY, updatedGallery);
        showNotice('Gallery item updated.');
      }

      if (type === 'application') {
        const res = await fetch(
          `${API_BASE_URL}/api/careers/applications/${data._id}/status`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              status: data.status,
              portfolioOrNote: data.portfolioOrNote,
            }),
          }
        );
        const updated = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(updated.error || 'Failed to update application details.');
        }
        const finalApp = updated.data || updated;
        setApplications((prev) =>
          prev.map((a) => (a._id === data._id ? { ...a, ...data, ...finalApp } : a))
        );
        showNotice('Application details updated.');
      }

      if (type === 'message') {
        const payload = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
        };

        if (data._isLocalOnly) {
          const updatedLocal = readLocalList(LOCAL_MESSAGES_KEY).map((m) =>
            m._id === data._id ? { ...m, ...payload } : m
          );
          writeLocalList(LOCAL_MESSAGES_KEY, updatedLocal);
          setMessages((prev) =>
            prev.map((m) => (m._id === data._id ? { ...m, ...payload } : m))
          );
          showNotice('Local contact message updated.');
        } else {
          const res = await fetch(`${API_BASE_URL}/api/contact/${data._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          const updated = await res.json().catch(() => ({}));
          if (!res.ok) {
            throw new Error(updated.error || 'Failed to update contact message.');
          }
          const finalMsg = updated.data || updated;
          setMessages((prev) =>
            prev.map((m) => (m._id === data._id ? { ...finalMsg, _isLocalOnly: false } : m))
          );
          showNotice('Contact message updated.');
        }
      }

      setEditRecord(null);
    } catch (err) {
      setError(err.message || 'Failed to save changes.');
    } finally {
      setSavingEdit(false);
    }
  };

  // --- DELETE RECORDS ---
  const handleDeleteJob = async (id, title) => {
    setBusyId(id);
    setError('');
    try {
      if (!String(id).startsWith('local_job_')) {
        const res = await fetch(`${API_BASE_URL}/api/jobs/${id}`, { method: 'DELETE' });
        const result = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(result.error || 'Failed to delete job.');
        }
      }
      const nextJobs = jobs.filter((j) => j._id !== id);
      setJobs(nextJobs);
      writeLocalList(LOCAL_JOBS_KEY, nextJobs);
      showNotice(`Deleted job "${title}".`);
    } catch (err) {
      setError(err.message || 'Failed to delete job.');
    } finally {
      setBusyId('');
    }
  };

  const handleDeleteGallery = (id, title) => {
    const nextGallery = gallery.filter((g) => g.id !== id);
    setGallery(nextGallery);
    writeLocalList(LOCAL_GALLERY_KEY, nextGallery);
    showNotice(`Removed "${title}" from Career Gallery.`);
  };

  const handleDeleteApplication = async (id, fullName) => {
    setBusyId(id);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/careers/applications/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(result.error || 'Failed to delete application.');
      }
      setApplications((prev) => prev.filter((a) => a._id !== id));
      showNotice(`Deleted application from ${fullName}.`);
    } catch (err) {
      setError(err.message || 'Failed to delete application.');
    } finally {
      setBusyId('');
    }
  };

  const handleDeleteMessage = async (msg) => {
    const { _id: id, name, _isLocalOnly } = msg;
    setBusyId(id);
    setError('');
    try {
      if (_isLocalOnly) {
        writeLocalList(
          LOCAL_MESSAGES_KEY,
          readLocalList(LOCAL_MESSAGES_KEY).filter((m) => m._id !== id)
        );
      } else {
        const res = await fetch(`${API_BASE_URL}/api/contact/${id}`, { method: 'DELETE' });
        const result = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(result.error || 'Failed to delete message.');
        }
        writeLocalList(
          LOCAL_MESSAGES_KEY,
          readLocalList(LOCAL_MESSAGES_KEY).filter((m) => m._id !== id)
        );
      }

      setMessages((prev) => prev.filter((m) => m._id !== id));
      showNotice(`Deleted inquiry from ${name}.`);
    } catch (err) {
      setError(err.message || 'Failed to delete message.');
    } finally {
      setBusyId('');
    }
  };

  return (
    <div className="admin-shell">
      {/* LEFT SIDEBAR: Logo Top + Nav Below */}
      <aside className="admin-sidebar">
        <div className="admin-brand-box">
          <img src={logo} alt="Naavic Logo" className="admin-sidebar-logo" />
          <p className="admin-brand-name">NAAVIC EDUTECH PRIVATE LIMITED</p>
          <span className="admin-role-badge">Admin Workspace</span>
        </div>

        <nav className="admin-side-nav" aria-label="Admin Navigation">
          <button
            type="button"
            className={`admin-nav-item ${activeSection === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveSection('jobs')}
          >
            <span>Portal Jobs (4 Portals)</span>
            <span className="nav-count">{jobs.length}</span>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeSection === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveSection('gallery')}
          >
            <span>Career Gallery</span>
            <span className="nav-count">{gallery.length}</span>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeSection === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveSection('applications')}
          >
            <span>Career Applications</span>
            <span className="nav-count">{applications.length}</span>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeSection === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveSection('messages')}
          >
            <span>Contact Messages</span>
            <span className="nav-count">{messages.length}</span>
          </button>

          <div className="admin-nav-divider" />

          <Link to="/careers" className="admin-nav-item back-site-link">
            <span>View Career Page →</span>
          </Link>

          <Link to="/" className="admin-nav-item back-site-link">
            <span>← Back to Website</span>
          </Link>
        </nav>
      </aside>

      {/* RIGHT CONTENT AREA */}
      <main className="admin-content-area">
        <header className="admin-topbar">
          <div>
            <h1 className="admin-page-title">
              {activeSection === 'jobs' && '4 Portals Job Management'}
              {activeSection === 'gallery' && 'Career Gallery Management'}
              {activeSection === 'applications' && 'Career Applications'}
              {activeSection === 'messages' && 'Contact Inquiries'}
            </h1>
            <p className="admin-page-sub">
              Create, view, edit, and delete records across Naavic Edutech platforms.
            </p>
          </div>

          <button
            type="button"
            className="admin-btn-outline"
            onClick={fetchAllData}
            disabled={loading}
          >
            {loading ? 'Syncing...' : 'Refresh Data'}
          </button>
        </header>

        {notice && (
          <div className="admin-alert success" role="status">
            {notice}
          </div>
        )}

        {error && (
          <div className="admin-alert error" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="admin-card center-pad">Loading records...</div>
        ) : (
          <>
            {/* SECTION 1: 4 PORTALS JOBS (SELECTION DROPDOWNS + ADD / VIEW / EDIT / DELETE) */}
            {activeSection === 'jobs' && (
              <div className="admin-section-stack">
                <div className="admin-card">
                  <h2 className="card-heading">Create Job Opening</h2>
                  <form onSubmit={handleAddJob} className="structured-create-form">
                    <label className="field-stack">
                      <span>Select Portal</span>
                      <select
                        value={newJob.portalId}
                        onChange={(e) =>
                          setNewJob((prev) => ({ ...prev, portalId: e.target.value }))
                        }
                        disabled={creatingJob}
                      >
                        {PORTAL_OPTIONS.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="field-stack">
                      <span>Job Title</span>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Business Development Partner"
                        value={newJob.title}
                        onChange={(e) =>
                          setNewJob((prev) => ({ ...prev, title: e.target.value }))
                        }
                        disabled={creatingJob}
                      />
                    </label>

                    <label className="field-stack">
                      <span>Select Employment Type</span>
                      <select
                        value={newJob.type}
                        onChange={(e) =>
                          setNewJob((prev) => ({ ...prev, type: e.target.value }))
                        }
                        disabled={creatingJob}
                      >
                        {JOB_TYPE_OPTIONS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="field-stack">
                      <span>Select Location / Mode</span>
                      <select
                        value={newJob.location}
                        onChange={(e) =>
                          setNewJob((prev) => ({ ...prev, location: e.target.value }))
                        }
                        disabled={creatingJob}
                      >
                        {JOB_LOCATION_OPTIONS.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </label>

                    <button
                      type="submit"
                      className="admin-btn-green align-end-btn"
                      disabled={creatingJob}
                    >
                      {creatingJob ? 'Adding...' : '+ Create Job'}
                    </button>
                  </form>
                </div>

                {/* 4 Portals Grid */}
                <div className="portals-4-grid">
                  {PORTAL_OPTIONS.map((portal) => {
                    const portalJobs = jobs.filter((j) => j.portalId === portal.id);
                    return (
                      <div key={portal.id} className="admin-card portal-box">
                        <div className="portal-box-head">
                          <h3>{portal.label}</h3>
                          <span className="pill-green">{portalJobs.length}</span>
                        </div>

                        {portalJobs.length === 0 ? (
                          <p className="muted-empty">No openings listed yet.</p>
                        ) : (
                          <div className="item-list">
                            {portalJobs.map((job) => (
                              <div key={job._id} className="record-row-card">
                                <div className="record-row-main">
                                  <div className="record-title">{job.title}</div>
                                  <div className="record-meta">
                                    <span>{job.type}</span>
                                    <span>{job.location}</span>
                                  </div>
                                </div>
                                <div className="action-btns">
                                  <button
                                    type="button"
                                    className="btn-view"
                                    onClick={() => setViewRecord({ type: 'job', item: job })}
                                  >
                                    View
                                  </button>
                                  <button
                                    type="button"
                                    className="btn-edit"
                                    onClick={() => openEdit('job', job)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    className="btn-delete"
                                    disabled={busyId === job._id}
                                    onClick={() => handleDeleteJob(job._id, job.title)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SECTION 2: CAREER GALLERY (SELECTION OPTION: UPLOAD IMAGE OR PASTE URL) */}
            {activeSection === 'gallery' && (
              <div className="admin-section-stack">
                <div className="admin-card">
                  <div className="gallery-create-top">
                    <h2 className="card-heading">Add Career Gallery Card</h2>

                    <div className="source-selector-group" role="group" aria-label="Image source selection">
                      <button
                        type="button"
                        className={`source-toggle-btn ${gallerySourceMode === 'upload' ? 'active' : ''}`}
                        onClick={() => {
                          setGallerySourceMode('upload');
                          setNewGallery((prev) => ({ ...prev, image: '' }));
                        }}
                      >
                        Upload Image File
                      </button>
                      <button
                        type="button"
                        className={`source-toggle-btn ${gallerySourceMode === 'url' ? 'active' : ''}`}
                        onClick={() => {
                          setGallerySourceMode('url');
                          setNewGallery((prev) => ({ ...prev, image: '' }));
                        }}
                      >
                        Paste Image URL
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleAddGallery} className="gallery-create-form">
                    <label className="field-stack">
                      <span>Gallery Title</span>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Team Workshop 2026"
                        value={newGallery.title}
                        onChange={(e) =>
                          setNewGallery((prev) => ({ ...prev, title: e.target.value }))
                        }
                      />
                    </label>

                    <label className="field-stack">
                      <span>Caption / Description</span>
                      <input
                        type="text"
                        placeholder="Short description shown below the photo"
                        value={newGallery.caption}
                        onChange={(e) =>
                          setNewGallery((prev) => ({ ...prev, caption: e.target.value }))
                        }
                      />
                    </label>

                    {gallerySourceMode === 'upload' ? (
                      <label className="field-stack">
                        <span>Select Image from Device</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleGalleryFileSelect(e, false)}
                        />
                      </label>
                    ) : (
                      <label className="field-stack">
                        <span>Image URL</span>
                        <input
                          type="url"
                          placeholder="https://example.com/photo.jpg"
                          value={newGallery.image}
                          onChange={(e) =>
                            setNewGallery((prev) => ({ ...prev, image: e.target.value }))
                          }
                        />
                      </label>
                    )}

                    <button
                      type="submit"
                      className="admin-btn-green align-end-btn"
                      disabled={creatingGallery}
                    >
                      {creatingGallery ? 'Saving...' : '+ Add to Gallery'}
                    </button>
                  </form>

                  {newGallery.image && (
                    <div className="gallery-upload-preview">
                      <span>Preview:</span>
                      <img src={newGallery.image} alt="New gallery preview" />
                    </div>
                  )}
                </div>

                {/* Custom Gallery Cards List */}
                <div className="admin-card">
                  <div className="portal-box-head">
                    <h3>Custom Career Gallery Items</h3>
                    <span className="pill-green">{gallery.length}</span>
                  </div>

                  {gallery.length === 0 ? (
                    <p className="muted-empty">
                      No custom gallery photos added yet. Default 4 ecosystem photos remain visible on the Career page.
                    </p>
                  ) : (
                    <div className="admin-gallery-grid">
                      {gallery.map((item) => (
                        <div key={item.id} className="admin-gallery-card">
                          <div className="admin-gallery-thumb">
                            <img src={item.image} alt={item.title} />
                          </div>
                          <div className="admin-gallery-body">
                            <h4>{item.title}</h4>
                            <p>{item.caption}</p>
                            <div className="action-btns">
                              <button
                                type="button"
                                className="btn-view"
                                onClick={() => setViewRecord({ type: 'gallery', item })}
                              >
                                View
                              </button>
                              <button
                                type="button"
                                className="btn-edit"
                                onClick={() => openEdit('gallery', item)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn-delete"
                                onClick={() => handleDeleteGallery(item.id, item.title)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SECTION 3: CAREER APPLICATIONS */}
            {activeSection === 'applications' && (
              <div className="admin-card">
                <h2 className="card-heading">Career Applications</h2>
                {applications.length === 0 ? (
                  <p className="muted-empty">No applications submitted yet.</p>
                ) : (
                  <div className="table-scroll">
                    <table className="crud-table">
                      <thead>
                        <tr>
                          <th>Applicant</th>
                          <th>Portal &amp; Job</th>
                          <th>Email / Phone</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map((app) => (
                          <tr key={app._id}>
                            <td><strong>{app.fullName}</strong></td>
                            <td>
                              <div className="sub-tag">{app.portalName}</div>
                              <div>{app.jobTitle}</div>
                            </td>
                            <td>
                              <div>{app.email}</div>
                              <div className="sub-muted">{app.phone}</div>
                            </td>
                            <td>
                              <span className={`status-pill st-${(app.status || 'New').toLowerCase()}`}>
                                {app.status || 'New'}
                              </span>
                            </td>
                            <td className="sub-muted">{formatDate(app.createdAt)}</td>
                            <td>
                              <div className="action-btns">
                                <button
                                  type="button"
                                  className="btn-view"
                                  onClick={() =>
                                    setViewRecord({ type: 'application', item: app })
                                  }
                                >
                                  View
                                </button>
                                <button
                                  type="button"
                                  className="btn-edit"
                                  onClick={() => openEdit('application', app)}
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  className="btn-delete"
                                  disabled={busyId === app._id}
                                  onClick={() =>
                                    handleDeleteApplication(app._id, app.fullName)
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* SECTION 4: CONTACT MESSAGES */}
            {activeSection === 'messages' && (
              <div className="admin-card">
                <h2 className="card-heading">Contact Us Messages</h2>
                {messages.length === 0 ? (
                  <p className="muted-empty">No contact messages received yet.</p>
                ) : (
                  <div className="table-scroll">
                    <table className="crud-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email / Phone</th>
                          <th>Message</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {messages.map((msg) => (
                          <tr key={msg._id}>
                            <td>
                              <strong>{msg.name}</strong>
                              {msg._isLocalOnly && (
                                <span className="pill-green" style={{ marginLeft: '8px' }}>
                                  Local
                                </span>
                              )}
                            </td>
                            <td>
                              <div>{msg.email}</div>
                              <div className="sub-muted">{msg.phone || '—'}</div>
                            </td>
                            <td className="msg-preview">{msg.message}</td>
                            <td className="sub-muted">{formatDate(msg.createdAt)}</td>
                            <td>
                              <div className="action-btns">
                                <button
                                  type="button"
                                  className="btn-view"
                                  onClick={() =>
                                    setViewRecord({ type: 'message', item: msg })
                                  }
                                >
                                  View
                                </button>
                                <button
                                  type="button"
                                  className="btn-edit"
                                  onClick={() => openEdit('message', msg)}
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  className="btn-delete"
                                  disabled={busyId === msg._id}
                                  onClick={() => handleDeleteMessage(msg)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* VIEW MODAL */}
      {viewRecord && (
        <div className="admin-modal-backdrop" onClick={() => setViewRecord(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="admin-modal-close"
              onClick={() => setViewRecord(null)}
              aria-label="Close view modal"
            >
              ×
            </button>
            <span className="pill-green">VIEW DETAILS</span>
            <h2 className="modal-title-lg">
              {viewRecord.type === 'job' && viewRecord.item.title}
              {viewRecord.type === 'gallery' && viewRecord.item.title}
              {viewRecord.type === 'application' && viewRecord.item.fullName}
              {viewRecord.type === 'message' && viewRecord.item.name}
            </h2>

            <div className="view-details-list">
              {viewRecord.type === 'job' && (
                <>
                  <p><strong>Portal:</strong> {getPortalLabel(viewRecord.item.portalId)}</p>
                  <p><strong>Job Title:</strong> {viewRecord.item.title}</p>
                  <p><strong>Employment Type:</strong> {viewRecord.item.type}</p>
                  <p><strong>Location:</strong> {viewRecord.item.location}</p>
                </>
              )}
              {viewRecord.type === 'gallery' && (
                <>
                  <div className="modal-gallery-preview">
                    <img src={viewRecord.item.image} alt={viewRecord.item.title} />
                  </div>
                  <p><strong>Caption:</strong> {viewRecord.item.caption}</p>
                </>
              )}
              {viewRecord.type === 'application' && (
                <>
                  <p><strong>Portal:</strong> {viewRecord.item.portalName}</p>
                  <p><strong>Role:</strong> {viewRecord.item.jobTitle}</p>
                  <p><strong>Email:</strong> {viewRecord.item.email}</p>
                  <p><strong>Phone:</strong> {viewRecord.item.phone}</p>
                  <p><strong>Status:</strong> {viewRecord.item.status || 'New'}</p>
                  <p><strong>Note / Link:</strong> {viewRecord.item.portfolioOrNote || '—'}</p>
                </>
              )}
              {viewRecord.type === 'message' && (
                <>
                  <p><strong>Email:</strong> {viewRecord.item.email}</p>
                  <p><strong>Phone:</strong> {viewRecord.item.phone || '—'}</p>
                  <p><strong>Message:</strong> {viewRecord.item.message}</p>
                </>
              )}
            </div>

            <button
              type="button"
              className="admin-btn-green full-w"
              onClick={() => setViewRecord(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editRecord && (
        <div
          className="admin-modal-backdrop"
          onClick={() => !savingEdit && setEditRecord(null)}
        >
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="admin-modal-close"
              onClick={() => !savingEdit && setEditRecord(null)}
              aria-label="Close edit modal"
            >
              ×
            </button>
            <span className="pill-green">EDIT RECORD</span>
            <h2 className="modal-title-lg">Update Details</h2>

            <form onSubmit={handleSaveEdit} className="edit-modal-form">
              {editRecord.type === 'job' && (
                <>
                  <label>
                    Portal
                    <select
                      value={editRecord.data.portalId}
                      onChange={(e) =>
                        setEditRecord((prev) => ({
                          ...prev,
                          data: { ...prev.data, portalId: e.target.value },
                        }))
                      }
                    >
                      {PORTAL_OPTIONS.map((p) => (
                        <option key={p.id} value={p.id}>{p.label}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Job Title
                    <input
                      type="text"
                      required
                      value={editRecord.data.title}
                      onChange={(e) =>
                        setEditRecord((prev) => ({
                          ...prev,
                          data: { ...prev.data, title: e.target.value },
                        }))
                      }
                    />
                  </label>
                  <label>
                    Employment Type
                    <select
                      value={editRecord.data.type || 'Full-Time'}
                      onChange={(e) =>
                        setEditRecord((prev) => ({
                          ...prev,
                          data: { ...prev.data, type: e.target.value },
                        }))
                      }
                    >
                      {JOB_TYPE_OPTIONS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Location
                    <select
                      value={editRecord.data.location || 'Remote / Hybrid'}
                      onChange={(e) =>
                        setEditRecord((prev) => ({
                          ...prev,
                          data: { ...prev.data, location: e.target.value },
                        }))
                      }
                    >
                      {JOB_LOCATION_OPTIONS.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </label>
                </>
              )}

              {editRecord.type === 'gallery' && (
                <>
                  <label>
                    Gallery Title
                    <input
                      type="text"
                      required
                      value={editRecord.data.title || ''}
                      onChange={(e) =>
                        setEditRecord((prev) => ({
                          ...prev,
                          data: { ...prev.data, title: e.target.value },
                        }))
                      }
                    />
                  </label>
                  <label>
                    Caption
                    <textarea
                      rows="2"
                      value={editRecord.data.caption || ''}
                      onChange={(e) =>
                        setEditRecord((prev) => ({
                          ...prev,
                          data: { ...prev.data, caption: e.target.value },
                        }))
                      }
                    />
                  </label>
                  <label>
                    Replace Image File (Optional)
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleGalleryFileSelect(e, true)}
                    />
                  </label>
                  <label>
                    Or Image URL
                    <input
                      type="text"
                      value={editRecord.data.image || ''}
                      onChange={(e) =>
                        setEditRecord((prev) => ({
                          ...prev,
                          data: { ...prev.data, image: e.target.value },
                        }))
                      }
                    />
                  </label>
                </>
              )}

              {editRecord.type === 'application' && (
                <>
                  <label>
                    Status
                    <select
                      value={editRecord.data.status || 'New'}
                      onChange={(e) =>
                        setEditRecord((prev) => ({
                          ...prev,
                          data: { ...prev.data, status: e.target.value },
                        }))
                      }
                    >
                      {STATUS_OPTIONS.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Note / Profile Link
                    <textarea
                      rows="3"
                      value={editRecord.data.portfolioOrNote || ''}
                      onChange={(e) =>
                        setEditRecord((prev) => ({
                          ...prev,
                          data: { ...prev.data, portfolioOrNote: e.target.value },
                        }))
                      }
                    />
                  </label>
                </>
              )}

              {editRecord.type === 'message' && (
                <>
                  <label>
                    Name
                    <input
                      type="text"
                      required
                      value={editRecord.data.name || ''}
                      onChange={(e) =>
                        setEditRecord((prev) => ({
                          ...prev,
                          data: { ...prev.data, name: e.target.value },
                        }))
                      }
                    />
                  </label>
                  <label>
                    Email
                    <input
                      type="email"
                      required
                      value={editRecord.data.email || ''}
                      onChange={(e) =>
                        setEditRecord((prev) => ({
                          ...prev,
                          data: { ...prev.data, email: e.target.value },
                        }))
                      }
                    />
                  </label>
                  <label>
                    Phone
                    <input
                      type="text"
                      value={editRecord.data.phone || ''}
                      onChange={(e) =>
                        setEditRecord((prev) => ({
                          ...prev,
                          data: { ...prev.data, phone: e.target.value },
                        }))
                      }
                    />
                  </label>
                  <label>
                    Message
                    <textarea
                      rows="4"
                      required
                      value={editRecord.data.message || ''}
                      onChange={(e) =>
                        setEditRecord((prev) => ({
                          ...prev,
                          data: { ...prev.data, message: e.target.value },
                        }))
                      }
                    />
                  </label>
                </>
              )}

              <button
                type="submit"
                className="admin-btn-green full-w"
                disabled={savingEdit}
              >
                {savingEdit ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPortal;
