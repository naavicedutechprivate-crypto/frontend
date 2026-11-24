import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/ContactUs';
import Careers from './components/Career';
import Footer from './components/Footer';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import AdminPortal from './components/AdminPortal';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Disclaimer from './components/Disclaimer';
import Refund from './components/Refund';
import NotFound from './components/NotFound';

function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      <ScrollToTop />
      {!isAdmin && <Navbar />}

      {/* Page Routes */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/refund-policy" element={<Refund />} />

          
          <Route path="*" element={<NotFound />} />
        </Routes>
        {!isAdmin && <Footer />}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;