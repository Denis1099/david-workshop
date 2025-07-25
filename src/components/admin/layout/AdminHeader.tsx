'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const AdminHeader: React.FC = () => {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    switch (pathname) {
      case '/admin':
        return 'דשבורד';
      case '/admin/seminars':
        return 'ניהול סדנאות';
      case '/admin/registrations':
        return 'ניהול הרשמות';
      case '/admin/newsletter':
        return 'רשימת תפוצה';
      case '/admin/settings':
        return 'הגדרות מערכת';
      default:
        return 'פאנל ניהול';
    }
  };

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { name: 'בית', href: '/admin' }
    ];

    if (pathSegments.length > 1) {
      breadcrumbs.push({
        name: getPageTitle(),
        href: location.pathname
      });
    }

    return breadcrumbs;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="typo-section-title text-bg-primary">
            {getPageTitle()}
          </h1>
          
          <nav className="flex items-center space-x-2 mt-1">
            {getBreadcrumbs().map((breadcrumb, index) => (
              <div key={breadcrumb.href} className="flex items-center">
                {index > 0 && (
                  <span className="mx-2 text-gray-400">/</span>
                )}
                <span className={`typo-body-small ${
                  index === getBreadcrumbs().length - 1
                    ? 'text-cta font-medium'
                    : 'text-gray-500'
                }`}>
                  {breadcrumb.name}
                </span>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="flex-1"></div>
          <div className="flex-1 flex justify-center">
            <p className="typo-body-small text-gray-500 whitespace-nowrap">
              {new Date().toLocaleDateString('he-IL', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-white bg-cta hover:bg-orange-600 border border-cta hover:border-orange-600 rounded-lg transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="typo-body-small font-medium">חזרה לאתר</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;