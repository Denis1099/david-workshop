import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import FloatingWhatsApp from './components/common/FloatingWhatsApp';
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import AboutDavid from './pages/AboutDavid';
import Seminars from './pages/Seminars';
import SeminarSalesPage from './pages/SeminarSalesPage';
import AdminRoute from './components/admin/AdminRoute';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminSeminars from './pages/admin/AdminSeminars';
import AdminRegistrations from './pages/admin/AdminRegistrations';
import AdminNewsletter from './pages/admin/AdminNewsletter';
import AdminSettingsPage from './pages/admin/AdminSettings';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-bg-primary">
        <ScrollToTop />
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/seminars" element={<AdminRoute><AdminSeminars /></AdminRoute>} />
          <Route path="/admin/registrations" element={<AdminRoute><AdminRegistrations /></AdminRoute>} />
          <Route path="/admin/newsletter" element={<AdminRoute><AdminNewsletter /></AdminRoute>} />
          <Route path="/admin/settings" element={<AdminRoute><AdminSettingsPage /></AdminRoute>} />
          
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Header />
              <Home />
              <Footer />
              <FloatingWhatsApp />
            </>
          } />
          <Route path="/faq" element={
            <>
              <Header />
              <FAQ />
              <Footer />
              <FloatingWhatsApp />
            </>
          } />
          <Route path="/about-david" element={
            <>
              <Header />
              <AboutDavid />
              <Footer />
              <FloatingWhatsApp />
            </>
          } />
          <Route path="/seminars" element={
            <>
              <Header />
              <Seminars />
              <Footer />
              <FloatingWhatsApp />
            </>
          } />
          <Route path="/seminars/:slug" element={
            <>
              <Header />
              <SeminarSalesPage />
              <Footer />
              <FloatingWhatsApp />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
