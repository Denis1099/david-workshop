import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-bg-primary border-b border-gray-700">
      <div className="mx-auto px-4 py-4 max-w-[1200px]">
        <div className="flex items-center justify-between">
          {/* Logo/Brand - Right side in RTL */}
          <Link to="/" className="text-text-primary hover:text-cta transition-colors font-rubik text-2xl font-bold">
            RELIFT
          </Link>

          {/* Navigation Menu - Center */}
          <nav className="hidden md:flex items-center space-x-reverse space-x-8">
            <a href="/#about" className="text-text-primary hover:text-cta transition-colors font-heebo">
              אודות
            </a>
            <Link to="/faq" className="text-text-primary hover:text-cta transition-colors font-heebo">
              שאלות נפוצות
            </Link>
            <a href="/#gym-owners" className="text-text-primary hover:text-cta transition-colors font-heebo">
              לבעלי סטודיו
            </a>
          </nav>

          {/* CTA Button - Left side in RTL */}
          <button className="bg-cta hover:bg-yellow-600 text-bg-primary font-rubik font-medium px-6 py-3 rounded-lg transition-colors">
            סדנאות קרובות
          </button>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="md:hidden mt-4 hidden">
          <nav className="flex flex-col space-y-4">
            <a href="/#about" className="text-text-primary hover:text-cta transition-colors font-heebo">
              אודות
            </a>
            <Link to="/faq" className="text-text-primary hover:text-cta transition-colors font-heebo">
              שאלות נפוצות
            </Link>
            <a href="/#gym-owners" className="text-text-primary hover:text-cta transition-colors font-heebo">
              לבעלי סטודיו
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 