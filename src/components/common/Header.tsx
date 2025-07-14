import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-navbar-bg border-b sticky top-0 z-50">
      <div className="mx-auto px-4 py-4 max-w-[1200px]">
        <div className="flex items-center justify-between md:justify-start">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-navbar-text p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="תפריט ניווט"
          >
            <svg 
              className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo/Brand - Left side on mobile, right side on desktop in RTL */}
          <Link 
            to="/" 
            className="flex items-center hover:opacity-80 transition-opacity"
            onClick={closeMobileMenu}
          >
            <img 
              src="/images/logo.svg"
              alt="RELIFT - דוד ליטבינוב"
              className="h-8 sm:h-10 w-auto"
              loading="eager"
            />
          </Link>

          {/* Navigation Menu - True Center - Hidden on Mobile */}
          <nav className="hidden md:flex items-center space-x-reverse space-x-6 flex-1 justify-center">
            <Link to="/about-david" className="text-navbar-text hover:text-cta transition-colors font-heebo px-4 py-2 rounded-lg">
              מי אני?
            </Link>
            <a href="/#faq" className="text-navbar-text hover:text-cta transition-colors font-heebo px-4 py-2 rounded-lg">
              שאלות נפוצות
            </a>
            <a href="/#testimonials" className="text-navbar-text hover:text-cta transition-colors font-heebo px-4 py-2 rounded-lg">
              מה הם אומרים?
            </a>
          </nav>

          {/* CTA Button - Left side in RTL - Hidden on Mobile */}
          <Link to="/seminars" className="hidden md:block bg-cta hover:bg-yellow-600 text-bg-primary typo-button-cta px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
            לבחירת סדנה
          </Link>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 mt-4' 
            : 'max-h-0 opacity-0 mt-0 overflow-hidden'
        }`}>
          <nav className="flex flex-col items-center justify-center space-y-4 py-4 border-t border-gray-200">
            <Link 
              to="/about-david" 
              className="text-navbar-text hover:text-cta transition-colors font-heebo text-center py-2 w-full flex items-center justify-center"
              onClick={closeMobileMenu}
            >
              מי אני?
            </Link>
            <a 
              href="/#faq" 
              className="text-navbar-text hover:text-cta transition-colors font-heebo text-center py-2 w-full flex items-center justify-center"
              onClick={closeMobileMenu}
            >
              שאלות נפוצות
            </a>
            <a 
              href="/#testimonials" 
              className="text-navbar-text hover:text-cta transition-colors font-heebo text-center py-2 w-full flex items-center justify-center"
              onClick={closeMobileMenu}
            >
              מה הם אומרים?
            </a>
            
            {/* Mobile CTA Button */}
            <Link 
              to="/seminars"
              className="bg-cta hover:bg-yellow-600 text-bg-primary typo-button-cta px-6 py-3 rounded-lg transition-all duration-300 mt-4 inline-block"
              onClick={closeMobileMenu}
            >
              לבחירת סדנה
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 