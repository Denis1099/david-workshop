import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AdminService } from '../../../services/adminService';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const currentUser = AdminService.getCurrentUser();

  const navigation = [
    { name: 'דשבורד', href: '/admin', icon: '🏠' },
    { name: 'סדנאות', href: '/admin/seminars', icon: '📅' },
    { name: 'הרשמות', href: '/admin/registrations', icon: '👥' },
    { name: 'רשימת תפוצה', href: '/admin/newsletter', icon: '📧' },
    { name: 'הגדרות', href: '/admin/settings', icon: '⚙️' },
  ];

  const handleLogout = () => {
    AdminService.logout();
    window.location.href = '/admin/login';
  };

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="typo-section-title text-bg-primary">
          פאנל ניהול
        </h1>
        <p className="typo-body-small text-gray-600 mt-2">
          דוד ליטבינוב - סדנאות הרמת משקולות
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                flex items-center px-4 py-3 rounded-lg typo-body-regular transition-colors
                ${isActive
                  ? 'bg-cta text-white'
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <span className="text-xl ml-3">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="typo-body-small font-medium text-gray-900">
              {currentUser?.username}
            </p>
            <p className="typo-body-small text-gray-500">
              מנהל מערכת
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 typo-body-small"
          >
            יציאה
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;