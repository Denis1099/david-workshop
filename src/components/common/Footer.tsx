import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-text-primary">
      {/* Main Footer Content */}
      <div className="mx-auto px-4 py-16 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* About David Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="font-rubik text-2xl font-bold text-cta mb-4">
                דוד ליטבינוב
              </h3>
              <p className="font-heebo text-lg text-gray-300 mb-4">
                ספורטאי אולימפי ושיאן ישראל בהרמת משקולות
              </p>
              <blockquote className="font-heebo text-xl text-text-primary italic border-r-4 border-cta pr-4">
                "המטרה שלי היא פשוטה - לגרום לכם להפסיק לפחד מהמוט ולהתחיל לשלוט בווייטליפטינג."
              </blockquote>
            </div>
            
            {/* Social Media */}
            <div className="mb-6">
              <h4 className="font-rubik text-xl font-bold mb-4">עקבו אחריי</h4>
              <div className="flex gap-4">
                {/* Instagram */}
                <a href="#" className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                
                {/* LinkedIn */}
                <a href="#" className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                
                {/* Facebook */}
                <a href="#" className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                {/* TikTok */}
                <a href="#" className="w-12 h-12 bg-black rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-rubik text-xl font-bold mb-4">יצירת קשר</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-cta flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <span className="font-heebo text-gray-300">טלפון: 050-123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-cta flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <span className="font-heebo text-gray-300">אימייל: david@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Site Map */}
          <div>
            <h4 className="font-rubik text-xl font-bold mb-4">מפת האתר</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="font-heebo text-gray-300 hover:text-cta transition-colors">
                  בית
                </Link>
              </li>
              <li>
                <a href="/#about" className="font-heebo text-gray-300 hover:text-cta transition-colors">
                  אודות דוד
                </a>
              </li>
              <li>
                <a href="/#why-seminar" className="font-heebo text-gray-300 hover:text-cta transition-colors">
                  למה הסדנה שלי?
                </a>
              </li>
              <li>
                <a href="/#seminar-breakdown" className="font-heebo text-gray-300 hover:text-cta transition-colors">
                  מבנה הסדנה
                </a>
              </li>
              <li>
                <a href="/#testimonials" className="font-heebo text-gray-300 hover:text-cta transition-colors">
                  המלצות
                </a>
              </li>
              <li>
                <a href="/#upcoming" className="font-heebo text-gray-300 hover:text-cta transition-colors">
                  סדנאות קרובות
                </a>
              </li>
              <li>
                <Link to="/faq" className="font-heebo text-gray-300 hover:text-cta transition-colors">
                  שאלות נפוצות
                </Link>
              </li>
              <li>
                <a href="/#gym-owners" className="font-heebo text-gray-300 hover:text-cta transition-colors">
                  לבעלי סטודיו
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="mx-auto px-4 py-6 max-w-[1200px]">
          <div className="text-center">
            <p className="font-heebo text-gray-400">
              © 2025 דוד ליטבינוב - RELIFT | כל הזכויות שמורות
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 