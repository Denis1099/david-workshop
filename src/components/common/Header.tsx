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
        <div className="flex items-center justify-between">
          {/* Logo/Brand - Right side in RTL */}
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

          {/* Navigation Menu - Center - Hidden on Mobile */}
          <nav className="hidden md:flex items-center space-x-reverse space-x-8">
            <a href="/#about" className="text-navbar-text hover:text-cta transition-colors font-heebo">
              אודות
            </a>
            <Link to="/faq" className="text-navbar-text hover:text-cta transition-colors font-heebo">
              שאלות נפוצות
            </Link>
            <a href="/#gym-owners" className="text-navbar-text hover:text-cta transition-colors font-heebo">
              לבעלי סטודיו
            </a>
          </nav>

          {/* CTA Button - Left side in RTL - Hidden on Mobile */}
          <button className="hidden md:block bg-cta hover:bg-yellow-600 text-bg-primary typo-button-cta px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
            לבחירת סדנה
          </button>

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
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 mt-4' 
            : 'max-h-0 opacity-0 mt-0 overflow-hidden'
        }`}>
          <nav className="flex flex-col items-center justify-center space-y-4 py-4 border-t border-gray-200">
            <a 
              href="/#about" 
              className="text-navbar-text hover:text-cta transition-colors font-heebo text-center py-2 w-full flex items-center justify-center"
              onClick={closeMobileMenu}
            >
              אודות
            </a>
            <Link 
              to="/faq" 
              className="text-navbar-text hover:text-cta transition-colors font-heebo text-center py-2 w-full flex items-center justify-center"
              onClick={closeMobileMenu}
            >
              שאלות נפוצות
            </Link>
            <a 
              href="/#gym-owners" 
              className="text-navbar-text hover:text-cta transition-colors font-heebo text-center py-2 w-full flex items-center justify-center"
              onClick={closeMobileMenu}
            >
              לבעלי סטודיו
            </a>
            
            {/* Mobile CTA Button */}
            <button 
              className="bg-cta hover:bg-yellow-600 text-bg-primary typo-button-cta px-6 py-3 rounded-lg transition-all duration-300 mt-4"
              onClick={closeMobileMenu}
            >
              לבחירת סדנה
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 