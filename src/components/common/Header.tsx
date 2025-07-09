import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside or on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-navbar-bg border-b sticky top-0 z-50">
      <div className="container-mobile py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand - Right side in RTL */}
          <Link 
            to="/" 
            className="text-navbar-text hover:text-cta transition-colors font-rubik text-xl sm:text-2xl font-bold touch-target"
            onClick={closeMobileMenu}
          >
            RELIFT
          </Link>

          {/* Desktop Navigation Menu - Center */}
          <nav className="hidden md:flex items-center space-x-reverse space-x-6 lg:space-x-8">
            <a 
              href="/#about" 
              className="text-navbar-text hover:text-cta transition-colors font-heebo text-base lg:text-lg touch-target"
            >
              אודות
            </a>
            <div className="w-4"></div>
            <Link 
              to="/faq" 
              className="text-navbar-text hover:text-cta transition-colors font-heebo text-base lg:text-lg touch-target"
            >
              שאלות נפוצות
            </Link>
            <a 
              href="/#gym-owners" 
              className="text-navbar-text hover:text-cta transition-colors font-heebo text-base lg:text-lg touch-target"
            >
              לבעלי סטודיו
            </a>
          </nav>

          {/* Desktop CTA Button - Left side in RTL - Hidden on mobile */}
          <div className="hidden md:block">
            <button className="bg-cta hover:bg-yellow-600 text-bg-primary typo-button-cta btn-mobile-optimized transform hover:scale-105">
              לבחירת סדנה
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-navbar-text touch-target mobile-menu-container"
            onClick={toggleMobileMenu}
            aria-label="תפריט ניווט"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="relative w-6 h-6">
              {/* Hamburger Menu Icon with Animation */}
              <span 
                className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'
                }`}
              />
              <span 
                className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out top-3 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span 
                className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden mobile-menu-container overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="pt-4 pb-2 space-y-2">
            <a 
              href="/#about" 
              className="block text-navbar-text hover:text-cta hover:bg-gray-100 transition-colors font-heebo text-base touch-target rounded-lg px-3 py-3"
              onClick={closeMobileMenu}
            >
              אודות
            </a>
            <Link 
              to="/faq" 
              className="block text-navbar-text hover:text-cta hover:bg-gray-100 transition-colors font-heebo text-base touch-target rounded-lg px-3 py-3"
              onClick={closeMobileMenu}
            >
              שאלות נפוצות
            </Link>
            <a 
              href="/#gym-owners" 
              className="block text-navbar-text hover:text-cta hover:bg-gray-100 transition-colors font-heebo text-base touch-target rounded-lg px-3 py-3"
              onClick={closeMobileMenu}
            >
              לבעלי סטודיו
            </a>
            
            {/* Mobile CTA Button */}
            <div className="pt-4">
              <button 
                className="w-full bg-cta hover:bg-yellow-600 text-bg-primary typo-button-cta btn-mobile-optimized"
                onClick={closeMobileMenu}
              >
                לבחירת סדנה
              </button>
            </div>
          </nav>
        </div>
      </div>


    </header>
  );
};

export default Header; 