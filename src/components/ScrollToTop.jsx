import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/ScrollToTop.css';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const [showButton, setShowButton] = useState(false);

  // Route maarum pothu top-ku (allathu #hash section-ku) scroll aagum
  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  // 300px mela scroll pannina floating button kaatum
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPageTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showButton) return null;

  return (
    <button
      type="button"
      className="scroll-to-top-btn"
      onClick={scrollToPageTop}
      aria-label="Scroll to top"
      title="Back to Top"
    >
      ☝️
    </button>
  );
}

export default ScrollToTop;